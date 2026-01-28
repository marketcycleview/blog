/**
 * 음력 ↔ 양력 변환
 * korean-lunar-calendar 대신 직접 구현 (npm 설치 이슈 회피)
 * 1900~2100년 음력 데이터 내장
 */

// 음력 데이터: 각 연도의 월별 일수를 비트로 인코딩
// 하위 12비트: 1~12월 대소월 (1=30일, 0=29일)
// 상위 4비트: 윤달 월 (0이면 윤달 없음)
// 최상위: 윤달이 대월(30일)이면 1
const LUNAR_DATA: number[] = [
  // 1900-1909
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
  // 1910-1919
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
  // 1920-1929
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
  // 1930-1939
  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
  // 1940-1949
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
  // 1950-1959
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
  // 1960-1969
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
  // 1970-1979
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
  // 1980-1989
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
  // 1990-1999
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0,
  // 2000-2009
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
  // 2010-2019
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
  // 2020-2029
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
  // 2030-2039
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
  // 2040-2049
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
  // 2050-2059
  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,
  // 2060-2069
  0x092e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,
  // 2070-2079
  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,
  // 2080-2089
  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,
  // 2090-2099
  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a4d0, 0x0d150, 0x0f252,
  // 2100
  0x0d520,
];

const SOLAR_MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function solarDaysInMonth(year: number, month: number): number {
  if (month === 2 && isLeapYear(year)) return 29;
  return SOLAR_MONTH_DAYS[month - 1];
}

// 음력 해당 연도의 윤달 월 (0이면 없음)
function leapMonth(year: number): number {
  const idx = year - 1900;
  if (idx < 0 || idx >= LUNAR_DATA.length) return 0;
  return LUNAR_DATA[idx] & 0xf;
}

// 음력 해당 연도 특정 월의 일수
function lunarDaysInMonth(year: number, month: number, isLeap: boolean = false): number {
  const idx = year - 1900;
  if (idx < 0 || idx >= LUNAR_DATA.length) return 30;

  if (isLeap) {
    const lm = leapMonth(year);
    if (lm !== month) return 0;
    return (LUNAR_DATA[idx] & 0x10000) ? 30 : 29;
  }
  return (LUNAR_DATA[idx] & (0x10000 >> month)) ? 30 : 29;
}

// 음력 해당 연도의 총 일수
function lunarYearDays(year: number): number {
  let sum = 0;
  for (let m = 1; m <= 12; m++) {
    sum += lunarDaysInMonth(year, m);
  }
  const lm = leapMonth(year);
  if (lm > 0) {
    sum += lunarDaysInMonth(year, lm, true);
  }
  return sum;
}

interface LunarDate {
  year: number;
  month: number;
  day: number;
}

/**
 * 양력 → 음력 변환
 */
export function solarToLunar(year: number, month: number, day: number): LunarDate {
  // 기준일: 1900년 1월 31일 = 음력 1900년 1월 1일
  const baseDate = new Date(1900, 0, 31);
  const target = new Date(year, month - 1, day);
  let offset = Math.round((target.getTime() - baseDate.getTime()) / 86400000);

  let ly = 1900;
  let yearDays: number;
  for (; ly < 2101 && offset > 0; ly++) {
    yearDays = lunarYearDays(ly);
    offset -= yearDays;
  }
  if (offset < 0) {
    ly--;
    offset += lunarYearDays(ly);
  }

  let lm = 1;
  const leap = leapMonth(ly);
  let isLeapMonth = false;

  for (; lm <= 12 && offset >= 0; lm++) {
    const days = lunarDaysInMonth(ly, lm);
    if (offset < days) break;
    offset -= days;

    // 윤달 처리
    if (leap === lm && !isLeapMonth) {
      isLeapMonth = true;
      const leapDays = lunarDaysInMonth(ly, lm, true);
      if (offset < leapDays) break;
      offset -= leapDays;
      isLeapMonth = false;
    }
  }

  return { year: ly, month: lm, day: offset + 1 };
}

/**
 * 음력 → 양력 변환
 */
export function lunarToSolar(year: number, month: number, day: number, isLeapMonth: boolean = false): { year: number; month: number; day: number } {
  let offset = 0;

  // 1900년부터 해당 년까지의 총 일수
  for (let y = 1900; y < year; y++) {
    offset += lunarYearDays(y);
  }

  // 해당 연도의 1월부터 해당 월까지
  const leap = leapMonth(year);
  for (let m = 1; m < month; m++) {
    offset += lunarDaysInMonth(year, m);
    if (leap === m) {
      offset += lunarDaysInMonth(year, m, true);
    }
  }

  // 윤달인 경우 정월 일수도 더함
  if (isLeapMonth && leap === month) {
    offset += lunarDaysInMonth(year, month);
  }

  offset += day - 1;

  // 기준일에 offset 더하기
  const base = new Date(1900, 0, 31);
  const result = new Date(base.getTime() + offset * 86400000);

  return {
    year: result.getFullYear(),
    month: result.getMonth() + 1,
    day: result.getDate(),
  };
}

/**
 * 사주 계산을 위한 음력 날짜 변환
 */
export function getLunarDateForSaju(
  year: number,
  month: number,
  day: number,
  isLunar: boolean,
  isLeapMonth: boolean = false
): LunarDate {
  if (isLunar) {
    return { year, month, day };
  }
  return solarToLunar(year, month, day);
}

/**
 * 양력 Date 객체 반환 (일주 계산용)
 */
export function getSolarDate(
  year: number,
  month: number,
  day: number,
  isLunar: boolean,
  isLeapMonth: boolean = false
): Date {
  if (!isLunar) {
    return new Date(year, month - 1, day);
  }
  const solar = lunarToSolar(year, month, day, isLeapMonth);
  return new Date(solar.year, solar.month - 1, solar.day);
}
