'use client';

import { useState } from 'react';
import type { SajuInput, SajuResult as SajuResultType, JijiType } from '@/lib/saju/types';
import { calculateSaju } from '@/lib/saju/saju-calculator';
import { SIJIN_HOURS } from '@/lib/saju/constants';
import SajuResult from './SajuResult';
import FortuneDetail from './FortuneDetail';
import CompatibilitySection from './CompatibilitySection';

export default function SajuCalculator() {
  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState<JijiType | ''>('');
  const [isLunar, setIsLunar] = useState(false);
  const [isLeapMonth, setIsLeapMonth] = useState(false);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [result, setResult] = useState<SajuResultType | null>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'result' | 'fortune' | 'compatibility'>('result');

  const handleCalculate = () => {
    setError('');
    try {
      if (year < 1900 || year > 2100) {
        setError('1900년 ~ 2100년 사이의 연도를 입력해주세요.');
        return;
      }
      if (month < 1 || month > 12) {
        setError('올바른 월을 입력해주세요.');
        return;
      }
      if (day < 1 || day > 31) {
        setError('올바른 일을 입력해주세요.');
        return;
      }

      const input: SajuInput = {
        year,
        month,
        day,
        hour: hour ? (hour as JijiType) : null,
        isLunar,
        isLeapMonth,
        gender,
      };

      const sajuResult = calculateSaju(input);
      setResult(sajuResult);
      setActiveTab('result');
    } catch {
      setError('계산 중 오류가 발생했습니다. 날짜를 확인해주세요.');
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div>
      {/* 입력 폼 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 shadow-sm">
        {/* 생년월일 */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">생년월일</label>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">년</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                min={1900}
                max={2100}
                className="w-full border rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">월</label>
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}월</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">일</label>
              <select
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}일</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 음력/양력 */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">달력 기준</label>
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={!isLunar}
                onChange={() => { setIsLunar(false); setIsLeapMonth(false); }}
                className="text-blue-600"
              />
              <span className="text-sm">양력</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={isLunar}
                onChange={() => setIsLunar(true)}
                className="text-blue-600"
              />
              <span className="text-sm">음력</span>
            </label>
            {isLunar && (
              <label className="flex items-center gap-2 cursor-pointer ml-2">
                <input
                  type="checkbox"
                  checked={isLeapMonth}
                  onChange={(e) => setIsLeapMonth(e.target.checked)}
                  className="text-blue-600 rounded"
                />
                <span className="text-sm text-gray-600">윤달</span>
              </label>
            )}
          </div>
        </div>

        {/* 태어난 시 */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            태어난 시 <span className="text-gray-400 font-normal">(선택)</span>
          </label>
          <select
            value={hour}
            onChange={(e) => setHour(e.target.value as JijiType | '')}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">모름 / 선택 안 함</option>
            {SIJIN_HOURS.map((s) => (
              <option key={s.jiji} value={s.jiji}>
                {s.label} ({s.range})
              </option>
            ))}
          </select>
        </div>

        {/* 성별 */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">성별</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={gender === 'male'}
                onChange={() => setGender('male')}
                className="text-blue-600"
              />
              <span className="text-sm">남성</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={gender === 'female'}
                onChange={() => setGender('female')}
                className="text-blue-600"
              />
              <span className="text-sm">여성</span>
            </label>
          </div>
        </div>

        {/* 에러 */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>
        )}

        {/* 계산 버튼 */}
        <button
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-slate-800 to-slate-900 text-white py-3 rounded-xl font-semibold hover:from-slate-700 hover:to-slate-800 transition-all shadow-md hover:shadow-lg"
        >
          사주팔자 계산하기
        </button>
      </div>

      {/* 결과 */}
      {result && (
        <>
          {/* 탭 */}
          <div className="grid grid-cols-3 gap-2 mt-8 mb-4">
            <button
              onClick={() => setActiveTab('result')}
              className={`px-4 py-4 rounded-xl text-base font-semibold transition-all shadow-sm ${
                activeTab === 'result'
                  ? 'bg-slate-800 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              사주 결과
            </button>
            <button
              onClick={() => setActiveTab('fortune')}
              className={`px-4 py-4 rounded-xl text-base font-semibold transition-all shadow-sm ${
                activeTab === 'fortune'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {currentYear}년 운세
            </button>
            <button
              onClick={() => setActiveTab('compatibility')}
              className={`px-4 py-4 rounded-xl text-base font-semibold transition-all shadow-sm ${
                activeTab === 'compatibility'
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              궁합 보기
            </button>
          </div>

          {activeTab === 'result' && <SajuResult result={result} />}
          {activeTab === 'fortune' && <FortuneDetail saju={result} />}
          {activeTab === 'compatibility' && <CompatibilitySection person1={result} />}
        </>
      )}
    </div>
  );
}
