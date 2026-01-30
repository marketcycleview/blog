import { NextResponse } from "next/server";
import type { WelfareData, WelfareService, WelfareCategory } from "@/lib/tools/welfare/types";

const ENDPOINT =
  "https://apis.data.go.kr/B554287/NationalWelfareInformationsV001/NationalWelfarelistV001";

/** XML 텍스트에서 태그 값 추출 */
function xmlTag(xml: string, tag: string): string {
  const re = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}>([^<]*)<\\/${tag}>`);
  const m = xml.match(re);
  return (m?.[1] ?? m?.[2] ?? "").trim();
}

/** 서비스 요약에서 카테고리 추론 */
function guessCategory(name: string, summary: string): WelfareCategory {
  const text = name + summary;
  if (/주거|전세|월세|임대|매입/.test(text)) return "주거";
  if (/교육|장학|학자|보육|어린이집|유치원/.test(text)) return "교육";
  if (/고용|취업|일자리|구직|창업|실업/.test(text)) return "고용";
  if (/건강|의료|진료|간호|간병|치료|출산|임신/.test(text)) return "건강";
  if (/문화|여가|체육|관광|여행/.test(text)) return "문화";
  if (/급여|수당|연금|지원금|바우처|양육|아동|장애|보훈/.test(text)) return "생활안정";
  return "기타";
}

function guessTarget(name: string, summary: string): string {
  const text = name + summary;
  if (/청년|19.*34|19~34|20.*30대/.test(text)) return "청년";
  if (/노인|어르신|65세|60세/.test(text)) return "노인";
  if (/장애/.test(text)) return "장애인";
  if (/한부모/.test(text)) return "한부모";
  if (/아동|아이|영유아|어린이/.test(text)) return "아동";
  if (/임산부|임신|출산/.test(text)) return "임산부";
  if (/저소득|기초생활|차상위|취약계층/.test(text)) return "저소득";
  if (/근로자|직장인|고용보험/.test(text)) return "직장인";
  if (/유공자|보훈/.test(text)) return "국가유공자";
  return "전체";
}

export async function GET() {
  const apiKey = process.env.WELFARE_API_KEY;
  if (!apiKey) {
    const empty: WelfareData = { services: [], totalCount: 0, updatedAt: new Date().toISOString(), isLive: false };
    return NextResponse.json(empty);
  }

  try {
    // 페이지네이션으로 전체 데이터 수집 (최대 4페이지 = 400건)
    const allItems: string[] = [];
    for (let page = 1; page <= 4; page++) {
      const url = new URL(ENDPOINT);
      url.searchParams.set("serviceKey", apiKey);
      url.searchParams.set("callTp", "L");
      url.searchParams.set("pageNo", String(page));
      url.searchParams.set("numOfRows", "100");
      url.searchParams.set("srchKeyCode", "003");

      const res = await fetch(url.toString(), { next: { revalidate: 86400 } });
      if (!res.ok) break;

      const xml = await res.text();
      const items = xml.match(/<servList>[\s\S]*?<\/servList>/g) || [];
      if (items.length === 0) break;
      allItems.push(...items);
    }

    const services: WelfareService[] = allItems.map((item) => {
      const id = xmlTag(item, "servId") || xmlTag(item, "SERV_ID") || "";
      const name = xmlTag(item, "servNm") || xmlTag(item, "SERV_NM") || "";
      const summary = xmlTag(item, "servDgst") || xmlTag(item, "SERV_DGST") || xmlTag(item, "servDg") || "";
      const dept = xmlTag(item, "jurMnofNm") || xmlTag(item, "JUR_MNOF_NM") || "";
      const applyMethod = xmlTag(item, "servDtlLink") || "";

      return {
        id,
        name,
        summary,
        category: guessCategory(name, summary),
        targetGroup: guessTarget(name, summary),
        department: dept,
        applyMethod: applyMethod ? "온라인 신청 가능" : "주민센터 방문 신청",
        url: applyMethod || undefined,
      };
    });

    const data: WelfareData = {
      services,
      totalCount: services.length,
      updatedAt: new Date().toISOString(),
      isLive: services.length > 0,
    };

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch {
    const empty: WelfareData = { services: [], totalCount: 0, updatedAt: new Date().toISOString(), isLive: false };
    return NextResponse.json(empty);
  }
}
