import type { DecisionTreeConfig, TreeRecommendation } from "../types";

const CAREER_PATHS: TreeRecommendation[] = [
  {
    id: "employment",
    name: "취업 (정규직)",
    provider: "기업",
    description: "안정적인 소득과 4대보험, 퇴직금이 보장됩니다. 경력 개발과 조직 내 성장이 가능합니다.",
    rate: "소득: 안정적",
    limit: "자유도: 낮음",
    period: "시작: 즉시 가능",
    features: ["4대보험", "퇴직금", "안정적 소득", "경력 개발", "조직 내 성장"],
    fit: 0,
    link: { label: "연봉 계산기", href: "/ko/tools/salary-calculator" },
  },
  {
    id: "freelancer",
    name: "프리랜서",
    provider: "본인",
    description: "시간과 장소의 자유, 다양한 프로젝트 경험이 가능합니다. 소득 변동성은 있지만 역량에 따라 고소득 가능.",
    rate: "소득: 변동적",
    limit: "자유도: 높음",
    period: "시작: 1~2개월",
    features: ["시간 자유", "장소 자유", "다양한 프로젝트", "역량 기반 소득", "사업자등록 필요"],
    fit: 0,
  },
  {
    id: "startup",
    name: "창업",
    provider: "본인",
    description: "자신의 사업을 통해 큰 성장 가능성이 있습니다. 초기 투자가 필요하고 리스크가 높지만 성공 시 보상이 큽니다.",
    rate: "소득: 불확실",
    limit: "자유도: 매우 높음",
    period: "시작: 3~6개월",
    features: ["성장 가능성", "자기 결정권", "자산 형성", "초기 투자 필요", "높은 리스크"],
    fit: 0,
    link: { label: "창업 로드맵", href: "/ko/tools/startup-roadmap-timeline" },
  },
  {
    id: "side-hustle",
    name: "투잡 (본업 + 부업)",
    provider: "본인 + 기업",
    description: "현재 직장을 유지하면서 부업으로 추가 수입을 얻습니다. 안정성과 추가 수입을 동시에 확보할 수 있습니다.",
    rate: "소득: 본업 + α",
    limit: "자유도: 보통",
    period: "시작: 즉시",
    features: ["안정적 본업", "추가 수입", "경험 축적", "시간 관리 중요", "체력 필요"],
    fit: 0,
  },
  {
    id: "contract",
    name: "계약직/파견직",
    provider: "기업/파견사",
    description: "일정 기간 근무하며 다양한 기업 경험이 가능합니다. 정규직 전환 기회도 있습니다.",
    rate: "소득: 중간",
    limit: "자유도: 보통",
    period: "시작: 즉시",
    features: ["다양한 경험", "정규직 전환 가능", "유연한 근무", "고용 불안정"],
    fit: 0,
  },
];

function scorePath(p: TreeRecommendation, answers: Record<string, string>): number {
  let score = 0;
  const { priority, riskTolerance, capital, experience, workStyle, income } = answers;

  // 안정성 우선
  if (priority === "stability") {
    if (p.id === "employment") score += 25;
    if (p.id === "side-hustle") score += 15;
    if (p.id === "contract") score += 10;
  }
  // 자유/유연성 우선
  if (priority === "freedom") {
    if (p.id === "freelancer") score += 25;
    if (p.id === "startup") score += 15;
    if (p.id === "side-hustle") score += 10;
  }
  // 성장/수입 우선
  if (priority === "growth") {
    if (p.id === "startup") score += 25;
    if (p.id === "freelancer") score += 15;
    if (p.id === "employment") score += 10;
  }

  // 리스크 성향
  if (riskTolerance === "low") {
    if (["employment", "contract", "side-hustle"].includes(p.id)) score += 15;
  }
  if (riskTolerance === "medium") {
    if (["freelancer", "side-hustle"].includes(p.id)) score += 15;
  }
  if (riskTolerance === "high") {
    if (["startup", "freelancer"].includes(p.id)) score += 15;
  }

  // 자본금
  if (capital === "none") {
    if (["employment", "freelancer", "contract"].includes(p.id)) score += 10;
  }
  if (capital === "some") {
    if (["side-hustle", "freelancer"].includes(p.id)) score += 10;
  }
  if (capital === "enough") {
    if (p.id === "startup") score += 15;
  }

  // 경험
  if (experience === "none") {
    if (["employment", "contract"].includes(p.id)) score += 10;
  }
  if (experience === "some") {
    if (["freelancer", "side-hustle"].includes(p.id)) score += 10;
  }
  if (experience === "expert") {
    if (["startup", "freelancer"].includes(p.id)) score += 15;
  }

  // 근무 스타일
  if (workStyle === "team") {
    if (["employment", "contract"].includes(p.id)) score += 10;
  }
  if (workStyle === "solo") {
    if (["freelancer", "startup"].includes(p.id)) score += 10;
  }
  if (workStyle === "mixed") {
    if (p.id === "side-hustle") score += 10;
  }

  // 소득 필요
  if (income === "urgent") {
    if (["employment", "contract"].includes(p.id)) score += 15;
  }
  if (income === "flexible") {
    if (["freelancer", "startup"].includes(p.id)) score += 10;
  }

  return score;
}

