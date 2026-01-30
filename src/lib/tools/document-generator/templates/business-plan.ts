import type { DocumentTemplate } from "../types";

function today(): string {
  const d = new Date();
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

const INDUSTRY_TIPS: Record<string, string> = {
  food: "음식점은 위생교육 이수와 영업신고가 필수입니다. 배달앱 입점도 초기 매출에 중요합니다.",
  cafe: "카페는 입지와 분위기가 핵심입니다. SNS 마케팅과 시그니처 메뉴 개발에 집중하세요.",
  online: "온라인 쇼핑몰은 통신판매업 신고가 필요합니다. 초기에는 스마트스토어 등 플랫폼 입점으로 시작하세요.",
  service: "서비스업은 인력 관리가 핵심입니다. 초기 고객 확보를 위한 홍보 전략을 수립하세요.",
  manufacturing: "제조업은 초기 설비 투자가 크므로 정부 정책자금과 R&D 지원사업을 활용하세요.",
  it: "IT/기술 창업은 MVP(최소 기능 제품)를 빠르게 출시하고 고객 피드백으로 개선하세요.",
  freelancer: "프리랜서는 포트폴리오와 네트워크가 핵심입니다. 초기에는 다양한 플랫폼에 등록하세요.",
};

export const businessPlanTemplate: DocumentTemplate = {
  id: "business-plan",
  name: "사업계획서 템플릿 생성기",
  description: "기본 정보를 입력하면 사업계획서 골격을 자동으로 생성합니다.",
  steps: [
    {
      id: "overview",
      title: "사업 개요",
      fields: [
        { id: "businessName", label: "사업체명 (상호)", type: "text", required: true, placeholder: "예) 맛있는 김밥" },
        { id: "industry", label: "업종", type: "select", required: true, options: [
          { value: "food", label: "음식점/외식업" },
          { value: "cafe", label: "카페/베이커리" },
          { value: "online", label: "온라인 쇼핑몰/이커머스" },
          { value: "service", label: "서비스업 (미용, 청소, 교육 등)" },
          { value: "manufacturing", label: "제조업" },
          { value: "it", label: "IT/기술" },
          { value: "freelancer", label: "프리랜서/1인 사업" },
        ]},
        { id: "itemSummary", label: "주요 제품/서비스", type: "textarea", required: true, placeholder: "예) 프리미엄 수제 김밥 전문점. 건강 재료 사용, 다이어트 메뉴 특화." },
        { id: "vision", label: "사업 비전 (한 줄)", type: "text", placeholder: "예) 건강한 한 끼를 합리적 가격으로 제공" },
      ],
    },
    {
      id: "market",
      title: "시장 분석",
      fields: [
        { id: "targetCustomer", label: "타겟 고객", type: "textarea", required: true, placeholder: "예) 20~40대 직장인, 건강/다이어트에 관심 있는 여성" },
        { id: "competitors", label: "주요 경쟁사/경쟁 요소", type: "textarea", placeholder: "예) 주변 김밥 프랜차이즈 3곳. 가격 경쟁력은 비슷하나 재료 품질에서 차별화." },
        { id: "marketSize", label: "시장 규모 / 트렌드", type: "textarea", placeholder: "예) 건강식 시장 연 15% 성장. 1인 가구 증가로 간편식 수요 확대." },
        { id: "differentiation", label: "차별화 포인트", type: "textarea", required: true, placeholder: "예) 유기농 재료, 저탄수화물 메뉴, 맞춤 영양 정보 제공" },
      ],
    },
    {
      id: "finance",
      title: "재무 계획",
      fields: [
        { id: "initialFund", label: "초기 투자금 (예상)", type: "text", placeholder: "예) 5,000만원 (보증금 2,000 + 인테리어 2,000 + 운영자금 1,000)" },
        { id: "fundSource", label: "자금 조달 방법", type: "textarea", placeholder: "예) 자기자본 3,000만원 + 소상공인 정책자금 2,000만원" },
        { id: "monthlyExpense", label: "월 고정 비용 (예상)", type: "text", placeholder: "예) 임대료 150만원, 인건비 200만원, 재료비 300만원, 기타 50만원" },
        { id: "monthlyRevenue", label: "월 목표 매출", type: "text", placeholder: "예) 1,500만원 (일 매출 50만원 × 30일)" },
        { id: "breakeven", label: "손익분기 예상", type: "text", placeholder: "예) 월 매출 700만원 이상 시 흑자" },
      ],
    },
    {
      id: "strategy",
      title: "마케팅/운영 전략",
      fields: [
        { id: "marketing", label: "마케팅 전략", type: "textarea", placeholder: "예) 오픈 이벤트(1+1), SNS 운영, 배달앱 입점, 주변 회사 전단지" },
        { id: "operations", label: "운영 계획", type: "textarea", placeholder: "예) 오전 10시~오후 9시 운영. 초기 1인 운영, 매출 안정 후 직원 채용." },
        { id: "riskPlan", label: "리스크 대응 계획", type: "textarea", placeholder: "예) 매출 부진 시 배달 비중 확대, 메뉴 축소로 원가 절감" },
      ],
    },
  ],
  generate(data) {
    const tip = INDUSTRY_TIPS[data.industry] || "";
    return {
      title: "사업계획서",
      date: today(),
      content: `사 업 계 획 서

━━━━━━━━━━━━━━━━━━━━━━━━

작성일: ${today()}
사업체명: ${data.businessName || "____"}

━━━━━━━━━━━━━━━━━━━━━━━━

1. 사업 개요
━━━━━━━━━━━━━━━━━━━━━━━━

■ 사업체명: ${data.businessName || "____"}
■ 업종: ${data.industry ? (data.industry === "food" ? "음식점/외식업" : data.industry === "cafe" ? "카페/베이커리" : data.industry === "online" ? "온라인 쇼핑몰" : data.industry === "service" ? "서비스업" : data.industry === "manufacturing" ? "제조업" : data.industry === "it" ? "IT/기술" : "프리랜서") : "____"}
■ 주요 제품/서비스:
${data.itemSummary || "(주요 제품/서비스를 기술하세요)"}

■ 사업 비전:
${data.vision || "(사업의 핵심 가치와 방향을 기술하세요)"}


2. 시장 분석
━━━━━━━━━━━━━━━━━━━━━━━━

■ 타겟 고객:
${data.targetCustomer || "(타겟 고객층을 구체적으로 기술하세요)"}

■ 경쟁 분석:
${data.competitors || "(주요 경쟁사와 경쟁 요소를 분석하세요)"}

■ 시장 규모 및 트렌드:
${data.marketSize || "(관련 시장의 규모와 성장 트렌드를 기술하세요)"}

■ 차별화 전략:
${data.differentiation || "(경쟁사 대비 차별화 포인트를 기술하세요)"}

■ SWOT 분석:
  [강점(S)] ____________________
  [약점(W)] ____________________
  [기회(O)] ____________________
  [위협(T)] ____________________


3. 재무 계획
━━━━━━━━━━━━━━━━━━━━━━━━

■ 초기 투자금:
${data.initialFund || "(초기 투자 금액과 항목별 내역)"}

■ 자금 조달:
${data.fundSource || "(자기자본, 대출, 투자 등 자금 조달 방법)"}

■ 월 고정 비용:
${data.monthlyExpense || "(임대료, 인건비, 재료비 등 월 고정 비용)"}

■ 월 목표 매출:
${data.monthlyRevenue || "(월 목표 매출과 산출 근거)"}

■ 손익분기점:
${data.breakeven || "(월 매출 기준 손익분기점)"}


4. 마케팅 및 운영 전략
━━━━━━━━━━━━━━━━━━━━━━━━

■ 마케팅 전략:
${data.marketing || "(오프라인/온라인 마케팅 방법을 기술하세요)"}

■ 운영 계획:
${data.operations || "(영업시간, 인력 계획, 운영 방식을 기술하세요)"}

■ 리스크 대응:
${data.riskPlan || "(예상 리스크와 대응 방안을 기술하세요)"}


5. 향후 계획
━━━━━━━━━━━━━━━━━━━━━━━━

  1단계 (1~3개월): 사업장 확보 및 오픈 준비
  2단계 (4~6개월): 고객 확보 및 매출 안정화
  3단계 (7~12개월): 수익 구조 최적화
  4단계 (2년차~): 사업 확장 검토


━━━━━━━━━━━━━━━━━━━━━━━━

${tip ? `💡 업종 팁: ${tip}\n` : ""}
※ 이 사업계획서는 기본 골격입니다.
   실제 투자 유치나 정부 지원사업 신청 시에는
   더 상세한 내용(재무제표, 시장조사 데이터 등)이 필요합니다.`,
    };
  },
};
