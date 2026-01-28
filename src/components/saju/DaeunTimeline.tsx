'use client';

import type { DaeunInfo, SaeunInfo } from '@/lib/saju/types';
import { OHAENG_COLORS, CHEONGAN_OHAENG, JIJI_OHAENG } from '@/lib/saju/constants';

interface DaeunTimelineProps {
  daeun: DaeunInfo[];
  saeun: SaeunInfo;
}

export default function DaeunTimeline({ daeun, saeun }: DaeunTimelineProps) {
  return (
    <div className="bg-white border rounded-xl p-4 sm:p-6">
      <h3 className="text-lg font-bold mb-4">대운 흐름</h3>

      {/* 대운 */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-max">
          {daeun.map((d, i) => {
            const cColor = OHAENG_COLORS[CHEONGAN_OHAENG[d.cheongan]];
            const jColor = OHAENG_COLORS[JIJI_OHAENG[d.jiji]];

            return (
              <div
                key={i}
                className={`flex flex-col items-center p-2 rounded-lg min-w-[60px] transition-all ${
                  d.isCurrent
                    ? 'bg-amber-50 ring-2 ring-amber-400 shadow-md scale-105'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <span className="text-[10px] text-gray-400 mb-1">
                  {d.startAge}~{d.endAge}세
                </span>
                <span className="text-lg font-bold" style={{ color: cColor }}>
                  {d.cheonganHanja}
                </span>
                <span className="text-lg font-bold" style={{ color: jColor }}>
                  {d.jijiHanja}
                </span>
                {d.isCurrent && (
                  <span className="text-[10px] text-amber-600 font-medium mt-1">현재</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 세운 */}
      <div className="mt-4 pt-4 border-t">
        <h4 className="text-sm font-semibold text-gray-600 mb-2">{saeun.year}년 세운</h4>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <span
              className="text-2xl font-bold"
              style={{ color: OHAENG_COLORS[CHEONGAN_OHAENG[saeun.cheongan]] }}
            >
              {saeun.cheonganHanja}
            </span>
            <span
              className="text-2xl font-bold"
              style={{ color: OHAENG_COLORS[JIJI_OHAENG[saeun.jiji]] }}
            >
              {saeun.jijiHanja}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            ({saeun.cheongan}{saeun.jiji}년)
          </span>
        </div>
      </div>
    </div>
  );
}
