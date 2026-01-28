import type { CheonganType, JijiType, OhaengType, SajuResult, SibsinType, Pillar } from './types';
import { CHEONGAN_OHAENG, JIJI_OHAENG, CHEONGAN_YINYANG, JIJI_YINYANG, JIJANGGAN } from './constants';

// 십신 데이터
const SIBSIN_DATA: Record<SibsinType, {
  name: string;
  hanja: string;
  meaning: string;
  positive: string[];
  negative: string[];
  career: string[];
  relationship: string;
  health: string;
}> = {
  '비견': {
    name: '비견(比肩)',
    hanja: '比肩',
    meaning: '나와 같은 오행, 같은 음양. 어깨를 나란히 하는 형제, 동료',
    positive: [
      '독립심이 강하고 자존심이 있습니다',
      '경쟁심이 있어 발전의 동력이 됩니다',
      '자기 주관이 뚜렷하고 소신이 있습니다',
      '동료나 형제와의 유대가 깊습니다',
    ],
    negative: [
      '고집이 세고 타협하기 어렵습니다',
      '재물이 분산되거나 경쟁으로 손실이 있을 수 있습니다',
      '독단적인 결정으로 문제가 생길 수 있습니다',
    ],
    career: ['자영업', '프리랜서', '동업', '스포츠', '경쟁 분야'],
    relationship: '친구나 형제 같은 관계를 선호합니다. 수평적 관계에서 편안함을 느끼지만, 경쟁 관계가 되면 갈등이 생길 수 있어요.',
    health: '과로나 무리한 경쟁으로 인한 스트레스에 주의하세요.',
  },
  '겁재': {
    name: '겁재(劫財)',
    hanja: '劫財',
    meaning: '나와 같은 오행, 다른 음양. 재물을 빼앗는 형제, 경쟁자',
    positive: [
      '추진력이 강하고 적극적입니다',
      '승부욕이 있어 목표 달성 의지가 강합니다',
      '사교성이 좋고 활동적입니다',
      '위기 상황에서 돌파력이 있습니다',
    ],
    negative: [
      '투기성이 있어 재물 손실 주의',
      '충동적인 결정을 할 수 있습니다',
      '배우자나 동업자와 갈등이 생길 수 있습니다',
    ],
    career: ['영업', '투자', '도전적인 사업', '스포츠', '군/경찰'],
    relationship: '활발하고 사교적이지만 경쟁심으로 인한 갈등에 주의. 배우자와의 관계에서 주도권 다툼이 있을 수 있어요.',
    health: '사고나 부상에 주의하세요. 무리한 활동을 피하세요.',
  },
  '식신': {
    name: '식신(食神)',
    hanja: '食神',
    meaning: '내가 생하는 오행, 같은 음양. 먹을 것을 주는 복의 신',
    positive: [
      '낙천적이고 여유가 있습니다',
      '의식주가 풍족하고 복이 있습니다',
      '예술적 감각과 표현력이 뛰어납니다',
      '건강하고 장수하는 편입니다',
      '자녀운이 좋습니다 (여성의 경우)',
    ],
    negative: [
      '게으르거나 나태해질 수 있습니다',
      '먹는 것에 탐닉하여 과체중 주의',
      '현실에 안주하려는 경향이 있습니다',
    ],
    career: ['요리사', '예술가', '교육자', '서비스업', '엔터테인먼트'],
    relationship: '편안하고 다정한 관계를 만듭니다. 베풀기를 좋아하고 주변을 즐겁게 해줍니다.',
    health: '소화기 건강에 신경 쓰세요. 과식에 주의하세요.',
  },
  '상관': {
    name: '상관(傷官)',
    hanja: '傷官',
    meaning: '내가 생하는 오행, 다른 음양. 관을 상하게 하는 기운',
    positive: [
      '창의력과 표현력이 탁월합니다',
      '언변이 뛰어나고 설득력이 있습니다',
      '예술적 재능이 있습니다',
      '기존 틀을 깨는 혁신적 사고',
    ],
    negative: [
      '권위에 반항하고 조직 생활이 어려울 수 있습니다',
      '말이 앞서서 구설에 오를 수 있습니다',
      '비판적이고 까다로운 성격',
      '남편운에 불리할 수 있습니다 (여성의 경우)',
    ],
    career: ['예술가', '작가', '변호사', '방송인', '프리랜서', '창업'],
    relationship: '솔직하고 표현력이 강하지만 비판적인 면이 있어 상대방이 상처받을 수 있어요.',
    health: '신경성 질환, 스트레스 관리에 신경 쓰세요.',
  },
  '편재': {
    name: '편재(偏財)',
    hanja: '偏財',
    meaning: '내가 극하는 오행, 다른 음양. 흘러다니는 재물',
    positive: [
      '사업 수완이 좋고 돈 버는 능력이 있습니다',
      '사교성이 좋고 인맥이 넓습니다',
      '융통성이 있고 임기응변에 능합니다',
      '횡재수가 있을 수 있습니다',
    ],
    negative: [
      '돈이 들어와도 쉽게 나갑니다',
      '투기성 있는 일에 끌릴 수 있습니다',
      '여러 이성에게 관심이 갈 수 있습니다',
      '아버지와의 관계가 멀어질 수 있습니다',
    ],
    career: ['사업가', '무역', '영업', '금융', '서비스업'],
    relationship: '사교적이고 매력적이지만 한 곳에 정착하기 어려울 수 있어요. 다양한 이성 관계에 주의.',
    health: '과로, 스트레스로 인한 건강 문제에 주의하세요.',
  },
  '정재': {
    name: '정재(正財)',
    hanja: '正財',
    meaning: '내가 극하는 오행, 같은 음양. 정당한 재물, 고정 수입',
    positive: [
      '성실하고 계획적인 재테크를 합니다',
      '안정적인 수입과 저축 능력이 있습니다',
      '근면하고 책임감이 강합니다',
      '가정에 충실합니다',
    ],
    negative: [
      '지나치게 검소하거나 인색해 보일 수 있습니다',
      '모험을 피하고 현실에 안주할 수 있습니다',
      '융통성이 부족할 수 있습니다',
    ],
    career: ['회계사', '공무원', '은행원', '관리직', '안정적인 직장'],
    relationship: '가정적이고 성실한 배우자 역할을 합니다. 안정적인 관계를 선호해요.',
    health: '큰 문제 없이 건강한 편이지만 과로에 주의하세요.',
  },
  '편관': {
    name: '편관(偏官) / 칠살(七殺)',
    hanja: '偏官',
    meaning: '나를 극하는 오행, 다른 음양. 무서운 권력, 칠살',
    positive: [
      '카리스마가 있고 리더십이 강합니다',
      '결단력이 있고 추진력이 뛰어납니다',
      '위기 상황에서 능력을 발휘합니다',
      '권위와 통솔력이 있습니다',
    ],
    negative: [
      '성격이 급하고 과격해질 수 있습니다',
      '관재구설에 휘말릴 수 있습니다',
      '건강 문제나 사고에 주의',
      '억압적인 환경에 놓일 수 있습니다',
    ],
    career: ['군인', '경찰', '검사', '외과의사', '위기관리', '격투기'],
    relationship: '강한 카리스마로 상대를 압도할 수 있어요. 너무 강하면 관계가 힘들어질 수 있습니다.',
    health: '사고, 수술, 급성 질환에 주의하세요.',
  },
  '정관': {
    name: '정관(正官)',
    hanja: '正官',
    meaning: '나를 극하는 오행, 같은 음양. 바른 관직, 명예',
    positive: [
      '품행이 바르고 명예를 중시합니다',
      '사회적 지위와 인정을 받습니다',
      '책임감이 강하고 신뢰받습니다',
      '조직에서 인정받고 승진합니다',
      '좋은 배우자를 만날 수 있습니다 (여성의 경우)',
    ],
    negative: [
      '지나치게 원칙적이고 융통성이 없습니다',
      '체면을 차리느라 솔직하지 못합니다',
      '스트레스와 압박에 시달릴 수 있습니다',
    ],
    career: ['공무원', '판사', '교수', '대기업', '관리직', '전문직'],
    relationship: '예의 바르고 신뢰할 수 있는 관계를 만듭니다. 배우자로서 믿음직스러워요.',
    health: '스트레스, 과로로 인한 건강 문제에 주의하세요.',
  },
  '편인': {
    name: '편인(偏印) / 효신(梟神)',
    hanja: '偏印',
    meaning: '나를 생하는 오행, 다른 음양. 특별한 재능, 비밀',
    positive: [
      '독창적인 사고와 특별한 재능이 있습니다',
      '직관력과 영감이 뛰어납니다',
      '학문이나 예술에서 비범한 능력',
      '새로운 분야에 대한 탐구심',
    ],
    negative: [
      '변덕스럽고 한 곳에 집중하기 어렵습니다',
      '고독하고 사회성이 부족할 수 있습니다',
      '자녀운에 불리할 수 있습니다',
      '시작은 잘하나 마무리가 약합니다',
    ],
    career: ['철학자', '점술가', '예술가', '연구원', '종교인', 'IT'],
    relationship: '독특한 매력이 있지만 예측하기 어려운 면이 있어요. 혼자만의 시간이 필요합니다.',
    health: '정신 건강, 수면 문제에 주의하세요.',
  },
  '정인': {
    name: '정인(正印)',
    hanja: '正印',
    meaning: '나를 생하는 오행, 같은 음양. 바른 도장, 학문, 어머니',
    positive: [
      '인자하고 덕이 있습니다',
      '학문에 뛰어나고 지혜가 있습니다',
      '어른의 도움과 지원을 받습니다',
      '명예와 문서운이 좋습니다',
      '어머니와의 관계가 좋습니다',
    ],
    negative: [
      '의존적이고 수동적일 수 있습니다',
      '결단력이 부족할 수 있습니다',
      '지나치게 이론적이고 현실감이 떨어집니다',
    ],
    career: ['학자', '교수', '교사', '의사', '공무원', '종교인'],
    relationship: '따뜻하고 자상한 관계를 만듭니다. 상대방을 잘 보살펴 줍니다.',
    health: '전반적으로 건강하지만 나태함으로 인한 문제에 주의.',
  },
};

