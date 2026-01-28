import type { OhaengType, OhaengDistribution, CheonganType, SajuResult } from './types';
import { CHEONGAN_OHAENG, CHEONGAN_YINYANG, OHAENG_SANGSAENG, OHAENG_SANGGEUK } from './constants';

// 일간별 상세 성격 데이터
const ILGAN_PERSONALITY: Record<CheonganType, {
  name: string;
  symbol: string;
  nature: string;
  personality: string[];
  strengths: string[];
  weaknesses: string[];
  career: string[];
  relationship: string;
  loveStyle: string;
}> = {
  '갑': {
    name: '갑목(甲木)',
    symbol: '큰 나무, 대들보',
    nature: '양의 목(木) 기운으로, 곧게 뻗어 자라는 큰 나무를 상징합니다.',
    personality: [
      '곧은 성격으로 정직하고 신념이 강합니다',
      '리더십이 있고 진취적인 기상이 있습니다',
      '자존심이 강하고 당당하며 의협심이 있습니다',
      '새로운 것을 개척하고 시작하는 것을 좋아합니다',
    ],
    strengths: ['리더십', '추진력', '정직함', '의리'],
    weaknesses: ['고집', '융통성 부족', '타협 어려움'],
    career: ['CEO/경영자', '정치인', '군인', '법조인', '건축가', '교육자'],
    relationship: '넓은 인맥을 형성하지만 깊은 관계는 적은 편입니다. 의리를 중시하고 한번 맺은 인연은 오래갑니다.',
    loveStyle: '한번 마음을 주면 진심으로 헌신하는 타입입니다. 다만 표현이 서툴러 오해를 받을 수 있어요.',
  },
  '을': {
    name: '을목(乙木)',
    symbol: '풀, 덩굴, 꽃',
    nature: '음의 목(木) 기운으로, 유연하게 휘어지는 풀과 덩굴을 상징합니다.',
    personality: [
      '유연하고 적응력이 뛰어납니다',
      '섬세하고 예술적 감각이 있습니다',
      '부드럽지만 끈기가 있어 꾸준히 성장합니다',
      '겉은 유약해 보여도 내면은 강인합니다',
    ],
    strengths: ['적응력', '인내심', '섬세함', '친화력'],
    weaknesses: ['우유부단', '의존적', '소심함'],
    career: ['예술가', '디자이너', '상담사', '작가', '플로리스트', '패션 관련'],
    relationship: '사람을 편하게 만드는 재주가 있어 인기가 많습니다. 다만 거절을 잘 못해 힘들어할 수 있어요.',
    loveStyle: '상대방에게 맞춰주는 헌신적인 사랑을 합니다. 로맨틱하고 감성적인 연애를 선호해요.',
  },
  '병': {
    name: '병화(丙火)',
    symbol: '태양, 큰 불',
    nature: '양의 화(火) 기운으로, 모든 것을 비추는 태양을 상징합니다.',
    personality: [
      '밝고 활발하며 에너지가 넘칩니다',
      '열정적이고 적극적인 성격입니다',
      '솔직하고 정열적이며 숨김이 없습니다',
      '사람들의 관심을 자연스럽게 끄는 매력이 있습니다',
    ],
    strengths: ['열정', '밝은 성격', '리더십', '창의성'],
    weaknesses: ['성급함', '과시욕', '지구력 부족'],
    career: ['연예인', '방송인', '마케터', '영업직', '정치인', '이벤트 기획'],
    relationship: '주변에 사람이 모이고 분위기 메이커 역할을 합니다. 다만 뜨겁게 시작해서 빨리 식을 수 있어요.',
    loveStyle: '불같은 사랑을 하며 표현이 적극적입니다. 상대방을 밝게 비춰주는 든든한 존재가 되어줘요.',
  },
  '정': {
    name: '정화(丁火)',
    symbol: '촛불, 등불',
    nature: '음의 화(火) 기운으로, 어둠을 밝히는 촛불을 상징합니다.',
    personality: [
      '섬세하고 감성적입니다',
      '예민하고 직관력이 뛰어납니다',
      '따뜻한 마음으로 주변을 배려합니다',
      '깊은 생각과 통찰력이 있습니다',
    ],
    strengths: ['통찰력', '배려심', '집중력', '예술성'],
    weaknesses: ['예민함', '걱정 많음', '소극적'],
    career: ['학자', '연구원', '예술가', '상담사', '종교인', '심리학자'],
    relationship: '소수의 사람과 깊은 관계를 맺습니다. 상대방의 마음을 잘 읽고 배려할 줄 알아요.',
    loveStyle: '은근하고 깊은 사랑을 합니다. 속마음을 쉽게 드러내지 않지만 한번 사랑하면 변함없어요.',
  },
  '무': {
    name: '무토(戊土)',
    symbol: '산, 큰 바위',
    nature: '양의 토(土) 기운으로, 우뚝 솟은 산과 바위를 상징합니다.',
    personality: [
      '듬직하고 신뢰감을 줍니다',
      '포용력이 크고 중후한 품성입니다',
      '안정적이고 변화를 싫어합니다',
      '책임감이 강하고 믿음직스럽습니다',
    ],
    strengths: ['신뢰감', '포용력', '책임감', '안정성'],
    weaknesses: ['고집', '변화 거부', '느린 행동'],
    career: ['부동산', '금융업', '공무원', '건설업', '농업', '관리직'],
    relationship: '믿고 의지할 수 있는 든든한 존재입니다. 처음에는 어렵게 느껴져도 알수록 정이 듭니다.',
    loveStyle: '한결같고 변함없는 사랑을 합니다. 표현은 서툴지만 행동으로 진심을 보여주는 타입이에요.',
  },
  '기': {
    name: '기토(己土)',
    symbol: '밭, 정원',
    nature: '음의 토(土) 기운으로, 만물을 키우는 기름진 땅을 상징합니다.',
    personality: [
      '온순하고 겸손합니다',
      '실용적이고 현실적인 사고를 합니다',
      '꼼꼼하고 세심한 성격입니다',
      '내면이 따뜻하고 봉사정신이 있습니다',
    ],
    strengths: ['성실함', '현실감각', '봉사정신', '세심함'],
    weaknesses: ['자기주장 부족', '걱정 많음', '융통성 부족'],
    career: ['회계사', '사무직', '농업', '요리사', '간호사', '복지사'],
    relationship: '묵묵히 챙겨주는 스타일로 은근히 인기가 많습니다. 편안하고 안정적인 관계를 추구해요.',
    loveStyle: '조용히 내조하고 뒷바라지하는 스타일입니다. 큰 표현 없이 일상에서 사랑을 보여줍니다.',
  },
  '경': {
    name: '경금(庚金)',
    symbol: '철, 칼, 바위',
    nature: '양의 금(金) 기운으로, 단단한 쇠와 칼을 상징합니다.',
    personality: [
      '결단력이 있고 단호합니다',
      '의리 있고 불의에 타협하지 않습니다',
      '강직하고 원칙을 중시합니다',
      '승부욕이 강하고 경쟁심이 있습니다',
    ],
    strengths: ['결단력', '의리', '추진력', '정의감'],
    weaknesses: ['냉정함', '독선적', '융통성 부족'],
    career: ['군인', '경찰', '검사', '외과의사', '운동선수', '기계공학'],
    relationship: '호불호가 명확하고 적과 아군이 분명합니다. 한번 인정한 사람에게는 끝까지 의리를 지켜요.',
    loveStyle: '쿨한 것 같지만 한번 사랑하면 깊게 빠집니다. 말보다 행동으로 사랑을 표현하는 타입이에요.',
  },
  '신': {
    name: '신금(辛金)',
    symbol: '보석, 장신구',
    nature: '음의 금(金) 기운으로, 아름답게 다듬어진 보석을 상징합니다.',
    personality: [
      '섬세하고 예민합니다',
      '심미안이 뛰어나고 품격이 있습니다',
      '완벽주의 성향이 있습니다',
      '자존심이 강하고 체면을 중시합니다',
    ],
    strengths: ['심미안', '완벽주의', '지성', '품격'],
    weaknesses: ['예민함', '까다로움', '비판적'],
    career: ['보석 디자이너', '금융 분석가', '비평가', '변호사', '의사', '예술가'],
    relationship: '까다로운 편이라 친해지기 어렵지만, 일단 친해지면 세심하게 챙겨줍니다.',
    loveStyle: '이상형에 대한 기준이 높습니다. 사귀면 디테일하게 챙기지만 잔소리가 많을 수 있어요.',
  },
  '임': {
    name: '임수(壬水)',
    symbol: '바다, 큰 강',
    nature: '양의 수(水) 기운으로, 끝없이 흐르는 바다를 상징합니다.',
    personality: [
      '지혜롭고 머리가 좋습니다',
      '포용력이 크고 대범합니다',
      '적응력이 뛰어나고 유연합니다',
      '야망이 크고 진취적입니다',
    ],
    strengths: ['지혜', '포용력', '적응력', '대범함'],
    weaknesses: ['변덕', '한곳에 정착 어려움', '방탕함'],
    career: ['무역업', '물류', '철학자', '교수', '기획자', '여행 관련'],
    relationship: '넓은 인맥을 가지고 있고 사교성이 좋습니다. 다만 깊은 관계보다 넓은 관계를 선호해요.',
    loveStyle: '자유로운 연애를 좋아합니다. 구속을 싫어하지만 진정한 사랑을 만나면 헌신적이에요.',
  },
  '계': {
    name: '계수(癸水)',
    symbol: '비, 이슬, 샘물',
    nature: '음의 수(水) 기운으로, 조용히 스며드는 물을 상징합니다.',
    personality: [
      '총명하고 눈치가 빠릅니다',
      '감성적이고 상상력이 풍부합니다',
      '인내심이 강하고 끈기가 있습니다',
      '겉은 유순해 보여도 자기 생각이 확고합니다',
    ],
    strengths: ['총명함', '인내심', '감성', '관찰력'],
    weaknesses: ['음침함', '소심함', '걱정 많음'],
    career: ['연구원', '심리학자', '작가', '점술가', '수산업', '음료 관련'],
    relationship: '조용히 관찰하고 파악하는 스타일입니다. 마음을 쉽게 열지 않지만 한번 열면 깊어요.',
    loveStyle: '감정적이고 직감적인 연애를 합니다. 상대방의 마음을 잘 읽고 맞춰주는 타입이에요.',
  },
};

