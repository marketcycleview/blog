import type { SajuResult, CompatibilityResult, CheonganType, JijiType, OhaengType } from './types';
import {
  CHEONGAN_HAP, JIJI_YUKHAP, JIJI_SAMHAP, JIJI_CHUNG,
  CHEONGAN_OHAENG, OHAENG_SANGSAENG, OHAENG_SANGGEUK,
  CHEONGAN_YINYANG, JIJI_YINYANG,
} from './constants';

// 일간별 궁합 특성
const ILGAN_LOVE_STYLE: Record<CheonganType, {
  style: string;
  idealPartner: string;
  warning: string;
}> = {
  '갑': {
    style: '주도적이고 든든한 연애를 합니다. 책임감 있게 상대를 이끌어갑니다.',
    idealPartner: '자신을 존중해주고 서포트해주는 부드러운 상대',
    warning: '고집으로 인한 갈등에 주의. 상대 의견도 존중하세요.',
  },
  '을': {
    style: '유연하고 헌신적인 연애를 합니다. 상대에게 맞춰주는 편입니다.',
    idealPartner: '리드해줄 수 있는 듬직한 상대',
    warning: '너무 맞추다 보면 지칠 수 있어요. 자기 주장도 필요합니다.',
  },
  '병': {
    style: '뜨겁고 열정적인 연애를 합니다. 표현이 적극적입니다.',
    idealPartner: '자신의 열정을 받아줄 수 있는 넓은 마음의 상대',
    warning: '식어버리면 급격히 관심이 떨어질 수 있어요.',
  },
  '정': {
    style: '깊고 섬세한 연애를 합니다. 상대의 마음을 잘 읽습니다.',
    idealPartner: '섬세한 감정을 이해해주는 감성적인 상대',
    warning: '예민함으로 인한 오해가 생길 수 있어요.',
  },
  '무': {
    style: '안정적이고 변함없는 연애를 합니다. 묵묵히 지켜줍니다.',
    idealPartner: '안정을 추구하고 가정적인 상대',
    warning: '표현 부족으로 서운함을 줄 수 있어요.',
  },
  '기': {
    style: '따뜻하고 편안한 연애를 합니다. 일상을 함께하는 것을 좋아합니다.',
    idealPartner: '편안하고 소소한 행복을 함께할 상대',
    warning: '수동적인 태도가 답답할 수 있어요.',
  },
  '경': {
    style: '직진형 연애를 합니다. 좋으면 밀어붙이고 아니면 깔끔하게 정리합니다.',
    idealPartner: '자신을 이해하고 뒷받침해줄 상대',
    warning: '너무 냉정하면 상대가 상처받을 수 있어요.',
  },
  '신': {
    style: '까다롭지만 한번 빠지면 깊게 빠지는 연애를 합니다.',
    idealPartner: '자신의 기준을 충족시키는 매력적인 상대',
    warning: '이상이 높아 만족하기 어려울 수 있어요.',
  },
  '임': {
    style: '자유롭고 넓은 연애를 합니다. 구속을 싫어합니다.',
    idealPartner: '독립적이고 서로의 자유를 존중하는 상대',
    warning: '한곳에 정착하기 어려울 수 있어요.',
  },
  '계': {
    style: '직관적이고 감성적인 연애를 합니다. 상대의 마음을 꿰뚫어봅니다.',
    idealPartner: '감정적으로 교감할 수 있는 깊이 있는 상대',
    warning: '의심과 불안이 관계를 힘들게 할 수 있어요.',
  },
};

