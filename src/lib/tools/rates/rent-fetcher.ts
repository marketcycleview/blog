import type { RentTransaction, DistrictSummary, RentHeatmapData } from "./rent-types";
import { getProvince } from "./rent-regions";
import { getSampleRentData } from "./rent-sample";

const MOLIT_API_URL =
  "https://apis.data.go.kr/1613000/RTMSDataSvcAptRent/getRTMSDataSvcAptRent";

// ─── XML 파싱 ──────────────────────────────────────────────

function xmlValue(item: string, tag: string): string {
  const m = item.match(new RegExp(`<${tag}>([^<]*)</${tag}>`));
  return m ? m[1].trim() : "";
}

function parseDeposit(raw: string): number {
  // "40,000" → 40000, "  5,000" → 5000
  return parseInt(raw.replace(/,/g, "").trim(), 10) || 0;
}

function parseXML(xml: string): RentTransaction[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g);
  if (!items) return [];

  return items.map((item) => ({
    dong: xmlValue(item, "umdNm"),
    deposit: parseDeposit(xmlValue(item, "deposit")),
    monthlyRent: parseDeposit(xmlValue(item, "monthlyRent")),
    area: parseFloat(xmlValue(item, "excluUseAr")) || 0,
    aptName: xmlValue(item, "aptNm"),
    floor: parseInt(xmlValue(item, "floor"), 10) || 0,
    builtYear: parseInt(xmlValue(item, "buildYear"), 10) || 0,
    contractType: xmlValue(item, "contractType"),
    year: parseInt(xmlValue(item, "dealYear"), 10) || 0,
    month: parseInt(xmlValue(item, "dealMonth"), 10) || 0,
    day: parseInt(xmlValue(item, "dealDay"), 10) || 0,
  }));
}

// ─── 단일 시/군/구 조회 ────────────────────────────────────

async function fetchDistrictRaw(
  apiKey: string,
  lawdCd: string,
  dealYmd: string
): Promise<RentTransaction[]> {
  const url = `${MOLIT_API_URL}?serviceKey=${apiKey}&LAWD_CD=${lawdCd}&DEAL_YMD=${dealYmd}&numOfRows=9999&pageNo=1`;

  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error(`MOLIT API ${res.status}`);

  const text = await res.text();

  // 에러 응답 체크
  if (text.includes("<resultCode>") && !text.includes("<resultCode>000</resultCode>")) {
    const errMsg = xmlValue(text, "resultMsg");
    throw new Error(`MOLIT API error: ${errMsg}`);
  }

  return parseXML(text);
}

// ─── 거래 데이터 → 구별 요약 집계 ────────────────────────

function aggregateDistrict(
  code: string,
  name: string,
  txns: RentTransaction[]
): DistrictSummary {
  const jeonse = txns.filter((t) => t.monthlyRent === 0 && t.deposit > 0);
  const wolse = txns.filter((t) => t.monthlyRent > 0);

  const avg = (arr: number[]) =>
    arr.length > 0 ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;

  const jDeposits = jeonse.map((t) => t.deposit);
  const wDeposits = wolse.map((t) => t.deposit);
  const wRents = wolse.map((t) => t.monthlyRent);

  return {
    code,
    name,
    jeonse: {
      count: jeonse.length,
      avgDeposit: avg(jDeposits),
      minDeposit: jDeposits.length > 0 ? Math.min(...jDeposits) : 0,
      maxDeposit: jDeposits.length > 0 ? Math.max(...jDeposits) : 0,
    },
    wolse: {
      count: wolse.length,
      avgDeposit: avg(wDeposits),
      avgRent: avg(wRents),
    },
    totalCount: txns.length,
  };
}

// ─── 시/도 전체 조회 (모든 구/군 병렬) ────────────────────

export async function fetchRentHeatmap(
  sidoCode: string,
  month: string
): Promise<RentHeatmapData> {
  const apiKey = process.env.MOLIT_RENT_API_KEY;
  const province = getProvince(sidoCode);
  if (!province) return getSampleRentData();
  if (!apiKey) return getSampleRentData();

  try {
    const results = await Promise.allSettled(
      province.districts.map(async (d) => {
        const txns = await fetchDistrictRaw(apiKey, d.code, month);
        return aggregateDistrict(d.code, d.name, txns);
      })
    );

    const districts: DistrictSummary[] = [];
    for (let i = 0; i < results.length; i++) {
      const r = results[i];
      if (r.status === "fulfilled") {
        districts.push(r.value);
      } else {
        // 실패한 구는 빈 데이터로
        const d = province.districts[i];
        districts.push({
          code: d.code,
          name: d.name,
          jeonse: { count: 0, avgDeposit: 0, minDeposit: 0, maxDeposit: 0 },
          wolse: { count: 0, avgDeposit: 0, avgRent: 0 },
          totalCount: 0,
        });
      }
    }

    return {
      districts,
      sido: sidoCode,
      sidoName: province.name,
      month,
      updatedAt: new Date().toISOString(),
      isLive: true,
    };
  } catch (e) {
    console.error("[rent-heatmap] fetch failed:", e);
    return getSampleRentData();
  }
}
