'use client';

import type { OhaengDistribution, OhaengType } from '@/lib/saju/types';
import { OHAENG_COLORS } from '@/lib/saju/constants';

interface OhaengChartProps {
  distribution: OhaengDistribution;
}

const OHAENG_LABELS: Record<OhaengType, { ko: string; hanja: string }> = {
  '목': { ko: '목', hanja: '木' },
  '화': { ko: '화', hanja: '火' },
  '토': { ko: '토', hanja: '土' },
  '금': { ko: '금', hanja: '金' },
  '수': { ko: '수', hanja: '水' },
};

export default function OhaengChart({ distribution }: OhaengChartProps) {
  const total = Object.values(distribution).reduce((sum, v) => sum + v, 0);
  const entries = Object.entries(distribution) as [OhaengType, number][];
  const maxVal = Math.max(...entries.map(([, v]) => v), 1);

  return (
    <div className="bg-white border rounded-xl p-4 sm:p-6">
      <h3 className="text-lg font-bold mb-4">오행 분포</h3>

      <div className="space-y-3">
        {entries.map(([ohaeng, count]) => {
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          const barWidth = total > 0 ? (count / maxVal) * 100 : 0;
          const color = OHAENG_COLORS[ohaeng];
          const label = OHAENG_LABELS[ohaeng];

          return (
            <div key={ohaeng} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-14 shrink-0">
                <span className="text-lg font-bold" style={{ color }}>
                  {label.hanja}
                </span>
                <span className="text-xs text-gray-500">{label.ko}</span>
              </div>

              <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${barWidth}%`, backgroundColor: color }}
                />
              </div>

              <div className="w-16 text-right shrink-0">
                <span className="text-sm font-medium">{count}개</span>
                <span className="text-xs text-gray-400 ml-1">({pct}%)</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 과다/부족 표시 */}
      <div className="mt-4 flex flex-wrap gap-2">
        {entries.map(([ohaeng, count]) => {
          if (count === 0) {
            return (
              <span key={ohaeng} className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded-full">
                {OHAENG_LABELS[ohaeng].hanja} 부족
              </span>
            );
          }
          if (count >= 3) {
            return (
              <span key={ohaeng} className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                {OHAENG_LABELS[ohaeng].hanja} 과다
              </span>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
