import type { CheonganType, Pillar, DaeunInfo } from './types';
import { CHEONGAN, CHEONGAN_HANJA, JIJI, JIJI_HANJA, CHEONGAN_YINYANG } from './constants';

/**
 * 대운 계산
 * 양남음녀 → 순행, 음남양녀 → 역행
 */
export function calculateDaeun(
  yearPillar: Pillar,
  monthPillar: Pillar,
  gender: 'male' | 'female',
  currentAge: number
): DaeunInfo[] {
  const yearYinYang = CHEONGAN_YINYANG[yearPillar.cheongan];
  const isForward =
    (yearYinYang === '양' && gender === 'male') ||
    (yearYinYang === '음' && gender === 'female');

  // 대운 시작 나이 (간략화: 평균 4세로 설정)
  const startAge = 4;

  const monthCheonganIndex = CHEONGAN.indexOf(monthPillar.cheongan);
  const monthJijiIndex = JIJI.indexOf(monthPillar.jiji);

  const daeunList: DaeunInfo[] = [];

  for (let i = 0; i < 10; i++) {
    const offset = isForward ? (i + 1) : -(i + 1);
    const ci = ((monthCheonganIndex + offset) % 10 + 10) % 10;
    const ji = ((monthJijiIndex + offset) % 12 + 12) % 12;

    const ageStart = startAge + i * 10;
    const ageEnd = ageStart + 9;

    daeunList.push({
      startAge: ageStart,
      endAge: ageEnd,
      cheongan: CHEONGAN[ci],
      jiji: JIJI[ji],
      cheonganHanja: CHEONGAN_HANJA[ci],
      jijiHanja: JIJI_HANJA[ji],
      isCurrent: currentAge >= ageStart && currentAge <= ageEnd,
    });
  }

  return daeunList;
}
