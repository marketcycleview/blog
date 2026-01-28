import type { SajuResult, FortuneResult, OhaengType } from './types';
import { CHEONGAN_OHAENG, JIJI_OHAENG, OHAENG_SANGSAENG, OHAENG_SANGGEUK } from './constants';
import { calculateSaeun } from './saeun-calculator';

/**
 * 상세 운세 해석
 */
export function interpretFortune(saju: SajuResult, year?: number): FortuneResult {
  const targetYear = year || new Date().getFullYear();
  const saeun = calculateSaeun(targetYear);

  const ilganOhaeng = CHEONGAN_OHAENG[saju.ilgan];
  const saeunCheonganOhaeng = CHEONGAN_OHAENG[saeun.cheongan];
  const saeunJijiOhaeng = JIJI_OHAENG[saeun.jiji];

  // 세운과 일간의 관계 분석
  const yearRelation = getRelation(ilganOhaeng, saeunCheonganOhaeng);
  const yearJijiRelation = getRelation(ilganOhaeng, saeunJijiOhaeng);

  // 카테고리별 운세 계산
  const wealth = calculateWealth(saju, ilganOhaeng, saeunCheonganOhaeng, saeunJijiOhaeng);
  const love = calculateLove(saju, ilganOhaeng, saeunCheonganOhaeng, saeunJijiOhaeng);
  const health = calculateHealth(saju, ilganOhaeng, saeunCheonganOhaeng, saeunJijiOhaeng);
  const career = calculateCareer(saju, ilganOhaeng, saeunCheonganOhaeng, saeunJijiOhaeng);

  // 월별 운세
  const monthlyFortune = generateMonthlyFortune(saju, targetYear);

  // 종합 운세
  const avgScore = (wealth.score + love.score + health.score + career.score) / 4;
  const overall = avgScore >= 4
    ? `${targetYear}년은 전반적으로 좋은 한 해입니다. 적극적으로 움직이면 좋은 결과를 얻을 수 있어요.`
    : avgScore >= 3
    ? `${targetYear}년은 무난한 한 해입니다. 꾸준히 노력하면 안정적인 성과를 거둘 수 있어요.`
    : avgScore >= 2
    ? `${targetYear}년은 다소 어려운 시기가 있을 수 있습니다. 무리하지 말고 차근차근 진행하세요.`
    : `${targetYear}년은 조심해야 할 한 해입니다. 큰 변화보다는 현재를 유지하는 것이 좋겠어요.`;

  return {
    year: targetYear,
    overall,
    categories: { wealth, love, health, career },
    monthlyFortune,
  };
}

function getRelation(a: OhaengType, b: OhaengType): 'sangsaeng' | 'sanggeuk' | 'bihwa' | 'neutral' {
  if (a === b) return 'bihwa';
  if (OHAENG_SANGSAENG.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) return 'sangsaeng';
  if (OHAENG_SANGGEUK.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) return 'sanggeuk';
  return 'neutral';
}

function calculateWealth(saju: SajuResult, ilgan: OhaengType, saeunC: OhaengType, saeunJ: OhaengType) {
  // 재성(편재/정재) = 일간이 극하는 오행
  let score = 3;
  const rel = getRelation(ilgan, saeunC);

  if (rel === 'sangsaeng') {
    score = 4;
  } else if (rel === 'sanggeuk' && OHAENG_SANGGEUK.some(([a]) => a === ilgan && (a === saeunC || a === saeunJ))) {
    score = 4; // 일간이 극하면 재성 = 좋음
  } else if (rel === 'sanggeuk') {
    score = 2;
  }

  // 오행 재성 체크
  const jaeOhaeng = getJaeOhaeng(ilgan);
  const hasjae = saju.ohaeng[jaeOhaeng] >= 1;
  if (hasjae && (saeunC === jaeOhaeng || saeunJ === jaeOhaeng)) {
    score = 5;
  }

  const descriptions: Record<number, string> = {
    5: '재물운이 매우 좋습니다. 투자나 사업에서 좋은 성과를 기대할 수 있어요.',
    4: '재물운이 양호합니다. 꾸준한 수입이 기대되고, 예상치 못한 수입이 있을 수 있어요.',
    3: '재물운은 보통입니다. 큰 지출을 피하고 저축에 신경 쓰세요.',
    2: '재물운에 주의가 필요합니다. 과소비를 조심하고 계획적으로 관리하세요.',
    1: '재물운이 좋지 않습니다. 큰 투자는 피하고 안전한 재테크를 추천합니다.',
  };

  return { name: '재물운', score, description: descriptions[score] || descriptions[3] };
}

