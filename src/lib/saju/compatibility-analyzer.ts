import type { SajuResult, CompatibilityResult, CheonganType, JijiType } from './types';
import {
  CHEONGAN_HAP, JIJI_YUKHAP, JIJI_SAMHAP, JIJI_CHUNG,
  CHEONGAN_OHAENG, OHAENG_SANGSAENG, OHAENG_SANGGEUK,
} from './constants';

/**
 * 두 사주의 궁합 분석
 */
export function analyzeCompatibility(person1: SajuResult, person2: SajuResult): CompatibilityResult {
  const ohaengScore = analyzeOhaengHarmony(person1, person2);
  const cheonganScore = analyzeCheonganHap(person1, person2);
  const jijiScore = analyzeJijiRelation(person1, person2);
  const iljuScore = analyzeIljuCompat(person1, person2);

  const totalScore = Math.round(
    ohaengScore.score * 0.3 +
    cheonganScore.score * 0.2 +
    jijiScore.score * 0.3 +
    iljuScore.score * 0.2
  );

  const strengths: string[] = [];
  const concerns: string[] = [];

  if (ohaengScore.score >= 70) strengths.push('오행이 서로 보완하는 좋은 관계입니다');
  if (cheonganScore.score >= 70) strengths.push('천간합이 있어 자연스럽게 끌리는 관계입니다');
  if (jijiScore.score >= 70) strengths.push('지지의 조화가 좋아 안정적인 관계를 유지할 수 있습니다');
  if (iljuScore.score >= 70) strengths.push('일주 궁합이 좋아 일상에서 잘 맞습니다');

  if (ohaengScore.score < 50) concerns.push('오행 균형이 맞지 않아 갈등이 생길 수 있습니다');
  if (jijiScore.score < 50) concerns.push('지지충이 있어 의견 충돌에 주의가 필요합니다');

  const summary = totalScore >= 80
    ? '두 분의 궁합은 매우 좋습니다. 서로를 잘 이해하고 보완하는 관계예요.'
    : totalScore >= 60
    ? '전반적으로 괜찮은 궁합입니다. 서로 노력하면 좋은 관계를 만들 수 있어요.'
    : totalScore >= 40
    ? '다소 맞지 않는 부분이 있지만, 서로 이해하려는 노력이 중요합니다.'
    : '궁합이 잘 맞지 않는 편이에요. 서로의 차이를 인정하고 존중하는 것이 중요합니다.';

  return {
    totalScore,
    categories: {
      ohaengHarmony: ohaengScore,
      cheonganHap: cheonganScore,
      jijiRelation: jijiScore,
      iljuCompat: iljuScore,
    },
    strengths,
    concerns,
    summary,
  };
}

function analyzeOhaengHarmony(p1: SajuResult, p2: SajuResult) {
  const o1 = CHEONGAN_OHAENG[p1.ilgan];
  const o2 = CHEONGAN_OHAENG[p2.ilgan];

  let score = 60;
  let description = '';

  // 상생 관계면 좋음
  if (OHAENG_SANGSAENG.some(([a, b]) => (a === o1 && b === o2) || (a === o2 && b === o1))) {
    score = 85;
    description = `${o1}과 ${o2}은 상생 관계로, 서로에게 긍정적인 에너지를 줍니다.`;
  }
  // 상극이면 주의
  else if (OHAENG_SANGGEUK.some(([a, b]) => (a === o1 && b === o2) || (a === o2 && b === o1))) {
    score = 40;
    description = `${o1}과 ${o2}은 상극 관계로, 갈등이 생길 수 있어 서로 배려가 필요합니다.`;
  }
  // 같은 오행
  else if (o1 === o2) {
    score = 70;
    description = `같은 ${o1} 오행으로, 비슷한 성향이라 공감대가 높지만 경쟁할 수도 있습니다.`;
  } else {
    score = 60;
    description = `${o1}과 ${o2}은 무난한 관계입니다.`;
  }

  // 오행 분포 보완 체크
  const lacking1 = Object.entries(p1.ohaeng).filter(([, v]) => v === 0).map(([k]) => k);
  const lacking2 = Object.entries(p2.ohaeng).filter(([, v]) => v === 0).map(([k]) => k);
  const complementary = lacking1.some(k => (p2.ohaeng as unknown as Record<string, number>)[k] >= 2) ||
                        lacking2.some(k => (p1.ohaeng as unknown as Record<string, number>)[k] >= 2);
  if (complementary) {
    score += 10;
    description += ' 서로 부족한 오행을 보완해주는 관계이기도 합니다.';
  }

  return { score: Math.min(score, 100), description };
}