// 오행 관계에 따른 십신 계산
function getSibsin(ilganOhaeng: OhaengType, ilganYinYang: '양' | '음', targetOhaeng: OhaengType, targetYinYang: '양' | '음'): SibsinType {
  const sameYinYang = ilganYinYang === targetYinYang;

  // 같은 오행
  if (ilganOhaeng === targetOhaeng) {
    return sameYinYang ? '비견' : '겁재';
  }

  // 내가 생하는 오행 (식상)
  const generateMap: Record<OhaengType, OhaengType> = { '목': '화', '화': '토', '토': '금', '금': '수', '수': '목' };
  if (generateMap[ilganOhaeng] === targetOhaeng) {
    return sameYinYang ? '식신' : '상관';
  }

  // 내가 극하는 오행 (재성)
  const controlMap: Record<OhaengType, OhaengType> = { '목': '토', '화': '금', '토': '수', '금': '목', '수': '화' };
  if (controlMap[ilganOhaeng] === targetOhaeng) {
    return sameYinYang ? '정재' : '편재';
  }

  // 나를 극하는 오행 (관성)
  const controlledByMap: Record<OhaengType, OhaengType> = { '목': '금', '화': '수', '토': '목', '금': '화', '수': '토' };
  if (controlledByMap[ilganOhaeng] === targetOhaeng) {
    return sameYinYang ? '정관' : '편관';
  }

  // 나를 생하는 오행 (인성)
  return sameYinYang ? '정인' : '편인';
}

