import type { JijiType, CheonganType, SajuResult } from './types';

// 신살 데이터
interface SinsalData {
  name: string;
  hanja: string;
  type: 'good' | 'bad' | 'neutral';
  meaning: string;
  effect: string[];
  advice: string;
}

const SINSAL_DATA: Record<string, SinsalData> = {
  '도화살': {
    name: '도화살(桃花殺)',
    hanja: '桃花殺',
    type: 'neutral',
    meaning: '이성에게 매력을 발산하는 살',
    effect: [
      '이성에게 인기가 많고 매력적입니다',
      '예술적 감각과 미적 센스가 뛰어납니다',
      '연애운이 좋고 로맨틱합니다',
      '바람기로 이어질 수 있어 주의',
      '연예계나 서비스업에 유리합니다',
    ],
    advice: '매력을 긍정적으로 활용하세요. 바람기보다는 예술이나 대인관계에 활용하면 좋습니다.',
  },
  '역마살': {
    name: '역마살(驛馬殺)',
    hanja: '驛馬殺',
    type: 'neutral',
    meaning: '움직임이 많고 여행/이동이 잦은 살',
    effect: [
      '한 곳에 정착하기 어렵습니다',
      '해외 운이 있고 이동이 잦습니다',
      '활동적이고 바쁜 생활을 합니다',
      '무역, 여행, 운송 관련 직업에 유리',
      '변화를 좋아하고 적응력이 좋습니다',
    ],
    advice: '안정보다 변화를 추구하세요. 해외 취업이나 출장이 많은 직업이 잘 맞습니다.',
  },
  '화개살': {
    name: '화개살(華蓋殺)',
    hanja: '華蓋殺',
    type: 'neutral',
    meaning: '종교, 예술, 철학에 관심이 많은 살',
    effect: [
      '영적인 것에 관심이 많습니다',
      '종교나 철학에 심취할 수 있습니다',
      '예술적 재능이 있습니다',
      '고독을 즐기는 경향이 있습니다',
      '혼자 있는 시간이 필요합니다',
    ],
    advice: '명상, 종교, 예술 활동을 하면 마음의 평화를 얻습니다. 고독을 두려워하지 마세요.',
  },
  '귀문관살': {
    name: '귀문관살(鬼門關殺)',
    hanja: '鬼門關殺',
    type: 'bad',
    meaning: '정신적 고통이나 질병에 주의해야 하는 살',
    effect: [
      '정신적 스트레스에 취약합니다',
      '우울증이나 불안에 주의',
      '영적인 감각이 예민합니다',
      '깊은 사고력을 가질 수 있습니다',
      '심리 상담이 도움이 됩니다',
    ],
    advice: '정신 건강 관리가 중요합니다. 규칙적인 생활과 운동, 명상이 도움이 됩니다.',
  },
  '천을귀인': {
    name: '천을귀인(天乙貴人)',
    hanja: '天乙貴人',
    type: 'good',
    meaning: '하늘이 도와주는 최고의 귀인살',
    effect: [
      '어려울 때 귀인이 나타납니다',
      '위기를 잘 넘기고 복이 있습니다',
      '사람들의 도움을 많이 받습니다',
      '품위가 있고 존경받습니다',
      '흉살을 막아주는 역할을 합니다',
    ],
    advice: '귀인의 도움에 감사하고, 본인도 다른 사람의 귀인이 되어주세요.',
  },
  '문창귀인': {
    name: '문창귀인(文昌貴人)',
    hanja: '文昌貴人',
    type: 'good',
    meaning: '학문과 시험에 유리한 살',
    effect: [
      '학업운이 좋고 공부를 잘합니다',
      '시험운이 좋습니다',
      '글 쓰는 재능이 있습니다',
      '학력이나 자격증 취득에 유리',
      '언어 능력이 뛰어납니다',
    ],
    advice: '학업이나 자격증 시험에 도전하세요. 글쓰기나 언어 관련 일이 잘 맞습니다.',
  },
  '월덕귀인': {
    name: '월덕귀인(月德貴人)',
    hanja: '月德貴人',
    type: 'good',
    meaning: '덕이 있어 액을 막아주는 살',
    effect: [
      '인덕이 있고 남을 돕습니다',
      '재앙을 피하고 복을 받습니다',
      '온화하고 덕스러운 성품',
      '주변의 존경을 받습니다',
      '어려운 일이 해결됩니다',
    ],
    advice: '덕을 베풀면 더 많은 복이 옵니다. 봉사 활동이 좋습니다.',
  },
  '양인살': {
    name: '양인살(羊刃殺)',
    hanja: '羊刃殺',
    type: 'bad',
    meaning: '날카롭고 위험한 기운의 살',
    effect: [
      '성격이 급하고 과격할 수 있습니다',
      '칼이나 날카로운 것에 다칠 수 있습니다',
      '수술수가 있을 수 있습니다',
      '승부욕이 강합니다',
      '무예나 의료 분야에 적합',
    ],
    advice: '성격 조절이 필요합니다. 위험한 상황을 피하고 안전에 주의하세요.',
  },
  '백호대살': {
    name: '백호대살(白虎大殺)',
    hanja: '白虎大殺',
    type: 'bad',
    meaning: '혈광지재, 사고에 주의해야 하는 살',
    effect: [
      '사고나 부상에 주의가 필요합니다',
      '피를 보는 일이 생길 수 있습니다',
      '수술이나 시술이 있을 수 있습니다',
      '교통사고에 특히 주의',
      '군인, 의사 등에게는 오히려 좋음',
    ],
    advice: '위험한 활동을 피하고 안전 운전하세요. 정기 건강검진을 권합니다.',
  },
  '천라지망': {
    name: '천라지망(天羅地網)',
    hanja: '天羅地網',
    type: 'bad',
    meaning: '하늘과 땅의 그물에 걸린 것처럼 막히는 살',
    effect: [
      '일이 막히고 답답한 상황이 생깁니다',
      '관재구설에 주의가 필요합니다',
      '법적 문제에 휘말릴 수 있습니다',
      '진퇴양난의 상황이 올 수 있습니다',
      '인내심으로 극복해야 합니다',
    ],
    advice: '급하게 결정하지 말고 때를 기다리세요. 법적 문제는 전문가와 상담하세요.',
  },
  '삼재': {
    name: '삼재(三災)',
    hanja: '三災',
    type: 'bad',
    meaning: '3년간 조심해야 하는 재앙의 시기',
    effect: [
      '3년간 재물, 건강, 대인관계에 주의',
      '새로운 일 시작을 피하는 것이 좋습니다',
      '이사나 큰 변화를 삼가세요',
      '조심하면 무사히 지나갑니다',
      '구설수에 주의하세요',
    ],
    advice: '삼재 기간에는 현상 유지가 최선입니다. 큰 결정은 미루세요.',
  },
  '공망': {
    name: '공망(空亡)',
    hanja: '空亡',
    type: 'bad',
    meaning: '비어있어 허망한 기운',
    effect: [
      '노력해도 결과가 안 나올 수 있습니다',
      '헛수고를 하게 될 수 있습니다',
      '정신적 공허함을 느낄 수 있습니다',
      '영적 수행에는 오히려 좋습니다',
      '물질보다 정신적 가치 추구',
    ],
    advice: '물질적 욕심을 내려놓으세요. 정신 수양이나 봉사에 집중하면 좋습니다.',
  },
};

