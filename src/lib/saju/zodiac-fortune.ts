import type { JijiType, OhaengType } from './types';
import { JIJI, JIJI_ANIMAL, JIJI_OHAENG, OHAENG_SANGSAENG, OHAENG_SANGGEUK } from './constants';

export interface ZodiacFortuneResult {
  year: number;
  yearAnimal: string; // 그 해의 띠
  zodiac: JijiType;
  animal: string;
  ohaeng: OhaengType;
  overallScore: number;
  ranking: number;
  summary: string;
  categories: {
    wealth: { score: number; text: string };
    love: { score: number; text: string };
    career: { score: number; text: string };
    health: { score: number; text: string };
  };
  monthlyHighlight: { month: number; type: 'best' | 'caution' }[];
  luckyElements: {
    color: string;
    number: string;
    direction: string;
    partner: string; // 잘 맞는 띠
  };
  advice: string;
  caution: string;
}

// 2026년 병오년(丙午年) - 붉은 말띠
const YEAR_2026_INFO = {
  year: 2026,
  cheongan: '병',
  jiji: '오' as JijiType,
  animal: '말',
  ohaeng: '화' as OhaengType,
};

// 띠별 2026년 운세 상세 데이터
const ZODIAC_FORTUNE_2026: Record<JijiType, {
  ranking: number;
  summary: string;
  wealth: { score: number; text: string };
  love: { score: number; text: string };
  career: { score: number; text: string };
  health: { score: number; text: string };
  bestMonths: number[];
  cautionMonths: number[];
  advice: string;
  caution: string;
}> = {
  '자': { // 쥐띠 - 자오충
    ranking: 11,
    summary: '2026년은 변화가 많은 해입니다. 말띠 해와 쥐띠는 충(沖)의 관계로 큰 변동이 예상됩니다. 하지만 변화 속에서 기회를 찾을 수 있어요. 이직, 이사 등 새로운 시작이 있을 수 있습니다.',
    wealth: { score: 55, text: '재물의 변동이 있습니다. 예상치 못한 지출이 있을 수 있으니 저축을 미리 해두세요. 하반기에 안정을 찾을 수 있습니다.' },
    love: { score: 50, text: '연애 관계에 변화가 올 수 있어요. 싱글이라면 새로운 만남이, 연인이 있다면 관계의 전환점이 될 수 있습니다.' },
    career: { score: 52, text: '직장에서 큰 변화가 예상됩니다. 이직이나 부서 이동이 있을 수 있어요. 변화를 두려워하지 말고 기회로 삼으세요.' },
    health: { score: 48, text: '스트레스로 인한 건강 문제에 주의하세요. 충분한 휴식과 운동이 필요합니다.' },
    bestMonths: [3, 8, 11],
    cautionMonths: [1, 6, 7],
    advice: '변화를 두려워하지 마세요. 준비된 자에게는 기회가 됩니다. 유연하게 대처하세요.',
    caution: '급한 결정은 피하고, 큰 투자나 계약은 신중하게 검토하세요.',
  },
  '축': { // 소띠 - 오미합으로 좋음
    ranking: 3,
    summary: '2026년은 소띠에게 안정과 발전의 해입니다. 말띠와 육합 관계(오미합 근접)로 좋은 기운이 흐릅니다. 꾸준히 노력해온 일들이 결실을 맺는 해예요.',
    wealth: { score: 78, text: '재물운이 좋습니다. 안정적인 수입 증가와 함께 부수입의 기회도 있어요. 장기 투자에 좋은 시기입니다.' },
    love: { score: 75, text: '연애운이 좋은 편입니다. 진지한 만남이 이어질 수 있고, 결혼을 결심하는 커플도 많겠어요.' },
    career: { score: 80, text: '직장에서 인정받고 승진의 기회가 있습니다. 새로운 프로젝트를 맡게 될 수 있어요.' },
    health: { score: 72, text: '전반적으로 건강한 한 해입니다. 다만 과로에 주의하고 적당한 휴식을 취하세요.' },
    bestMonths: [2, 6, 9, 12],
    cautionMonths: [4, 10],
    advice: '기회가 왔을 때 과감히 잡으세요. 노력에 대한 보상이 따르는 해입니다.',
    caution: '성공에 자만하지 말고 겸손을 유지하세요.',
  },
  '인': { // 호랑이띠 - 인오술 삼합
    ranking: 1,
    summary: '2026년은 호랑이띠에게 최고의 해입니다! 말띠와 삼합(인오술)을 이루어 모든 면에서 좋은 기운이 넘칩니다. 새로운 시작, 큰 도전에 최적의 시기예요.',
    wealth: { score: 92, text: '재물운이 매우 좋습니다! 투자, 사업 확장에 좋은 시기입니다. 예상치 못한 횡재수도 있어요.' },
    love: { score: 88, text: '연애운이 최고입니다. 운명적인 만남이 있을 수 있고, 연인과의 관계가 더욱 깊어집니다.' },
    career: { score: 90, text: '승진, 이직 등 커리어에서 큰 발전이 있습니다. 리더십을 발휘할 기회가 많아요.' },
    health: { score: 85, text: '에너지가 넘치는 한 해입니다. 활동적으로 움직이기 좋아요.' },
    bestMonths: [1, 5, 6, 9, 10],
    cautionMonths: [8],
    advice: '적극적으로 도전하세요! 올해 시작한 일은 좋은 결과를 맺을 확률이 높습니다.',
    caution: '너무 과욕을 부리지 마세요. 건강 관리에도 신경 쓰세요.',
  },
  '묘': { // 토끼띠
    ranking: 7,
    summary: '2026년은 토끼띠에게 무난한 한 해입니다. 큰 변화보다는 안정을 추구하는 것이 좋아요. 내실을 다지는 시기로 삼으세요.',
    wealth: { score: 62, text: '재물운은 평이합니다. 큰 투자보다는 저축에 집중하세요. 하반기에 기회가 올 수 있어요.' },
    love: { score: 65, text: '연애운은 무난합니다. 기존 관계를 잘 유지하는 것이 중요해요.' },
    career: { score: 60, text: '직장에서 묵묵히 자기 일을 하면 인정받을 수 있어요. 급한 변화는 피하세요.' },
    health: { score: 68, text: '큰 문제 없이 건강한 한 해입니다. 적당한 운동을 유지하세요.' },
    bestMonths: [3, 7, 11],
    cautionMonths: [9, 12],
    advice: '조급해하지 말고 차근차근 준비하세요. 내년을 위한 발판을 다지는 해입니다.',
    caution: '주변의 말에 흔들리지 말고 소신을 지키세요.',
  },
  '진': { // 용띠 - 신자진 수국
    ranking: 5,
    summary: '2026년은 용띠에게 발전의 기회가 있는 해입니다. 용의 기운과 말의 기운이 만나 활동적인 한 해가 됩니다.',
    wealth: { score: 70, text: '재물운이 괜찮습니다. 적극적인 투자보다는 안정적인 수입 증대에 집중하세요.' },
    love: { score: 72, text: '연애운이 좋은 편입니다. 새로운 만남의 기회가 있어요.' },
    career: { score: 75, text: '커리어에서 인정받을 기회가 있습니다. 자신의 능력을 어필하세요.' },
    health: { score: 70, text: '활동량이 많아지니 체력 관리에 신경 쓰세요.' },
    bestMonths: [4, 8, 12],
    cautionMonths: [6, 10],
    advice: '기회가 보이면 망설이지 말고 행동하세요. 준비된 자에게 행운이 옵니다.',
    caution: '자만심을 경계하고 겸손을 유지하세요.',
  },
  '사': { // 뱀띠 - 사유축 금국, 사오 지합
    ranking: 4,
    summary: '2026년은 뱀띠에게 좋은 해입니다. 말띠와 지합 관계로 좋은 기운이 흐릅니다. 특히 대인관계와 사업에서 좋은 성과가 예상됩니다.',
    wealth: { score: 80, text: '재물운이 좋습니다. 사업 확장이나 투자에 유리한 시기예요.' },
    love: { score: 78, text: '연애운이 좋은 편입니다. 매력이 빛나는 한 해가 될 거예요.' },
    career: { score: 82, text: '직장에서 능력을 인정받고 승진의 기회가 있어요.' },
    health: { score: 75, text: '전반적으로 건강하지만 과로에 주의하세요.' },
    bestMonths: [2, 5, 9, 11],
    cautionMonths: [7, 8],
    advice: '인맥을 적극 활용하세요. 좋은 조력자를 만날 수 있어요.',
    caution: '비밀을 잘 지키세요. 말조심이 필요한 해입니다.',
  },
  '오': { // 말띠 - 본명년
    ranking: 6,
    summary: '2026년은 말띠에게 본명년입니다. 자신의 띠 해에는 큰 변화가 있을 수 있어요. 새로운 시작과 도전의 해이지만, 신중함도 필요합니다.',
    wealth: { score: 65, text: '재물의 변동이 있습니다. 큰 투자는 피하고 안정적인 재테크를 하세요.' },
    love: { score: 68, text: '연애에 변화가 올 수 있어요. 새로운 인연이 나타날 수 있습니다.' },
    career: { score: 70, text: '커리어에서 전환점이 될 수 있어요. 이직이나 새로운 도전을 고려해볼 만합니다.' },
    health: { score: 60, text: '건강에 특히 주의가 필요한 해입니다. 정기 검진을 받으세요.' },
    bestMonths: [3, 6, 10],
    cautionMonths: [1, 5, 9],
    advice: '변화를 두려워하지 마세요. 자기 자신을 믿고 앞으로 나아가세요.',
    caution: '빨간색 소품을 지니면 액막이가 됩니다. 무리한 일정은 피하세요.',
  },
  '미': { // 양띠 - 오미합
    ranking: 2,
    summary: '2026년은 양띠에게 매우 좋은 해입니다! 말띠와 육합(오미합) 관계로 모든 면에서 좋은 기운이 흐릅니다. 원하던 일이 이루어지는 해예요.',
    wealth: { score: 88, text: '재물운이 매우 좋습니다! 투자, 사업에서 좋은 성과를 얻을 수 있어요.' },
    love: { score: 90, text: '연애운이 최고입니다. 결혼 적령기라면 좋은 인연을 만날 수 있어요.' },
    career: { score: 85, text: '직장에서 큰 성과를 거둘 수 있어요. 리더십을 발휘할 기회가 많습니다.' },
    health: { score: 80, text: '건강하고 활기찬 한 해입니다.' },
    bestMonths: [1, 4, 6, 8, 12],
    cautionMonths: [5],
    advice: '적극적으로 행동하세요. 올해 하는 일은 좋은 결과를 맺을 확률이 높습니다.',
    caution: '좋은 운에 너무 의지하지 말고 꾸준한 노력도 함께하세요.',
  },
  '신': { // 원숭이띠
    ranking: 9,
    summary: '2026년은 원숭이띠에게 조심해야 할 해입니다. 큰 일보다는 현상 유지에 집중하세요. 인내심이 필요한 시기입니다.',
    wealth: { score: 50, text: '재물운에 주의가 필요해요. 투자는 보수적으로 하고 저축에 집중하세요.' },
    love: { score: 55, text: '연애에서 오해가 생길 수 있어요. 소통에 신경 쓰세요.' },
    career: { score: 52, text: '직장에서 인내심이 필요한 해입니다. 묵묵히 자기 일을 하세요.' },
    health: { score: 58, text: '스트레스 관리가 중요합니다. 규칙적인 생활을 유지하세요.' },
    bestMonths: [2, 7, 11],
    cautionMonths: [1, 5, 9],
    advice: '인내심을 갖고 기다리세요. 내년을 위한 준비 기간으로 삼으세요.',
    caution: '급한 결정은 피하고, 모든 일에 신중하게 접근하세요.',
  },
  '유': { // 닭띠 - 유축반합금
    ranking: 8,
    summary: '2026년은 닭띠에게 평범한 한 해입니다. 큰 변화보다는 안정을 추구하는 것이 좋아요. 실력을 다지는 시기로 삼으세요.',
    wealth: { score: 58, text: '재물운은 보통입니다. 무리한 투자는 피하고 착실히 모으세요.' },
    love: { score: 60, text: '연애운은 무난합니다. 기존 관계에 충실하세요.' },
    career: { score: 62, text: '직장에서 특별한 일은 없지만 착실히 일하면 인정받아요.' },
    health: { score: 65, text: '건강은 무난하지만 호흡기 건강에 신경 쓰세요.' },
    bestMonths: [3, 8, 12],
    cautionMonths: [4, 10],
    advice: '기본에 충실하세요. 작은 일도 성실히 하면 큰 결과로 이어집니다.',
    caution: '남의 일에 지나치게 간섭하지 마세요.',
  },
  '술': { // 개띠 - 인오술 삼합
    ranking: 2,
    summary: '2026년은 개띠에게 최고의 해 중 하나입니다! 말띠와 삼합(인오술)을 이루어 좋은 기운이 넘칩니다. 큰 도전을 해볼 만한 시기예요.',
    wealth: { score: 85, text: '재물운이 매우 좋습니다! 투자나 사업에서 좋은 성과가 기대됩니다.' },
    love: { score: 82, text: '연애운이 좋습니다. 좋은 인연을 만나거나 관계가 깊어질 수 있어요.' },
    career: { score: 88, text: '직장에서 크게 성장하는 해입니다. 승진이나 새로운 기회가 있어요.' },
    health: { score: 78, text: '활력이 넘치는 한 해입니다. 적극적으로 활동하세요.' },
    bestMonths: [2, 5, 6, 9, 10],
    cautionMonths: [4, 8],
    advice: '도전하세요! 올해 시작한 일은 성공 확률이 높습니다.',
    caution: '성공에 자만하지 말고 겸손을 유지하세요.',
  },
  '해': { // 돼지띠 - 해수 vs 오화
    ranking: 10,
    summary: '2026년은 돼지띠에게 도전적인 해입니다. 말띠와 상극 관계로 어려움이 예상되지만, 극복하면 더 강해질 수 있어요.',
    wealth: { score: 52, text: '재물운에 주의가 필요해요. 큰 투자는 피하고 저축에 집중하세요.' },
    love: { score: 55, text: '연애에서 갈등이 있을 수 있어요. 상대방을 이해하려 노력하세요.' },
    career: { score: 50, text: '직장에서 어려움이 있을 수 있어요. 인내심을 갖고 버티세요.' },
    health: { score: 55, text: '건강에 신경 쓰세요. 특히 심혈관 건강에 주의가 필요합니다.' },
    bestMonths: [3, 7, 11],
    cautionMonths: [1, 5, 6, 9],
    advice: '어려움을 성장의 기회로 삼으세요. 힘든 시기를 버티면 강해집니다.',
    caution: '무리하지 말고 건강 관리에 최선을 다하세요.',
  },
};

