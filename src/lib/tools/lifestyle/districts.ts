/** 서울시 25개 구 중심좌표 */
export interface SeoulDistrict {
  code: string;
  name: string;
  lat: number;
  lng: number;
}

export const SEOUL_DISTRICTS: SeoulDistrict[] = [
  { code: "gangnam", name: "강남구", lat: 37.4979, lng: 127.0276 },
  { code: "gangdong", name: "강동구", lat: 37.5301, lng: 127.1238 },
  { code: "gangbuk", name: "강북구", lat: 37.6397, lng: 127.0115 },
  { code: "gangseo", name: "강서구", lat: 37.5510, lng: 126.8495 },
  { code: "gwanak", name: "관악구", lat: 37.4784, lng: 126.9516 },
  { code: "gwangjin", name: "광진구", lat: 37.5385, lng: 127.0824 },
  { code: "guro", name: "구로구", lat: 37.4954, lng: 126.8874 },
  { code: "geumcheon", name: "금천구", lat: 37.4519, lng: 126.8959 },
  { code: "nowon", name: "노원구", lat: 37.6542, lng: 127.0568 },
  { code: "dobong", name: "도봉구", lat: 37.6688, lng: 127.0471 },
  { code: "dongdaemun", name: "동대문구", lat: 37.5744, lng: 127.0396 },
  { code: "dongjak", name: "동작구", lat: 37.5124, lng: 126.9393 },
  { code: "mapo", name: "마포구", lat: 37.5663, lng: 126.9014 },
  { code: "seodaemun", name: "서대문구", lat: 37.5791, lng: 126.9368 },
  { code: "seocho", name: "서초구", lat: 37.4837, lng: 127.0324 },
  { code: "seongdong", name: "성동구", lat: 37.5633, lng: 127.0371 },
  { code: "seongbuk", name: "성북구", lat: 37.5894, lng: 127.0167 },
  { code: "songpa", name: "송파구", lat: 37.5145, lng: 127.1060 },
  { code: "yangcheon", name: "양천구", lat: 37.5170, lng: 126.8664 },
  { code: "yeongdeungpo", name: "영등포구", lat: 37.5264, lng: 126.8963 },
  { code: "yongsan", name: "용산구", lat: 37.5326, lng: 126.9909 },
  { code: "eunpyeong", name: "은평구", lat: 37.6027, lng: 126.9291 },
  { code: "jongno", name: "종로구", lat: 37.5735, lng: 126.9790 },
  { code: "junggu", name: "중구", lat: 37.5641, lng: 126.9979 },
  { code: "jungnang", name: "중랑구", lat: 37.6066, lng: 127.0927 },
];

/** 사전 정의 데이터: 강/하천 인접 점수 (0~100) */
export const RIVER_SCORES: Record<string, number> = {
  gangnam: 60,    // 양재천, 탄천
  gangdong: 70,   // 한강, 고덕천
  gangbuk: 30,    // 우이천
  gangseo: 80,    // 한강, 궁산
  gwanak: 25,     // 도림천
  gwangjin: 85,   // 한강, 중랑천, 뚝섬
  guro: 40,       // 안양천, 도림천
  geumcheon: 30,  // 안양천
  nowon: 45,      // 중랑천, 당현천
  dobong: 40,     // 도봉천, 우이천
  dongdaemun: 35, // 중랑천, 청계천
  dongjak: 75,    // 한강
  mapo: 90,       // 한강, 월드컵공원
  seodaemun: 30,  // 홍제천
  seocho: 55,     // 양재천, 반포한강공원
  seongdong: 90,  // 한강, 중랑천, 서울숲
  seongbuk: 25,   // 성북천
  songpa: 80,     // 한강, 성내천, 석촌호수
  yangcheon: 60,  // 한강, 안양천
  yeongdeungpo: 85, // 한강, 여의도, 안양천
  yongsan: 95,    // 한강, 이촌한강공원
  eunpyeong: 35,  // 불광천
  jongno: 50,     // 청계천, 경복궁
  junggu: 55,     // 청계천, 남산
  jungnang: 60,   // 중랑천, 용마폭포
};

/** 사전 정의 데이터: 녹지 비율 점수 (0~100) */
export const NATURE_RATIO_SCORES: Record<string, number> = {
  gangnam: 45,
  gangdong: 55,
  gangbuk: 80,    // 북한산
  gangseo: 50,
  gwanak: 85,     // 관악산
  gwangjin: 50,
  guro: 40,
  geumcheon: 35,
  nowon: 75,      // 수락산, 불암산
  dobong: 85,     // 도봉산
  dongdaemun: 30,
  dongjak: 55,    // 보라매공원
  mapo: 55,       // 월드컵공원, 하늘공원
  seodaemun: 65,  // 안산
  seocho: 70,     // 우면산, 양재시민의숲
  seongdong: 55,  // 서울숲
  seongbuk: 70,   // 북악산, 개운산
  songpa: 50,     // 올림픽공원
  yangcheon: 35,
  yeongdeungpo: 40, // 여의도공원
  yongsan: 55,    // 남산, 용산공원
  eunpyeong: 70,  // 북한산
  jongno: 75,     // 북악산, 경복궁, 인왕산
  junggu: 50,     // 남산
  jungnang: 55,   // 용마산
};

