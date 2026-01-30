import type { TimelineEvent } from "../types";

export type BusinessType = "restaurant" | "cafe" | "online" | "freelancer" | "manufacturing" | "service";
export type EntityType = "individual" | "corporation";

interface StartupRoadmapInput {
  businessType: BusinessType;
  entityType: EntityType;
  hasEmployees: boolean;
}

const BUSINESS_LABELS: Record<BusinessType, string> = {
  restaurant: "음식점",
  cafe: "카페",
  online: "온라인 쇼핑몰",
  freelancer: "프리랜서",
  manufacturing: "제조업",
  service: "서비스업",
};

export function generateStartupRoadmap(input: StartupRoadmapInput): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  const { businessType, entityType, hasEmployees } = input;
  const needsPermit = ["restaurant", "cafe", "manufacturing"].includes(businessType);
  const needsLocation = businessType !== "freelancer" && businessType !== "online";
  const bizLabel = BUSINESS_LABELS[businessType];

  // ─── D-90: 사업 계획 ───
  events.push({
    id: "business-plan",
    dayOffset: -90,
    label: "D-90",
    title: "사업계획 수립 및 시장조사",
    description: `${bizLabel} 사업계획을 수립합니다. 타겟 고객, 경쟁사 분석, 예상 매출, 초기 자금 계획을 정리하세요.`,
    category: "prepare",
    important: true,
  });

  events.push({
    id: "funding-check",
    dayOffset: -85,
    label: "D-85",
    title: "자금 조달 계획 확인",
    description: "자기자본, 대출, 정부지원금(소상공인 정책자금, 청년창업지원금 등)을 확인하고 신청 일정을 파악하세요.",
    category: "finance",
    link: { label: "대출 찾기 도구", href: "/ko/tools/loan-finder" },
  });

  // ─── D-75: 사업장 확보 ───
  if (needsLocation) {
    events.push({
      id: "location-search",
      dayOffset: -75,
      label: "D-75",
      title: "사업장 입지 선정 및 계약",
      description: "상권 분석 후 임대 계약을 진행합니다. 권리금, 보증금, 월세를 확인하고 계약서 특약 조건을 꼼꼼히 체크하세요.",
      category: "action",
      important: true,
    });
  }

  // ─── D-60: 사업자등록 ───
  events.push({
    id: "biz-registration",
    dayOffset: -60,
    label: "D-60",
    title: entityType === "corporation" ? "법인 설립 + 사업자등록" : "사업자등록 신청",
    description: entityType === "corporation"
      ? "법무사를 통해 법인 설립 등기를 진행하고, 이후 세무서에서 사업자등록을 합니다. 정관, 주주명부, 등기서류가 필요합니다."
      : "관할 세무서 방문 또는 홈택스에서 사업자등록을 신청합니다. 임대차계약서, 신분증이 필요합니다.",
    category: "action",
    important: true,
  });

  // ─── D-50: 인허가 ───
  if (needsPermit) {
    const permitDesc: Record<string, string> = {
      restaurant: "영업신고(일반음식점/휴게음식점), 위생교육(6시간)을 이수해야 합니다. 관할 구청 위생과에 신고하세요.",
      cafe: "휴게음식점 영업신고 + 위생교육이 필요합니다. 제과·제빵 판매 시 추가 허가가 필요할 수 있습니다.",
      manufacturing: "업종에 따라 공장등록, 제조업 허가, 환경 인허가 등이 필요합니다. 관할 구청에 확인하세요.",
    };
    events.push({
      id: "permits",
      dayOffset: -50,
      label: "D-50",
      title: "인허가 및 영업신고",
      description: permitDesc[businessType] || "업종에 따라 필요한 인허가를 신청합니다.",
      category: "action",
      important: true,
    });
  }

  // ─── D-45: 통장/카드 ───
  events.push({
    id: "bank-account",
    dayOffset: -45,
    label: "D-45",
    title: "사업용 통장 개설 + 사업용 카드 등록",
    description: "사업자등록증으로 사업용 계좌를 개설하고, 사업용 신용카드를 국세청 홈택스에 등록하세요. 경비 처리에 필수입니다.",
    category: "action",
  });

  // ─── D-35: 인테리어/준비 ───
  if (needsLocation) {
    events.push({
      id: "interior",
      dayOffset: -35,
      label: "D-35",
      title: "인테리어 및 설비 공사",
      description: `${bizLabel} 인테리어 공사를 시작합니다. 공사 기간은 보통 2~4주 소요됩니다. 인테리어 비용은 세금계산서를 받아두세요.`,
      category: "action",
    });
  }

  if (businessType === "online") {
    events.push({
      id: "online-setup",
      dayOffset: -35,
      label: "D-35",
      title: "온라인 쇼핑몰 개설",
      description: "스마트스토어/쿠팡/자사몰 등 판매 채널을 개설합니다. 통신판매업 신고(구청)가 필요합니다.",
      category: "action",
      important: true,
    });
  }

  // ─── D-14: 4대보험 ───
  if (hasEmployees) {
    events.push({
      id: "insurance-registration",
      dayOffset: -14,
      label: "D-14",
      title: "4대보험 사업장 가입 신고",
      description: "직원을 채용하면 국민연금, 건강보험, 고용보험, 산재보험에 사업장 가입 신고를 해야 합니다. 근로계약서를 작성하세요.",
      category: "insurance",
      important: true,
    });
  }

  // ─── D-7: 최종 준비 ───
  if (needsLocation) {
    events.push({
      id: "pos-setup",
      dayOffset: -7,
      label: "D-7",
      title: "카드단말기/POS 설치 + 최종 점검",
      description: "카드결제 단말기를 설치하고, 매장 최종 점검을 합니다. 간판, 메뉴판, 집기 등을 확인하세요.",
      category: "prepare",
    });
  }

  // ─── D-day: 영업 개시 ───
  events.push({
    id: "opening",
    dayOffset: 0,
    label: "D-day",
    title: "영업 개시",
    description: `${bizLabel} 영업을 시작합니다. 개업 초기에는 마케팅(SNS, 배달앱 등록, 오픈 이벤트)에 집중하세요.`,
    category: "action",
    important: true,
  });

  // ─── D+25: 부가세 ───
  events.push({
    id: "first-vat",
    dayOffset: 25,
    label: "D+25",
    title: "부가가치세 신고 준비",
    description: "매출·매입 세금계산서를 정리합니다. 일반과세자는 분기별, 간이과세자는 연 1회 신고합니다. 홈택스에서 전자세금계산서를 발급하세요.",
    category: "finance",
  });

  // ─── D+30: 세무 ───
  events.push({
    id: "tax-setup",
    dayOffset: 30,
    label: "D+30",
    title: "세무사 선임 검토 + 장부 기장 시작",
    description: "월 매출이 일정 규모 이상이면 세무사 기장 대리를 맡기는 것이 유리합니다. 기장료는 월 10~20만원 수준.",
    category: "finance",
  });

  // ─── D+90: 정부 지원 ───
  events.push({
    id: "gov-support",
    dayOffset: 90,
    label: "D+90",
    title: "소상공인 지원사업 확인 및 신청",
    description: "소상공인시장진흥공단의 정책자금, 컨설팅, 바우처 사업 등을 확인하세요. 창업 1년 이내가 유리한 지원이 많습니다.",
    category: "finance",
    link: { label: "복지 정책 찾기", href: "/ko/tools/welfare-finder" },
  });

  // ─── D+180: 반기 점검 ───
  events.push({
    id: "half-year-review",
    dayOffset: 180,
    label: "D+180",
    title: "반기 실적 점검 + 세금 캘린더 확인",
    description: "6개월 매출·비용을 정리하고 손익을 점검합니다. 부가세 신고, 종합소득세 준비를 시작하세요.",
    category: "finance",
    link: { label: "세금 캘린더", href: "/ko/tools/my-tax-calendar" },
  });

  // ─── D+365: 1주년 ───
  events.push({
    id: "first-year",
    dayOffset: 365,
    label: "1년",
    title: "1주년 점검 + 종합소득세 신고 준비",
    description: entityType === "corporation"
      ? "법인세 신고(3월)를 준비합니다. 1년간의 재무제표를 세무사와 함께 정리하세요."
      : "5월 종합소득세 신고를 준비합니다. 1년 매출·경비를 정리하고 절세 항목을 확인하세요.",
    category: "finance",
    important: true,
  });

  events.sort((a, b) => a.dayOffset - b.dayOffset);
  return events;
}
