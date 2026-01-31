export type SearchMethod =
  | { type: "keyword"; query: string }
  | { type: "category"; code: string }
  | { type: "predefined" } // 사전 정의 데이터 사용
  | { type: "composite"; sources: string[] } // 복합 지표 (다른 카테고리 합산)
  | { type: "inverse"; query: string }; // 역수 (적을수록 높은 점수)

export interface LifestyleCategory {
  id: string;
  groupId: string;
  label: string;
  icon: string;
  search: SearchMethod;
}

export interface CategoryGroup {
  id: string;
  label: string;
  icon: string;
  categories: LifestyleCategory[];
}

/** 프리셋 정의 */
export interface Preset {
  id: string;
  label: string;
  icon: string;
  settings: Record<string, number>; // categoryId → weight (1~5)
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: "nature",
    label: "자연/환경",
    icon: "🌳",
    categories: [
      { id: "park", groupId: "nature", label: "공원/녹지", icon: "🌿", search: { type: "keyword", query: "공원" } },
      { id: "mountain", groupId: "nature", label: "산/등산로", icon: "⛰️", search: { type: "keyword", query: "등산로" } },
      { id: "river", groupId: "nature", label: "강/하천/호수", icon: "🏞️", search: { type: "predefined" } },
      { id: "trail", groupId: "nature", label: "산책/조깅 코스", icon: "🏃", search: { type: "keyword", query: "산책로 둘레길" } },
      { id: "bike_road", groupId: "nature", label: "자전거길", icon: "🚴", search: { type: "keyword", query: "자전거도로 자전거길" } },
      { id: "nature_ratio", groupId: "nature", label: "전체 녹지 비율", icon: "🍃", search: { type: "predefined" } },
    ],
  },
  {
    id: "sports",
    label: "운동/스포츠",
    icon: "💪",
    categories: [
      { id: "gym", groupId: "sports", label: "헬스장/피트니스", icon: "🏋️", search: { type: "keyword", query: "헬스장 피트니스" } },
      { id: "swimming", groupId: "sports", label: "수영장", icon: "🏊", search: { type: "keyword", query: "수영장" } },
      { id: "yoga", groupId: "sports", label: "요가/필라테스", icon: "🧘", search: { type: "keyword", query: "요가 필라테스" } },
      { id: "futsal", groupId: "sports", label: "축구장/풋살장", icon: "⚽", search: { type: "keyword", query: "풋살장 축구장" } },
      { id: "tennis", groupId: "sports", label: "테니스장", icon: "🎾", search: { type: "keyword", query: "테니스장" } },
      { id: "golf", groupId: "sports", label: "골프연습장", icon: "⛳", search: { type: "keyword", query: "골프연습장 스크린골프" } },
      { id: "climbing", groupId: "sports", label: "클라이밍", icon: "🧗", search: { type: "keyword", query: "클라이밍 볼더링" } },
      { id: "bowling", groupId: "sports", label: "볼링장", icon: "🎳", search: { type: "keyword", query: "볼링장" } },
    ],
  },
  {
    id: "food",
    label: "식음료",
    icon: "🍽️",
    categories: [
      { id: "cafe", groupId: "food", label: "카페", icon: "☕", search: { type: "category", code: "CE7" } },
      { id: "restaurant", groupId: "food", label: "맛집/식당", icon: "🍜", search: { type: "category", code: "FD6" } },
      { id: "bakery", groupId: "food", label: "베이커리/빵집", icon: "🥐", search: { type: "keyword", query: "베이커리 빵집" } },
      { id: "bar", groupId: "food", label: "바/와인바", icon: "🍷", search: { type: "keyword", query: "와인바 칵테일바" } },
    ],
  },
  {
    id: "living",
    label: "생활편의",
    icon: "🏪",
    categories: [
      { id: "convenience", groupId: "living", label: "편의점", icon: "🏪", search: { type: "category", code: "CS2" } },
      { id: "mart", groupId: "living", label: "대형마트", icon: "🛒", search: { type: "category", code: "MT1" } },
      { id: "market", groupId: "living", label: "전통시장", icon: "🧺", search: { type: "keyword", query: "전통시장 재래시장" } },
      { id: "laundry", groupId: "living", label: "세탁소/클리닝", icon: "👔", search: { type: "keyword", query: "세탁소" } },
      { id: "bank", groupId: "living", label: "은행", icon: "🏦", search: { type: "category", code: "BK9" } },
      { id: "parking", groupId: "living", label: "주차장", icon: "🅿️", search: { type: "category", code: "PK6" } },
    ],
  },
  {
    id: "medical",
    label: "의료/건강",
    icon: "🏥",
    categories: [
      { id: "hospital", groupId: "medical", label: "종합병원", icon: "🏥", search: { type: "keyword", query: "종합병원" } },
      { id: "clinic", groupId: "medical", label: "의원/클리닉", icon: "🩺", search: { type: "category", code: "HP8" } },
      { id: "pharmacy", groupId: "medical", label: "약국", icon: "💊", search: { type: "category", code: "PM9" } },
      { id: "dentist", groupId: "medical", label: "치과", icon: "🦷", search: { type: "keyword", query: "치과" } },
      { id: "oriental", groupId: "medical", label: "한의원", icon: "🌿", search: { type: "keyword", query: "한의원" } },
    ],
  },
  {
    id: "transport",
    label: "교통",
    icon: "🚇",
    categories: [
      { id: "subway", groupId: "transport", label: "지하철역", icon: "🚇", search: { type: "category", code: "SW8" } },
      { id: "bus", groupId: "transport", label: "버스정류장 밀도", icon: "🚌", search: { type: "predefined" } },
      { id: "ktx", groupId: "transport", label: "KTX/기차역", icon: "🚄", search: { type: "keyword", query: "KTX 기차역" } },
    ],
  },
  {
    id: "education",
    label: "교육/문화",
    icon: "📚",
    categories: [
      { id: "school", groupId: "education", label: "학교 (초/중/고)", icon: "🏫", search: { type: "category", code: "SC4" } },
      { id: "academy", groupId: "education", label: "학원", icon: "📖", search: { type: "category", code: "AC5" } },
      { id: "kindergarten", groupId: "education", label: "어린이집/유치원", icon: "👶", search: { type: "category", code: "PS3" } },
      { id: "university", groupId: "education", label: "대학교", icon: "🎓", search: { type: "keyword", query: "대학교" } },
      { id: "library", groupId: "education", label: "도서관", icon: "📚", search: { type: "keyword", query: "도서관" } },
      { id: "bookstore", groupId: "education", label: "서점", icon: "📕", search: { type: "keyword", query: "서점" } },
      { id: "cinema", groupId: "education", label: "영화관", icon: "🎬", search: { type: "keyword", query: "영화관 CGV 메가박스 롯데시네마" } },
      { id: "museum", groupId: "education", label: "미술관/박물관", icon: "🖼️", search: { type: "keyword", query: "미술관 박물관" } },
      { id: "performance", groupId: "education", label: "공연장", icon: "🎭", search: { type: "keyword", query: "공연장 극장" } },
    ],
  },
  {
    id: "housing",
    label: "주거환경/특수",
    icon: "🏠",
    categories: [
      { id: "quiet", groupId: "housing", label: "조용한 환경", icon: "🤫", search: { type: "inverse", query: "유흥주점 노래방" } },
      { id: "urban", groupId: "housing", label: "번화가/도시적", icon: "🌆", search: { type: "composite", sources: ["cafe", "restaurant", "convenience"] } },
      { id: "safe", groupId: "housing", label: "치안/안전", icon: "🛡️", search: { type: "keyword", query: "경찰서 파출소" } },
      { id: "vet", groupId: "housing", label: "동물병원", icon: "🐾", search: { type: "keyword", query: "동물병원" } },
      { id: "kids_cafe", groupId: "housing", label: "키즈카페", icon: "🧒", search: { type: "keyword", query: "키즈카페" } },
      { id: "pediatric", groupId: "housing", label: "소아과", icon: "👶", search: { type: "keyword", query: "소아과 소아청소년과" } },
    ],
  },
];

