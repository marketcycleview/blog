import type { TimelineEvent } from "../types";

export type ResignationType = "voluntary" | "recommended" | "fired" | "contractEnd";
export type TenureRange = "under1" | "1to3" | "3to10" | "over10";

interface ResignationInput {
  type: ResignationType;
  tenure: TenureRange;
  hasNextJob: boolean;
  nextJobDate?: string; // 재취업 입사일
  hasInsurance: boolean; // 4대보험 가입 여부
}

function canGetUnemployment(type: ResignationType): boolean {
  return type !== "voluntary"; // 자발적 퇴사는 실업급여 불가 (간소화)
}

function getTenureYears(tenure: TenureRange): number {
  switch (tenure) {
    case "under1": return 0.5;
    case "1to3": return 2;
    case "3to10": return 5;
    case "over10": return 12;
  }
}

export function generateResignationTimeline(input: ResignationInput): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  const eligible = canGetUnemployment(input.type);
  const years = getTenureYears(input.tenure);

  // ─── 퇴사 전 ───
  events.push({
    id: "notice",
    dayOffset: -14,
    label: "D-14",
    title: "퇴사 의사 전달 (서면)",
    description: "근로기준법상 30일 전 통보가 원칙이나, 최소 2주 전에는 서면으로 전달하세요. 이메일이나 내용증명도 유효합니다.",
    category: "prepare",
    important: true,
  });

  events.push({
    id: "handover",
    dayOffset: -7,
    label: "D-7",
    title: "업무 인수인계 완료",
    description: "담당 업무 인수인계서를 작성하고, 중요 파일/문서/계정 정보를 정리하여 후임자에게 전달하세요.",
    category: "prepare",
  });

  events.push({
    id: "docs-check",
    dayOffset: -3,
    label: "D-3",
    title: "퇴사 서류 준비 확인",
    description: "경력증명서, 퇴직증명서, 원천징수영수증 발급을 미리 요청하세요. 퇴사 후 발급이 지연될 수 있습니다.",
    category: "prepare",
  });

  // ─── 퇴사일 ───
  events.push({
    id: "resign-day",
    dayOffset: 0,
    label: "D-day",
    title: "퇴사일",
    description: "퇴직금 정산일 확인, 미사용 연차수당 정산, 회사 물품(노트북, 사원증 등) 반납, 개인 물품 챙기기.",
    category: "action",
    important: true,
    amount: years >= 1 ? `퇴직금: 근속 ${years >= 1 ? Math.floor(years) + "년" : "1년 미만"} 기준 정산` : undefined,
  });

  // ─── 퇴사 직후 ───
  events.push({
    id: "health-check",
    dayOffset: 1,
    label: "D+1",
    title: "건강보험 자격 상실 확인",
    description: "직장 건강보험 자격이 상실됩니다. 건강보험공단(1577-1000)에서 자격 변동을 확인하세요.",
    category: "insurance",
  });

  if (input.hasNextJob) {
    events.push({
      id: "health-gap",
      dayOffset: 3,
      label: "D+3",
      title: "건강보험 공백 기간 처리",
      description: "재취업까지 공백이 있으면 '임의계속가입' 신청을 권장합니다. 직장 보험료 수준으로 유지 가능합니다(퇴직 후 36개월 이내).",
      category: "insurance",
    });
  } else {
    events.push({
      id: "health-convert",
      dayOffset: 7,
      label: "D+7",
      title: "건강보험 전환 신청",
      description: "임의계속가입(직장 보험료 유지, 36개월) 또는 지역가입자 전환 중 선택하세요. 임의계속이 보통 더 저렴합니다.",
      category: "insurance",
      important: true,
    });
  }

  events.push({
    id: "pension",
    dayOffset: 14,
    label: "D+14",
    title: "국민연금 처리",
    description: input.hasNextJob
      ? "재취업하면 새 직장에서 자동 가입됩니다. 공백 기간에는 납부예외 신청 가능합니다."
      : "납부예외 신청(소득 없는 기간) 또는 임의가입(계속 납부)을 선택하세요. 임의가입 시 연금 수령액이 늘어납니다.",
    category: "insurance",
  });

  // ─── 실업급여 (해당자만) ───
  if (eligible && input.hasInsurance) {
    events.push({
      id: "unemployment-apply",
      dayOffset: 14,
      label: "D+14",
      title: "실업급여 수급자격 신청",
      description: "고용24(work24.go.kr)에서 수급자격 신청 → 구직활동 교육 이수 → 1~4주 후 첫 지급. 이직확인서가 필요합니다(회사가 발급).",
      category: "finance",
      important: true,
      link: { label: "고용24 바로가기", href: "/ko/subsidy/2026-silup-geupyeo" },
    });

    events.push({
      id: "unemployment-training",
      dayOffset: 21,
      label: "D+21",
      title: "취업지원 프로그램 수강",
      description: "실업급여 수급을 위해 온라인 취업지원 프로그램을 이수해야 합니다. 고용센터에서 안내받을 수 있습니다.",
      category: "finance",
    });

    const unemploymentDays = years < 1 ? 120 : years < 3 ? 150 : years < 5 ? 180 : years < 10 ? 210 : 240;
    events.push({
      id: "unemployment-end",
      dayOffset: unemploymentDays,
      label: `D+${unemploymentDays}`,
      title: `실업급여 수급 종료 (${unemploymentDays}일)`,
      description: `근속 기간 기준 최대 ${unemploymentDays}일간 수급 가능합니다. 종료 전 재취업 지원 프로그램을 적극 활용하세요.`,
      category: "finance",
      amount: `최대 ${unemploymentDays}일간 수급`,
    });
  }

  // ─── 자발적 퇴사 추가 안내 ───
  if (!eligible) {
    events.push({
      id: "voluntary-notice",
      dayOffset: 7,
      label: "D+7",
      title: "자발적 퇴사 시 실업급여 확인",
      description: "자발적 퇴사도 정당한 사유(임금체불, 직장 내 괴롭힘, 통근 불가 등)가 있으면 실업급여 수급이 가능합니다. 고용센터에 상담하세요.",
      category: "info",
    });
  }

  // ─── 세금 관련 ───
  events.push({
    id: "tax-cert",
    dayOffset: 30,
    label: "D+30",
    title: "퇴직소득 원천징수영수증 수령",
    description: "회사에서 퇴직소득 원천징수영수증을 발급합니다. 연말정산 또는 종합소득세 신고 시 필요하니 보관하세요.",
    category: "finance",
  });

  if (!input.hasNextJob) {
    events.push({
      id: "tax-may",
      dayOffset: 150,
      label: "이듬해 5월",
      title: "종합소득세 신고 확인",
      description: "연중 퇴사 후 재취업하지 않았다면, 다음 해 5월에 종합소득세 신고를 통해 환급받을 수 있습니다.",
      category: "finance",
      important: true,
    });
  }

  // ─── 재취업 관련 ───
  if (input.hasNextJob) {
    events.push({
      id: "new-job",
      dayOffset: 0, // 실제로는 nextJobDate 기준이지만 간소화
      label: "입사일",
      title: "새 직장 입사 준비",
      description: "주민등록등본, 경력증명서, 건강검진 결과, 통장 사본 등을 미리 준비하세요.",
      category: "action",
    });
  } else {
    events.push({
      id: "job-search",
      dayOffset: 30,
      label: "D+30",
      title: "구직활동 본격 시작",
      description: "이력서/자기소개서 업데이트, 잡코리아·사람인·링크드인 프로필 갱신, 희망 기업 리스트 작성.",
      category: "action",
    });
  }

  // 정렬
  events.sort((a, b) => a.dayOffset - b.dayOffset);
  return events;
}