/** 사전 정의 데이터: 버스정류장 밀도 점수 (0~100) */
export const BUS_DENSITY_SCORES: Record<string, number> = {
  gangnam: 90,
  gangdong: 65,
  gangbuk: 55,
  gangseo: 70,
  gwanak: 65,
  gwangjin: 70,
  guro: 65,
  geumcheon: 55,
  nowon: 65,
  dobong: 55,
  dongdaemun: 75,
  dongjak: 70,
  mapo: 85,
  seodaemun: 70,
  seocho: 80,
  seongdong: 75,
  seongbuk: 65,
  songpa: 80,
  yangcheon: 65,
  yeongdeungpo: 80,
  yongsan: 80,
  eunpyeong: 60,
  jongno: 90,
  junggu: 95,
  jungnang: 55,
};

/** 구별 한줄 설명 (상세 분석 패널에 표시) */
export const DISTRICT_DESCRIPTIONS: Record<string, string> = {
  gangnam: "강남구는 테헤란로 중심의 비즈니스 밀집 지역으로, 교통과 생활 인프라가 잘 갖춰져 있습니다.",
  gangdong: "강동구는 한강과 가까운 주거 중심 지역으로, 올림픽공원과 고덕천 등 녹지가 풍부합니다.",
  gangbuk: "강북구는 북한산과 가까워 자연환경이 뛰어나고, 비교적 조용한 주거 환경을 제공합니다.",
  gangseo: "강서구는 마곡지구 개발로 인프라가 빠르게 성장 중이며, 한강 접근성이 좋습니다.",
  gwanak: "관악구는 서울대와 관악산을 품은 지역으로, 학생·청년층 비율이 높고 생활비가 상대적으로 저렴합니다.",
  gwangjin: "광진구는 건대입구·뚝섬 상권이 활발하며, 한강과 어린이대공원 등 여가 시설이 풍부합니다.",
  guro: "구로구는 디지털단지 중심의 직주근접 지역으로, 대중교통이 편리합니다.",
  geumcheon: "금천구는 가산디지털단지가 있어 직주근접에 유리하며, 생활비가 저렴한 편입니다.",
  nowon: "노원구는 수락산·불암산 등 자연환경이 좋고, 학원가가 밀집한 교육 중심 지역입니다.",
  dobong: "도봉구는 도봉산 접근성이 뛰어나고, 조용하고 안전한 주거 환경이 장점입니다.",
  dongdaemun: "동대문구는 경희대·한국외대가 있는 대학가로, 교통이 편리하고 생활비가 적당합니다.",
  dongjak: "동작구는 한강 접근성이 좋고, 사당역·이수역 상권이 활발한 교통 요지입니다.",
  mapo: "마포구는 홍대·합정·연남동 상권 덕분에 카페와 문화시설이 밀집한 젊은 지역입니다.",
  seodaemun: "서대문구는 연세대·이대 등 대학가로, 자연과 도심이 공존하는 환경입니다.",
  seocho: "서초구는 교대·법원·예술의전당이 있는 지역으로, 교육·문화·교통 인프라가 고르게 발달했습니다.",
  seongdong: "성동구는 성수동·서울숲을 중심으로 빠르게 발전 중이며, 한강 접근성이 뛰어납니다.",
  seongbuk: "성북구는 고려대·성신여대 일대 대학가로, 북악산과 가까워 자연환경이 좋습니다.",
  songpa: "송파구는 잠실·석촌호수·올림픽공원이 있는 인프라 풍부한 대규모 주거 지역입니다.",
  yangcheon: "양천구는 목동을 중심으로 교육 인프라가 뛰어난 가족 친화 지역입니다.",
  yeongdeungpo: "영등포구는 여의도·영등포역 상권이 발달했으며, 한강 접근성과 교통이 우수합니다.",
  yongsan: "용산구는 이태원·한남동 등 국제적인 분위기와 한강·남산 자연환경을 동시에 누릴 수 있습니다.",
  eunpyeong: "은평구는 북한산 자락에 위치해 자연환경이 뛰어나고, 은평뉴타운 등 쾌적한 주거지가 있습니다.",
  jongno: "종로구는 경복궁·인사동 등 역사·문화 자원이 풍부하고, 서울 도심 접근성이 최고입니다.",
  junggu: "중구는 서울 최중심부로 교통과 편의시설이 밀집해 있으며, 명동·을지로 상권이 활발합니다.",
  jungnang: "중랑구는 중랑천을 끼고 있어 산책·자전거 여건이 좋고, 주거비가 상대적으로 저렴합니다.",
};
