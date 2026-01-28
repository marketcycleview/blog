import type { SaeunInfo } from './types';
import { CHEONGAN, CHEONGAN_HANJA, JIJI, JIJI_HANJA } from './constants';

/**
 * 세운 계산 (해당 연도의 간지)
 */
export function calculateSaeun(year: number): SaeunInfo {
  const ci = (year - 4) % 10;
  const ji = (year - 4) % 12;

  return {
    year,
    cheongan: CHEONGAN[ci],
    jiji: JIJI[ji],
    cheonganHanja: CHEONGAN_HANJA[ci],
    jijiHanja: JIJI_HANJA[ji],
  };
}
