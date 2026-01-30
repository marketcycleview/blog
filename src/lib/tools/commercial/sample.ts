import type { CommercialData, Store } from "./types";

const SAMPLE_STORES: Store[] = [
  { id: "S001", name: "강남역 맛집타운", category: "음식점", subCategory: "한식", address: "서울 강남구 강남대로 396", lat: 37.4979, lng: 127.0276, phone: "02-555-1234" },
  { id: "S002", name: "서초 카페골목", category: "음식점", subCategory: "카페", address: "서울 서초구 서초대로 398", lat: 37.4923, lng: 127.0292, phone: "02-588-5678" },
  { id: "S003", name: "역삼 편의점", category: "소매업", subCategory: "편의점", address: "서울 강남구 역삼동 835", lat: 37.5007, lng: 127.0365 },
  { id: "S004", name: "논현 미용실", category: "생활서비스", subCategory: "미용", address: "서울 강남구 논현동 210", lat: 37.5108, lng: 127.0303 },
  { id: "S005", name: "삼성 학원가", category: "교육", subCategory: "입시학원", address: "서울 강남구 삼성동 143", lat: 37.5096, lng: 127.0629 },
  { id: "S006", name: "선릉역 부동산", category: "부동산", subCategory: "중개업소", address: "서울 강남구 선릉로 627", lat: 37.5049, lng: 127.0490 },
  { id: "S007", name: "압구정 병원", category: "의료", subCategory: "내과", address: "서울 강남구 압구정로 120", lat: 37.5264, lng: 127.0287 },
  { id: "S008", name: "역삼 치킨집", category: "음식점", subCategory: "치킨", address: "서울 강남구 역삼동 740", lat: 37.4995, lng: 127.0374 },
  { id: "S009", name: "강남 피트니스", category: "스포츠·여가", subCategory: "헬스장", address: "서울 강남구 테헤란로 109", lat: 37.5009, lng: 127.0337 },
  { id: "S010", name: "논현 고깃집", category: "음식점", subCategory: "고기뷔페", address: "서울 강남구 논현동 55", lat: 37.5120, lng: 127.0260 },
  { id: "S011", name: "교대역 분식", category: "음식점", subCategory: "분식", address: "서울 서초구 서초동 1621", lat: 37.4935, lng: 127.0140 },
  { id: "S012", name: "방배 슈퍼마켓", category: "소매업", subCategory: "슈퍼마켓", address: "서울 서초구 방배동 880", lat: 37.4822, lng: 126.9981 },
  { id: "S013", name: "잠실 호텔", category: "숙박", subCategory: "호텔", address: "서울 송파구 올림픽로 300", lat: 37.5125, lng: 127.1025 },
  { id: "S014", name: "홍대 카페거리", category: "음식점", subCategory: "카페", address: "서울 마포구 와우산로 94", lat: 37.5563, lng: 126.9236 },
  { id: "S015", name: "여의도 식당", category: "음식점", subCategory: "일식", address: "서울 영등포구 여의도동 28", lat: 37.5217, lng: 126.9246 },
];

export function getSampleCommercialData(): CommercialData {
  return {
    stores: SAMPLE_STORES,
    totalCount: SAMPLE_STORES.length,
    updatedAt: new Date().toISOString(),
    isLive: false,
    regionName: "서울 강남구 (샘플)",
  };
}
