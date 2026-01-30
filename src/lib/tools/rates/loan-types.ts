// === 공통 대출 API 응답 타입 ===

export interface FSSLoanBase {
  dcls_month: string;
  fin_co_no: string;
  fin_prdt_cd: string;
  kor_co_nm: string;
  fin_prdt_nm: string;
  join_way: string;
  loan_inci_expn: string;
  erly_rpay_fee: string;
  dly_rate: string;
  loan_lmt: string;
  dcls_strt_day: string;
  dcls_end_day: string | null;
  fin_co_subm_day: string;
}

// 주택담보대출 옵션
export interface FSSMortgageOption {
  dcls_month: string;
  fin_co_no: string;
  fin_prdt_cd: string;
  mrtg_type: string; // A=아파트, B=연립다세대 등
  mrtg_type_nm: string;
  rpay_type: string; // S=만기일시, D=분할상환
  rpay_type_nm: string;
  lend_rate_type: string; // F=고정, C=변동, H=혼합
  lend_rate_type_nm: string;
  lend_rate_min: number | null;
  lend_rate_max: number | null;
  lend_rate_avg: number | null;
}

// 전세자금대출 옵션
export interface FSSJeonseOption {
  dcls_month: string;
  fin_co_no: string;
  fin_prdt_cd: string;
  rpay_type: string;
  rpay_type_nm: string;
  lend_rate_type: string;
  lend_rate_type_nm: string;
  lend_rate_min: number | null;
  lend_rate_max: number | null;
  lend_rate_avg: number | null;
}

// 개인신용대출 base
export interface FSSCreditBase {
  dcls_month: string;
  fin_co_no: string;
  fin_prdt_cd: string;
  crdt_prdt_type: string;
  kor_co_nm: string;
  fin_prdt_nm: string;
  join_way: string;
  cb_name: string;
  crdt_prdt_type_nm: string;
  dcls_strt_day: string;
  dcls_end_day: string | null;
  fin_co_subm_day: string;
}

// 개인신용대출 옵션
export interface FSSCreditOption {
  dcls_month: string;
  fin_co_no: string;
  fin_prdt_cd: string;
  crdt_prdt_type: string;
  crdt_lend_rate_type: string; // A=대출금리, B=기준금리, C=가산금리
  crdt_lend_rate_type_nm: string;
  crdt_grad_1: number | null;
  crdt_grad_4: number | null;
  crdt_grad_5: number | null;
  crdt_grad_6: number | null;
  crdt_grad_10: number | null;
  crdt_grad_11: number | null;
  crdt_grad_12: number | null;
  crdt_grad_13: number | null;
  crdt_grad_avg: number | null;
}

// API 응답 wrapper
export interface FSSLoanResponse<B, O> {
  result: {
    prdt_div: string;
    total_count: string;
    max_page_no: string;
    now_page_no: string;
    err_cd: string;
    err_msg: string;
    baseList: B[];
    optionList: O[];
  };
}

// === 정제된 타입 ===

export interface MortgageProduct {
  bankName: string;
  productName: string;
  joinWay: string;
  mortgageType: string; // 아파트, 연립다세대 등
  repayType: string; // 만기일시, 분할상환
  rateType: string; // 고정, 변동, 혼합
  minRate: number;
  maxRate: number;
  avgRate: number | null;
  earlyRepayFee: string;
  loanLimit: string;
}

export interface MortgageData {
  products: MortgageProduct[];
  updatedAt: string;
  isLive: boolean;
}

export interface JeonseLoanProduct {
  bankName: string;
  productName: string;
  joinWay: string;
  repayType: string;
  rateType: string;
  minRate: number;
  maxRate: number;
  avgRate: number | null;
  earlyRepayFee: string;
  loanLimit: string;
}

export interface JeonseLoanData {
  products: JeonseLoanProduct[];
  updatedAt: string;
  isLive: boolean;
}

export interface CreditLoanProduct {
  bankName: string;
  productName: string;
  joinWay: string;
  cbName: string;
  productType: string; // 일반신용대출 등
  rates: Record<string, number | null>; // grade key → rate
  avgRate: number | null;
}

export interface CreditLoanData {
  products: CreditLoanProduct[];
  updatedAt: string;
  isLive: boolean;
}

export const CREDIT_GRADES = [
  { key: "crdt_grad_1", label: "1등급" },
  { key: "crdt_grad_4", label: "4등급" },
  { key: "crdt_grad_5", label: "5등급" },
  { key: "crdt_grad_6", label: "6등급" },
  { key: "crdt_grad_10", label: "10등급" },
  { key: "crdt_grad_11", label: "11등급" },
  { key: "crdt_grad_12", label: "12등급" },
  { key: "crdt_grad_13", label: "13등급" },
] as const;
