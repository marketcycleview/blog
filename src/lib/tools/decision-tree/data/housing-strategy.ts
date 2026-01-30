import type { DecisionTreeConfig, TreeRecommendation } from "../types";

const STRATEGIES: TreeRecommendation[] = [
  {
    id: "special-newlywed",
    name: "신혼부부 특별공급",
    provider: "LH/SH 등 사업주체",
    description: "혼인 7년 이내 무주택 세대구성원 대상. 소득·자산 기준 충족 시 높은 당첨 확률.",
    rate: "소득 100~130% 이하",
    limit: "혼인 7년 이내",
    period: "공고 시 수시",
    features: ["높은 당첨률", "소득 기준 완화 추세", "신혼희망타운 별도"],
    fit: 0,
  },
  {
    id: "special-first-life",
    name: "생애최초 특별공급",
    provider: "LH/SH 등 사업주체",
    description: "생애 첫 주택 구입자 대상. 5년 이상 소득세 납부 이력 필요. 2023년부터 소득 기준 완화.",
    rate: "소득 130% 이하",
    limit: "생애 첫 주택",
    period: "공고 시 수시",
    features: ["소득세 납부 이력 5년", "무주택 필수", "소득 기준 완화"],
    fit: 0,
  },
  {
    id: "special-multi-child",
    name: "다자녀 특별공급",
    provider: "LH/SH 등 사업주체",
    description: "미성년 자녀 3명 이상(일부 2명)인 무주택 세대. 자녀수·거주기간으로 점수 산정.",
    rate: "소득 무관 (일부 있음)",
    limit: "미성년 자녀 3명+",
    period: "공고 시 수시",
    features: ["자녀수 배점 높음", "무주택 필수", "공공분양 유리"],
    fit: 0,
  },
  {
    id: "special-old-parent",
    name: "노부모 부양 특별공급",
    provider: "LH/SH 등 사업주체",
    description: "만 65세 이상 직계존속을 3년 이상 부양하는 무주택 세대주 대상.",
    rate: "소득 무관",
    limit: "65세+ 직계존속 3년 부양",
    period: "공고 시 수시",
    features: ["부양 기간 3년+", "세대주 필수", "1순위 필수"],
    fit: 0,
  },
  {
    id: "general-points",
    name: "일반공급 (가점제)",
    provider: "사업주체",
    description: "무주택기간(32점) + 부양가족수(35점) + 청약통장 가입기간(17점) = 84점 만점. 가점이 높을수록 유리.",
    rate: "가점 84점 만점",
    limit: "1순위 충족",
    period: "공고 시 수시",
    features: ["무주택기간 최대 32점", "부양가족 최대 35점", "통장 최대 17점"],
    fit: 0,
  },
  {
    id: "general-random",
    name: "일반공급 (추첨제)",
    provider: "사업주체",
    description: "가점이 낮아도 추첨으로 당첨 가능. 주로 전용 85㎡ 초과 또는 투기과열지구 외 지역 물량.",
    rate: "추첨 (운)",
    limit: "1순위 충족",
    period: "공고 시 수시",
    features: ["가점 무관", "85㎡ 초과 물량", "비규제지역 유리"],
    fit: 0,
  },
  {
    id: "public-rental",
    name: "공공임대 (LH/SH)",
    provider: "LH/SH 공공기관",
    description: "저렴한 임대료로 장기 거주 가능. 국민임대(30년), 행복주택(6~20년), 영구임대 등.",
    rate: "시세 40~80%",
    limit: "소득·자산 기준",
    period: "수시 모집",
    features: ["장기 거주 안정", "저렴한 임대료", "소득 기준 있음"],
    fit: 0,
  },
  {
    id: "wait-accumulate",
    name: "가점 축적 후 재도전",
    provider: "-",
    description: "현재 가점이 낮다면 무주택 기간과 통장 가입 기간을 늘려 가점을 축적한 후 도전하는 전략.",
    rate: "-",
    limit: "-",
    period: "3~5년 후",
    features: ["무주택 유지", "통장 유지 납입", "부양가족 변동 대비"],
    fit: 0,
  },
];

