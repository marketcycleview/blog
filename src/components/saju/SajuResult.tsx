'use client';

import type { SajuResult as SajuResultType } from '@/lib/saju/types';
import { analyzeOhaeng } from '@/lib/saju/ohaeng-analyzer';
import { JIJI_ANIMAL, JIJI } from '@/lib/saju/constants';
import PillarCard from './PillarCard';
import OhaengChart from './OhaengChart';
import DaeunTimeline from './DaeunTimeline';

interface SajuResultProps {
  result: SajuResultType;
}

export default function SajuResult({ result }: SajuResultProps) {
  const ohaengAnalysis = analyzeOhaeng(result.ohaeng, result.ilgan);
  const yearAnimalIndex = JIJI.indexOf(result.yearPillar.jiji);
  const yearAnimal = JIJI_ANIMAL[yearAnimalIndex];

  return (
    <div className="space-y-6 mt-8">
      {/* 기본 정보 */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl p-6 text-center">
        <h2 className="text-xl font-bold mb-2">사주팔자 결과</h2>
        <p className="text-slate-300 text-sm">
          {result.birthDate.getFullYear()}년{' '}
          {result.birthDate.getMonth() + 1}월{' '}
          {result.birthDate.getDate()}일생 · {yearAnimal}띠
        </p>
      </div>

      {/* 사주 4기둥 */}
      <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
        <div className="flex justify-center gap-3 sm:gap-6">
          <PillarCard pillar={result.hourPillar} label="시주" />
          <PillarCard pillar={result.dayPillar} label="일주" isIlgan />
          <PillarCard pillar={result.monthPillar} label="월주" />
          <PillarCard pillar={result.yearPillar} label="년주" />
        </div>
        <p className="text-center text-xs text-gray-400 mt-3">
          * 일주(노란 테두리)의 천간이 &quot;나&quot;를 나타냅니다
        </p>
      </div>

      {/* 오행 분포 */}
      <OhaengChart distribution={result.ohaeng} />

      {/* 오행 분석 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6">
        <h3 className="text-lg font-bold mb-3">오행 분석</h3>
        <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
          {ohaengAnalysis.analysis}
        </div>
      </div>

      {/* 대운 */}
      <DaeunTimeline daeun={result.daeun} saeun={result.saeun} />
    </div>
  );
}