// 오행별 상세 특성
const OHAENG_DETAIL: Record<OhaengType, {
  name: string;
  hanja: string;
  element: string;
  season: string;
  direction: string;
  color: string;
  number: string;
  taste: string;
  organ: string;
  emotion: string;
  trait: string;
  excessTrait: string;
  lackingTrait: string;
  career: string[];
  supplement: string[];
}> = {
  '목': {
    name: '목(木)',
    hanja: '木',
    element: '나무',
    season: '봄',
    direction: '동쪽',
    color: '청색, 녹색',
    number: '3, 8',
    taste: '신맛',
    organ: '간장, 담낭, 눈',
    emotion: '분노',
    trait: '성장, 발전, 시작, 인자함',
    excessTrait: '목 기운이 과하면 성격이 급하고 화를 잘 내며, 무리하게 일을 벌이는 경향이 있습니다. 고집이 세지고 남의 말을 듣지 않을 수 있어요.',
    lackingTrait: '목 기운이 부족하면 의욕이 없고 우울해지기 쉽습니다. 결단력이 부족하고 시작하는 것을 두려워할 수 있어요.',
    career: ['교육', '출판', '의류', '목재', '가구', '원예'],
    supplement: ['나무로 된 가구나 소품', '녹색 계열 인테리어', '관엽식물 키우기', '동쪽 방향 활용', '봄에 새로운 시작'],
  },
  '화': {
    name: '화(火)',
    hanja: '火',
    element: '불',
    season: '여름',
    direction: '남쪽',
    color: '적색, 자주색',
    number: '2, 7',
    taste: '쓴맛',
    organ: '심장, 소장, 혀',
    emotion: '기쁨',
    trait: '열정, 표현, 발산, 예의',
    excessTrait: '화 기운이 과하면 성격이 급하고 충동적이 됩니다. 흥분을 잘 하고 다혈질적인 면이 강해져 인간관계에서 마찰이 생길 수 있어요.',
    lackingTrait: '화 기운이 부족하면 열정이 없고 무기력해집니다. 표현력이 부족해 오해를 받기 쉽고, 인기나 명예운이 약해질 수 있어요.',
    career: ['예술', '방송', '홍보', '조명', '전기', '요식업'],
    supplement: ['빨간색 계열 소품', '따뜻한 조명', '남쪽 방향 활용', '활발한 사람들과 교류', '여름에 적극적인 활동'],
  },
  '토': {
    name: '토(土)',
    hanja: '土',
    element: '흙',
    season: '환절기(계절의 끝)',
    direction: '중앙',
    color: '황색, 갈색',
    number: '5, 10',
    taste: '단맛',
    organ: '비장, 위장, 입',
    emotion: '생각(사려)',
    trait: '중재, 안정, 신뢰, 포용',
    excessTrait: '토 기운이 과하면 고지식하고 융통성이 없어집니다. 변화를 극도로 싫어하고 답답한 성격이 될 수 있어요.',
    lackingTrait: '토 기운이 부족하면 신뢰감이 없어 보이고 약속을 잘 지키지 못합니다. 중심이 없어 이리저리 흔들릴 수 있어요.',
    career: ['부동산', '건설', '농업', '도자기', '중개업', '신탁'],
    supplement: ['노란색, 갈색 계열', '도자기나 흙 소품', '안정적인 루틴 만들기', '집안 중앙 정리정돈', '계절 바뀔 때 건강 관리'],
  },
  '금': {
    name: '금(金)',
    hanja: '金',
    element: '쇠, 금속',
    season: '가을',
    direction: '서쪽',
    color: '백색, 금색',
    number: '4, 9',
    taste: '매운맛',
    organ: '폐, 대장, 코',
    emotion: '슬픔',
    trait: '결단, 의리, 정의, 냉철함',
    excessTrait: '금 기운이 과하면 냉정하고 잔인해 보일 수 있습니다. 비판적이고 날카로워 주변 사람들이 불편해할 수 있어요.',
    lackingTrait: '금 기운이 부족하면 결단력이 없고 우유부단합니다. 정리정돈을 못하고 마무리가 약해요.',
    career: ['금융', '보석', '기계', '자동차', '군/경찰', '의료기기'],
    supplement: ['흰색, 금색 계열', '금속 소재 액세서리', '서쪽 방향 활용', '가을에 중요한 결정', '정리정돈 습관 들이기'],
  },
  '수': {
    name: '수(水)',
    hanja: '水',
    element: '물',
    season: '겨울',
    direction: '북쪽',
    color: '흑색, 남색',
    number: '1, 6',
    taste: '짠맛',
    organ: '신장, 방광, 귀',
    emotion: '공포',
    trait: '지혜, 유연함, 흐름, 저장',
    excessTrait: '수 기운이 과하면 음침하고 우울해지기 쉽습니다. 걱정이 많고 불안해하며 의심이 많아질 수 있어요.',
    lackingTrait: '수 기운이 부족하면 지혜와 판단력이 흐려집니다. 융통성이 없어지고 새로운 것을 배우기 어려워해요.',
    career: ['무역', '물류', '수산', '음료', '청소', '철학'],
    supplement: ['검은색, 남색 계열', '물 관련 인테리어(수족관, 분수)', '북쪽 방향 활용', '겨울에 충분한 휴식', '물 많이 마시기'],
  },
};