function scoreStrategy(s: TreeRecommendation, answers: Record<string, string>): number {
  let score = 0;
  const { ageGroup, marriage, isHead, housing, savingsPeriod, income, children } = answers;

  // 신혼부부 특별공급
  if (s.id === "special-newlywed") {
    if (marriage === "newlywed") score += 30;
    if (housing === "homeless") score += 10;
    if (income === "low" || income === "mid") score += 10;
  }

  // 생애최초 특별공급
  if (s.id === "special-first-life") {
    if (housing === "homeless") score += 15;
    if (marriage !== "single") score += 5;
    if (income === "low" || income === "mid") score += 10;
    if (ageGroup === "30s" || ageGroup === "40s") score += 10;
  }

  // 다자녀 특별공급
  if (s.id === "special-multi-child") {
    if (children === "3plus") score += 35;
    if (children === "2") score += 15;
    if (housing === "homeless") score += 10;
  }

  // 노부모 부양
  if (s.id === "special-old-parent") {
    if (isHead === "head") score += 10;
    if (ageGroup === "40s" || ageGroup === "50plus") score += 15;
    if (savingsPeriod === "10plus") score += 5;
  }

  // 일반공급 가점제
  if (s.id === "general-points") {
    if (savingsPeriod === "5to10" || savingsPeriod === "10plus") score += 15;
    if (housing === "homeless") score += 10;
    if (ageGroup === "40s" || ageGroup === "50plus") score += 10;
    if (children === "2" || children === "3plus") score += 10;
    if (marriage === "married") score += 5;
  }

  // 일반공급 추첨제
  if (s.id === "general-random") {
    if (savingsPeriod === "under1" || savingsPeriod === "1to5") score += 15;
    if (ageGroup === "20s") score += 10;
    if (housing === "homeless") score += 5;
  }

  // 공공임대
  if (s.id === "public-rental") {
    if (income === "low") score += 25;
    if (income === "mid") score += 10;
    if (housing === "homeless") score += 10;
    if (ageGroup === "20s") score += 5;
  }

  // 가점 축적
  if (s.id === "wait-accumulate") {
    if (savingsPeriod === "under1" || savingsPeriod === "1to5") score += 15;
    if (ageGroup === "20s" || ageGroup === "30s") score += 10;
    if (housing === "homeless") score += 5;
  }

  return score;
}

export const housingStrategyConfig: DecisionTreeConfig = {
  id: "housing-subscription-guide",
  name: "나에게 맞는 청약 전략",
  description: "7개 질문에 답하면 나에게 맞는 청약 전략을 추천합니다.",
  questions: [
    {
      id: "ageGroup",
      question: "나이대는?",
      options: [
        { value: "20s", label: "만 19~29세" },
        { value: "30s", label: "만 30~39세" },
        { value: "40s", label: "만 40~49세" },
        { value: "50plus", label: "만 50세 이상" },
      ],
    },
    {
      id: "marriage",
      question: "혼인 상태는?",
      options: [
        { value: "single", label: "미혼" },
        { value: "newlywed", label: "신혼 (혼인 7년 이내)" },
        { value: "married", label: "기혼 (혼인 7년 초과)" },
      ],
    },
    {
      id: "isHead",
      question: "세대주인가요?",
      options: [
        { value: "head", label: "세대주" },
        { value: "member", label: "세대원" },
      ],
    },
    {
      id: "housing",
      question: "현재 주택 소유 상태는?",
      options: [
        { value: "homeless", label: "무주택" },
        { value: "one", label: "1주택 보유" },
        { value: "multi", label: "2주택 이상 보유" },
      ],
    },
    {
      id: "savingsPeriod",
      question: "청약통장 가입 기간은?",
      options: [
        { value: "none", label: "미가입" },
        { value: "under1", label: "1년 미만" },
        { value: "1to5", label: "1~5년" },
        { value: "5to10", label: "5~10년" },
        { value: "10plus", label: "10년 이상" },
      ],
    },
    {
      id: "income",
      question: "가구 소득 수준은?",
      description: "도시근로자 가구 월평균 소득 기준",
      options: [
        { value: "low", label: "중위소득 100% 이하" },
        { value: "mid", label: "중위소득 100~140%" },
        { value: "high", label: "중위소득 140% 초과" },
      ],
    },
    {
      id: "children",
      question: "미성년 자녀 수는?",
      options: [
        { value: "0", label: "없음" },
        { value: "1", label: "1명" },
        { value: "2", label: "2명" },
        { value: "3plus", label: "3명 이상" },
      ],
    },
  ],
  getResult(answers) {
    const scored = STRATEGIES.map((s) => ({ ...s, fit: scoreStrategy(s, answers) }));
    scored.sort((a, b) => b.fit - a.fit);
    const top = scored.filter((s) => s.fit > 0).slice(0, 5);
    const maxFit = top[0]?.fit || 1;
    const recommendations = top.map((s) => ({
      ...s,
      fit: Math.max(1, Math.round((s.fit / maxFit) * 5)),
    }));

    // 예상 가점 계산
    const agePoints: Record<string, number> = { "20s": 2, "30s": 12, "40s": 22, "50plus": 32 };
    const savingsPoints: Record<string, number> = { none: 0, under1: 1, "1to5": 5, "5to10": 10, "10plus": 17 };
    const childPoints: Record<string, number> = { "0": 5, "1": 10, "2": 20, "3plus": 35 };
    const estimatedPoints =
      (agePoints[answers.ageGroup] || 0) +
      (savingsPoints[answers.savingsPeriod] || 0) +
      (childPoints[answers.children] || 0);

    return {
      title: "나의 청약 전략 추천",
      summary: `예상 가점: 약 ${estimatedPoints}점/84점. 조건에 맞는 청약 전략 ${recommendations.length}가지를 추천합니다.`,
      recommendations,
      warning: answers.housing !== "homeless"
        ? "주택을 보유하고 계시면 대부분의 특별공급과 1순위 자격이 제한됩니다. 처분 후 무주택 기간을 확보하는 것이 유리합니다."
        : undefined,
    };
  },
};