export interface SibsinAnalysis {
  pillarSibsin: {
    year: { cheongan: SibsinType; jiji: SibsinType[] };
    month: { cheongan: SibsinType; jiji: SibsinType[] };
    day: { cheongan: SibsinType; jiji: SibsinType[] };
    hour: { cheongan: SibsinType; jiji: SibsinType[] };
  };
  sibsinCount: Record<SibsinType, number>;
  dominant: SibsinType[];
  lacking: SibsinType[];
  analysis: string;
  detailAnalysis: string;
}

/**
 * 십신 분석
 */
export function analyzeSibsin(saju: SajuResult): SibsinAnalysis {
  const ilganOhaeng = CHEONGAN_OHAENG[saju.ilgan];
  const ilganYinYang = CHEONGAN_YINYANG[saju.ilgan];

  // 각 기둥별 십신 계산
  const getPillarSibsin = (pillar: Pillar) => {
    const cheonganSibsin = getSibsin(
      ilganOhaeng,
      ilganYinYang,
      CHEONGAN_OHAENG[pillar.cheongan],
      CHEONGAN_YINYANG[pillar.cheongan]
    );

    const jijiSibsin = pillar.jijiJijanggan.map(jijanggan =>
      getSibsin(
        ilganOhaeng,
        ilganYinYang,
        CHEONGAN_OHAENG[jijanggan],
        CHEONGAN_YINYANG[jijanggan]
      )
    );

    return { cheongan: cheonganSibsin, jiji: jijiSibsin };
  };

  const pillarSibsin = {
    year: getPillarSibsin(saju.yearPillar),
    month: getPillarSibsin(saju.monthPillar),
    day: getPillarSibsin(saju.dayPillar),
    hour: getPillarSibsin(saju.hourPillar),
  };

  // 십신 개수 세기
  const sibsinCount: Record<SibsinType, number> = {
    '비견': 0, '겁재': 0, '식신': 0, '상관': 0, '편재': 0,
    '정재': 0, '편관': 0, '정관': 0, '편인': 0, '정인': 0,
  };

  Object.values(pillarSibsin).forEach(p => {
    sibsinCount[p.cheongan]++;
    p.jiji.forEach(s => sibsinCount[s]++);
  });

  // 과다/부족 판단
  const entries = Object.entries(sibsinCount) as [SibsinType, number][];
  const dominant = entries.filter(([, count]) => count >= 3).map(([name]) => name);
  const lacking: SibsinType[] = [];

  // 십신 그룹별 부족 확인 (비겁, 식상, 재성, 관성, 인성)
  const groups = {
    '비겁': sibsinCount['비견'] + sibsinCount['겁재'],
    '식상': sibsinCount['식신'] + sibsinCount['상관'],
    '재성': sibsinCount['편재'] + sibsinCount['정재'],
    '관성': sibsinCount['편관'] + sibsinCount['정관'],
    '인성': sibsinCount['편인'] + sibsinCount['정인'],
  };

  if (groups['비겁'] === 0) lacking.push('비견');
  if (groups['식상'] === 0) lacking.push('식신');
  if (groups['재성'] === 0) lacking.push('정재');
  if (groups['관성'] === 0) lacking.push('정관');
  if (groups['인성'] === 0) lacking.push('정인');

  // 분석 텍스트 생성
  let analysis = `═══════════════════════════════════\n`;
  analysis += `🔮 십신(十神) 분석\n`;
  analysis += `═══════════════════════════════════\n\n`;

  analysis += `【 사주 내 십신 분포 】\n`;
  analysis += `┌────────┬────────┬────────┬────────┐\n`;
  analysis += `│  시주  │  일주  │  월주  │  년주  │\n`;
  analysis += `├────────┼────────┼────────┼────────┤\n`;
  analysis += `│${pillarSibsin.hour.cheongan.padStart(5)}   │  본인  │${pillarSibsin.month.cheongan.padStart(5)}   │${pillarSibsin.year.cheongan.padStart(5)}   │\n`;
  analysis += `│${(pillarSibsin.hour.jiji[0] || '-').padStart(5)}   │${(pillarSibsin.day.jiji[0] || '-').padStart(5)}   │${(pillarSibsin.month.jiji[0] || '-').padStart(5)}   │${(pillarSibsin.year.jiji[0] || '-').padStart(5)}   │\n`;
  analysis += `└────────┴────────┴────────┴────────┘\n\n`;

  analysis += `【 십신 개수 】\n`;
  analysis += `• 비겁(비견+겁재): ${groups['비겁']}개 - 자아, 형제, 경쟁\n`;
  analysis += `• 식상(식신+상관): ${groups['식상']}개 - 표현, 재능, 자녀\n`;
  analysis += `• 재성(편재+정재): ${groups['재성']}개 - 재물, 아버지, 여자\n`;
  analysis += `• 관성(편관+정관): ${groups['관성']}개 - 직장, 명예, 남편\n`;
  analysis += `• 인성(편인+정인): ${groups['인성']}개 - 학문, 어머니, 문서\n\n`;

  if (dominant.length > 0) {
    analysis += `🔺 과다한 십신: ${dominant.join(', ')}\n`;
    dominant.forEach(s => {
      const data = SIBSIN_DATA[s];
      analysis += `   → ${data.meaning}\n`;
    });
    analysis += `\n`;
  }

  if (lacking.length > 0) {
    analysis += `🔻 부족한 십신 그룹:\n`;
    if (groups['비겁'] === 0) analysis += `   → 비겁 없음: 독립심 키우기, 자기 주장 연습 필요\n`;
    if (groups['식상'] === 0) analysis += `   → 식상 없음: 표현력 개발, 취미 활동 권장\n`;
    if (groups['재성'] === 0) analysis += `   → 재성 없음: 재테크 공부, 경제 관념 키우기\n`;
    if (groups['관성'] === 0) analysis += `   → 관성 없음: 목표 설정, 사회적 책임감 키우기\n`;
    if (groups['인성'] === 0) analysis += `   → 인성 없음: 학습, 자격증, 어른의 조언 구하기\n`;
  }

  // 상세 분석
  let detailAnalysis = `═══════════════════════════════════\n`;
  detailAnalysis += `📖 십신 상세 해석\n`;
  detailAnalysis += `═══════════════════════════════════\n\n`;

  // 가장 많은 십신 상세 설명
  const sortedSibsin = entries.sort((a, b) => b[1] - a[1]).filter(([, count]) => count > 0);

  sortedSibsin.slice(0, 3).forEach(([sibsin, count]) => {
    const data = SIBSIN_DATA[sibsin];
    detailAnalysis += `【 ${data.name} - ${count}개 】\n`;
    detailAnalysis += `${data.meaning}\n\n`;
    detailAnalysis += `긍정적 특성:\n`;
    data.positive.forEach(p => {
      detailAnalysis += `• ${p}\n`;
    });
    detailAnalysis += `\n주의할 점:\n`;
    data.negative.forEach(n => {
      detailAnalysis += `• ${n}\n`;
    });
    detailAnalysis += `\n적합한 직업: ${data.career.join(', ')}\n`;
    detailAnalysis += `대인관계: ${data.relationship}\n`;
    detailAnalysis += `건강: ${data.health}\n\n`;
  });

  return {
    pillarSibsin,
    sibsinCount,
    dominant,
    lacking,
    analysis,
    detailAnalysis,
  };
}