// 오행별 행운 요소
const LUCKY_BY_OHAENG: Record<OhaengType, { color: string; direction: string }> = {
  '목': { color: '초록색, 청색', direction: '동쪽' },
  '화': { color: '빨간색, 보라색', direction: '남쪽' },
  '토': { color: '노란색, 갈색', direction: '중앙' },
  '금': { color: '흰색, 금색', direction: '서쪽' },
  '수': { color: '검은색, 파란색', direction: '북쪽' },
};

// 잘 맞는 띠 (삼합 기준)
const GOOD_MATCH: Record<JijiType, string> = {
  '자': '용띠, 원숭이띠',
  '축': '뱀띠, 닭띠',
  '인': '말띠, 개띠',
  '묘': '양띠, 돼지띠',
  '진': '쥐띠, 원숭이띠',
  '사': '소띠, 닭띠',
  '오': '호랑이띠, 개띠',
  '미': '토끼띠, 돼지띠',
  '신': '쥐띠, 용띠',
  '유': '소띠, 뱀띠',
  '술': '호랑이띠, 말띠',
  '해': '토끼띠, 양띠',
};

/**
 * 띠별 2026년 운세
 */
export function getZodiacFortune2026(birthYear: number): ZodiacFortuneResult {
  const jijiIdx = (birthYear - 4) % 12;
  const zodiac = JIJI[jijiIdx];
  const animal = JIJI_ANIMAL[jijiIdx];
  const ohaeng = JIJI_OHAENG[zodiac];

  const fortune = ZODIAC_FORTUNE_2026[zodiac];

  // 행운 요소 계산 (부족한 오행 보완)
  const needOhaeng = OHAENG_SANGSAENG.find(([a]) => a === ohaeng)?.[1] || ohaeng;
  const lucky = LUCKY_BY_OHAENG[needOhaeng];

  const overallScore = Math.round(
    (fortune.wealth.score + fortune.love.score + fortune.career.score + fortune.health.score) / 4
  );

  return {
    year: 2026,
    yearAnimal: '말(붉은 말)',
    zodiac,
    animal,
    ohaeng,
    overallScore,
    ranking: fortune.ranking,
    summary: fortune.summary,
    categories: {
      wealth: fortune.wealth,
      love: fortune.love,
      career: fortune.career,
      health: fortune.health,
    },
    monthlyHighlight: [
      ...fortune.bestMonths.map(m => ({ month: m, type: 'best' as const })),
      ...fortune.cautionMonths.map(m => ({ month: m, type: 'caution' as const })),
    ].sort((a, b) => a.month - b.month),
    luckyElements: {
      color: lucky.color,
      number: `${(birthYear % 9) + 1}, ${((birthYear + 4) % 9) + 1}`,
      direction: lucky.direction,
      partner: GOOD_MATCH[zodiac],
    },
    advice: fortune.advice,
    caution: fortune.caution,
  };
}

/**
 * 12띠 전체 순위
 */
export function getAllZodiacRanking2026(): { zodiac: JijiType; animal: string; ranking: number; score: number }[] {
  return JIJI.map((zodiac, idx) => {
    const fortune = ZODIAC_FORTUNE_2026[zodiac];
    const score = Math.round(
      (fortune.wealth.score + fortune.love.score + fortune.career.score + fortune.health.score) / 4
    );
    return {
      zodiac,
      animal: JIJI_ANIMAL[idx],
      ranking: fortune.ranking,
      score,
    };
  }).sort((a, b) => a.ranking - b.ranking);
}
