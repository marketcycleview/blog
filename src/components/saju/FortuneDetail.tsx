'use client';

import { useMemo } from 'react';
import type { SajuResult } from '@/lib/saju/types';
import { interpretFortune } from '@/lib/saju/fortune-interpreter';

interface FortuneDetailProps {
  saju: SajuResult;
}

function StarRating({ score }: { score: number }) {
  return (
    <span className="text-amber-400">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < score ? '\u2605' : '\u2606'}</span>
      ))}
    </span>
  );
}

export default function FortuneDetail({ saju }: FortuneDetailProps) {
  const fortune = useMemo(() => interpretFortune(saju), [saju]);

  const categoryIcons: Record<string, string> = {
    wealth: '\uD83D\uDCB0',
    love: '\u2764\uFE0F',
    health: '\uD83C\uDFCB\uFE0F',
    career: '\uD83D\uDCBC',
  };

  const categoryNames: Record<string, string> = {
    wealth: '\uC7AC\uBB3C\uC6B4',
    love: '\uC5F0\uC560\uC6B4',
    health: '\uAC74\uAC15\uC6B4',
    career: '\uC9C1\uC5C5\uC6B4',
  };

  return (
    <div className="space-y-6 mt-8">
      {/* 종합 */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl p-6">
        <h2 className="text-xl font-bold mb-2">{fortune.year}년 운세</h2>
        <p className="text-purple-100 text-sm leading-relaxed">{fortune.overall}</p>
      </div>

      {/* 카테고리별 운세 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(Object.entries(fortune.categories) as [string, { name: string; score: number; description: string }][]).map(
          ([key, cat]) => (
            <div key={key} className="bg-white border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">
                  {categoryIcons[key]} {categoryNames[key]}
                </h3>
                <StarRating score={cat.score} />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{cat.description}</p>
            </div>
          )
        )}
      </div>

      {/* 월별 운세 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6">
        <h3 className="text-lg font-bold mb-4">월별 운세</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {fortune.monthlyFortune.map((m) => (
            <div
              key={m.month}
              className={`text-center p-3 rounded-lg ${
                m.score >= 4
                  ? 'bg-green-50 border border-green-200'
                  : m.score <= 2
                  ? 'bg-red-50 border border-red-200'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className="text-sm font-semibold mb-1">{m.month}월</div>
              <StarRating score={m.score} />
              <div className="text-[10px] text-gray-500 mt-1">{m.tip}</div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center">
        * 운세는 참고용이며, 실제 운명은 본인의 노력에 달려있습니다.
      </p>
    </div>
  );
}
