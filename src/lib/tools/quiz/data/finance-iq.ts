import type { QuizConfig, CategoryScore } from "../types";

export const financeIQQuiz: QuizConfig = {
  id: "finance-iq",
  name: "금융 IQ 테스트",
  description: "20문제로 금융 지식을 테스트합니다.",

  questions: [
    // ─── 저축/예금 (4문제) ───
    { id: "fiq-1", category: "저축/예금", question: "적금 이자에도 세금이 붙는다?", options: [{ label: "O (맞다)", score: 5 }, { label: "X (아니다)", score: 0 }] },
    { id: "fiq-2", category: "저축/예금", question: "복리와 단리 중 같은 금리라면 어떤 것이 유리할까?", options: [{ label: "복리", score: 5 }, { label: "단리", score: 0 }, { label: "차이 없다", score: 0 }] },
    { id: "fiq-3", category: "저축/예금", question: "예금자보호법으로 보호되는 금액은?", options: [{ label: "3천만원", score: 0 }, { label: "5천만원", score: 5 }, { label: "1억원", score: 0 }, { label: "무제한", score: 0 }] },
    { id: "fiq-4", category: "저축/예금", question: "72법칙이란 무엇인가?", options: [{ label: "72를 금리로 나누면 원금 2배 기간", score: 5 }, { label: "72개월 저축 규칙", score: 0 }, { label: "72% 저축률 목표", score: 0 }] },

    // ─── 투자 (4문제) ───
    { id: "fiq-5", category: "투자", question: "ETF란 무엇인가?", options: [{ label: "상장지수펀드 (거래소에서 매매 가능한 펀드)", score: 5 }, { label: "전자자금이체", score: 0 }, { label: "외환거래기금", score: 0 }] },
    { id: "fiq-6", category: "투자", question: "주식 투자에서 PER이 낮으면 일반적으로?", options: [{ label: "저평가 (싼 주식)", score: 5 }, { label: "고평가 (비싼 주식)", score: 0 }, { label: "배당이 높은 주식", score: 0 }] },
    { id: "fiq-7", category: "투자", question: "분산투자의 가장 큰 장점은?", options: [{ label: "수익률 극대화", score: 0 }, { label: "리스크(위험) 감소", score: 5 }, { label: "세금 절약", score: 0 }] },
    { id: "fiq-8", category: "투자", question: "채권 가격과 금리의 관계는?", options: [{ label: "금리 오르면 채권 가격도 오른다", score: 0 }, { label: "금리 오르면 채권 가격은 내린다", score: 5 }, { label: "관계 없다", score: 0 }] },

    // ─── 보험 (4문제) ───
    { id: "fiq-9", category: "보험", question: "실손보험은 어떤 보험인가?", options: [{ label: "실제 치료비를 보상하는 보험", score: 5 }, { label: "사망 시 보험금 지급", score: 0 }, { label: "자동차 사고 전용 보험", score: 0 }] },
    { id: "fiq-10", category: "보험", question: "보험에서 '보장성 보험'과 '저축성 보험'의 차이는?", options: [{ label: "보장성: 위험 대비 / 저축성: 만기 환급금", score: 5 }, { label: "보장성이 더 비싸다", score: 0 }, { label: "차이 없다", score: 0 }] },
    { id: "fiq-11", category: "보험", question: "보험료가 소득의 몇 %가 적정한가?", options: [{ label: "5~10%", score: 5 }, { label: "15~20%", score: 0 }, { label: "많을수록 좋다", score: 0 }] },
    { id: "fiq-12", category: "보험", question: "국민건강보험의 본인부담 비율은 일반적으로?", options: [{ label: "약 30%", score: 5 }, { label: "약 50%", score: 0 }, { label: "0% (전액 지원)", score: 0 }] },

    // ─── 세금 (4문제) ───
    { id: "fiq-13", category: "세금", question: "연말정산에서 '소득공제'와 '세액공제'의 차이는?", options: [{ label: "소득공제: 과세표준 줄임 / 세액공제: 세금에서 직접 차감", score: 5 }, { label: "같은 의미다", score: 0 }, { label: "소득공제가 항상 유리하다", score: 0 }] },
    { id: "fiq-14", category: "세금", question: "프리랜서의 종합소득세 신고 기간은?", options: [{ label: "매년 5월", score: 5 }, { label: "매년 3월", score: 0 }, { label: "매년 1월", score: 0 }] },
    { id: "fiq-15", category: "세금", question: "양도소득세는 언제 내는 세금인가?", options: [{ label: "부동산/주식 등을 팔아 이익이 생겼을 때", score: 5 }, { label: "물건을 살 때", score: 0 }, { label: "상속받을 때", score: 0 }] },
    { id: "fiq-16", category: "세금", question: "신용카드보다 체크카드가 연말정산에 유리한 이유는?", options: [{ label: "체크카드 공제율(30%)이 신용카드(15%)의 2배", score: 5 }, { label: "체크카드는 세금이 면제", score: 0 }, { label: "차이 없다", score: 0 }] },

    // ─── 부채/신용 (4문제) ───
    { id: "fiq-17", category: "부채/신용", question: "DSR(총부채원리금상환비율)이란?", options: [{ label: "연소득 대비 모든 대출의 연간 원리금 비율", score: 5 }, { label: "대출 금리", score: 0 }, { label: "신용점수", score: 0 }] },
    { id: "fiq-18", category: "부채/신용", question: "신용점수를 올리는 가장 좋은 방법은?", options: [{ label: "카드/대출을 연체 없이 성실히 사용", score: 5 }, { label: "카드를 아예 쓰지 않기", score: 0 }, { label: "대출을 많이 받기", score: 0 }] },
    { id: "fiq-19", category: "부채/신용", question: "대환대출이란?", options: [{ label: "기존 고금리 대출을 저금리로 갈아타기", score: 5 }, { label: "추가로 대출 받기", score: 0 }, { label: "대출 상환 유예", score: 0 }] },
    { id: "fiq-20", category: "부채/신용", question: "원리금균등상환과 원금균등상환 중 총 이자가 적은 것은?", options: [{ label: "원금균등상환", score: 5 }, { label: "원리금균등상환", score: 0 }, { label: "같다", score: 0 }] },
  ],

  grades: [
    { min: 90, max: 100, grade: "S", label: "금융 전문가", color: "bg-yellow-500", description: "금융 지식이 최상위 수준입니다. 전문가 수준의 지식을 보유하고 있습니다." },
    { min: 70, max: 89, grade: "A", label: "금융 고수", color: "bg-green-500", description: "평균 이상의 금융 지식을 갖고 있습니다. 대부분의 금융 의사결정을 잘 내릴 수 있습니다." },
    { min: 50, max: 69, grade: "B", label: "금융 중수", color: "bg-blue-500", description: "기본적인 금융 지식이 있지만, 일부 영역에서 학습이 필요합니다." },
    { min: 30, max: 49, grade: "C", label: "금융 초보", color: "bg-orange-500", description: "금융 기초부터 다시 공부해보세요. 잘못된 금융 판단을 할 수 있습니다." },
    { min: 0, max: 29, grade: "D", label: "금융 문맹", color: "bg-red-500", description: "금융 지식이 많이 부족합니다. 돈 관련 결정 전에 꼭 공부하세요." },
  ],

  getCategoryComment(category: string, percent: number): string {
    const level = percent >= 70 ? "high" : percent >= 40 ? "mid" : "low";
    const comments: Record<string, Record<string, string>> = {
      "저축/예금": { high: "저축과 예금에 대해 잘 알고 계십니다.", mid: "기본은 알지만 복리·세금 등 심화 학습이 필요합니다.", low: "저축의 기초부터 공부해보세요." },
      "투자": { high: "투자 지식이 탄탄합니다.", mid: "투자 기초는 있지만 ETF·채권 등 다양한 자산을 공부해보세요.", low: "투자를 시작하기 전에 기본 개념부터 익히세요." },
      "보험": { high: "보험에 대해 잘 이해하고 있습니다.", mid: "보장성 보험의 기본 개념을 좀 더 익혀보세요.", low: "실손보험 등 필수 보험의 개념부터 공부하세요." },
      "세금": { high: "세금 지식이 훌륭합니다.", mid: "연말정산과 세금 신고의 기본을 더 공부하면 절세할 수 있습니다.", low: "세금 기초를 공부하면 연간 수십만원을 절약할 수 있습니다." },
      "부채/신용": { high: "대출과 신용 관리를 잘 이해하고 있습니다.", mid: "신용점수 관리와 대출 상환 방식을 더 알아보세요.", low: "부채 관리의 기초를 알면 금리를 낮출 수 있습니다." },
    };
    return comments[category]?.[level] || "";
  },

  getSuggestions(categories: CategoryScore[]): string[] {
    const suggestions: string[] = [];
    const sorted = [...categories].sort((a, b) => a.percent - b.percent);
    for (const cat of sorted.slice(0, 2)) {
      if (cat.percent >= 70) continue;
      switch (cat.category) {
        case "저축/예금": suggestions.push("복리·72법칙·예금자보호법 등 저축 기초 개념을 익혀보세요."); break;
        case "투자": suggestions.push("ETF, PER, 분산투자 등 투자 기본 용어부터 공부하면 도움이 됩니다."); break;
        case "보험": suggestions.push("실손보험과 보장성 보험의 차이를 이해하면 불필요한 보험료를 줄일 수 있습니다."); break;
        case "세금": suggestions.push("연말정산 소득공제/세액공제 차이를 알면 매년 수십만원을 돌려받을 수 있습니다."); break;
        case "부채/신용": suggestions.push("DSR, 대환대출, 신용점수 관리법을 알면 대출 금리를 낮출 수 있습니다."); break;
      }
    }
    return suggestions;
  },
};