// 오행 관계 설명
const OHAENG_RELATION_DESC: Record<string, string> = {
  '목생화': '목이 화를 생합니다. 나무가 타서 불을 만들듯, 목의 성장 에너지가 화의 열정을 키워줍니다.',
  '화생토': '화가 토를 생합니다. 불이 타고 나면 재가 되어 흙이 되듯, 화의 열정이 토의 안정을 만들어줍니다.',
  '토생금': '토가 금을 생합니다. 땅속에서 금속이 나오듯, 토의 포용력이 금의 결단력을 키워줍니다.',
  '금생수': '금이 수를 생합니다. 금속이 차가워지면 물방울이 맺히듯, 금의 냉철함이 수의 지혜를 만들어줍니다.',
  '수생목': '수가 목을 생합니다. 물이 나무를 키우듯, 수의 지혜가 목의 성장을 도와줍니다.',
  '목극토': '목이 토를 극합니다. 나무뿌리가 땅을 뚫듯, 목의 성장력이 토의 안정을 흔들 수 있습니다.',
  '토극수': '토가 수를 극합니다. 흙이 물을 막듯, 토의 고집이 수의 유연함을 방해할 수 있습니다.',
  '수극화': '수가 화를 극합니다. 물이 불을 끄듯, 수의 냉정함이 화의 열정을 식힐 수 있습니다.',
  '화극금': '화가 금을 극합니다. 불이 쇠를 녹이듯, 화의 열정이 금의 냉철함을 무너뜨릴 수 있습니다.',
  '금극목': '금이 목을 극합니다. 도끼가 나무를 베듯, 금의 결단력이 목의 성장을 제한할 수 있습니다.',
};

