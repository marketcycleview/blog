import type { DecisionTreeConfig, TreeResult, TreeRecommendation } from "../types";

// ─── 대출 상품 데이터베이스 ───
const LOAN_PRODUCTS: TreeRecommendation[] = [
  // 정부 정책대출
  {
    id: "didimdol",
    name: "디딤돌대출",
    provider: "주택도시기금",
    description: "무주택 서민을 위한 저금리 주택구입 대출. 부부합산 연소득 6천만원 이하.",
    rate: "연 2.15~3.0%",
    limit: "최대 2.5억원",
    period: "10~30년",
    features: ["초저금리", "정부 지원", "무주택자 전용"],
    fit: 0,
  },
  {
    id: "bogeumjari",
    name: "보금자리론",
    provider: "한국주택금융공사",
    description: "고정금리 장기 주택담보대출. 소득제한 없이 9억원 이하 주택 구입 시.",
    rate: "연 3.5~4.5% (고정)",
    limit: "최대 3.6억원",
    period: "10~40년",
    features: ["고정금리", "장기", "소득제한 없음"],
    fit: 0,
  },
  {
    id: "jeonse-btm",
    name: "버팀목 전세대출",
    provider: "주택도시기금",
    description: "무주택 서민 전세 자금 대출. 부부합산 연소득 5천만원 이하.",
    rate: "연 1.8~2.4%",
    limit: "수도권 1.2억, 지방 8천만원",
    period: "2년 (4회 연장 가능)",
    features: ["초저금리", "전세 전용", "연장 가능"],
    fit: 0,
  },
  {
    id: "jeonse-guarantee",
    name: "전세보증금반환보증 대출",
    provider: "HUG/SGI",
    description: "전세보증금 반환 보증을 담보로 한 전세 대출. 보증료 별도.",
    rate: "연 3.5~5.0%",
    limit: "전세금의 80%",
    period: "전세 계약기간",
    features: ["보증금 보호", "사기 예방"],
    fit: 0,
  },
  {
    id: "youth-jeonse",
    name: "청년전용 버팀목전세대출",
    provider: "주택도시기금",
    description: "만 19~34세 청년 전용 전세 대출. 연소득 5천만원 이하.",
    rate: "연 1.5~2.1%",
    limit: "수도권 1.2억, 지방 8천만원",
    period: "2년 (2회 연장)",
    features: ["청년 우대금리", "초저금리"],
    fit: 0,
  },
  // 신용대출
  {
    id: "bank-credit",
    name: "시중은행 신용대출",
    provider: "1금융권",
    description: "직장인 대상 신용 기반 대출. 금리는 신용등급에 따라 차등.",
    rate: "연 4.0~8.0%",
    limit: "연소득의 1~2배",
    period: "1~5년",
    features: ["빠른 심사", "담보 불필요", "직장인 우대"],
    fit: 0,
  },
  {
    id: "online-credit",
    name: "인터넷은행 신용대출",
    provider: "카카오뱅크/토스뱅크 등",
    description: "비대면 신청 가능한 신용대출. 중금리 대출 포함.",
    rate: "연 3.5~10.0%",
    limit: "최대 1억원",
    period: "1~5년",
    features: ["비대면", "빠른 실행", "중금리"],
    fit: 0,
  },
  // 담보대출
  {
    id: "mortgage",
    name: "주택담보대출 (시중은행)",
    provider: "1금융권",
    description: "소유 주택을 담보로 한 대출. 금리 및 한도는 LTV/DTI에 따라.",
    rate: "연 3.5~5.5%",
    limit: "LTV 최대 70%",
    period: "10~30년",
    features: ["저금리", "고한도", "주택 담보"],
    fit: 0,
  },
  // 사업자 대출
  {
    id: "small-biz",
    name: "소상공인 정책자금",
    provider: "소상공인시장진흥공단",
    description: "소상공인 대상 저금리 정책 대출. 직접대출과 대리대출 방식.",
    rate: "연 2.0~3.5%",
    limit: "최대 1억원",
    period: "5~7년",
    features: ["저금리", "정부 지원", "소상공인 전용"],
    fit: 0,
  },
  {
    id: "startup-loan",
    name: "청년창업지원 대출",
    provider: "중소벤처기업부",
    description: "만 39세 이하 예비/초기 창업자 대상. 최대 1억원 저금리.",
    rate: "연 2.0~3.0%",
    limit: "최대 1억원",
    period: "1년 거치 + 4년 상환",
    features: ["청년 전용", "창업 지원", "저금리"],
    fit: 0,
  },
  // 학자금
  {
    id: "student-loan",
    name: "한국장학재단 학자금대출",
    provider: "한국장학재단",
    description: "대학생 및 대학원생 대상 등록금/생활비 대출.",
    rate: "연 1.7~2.2%",
    limit: "등록금 전액 + 생활비",
    period: "졸업 후 상환",
    features: ["초저금리", "거치기간", "소득연계 상환"],
    fit: 0,
  },
  // 자동차
  {
    id: "auto-loan",
    name: "자동차 할부/리스",
    provider: "캐피탈/은행",
    description: "차량 구입 목적 할부금융 또는 리스.",
    rate: "연 4.0~8.0%",
    limit: "차량가의 70~100%",
    period: "2~5년",
    features: ["차량 담보", "할부/리스 선택"],
    fit: 0,
  },
];

