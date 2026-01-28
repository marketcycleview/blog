import type { CheonganType, JijiType, OhaengType, YinYangType } from './types';

// 천간 (天干)
export const CHEONGAN: CheonganType[] = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
export const CHEONGAN_HANJA: string[] = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
export const CHEONGAN_EN: string[] = ['Gap', 'Eul', 'Byeong', 'Jeong', 'Mu', 'Gi', 'Gyeong', 'Sin', 'Im', 'Gye'];

// 지지 (地支)
export const JIJI: JijiType[] = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];
export const JIJI_HANJA: string[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
export const JIJI_ANIMAL: string[] = ['쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지'];

// 천간 → 오행
export const CHEONGAN_OHAENG: Record<CheonganType, OhaengType> = {
  '갑': '목', '을': '목',
  '병': '화', '정': '화',
  '무': '토', '기': '토',
  '경': '금', '신': '금',
  '임': '수', '계': '수',
};

// 지지 → 오행
export const JIJI_OHAENG: Record<JijiType, OhaengType> = {
  '인': '목', '묘': '목',
  '사': '화', '오': '화',
  '진': '토', '술': '토', '축': '토', '미': '토',
  '신': '금', '유': '금',
  '해': '수', '자': '수',
};

// 천간 → 음양
export const CHEONGAN_YINYANG: Record<CheonganType, YinYangType> = {
  '갑': '양', '을': '음',
  '병': '양', '정': '음',
  '무': '양', '기': '음',
  '경': '양', '신': '음',
  '임': '양', '계': '음',
};

// 지지 → 음양
export const JIJI_YINYANG: Record<JijiType, YinYangType> = {
  '자': '양', '축': '음',
  '인': '양', '묘': '음',
  '진': '양', '사': '음',
  '오': '양', '미': '음',
  '신': '양', '유': '음',
  '술': '양', '해': '음',
};

// 지장간 (지지 속 숨은 천간)
export const JIJANGGAN: Record<JijiType, CheonganType[]> = {
  '자': ['계'],
  '축': ['기', '계', '신'],
  '인': ['갑', '병', '무'],
  '묘': ['을'],
  '진': ['무', '을', '계'],
  '사': ['병', '경', '무'],
  '오': ['정', '기'],
  '미': ['기', '정', '을'],
  '신': ['경', '임', '무'],
  '유': ['신'],
  '술': ['무', '신', '정'],
  '해': ['임', '갑'],
};

// 시진 시간 범위 (30분 기준 - 전통 초정법)
export const SIJIN_HOURS: { jiji: JijiType; label: string; range: string }[] = [
  { jiji: '자', label: '자시', range: '23:30 ~ 01:29' },
  { jiji: '축', label: '축시', range: '01:30 ~ 03:29' },
  { jiji: '인', label: '인시', range: '03:30 ~ 05:29' },
  { jiji: '묘', label: '묘시', range: '05:30 ~ 07:29' },
  { jiji: '진', label: '진시', range: '07:30 ~ 09:29' },
  { jiji: '사', label: '사시', range: '09:30 ~ 11:29' },
  { jiji: '오', label: '오시', range: '11:30 ~ 13:29' },
  { jiji: '미', label: '미시', range: '13:30 ~ 15:29' },
  { jiji: '신', label: '신시', range: '15:30 ~ 17:29' },
  { jiji: '유', label: '유시', range: '17:30 ~ 19:29' },
  { jiji: '술', label: '술시', range: '19:30 ~ 21:29' },
  { jiji: '해', label: '해시', range: '21:30 ~ 23:29' },
];

// 오행 색상
export const OHAENG_COLORS: Record<OhaengType, string> = {
  '목': '#22c55e',
  '화': '#ef4444',
  '토': '#eab308',
  '금': '#a1a1aa',
  '수': '#3b82f6',
};

// 오행 상생 관계 (A가 B를 생함)
export const OHAENG_SANGSAENG: [OhaengType, OhaengType][] = [
  ['목', '화'], // 목생화
  ['화', '토'], // 화생토
  ['토', '금'], // 토생금
  ['금', '수'], // 금생수
  ['수', '목'], // 수생목
];

// 오행 상극 관계 (A가 B를 극함)
export const OHAENG_SANGGEUK: [OhaengType, OhaengType][] = [
  ['목', '토'], // 목극토
  ['토', '수'], // 토극수
  ['수', '화'], // 수극화
  ['화', '금'], // 화극금
  ['금', '목'], // 금극목
];

// 천간합 (天干合)
export const CHEONGAN_HAP: [CheonganType, CheonganType, OhaengType][] = [
  ['갑', '기', '토'],
  ['을', '경', '금'],
  ['병', '신', '수'],
  ['정', '임', '목'],
  ['무', '계', '화'],
];

// 지지육합 (地支六合)
export const JIJI_YUKHAP: [JijiType, JijiType][] = [
  ['자', '축'],
  ['인', '해'],
  ['묘', '술'],
  ['진', '유'],
  ['사', '신'],
  ['오', '미'],
];

// 지지삼합 (地支三合)
export const JIJI_SAMHAP: { members: [JijiType, JijiType, JijiType]; ohaeng: OhaengType }[] = [
  { members: ['인', '오', '술'], ohaeng: '화' },
  { members: ['신', '자', '진'], ohaeng: '수' },
  { members: ['사', '유', '축'], ohaeng: '금' },
  { members: ['해', '묘', '미'], ohaeng: '목' },
];

// 지지충 (地支沖)
export const JIJI_CHUNG: [JijiType, JijiType][] = [
  ['자', '오'],
  ['축', '미'],
  ['인', '신'],
  ['묘', '유'],
  ['진', '술'],
  ['사', '해'],
];

// 지지형 (地支刑)
export const JIJI_HYEONG: [JijiType, JijiType][] = [
  ['인', '사'],
  ['사', '신'],
  ['축', '술'],
  ['술', '미'],
  ['자', '묘'],
];
