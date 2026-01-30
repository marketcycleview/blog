import type { TimelineEvent } from "../types";

export type JobType = "employee" | "selfGeneral" | "selfSimple" | "freelancer" | "landlord" | "corporation";

interface TaxCalendarInput {
  jobType: JobType;
  hasVAT: boolean; // 부가세 과세 여부
  hasComprehensiveTax: boolean; // 종합소득세 신고 대상 여부
}

export function generateTaxCalendar(input: TaxCalendarInput, year: number): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  const { jobType, hasVAT, hasComprehensiveTax } = input;

  // 기준: 해당 연도 1월 1일 기준 dayOffset 계산
  function monthDay(month: number, day: number): number {
    const base = new Date(year, 0, 1);
    const target = new Date(year, month - 1, day);
    return Math.floor((target.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
  }

  // ─── 1월 ───
  if (jobType === "employee") {
    events.push({
      id: "yearend-prep",
      dayOffset: monthDay(1, 15),
      label: "1월 15일",
      title: "연말정산 간소화 서비스 오픈",
      description: "국세청 홈택스에서 간소화 서비스가 오픈됩니다. 공제 자료를 확인하고 누락된 항목이 없는지 체크하세요.",
      category: "action",
      important: true,
    });
  }

  if (hasVAT && (jobType === "selfGeneral" || jobType === "selfSimple" || jobType === "corporation")) {
    events.push({
      id: "vat-jan",
      dayOffset: monthDay(1, 25),
      label: "1월 25일",
      title: "부가가치세 확정신고 (2기)",
      description: "전년도 7~12월분 부가세 확정신고 및 납부 기한입니다.",
      category: "action",
      important: true,
    });
  }

  // ─── 2월 ───
  if (jobType === "employee") {
    events.push({
      id: "yearend-submit",
      dayOffset: monthDay(2, 28),
      label: "2월 28일",
      title: "연말정산 서류 제출 마감",
      description: "회사에 공제 증빙 서류를 제출하세요. 기한을 놓치면 5월 종합소득세 신고로 직접 해야 합니다.",
      category: "action",
      important: true,
    });
  }

  // ─── 3월 ───
  if (jobType === "corporation") {
    events.push({
      id: "corp-tax",
      dayOffset: monthDay(3, 31),
      label: "3월 31일",
      title: "법인세 신고·납부",
      description: "12월 결산법인의 법인세 신고 및 납부 기한입니다.",
      category: "action",
      important: true,
    });
  }

  if (jobType === "employee") {
    events.push({
      id: "yearend-refund",
      dayOffset: monthDay(3, 15),
      label: "3월 중",
      title: "연말정산 환급금 지급",
      description: "회사 급여일에 환급금(또는 추가납부액)이 반영됩니다.",
      category: "finance",
    });
  }

  // ─── 4월 ───
  if (hasVAT && (jobType === "selfGeneral" || jobType === "corporation")) {
    events.push({
      id: "vat-apr",
      dayOffset: monthDay(4, 25),
      label: "4월 25일",
      title: "부가가치세 예정신고 (1기)",
      description: "1~3월분 부가세 예정신고입니다. 간이과세자는 예정신고 의무 없음.",
      category: "action",
    });
  }

  // ─── 5월 ───
  if (hasComprehensiveTax || jobType === "freelancer" || jobType === "selfGeneral" || jobType === "selfSimple" || jobType === "landlord") {
    events.push({
      id: "income-tax",
      dayOffset: monthDay(5, 31),
      label: "5월 31일",
      title: "종합소득세 신고·납부",
      description: "전년도 종합소득에 대한 신고 및 납부 기한입니다. 사업소득, 프리랜서 소득, 임대소득 등이 대상입니다.",
      category: "action",
      important: true,
    });
  }

  if (jobType === "employee" && hasComprehensiveTax) {
    events.push({
      id: "extra-income-tax",
      dayOffset: monthDay(5, 31),
      label: "5월 31일",
      title: "추가 소득 종합소득세 신고",
      description: "근로소득 외 부업/투자 소득이 있으면 5월에 종합소득세 신고를 해야 합니다.",
      category: "action",
      important: true,
    });
  }

  // ─── 6월 ───
  events.push({
    id: "local-income-tax",
    dayOffset: monthDay(6, 1),
    label: "6월 1일",
    title: "지방소득세 납부 기한",
    description: "종합소득세와 별도로 지방소득세도 6월 1일까지 납부해야 합니다.",
    category: "action",
  });

  // ─── 7월 ───
  if (hasVAT && (jobType === "selfGeneral" || jobType === "selfSimple" || jobType === "corporation")) {
    events.push({
      id: "vat-jul",
      dayOffset: monthDay(7, 25),
      label: "7월 25일",
      title: "부가가치세 확정신고 (1기)",
      description: "1~6월분 부가세 확정신고 및 납부 기한입니다.",
      category: "action",
      important: true,
    });
  }

  events.push({
    id: "property-tax-jul",
    dayOffset: monthDay(7, 31),
    label: "7월 31일",
    title: "재산세 1차 납부",
    description: "주택분 재산세 1/2 납부 (7월). 나머지 1/2는 9월에 납부합니다. 건축물·선박 등은 7월 전액.",
    category: "finance",
  });

  // ─── 8월 ───
  events.push({
    id: "resident-tax",
    dayOffset: monthDay(8, 31),
    label: "8월 31일",
    title: "주민세(개인분) 납부",
    description: "지방자치단체에 납부하는 주민세입니다. 금액은 지역마다 다르며 보통 1만원 이하.",
    category: "finance",
  });

  // ─── 9월 ───
  events.push({
    id: "property-tax-sep",
    dayOffset: monthDay(9, 30),
    label: "9월 30일",
    title: "재산세 2차 납부",
    description: "주택분 재산세 나머지 1/2, 토지분 재산세를 납부합니다.",
    category: "finance",
  });

  // ─── 10월 ───
  if (hasVAT && (jobType === "selfGeneral" || jobType === "corporation")) {
    events.push({
      id: "vat-oct",
      dayOffset: monthDay(10, 25),
      label: "10월 25일",
      title: "부가가치세 예정신고 (2기)",
      description: "7~9월분 부가세 예정신고입니다.",
      category: "action",
    });
  }

  // ─── 12월 ───
  events.push({
    id: "comprehensive-property-tax",
    dayOffset: monthDay(12, 15),
    label: "12월 15일",
    title: "종합부동산세 납부",
    description: "공시가격 합산 일정 금액을 초과하는 부동산 소유자에게 부과됩니다. 해당자만.",
    category: "finance",
  });

  if (jobType === "employee") {
    events.push({
      id: "yearend-start",
      dayOffset: monthDay(12, 1),
      label: "12월",
      title: "연말정산 준비 시작",
      description: "올해 공제 가능 항목을 점검하세요. 연금저축/IRP 추가 납입, 기부금, 의료비 등을 정리할 마지막 기회입니다.",
      category: "prepare",
      important: true,
    });
  }

  // 정렬
  events.sort((a, b) => a.dayOffset - b.dayOffset);
  return events;
}
