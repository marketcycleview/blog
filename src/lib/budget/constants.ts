import type {
  CategoryInfo,
  ExpenseCategory,
  ExpenseGroup,
  ExpenseGroupInfo,
  ExpenseItemInfo,
} from "./types";

// 카테고리 정보
export const EXPENSE_CATEGORIES: Record<ExpenseCategory, CategoryInfo> = {
  essential: {
    id: "essential",
    label: "기초생활비",
    color: "#3B82F6", // blue-500
    bgColor: "#EFF6FF", // blue-50
    borderColor: "#BFDBFE", // blue-200
    recommendedMin: 50,
    recommendedMax: 60,
  },
  flexible: {
    id: "flexible",
    label: "여유비",
    color: "#22C55E", // green-500
    bgColor: "#F0FDF4", // green-50
    borderColor: "#BBF7D0", // green-200
    recommendedMin: 20,
    recommendedMax: 30,
  },
  luxury: {
    id: "luxury",
    label: "사치비",
    color: "#F97316", // orange-500
    bgColor: "#FFF7ED", // orange-50
    borderColor: "#FED7AA", // orange-200
    recommendedMin: 0,
    recommendedMax: 10,
  },
};

// 카테고리 순서
export const CATEGORY_ORDER: ExpenseCategory[] = [
  "essential",
  "flexible",
  "luxury",
];

// 지출 그룹 정보
export const EXPENSE_GROUPS: Record<ExpenseGroup, ExpenseGroupInfo> = {
  housing: { id: "housing", label: "주거", icon: "🏠" },
  food: { id: "food", label: "식비", icon: "🍽️" },
  transport: { id: "transport", label: "교통", icon: "🚗" },
  telecom: { id: "telecom", label: "통신/구독", icon: "📱" },
  health: { id: "health", label: "건강/의료", icon: "💊" },
  finance: { id: "finance", label: "금융/보험", icon: "🏦" },
  education: { id: "education", label: "교육/자기계발", icon: "📚" },
  culture: { id: "culture", label: "문화/여가", icon: "🎬" },
  shopping: { id: "shopping", label: "쇼핑", icon: "🛍️" },
  beauty: { id: "beauty", label: "미용", icon: "💄" },
  social: { id: "social", label: "경조사/관계", icon: "🎁" },
  pet: { id: "pet", label: "반려동물", icon: "🐕" },
  childcare: { id: "childcare", label: "육아/교육", icon: "👶" },
};

