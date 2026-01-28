'use client';

import { useState } from 'react';
import type { SajuResult, SajuInput, JijiType, CompatibilityResult } from '@/lib/saju/types';
import { calculateSaju } from '@/lib/saju/saju-calculator';
import { analyzeCompatibility } from '@/lib/saju/compatibility-analyzer';
import { SIJIN_HOURS } from '@/lib/saju/constants';

interface CompatibilitySectionProps {
  person1: SajuResult;
}

function ScoreBar({ score, label }: { score: number; label: string }) {
  const color = score >= 70 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500';
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700">{label}</span>
        <span className="font-semibold">{score}점</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export default function CompatibilitySection({ person1 }: CompatibilitySectionProps) {
  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState<JijiType | ''>('');
  const [isLunar, setIsLunar] = useState(false);
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    try {
      const input: SajuInput = {
        year,
        month,
        day,
        hour: hour ? (hour as JijiType) : null,
        isLunar,
        isLeapMonth: false,
        gender,
      };
      const person2 = calculateSaju(input);
      const compat = analyzeCompatibility(person1, person2);
      setResult(compat);
    } catch {
      setError('계산 중 오류가 발생했습니다. 날짜를 확인해주세요.');
    }
  };

  return (
    <div className="space-y-6 mt-8">
      {/* 상대방 입력 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6">
        <h3 className="text-lg font-bold mb-4">상대방 정보 입력</h3>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">년</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              min={1900}
              max={2100}
              className="w-full border rounded-lg px-3 py-2 text-center text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">월</label>
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 text-center text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
              className="w-full border rounded-lg px-3 py-2 text-center text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}일</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">태어난 시 (선택)</label>
            <select
              value={hour}
              onChange={(e) => setHour(e.target.value as JijiType | '')}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">모름</option>
              {SIJIN_HOURS.map((s) => (
                <option key={s.jiji} value={s.jiji}>
                  {s.label} ({s.range})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">달력 / 성별</label>
            <div className="flex gap-3 items-center h-[38px]">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isLunar}
                  onChange={(e) => setIsLunar(e.target.checked)}
                  className="rounded text-blue-600"
                />
                <span className="text-xs">음력</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  checked={gender === 'male'}
                  onChange={() => setGender('male')}
                  className="text-blue-600"
                />
                <span className="text-xs">남</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  checked={gender === 'female'}
                  onChange={() => setGender('female')}
                  className="text-blue-600"
                />
                <span className="text-xs">여</span>
              </label>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>
        )}

        <button
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all shadow-md"
        >
          궁합 보기
        </button>
      </div>

      {/* 궁합 결과 */}
      {result && (
        <div className="space-y-4">
          {/* 종합 점수 */}
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl p-6 text-center">
            <h3 className="text-lg font-medium mb-2">종합 궁합 점수</h3>
            <div className="text-5xl font-bold mb-2">{result.totalScore}점</div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden max-w-xs mx-auto">
              <div
                className="h-full bg-white rounded-full transition-all duration-700"
                style={{ width: `${result.totalScore}%` }}
              />
            </div>
            <p className="text-pink-100 text-sm mt-3">{result.summary}</p>
          </div>

          {/* 세부 항목 */}
          <div className="bg-white border rounded-xl p-4 sm:p-6">
            <h3 className="text-lg font-bold mb-4">세부 분석</h3>
            <ScoreBar score={result.categories.ohaengHarmony.score} label="오행 조화" />
            <ScoreBar score={result.categories.cheonganHap.score} label="천간합" />
            <ScoreBar score={result.categories.jijiRelation.score} label="지지 관계" />
            <ScoreBar score={result.categories.iljuCompat.score} label="일주 궁합" />

            {/* 상세 설명 */}
            <div className="mt-4 space-y-2">
              {Object.values(result.categories).map((cat, i) => (
                <p key={i} className="text-sm text-gray-600">
                  {cat.description}
                </p>
              ))}
            </div>
          </div>

          {/* 장점 / 주의점 */}
          {(result.strengths.length > 0 || result.concerns.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {result.strengths.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h4 className="font-semibold text-green-700 mb-2">강점</h4>
                  <ul className="space-y-1">
                    {result.strengths.map((s, i) => (
                      <li key={i} className="text-sm text-green-700">• {s}</li>
                    ))}
                  </ul>
                </div>
              )}
              {result.concerns.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <h4 className="font-semibold text-amber-700 mb-2">주의점</h4>
                  <ul className="space-y-1">
                    {result.concerns.map((c, i) => (
                      <li key={i} className="text-sm text-amber-700">• {c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <p className="text-xs text-gray-400 text-center">
            * 궁합은 참고용이며, 좋은 관계는 서로의 노력으로 만들어갑니다.
          </p>
        </div>
      )}
    </div>
  );
}
