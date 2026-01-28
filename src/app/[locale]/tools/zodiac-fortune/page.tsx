'use client';

import { useState, useMemo } from 'react';
import { getZodiacFortune2026, getAllZodiacRanking2026, ZodiacFortuneResult } from '@/lib/saju/zodiac-fortune';
import { JIJI_ANIMAL } from '@/lib/saju/constants';

function ScoreBar({ score, label }: { score: number; label: string }) {
  const color = score >= 75 ? 'bg-green-500' : score >= 55 ? 'bg-yellow-500' : 'bg-red-400';
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

function RankingBadge({ ranking }: { ranking: number }) {
  const getBgColor = () => {
    if (ranking === 1) return 'bg-yellow-400 text-yellow-900';
    if (ranking === 2) return 'bg-gray-300 text-gray-800';
    if (ranking === 3) return 'bg-amber-600 text-white';
    if (ranking <= 5) return 'bg-blue-100 text-blue-700';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${getBgColor()}`}>
      {ranking}
    </span>
  );
}

export default function ZodiacFortunePage() {
  const currentYear = new Date().getFullYear();
  const [birthYear, setBirthYear] = useState(1990);
  const [result, setResult] = useState<ZodiacFortuneResult | null>(null);

  const ranking = useMemo(() => getAllZodiacRanking2026(), []);

  const handleCalculate = () => {
    const fortune = getZodiacFortune2026(birthYear);
    setResult(fortune);
  };

  // 띠 아이콘
  const animalEmojis: Record<string, string> = {
    '쥐': '🐭', '소': '🐮', '호랑이': '🐯', '토끼': '🐰',
    '용': '🐲', '뱀': '🐍', '말': '🐴', '양': '🐑',
    '원숭이': '🐵', '닭': '🐔', '개': '🐕', '돼지': '🐷',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50 py-8 px-4">
      <div className="max-w-lg mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">2026년 띠별 운세</h1>
          <p className="text-gray-600">병오년(丙午年) 붉은 말의 해 🐴</p>
        </div>

        {/* 입력 폼 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">태어난 해 입력</h2>

          <div className="flex gap-3 mb-4">
            <input
              type="number"
              value={birthYear}
              onChange={(e) => setBirthYear(Number(e.target.value))}
              min={1920}
              max={currentYear}
              className="flex-1 border rounded-lg px-4 py-3 text-center text-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="예: 1990"
            />
            <button
              onClick={handleCalculate}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all shadow-md"
            >
              운세 보기
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            * 1920년 ~ {currentYear}년 사이 출생연도를 입력하세요
          </p>
        </div>

        {/* 결과 */}
        {result && (
          <div className="space-y-4 mb-8">
            {/* 기본 정보 */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-5xl">{animalEmojis[result.animal]}</span>
                  <div>
                    <h3 className="text-2xl font-bold">{result.animal}띠</h3>
                    <p className="text-red-100 text-sm">{result.ohaeng} 오행</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-red-100 text-xs mb-1">12띠 중</p>
                  <div className="text-3xl font-bold">{result.ranking}위</div>
                </div>
              </div>

              <div className="bg-white/20 rounded-xl p-4">
                <div className="text-center mb-2">
                  <span className="text-5xl font-bold">{result.overallScore}</span>
                  <span className="text-xl">점</span>
                </div>
                <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all"
                    style={{ width: `${result.overallScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 종합 운세 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">2026년 종합 운세</h3>
              <p className="text-gray-700 leading-relaxed">{result.summary}</p>
            </div>

            {/* 세부 운세 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">세부 운세</h3>

              <ScoreBar score={result.categories.wealth.score} label="💰 재물운" />
              <p className="text-sm text-gray-600 mb-4 ml-1">{result.categories.wealth.text}</p>

              <ScoreBar score={result.categories.love.score} label="❤️ 연애운" />
              <p className="text-sm text-gray-600 mb-4 ml-1">{result.categories.love.text}</p>

              <ScoreBar score={result.categories.career.score} label="💼 직장운" />
              <p className="text-sm text-gray-600 mb-4 ml-1">{result.categories.career.text}</p>

              <ScoreBar score={result.categories.health.score} label="🏃 건강운" />
              <p className="text-sm text-gray-600 ml-1">{result.categories.health.text}</p>
            </div>

            {/* 월별 하이라이트 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">월별 운세 요약</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => {
                  const highlight = result.monthlyHighlight.find(h => h.month === month);
                  const isBest = highlight?.type === 'best';
                  const isCaution = highlight?.type === 'caution';

                  return (
                    <div
                      key={month}
                      className={`text-center p-2 rounded-lg ${
                        isBest
                          ? 'bg-green-100 border-2 border-green-400'
                          : isCaution
                          ? 'bg-red-100 border-2 border-red-400'
                          : 'bg-gray-50'
                      }`}
                    >
                      <span className="text-sm font-medium">{month}월</span>
                      {isBest && <span className="block text-xs text-green-600">좋음</span>}
                      {isCaution && <span className="block text-xs text-red-600">주의</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 행운의 요소 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">행운의 요소</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">행운의 색</p>
                  <p className="font-semibold text-red-700">{result.luckyElements.color}</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">행운의 숫자</p>
                  <p className="font-semibold text-orange-700">{result.luckyElements.number}</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">행운의 방향</p>
                  <p className="font-semibold text-amber-700">{result.luckyElements.direction}</p>
                </div>
                <div className="bg-yellow-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">잘 맞는 띠</p>
                  <p className="font-semibold text-yellow-700 text-sm">{result.luckyElements.partner}</p>
                </div>
              </div>
            </div>

            {/* 조언 & 주의 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h4 className="font-semibold text-green-700 mb-2">💡 올해의 조언</h4>
                <p className="text-sm text-green-700">{result.advice}</p>
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h4 className="font-semibold text-red-700 mb-2">⚠️ 주의사항</h4>
                <p className="text-sm text-red-700">{result.caution}</p>
              </div>
            </div>
          </div>
        )}

        {/* 12띠 순위표 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">2026년 12띠 운세 순위</h3>
          <div className="space-y-2">
            {ranking.map((item) => (
              <div
                key={item.zodiac}
                className={`flex items-center justify-between p-3 rounded-xl ${
                  result?.zodiac === item.zodiac ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <RankingBadge ranking={item.ranking} />
                  <span className="text-xl">{animalEmojis[item.animal]}</span>
                  <span className="font-medium">{item.animal}띠</span>
                </div>
                <span className="font-semibold text-gray-700">{item.score}점</span>
              </div>
            ))}
          </div>
        </div>

        {/* 다른 도구 링크 */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-sm text-gray-500">더 자세한 운세를 원하시면?</p>
          <div className="flex justify-center gap-4">
            <a
              href="/ko/tools/saju"
              className="text-red-600 font-medium hover:text-red-700"
            >
              무료 사주팔자 →
            </a>
            <a
              href="/ko/tools/today-fortune"
              className="text-orange-600 font-medium hover:text-orange-700"
            >
              오늘의 운세 →
            </a>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          * 운세는 재미로 보시고, 좋은 일만 가득하시길 바랍니다!
        </p>
      </div>
    </div>
  );
}
