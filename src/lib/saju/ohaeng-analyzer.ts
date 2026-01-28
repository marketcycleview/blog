import type { OhaengType, OhaengDistribution, CheonganType } from './types';
import { CHEONGAN_OHAENG, OHAENG_SANGSAENG, OHAENG_SANGGEUK } from './constants';

/**
 * 오행 분석: 과다/부족 판단
 */
export function analyzeOhaeng(dist: OhaengDistribution, ilgan: CheonganType): {
  dominant: OhaengType[];
  lacking: OhaengType[];
  ilganOhaeng: OhaengType;
  analysis: string;
} {
  const ilganOhaeng = CHEONGAN_OHAENG[ilgan];
  const entries = Object.entries(dist) as [OhaengType, number][];
  const total = entries.reduce((sum, [, v]) => sum + v, 0);

  const dominant = entries.filter(([, v]) => v >= 3).map(([k]) => k);
  const lacking = entries.filter(([, v]) => v === 0).map(([k]) => k);

  // 간단한 분석 텍스트 생성
  let analysis = `일간 ${ilgan}(${ilganOhaeng})을 기준으로 분석합니다.\n\n`;

  if (dominant.length > 0) {
    analysis += `${dominant.map(o => ohaengName(o)).join(', ')} 기운이 강합니다. `;
  }
  if (lacking.length > 0) {
    analysis += `${lacking.map(o => ohaengName(o)).join(', ')} 기운이 부족합니다. `;
  }

  // 상생/상극 관계 분석
  const ilganIsStrong = dist[ilganOhaeng] >= 2;
  if (ilganIsStrong) {
    analysis += '\n\n일간이 강한 편이라 활동적이고 자기주장이 뚜렷한 성격입니다.';
  } else {
    analysis += '\n\n일간이 약한 편이라 다른 사람의 도움을 잘 받아들이는 성격입니다.';
  }

  // 보완 오행 제안
  if (lacking.length > 0) {
    const supplement = lacking[0];
    analysis += `\n\n보완이 필요한 오행: ${ohaengName(supplement)}`;
    analysis += `\n${getSupplementTip(supplement)}`;
  }

  return { dominant, lacking, ilganOhaeng, analysis };
}

function ohaengName(o: OhaengType): string {
  const names: Record<OhaengType, string> = {
    '목': '목(木)',
    '화': '화(火)',
    '토': '토(土)',
    '금': '금(金)',
    '수': '수(水)',
  };
  return names[o];
}

function getSupplementTip(o: OhaengType): string {
  const tips: Record<OhaengType, string> = {
    '목': '나무, 초록색 계열이 도움이 됩니다. 동쪽 방향이 좋아요.',
    '화': '빨간색 계열, 따뜻한 환경이 도움이 됩니다. 남쪽 방향이 좋아요.',
    '토': '노란색, 갈색 계열이 도움이 됩니다. 중앙이 좋아요.',
    '금': '흰색, 금속 소재가 도움이 됩니다. 서쪽 방향이 좋아요.',
    '수': '검은색, 파란색 계열이 도움이 됩니다. 북쪽 방향이 좋아요.',
  };
  return tips[o];
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
