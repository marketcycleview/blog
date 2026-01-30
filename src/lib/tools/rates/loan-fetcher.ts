import type {
  FSSLoanBase,
  FSSLoanResponse,
  FSSMortgageOption,
  FSSJeonseOption,
  FSSCreditBase,
  FSSCreditOption,
  MortgageProduct,
  MortgageData,
  JeonseLoanProduct,
  JeonseLoanData,
  CreditLoanProduct,
  CreditLoanData,
} from "./loan-types";
import {
  getSampleMortgageData,
  getSampleJeonseLoanData,
  getSampleCreditLoanData,
} from "./loan-sample";

const FSS_BASE_URL = "https://finlife.fss.or.kr/finlifeapi";

async function fetchLoanAPI<B, O>(
  endpoint: string,
  auth: string
): Promise<FSSLoanResponse<B, O>> {
  const url = `${FSS_BASE_URL}/${endpoint}?auth=${auth}&topFinGrpNo=020000&pageNo=1`;
  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error(`FSS API error: ${res.status}`);
  return res.json();
}

// === 주택담보대출 ===

function joinMortgage(
  baseList: FSSLoanBase[],
  optionList: FSSMortgageOption[]
): MortgageProduct[] {
  const products: MortgageProduct[] = [];
  for (const opt of optionList) {
    const base = baseList.find(
      (b) => b.fin_co_no === opt.fin_co_no && b.fin_prdt_cd === opt.fin_prdt_cd
    );
    if (!base || opt.lend_rate_min == null) continue;
    products.push({
      bankName: base.kor_co_nm,
      productName: base.fin_prdt_nm,
      joinWay: base.join_way,
      mortgageType: opt.mrtg_type_nm,
      repayType: opt.rpay_type_nm,
      rateType: opt.lend_rate_type_nm,
      minRate: opt.lend_rate_min,
      maxRate: opt.lend_rate_max ?? opt.lend_rate_min,
      avgRate: opt.lend_rate_avg,
      earlyRepayFee: base.erly_rpay_fee,
      loanLimit: base.loan_lmt,
    });
  }
  return products;
}

export async function fetchMortgageRates(): Promise<MortgageData> {
  const auth = process.env.FSS_FINLIFE_API_KEY;
  if (!auth) return getSampleMortgageData();

  try {
    const res = await fetchLoanAPI<FSSLoanBase, FSSMortgageOption>(
      "mortgageLoanProductsSearch.json",
      auth
    );
    if (res.result.err_cd !== "000") throw new Error(res.result.err_msg);
    return {
      products: joinMortgage(res.result.baseList, res.result.optionList),
      updatedAt: new Date().toISOString(),
      isLive: true,
    };
  } catch (e) {
    console.error("[mortgage] fetch failed:", e);
    return getSampleMortgageData();
  }
}

// === 전세자금대출 ===

function joinJeonse(
  baseList: FSSLoanBase[],
  optionList: FSSJeonseOption[]
): JeonseLoanProduct[] {
  const products: JeonseLoanProduct[] = [];
  for (const opt of optionList) {
    const base = baseList.find(
      (b) => b.fin_co_no === opt.fin_co_no && b.fin_prdt_cd === opt.fin_prdt_cd
    );
    if (!base || opt.lend_rate_min == null) continue;
    products.push({
      bankName: base.kor_co_nm,
      productName: base.fin_prdt_nm,
      joinWay: base.join_way,
      repayType: opt.rpay_type_nm,
      rateType: opt.lend_rate_type_nm,
      minRate: opt.lend_rate_min,
      maxRate: opt.lend_rate_max ?? opt.lend_rate_min,
      avgRate: opt.lend_rate_avg,
      earlyRepayFee: base.erly_rpay_fee,
      loanLimit: base.loan_lmt,
    });
  }
  return products;
}

export async function fetchJeonseLoanRates(): Promise<JeonseLoanData> {
  const auth = process.env.FSS_FINLIFE_API_KEY;
  if (!auth) return getSampleJeonseLoanData();

  try {
    const res = await fetchLoanAPI<FSSLoanBase, FSSJeonseOption>(
      "rentHouseLoanProductsSearch.json",
      auth
    );
    if (res.result.err_cd !== "000") throw new Error(res.result.err_msg);
    return {
      products: joinJeonse(res.result.baseList, res.result.optionList),
      updatedAt: new Date().toISOString(),
      isLive: true,
    };
  } catch (e) {
    console.error("[jeonse] fetch failed:", e);
    return getSampleJeonseLoanData();
  }
}

// === 개인신용대출 ===

function joinCredit(
  baseList: FSSCreditBase[],
  optionList: FSSCreditOption[]
): CreditLoanProduct[] {
  const products: CreditLoanProduct[] = [];
  // "A" (대출금리) 타입만 필터
  const loanRateOptions = optionList.filter(
    (o) => o.crdt_lend_rate_type === "A"
  );

  for (const opt of loanRateOptions) {
    const base = baseList.find(
      (b) =>
        b.fin_co_no === opt.fin_co_no &&
        b.fin_prdt_cd === opt.fin_prdt_cd &&
        b.crdt_prdt_type === opt.crdt_prdt_type
    );
    if (!base) continue;
    products.push({
      bankName: base.kor_co_nm,
      productName: base.fin_prdt_nm,
      joinWay: base.join_way,
      cbName: base.cb_name,
      productType: base.crdt_prdt_type_nm,
      rates: {
        crdt_grad_1: opt.crdt_grad_1,
        crdt_grad_4: opt.crdt_grad_4,
        crdt_grad_5: opt.crdt_grad_5,
        crdt_grad_6: opt.crdt_grad_6,
        crdt_grad_10: opt.crdt_grad_10,
        crdt_grad_11: opt.crdt_grad_11,
        crdt_grad_12: opt.crdt_grad_12,
        crdt_grad_13: opt.crdt_grad_13,
      },
      avgRate: opt.crdt_grad_avg,
    });
  }
  return products;
}

export async function fetchCreditLoanRates(): Promise<CreditLoanData> {
  const auth = process.env.FSS_FINLIFE_API_KEY;
  if (!auth) return getSampleCreditLoanData();

  try {
    const res = await fetchLoanAPI<FSSCreditBase, FSSCreditOption>(
      "creditLoanProductsSearch.json",
      auth
    );
    if (res.result.err_cd !== "000") throw new Error(res.result.err_msg);
    return {
      products: joinCredit(res.result.baseList, res.result.optionList),
      updatedAt: new Date().toISOString(),
      isLive: true,
    };
  } catch (e) {
    console.error("[credit] fetch failed:", e);
    return getSampleCreditLoanData();
  }
}
