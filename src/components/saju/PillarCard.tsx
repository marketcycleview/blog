'use client';

import type { Pillar } from '@/lib/saju/types';
import { OHAENG_COLORS } from '@/lib/saju/constants';

interface PillarCardProps {
  pillar: Pillar;
  label: string;
  isIlgan?: boolean;
}

export default function PillarCard({ pillar, label, isIlgan = false }: PillarCardProps) {
  const cheonganColor = OHAENG_COLORS[pillar.cheonganOhaeng];
  const jijiColor = OHAENG_COLORS[pillar.jijiOhaeng];

  return (
    <div className={`flex flex-col items-center gap-1 ${isIlgan ? 'ring-2 ring-amber-400 rounded-xl p-1' : ''}`}>
      <span className="text-xs text-gray-500 font-medium">{label}</span>

      <div className="flex flex-col items-center bg-white border rounded-xl overflow-hidden shadow-sm w-[72px]">
        {/* 천간 */}
        <div
          className="w-full py-3 flex flex-col items-center"
          style={{ backgroundColor: `${cheonganColor}15` }}
        >
          <span className="text-2xl font-bold" style={{ color: cheonganColor }}>
            {pillar.cheonganHanja}
          </span>
          <span className="text-xs text-gray-500">{pillar.cheongan}</span>
          <span className="text-[10px] mt-0.5" style={{ color: cheonganColor }}>
            {pillar.cheonganOhaeng} · {pillar.cheonganYinYang}
          </span>
        </div>

        {/* 구분선 */}
        <div className="w-full h-px bg-gray-200" />

        {/* 지지 */}
        <div
          className="w-full py-3 flex flex-col items-center"
          style={{ backgroundColor: `${jijiColor}15` }}
        >
          <span className="text-2xl font-bold" style={{ color: jijiColor }}>
            {pillar.jijiHanja}
          </span>
          <span className="text-xs text-gray-500">{pillar.jiji}</span>
          <span className="text-[10px] mt-0.5" style={{ color: jijiColor }}>
            {pillar.jijiOhaeng} · {pillar.jijiYinYang}
          </span>
        </div>
      </div>

      {/* 지장간 */}
      <div className="flex gap-1 mt-1">
        {pillar.jijiJijanggan.map((jj, i) => (
          <span key={i} className="text-[10px] px-1 py-0.5 bg-gray-100 rounded text-gray-500">
            {jj}
          </span>
        ))}
      </div>
    </div>
  );
}