// 도화살: 일지 기준 자오묘유
const DOHWA_MAP: Record<JijiType, JijiType> = {
  '인': '묘', '오': '묘', '술': '묘',  // 인오술 → 묘
  '신': '유', '자': '유', '진': '유',  // 신자진 → 유
  '사': '오', '유': '오', '축': '오',  // 사유축 → 오
  '해': '자', '묘': '자', '미': '자',  // 해묘미 → 자
};

// 역마살: 일지 기준
const YEOKMA_MAP: Record<JijiType, JijiType> = {
  '인': '신', '오': '신', '술': '신',
  '신': '인', '자': '인', '진': '인',
  '사': '해', '유': '해', '축': '해',
  '해': '사', '묘': '사', '미': '사',
};

// 화개살: 일지 기준
const HWAGAE_MAP: Record<JijiType, JijiType> = {
  '인': '술', '오': '술', '술': '술',
  '신': '진', '자': '진', '진': '진',
  '사': '축', '유': '축', '축': '축',
  '해': '미', '묘': '미', '미': '미',
};

// 천을귀인: 일간 기준
const CHEONEUL_MAP: Record<CheonganType, JijiType[]> = {
  '갑': ['축', '미'], '을': ['자', '신'],
  '병': ['해', '유'], '정': ['해', '유'],
  '무': ['축', '미'], '기': ['자', '신'],
  '경': ['축', '미'], '신': ['인', '오'],
  '임': ['묘', '사'], '계': ['묘', '사'],
};