// 지출 항목 목록 (50개+)
export const EXPENSE_ITEMS: ExpenseItemInfo[] = [
  // 주거
  { id: "rent", label: "월세", group: "housing", defaultCategory: "essential" },
  {
    id: "management-fee",
    label: "관리비",
    group: "housing",
    defaultCategory: "essential",
  },
  {
    id: "utilities",
    label: "공과금 (전기/가스/수도)",
    group: "housing",
    defaultCategory: "essential",
  },
  {
    id: "interior",
    label: "인테리어/가구",
    group: "housing",
    defaultCategory: "luxury",
  },
  {
    id: "moving",
    label: "이사비용",
    group: "housing",
    defaultCategory: "flexible",
  },

  // 식비
  {
    id: "groceries",
    label: "장보기/집밥",
    group: "food",
    defaultCategory: "essential",
  },
  {
    id: "eating-out",
    label: "외식",
    group: "food",
    defaultCategory: "flexible",
  },
  {
    id: "delivery",
    label: "배달음식",
    group: "food",
    defaultCategory: "flexible",
  },
  { id: "cafe", label: "카페/음료", group: "food", defaultCategory: "flexible" },
  { id: "alcohol", label: "술/회식", group: "food", defaultCategory: "luxury" },

  // 교통
  {
    id: "public-transport",
    label: "대중교통",
    group: "transport",
    defaultCategory: "essential",
  },
  {
    id: "taxi",
    label: "택시",
    group: "transport",
    defaultCategory: "flexible",
  },
  {
    id: "car-maintenance",
    label: "자차 유지비 (유류/정비)",
    group: "transport",
    defaultCategory: "essential",
  },
  {
    id: "car-insurance",
    label: "자동차 보험",
    group: "transport",
    defaultCategory: "essential",
  },
  {
    id: "parking",
    label: "주차비",
    group: "transport",
    defaultCategory: "flexible",
  },
  {
    id: "car-purchase",
    label: "차량 구매/할부",
    group: "transport",
    defaultCategory: "luxury",
  },

  // 통신/구독
  {
    id: "mobile",
    label: "휴대폰 요금",
    group: "telecom",
    defaultCategory: "essential",
  },
  {
    id: "internet",
    label: "인터넷/TV",
    group: "telecom",
    defaultCategory: "essential",
  },
  {
    id: "streaming",
    label: "스트리밍 구독 (넷플릭스 등)",
    group: "telecom",
    defaultCategory: "flexible",
  },
  {
    id: "app-subscription",
    label: "앱/서비스 구독",
    group: "telecom",
    defaultCategory: "flexible",
  },

  // 건강/의료
  {
    id: "hospital",
    label: "병원비",
    group: "health",
    defaultCategory: "essential",
  },
  {
    id: "medicine",
    label: "약값",
    group: "health",
    defaultCategory: "essential",
  },
  {
    id: "checkup",
    label: "건강검진",
    group: "health",
    defaultCategory: "flexible",
  },
  { id: "gym", label: "헬스/운동", group: "health", defaultCategory: "flexible" },
  {
    id: "supplements",
    label: "영양제/건강식품",
    group: "health",
    defaultCategory: "flexible",
  },

  // 금융/보험
  {
    id: "life-insurance",
    label: "생명/건강 보험",
    group: "finance",
    defaultCategory: "essential",
  },
  {
    id: "loan-interest",
    label: "대출 이자",
    group: "finance",
    defaultCategory: "essential",
  },
  {
    id: "savings",
    label: "저축/적금",
    group: "finance",
    defaultCategory: "essential",
  },
  {
    id: "investment",
    label: "투자 (주식/펀드)",
    group: "finance",
    defaultCategory: "flexible",
  },
  {
    id: "national-pension",
    label: "국민연금 (추가납입)",
    group: "finance",
    defaultCategory: "flexible",
  },

  // 교육/자기계발
  { id: "books", label: "독서/책", group: "education", defaultCategory: "flexible" },
  {
    id: "online-course",
    label: "온라인 강의",
    group: "education",
    defaultCategory: "flexible",
  },
  {
    id: "certificate",
    label: "자격증/시험",
    group: "education",
    defaultCategory: "flexible",
  },
  {
    id: "academy",
    label: "학원/과외",
    group: "education",
    defaultCategory: "flexible",
  },
  {
    id: "tuition",
    label: "등록금/학비",
    group: "education",
    defaultCategory: "essential",
  },

  // 문화/여가
  { id: "movie", label: "영화/공연", group: "culture", defaultCategory: "flexible" },
  { id: "game", label: "게임", group: "culture", defaultCategory: "flexible" },
  { id: "hobby", label: "취미활동", group: "culture", defaultCategory: "flexible" },
  {
    id: "domestic-travel",
    label: "국내여행",
    group: "culture",
    defaultCategory: "flexible",
  },
  {
    id: "overseas-travel",
    label: "해외여행",
    group: "culture",
    defaultCategory: "luxury",
  },
  {
    id: "music-instrument",
    label: "악기/음악",
    group: "culture",
    defaultCategory: "flexible",
  },

  // 쇼핑
  {
    id: "clothes",
    label: "의류/패션",
    group: "shopping",
    defaultCategory: "flexible",
  },
  {
    id: "shoes",
    label: "신발",
    group: "shopping",
    defaultCategory: "flexible",
  },
  {
    id: "luxury-goods",
    label: "명품",
    group: "shopping",
    defaultCategory: "luxury",
  },
  {
    id: "electronics",
    label: "전자기기",
    group: "shopping",
    defaultCategory: "flexible",
  },
  {
    id: "daily-necessities",
    label: "생필품",
    group: "shopping",
    defaultCategory: "essential",
  },

  // 미용
  { id: "haircut", label: "헤어/미용실", group: "beauty", defaultCategory: "flexible" },
  { id: "skincare", label: "피부관리", group: "beauty", defaultCategory: "flexible" },
  { id: "nail", label: "네일아트", group: "beauty", defaultCategory: "luxury" },
  {
    id: "cosmetics",
    label: "화장품",
    group: "beauty",
    defaultCategory: "flexible",
  },

  // 경조사/관계
  {
    id: "parents-allowance",
    label: "부모님 용돈",
    group: "social",
    defaultCategory: "essential",
  },
  {
    id: "wedding-funeral",
    label: "경조사비",
    group: "social",
    defaultCategory: "flexible",
  },
  { id: "gifts", label: "선물", group: "social", defaultCategory: "flexible" },
  {
    id: "gathering",
    label: "모임/회비",
    group: "social",
    defaultCategory: "flexible",
  },
  {
    id: "dating",
    label: "데이트",
    group: "social",
    defaultCategory: "flexible",
  },

  // 반려동물
  { id: "pet-food", label: "사료/간식", group: "pet", defaultCategory: "essential" },
  { id: "pet-hospital", label: "동물병원", group: "pet", defaultCategory: "essential" },
  { id: "pet-supplies", label: "펫용품", group: "pet", defaultCategory: "flexible" },
  { id: "pet-grooming", label: "미용/목욕", group: "pet", defaultCategory: "flexible" },

  // 육아/교육
  {
    id: "daycare",
    label: "어린이집/유치원",
    group: "childcare",
    defaultCategory: "essential",
  },
  {
    id: "baby-supplies",
    label: "유아용품",
    group: "childcare",
    defaultCategory: "essential",
  },
  {
    id: "kids-academy",
    label: "아이 학원비",
    group: "childcare",
    defaultCategory: "essential",
  },
  {
    id: "toys",
    label: "장난감",
    group: "childcare",
    defaultCategory: "flexible",
  },
];

// 그룹별로 항목 묶기
export function getItemsByGroup(): Map<ExpenseGroup, ExpenseItemInfo[]> {
  const grouped = new Map<ExpenseGroup, ExpenseItemInfo[]>();

  for (const item of EXPENSE_ITEMS) {
    const existing = grouped.get(item.group) || [];
    existing.push(item);
    grouped.set(item.group, existing);
  }

  return grouped;
}

// 항목 ID로 항목 정보 가져오기
export function getItemById(itemId: string): ExpenseItemInfo | undefined {
  return EXPENSE_ITEMS.find((item) => item.id === itemId);
}

// 금액 포맷팅
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ko-KR").format(amount);
}

// 만원 단위 포맷팅
export function formatCurrencyShort(amount: number): string {
  if (amount >= 10000) {
    const man = Math.floor(amount / 10000);
    const remainder = amount % 10000;
    if (remainder === 0) {
      return `${man}만`;
    }
    return `${man}만 ${formatCurrency(remainder)}`;
  }
  return formatCurrency(amount);
}
