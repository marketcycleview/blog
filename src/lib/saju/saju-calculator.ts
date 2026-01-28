import type { CheonganType, JijiType, Pillar, SajuResult, SajuInput, OhaengDistribution } from './types';
import {
  CHEONGAN, CHEONGAN_HANJA, JIJI, JIJI_HANJA,
  CHEONGAN_OHAENG, JIJI_OHAENG,
  CHEONGAN_YINYANG, JIJI_YINYANG,
  JIJANGGAN,
} from './constants';
import { getLunarDateForSaju, getSolarDate } from './lunar-converter';
import { calculateDaeun } from './daeun-calculator';
import { calculateSaeun } from './saeun-calculator';

function createPillar(cheonganIndex: number, jijiIndex: number): Pillar {
  const ci = ((cheonganIndex % 10) + 10) % 10;
  const ji = ((jijiIndex % 12) + 12) % 12;
  const cheongan = CHEONGAN[ci];
  const jiji = JIJI[ji];

  return {
    cheongan,
    jiji,
    cheonganHanja: CHEONGAN_HANJA[ci],
    jijiHanja: JIJI_HANJA[ji],
    cheonganOhaeng: CHEONGAN_OHAENG[cheongan],
    jijiOhaeng: JIJI_OHAENG[jiji],
    cheonganYinYang: CHEONGAN_YINYANG[cheongan],
    jijiYinYang: JIJI_YINYANG[jiji],
    jijiJijanggan: JIJANGGAN[jiji],
  };
}

/**
 * 년주 계산
 */
function calculateYearPillar(lunarYear: number): Pillar {
  const cheonganIndex = (lunarYear - 4) % 10;
  const jijiIndex = (lunarYear - 4) % 12;
  return createPillar(cheonganIndex, jijiIndex);
}

/**
 * 월주 계산
 * 년간에 따라 월간 시작점이 결정됨 (년상기월법)
 */
function calculateMonthPillar(yearCheongan: CheonganType, lunarMonth: number): Pillar {
  // 월지: 인월(1월)부터 시작
  const jijiIndex = (2 + (lunarMonth - 1)) % 12;

  // 년간에 따른 월간 시작점
  const yearCheonganIndex = CHEONGAN.indexOf(yearCheongan);
  const startMap = [2, 4, 6, 8, 0]; // 갑/기→병, 을/경→무, 병/신→경, 정/임→임, 무/계→갑
  const startCheongan = startMap[yearCheonganIndex % 5];
  const cheonganIndex = (startCheongan + (lunarMonth - 1)) % 10;

  return createPillar(cheonganIndex, jijiIndex);
}

/**
 * 일주 계산
 * 기준일: 2000년 1월 7일 = 갑자일 (간지 index: 0)
 */
function calculateDayPillar(solarDate: Date): Pillar {
  const baseDate = new Date(2000, 0, 7); // 2000-01-07
  const baseGanjiIndex = 0; // 갑자

  const diffTime = solarDate.getTime() - baseDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  const ganjiIndex = ((baseGanjiIndex + diffDays) % 60 + 60) % 60;

  const cheonganIndex = ganjiIndex % 10;
  const jijiIndex = ganjiIndex % 12;

  return createPillar(cheonganIndex, jijiIndex);
}

/**
 * 시주 계산
 * 일간에 따라 시간 천간 시작점 결정 (일상기시법)
 */
function calculateHourPillar(dayCheongan: CheonganType, hourJiji: JijiType): Pillar {
  const jijiIndex = JIJI.indexOf(hourJiji);
  const dayCheonganIndex = CHEONGAN.indexOf(dayCheongan);

  // 일간에 따른 자시 천간: 갑/기→갑, 을/경→병, 병/신→무, 정/임→경, 무/계→임
  const startMap = [0, 2, 4, 6, 8];
  const startCheongan = startMap[dayCheonganIndex % 5];
  const cheonganIndex = (startCheongan + jijiIndex) % 10;

  return createPillar(cheonganIndex, jijiIndex);
}

/**
 * 오행 분포 계산
 */
function calculateOhaeng(pillars: Pillar[]): OhaengDistribution {
  const dist: OhaengDistribution = { '목': 0, '화': 0, '토': 0, '금': 0, '수': 0 };

  for (const p of pillars) {
    dist[p.cheonganOhaeng]++;
    dist[p.jijiOhaeng]++;
  }

  return dist;
}

/**
 * 사주팔자 계산 (메인)
 */
export function calculateSaju(input: SajuInput): SajuResult {
  const { year, month, day, hour, isLunar, isLeapMonth, gender } = input;

  // 음력 날짜 (사주 계산용)
  const lunar = getLunarDateForSaju(year, month, day, isLunar, isLeapMonth);

  // 양력 날짜 (일주 계산용)
  const solarDate = getSolarDate(year, month, day, isLunar, isLeapMonth);

  // 4주 계산
  const yearPillar = calculateYearPillar(lunar.year);
  const monthPillar = calculateMonthPillar(yearPillar.cheongan, lunar.month);
  const dayPillar = calculateDayPillar(solarDate);

  // 시주: 시간 입력이 없으면 기본 자시
  const hourJiji = hour || '자';
  const hourPillar = calculateHourPillar(dayPillar.cheongan, hourJiji);

  const pillars = [yearPillar, monthPillar, dayPillar, hourPillar];
  const ohaeng = calculateOhaeng(pillars);

  // 대운 계산
  const birthYear = solarDate.getFullYear();
  const currentYear = new Date().getFullYear();
  const currentAge = currentYear - birthYear + 1; // 한국 나이
  const daeun = calculateDaeun(yearPillar, monthPillar, gender, currentAge);

  // 세운 계산
  const saeun = calculateSaeun(currentYear);

  return {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    ohaeng,
    ilgan: dayPillar.cheongan,
    daeun,
    saeun,
    gender,
    birthDate: solarDate,
    isLunar,
  };
}
