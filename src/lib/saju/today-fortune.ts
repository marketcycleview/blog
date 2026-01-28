import type { JijiType, CheonganType, OhaengType } from './types';
import { CHEONGAN, JIJI, CHEONGAN_OHAENG, JIJI_OHAENG, OHAENG_SANGSAENG, OHAENG_SANGGEUK, JIJI_ANIMAL } from './constants';

export interface TodayFortuneResult {
  date: Date;
  dayGanji: { cheongan: CheonganType; jiji: JijiType };
  userOhaeng: OhaengType;
  userAnimal: string;
  overallScore: number;
  overall: string;
  categories: {
    wealth: { score: number; text: string };
    love: { score: number; text: string };
    work: { score: number; text: string };
    health: { score: number; text: string };
  };
  luckyColor: string;
  luckyNumber: string;
  luckyDirection: string;
  advice: string;
  warning: string;
}

// 일진 계산 (2000년 1월 1일 = 갑진일 기준)
function getDayGanji(date: Date): { cheongan: CheonganType; jiji: JijiType } {
  const baseDate = new Date(2000, 0, 1); // 2000년 1월 1일 = 갑진일
  const baseCheonganIdx = 0; // 갑
  const baseJijiIdx = 4; // 진

  const diffDays = Math.floor((date.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));

  const cheonganIdx = (baseCheonganIdx + diffDays) % 10;
  const jijiIdx = (baseJijiIdx + diffDays) % 12;

  return {
    cheongan: CHEONGAN[(cheonganIdx + 10) % 10],
    jiji: JIJI[(jijiIdx + 12) % 12],
  };
}

// 띠 인덱스로 지지 가져오기
function getJijiFromBirthYear(birthYear: number): JijiType {
  const idx = (birthYear - 4) % 12;
  return JIJI[idx];
}

// 오행 관계 점수
function getOhaengScore(userOhaeng: OhaengType, dayOhaeng: OhaengType): number {
  if (userOhaeng === dayOhaeng) return 70; // 비화
  if (OHAENG_SANGSAENG.some(([a, b]) => a === dayOhaeng && b === userOhaeng)) return 90; // 일진이 나를 생
  if (OHAENG_SANGSAENG.some(([a, b]) => a === userOhaeng && b === dayOhaeng)) return 75; // 내가 일진을 생
  if (OHAENG_SANGGEUK.some(([a, b]) => a === dayOhaeng && b === userOhaeng)) return 40; // 일진이 나를 극
  if (OHAENG_SANGGEUK.some(([a, b]) => a === userOhaeng && b === dayOhaeng)) return 55; // 내가 일진을 극
  return 60;
}

// 운세 텍스트 데이터
const FORTUNE_TEXTS = {
  overall: {
    90: ['최고의 하루입니다! 무엇을 해도 잘 풀리는 날이에요.', '행운이 따르는 날! 적극적으로 움직여보세요.', '오늘은 당신의 날이에요. 자신감을 가지세요!'],
    75: ['좋은 하루가 될 거예요. 긍정적인 마음으로 시작하세요.', '순조로운 하루입니다. 계획한 일을 진행하기 좋아요.', '기분 좋은 일이 생길 수 있는 날이에요.'],
    60: ['무난한 하루입니다. 평소처럼 꾸준히 하면 됩니다.', '특별한 일은 없지만 안정적인 하루예요.', '조용하게 보내기 좋은 날이에요.'],
    45: ['조금 주의가 필요한 날이에요. 신중하게 행동하세요.', '급한 결정은 피하세요. 한 템포 쉬어가세요.', '예상치 못한 변수가 있을 수 있어요.'],
    30: ['조심해야 할 하루입니다. 무리하지 마세요.', '오늘은 쉬어가는 게 좋겠어요. 큰 일은 미루세요.', '감정 조절에 신경 쓰세요.'],
  },
  wealth: {
    high: ['재물운이 좋습니다. 예상치 못한 수입이 있을 수 있어요.', '금전적으로 좋은 소식이 있을 수 있습니다.', '투자보다는 저축이 유리한 날이에요.'],
    mid: ['재물운은 보통입니다. 계획적인 소비를 하세요.', '큰 지출은 피하는 것이 좋겠어요.', '돈 관련 결정은 신중하게 하세요.'],
    low: ['재물운에 주의가 필요해요. 충동구매를 조심하세요.', '예상치 못한 지출이 있을 수 있어요.', '금전 거래는 오늘 피하는 게 좋겠어요.'],
  },
  love: {
    high: ['연애운이 좋습니다! 좋은 인연을 만날 수 있어요.', '연인과의 관계가 더 깊어지는 날이에요.', '고백하기 좋은 날입니다.'],
    mid: ['연애운은 무난합니다. 평소처럼 대하면 됩니다.', '소소한 데이트가 좋겠어요.', '상대방의 말에 귀 기울여보세요.'],
    low: ['연애운에 주의가 필요해요. 오해가 생길 수 있습니다.', '감정적인 대화는 피하세요.', '연인과 거리를 두는 게 오히려 좋을 수 있어요.'],
  },
  work: {
    high: ['업무운이 좋습니다! 성과를 낼 수 있는 날이에요.', '새로운 프로젝트 시작하기 좋은 날입니다.', '상사나 동료에게 인정받을 수 있어요.'],
    mid: ['업무운은 보통입니다. 꾸준히 하던 일을 이어가세요.', '급하게 처리할 일은 없어요. 차근차근 하세요.', '협업이 필요한 일에 집중하세요.'],
    low: ['업무에서 실수가 있을 수 있어요. 꼼꼼히 체크하세요.', '중요한 미팅은 미루는 게 좋겠어요.', '동료와의 갈등에 주의하세요.'],
  },
  health: {
    high: ['건강운이 좋습니다. 활동적으로 움직여도 괜찮아요.', '운동하기 좋은 날이에요!', '컨디션이 좋은 하루가 될 거예요.'],
    mid: ['건강은 무난합니다. 무리하지 않으면 됩니다.', '충분한 수분 섭취를 하세요.', '적당한 휴식을 취하세요.'],
    low: ['건강에 주의가 필요해요. 과로를 피하세요.', '소화기 건강에 신경 쓰세요.', '일찍 잠자리에 드는 게 좋겠어요.'],
  },
};