/** 모든 카테고리 flat 배열 */
export const ALL_CATEGORIES: LifestyleCategory[] = CATEGORY_GROUPS.flatMap(
  (g) => g.categories
);

/** 카테고리 ID로 빠르게 찾기 */
export const CATEGORY_MAP: Record<string, LifestyleCategory> = Object.fromEntries(
  ALL_CATEGORIES.map((c) => [c.id, c])
);

/** 프리셋 정의 */
export const PRESETS: Preset[] = [
  {
    id: "athlete",
    label: "운동러",
    icon: "🏃",
    settings: { gym: 5, swimming: 4, park: 4, trail: 4, bike_road: 3 },
  },
  {
    id: "parenting",
    label: "육아맘",
    icon: "👶",
    settings: { pediatric: 5, kindergarten: 5, kids_cafe: 4, park: 4, school: 3, quiet: 4 },
  },
  {
    id: "culture",
    label: "문화인",
    icon: "📚",
    settings: { bookstore: 5, library: 5, museum: 4, performance: 4, cinema: 3, cafe: 3 },
  },
  {
    id: "pet",
    label: "반려인",
    icon: "🐕",
    settings: { vet: 5, park: 5, trail: 4, quiet: 3 },
  },
  {
    id: "worker",
    label: "직장인",
    icon: "💼",
    settings: { subway: 5, cafe: 3, convenience: 4, gym: 3, restaurant: 3 },
  },
  {
    id: "student",
    label: "대학생",
    icon: "🎓",
    settings: { university: 5, cafe: 4, convenience: 4, subway: 4, academy: 3 },
  },
  {
    id: "senior",
    label: "어르신",
    icon: "🧓",
    settings: { hospital: 5, pharmacy: 4, park: 5, oriental: 3, market: 4, quiet: 4 },
  },
];