export const careerPathConfig: DecisionTreeConfig = {
  id: "career-path-diagnosis",
  name: "창업 vs 프리랜서 vs 취업 진단",
  description: "6개 질문에 답하면 나에게 맞는 커리어 경로를 추천합니다.",
  questions: [
    {
      id: "priority",
      question: "가장 중요하게 생각하는 것은?",
      options: [
        { value: "stability", label: "안정적인 소득과 고용 보장" },
        { value: "freedom", label: "시간·장소의 자유와 유연성" },
        { value: "growth", label: "큰 성장 가능성과 높은 수입" },
      ],
    },
    {
      id: "riskTolerance",
      question: "리스크(위험) 감수 성향은?",
      options: [
        { value: "low", label: "안전 우선 (리스크 최소화)" },
        { value: "medium", label: "적당한 리스크는 감수 가능" },
        { value: "high", label: "높은 리스크도 감수 (높은 보상 기대)" },
      ],
    },
    {
      id: "capital",
      question: "투자할 수 있는 자본금은?",
      options: [
        { value: "none", label: "없음 (당장 수입이 필요)" },
        { value: "some", label: "소액 가능 (500만원 이내)" },
        { value: "enough", label: "여유 있음 (1,000만원 이상)" },
      ],
    },
    {
      id: "experience",
      question: "관련 분야 경험은?",
      options: [
        { value: "none", label: "경험 없음 (새로운 분야)" },
        { value: "some", label: "1~3년 경험" },
        { value: "expert", label: "5년 이상 전문 경험" },
      ],
    },
    {
      id: "workStyle",
      question: "선호하는 근무 방식은?",
      options: [
        { value: "team", label: "팀에서 함께 일하는 것" },
        { value: "solo", label: "혼자 독립적으로 일하는 것" },
        { value: "mixed", label: "상황에 따라 유연하게" },
      ],
    },
    {
      id: "income",
      question: "소득 시작 시기는?",
      description: "당장 수입이 필요한지, 여유가 있는지",
      options: [
        { value: "urgent", label: "당장 소득이 필요 (1~2개월 내)" },
        { value: "moderate", label: "3~6개월 여유 있음" },
        { value: "flexible", label: "1년 이상 여유 있음" },
      ],
    },
  ],
  getResult(answers) {
    const scored = CAREER_PATHS.map((p) => ({ ...p, fit: scorePath(p, answers) }));
    scored.sort((a, b) => b.fit - a.fit);
    const top = scored.filter((s) => s.fit > 0).slice(0, 4);
    const maxFit = top[0]?.fit || 1;
    const recommendations = top.map((s) => ({
      ...s,
      fit: Math.max(1, Math.round((s.fit / maxFit) * 5)),
    }));

    return {
      title: "나의 커리어 경로 추천",
      summary: `입력하신 성향과 조건에 맞는 커리어 경로 ${recommendations.length}가지를 추천합니다.`,
      recommendations,
      warning: "본 진단은 일반적인 참고 자료이며, 실제 결정은 개인 상황을 종합적으로 고려하세요.",
    };
  },
};