export interface OhaengAnalysisResult {
  dominant: OhaengType[];
  lacking: OhaengType[];
  ilganOhaeng: OhaengType;
  analysis: string;
  personalityAnalysis: string;
  careerAnalysis: string;
  relationshipAnalysis: string;
  healthAnalysis: string;
  luckyElements: string;
  balanceAnalysis: string;
}

/**
 * 오행 분석: 과다/부족 판단 및 상세 해석
 */
export function analyzeOhaeng(dist: OhaengDistribution, ilgan: CheonganType): OhaengAnalysisResult {
  const ilganOhaeng = CHEONGAN_OHAENG[ilgan];
  const ilganYinYang = CHEONGAN_YINYANG[ilgan];
  const entries = Object.entries(dist) as [OhaengType, number][];

  // 과다/부족 판단 (3개 이상이면 과다, 0개면 부족)
  const dominant = entries.filter(([, v]) => v >= 3).map(([k]) => k);
  const lacking = entries.filter(([, v]) => v === 0).map(([k]) => k);

  // 일간 강약 판단
  const ilganCount = dist[ilganOhaeng];
  const inOhaeng = getInOhaeng(ilganOhaeng); // 나를 생하는 오행
  const inCount = dist[inOhaeng];
  const ilganStrength = ilganCount + inCount;
  const isStrong = ilganStrength >= 3;

  const ilganData = ILGAN_PERSONALITY[ilgan];
  const ilganOhaengData = OHAENG_DETAIL[ilganOhaeng];

  // 1. 기본 분석 텍스트
  let analysis = `═══════════════════════════════════\n`;
  analysis += `📌 일간 분석: ${ilganData.name}\n`;
  analysis += `═══════════════════════════════════\n\n`;
  analysis += `${ilganData.nature}\n\n`;
  analysis += `▸ 상징: ${ilganData.symbol}\n`;
  analysis += `▸ 음양: ${ilganYinYang === '양' ? '양(陽) - 외향적, 능동적' : '음(陰) - 내향적, 수용적'}\n`;
  analysis += `▸ 기본 오행: ${ilganOhaengData.name}\n\n`;

  // 오행 분포 상태
  analysis += `【 사주 오행 분포 】\n`;
  for (const [oh, count] of entries) {
    const bar = '■'.repeat(count) + '□'.repeat(Math.max(0, 4 - count));
    const status = count >= 3 ? '(과다)' : count === 0 ? '(부족)' : '';
    analysis += `${OHAENG_DETAIL[oh].name}: ${bar} ${count}개 ${status}\n`;
  }
  analysis += `\n`;

  // 과다/부족 분석
  if (dominant.length > 0) {
    analysis += `🔺 과다한 기운: ${dominant.map(o => OHAENG_DETAIL[o].name).join(', ')}\n`;
    dominant.forEach(o => {
      analysis += `   → ${OHAENG_DETAIL[o].excessTrait}\n`;
    });
    analysis += `\n`;
  }

  if (lacking.length > 0) {
    analysis += `🔻 부족한 기운: ${lacking.map(o => OHAENG_DETAIL[o].name).join(', ')}\n`;
    lacking.forEach(o => {
      analysis += `   → ${OHAENG_DETAIL[o].lackingTrait}\n`;
    });
    analysis += `\n`;
  }

  if (dominant.length === 0 && lacking.length === 0) {
    analysis += `✅ 오행이 비교적 균형 잡힌 사주입니다.\n`;
    analysis += `   큰 편향 없이 안정적인 기운을 가지고 있어요.\n\n`;
  }

  // 일간 강약
  analysis += `【 일간 강약 】\n`;
  if (isStrong) {
    analysis += `💪 일간이 강한 편입니다 (${ilganOhaeng} ${ilganCount}개 + ${inOhaeng} ${inCount}개)\n`;
    analysis += `   → 주관이 뚜렷하고 자기주장이 강합니다.\n`;
    analysis += `   → 독립심이 있고 스스로 길을 개척해 나가는 스타일입니다.\n`;
    analysis += `   → 다만 너무 자기 위주로 생각하지 않도록 주의하세요.\n`;
  } else {
    analysis += `🤝 일간이 약한 편입니다 (${ilganOhaeng} ${ilganCount}개 + ${inOhaeng} ${inCount}개)\n`;
    analysis += `   → 협조적이고 주변의 도움을 잘 받아들입니다.\n`;
    analysis += `   → 유연하고 적응력이 좋은 편입니다.\n`;
    analysis += `   → 자신감을 키우고 주체성을 갖는 것이 중요합니다.\n`;
  }

  // 2. 성격 분석
  let personalityAnalysis = `═══════════════════════════════════\n`;
  personalityAnalysis += `👤 성격 특성\n`;
  personalityAnalysis += `═══════════════════════════════════\n\n`;
  personalityAnalysis += `【 기본 성격 】\n`;
  ilganData.personality.forEach(p => {
    personalityAnalysis += `• ${p}\n`;
  });
  personalityAnalysis += `\n`;
  personalityAnalysis += `【 장점 】 ${ilganData.strengths.join(', ')}\n`;
  personalityAnalysis += `【 단점 】 ${ilganData.weaknesses.join(', ')}\n\n`;

  // 오행 영향에 따른 추가 성격
  if (dominant.length > 0) {
    personalityAnalysis += `【 ${dominant.map(o => OHAENG_DETAIL[o].name).join(', ')} 과다로 인한 성격 영향 】\n`;
    dominant.forEach(o => {
      personalityAnalysis += `• ${OHAENG_DETAIL[o].excessTrait}\n`;
    });
    personalityAnalysis += `\n`;
  }

  // 3. 직업/적성 분석
  let careerAnalysis = `═══════════════════════════════════\n`;
  careerAnalysis += `💼 적성 및 진로\n`;
  careerAnalysis += `═══════════════════════════════════\n\n`;
  careerAnalysis += `【 일간 ${ilganData.name} 기반 추천 직업 】\n`;
  ilganData.career.forEach(c => {
    careerAnalysis += `• ${c}\n`;
  });
  careerAnalysis += `\n`;

  if (dominant.length > 0) {
    careerAnalysis += `【 강한 오행 기반 추천 직업 】\n`;
    dominant.forEach(o => {
      careerAnalysis += `• ${OHAENG_DETAIL[o].name}: ${OHAENG_DETAIL[o].career.join(', ')}\n`;
    });
    careerAnalysis += `\n`;
  }

  careerAnalysis += `【 업무 스타일 】\n`;
  if (isStrong) {
    careerAnalysis += `• 독립적으로 일하는 것을 선호합니다\n`;
    careerAnalysis += `• 리더 역할이나 창업이 잘 맞습니다\n`;
    careerAnalysis += `• 자율성이 보장되는 환경에서 능력을 발휘합니다\n`;
  } else {
    careerAnalysis += `• 팀워크를 중시하는 환경이 잘 맞습니다\n`;
    careerAnalysis += `• 안정적인 조직에서 역량을 키우는 것이 좋습니다\n`;
    careerAnalysis += `• 멘토나 조언자의 도움을 받으면 성장이 빠릅니다\n`;
  }

  // 4. 대인관계 분석
  let relationshipAnalysis = `═══════════════════════════════════\n`;
  relationshipAnalysis += `🤝 대인관계 & 연애\n`;
  relationshipAnalysis += `═══════════════════════════════════\n\n`;
  relationshipAnalysis += `【 대인관계 스타일 】\n`;
  relationshipAnalysis += `${ilganData.relationship}\n\n`;
  relationshipAnalysis += `【 연애 스타일 】\n`;
  relationshipAnalysis += `${ilganData.loveStyle}\n\n`;

  // 궁합이 잘 맞는 오행
  const goodMatch = getGoodMatchOhaeng(ilganOhaeng);
  const badMatch = getBadMatchOhaeng(ilganOhaeng);
  relationshipAnalysis += `【 잘 맞는 기운 】 ${goodMatch.map(o => OHAENG_DETAIL[o].name).join(', ')}\n`;
  relationshipAnalysis += `【 조심할 기운 】 ${badMatch.map(o => OHAENG_DETAIL[o].name).join(', ')}\n`;

  // 5. 건강 분석
  let healthAnalysis = `═══════════════════════════════════\n`;
  healthAnalysis += `🏥 건강 주의사항\n`;
  healthAnalysis += `═══════════════════════════════════\n\n`;

  healthAnalysis += `【 일간 기준 주의 장기 】\n`;
  healthAnalysis += `• ${ilganOhaengData.organ}에 주의가 필요합니다.\n`;
  healthAnalysis += `• ${ilganOhaengData.emotion}의 감정이 과하면 해당 장기에 영향을 줄 수 있어요.\n\n`;

  if (lacking.length > 0) {
    healthAnalysis += `【 부족한 오행 관련 주의 】\n`;
    lacking.forEach(o => {
      healthAnalysis += `• ${OHAENG_DETAIL[o].name} 부족 → ${OHAENG_DETAIL[o].organ} 관리 필요\n`;
    });
    healthAnalysis += `\n`;
  }

  if (dominant.length > 0) {
    healthAnalysis += `【 과다한 오행 관련 주의 】\n`;
    dominant.forEach(o => {
      healthAnalysis += `• ${OHAENG_DETAIL[o].name} 과다 → ${OHAENG_DETAIL[o].organ}의 과부하 주의\n`;
    });
    healthAnalysis += `\n`;
  }

  healthAnalysis += `【 건강 관리 팁 】\n`;
  healthAnalysis += `• ${ilganOhaengData.taste} 음식을 적당히 섭취하세요\n`;
  healthAnalysis += `• ${ilganOhaengData.season}에 특히 건강 관리에 신경 쓰세요\n`;
  healthAnalysis += `• 감정 조절이 건강에 중요합니다\n`;

  // 6. 행운 요소
  let luckyElements = `═══════════════════════════════════\n`;
  luckyElements += `🍀 행운의 요소\n`;
  luckyElements += `═══════════════════════════════════\n\n`;

  // 보완이 필요한 오행을 기준으로
  const supplementOhaeng = lacking.length > 0 ? lacking[0] : getBalancingOhaeng(dist, ilganOhaeng, isStrong);
  const suppData = OHAENG_DETAIL[supplementOhaeng];

  luckyElements += `보완이 필요한 오행: ${suppData.name}\n\n`;
  luckyElements += `【 행운의 방향 】 ${suppData.direction}\n`;
  luckyElements += `【 행운의 색상 】 ${suppData.color}\n`;
  luckyElements += `【 행운의 숫자 】 ${suppData.number}\n`;
  luckyElements += `【 행운의 계절 】 ${suppData.season}\n\n`;

  luckyElements += `【 기운 보완 방법 】\n`;
  suppData.supplement.forEach(s => {
    luckyElements += `• ${s}\n`;
  });

  // 7. 균형 분석
  let balanceAnalysis = `═══════════════════════════════════\n`;
  balanceAnalysis += `⚖️ 오행 균형 조언\n`;
  balanceAnalysis += `═══════════════════════════════════\n\n`;

  if (dominant.length > 0 && lacking.length > 0) {
    balanceAnalysis += `현재 ${dominant.map(o => OHAENG_DETAIL[o].name).join(', ')}이(가) 과하고, `;
    balanceAnalysis += `${lacking.map(o => OHAENG_DETAIL[o].name).join(', ')}이(가) 부족한 상태입니다.\n\n`;

    // 상생/상극 관계 설명
    dominant.forEach(dom => {
      lacking.forEach(lack => {
        const relation = getOhaengRelationKey(dom, lack);
        if (relation && OHAENG_RELATION_DESC[relation]) {
          balanceAnalysis += `💡 ${OHAENG_RELATION_DESC[relation]}\n\n`;
        }
      });
    });
  }

  balanceAnalysis += `【 일상에서 실천할 수 있는 균형 맞추기 】\n`;
  if (lacking.length > 0) {
    lacking.forEach(o => {
      balanceAnalysis += `\n[${OHAENG_DETAIL[o].name} 보충하기]\n`;
      OHAENG_DETAIL[o].supplement.slice(0, 3).forEach(s => {
        balanceAnalysis += `• ${s}\n`;
      });
    });
  } else {
    balanceAnalysis += `오행이 균형 잡혀 있으므로 현재 생활 패턴을 유지하면 좋습니다.\n`;
    balanceAnalysis += `계절에 맞는 건강 관리와 감정 조절에 신경 쓰세요.\n`;
  }

  return {
    dominant,
    lacking,
    ilganOhaeng,
    analysis,
    personalityAnalysis,
    careerAnalysis,
    relationshipAnalysis,
    healthAnalysis,
    luckyElements,
    balanceAnalysis,
  };
}