function scoreLoan(
  loan: TreeRecommendation,
  answers: Record<string, string>
): number {
  let score = 0;
  const purpose = answers.purpose;
  const job = answers.job;
  const income = answers.income;
  const credit = answers.credit;
  const collateral = answers.collateral;
  const amount = answers.amount;

  // 목적 매칭
  if (purpose === "home" && ["didimdol", "bogeumjari", "mortgage"].includes(loan.id)) score += 30;
  if (purpose === "jeonse" && ["jeonse-btm", "jeonse-guarantee", "youth-jeonse"].includes(loan.id)) score += 30;
  if (purpose === "living" && ["bank-credit", "online-credit"].includes(loan.id)) score += 30;
  if (purpose === "business" && ["small-biz", "startup-loan"].includes(loan.id)) score += 30;
  if (purpose === "education" && loan.id === "student-loan") score += 40;
  if (purpose === "car" && loan.id === "auto-loan") score += 40;

  // 직업 매칭
  if (job === "employee" && ["bank-credit", "didimdol", "bogeumjari"].includes(loan.id)) score += 10;
  if (job === "selfemployed" && ["small-biz", "online-credit"].includes(loan.id)) score += 10;
  if (job === "freelancer" && ["online-credit"].includes(loan.id)) score += 10;
  if (job === "public" && ["bank-credit", "didimdol"].includes(loan.id)) score += 15; // 공무원 우대
  if (job === "student" && loan.id === "student-loan") score += 20;

  // 소득 매칭
  if (income === "under20m" && ["didimdol", "jeonse-btm", "youth-jeonse", "student-loan"].includes(loan.id)) score += 10;
  if (income === "20to40m" && ["didimdol", "jeonse-btm", "youth-jeonse"].includes(loan.id)) score += 10;
  if (income === "60to80m" && ["bogeumjari", "bank-credit", "mortgage"].includes(loan.id)) score += 10;
  if (income === "over80m" && ["bogeumjari", "mortgage", "bank-credit"].includes(loan.id)) score += 10;

  // 신용 매칭
  if (credit === "900plus" && ["bank-credit"].includes(loan.id)) score += 10;
  if (credit === "under600" && ["online-credit"].includes(loan.id)) score += 5;
  if (["900plus", "800to899"].includes(credit) && ["bank-credit", "mortgage"].includes(loan.id)) score += 5;

  // 담보 매칭
  if (collateral === "realestate" && ["mortgage"].includes(loan.id)) score += 15;
  if (collateral === "jeonse" && ["jeonse-btm", "jeonse-guarantee", "youth-jeonse"].includes(loan.id)) score += 15;
  if (collateral === "none" && ["bank-credit", "online-credit", "student-loan"].includes(loan.id)) score += 10;

  // 금액 매칭
  if (amount === "under10m" && ["bank-credit", "online-credit"].includes(loan.id)) score += 5;
  if (amount === "10to50m" && ["bank-credit", "online-credit", "jeonse-btm"].includes(loan.id)) score += 5;
  if (amount === "50to100m" && ["jeonse-btm", "mortgage", "bogeumjari"].includes(loan.id)) score += 5;
  if (amount === "100to300m" && ["didimdol", "bogeumjari", "mortgage"].includes(loan.id)) score += 5;
  if (amount === "over300m" && ["mortgage", "bogeumjari"].includes(loan.id)) score += 5;

  return score;
}