// 오행 궁합 상세 설명
const OHAENG_COMPAT: Record<string, {
  score: number;
  title: string;
  description: string;
  strength: string;
  weakness: string;
  advice: string;
}> = {
  '목목': { score: 70, title: '같은 목(木) 기운', description: '비슷한 성향으로 공감대가 높습니다.', strength: '서로 이해가 빠르고 취향이 비슷합니다', weakness: '경쟁심이 생기거나 주도권 다툼이 있을 수 있어요', advice: '서로의 영역을 존중하세요' },
  '목화': { score: 90, title: '목생화(木生火) - 상생', description: '목이 화를 생하는 최고의 궁합입니다.', strength: '서로에게 에너지를 주고 성장하는 관계', weakness: '목이 지치면 화가 꺼질 수 있어요', advice: '서로 힘이 되어주세요' },
  '목토': { score: 45, title: '목극토(木剋土) - 상극', description: '목이 토를 극하는 관계로 갈등이 있을 수 있습니다.', strength: '적절한 긴장감이 활력이 될 수 있어요', weakness: '의견 충돌이 잦고 상처를 줄 수 있어요', advice: '서로 한발 물러서는 연습이 필요해요' },
  '목금': { score: 40, title: '금극목(金剋木) - 상극', description: '금이 목을 극하는 관계입니다.', strength: '서로 다른 시각으로 보완이 될 수 있어요', weakness: '금의 비판에 목이 상처받을 수 있어요', advice: '비판보다 격려가 필요한 관계입니다' },
  '목수': { score: 85, title: '수생목(水生木) - 상생', description: '수가 목을 생하는 좋은 궁합입니다.', strength: '수가 목을 키워주고 목이 수에게 방향을 줍니다', weakness: '수가 너무 많으면 목이 떠내려갈 수 있어요', advice: '적절한 거리감이 오히려 좋아요' },
  '화화': { score: 65, title: '같은 화(火) 기운', description: '둘 다 열정적이라 불꽃 튀는 관계입니다.', strength: '함께 있으면 에너지가 넘칩니다', weakness: '싸우면 불이 나고 금방 타버릴 수 있어요', advice: '열정을 건설적으로 사용하세요' },
  '화토': { score: 88, title: '화생토(火生土) - 상생', description: '화가 토를 생하는 안정적인 궁합입니다.', strength: '화의 열정이 토의 안정감을 만듭니다', weakness: '화가 식으면 토가 답답해질 수 있어요', advice: '적당한 열정을 유지하세요' },
  '화금': { score: 50, title: '화극금(火剋金) - 상극', description: '화가 금을 극하는 관계입니다.', strength: '화의 열정이 금을 변화시킬 수 있어요', weakness: '화가 과하면 금이 녹아버립니다', advice: '서로의 속도를 맞춰가세요' },
  '화수': { score: 35, title: '수극화(水剋火) - 상극', description: '수가 화를 극하는 도전적인 관계입니다.', strength: '서로 다른 매력에 끌릴 수 있어요', weakness: '근본적인 성향 차이로 갈등이 잦아요', advice: '이해하려는 노력이 많이 필요한 관계입니다' },
  '토토': { score: 75, title: '같은 토(土) 기운', description: '안정적이고 편안한 관계입니다.', strength: '서로 믿고 의지할 수 있어요', weakness: '변화가 없어 지루해질 수 있어요', advice: '가끔은 새로운 시도를 함께 해보세요' },
  '토금': { score: 87, title: '토생금(土生金) - 상생', description: '토가 금을 생하는 좋은 궁합입니다.', strength: '토의 포용력이 금을 빛나게 합니다', weakness: '토가 너무 무거우면 금이 답답해해요', advice: '금에게 자유를 주세요' },
  '토수': { score: 48, title: '토극수(土剋水) - 상극', description: '토가 수를 극하는 관계입니다.', strength: '토의 안정감이 수를 잡아줄 수 있어요', weakness: '수의 자유로움을 토가 막을 수 있어요', advice: '서로의 방식을 인정해주세요' },
  '금금': { score: 68, title: '같은 금(金) 기운', description: '날카롭고 명확한 관계입니다.', strength: '서로의 기준이 명확해 오해가 적어요', weakness: '둘 다 날카로워 상처를 줄 수 있어요', advice: '부드러운 표현을 연습하세요' },
  '금수': { score: 86, title: '금생수(金生水) - 상생', description: '금이 수를 생하는 깊은 궁합입니다.', strength: '금의 냉철함이 수의 지혜를 키웁니다', weakness: '감정 표현이 적어 서먹할 수 있어요', advice: '가끔은 따뜻한 표현을 해주세요' },
  '수수': { score: 72, title: '같은 수(水) 기운', description: '깊고 지적인 관계입니다.', strength: '정신적 교감이 깊고 대화가 잘 통해요', weakness: '둘 다 수동적이라 진전이 느릴 수 있어요', advice: '때로는 적극적으로 행동하세요' },
};

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

  // 강점 분석
  if (ohaengScore.score >= 70) strengths.push('오행이 서로 보완하는 좋은 관계입니다');
  if (cheonganScore.score >= 70) strengths.push('천간합이 있어 자연스럽게 끌리는 관계입니다');
  if (jijiScore.score >= 70) strengths.push('지지의 조화가 좋아 안정적인 관계를 유지할 수 있습니다');
  if (iljuScore.score >= 70) strengths.push('일주 궁합이 좋아 일상에서 잘 맞습니다');

  // 주의점 분석
  if (ohaengScore.score < 50) concerns.push('오행 균형이 맞지 않아 갈등이 생길 수 있습니다');
  if (jijiScore.score < 50) concerns.push('지지충이 있어 의견 충돌에 주의가 필요합니다');
  if (cheonganScore.score < 50) concerns.push('천간의 조화가 부족해 노력이 필요합니다');

  // 일간별 조언 추가
  const style1 = ILGAN_LOVE_STYLE[person1.ilgan];
  const style2 = ILGAN_LOVE_STYLE[person2.ilgan];

  strengths.push(`본인: ${style1.style}`);
  strengths.push(`상대방: ${style2.style}`);

  // 종합 요약
  let summary = '';
  if (totalScore >= 85) {
    summary = `💕 환상의 궁합입니다! (${totalScore}점)\n\n두 분은 천생연분이라 할 만큼 잘 맞습니다. 서로를 자연스럽게 이해하고 보완하는 관계예요. 함께 있으면 편안하고 행복할 거예요.`;
  } else if (totalScore >= 70) {
    summary = `💑 좋은 궁합입니다! (${totalScore}점)\n\n두 분은 서로에게 좋은 영향을 주는 관계입니다. 작은 갈등은 있을 수 있지만 쉽게 해결될 거예요. 오래 함께할 수 있는 인연입니다.`;
  } else if (totalScore >= 55) {
    summary = `🤝 무난한 궁합입니다. (${totalScore}점)\n\n두 분은 노력하면 좋은 관계를 만들 수 있어요. 서로 다른 점을 인정하고 맞춰가는 과정이 필요합니다. 대화와 이해가 중요해요.`;
  } else if (totalScore >= 40) {
    summary = `⚠️ 노력이 필요한 궁합입니다. (${totalScore}점)\n\n두 분은 성향 차이가 있어 갈등이 생길 수 있어요. 하지만 서로를 이해하려는 노력이 있다면 극복할 수 있습니다. 상대방의 입장에서 생각해보세요.`;
  } else {
    summary = `🔥 도전적인 궁합입니다. (${totalScore}점)\n\n두 분은 근본적인 성향 차이가 있어요. 끌림은 있을 수 있지만 오래 함께하려면 많은 노력이 필요합니다. 서로의 다름을 인정하는 것부터 시작하세요.`;
  }

  // 구체적 조언 추가
  summary += `\n\n【 관계 발전을 위한 조언 】\n`;
  summary += `• 본인이 주의할 점: ${style1.warning}\n`;
  summary += `• 상대방에게 필요한 것: ${style2.idealPartner}`;

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

  // 오행 조합 키 생성
  const key = o1 <= o2 ? `${o1}${o2}` : `${o2}${o1}`;
  const compatData = OHAENG_COMPAT[key] || OHAENG_COMPAT[`${o1}${o2}`] || {
    score: 60, title: '무난한 관계', description: '특별한 상생/상극이 없는 관계입니다.',
    strength: '안정적인 관계를 유지할 수 있어요', weakness: '특별한 끌림이 약할 수 있어요',
    advice: '함께하는 시간을 늘려보세요'
  };

  let score = compatData.score;
  let description = `【 ${compatData.title} 】\n${compatData.description}\n\n`;
  description += `✅ 강점: ${compatData.strength}\n`;
  description += `⚠️ 주의: ${compatData.weakness}\n`;
  description += `💡 조언: ${compatData.advice}`;

  // 오행 분포 보완 체크
  const lacking1 = Object.entries(p1.ohaeng).filter(([, v]) => v === 0).map(([k]) => k);
  const lacking2 = Object.entries(p2.ohaeng).filter(([, v]) => v === 0).map(([k]) => k);
  const complementary = lacking1.some(k => (p2.ohaeng as unknown as Record<string, number>)[k] >= 2) ||
                        lacking2.some(k => (p1.ohaeng as unknown as Record<string, number>)[k] >= 2);
  if (complementary) {
    score += 10;
    description += '\n\n🎁 보너스: 서로 부족한 오행을 보완해주는 관계입니다!';
  }

  return { score: Math.min(score, 100), description };
}