// 나를 생하는 오행
function getInOhaeng(ilgan: OhaengType): OhaengType {
  const map: Record<OhaengType, OhaengType> = { '목': '수', '화': '목', '토': '화', '금': '토', '수': '금' };
  return map[ilgan];
}

// 내가 극하는 오행 (재성)
function getJaeOhaeng(ilgan: OhaengType): OhaengType {
  const map: Record<OhaengType, OhaengType> = { '목': '토', '화': '금', '토': '수', '금': '목', '수': '화' };
  return map[ilgan];
}

// 잘 맞는 오행 (상생 관계)
function getGoodMatchOhaeng(ilgan: OhaengType): OhaengType[] {
  const result: OhaengType[] = [];
  OHAENG_SANGSAENG.forEach(([a, b]) => {
    if (a === ilgan) result.push(b);
    if (b === ilgan) result.push(a);
  });
  return result;
}

// 조심해야 할 오행 (상극 관계)
function getBadMatchOhaeng(ilgan: OhaengType): OhaengType[] {
  const result: OhaengType[] = [];
  OHAENG_SANGGEUK.forEach(([a, b]) => {
    if (a === ilgan || b === ilgan) {
      result.push(a === ilgan ? b : a);
    }
  });
  return result;
}

// 균형을 맞추기 위한 오행 추천
function getBalancingOhaeng(dist: OhaengDistribution, ilgan: OhaengType, isStrong: boolean): OhaengType {
  // 일간이 강하면 설기(나를 극하는 오행) 또는 식상(내가 생하는 오행)
  // 일간이 약하면 인성(나를 생하는 오행) 또는 비겁(같은 오행)
  if (isStrong) {
    // 내가 생하는 오행 (설기)
    const sikOhaeng = OHAENG_SANGSAENG.find(([a]) => a === ilgan)?.[1];
    return sikOhaeng || ilgan;
  } else {
    // 나를 생하는 오행
    return getInOhaeng(ilgan);
  }
}

// 상생/상극 관계 키
function getOhaengRelationKey(a: OhaengType, b: OhaengType): string | null {
  for (const [x, y] of OHAENG_SANGSAENG) {
    if (x === a && y === b) return `${x}생${y}`;
    if (x === b && y === a) return `${x}생${y}`;
  }
  for (const [x, y] of OHAENG_SANGGEUK) {
    if (x === a && y === b) return `${x}극${y}`;
    if (x === b && y === a) return `${x}극${y}`;
  }
  return null;
}

/**
 * 두 오행 사이의 관계 확인
 */
export function getOhaengRelation(a: OhaengType, b: OhaengType): '상생' | '상극' | '비화' | '보통' {
  if (a === b) return '비화';
  if (OHAENG_SANGSAENG.some(([x, y]) => x === a && y === b)) return '상생';
  if (OHAENG_SANGGEUK.some(([x, y]) => x === a && y === b)) return '상극';
  return '보통';
}
