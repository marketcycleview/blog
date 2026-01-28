import type {
  TargetGroup,
  HousingType,
  HouseholdType,
  Region,
  Gender,
} from "./types";

// 대상 그룹 라벨
export const TARGET_GROUP_LABELS: Record<TargetGroup, string> = {
  youth: "청년",
  student: "대학생",
  jobseeker: "구직자/실업자",
  worker: "직장인",
  selfemployed: "자영업자",
  senior: "노인",
  disabled: "장애인",
  singleparent: "한부모",
  multicultural: "다문화가정",
  pregnant: "임산부",
  infant: "영유아",
  child: "아동",
  veteran: "국가유공자",
  farmer: "농업인",
  lowIncome: "저소득층",
  renter: "임차인",
};

// 주거 형태 라벨
export const HOUSING_TYPE_LABELS: Record<HousingType, string> = {
  own: "자가",
  jeonse: "전세",
  rent: "월세",
  homeless: "무주택",
  public: "공공임대",
};

// 가구 유형 라벨
export const HOUSEHOLD_TYPE_LABELS: Record<HouseholdType, string> = {
  single: "1인 가구",
  couple: "신혼부부",
  family: "일반 가족",
  multiChild: "다자녀 (3자녀+)",
  grandparent: "조손가정",
  independent: "독립 (부모 별거)",
};

// 지역 라벨
export const REGION_LABELS: Record<Region, string> = {
  seoul: "서울",
  gyeonggi: "경기",
  incheon: "인천",
  busan: "부산",
  daegu: "대구",
  daejeon: "대전",
  gwangju: "광주",
  ulsan: "울산",
  sejong: "세종",
  gangwon: "강원",
  chungbuk: "충북",
  chungnam: "충남",
  jeonbuk: "전북",
  jeonnam: "전남",
  gyeongbuk: "경북",
  gyeongnam: "경남",
  jeju: "제주",
};

// 성별 라벨
export const GENDER_LABELS: Record<Gender, string> = {
  male: "남성",
  female: "여성",
};

// 소득 수준 옵션
export const INCOME_LEVEL_OPTIONS = [
  { value: 50, label: "중위소득 50% 이하 (기초생활)" },
  { value: 60, label: "중위소득 60% 이하" },
  { value: 80, label: "중위소득 80% 이하" },
  { value: 100, label: "중위소득 100% 이하" },
  { value: 150, label: "중위소득 150% 이하" },
  { value: 200, label: "중위소득 200% 이하" },
  { value: 999, label: "중위소득 200% 초과" },
] as const;

// 필터 카테고리 그룹
export const FILTER_CATEGORIES = {
  basic: {
    label: "기본 정보",
    items: ["age", "gender", "region"],
  },
  income: {
    label: "소득 수준",
    items: ["incomePercent"],
  },
  occupation: {
    label: "직업/상황",
    items: ["youth", "student", "jobseeker", "worker", "selfemployed", "senior"],
  },
  housing: {
    label: "주거 형태",
    items: ["homeless", "jeonse", "rent", "own", "public"],
  },
  household: {
    label: "가구 유형",
    items: ["single", "couple", "multiChild", "grandparent"],
  },
  special: {
    label: "특수 상황",
    items: [
      "disabled",
      "pregnant",
      "singleparent",
      "multicultural",
      "veteran",
      "infant",
      "child",
    ],
  },
} as const;

// 2026년 기준 중위소득 (4인 가구 기준, 원)
export const MEDIAN_INCOME_2026 = {
  1: 2_563_281,
  2: 4_193_119,
  3: 5_366_268,
  4: 6_494_738,
  5: 7_541_716,
  6: 8_533_276,
} as const;

// 지원금액 포맷
export function formatAmount(amount: number): string {
  if (amount >= 100_000_000) {
    return `${(amount / 100_000_000).toFixed(0)}억원`;
  }
  if (amount >= 10_000) {
    return `${(amount / 10_000).toFixed(0)}만원`;
  }
  return `${amount.toLocaleString()}원`;
}

// 지원기간 포맷
export function formatDuration(months: number): string {
  if (months >= 12 && months % 12 === 0) {
    return `${months / 12}년`;
  }
  if (months >= 12) {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    return `${years}년 ${remainingMonths}개월`;
  }
  return `${months}개월`;
}
