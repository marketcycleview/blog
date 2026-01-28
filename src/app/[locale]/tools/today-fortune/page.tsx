'use client';

import { useState } from 'react';
import { getTodayFortune, TodayFortuneResult } from '@/lib/saju/today-fortune';

function ScoreBar({ score, label }: { score: number; label: string }) {
  const color = score >= 70 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-400';
  return (
    <div className="mb-2">
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

export default function TodayFortunePage() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [result, setResult] = useState<TodayFortuneResult | null>(null);

  const handleCalculate = () => {
    const fortune = getTodayFortune(year, month, day);
    setResult(fortune);
  };

  const formatDate = (date: Date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${days[date.getDay()]}요일)`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-8 px-4">
      <div className="max-w-lg mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">오늘의 운세</h1>
          <p className="text-gray-600">생년월일을 입력하면 오늘의 운세를 알려드려요</p>
        </div>

        {/* 입력 폼 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">생년월일 입력</h2>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">년도</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                min={1920}
                max={currentYear}
                className="w-full border rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">월</label>
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-orange-500 focus:outline-none"
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
                className="w-full border rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}일</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-md"
          >
            오늘의 운세 보기
          </button>
        </div>

        {/* 결과 */}
        {result && (
          <div className="space-y-4">
            {/* 날짜 & 기본 정보 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <p className="text-sm text-gray-500 mb-1">{formatDate(result.date)}</p>
              <p className="text-xs text-gray-400 mb-4">
                일진: {result.dayGanji.cheongan}{result.dayGanji.jiji}일 | {result.userAnimal}띠
              </p>

              {/* 종합 점수 */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="12"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke={result.overallScore >= 70 ? '#22c55e' : result.overallScore >= 50 ? '#eab308' : '#f87171'}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${result.overallScore * 3.52} 352`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">{result.overallScore}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">오늘의 운세</h3>
              <p className="text-gray-600">{result.overall}</p>
            </div>

            {/* 카테고리별 운세 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">세부 운세</h3>

              <div className="space-y-4">
                <div>
                  <ScoreBar score={result.categories.wealth.score} label="💰 재물운" />
                  <p className="text-sm text-gray-600 ml-1">{result.categories.wealth.text}</p>
                </div>

                <div>
                  <ScoreBar score={result.categories.love.score} label="❤️ 연애운" />
                  <p className="text-sm text-gray-600 ml-1">{result.categories.love.text}</p>
                </div>

                <div>
                  <ScoreBar score={result.categories.work.score} label="💼 업무운" />
                  <p className="text-sm text-gray-600 ml-1">{result.categories.work.text}</p>
                </div>

                <div>
                  <ScoreBar score={result.categories.health.score} label="🏃 건강운" />
                  <p className="text-sm text-gray-600 ml-1">{result.categories.health.text}</p>
                </div>
              </div>
            </div>

            {/* 행운의 요소 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">행운의 요소</h3>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-orange-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">행운의 색</p>
                  <p className="font-semibold text-orange-700">{result.luckyColor}</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">행운의 숫자</p>
                  <p className="font-semibold text-amber-700">{result.luckyNumber}</p>
                </div>
                <div className="bg-yellow-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">행운의 방향</p>
                  <p className="font-semibold text-yellow-700">{result.luckyDirection}</p>
                </div>
              </div>
            </div>

            {/* 조언 & 주의 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h4 className="font-semibold text-green-700 mb-2">💡 오늘의 조언</h4>
                <p className="text-sm text-green-700">{result.advice}</p>
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h4 className="font-semibold text-red-700 mb-2">⚠️ 주의사항</h4>
                <p className="text-sm text-red-700">{result.warning}</p>
              </div>
            </div>

            <p className="text-xs text-gray-400 text-center">
              * 운세는 재미로 보시고, 오늘 하루도 행복하세요!
            </p>
          </div>
        )}

        {/* 다른 도구 링크 */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">더 자세한 운세를 원하시면?</p>
          <a
            href="/ko/tools/saju"
            className="inline-block text-orange-600 font-medium hover:text-orange-700"
          >
            무료 사주팔자 보러가기 →
          </a>
        </div>
      </div>
    </div>
  );
}