// 문창귀인: 일간 기준
const MUNCHANG_MAP: Record<CheonganType, JijiType> = {
  '갑': '사', '을': '오', '병': '신', '정': '유',
  '무': '신', '기': '유', '경': '해', '신': '자',
  '임': '인', '계': '묘',
};

// 양인살: 일간 기준
const YANGIN_MAP: Record<CheonganType, JijiType> = {
  '갑': '묘', '을': '진', '병': '오', '정': '미',
  '무': '오', '기': '미', '경': '유', '신': '술',
  '임': '자', '계': '축',
};

// 삼재 띠
const SAMJAE_MAP: Record<JijiType, JijiType[]> = {
  '신': ['인', '묘', '진'], '자': ['인', '묘', '진'], '진': ['인', '묘', '진'],
  '인': ['신', '유', '술'], '오': ['신', '유', '술'], '술': ['신', '유', '술'],
  '해': ['사', '오', '미'], '묘': ['사', '오', '미'], '미': ['사', '오', '미'],
  '사': ['해', '자', '축'], '유': ['해', '자', '축'], '축': ['해', '자', '축'],
};

export interface SinsalResult {
  name: string;
  data: SinsalData;
  location: string; // 어디에서 발견되었는지
}

export interface SinsalAnalysis {
  goodSinsal: SinsalResult[];
  badSinsal: SinsalResult[];
  neutralSinsal: SinsalResult[];
  hasSamjae: boolean;
  samjaeYears?: number[];
  analysis: string;
}

/**
 * 신살 분석
 */
