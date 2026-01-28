// 천간 (天干) - 10개
export type CheonganType = '갑' | '을' | '병' | '정' | '무' | '기' | '경' | '신' | '임' | '계';

// 지지 (地支) - 12개
export type JijiType = '자' | '축' | '인' | '묘' | '진' | '사' | '오' | '미' | '신' | '유' | '술' | '해';

// 오행 (五行)
export type OhaengType = '목' | '화' | '토' | '금' | '수';

// 음양
export type YinYangType = '양' | '음';

// 십신 (十神)
export type SibsinType = '비견' | '겁재' | '식신' | '상관' | '편재' | '정재' | '편관' | '정관' | '편인' | '정인';

// 기둥 (柱)
export interface Pillar {
  cheongan: CheonganType;
  jiji: JijiType;
  cheonganHanja: string;
  jijiHanja: string;
  cheonganOhaeng: OhaengType;
  jijiOhaeng: OhaengType;
  cheonganYinYang: YinYangType;
  jijiYinYang: YinYangType;
  jijiJijanggan: CheonganType[];
}

// 오행 분포
export interface OhaengDistribution {
  목: number;
  화: number;
  토: number;
  금: number;
  수: number;
}

// 대운 정보
export interface DaeunInfo {
  startAge: number;
  endAge: number;
  cheongan: CheonganType;
  jiji: JijiType;
  cheonganHanja: string;
  jijiHanja: string;
  isCurrent: boolean;
}

// 세운 정보
export interface SaeunInfo {
  year: number;
  cheongan: CheonganType;
  jiji: JijiType;
  cheonganHanja: string;
  jijiHanja: string;
}

// 사주 결과
export interface SajuResult {
  yearPillar: Pillar;
  monthPillar: Pillar;
  dayPillar: Pillar;
  hourPillar: Pillar;
  ohaeng: OhaengDistribution;
  ilgan: CheonganType;
  daeun: DaeunInfo[];
  saeun: SaeunInfo;
  gender: 'male' | 'female';
  birthDate: Date;
  isLunar: boolean;
}

// 궁합 결과
export interface CompatibilityResult {
  totalScore: number;
  categories: {
    ohaengHarmony: { score: number; description: string };
    cheonganHap: { score: number; description: string };
    jijiRelation: { score: number; description: string };
    iljuCompat: { score: number; description: string };
  };
  strengths: string[];
  concerns: string[];
  summary: string;
}

// 운세 카테고리
export interface FortuneCategory {
  name: string;
  score: number; // 1-5
  description: string;
}

// 상세 운세
export interface FortuneResult {
  year: number;
  overall: string;
  categories: {
    wealth: FortuneCategory;
    love: FortuneCategory;
    health: FortuneCategory;
    career: FortuneCategory;
  };
  monthlyFortune: { month: number; score: number; tip: string }[];
}

// 입력 폼
export interface SajuInput {
  year: number;
  month: number;
  day: number;
  hour: JijiType | null;
  isLunar: boolean;
  isLeapMonth: boolean;
  gender: 'male' | 'female';
}