function analyzeCheonganHap(p1: SajuResult, p2: SajuResult) {
  const allCheongan1: CheonganType[] = [p1.yearPillar.cheongan, p1.monthPillar.cheongan, p1.dayPillar.cheongan, p1.hourPillar.cheongan];
  const allCheongan2: CheonganType[] = [p2.yearPillar.cheongan, p2.monthPillar.cheongan, p2.dayPillar.cheongan, p2.hourPillar.cheongan];

  const hapPairs: string[] = [];
  for (const c1 of allCheongan1) {
    for (const c2 of allCheongan2) {
      const hapInfo = CHEONGAN_HAP.find(([a, b]) => (a === c1 && b === c2) || (a === c2 && b === c1));
      if (hapInfo) {
        hapPairs.push(`${c1}-${c2}(${hapInfo[2]}으로 합)`);
      }
    }
  }

  // 일간끼리 합이 있으면 가산
  const ilganHap = CHEONGAN_HAP.find(([a, b]) =>
    (a === p1.ilgan && b === p2.ilgan) || (a === p2.ilgan && b === p1.ilgan)
  );

  let score = 50 + hapPairs.length * 10;
  if (ilganHap) score += 20;
  score = Math.min(score, 100);

  let description = '';
  if (ilganHap) {
    description = `💫 일간 천간합 발견! (${p1.ilgan}-${p2.ilgan} → ${ilganHap[2]})\n\n`;
    description += `일간끼리 천간합이 있으면 서로에게 자연스럽게 끌리는 운명적인 인연입니다.\n`;
    description += `첫 만남부터 묘한 끌림을 느꼈을 수 있어요.\n`;
    description += `함께 있으면 편안하고 자연스러운 관계가 됩니다.`;
  } else if (hapPairs.length > 0) {
    description = `천간합 ${hapPairs.length}개 발견\n`;
    description += hapPairs.map(p => `• ${p}`).join('\n');
    description += `\n\n천간합이 있으면 서로 조화를 이루는 관계입니다.`;
  } else {
    description = '천간합은 없지만 다른 요소로 보완 가능합니다.\n';
    description += '천간합이 없다고 나쁜 것은 아니에요.';
  }

  return { score, description };
}