export function analyzeSinsal(saju: SajuResult, currentYear?: number): SinsalAnalysis {
  const year = currentYear || new Date().getFullYear();
  const goodSinsal: SinsalResult[] = [];
  const badSinsal: SinsalResult[] = [];
  const neutralSinsal: SinsalResult[] = [];

  const allJiji: { jiji: JijiType; name: string }[] = [
    { jiji: saju.yearPillar.jiji, name: '년지' },
    { jiji: saju.monthPillar.jiji, name: '월지' },
    { jiji: saju.dayPillar.jiji, name: '일지' },
    { jiji: saju.hourPillar.jiji, name: '시지' },
  ];

  const dayJiji = saju.dayPillar.jiji;
  const ilgan = saju.ilgan;

  // 도화살 검사
  const dohwaTarget = DOHWA_MAP[dayJiji];
  allJiji.forEach(({ jiji, name }) => {
    if (jiji === dohwaTarget) {
      neutralSinsal.push({
        name: '도화살',
        data: SINSAL_DATA['도화살'],
        location: `${name}(${jiji})`,
      });
    }
  });

  // 역마살 검사
  const yeokmaTarget = YEOKMA_MAP[dayJiji];
  allJiji.forEach(({ jiji, name }) => {
    if (jiji === yeokmaTarget) {
      neutralSinsal.push({
        name: '역마살',
        data: SINSAL_DATA['역마살'],
        location: `${name}(${jiji})`,
      });
    }
  });

  // 화개살 검사
  const hwagaeTarget = HWAGAE_MAP[dayJiji];
  allJiji.forEach(({ jiji, name }) => {
    if (jiji === hwagaeTarget) {
      neutralSinsal.push({
        name: '화개살',
        data: SINSAL_DATA['화개살'],
        location: `${name}(${jiji})`,
      });
    }
  });

  // 천을귀인 검사
  const cheoneulTargets = CHEONEUL_MAP[ilgan];
  allJiji.forEach(({ jiji, name }) => {
    if (cheoneulTargets.includes(jiji)) {
      goodSinsal.push({
        name: '천을귀인',
        data: SINSAL_DATA['천을귀인'],
        location: `${name}(${jiji})`,
      });
    }
  });

  // 문창귀인 검사
  const munchangTarget = MUNCHANG_MAP[ilgan];
  allJiji.forEach(({ jiji, name }) => {
    if (jiji === munchangTarget) {
      goodSinsal.push({
        name: '문창귀인',
        data: SINSAL_DATA['문창귀인'],
        location: `${name}(${jiji})`,
      });
    }
  });

  // 양인살 검사
  const yanginTarget = YANGIN_MAP[ilgan];
  allJiji.forEach(({ jiji, name }) => {
    if (jiji === yanginTarget) {
      badSinsal.push({
        name: '양인살',
        data: SINSAL_DATA['양인살'],
        location: `${name}(${jiji})`,
      });
    }
  });

  // 삼재 검사
  const yearJiji = saju.yearPillar.jiji;
  const samjaeJiji = SAMJAE_MAP[yearJiji];
  const samjaeYears: number[] = [];
  let hasSamjae = false;

  // 현재 연도부터 10년간 삼재 확인
  for (let y = year; y < year + 12; y++) {
    const yearIdx = (y - 4) % 12;
    const jiji: JijiType = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'][yearIdx] as JijiType;
    if (samjaeJiji.includes(jiji)) {
      samjaeYears.push(y);
      if (y === year) hasSamjae = true;
    }
  }

  // 분석 텍스트 생성
  let analysis = `═══════════════════════════════════\n`;
  analysis += `⚡ 신살(神殺) 분석\n`;
  analysis += `═══════════════════════════════════\n\n`;

  if (goodSinsal.length > 0) {
    analysis += `【 길신(吉神) - 좋은 신살 】\n`;
    goodSinsal.forEach(s => {
      analysis += `\n✨ ${s.data.name} (${s.location})\n`;
      analysis += `   ${s.data.meaning}\n`;
      s.data.effect.forEach(e => {
        analysis += `   • ${e}\n`;
      });
      analysis += `   💡 ${s.data.advice}\n`;
    });
    analysis += `\n`;
  }

  if (neutralSinsal.length > 0) {
    analysis += `【 중성 신살 - 양면성이 있는 살 】\n`;
    neutralSinsal.forEach(s => {
      analysis += `\n🔮 ${s.data.name} (${s.location})\n`;
      analysis += `   ${s.data.meaning}\n`;
      s.data.effect.forEach(e => {
        analysis += `   • ${e}\n`;
      });
      analysis += `   💡 ${s.data.advice}\n`;
    });
    analysis += `\n`;
  }

  if (badSinsal.length > 0) {
    analysis += `【 흉신(凶神) - 주의가 필요한 살 】\n`;
    badSinsal.forEach(s => {
      analysis += `\n⚠️ ${s.data.name} (${s.location})\n`;
      analysis += `   ${s.data.meaning}\n`;
      s.data.effect.forEach(e => {
        analysis += `   • ${e}\n`;
      });
      analysis += `   💡 ${s.data.advice}\n`;
    });
    analysis += `\n`;
  }

  if (goodSinsal.length === 0 && neutralSinsal.length === 0 && badSinsal.length === 0) {
    analysis += `특별히 두드러진 신살이 없습니다.\n`;
    analysis += `평탄하고 무난한 사주로 볼 수 있습니다.\n\n`;
  }

  // 삼재 정보
  analysis += `【 삼재(三災) 정보 】\n`;
  analysis += `${yearJiji}띠의 삼재 기간: ${samjaeYears.slice(0, 3).join('년, ')}년\n`;
  if (hasSamjae) {
    analysis += `⚠️ 현재 삼재 기간 중입니다!\n`;
    analysis += `${SINSAL_DATA['삼재'].advice}\n`;
  } else {
    const nextSamjae = samjaeYears[0];
    analysis += `다음 삼재 시작: ${nextSamjae}년\n`;
  }

  analysis += `\n`;
  analysis += `※ 신살은 참고용이며, 좋은 마음가짐과 노력이 더 중요합니다.\n`;
  analysis += `※ 길신이 있으면 좋지만, 흉신이 있다고 걱정할 필요 없습니다.\n`;

  return {
    goodSinsal,
    badSinsal,
    neutralSinsal,
    hasSamjae,
    samjaeYears: samjaeYears.slice(0, 6),
    analysis,
  };
}
