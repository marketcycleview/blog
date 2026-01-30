import type { QuizConfig, CategoryScore } from "../types";

export const realestateQuizConfig: QuizConfig = {
  id: "realestate-terms-quiz",
  name: "부동산 용어 퀴즈",
  description: "20문제로 부동산 상식을 테스트합니다.",
  questions: [
    // === 기본 용어 (5문제) ===
    { id: "r1", category: "기본 용어", question: "전세권 설정과 확정일자의 차이는?", options: [
      { label: "같은 것이다", score: 0 },
      { label: "전세권은 등기, 확정일자는 주민센터", score: 5 },
      { label: "확정일자가 더 비싸다", score: 0 },
    ]},
    { id: "r2", category: "기본 용어", question: "'근저당'이란?", options: [
      { label: "은행이 부동산을 담보로 잡는 것", score: 5 },
      { label: "부동산을 두 사람이 공동 소유하는 것", score: 0 },
      { label: "부동산 세금의 한 종류", score: 0 },
    ]},
    { id: "r3", category: "기본 용어", question: "'등기부등본'에서 가장 먼저 확인해야 할 것은?", options: [
      { label: "집 크기 (전용면적)", score: 0 },
      { label: "소유자와 근저당 설정 여부", score: 5 },
      { label: "건축 연도", score: 0 },
    ]},
    { id: "r4", category: "기본 용어", question: "'대항력'이란?", options: [
      { label: "임차인이 제3자에게도 권리를 주장할 수 있는 것", score: 5 },
      { label: "집주인이 세입자를 내보낼 수 있는 권리", score: 0 },
      { label: "은행이 담보를 처분할 수 있는 권리", score: 0 },
    ]},
    { id: "r5", category: "기본 용어", question: "'전입신고'를 해야 대항력이 생긴다.", options: [{ label: "O", score: 5 }, { label: "X", score: 0 }] },

    // === 계약/거래 (5문제) ===
    { id: "r6", category: "계약/거래", question: "부동산 중개수수료는 매수자만 내는 것인가?", options: [{ label: "O (매수자만)", score: 0 }, { label: "X (매수·매도 양쪽)", score: 5 }] },
    { id: "r7", category: "계약/거래", question: "계약금은 보통 매매가의 몇 %인가?", options: [
      { label: "5%", score: 0 }, { label: "10%", score: 5 }, { label: "20%", score: 0 }, { label: "30%", score: 0 },
    ]},
    { id: "r8", category: "계약/거래", question: "임대차 계약 시 '특약사항'에 수리비 부담을 명시하는 것이 좋다.", options: [{ label: "O", score: 5 }, { label: "X", score: 0 }] },
    { id: "r9", category: "계약/거래", question: "전세보증보험에 가입하면 집주인이 보증금을 못 돌려줘도 보장받을 수 있다.", options: [{ label: "O", score: 5 }, { label: "X", score: 0 }] },
    { id: "r10", category: "계약/거래", question: "'임대차 3법'에 포함되지 않는 것은?", options: [
      { label: "전월세 상한제", score: 0 },
      { label: "계약 갱신 청구권", score: 0 },
      { label: "전월세 신고제", score: 0 },
      { label: "보증금 반환 보증 의무화", score: 5 },
    ]},

    // === 청약/분양 (5문제) ===
    { id: "r11", category: "청약/분양", question: "청약 가점제에서 가장 배점이 높은 항목은?", options: [
      { label: "무주택기간 (32점)", score: 0 },
      { label: "부양가족수 (35점)", score: 5 },
      { label: "청약통장 가입기간 (17점)", score: 0 },
    ]},
    { id: "r12", category: "청약/분양", question: "생애최초 특별공급은 과거에 주택을 소유한 적이 없어야 한다.", options: [{ label: "O", score: 5 }, { label: "X", score: 0 }] },
    { id: "r13", category: "청약/분양", question: "분양가상한제가 적용되는 지역에서는 시세보다 저렴하게 분양받을 수 있다.", options: [{ label: "O", score: 5 }, { label: "X", score: 0 }] },
    { id: "r14", category: "청약/분양", question: "'전매 제한'이란?", options: [
      { label: "분양권을 일정 기간 팔 수 없는 것", score: 5 },
      { label: "아파트를 5년간 임대해야 하는 것", score: 0 },
      { label: "청약 통장을 해지할 수 없는 것", score: 0 },
    ]},
    { id: "r15", category: "청약/분양", question: "청약통장 월 납입 인정 최대 금액은?", options: [
      { label: "10만원", score: 0 }, { label: "25만원", score: 5 }, { label: "50만원", score: 0 }, { label: "100만원", score: 0 },
    ]},

    // === 세금/비용 (5문제) ===
    { id: "r16", category: "세금/비용", question: "6억원 이하 주택의 취득세율은?", options: [
      { label: "0.5%", score: 0 }, { label: "1%", score: 5 }, { label: "2%", score: 0 }, { label: "3%", score: 0 },
    ]},
    { id: "r17", category: "세금/비용", question: "1세대 1주택 양도세 비과세를 받으려면 최소 몇 년 보유해야 하나?", options: [
      { label: "1년", score: 0 }, { label: "2년", score: 5 }, { label: "3년", score: 0 }, { label: "5년", score: 0 },
    ]},
    { id: "r18", category: "세금/비용", question: "재산세는 매년 7월과 9월에 나뉘어 부과된다.", options: [{ label: "O", score: 5 }, { label: "X", score: 0 }] },
    { id: "r19", category: "세금/비용", question: "전세를 살 때 내는 세금은 없다.", options: [{ label: "O", score: 5 }, { label: "X", score: 0 }] },
    { id: "r20", category: "세금/비용", question: "종합부동산세는 공시가격 합산 얼마 이상부터 과세되나? (1세대 1주택 기준)", options: [
      { label: "6억원", score: 0 }, { label: "9억원", score: 0 }, { label: "12억원", score: 5 }, { label: "15억원", score: 0 },
    ]},
  ],
  grades: [
    { min: 90, max: 100, grade: "S", label: "부동산 전문가", color: "bg-yellow-500", description: "공인중개사 수준의 부동산 지식을 보유하고 있습니다." },
    { min: 70, max: 89, grade: "A", label: "부동산 고수", color: "bg-blue-500", description: "부동산 거래에 자신감을 가져도 좋습니다." },
    { min: 50, max: 69, grade: "B", label: "보통", color: "bg-green-500", description: "기본 상식은 있지만 놓치는 부분이 있습니다." },
    { min: 30, max: 49, grade: "C", label: "부족", color: "bg-orange-500", description: "부동산 거래 전 꼼꼼한 학습이 필요합니다." },
    { min: 0, max: 29, grade: "D", label: "부동산 초보", color: "bg-red-500", description: "부동산 기본 용어부터 학습하세요." },
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
      "기본 용어": "등기부등본 읽는 법, 대항력, 전세권 등 기본 개념을 정리하세요.",
      "계약/거래": "임대차 계약 시 체크리스트와 특약사항 작성법을 익혀두세요.",
      "청약/분양": "청약 가점 계산법과 특별공급 자격을 확인해보세요.",
      "세금/비용": "취득세, 양도세, 종부세 등 부동산 세금 기본을 학습하세요.",
    };
    return sorted.slice(0, 2).map((c) => tips[c.category] || `${c.category} 영역을 보강하세요.`);
  },
};
