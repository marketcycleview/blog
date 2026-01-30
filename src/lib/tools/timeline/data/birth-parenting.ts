import type { TimelineEvent } from "../types";

export type ChildOrder = "first" | "second" | "third";
export type IncomeLevel = "low" | "mid" | "high";

interface BirthParentingInput {
  childOrder: ChildOrder;
  dualIncome: boolean;
  incomeLevel: IncomeLevel;
}

export function generateBirthParentingTimeline(input: BirthParentingInput): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  const { childOrder, dualIncome, incomeLevel } = input;
  const isMultiChild = childOrder === "second" || childOrder === "third";

  // ─── 임신기 ───
  events.push({
    id: "pregnancy-voucher",
    dayOffset: -180,
    label: "임신 확인",
    title: "임신출산 진료비 바우처 신청",
    description: "국민행복카드로 임신·출산 진료비를 지원받습니다. 단태아 100만원, 다태아 140만원.",
    category: "finance",
    important: true,
    amount: "100만원 (다태아 140만원)",
  });

  events.push({
    id: "high-risk",
    dayOffset: -150,
    label: "임신 초중기",
    title: "고위험 임산부 의료비 지원 확인",
    description: "조기진통, 임신중독증 등 고위험 임산부는 입원치료비를 최대 300만원까지 지원받을 수 있습니다.",
    category: "info",
  });

  events.push({
    id: "maternity-leave-plan",
    dayOffset: -45,
    label: "출산 예정 45일 전",
    title: "출산휴가 계획 수립",
    description: "출산 전후 90일(다태아 120일) 출산휴가를 사용할 수 있습니다. 회사에 미리 알리고 업무 인수인계를 준비하세요.",
    category: "prepare",
  });

  // ─── 출산일 ───
  events.push({
    id: "birth-day",
    dayOffset: 0,
    label: "출산일",
    title: "출생신고 + 첫만남이용권 신청",
    description: "14일 이내에 출생신고를 하세요. 행복출산 원스톱 서비스로 첫만남이용권(200만원 바우처)을 함께 신청할 수 있습니다.",
    category: "action",
    important: true,
    amount: "첫만남이용권 200만원",
  });

  if (isMultiChild) {
    events.push({
      id: "multi-child-bonus",
      dayOffset: 0,
      label: "출산일",
      title: "다자녀 추가 혜택 신청",
      description: childOrder === "third"
        ? "셋째 이상: 첫만남이용권 300만원 + 다자녀 자동차 취득세 감면 등 추가 혜택이 있습니다."
        : "둘째: 첫만남이용권 200만원. 지자체별 추가 출산장려금을 확인하세요.",
      category: "finance",
      amount: childOrder === "third" ? "첫만남이용권 300만원" : "지자체 출산장려금 확인",
    });
  }

  // ─── 출산 직후 ───
  events.push({
    id: "maternity-pay",
    dayOffset: 14,
    label: "D+14",
    title: "출산휴가 급여 신청",
    description: "고용보험에서 출산휴가 급여를 지급합니다. 우선지원대상기업은 90일 전체, 대기업은 30일분을 고용보험에서 지원합니다.",
    category: "finance",
    important: true,
  });

  events.push({
    id: "child-allowance",
    dayOffset: 30,
    label: "D+30",
    title: "아동수당 신청",
    description: "만 8세 미만 아동에게 월 10만원을 지급합니다. 출생신고 시 함께 신청 가능합니다.",
    category: "finance",
    amount: "월 10만원 (만 8세까지)",
  });

  events.push({
    id: "parent-pay",
    dayOffset: 60,
    label: "D+60",
    title: "부모급여 신청",
    description: "만 0세(12개월 미만): 월 100만원, 만 1세(12~24개월): 월 50만원을 지급합니다. 어린이집 이용 시 보육료와 차액을 지급합니다.",
    category: "finance",
    important: true,
    amount: "월 100만원 (0세) / 월 50만원 (1세)",
  });

  // ─── 육아휴직 ───
  if (dualIncome) {
    events.push({
      id: "parental-leave-1",
      dayOffset: 90,
      label: "D+90",
      title: "육아휴직 급여 신청 (1번째 부모)",
      description: "만 8세 이하 자녀 대상, 최대 1년. 첫 3개월 통상임금 100%(상한 250만원), 이후 80%(상한 150만원). 맞벌이는 부부 순차 사용 시 혜택이 커집니다.",
      category: "finance",
      important: true,
    });

    events.push({
      id: "parental-leave-2",
      dayOffset: 365,
      label: "D+365",
      title: "육아휴직 급여 (2번째 부모 - 3+3 제도)",
      description: "부부가 순차적으로 육아휴직 사용 시 '3+3 부모육아휴직제'로 첫 3개월간 통상임금 100%(상한 300만원) 지급됩니다.",
      category: "finance",
      amount: "3+3 제도: 상한 300만원",
    });
  } else {
    events.push({
      id: "parental-leave",
      dayOffset: 90,
      label: "D+90",
      title: "육아휴직 급여 신청",
      description: "만 8세 이하 자녀 대상, 최대 1년. 첫 3개월 통상임금 100%(상한 250만원), 이후 80%(상한 150만원).",
      category: "finance",
      important: true,
    });
  }

  // ─── 1세 이후 ───
  events.push({
    id: "parent-pay-change",
    dayOffset: 365,
    label: "12개월",
    title: "부모급여 변경 (만 1세)",
    description: "만 1세부터 부모급여가 월 50만원으로 변경됩니다. 어린이집 이용 시 보육료 지원으로 전환됩니다.",
    category: "finance",
    amount: "월 50만원",
  });

  // ─── 2세 이후 ───
  events.push({
    id: "daycare",
    dayOffset: 730,
    label: "24개월",
    title: "어린이집 보육료 지원 시작",
    description: "만 0~5세 어린이집 보육료를 전액 지원합니다. 아이행복카드로 결제됩니다. 가정양육 시 양육수당 수령.",
    category: "finance",
    amount: "보육료 전액 지원",
  });

  // ─── 3세 이후 ───
  events.push({
    id: "care-service",
    dayOffset: 1095,
    label: "36개월",
    title: "아이돌봄서비스 신청",
    description: "만 12세 이하 아동 대상. 시간제(시간당 이용) 또는 영아종일제(24시간) 돌봄 서비스. 소득에 따라 정부 지원 비율 차등.",
    category: "action",
  });

  // ─── 유치원 ───
  events.push({
    id: "kindergarten",
    dayOffset: 1095,
    label: "만 3세",
    title: "유치원/유아학교 입학 준비",
    description: "유아학비를 지원받을 수 있습니다. 공립 유치원은 무상, 사립은 월 28만원 한도 지원.",
    category: "info",
  });

  // ─── 초등학교 입학 ───
  events.push({
    id: "school-entry",
    dayOffset: 2555,
    label: "만 7세 (초등입학)",
    title: "초등돌봄교실 신청 + 방과후학교",
    description: "초등학교 돌봄교실(무상)과 방과후학교를 활용하세요. 맞벌이 가정은 우선 배정됩니다.",
    category: "action",
  });

  events.push({
    id: "child-allowance-end",
    dayOffset: 2920,
    label: "만 8세",
    title: "아동수당 종료",
    description: "아동수당은 만 8세 생일이 속하는 달까지 지급됩니다.",
    category: "info",
    amount: "아동수당 종료",
  });

  // ─── 저소득 추가 혜택 ───
  if (incomeLevel === "low") {
    events.push({
      id: "low-income-infant",
      dayOffset: 30,
      label: "D+30",
      title: "기저귀·조제분유 지원",
      description: "기초생활수급자·차상위·한부모 가정은 기저귀 월 8만원, 조제분유 월 10만원을 지원받을 수 있습니다.",
      category: "finance",
      amount: "기저귀 월 8만원 + 조제분유 월 10만원",
    });

    events.push({
      id: "low-income-energy",
      dayOffset: 60,
      label: "D+60",
      title: "영유아 건강검진 (무료)",
      description: "국민건강보험에서 영유아 건강검진을 무료로 받을 수 있습니다. 발달 단계별 총 8회.",
      category: "info",
    });
  }

  // 정렬
  events.sort((a, b) => a.dayOffset - b.dayOffset);
  return events;
}