function calculateLove(saju: SajuResult, ilgan: OhaengType, saeunC: OhaengType, saeunJ: OhaengType) {
  let score = 3;
  const rel = getRelation(ilgan, saeunJ);

  if (rel === 'sangsaeng') score = 4;
  if (rel === 'bihwa') score = 3;
  if (rel === 'sanggeuk') score = 2;

  // 도화살 (자오묘유) 체크
  const doHwa: string[] = ['자', '오', '묘', '유'];
  const hasDohwa = [saju.dayPillar.jiji, saju.yearPillar.jiji].some(j => doHwa.includes(j));
  if (hasDohwa && doHwa.includes(saju.saeun.jiji)) score = Math.min(score + 1, 5);

  const descriptions: Record<number, string> = {
    5: '연애운이 매우 좋습니다! 새로운 인연을 만나거나 현재 관계가 더 깊어질 수 있어요.',
    4: '연애운이 좋은 편입니다. 적극적으로 사람을 만나보세요.',
    3: '연애운은 보통입니다. 조급해하지 않으면 좋은 인연이 찾아올 거예요.',
    2: '연애운에 변동이 있을 수 있어요. 감정 조절에 신경 쓰세요.',
    1: '연애운이 다소 어렵습니다. 기존 관계에 집중하는 것이 좋겠어요.',
  };

  return { name: '연애운', score, description: descriptions[score] || descriptions[3] };
}

function calculateHealth(saju: SajuResult, ilgan: OhaengType, saeunC: OhaengType, saeunJ: OhaengType) {
  let score = 3;

  // 일간이 강하면 건강 좋음
  const ilganCount = saju.ohaeng[ilgan];
  if (ilganCount >= 2) score = 4;
  if (ilganCount >= 3) score = 5;

  // 세운이 일간을 극하면 건강 주의
  if (OHAENG_SANGGEUK.some(([a, b]) => a === saeunC && b === ilgan)) {
    score = Math.max(score - 1, 1);
  }

  const weakOrgans: Record<OhaengType, string> = {
    '목': '간, 담, 눈에 주의하세요',
    '화': '심장, 혈압, 소장에 주의하세요',
    '토': '위장, 소화기에 주의하세요',
    '금': '폐, 호흡기, 피부에 주의하세요',
    '수': '신장, 방광, 뼈에 주의하세요',
  };

  // 부족한 오행의 관련 장기 주의
  const lackingOhaeng = (Object.entries(saju.ohaeng) as [OhaengType, number][])
    .filter(([, v]) => v === 0)
    .map(([k]) => k);

  const organWarning = lackingOhaeng.length > 0
    ? ` ${lackingOhaeng.map(o => weakOrgans[o]).join('. ')}.`
    : '';

  const descriptions: Record<number, string> = {
    5: `건강운이 매우 좋습니다. 체력이 좋은 한 해예요.${organWarning}`,
    4: `건강운이 양호합니다. 규칙적인 생활을 유지하세요.${organWarning}`,
    3: `건강운은 보통입니다. 과로를 피하고 충분히 쉬세요.${organWarning}`,
    2: `건강에 주의가 필요한 해입니다. 정기 검진을 추천합니다.${organWarning}`,
    1: `건강운이 좋지 않습니다. 무리하지 마시고 건강 관리에 신경 쓰세요.${organWarning}`,
  };

  return { name: '건강운', score, description: descriptions[score] || descriptions[3] };
}

