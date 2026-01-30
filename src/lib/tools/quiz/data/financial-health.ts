import type { QuizConfig, CategoryScore } from "../types";

export const financialHealthQuiz: QuizConfig = {
  id: "financial-health",
  name: "나의 재무 건강 점수",
  description: "5개 영역을 진단하고 100점 만점으로 재무 건강 상태를 알려드립니다.",

  questions: [
    // ─── 저축 (3문제, 최대 20점) ───
    {
      id: "saving-rate",
      category: "저축",
      question: "월 소득 대비 저축 비율은?",
      options: [
        { label: "저축을 거의 못 하고 있다", score: 0 },
        { label: "10% 미만", score: 3 },
        { label: "10~20%", score: 5 },
        { label: "20% 이상", score: 7 },
      ],
    },
    {
      id: "saving-account",
      category: "저축",
      question: "목적별 통장을 분리해서 사용하나요?",
      options: [
        { label: "하나의 통장만 사용", score: 0 },
        { label: "2개 정도 분리", score: 3 },
        { label: "목적별(생활비/저축/비상금) 완전 분리", score: 6 },
      ],
    },
    {
      id: "saving-auto",
      category: "저축",
      question: "자동이체로 저축하고 있나요?",
      options: [
        { label: "남는 돈이 있으면 저축", score: 0 },
        { label: "일부만 자동이체", score: 3 },
        { label: "급여일에 자동이체 설정 완료", score: 7 },
      ],
    },

    // ─── 부채 관리 (3문제, 최대 20점) ───
    {
      id: "debt-ratio",
      category: "부채 관리",
      question: "월 소득 대비 부채 상환(원리금) 비율은?",
      options: [
        { label: "부채가 없다", score: 7 },
        { label: "20% 미만", score: 5 },
        { label: "20~40%", score: 2 },
        { label: "40% 이상", score: 0 },
      ],
    },
    {
      id: "debt-high-rate",
      category: "부채 관리",
      question: "고금리(연 10% 이상) 부채가 있나요?",
      options: [
        { label: "없다", score: 7 },
        { label: "있지만 상환 계획이 있다", score: 3 },
        { label: "있고 상환 계획이 없다", score: 0 },
      ],
    },
    {
      id: "credit-score",
      category: "부채 관리",
      question: "본인의 신용점수를 얼마나 자주 확인하나요?",
      options: [
        { label: "확인한 적 없다 / 모른다", score: 0 },
        { label: "1년에 한 번 정도", score: 3 },
        { label: "분기마다 또는 더 자주", score: 6 },
      ],
    },

    // ─── 보험 (3문제, 최대 20점) ───
    {
      id: "insurance-health",
      category: "보험",
      question: "실손보험에 가입되어 있나요?",
      options: [
        { label: "아니오", score: 0 },
        { label: "예", score: 7 },
      ],
    },
    {
      id: "insurance-4",
      category: "보험",
      question: "4대보험 가입 상태는?",
      options: [
        { label: "미가입 / 모른다", score: 0 },
        { label: "지역가입자", score: 4 },
        { label: "직장 가입자", score: 7 },
      ],
    },
    {
      id: "insurance-ratio",
      category: "보험",
      question: "보험료가 월 소득의 몇 %인가요?",
      options: [
        { label: "보험 미가입", score: 0 },
        { label: "10% 이상 (과다)", score: 2 },
        { label: "5~10%", score: 6 },
        { label: "5% 이하 (적정)", score: 6 },
      ],
    },

    // ─── 투자 (3문제, 최대 20점) ───
    {
      id: "invest-experience",
      category: "투자",
      question: "투자 경험은?",
      options: [
        { label: "투자 경험 없음", score: 0 },
        { label: "예적금만 하고 있다", score: 3 },
        { label: "펀드/ETF 투자 중", score: 5 },
        { label: "주식 직접 투자 포함", score: 6 },
      ],
    },
    {
      id: "invest-pension",
      category: "투자",
      question: "연금저축 또는 IRP에 가입했나요?",
      options: [
        { label: "가입하지 않았다", score: 0 },
        { label: "가입했지만 소액만 납입", score: 4 },
        { label: "한도에 가깝게 납입 중", score: 7 },
      ],
    },
    {
      id: "invest-diversify",
      category: "투자",
      question: "투자 포트폴리오를 분산하고 있나요?",
      options: [
        { label: "투자를 안 한다 / 한 곳에 집중", score: 0 },
        { label: "2~3개 자산에 분산", score: 4 },
        { label: "자산군별(주식/채권/부동산 등) 분산", score: 7 },
      ],
    },

    // ─── 비상자금 (3문제, 최대 20점) ───
    {
      id: "emergency-months",
      category: "비상자금",
      question: "비상자금(갑자기 필요한 돈)을 몇 개월치 보유하고 있나요?",
      options: [
        { label: "비상자금 없음", score: 0 },
        { label: "1~2개월치", score: 3 },
        { label: "3~5개월치", score: 6 },
        { label: "6개월치 이상", score: 7 },
      ],
    },
    {
      id: "emergency-access",
      category: "비상자금",
      question: "비상자금에 즉시 접근할 수 있나요?",
      options: [
        { label: "비상자금 없음", score: 0 },
        { label: "며칠 소요 (정기예금 등)", score: 3 },
        { label: "즉시 출금 가능 (CMA, 보통예금)", score: 7 },
      ],
    },
    {
      id: "emergency-unexpected",
      category: "비상자금",
      question: "예상치 못한 지출(병원비, 차량 수리 등)에 대비되어 있나요?",
      options: [
        { label: "전혀 대비 안 됨", score: 0 },
        { label: "100만원 정도는 가능", score: 3 },
        { label: "300만원 이상 충분히 가능", score: 6 },
      ],
    },
  ],

  grades: [
    { min: 90, max: 100, grade: "A", label: "재무 우등생", color: "bg-green-500", description: "훌륭합니다. 현재 재무 관리를 잘 하고 계십니다." },
    { min: 70, max: 89, grade: "B", label: "양호", color: "bg-blue-500", description: "전반적으로 괜찮지만, 일부 영역에서 개선 여지가 있습니다." },
    { min: 50, max: 69, grade: "C", label: "보통", color: "bg-yellow-500", description: "개선이 필요한 영역이 있습니다. 약한 부분부터 보완하세요." },
    { min: 30, max: 49, grade: "D", label: "주의 필요", color: "bg-orange-500", description: "재무 상태에 주의가 필요합니다. 지금부터 하나씩 개선해 나가세요." },
    { min: 0, max: 29, grade: "F", label: "위험", color: "bg-red-500", description: "즉각적인 개선이 필요합니다. 가장 급한 영역부터 시작하세요." },
  ],

  getCategoryComment(category: string, percent: number): string {
    const comments: Record<string, Record<string, string>> = {
      "저축": {
        high: "저축 습관이 잘 잡혀있습니다.",
        mid: "저축 비율을 조금 더 높여보세요.",
        low: "자동이체부터 설정하면 저축 습관을 만들 수 있습니다.",
      },
      "부채 관리": {
        high: "부채 관리를 잘 하고 계십니다.",
        mid: "고금리 부채부터 우선 상환하세요.",
        low: "부채 상환 계획을 세우는 것이 급선무입니다.",
      },
      "보험": {
        high: "적절한 보험으로 리스크가 관리되고 있습니다.",
        mid: "실손보험 가입 여부를 확인해보세요.",
        low: "최소한의 보험(실손, 4대보험)부터 확인하세요.",
      },
      "투자": {
        high: "분산 투자로 자산을 잘 관리하고 있습니다.",
        mid: "연금저축/IRP 가입을 고려해보세요.",
        low: "예적금부터 시작해서 투자를 알아보세요.",
      },
      "비상자금": {
        high: "충분한 비상자금이 준비되어 있습니다.",
        mid: "비상자금을 3개월치 이상으로 늘려보세요.",
        low: "비상자금 마련이 가장 급합니다. 월급의 일부를 별도 통장에 넣으세요.",
      },
    };

    const level = percent >= 70 ? "high" : percent >= 40 ? "mid" : "low";
    return comments[category]?.[level] || "";
  },

  getSuggestions(categories: CategoryScore[]): string[] {
    const suggestions: string[] = [];
    const sorted = [...categories].sort((a, b) => a.percent - b.percent);

    // 가장 약한 2개 영역에 대한 구체적 제안
    for (const cat of sorted.slice(0, 2)) {
      if (cat.percent >= 70) continue;

      switch (cat.category) {
        case "저축":
          suggestions.push("급여일에 자동이체를 설정하고, 소득의 최소 10%를 저축 목표로 잡으세요.");
          suggestions.push("목적별 통장(생활비/저축/비상금)을 분리하면 저축률이 올라갑니다.");
          break;
        case "부채 관리":
          suggestions.push("고금리 대출부터 갈아타기(대환대출)를 검토해보세요.");
          suggestions.push("토스, 카카오뱅크 등에서 무료 신용점수를 매월 확인하세요.");
          break;
        case "보험":
          suggestions.push("실손보험 미가입이라면 가입을 적극 권합니다. 월 1~2만원으로 의료비 부담을 줄일 수 있습니다.");
          suggestions.push("보험료가 소득의 10%를 넘으면 불필요한 보험 정리를 고려하세요.");
          break;
        case "투자":
          suggestions.push("연금저축(연 600만원 한도)에 가입하면 세액공제로 최대 99만원을 돌려받습니다.");
          suggestions.push("투자가 처음이라면 적립식 ETF 투자부터 시작해보세요.");
          break;
        case "비상자금":
          suggestions.push("월 소득의 3~6개월치를 CMA나 보통예금에 비상자금으로 두세요.");
          suggestions.push("비상자금은 즉시 출금 가능한 계좌에 보관하는 것이 중요합니다.");
          break;
      }
    }

    return suggestions;
  },
};
