import type { FSSApiResponse, RateProduct, RatesData } from "./types";
import { getSampleData } from "./sample-data";

const FSS_BASE_URL = "https://finlife.fss.or.kr/finlifeapi";

function joinProducts(response: FSSApiResponse): RateProduct[] {
  const { baseList, optionList } = response.result;
  const products: RateProduct[] = [];

  for (const option of optionList) {
    const base = baseList.find(
      (b) =>
        b.fin_co_no === option.fin_co_no &&
        b.fin_prdt_cd === option.fin_prdt_cd
    );
    if (!base) continue;
    if (option.intr_rate == null && option.intr_rate2 == null) continue;

    products.push({
      bankName: base.kor_co_nm,
      productName: base.fin_prdt_nm,
      joinWay: base.join_way,
      saveTerm: Number(option.save_trm),
      baseRate: option.intr_rate ?? 0,
      maxRate: option.intr_rate2 ?? option.intr_rate ?? 0,
      rateType: option.intr_rate_type_nm || "단리",
      specialCondition: base.spcl_cnd || "",
      joinDeny:
        base.join_deny === "1"
          ? "제한없음"
          : base.join_deny === "2"
            ? "서민전용"
            : "일부제한",
    });
  }

  return products;
}

async function fetchFromFSS(
  endpoint: string,
  auth: string,
  topFinGrpNo: string = "020000"
): Promise<FSSApiResponse> {
  const url = `${FSS_BASE_URL}/${endpoint}?auth=${auth}&topFinGrpNo=${topFinGrpNo}&pageNo=1`;
  const res = await fetch(url, { next: { revalidate: 86400 } });

  if (!res.ok) {
    throw new Error(`FSS API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function fetchDeposits(auth: string): Promise<RateProduct[]> {
  const response = await fetchFromFSS("depositProductsSearch.json", auth);
  if (response.result.err_cd !== "000") {
    throw new Error(`FSS API error: ${response.result.err_msg}`);
  }
  return joinProducts(response);
}

export async function fetchSavings(auth: string): Promise<RateProduct[]> {
  const response = await fetchFromFSS("savingProductsSearch.json", auth);
  if (response.result.err_cd !== "000") {
    throw new Error(`FSS API error: ${response.result.err_msg}`);
  }
  return joinProducts(response);
}

export async function fetchAllRates(): Promise<RatesData> {
  const auth = process.env.FSS_FINLIFE_API_KEY;

  if (!auth) {
    console.log("[rates] FSS_FINLIFE_API_KEY not set, using sample data");
    return getSampleData();
  }

  try {
    const [deposits, savings] = await Promise.all([
      fetchDeposits(auth),
      fetchSavings(auth),
    ]);

    return {
      deposits,
      savings,
      updatedAt: new Date().toISOString(),
      isLive: true,
    };
  } catch (error) {
    console.error("[rates] FSS API fetch failed, using sample data:", error);
    return getSampleData();
  }
}
