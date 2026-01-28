// 대상 그룹
export type TargetGroup =
  | "youth" // 청년 (만 19~34세)
  | "student" // 대학생
  | "jobseeker" // 구직자/실업자
  | "worker" // 직장인
  | "selfemployed" // 자영업자
  | "senior" // 노인 (만 65세 이상)
  | "disabled" // 장애인
  | "singleparent" // 한부모
  | "multicultural" // 다문화가정
  | "pregnant" // 임산부
  | "infant" // 영유아 (0~6세)
  | "child" // 아동 (7~17세)
  | "veteran" // 국가유공자
  | "farmer" // 농업인
  | "lowIncome" // 저소득층
  | "renter"; // 임차인

// 주거 형태
export type HousingType =
  | "own" // 자가
  | "jeonse" // 전세
  | "rent" // 월세
  | "homeless" // 무주택
  | "public"; // 공공임대

// 가구 유형
export type HouseholdType =
  | "single" // 1인 가구
  | "couple" // 신혼부부
  | "family" // 일반 가족
  | "multiChild" // 다자녀 (3자녀 이상)
  | "grandparent" // 조손가정
  | "independent"; // 독립 (부모 별거)

// 지역
export type Region =
  | "seoul"
  | "gyeonggi"
  | "incheon"
  | "busan"
  | "daegu"
  | "daejeon"
  | "gwangju"
  | "ulsan"
  | "sejong"
  | "gangwon"
  | "chungbuk"
  | "chungnam"
  | "jeonbuk"
  | "jeonnam"
  | "gyeongbuk"
  | "gyeongnam"
  | "jeju";

// 성별
export type Gender = "male" | "female";

// 소득 기준 타입
export type IncomeType = "median" | "fixed" | "none";

// 지원 타입
export type BenefitType = "monthly" | "onetime" | "yearly" | "loan" | "other";

// 정책 자격요건
export interface Eligibility {
  age?: {
    min?: number;
    max?: number;
    note?: string;
  };
  income?: {
    type: IncomeType;
    percent?: number; // 중위소득 %
    maxAmount?: number; // 고정 금액 (만원)
    note?: string;
  };
  asset?: {
    max?: number; // 만원 단위
    note?: string;
  };
  targetGroups: TargetGroup[];
  housing?: HousingType[];
  householdType?: HouseholdType[];
  region?: Region | null; // null = 전국
  gender?: Gender | null; // null = 무관
  disabilityRequired?: boolean;
  specialConditions?: string[];
}

// 지원 혜택
export interface Benefit {
  amount?: number; // 원 단위
  duration?: number; // 개월
  type: BenefitType;
  note?: string;
}

// 복지 정책 인덱스 아이템
export interface WelfarePolicy {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  eligibility: Eligibility;
  benefit: Benefit;
}

// 사용자 입력 조건
export interface UserConditions {
  age?: number | null;
  gender?: Gender | null;
  region?: Region | null;
  incomePercent?: number | null; // 예: 50, 60, 100, 150
  targetGroups: TargetGroup[];
  housing?: HousingType | null;
  householdTypes: HouseholdType[];
  hasDisability: boolean;
  isPregnant: boolean;
  specialConditions: string[];
}

// 필터 결과
export interface FilterResult {
  policy: WelfarePolicy;
  matchScore: number; // 매칭 점수 (높을수록 적합)
  matchedCriteria: string[]; // 매칭된 기준들
}