export const loanFinderConfig: DecisionTreeConfig = {
  id: "loan-finder",
  name: "나에게 맞는 대출 찾기",
  description: "7개 질문에 답하면 조건에 맞는 대출 상품을 추천합니다.",

  questions: [
    {
      id: "purpose",
      question: "대출 목적이 무엇인가요?",
      options: [
        { value: "home", label: "주택 구입" },
        { value: "jeonse", label: "전세 자금" },
        { value: "living", label: "생활 자금" },
        { value: "business", label: "사업 자금" },
        { value: "education", label: "학자금" },
        { value: "car", label: "자동차 구입" },
      ],
    },
    {
      id: "job",
      question: "현재 직업은?",
      options: [
        { value: "employee", label: "직장인" },
        { value: "selfemployed", label: "자영업자" },
        { value: "freelancer", label: "프리랜서" },
        { value: "public", label: "공무원" },
        { value: "student", label: "학생" },
        { value: "none", label: "무직/구직 중" },
      ],
    },
    {
      id: "income",
      question: "연소득은 대략 얼마인가요?",
      options: [
        { value: "under20m", label: "2천만원 미만" },
        { value: "20to40m", label: "2천~4천만원" },
        { value: "40to60m", label: "4천~6천만원" },
        { value: "60to80m", label: "6천~8천만원" },
        { value: "over80m", label: "8천만원 이상" },
      ],
    },
    {
      id: "credit",
      question: "신용점수가 어느 정도인가요?",
      description: "토스, 카카오뱅크 등에서 무료 조회 가능합니다.",
      options: [
        { value: "900plus", label: "900점 이상" },
        { value: "800to899", label: "800~899점" },
        { value: "700to799", label: "700~799점" },
        { value: "600to699", label: "600~699점" },
        { value: "under600", label: "600점 미만" },
        { value: "unknown", label: "잘 모르겠다" },
      ],
    },
    {
      id: "collateral",
      question: "담보로 제공할 수 있는 자산이 있나요?",
      options: [
        { value: "realestate", label: "부동산 (아파트/주택)" },
        { value: "jeonse", label: "전세보증금" },
        { value: "car", label: "자동차" },
        { value: "none", label: "담보 없음" },
      ],
    },
    {
      id: "amount",
      question: "필요한 대출 금액은?",
      options: [
        { value: "under10m", label: "1천만원 이하" },
        { value: "10to50m", label: "1천~5천만원" },
        { value: "50to100m", label: "5천만원~1억원" },
        { value: "100to300m", label: "1억~3억원" },
        { value: "over300m", label: "3억원 이상" },
      ],
    },
    {
      id: "period",
      question: "희망 상환 기간은?",
      options: [
        { value: "under1y", label: "1년 이내" },
        { value: "1to3y", label: "1~3년" },
        { value: "3to5y", label: "3~5년" },
        { value: "5to10y", label: "5~10년" },
        { value: "over10y", label: "10년 이상" },
      ],
    },
  ],

  getResult(answers: Record<string, string>): TreeResult {
    // 각 대출 상품에 점수 매기기
    const scored = LOAN_PRODUCTS.map((loan) => ({
      ...loan,
      fit: scoreLoan(loan, answers),
    }));

    // 점수 높은 순 정렬, 상위 5개
    scored.sort((a, b) => b.fit - a.fit);
    const top = scored.filter((l) => l.fit > 0).slice(0, 5);

    // 적합도를 1~5 스케일로 변환
    const maxFit = top[0]?.fit || 1;
    const recommendations: TreeRecommendation[] = top.map((l) => ({
      ...l,
      fit: Math.max(1, Math.round((l.fit / maxFit) * 5)),
    }));

    const purposeLabels: Record<string, string> = {
      home: "주택 구입",
      jeonse: "전세",
      living: "생활 자금",
      business: "사업",
      education: "학자금",
      car: "자동차",
    };

    return {
      title: `${purposeLabels[answers.purpose] || ""} 대출 추천 결과`,
      summary: `입력하신 조건에 맞는 대출 상품 ${recommendations.length}개를 추천합니다.`,
      recommendations,
      warning: "실제 금리와 한도는 개인 신용평가 결과에 따라 달라질 수 있습니다. 반드시 여러 금융기관에 비교 견적을 받아보세요.",
    };
  },
};
