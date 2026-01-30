// FSS 금융상품한눈에 API 응답 타입
export interface FSSBaseProduct {
  fin_co_no: string; // 금융회사 코드
  fin_prdt_cd: string; // 금융상품 코드
  kor_co_nm: string; // 금융회사명
  fin_prdt_nm: string; // 금융상품명
  join_way: string; // 가입방법
  mtrt_int: string; // 만기 후 이자율
  spcl_cnd: string; // 우대조건
  join_deny: string; // 가입제한 (1:제한없음, 2:서민전용, 3:일부제한)
  join_member: string; // 가입대상
  etc_note: string; // 기타 유의사항
  max_limit: number | null; // 최고한도
}

export interface FSSOptionItem {
  fin_co_no: string;
  fin_prdt_cd: string;
  intr_rate_type: string; // 저축금리유형 (S:단리, M:복리)
  intr_rate_type_nm: string; // 저축금리유형명
  save_trm: string; // 저축기간 (개월)
  intr_rate: number | null; // 기본금리
  intr_rate2: number | null; // 최고금리
}

export interface FSSApiResponse {
  result: {
    prdt_div: string;
    total_count: string;
    max_page_no: string;
    now_page_no: string;
    err_cd: string;
    err_msg: string;
    baseList: FSSBaseProduct[];
    optionList: FSSOptionItem[];
  };
}

// 정제된 금리 상품 타입
export interface RateProduct {
  bankName: string; // 은행명
  productName: string; // 상품명
  joinWay: string; // 가입방법
  saveTerm: number; // 저축기간 (개월)
  baseRate: number; // 기본금리 (%)
  maxRate: number; // 최고금리 (%)
  rateType: string; // 금리유형 (단리/복리)
  specialCondition: string; // 우대조건
  joinDeny: string; // 가입제한
}

// 전체 금리 데이터
export interface RatesData {
  deposits: RateProduct[]; // 정기예금
  savings: RateProduct[]; // 적금
  updatedAt: string; // 업데이트 시간 (ISO string)
  isLive: boolean; // API 실데이터 여부
}
