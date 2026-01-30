import type { QuizConfig, CategoryScore } from "../types";

export const taxQuizConfig: QuizConfig = {
  id: "tax-knowledge-quiz",
  name: "세금 상식 퀴즈",
  description: "20문제로 세금 상식을 테스트합니다.",
  questions: [
    // === 소득세 (4문제) ===
    { id: "t1", category: "소득세", question: "근로소득세는 매월 급여에서 원천징수한 후, 연말정산으로 정산한다.", options: [{ label: "O", score: 5 }, { label: "X", score: 0 }] },
    { id: "t2", category: "소득세", question: "종합소득세 신고 기간은?", options: [{ label: "매년 3월", score: 0 }, { label: "매년 5월", score: 5 }, { label: "매년 7월", score: 0 }, { label: "매년 1월", score: 0 }] },
    { id: "t3", category: "소득세", question: "프리랜서(3.3% 원천징수)도 종합소득세 신고를 해야 한다.", options: [{ label: "O", score: 5 }, { label: "X", score: 0 }] },
    { id: "t4", category: "소득세", question: "2026년 소득세 최고세율은?", options: [{ label: "35%", score: 0 }, { label: "38%", score: 0 }, { label: "42%", score: 5 }, { label: "45%", score: 0 }] },

    // === 연말정산 (4문제) ===
    { id: "t5", category: "연말정산", question: "신용카드 소득공제는 총급여의 25% 초과 사용분부터 적용된다.", options: [{ label: "O", score: 5 }, { label: "X", score: 0 }] },
    { id: "t6", category: "연말정산", question: "소득공제와 세액공제 중 세금을 직접 깎아주는 것은?", options: [{ label: "소득공제", score: 0 }, { label: "세액공제", score: 5 }] },
    { id: "t7", category: "연말정산", question: "연금저축 세액공제 한도는 연 최대 얼마인가?", options: [{ label: "400만원", score: 0 }, { label: "600만원", score: 5 }, { label: "700만원", score: 0 }, { label: "900만원", score: 0 }] },
    { id: "t8", category: "연말정산", question: "월세 세액공제는 무주택 세대주만 받을 수 있다.", options: [{ label: "O", score: 5 }, { label: "X", score: 0 }] },

    // === 부가가치세 (4문제) ===
    { id: "t9", category: "부가가치세", question: "부가가치세율은 몇 %인가?", options: [{ label: "5%", score: 0 }, { label: "10%", score: 5 }, { label: "15%", score: 0 }, { label: "20%", score: 0 }] },
    { id: "t10", category: "부가가치세", question: "간이과세자의 기준은 연 매출 얼마 미만인가?", options: [{ label: "4,800만원", score: 0 }, { label: "8,000만원", score: 0 }, { label: "1억400만원", score: 5 }, { label: "2억원", score: 0 }] },
    { id: "t11", category: "부가가치세", question: "세금계산서를 발급하지 않으면 가산세가 부과된다.", options: [{ label: "O", score: 5 }, { label: "X", score: 0 }] },
    { id: "t12", category: "부가가치세", question: "프리랜서(인적용역)는 부가세 면세 대상이다.", options: [{ label: "O", score: 5 }, { label: "X", score: 0 }] },

    // === 재산세/양도세 (4문제) ===
    { id: "t13", category: "재산세/양도세", question: "1세대 1주택 양도세 비과세 기준 보유기간은?", options: [{ label: "1년", score: 0 }, { label: "2년", score: 5 }, { label: "3년", score: 0 }, { label: "5년", score: 0 }] },
    { id: "t14", category: "재산세/양도세", question: "종합부동산세(종부세) 납부 시기는?", options: [{ label: "6월", score: 0 }, { label: "9월", score: 0 }, { label: "12월", score: 5 }, { label: "3월", score: 0 }] },
    { id: "t15", category: "재산세/양도세", question: "취득세는 부동산을 살 때 내는 세금이다.", options: [{ label: "O", score: 5 }, { label: "X", score: 0 }] },
    { id: "t16", category: "재산세/양도세", question: "상속세 기본공제 금액은?", options: [{ label: "1억원", score: 0 }, { label: "3억원", score: 0 }, { label: "5억원", score: 5 }, { label: "10억원", score: 0 }] },

    // === 절세/실전 (4문제) ===
    { id: "t17", category: "절세/실전", question: "사업용 신용카드를 홈택스에 등록하면 매입세액을 자동으로 공제받을 수 있다.", options: [{ label: "O", score: 5 }, { label: "X", score: 0 }] },
    { id: "t18", category: "절세/실전", question: "IRP(개인형 퇴직연금) 세액공제 한도는 연금저축 포함 최대 얼마?", options: [{ label: "700만원", score: 0 }, { label: "900만원", score: 5 }, { label: "1,200만원", score: 0 }, { label: "1,500만원", score: 0 }] },
    { id: "t19", category: "절세/실전", question: "기부금은 소득공제가 아니라 세액공제 항목이다.", options: [{ label: "O", score: 5 }, { label: "X", score: 0 }] },
    { id: "t20", category: "절세/실전", question: "홈택스에서 현금영수증을 발급받으면 소득공제를 받을 수 있다.", options: [{ label: "O", score: 5 }, { label: "X", score: 0 }] },
  ],
  grades: [
    { min: 90, max: 100, grade: "S", label: "세금 전문가", color: "bg-yellow-500", description: "세무사 수준의 세금 지식을 보유하고 있습니다." },
    { min: 70, max: 89, grade: "A", label: "세금 고수", color: "bg-blue-500", description: "세금에 대해 잘 알고 있습니다. 절세 전략도 활용 가능합니다." },
    { min: 50, max: 69, grade: "B", label: "보통", color: "bg-green-500", description: "기본적인 세금 상식이 있지만 놓치는 부분이 있습니다." },
    { min: 30, max: 49, grade: "C", label: "부족", color: "bg-orange-500", description: "세금에 대한 이해가 부족합니다. 연말정산이나 신고 시 주의가 필요합니다." },
    { min: 0, max: 29, grade: "D", label: "세금 초보", color: "bg-red-500", description: "세금 기본 상식을 학습할 필요가 있습니다." },
  ],
  getCategoryComment(category, percent) {
    if (percent >= 80) return "훌륭합니다!";
    if (percent >= 60) return "양호합니다.";
    if (percent >= 40) return "보완이 필요합니다.";
    return "학습이 필요합니다.";
  },
  getSuggestions(categories: CategoryScore[]) {
    const sorted = [...categories].sort((a, b) => a.percent - b.percent);
    const tips: Record<string, string> = {
      "소득세": "종합소득세 신고 방법과 세율 구간을 정리해보세요.",
      "연말정산": "연말정산 간소화 서비스를 활용해 놓치는 공제가 없는지 확인하세요.",
      "부가가치세": "사업자라면 부가세 신고 일정과 세금계산서 관리를 체계화하세요.",
      "재산세/양도세": "부동산 관련 세금(취득세, 양도세, 종부세)의 기본 개념을 정리해보세요.",
      "절세/실전": "IRP·연금저축·기부금 등 활용 가능한 절세 수단을 확인하세요.",
    };
    return sorted.slice(0, 2).map((c) => tips[c.category] || `${c.category} 영역을 보강하세요.`);
  },
};
