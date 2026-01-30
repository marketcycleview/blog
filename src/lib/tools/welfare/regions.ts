/** 시도 중심좌표 + 카카오맵 줌 레벨 */
export interface WelfareRegion {
  code: string;
  name: string;
  lat: number;
  lng: number;
  level: number; // kakao map zoom level
}

export const WELFARE_REGIONS: WelfareRegion[] = [
  { code: "all", name: "전국", lat: 36.5, lng: 127.0, level: 13 },
  { code: "11", name: "서울특별시", lat: 37.5665, lng: 126.978, level: 9 },
  { code: "26", name: "부산광역시", lat: 35.1796, lng: 129.0756, level: 9 },
  { code: "27", name: "대구광역시", lat: 35.8714, lng: 128.6014, level: 9 },
  { code: "28", name: "인천광역시", lat: 37.4563, lng: 126.7052, level: 9 },
  { code: "29", name: "광주광역시", lat: 35.1595, lng: 126.8526, level: 9 },
  { code: "30", name: "대전광역시", lat: 36.3504, lng: 127.3845, level: 9 },
  { code: "31", name: "울산광역시", lat: 35.5384, lng: 129.3114, level: 9 },
  { code: "36", name: "세종특별자치시", lat: 36.48, lng: 127.259, level: 9 },
  { code: "41", name: "경기도", lat: 37.4138, lng: 127.5183, level: 11 },
  { code: "42", name: "강원특별자치도", lat: 37.8228, lng: 128.1555, level: 11 },
  { code: "43", name: "충청북도", lat: 36.6357, lng: 127.4912, level: 11 },
  { code: "44", name: "충청남도", lat: 36.5184, lng: 126.8, level: 11 },
  { code: "45", name: "전북특별자치도", lat: 35.7175, lng: 127.153, level: 11 },
  { code: "46", name: "전라남도", lat: 34.8679, lng: 126.991, level: 11 },
  { code: "47", name: "경상북도", lat: 36.4919, lng: 128.8889, level: 11 },
  { code: "48", name: "경상남도", lat: 35.4606, lng: 128.2132, level: 11 },
  { code: "50", name: "제주특별자치도", lat: 33.4996, lng: 126.5312, level: 10 },
];

/** 시도 주민센터 / 복지관 대표 좌표 (마커 표시용) */
export const WELFARE_CENTERS: { region: string; name: string; lat: number; lng: number }[] = [
  { region: "11", name: "서울시청 복지정책과", lat: 37.5663, lng: 126.9779 },
  { region: "26", name: "부산시청 복지정책과", lat: 35.1798, lng: 129.0750 },
  { region: "27", name: "대구시청 복지정책과", lat: 35.8714, lng: 128.6018 },
  { region: "28", name: "인천시청 복지정책과", lat: 37.4563, lng: 126.7052 },
  { region: "29", name: "광주시청 복지정책과", lat: 35.1600, lng: 126.8515 },
  { region: "30", name: "대전시청 복지정책과", lat: 36.3504, lng: 127.3848 },
  { region: "31", name: "울산시청 복지정책과", lat: 35.5396, lng: 129.3115 },
  { region: "36", name: "세종시청 복지정책과", lat: 36.4800, lng: 127.2600 },
  { region: "41", name: "경기도청 복지정책과", lat: 37.2750, lng: 127.0095 },
  { region: "42", name: "강원도청 복지정책과", lat: 37.8853, lng: 127.7300 },
  { region: "43", name: "충북도청 복지정책과", lat: 36.6372, lng: 127.4914 },
  { region: "44", name: "충남도청 복지정책과", lat: 36.6588, lng: 126.6728 },
  { region: "45", name: "전북도청 복지정책과", lat: 35.8204, lng: 127.1088 },
  { region: "46", name: "전남도청 복지정책과", lat: 34.8161, lng: 126.4629 },
  { region: "47", name: "경북도청 복지정책과", lat: 36.5760, lng: 128.5056 },
  { region: "48", name: "경남도청 복지정책과", lat: 35.2376, lng: 128.6923 },
  { region: "50", name: "제주도청 복지정책과", lat: 33.4890, lng: 126.4983 },
];