function analyzeJijiRelation(p1: SajuResult, p2: SajuResult) {
  const allJiji1: JijiType[] = [p1.yearPillar.jiji, p1.monthPillar.jiji, p1.dayPillar.jiji, p1.hourPillar.jiji];
  const allJiji2: JijiType[] = [p2.yearPillar.jiji, p2.monthPillar.jiji, p2.dayPillar.jiji, p2.hourPillar.jiji];

  const hapPairs: string[] = [];
  const chungPairs: string[] = [];

  for (const j1 of allJiji1) {
    for (const j2 of allJiji2) {
      if (JIJI_YUKHAP.some(([a, b]) => (a === j1 && b === j2) || (a === j2 && b === j1))) {
        hapPairs.push(`${j1}-${j2}`);
      }
      if (JIJI_CHUNG.some(([a, b]) => (a === j1 && b === j2) || (a === j2 && b === j1))) {
        chungPairs.push(`${j1}-${j2}`);
      }
    }
  }

  let score = 60 + hapPairs.length * 10 - chungPairs.length * 15;
  score = Math.max(20, Math.min(score, 100));

  let description = '';
  if (hapPairs.length > 0) {
    description += `✨ 지지육합 ${hapPairs.length}개 발견\n`;
    description += hapPairs.map(p => `• ${p} (육합)`).join('\n');
    description += `\n\n지지육합은 일상에서 잘 맞는다는 뜻입니다. 생활 습관이 비슷하고 함께 있으면 편안해요.\n`;
  }
  if (chungPairs.length > 0) {
    description += `\n⚡ 지지충 ${chungPairs.length}개 발견\n`;
    description += chungPairs.map(p => `• ${p} (충)`).join('\n');
    description += `\n\n지지충은 의견 충돌이 있을 수 있다는 뜻입니다. 하지만 적절한 긴장감은 관계에 활력이 되기도 해요.\n`;
    description += `서로 다른 관점을 존중하면 오히려 성장하는 관계가 됩니다.`;
  }
  if (hapPairs.length === 0 && chungPairs.length === 0) {
    description = '지지 관계는 무난한 편입니다.\n특별한 합이나 충이 없어 안정적인 관계를 유지할 수 있어요.';
  }
  if (hapPairs.length > 0 && chungPairs.length > 0) {
    description += `\n\n🎭 합과 충이 동시에 있는 극적인 관계입니다!\n잘 맞을 때는 최고이고, 안 맞을 때는 갈등이 심해요. 감정 기복이 있는 드라마틱한 연애가 될 수 있습니다.`;
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
    score = 95;
    description = `💑 일지육합 - 최고의 궁합!\n\n`;
    description += `일지(${dayJiji1}-${dayJiji2})가 육합입니다.\n`;
    description += `일지는 배우자 자리로, 육합이면 결혼 후에도 매우 잘 맞습니다.\n`;
    description += `일상생활에서 호흡이 잘 맞고, 함께 있으면 편안해요.\n`;
    description += `장기적인 관계에 매우 유리한 궁합입니다.`;
  }
  // 일지 충
  else if (JIJI_CHUNG.some(([a, b]) => (a === dayJiji1 && b === dayJiji2) || (a === dayJiji2 && b === dayJiji1))) {
    score = 35;
    description = `⚡ 일지충 - 주의가 필요한 궁합\n\n`;
    description += `일지(${dayJiji1}-${dayJiji2})가 충입니다.\n`;
    description += `일지는 배우자 자리로, 충이면 생활 습관이나 가치관에서 차이가 있을 수 있어요.\n`;
    description += `하지만 충은 '나쁜 것'이 아니라 '다른 것'입니다.\n`;
    description += `서로의 다름을 인정하고 맞춰가면 오히려 서로를 성장시키는 관계가 됩니다.`;
  }
  // 일간 합
  else if (CHEONGAN_HAP.some(([a, b]) => (a === p1.ilgan && b === p2.ilgan) || (a === p2.ilgan && b === p1.ilgan))) {
    score = 88;
    description = `💫 일간합 - 운명적인 궁합\n\n`;
    description += `일간(${p1.ilgan}-${p2.ilgan})이 천간합입니다.\n`;
    description += `일간은 '나 자신'을 나타내므로, 합이면 서로에게 자연스럽게 끌립니다.\n`;
    description += `첫눈에 반하거나 묘한 친밀감을 느꼈을 수 있어요.\n`;
    description += `함께 있으면 마음이 편안해지는 관계입니다.`;
  } else {
    description = `일주 관계는 무난한 편입니다.\n\n`;
    description += `특별한 합이나 충이 없어 안정적인 관계를 유지할 수 있어요.\n`;
    description += `다른 요소들의 조화가 더 중요한 경우입니다.`;
  }

  return { score, description };
}