function calculateCareer(saju: SajuResult, ilgan: OhaengType, saeunC: OhaengType, saeunJ: OhaengType) {
  let score = 3;

  // 관성(편관/정관) = 나를 극하는 오행 → 직장/직위
  const gwanOhaeng = getGwanOhaeng(ilgan);
  if (saeunC === gwanOhaeng || saeunJ === gwanOhaeng) {
    score = 4; // 관성이 오면 직위/직장 변동 가능
  }

  // 인성 = 나를 생하는 오행 → 학업/자격
  const inOhaeng = getInOhaeng(ilgan);
  if (saeunC === inOhaeng || saeunJ === inOhaeng) {
    score = Math.min(score + 1, 5);
  }

  const descriptions: Record<number, string> = {
    5: '직업운이 매우 좋습니다. 승진이나 새로운 기회가 찾아올 수 있어요.',
    4: '직업운이 좋은 편입니다. 새로운 프로젝트에 도전해보세요.',
    3: '직업운은 보통입니다. 현재 하던 일에 충실하면 좋은 결과가 있어요.',
    2: '직업운에 변동이 있을 수 있어요. 이직보다는 현 위치를 지키는 것이 나아요.',
    1: '직업운이 어렵습니다. 인내심을 갖고 때를 기다리세요.',
  };

  return { name: '직업운', score, description: descriptions[score] || descriptions[3] };
}

// 재성 오행 (일간이 극하는 오행)
function getJaeOhaeng(ilgan: OhaengType): OhaengType {
  const map: Record<OhaengType, OhaengType> = { '목': '토', '화': '금', '토': '수', '금': '목', '수': '화' };
  return map[ilgan];
}

// 관성 오행 (나를 극하는 오행)
function getGwanOhaeng(ilgan: OhaengType): OhaengType {
  const map: Record<OhaengType, OhaengType> = { '목': '금', '화': '수', '토': '목', '금': '화', '수': '토' };
  return map[ilgan];
}

// 인성 오행 (나를 생하는 오행)
function getInOhaeng(ilgan: OhaengType): OhaengType {
  const map: Record<OhaengType, OhaengType> = { '목': '수', '화': '목', '토': '화', '금': '토', '수': '금' };
  return map[ilgan];
}

function generateMonthlyFortune(saju: SajuResult, year: number) {
  const months = [];
  const ilganOhaeng = CHEONGAN_OHAENG[saju.ilgan];

  for (let m = 1; m <= 12; m++) {
    // 월간지 계산 (간략화)
    const monthJijiIndex = (2 + (m - 1)) % 12;
    const monthOhaeng = JIJI_OHAENG[['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'][monthJijiIndex] as import('./types').JijiType];

    const rel = getRelation(ilganOhaeng, monthOhaeng);
    let score = 3;
    if (rel === 'sangsaeng') score = 4;
    if (rel === 'sanggeuk') score = 2;
    if (rel === 'bihwa') score = 3;

    // 약간의 변동 추가 (해시 기반)
    const hash = (year * 13 + m * 7 + saju.dayPillar.cheongan.charCodeAt(0)) % 5;
    score = Math.max(1, Math.min(5, score + (hash > 3 ? 1 : hash < 1 ? -1 : 0)));

    const tips: Record<number, string> = {
      5: '적극적으로 도전하기 좋은 달',
      4: '새로운 시작에 좋은 달',
      3: '무난하게 진행되는 달',
      2: '신중하게 행동해야 할 달',
      1: '조심하며 쉬어가는 달',
    };

    months.push({ month: m, score, tip: tips[score] || tips[3] });
  }

  return months;
}