const LUCKY_COLORS: Record<OhaengType, string> = {
  '목': '초록색, 청록색',
  '화': '빨간색, 보라색',
  '토': '노란색, 갈색',
  '금': '흰색, 금색',
  '수': '검은색, 파란색',
};

const LUCKY_DIRECTIONS: Record<OhaengType, string> = {
  '목': '동쪽',
  '화': '남쪽',
  '토': '중앙',
  '금': '서쪽',
  '수': '북쪽',
};

const ADVICE_TEXTS = [
  '오늘 하루도 감사한 마음으로 시작하세요.',
  '작은 친절이 큰 행운으로 돌아옵니다.',
  '급할수록 돌아가세요.',
  '좋은 사람과 함께하면 좋은 기운이 옵니다.',
  '긍정적인 마음가짐이 행운을 부릅니다.',
  '오늘의 노력이 내일의 성과가 됩니다.',
  '웃으면 복이 옵니다.',
  '어려운 일이 있어도 이겨낼 수 있어요.',
];

const WARNING_TEXTS = [
  '과음, 과식을 조심하세요.',
  '말조심이 필요한 날이에요.',
  '급한 투자 결정은 피하세요.',
  '무리한 일정은 피하는 게 좋아요.',
  '감정적인 대응은 후회를 부릅니다.',
  '약속 시간을 꼭 지키세요.',
];

/**
 * 오늘의 운세 계산
 */
export function getTodayFortune(birthYear: number, birthMonth: number, birthDay: number, targetDate?: Date): TodayFortuneResult {
  const date = targetDate || new Date();
  const dayGanji = getDayGanji(date);

  // 사용자의 띠와 오행 (간단히 년지 기준)
  const userJiji = getJijiFromBirthYear(birthYear);
  const userOhaeng = JIJI_OHAENG[userJiji];
  const userAnimalIdx = JIJI.indexOf(userJiji);
  const userAnimal = JIJI_ANIMAL[userAnimalIdx];

  // 일진의 오행
  const dayOhaeng = CHEONGAN_OHAENG[dayGanji.cheongan];

  // 기본 점수 계산
  const baseScore = getOhaengScore(userOhaeng, dayOhaeng);

  // 날짜 기반 변동 (생일 해시)
  const dateHash = (date.getFullYear() * 365 + date.getMonth() * 30 + date.getDate() + birthYear + birthMonth + birthDay) % 100;
  const variation = (dateHash % 20) - 10; // -10 ~ +10 변동

  const overallScore = Math.max(20, Math.min(95, baseScore + variation));

  // 카테고리별 점수 (기본 점수 기반 + 개별 변동)
  const wealthScore = Math.max(20, Math.min(95, baseScore + ((dateHash * 3) % 20) - 10));
  const loveScore = Math.max(20, Math.min(95, baseScore + ((dateHash * 7) % 20) - 10));
  const workScore = Math.max(20, Math.min(95, baseScore + ((dateHash * 11) % 20) - 10));
  const healthScore = Math.max(20, Math.min(95, baseScore + ((dateHash * 13) % 20) - 10));

  // 텍스트 선택
  const getRandomText = (arr: string[], seed: number) => arr[seed % arr.length];
  const getScoreLevel = (score: number) => score >= 70 ? 'high' : score >= 50 ? 'mid' : 'low';
  const getOverallLevel = (score: number) => {
    if (score >= 85) return 90;
    if (score >= 70) return 75;
    if (score >= 55) return 60;
    if (score >= 40) return 45;
    return 30;
  };

  // 보완이 필요한 오행 기준 행운 요소
  const needOhaeng = OHAENG_SANGSAENG.find(([a]) => a === dayOhaeng)?.[1] || dayOhaeng;

  return {
    date,
    dayGanji,
    userOhaeng,
    userAnimal,
    overallScore,
    overall: getRandomText(FORTUNE_TEXTS.overall[getOverallLevel(overallScore)], dateHash),
    categories: {
      wealth: {
        score: wealthScore,
        text: getRandomText(FORTUNE_TEXTS.wealth[getScoreLevel(wealthScore)], dateHash + 1),
      },
      love: {
        score: loveScore,
        text: getRandomText(FORTUNE_TEXTS.love[getScoreLevel(loveScore)], dateHash + 2),
      },
      work: {
        score: workScore,
        text: getRandomText(FORTUNE_TEXTS.work[getScoreLevel(workScore)], dateHash + 3),
      },
      health: {
        score: healthScore,
        text: getRandomText(FORTUNE_TEXTS.health[getScoreLevel(healthScore)], dateHash + 4),
      },
    },
    luckyColor: LUCKY_COLORS[needOhaeng],
    luckyNumber: `${(dateHash % 9) + 1}, ${((dateHash + 3) % 9) + 1}`,
    luckyDirection: LUCKY_DIRECTIONS[needOhaeng],
    advice: getRandomText(ADVICE_TEXTS, dateHash + 5),
    warning: getRandomText(WARNING_TEXTS, dateHash + 6),
  };
}
