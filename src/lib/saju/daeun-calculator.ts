import type { CheonganType, Pillar, DaeunInfo } from './types';
import { CHEONGAN, CHEONGAN_HANJA, JIJI, JIJI_HANJA, CHEONGAN_YINYANG } from './constants';

/**
 * 각 월의 절기 날짜 (대략적인 값, 연도별 1-2일 차이 가능)
 * 절기: 입춘, 경칩, 청명, 입하, 망종, 소서, 입추, 백로, 한로, 입동, 대설, 소한
 */
const JEOLGI_DATES: { month: number; day: number }[] = [
  { month: 1, day: 6 },   // 소한 (1월)
  { month: 2, day: 4 },   // 입춘 (2월)
  { month: 3, day: 6 },   // 경칩 (3월)
  { month: 4, day: 5 },   // 청명 (4월)
  { month: 5, day: 6 },   // 입하 (5월)
  { month: 6, day: 6 },   // 망종 (6월)
  { month: 7, day: 7 },   // 소서 (7월)
  { month: 8, day: 8 },   // 입추 (8월)
  { month: 9, day: 8 },   // 백로 (9월)
  { month: 10, day: 8 },  // 한로 (10월)
  { month: 11, day: 8 },  // 입동 (11월)
  { month: 12, day: 7 },  // 대설 (12월)
];

/**
 * 대운 시작 나이 계산 (절기 기반)
 * 양남음녀: 순행 → 다음 절기까지 일수
 * 음남양녀: 역행 → 이전 절기까지 일수
 * 일수 ÷ 3 = 대운수 (반올림)
 */
function calculateDaeunStartAge(birthDate: Date, isForward: boolean): number {
  const birthMonth = birthDate.getMonth() + 1; // 1-12
  const birthDay = birthDate.getDate();
  const birthYear = birthDate.getFullYear();

  // 해당 월의 절기
  const currentJeolgi = JEOLGI_DATES[birthMonth - 1];

  let daysDiff: number;

  if (isForward) {
    // 순행: 다음 절기까지의 일수
    if (birthDay >= currentJeolgi.day) {
      // 이미 절기가 지났으면 다음 달 절기까지
      const nextMonth = birthMonth === 12 ? 1 : birthMonth + 1;
      const nextJeolgi = JEOLGI_DATES[nextMonth - 1];
      const nextJeolgiDate = new Date(
        birthMonth === 12 ? birthYear + 1 : birthYear,
        nextMonth - 1,
        nextJeolgi.day
      );
      daysDiff = Math.round((nextJeolgiDate.getTime() - birthDate.getTime()) / 86400000);
    } else {
      // 아직 절기 전이면 이번 달 절기까지
      const jeolgiDate = new Date(birthYear, birthMonth - 1, currentJeolgi.day);
      daysDiff = Math.round((jeolgiDate.getTime() - birthDate.getTime()) / 86400000);
    }
  } else {
    // 역행: 이전 절기까지의 일수
    if (birthDay >= currentJeolgi.day) {
      // 절기가 지났으면 이번 달 절기까지
      const jeolgiDate = new Date(birthYear, birthMonth - 1, currentJeolgi.day);
      daysDiff = Math.round((birthDate.getTime() - jeolgiDate.getTime()) / 86400000);
    } else {
      // 아직 절기 전이면 이전 달 절기까지
      const prevMonth = birthMonth === 1 ? 12 : birthMonth - 1;
      const prevJeolgi = JEOLGI_DATES[prevMonth - 1];
      const prevJeolgiDate = new Date(
        birthMonth === 1 ? birthYear - 1 : birthYear,
        prevMonth - 1,
        prevJeolgi.day
      );
      daysDiff = Math.round((birthDate.getTime() - prevJeolgiDate.getTime()) / 86400000);
    }
  }

  // 일수 ÷ 3 = 대운수 (반올림)
  const daeunAge = Math.round(daysDiff / 3);

  // 최소 1세, 최대 10세
  return Math.max(1, Math.min(daeunAge, 10));
}

/**
 * 대운 계산
 * 양남음녀 → 순행, 음남양녀 → 역행
 */
export function calculateDaeun(
  yearPillar: Pillar,
  monthPillar: Pillar,
  gender: 'male' | 'female',
  currentAge: number,
  birthDate?: Date
): DaeunInfo[] {
  const yearYinYang = CHEONGAN_YINYANG[yearPillar.cheongan];
  const isForward =
    (yearYinYang === '양' && gender === 'male') ||
    (yearYinYang === '음' && gender === 'female');

  // 대운 시작 나이 계산 (절기 기반)
  let startAge = 4; // 기본값
  if (birthDate) {
    startAge = calculateDaeunStartAge(birthDate, isForward);
  }

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