function analyzeCheonganHap(p1: SajuResult, p2: SajuResult) {
  const allCheongan1: CheonganType[] = [p1.yearPillar.cheongan, p1.monthPillar.cheongan, p1.dayPillar.cheongan, p1.hourPillar.cheongan];
  const allCheongan2: CheonganType[] = [p2.yearPillar.cheongan, p2.monthPillar.cheongan, p2.dayPillar.cheongan, p2.hourPillar.cheongan];

  let hapCount = 0;
  for (const c1 of allCheongan1) {
    for (const c2 of allCheongan2) {
      if (CHEONGAN_HAP.some(([a, b]) => (a === c1 && b === c2) || (a === c2 && b === c1))) {
        hapCount++;
      }
    }
  }

  // 일간끼리 합이 있으면 가산
  const ilganHap = CHEONGAN_HAP.some(([a, b]) =>
    (a === p1.ilgan && b === p2.ilgan) || (a === p2.ilgan && b === p1.ilgan)
  );

  let score = 50 + hapCount * 10;
  if (ilganHap) score += 20;
  score = Math.min(score, 100);

  const description = ilganHap
    ? `일간끼리 천간합이 있어 자연스럽게 끌리는 인연입니다.`
    : hapCount > 0
    ? `천간합이 ${hapCount}개 있어 좋은 조화를 이룹니다.`
    : '천간합은 없지만 다른 요소로 보완 가능합니다.';

  return { score, description };
}

function analyzeJijiRelation(p1: SajuResult, p2: SajuResult) {
  const allJiji1: JijiType[] = [p1.yearPillar.jiji, p1.monthPillar.jiji, p1.dayPillar.jiji, p1.hourPillar.jiji];
  const allJiji2: JijiType[] = [p2.yearPillar.jiji, p2.monthPillar.jiji, p2.dayPillar.jiji, p2.hourPillar.jiji];

  let hapCount = 0;
  let chungCount = 0;

  for (const j1 of allJiji1) {
    for (const j2 of allJiji2) {
      if (JIJI_YUKHAP.some(([a, b]) => (a === j1 && b === j2) || (a === j2 && b === j1))) {
        hapCount++;
      }
      if (JIJI_CHUNG.some(([a, b]) => (a === j1 && b === j2) || (a === j2 && b === j1))) {
        chungCount++;
      }
    }
  }

  let score = 60 + hapCount * 10 - chungCount * 15;
  score = Math.max(20, Math.min(score, 100));

  let description = '';
  if (hapCount > 0 && chungCount === 0) {
    description = `지지육합이 ${hapCount}개 있어 안정적인 관계입니다.`;
  } else if (chungCount > 0 && hapCount === 0) {
    description = `지지충이 ${chungCount}개 있어 의견 충돌이 있을 수 있습니다.`;
  } else if (hapCount > 0 && chungCount > 0) {
    description = `합과 충이 동시에 있어 극적인 관계입니다. 잘 맞을 때는 최고, 안 맞을 때는 갈등이 클 수 있어요.`;
  } else {
    description = '지지 관계는 무난한 편입니다.';
  }

  return { score, description };
}

function analyzeIljuCompat(p1: SajuResult, p2: SajuResult) {
  const dayJiji1 = p1.dayPillar.jiji;
  const dayJiji2 = p2.dayPillar.jiji;

  let score = 60;
  let description = '';

  // 일지 육합
  if (JIJI_YUKHAP.some(([a, b]) => (a === dayJiji1 && b === dayJiji2) || (a === dayJiji2 && b === dayJiji1))) {
    score = 90;
    description = '일지가 육합으로, 일상생활에서 잘 맞는 최고의 궁합입니다.';
  }
  // 일지 충
  else if (JIJI_CHUNG.some(([a, b]) => (a === dayJiji1 && b === dayJiji2) || (a === dayJiji2 && b === dayJiji1))) {
    score = 35;
    description = '일지가 충으로, 생활 습관이나 가치관에서 차이가 있을 수 있습니다.';
  }
  // 일간 합
  else if (CHEONGAN_HAP.some(([a, b]) => (a === p1.ilgan && b === p2.ilgan) || (a === p2.ilgan && b === p1.ilgan))) {
    score = 85;
    description = '일간이 합으로, 서로에게 자연스럽게 끌리는 좋은 인연입니다.';
  } else {
    description = '일주 관계는 무난한 편입니다.';
  }

  return { score, description };
}
