'use client';

import { useState, useMemo } from 'react';
import type { SajuResult as SajuResultType } from '@/lib/saju/types';
import { analyzeOhaeng } from '@/lib/saju/ohaeng-analyzer';
import { analyzeSibsin } from '@/lib/saju/sibsin-analyzer';
import { analyzeSinsal } from '@/lib/saju/sinsal-analyzer';
import { JIJI_ANIMAL, JIJI } from '@/lib/saju/constants';
import PillarCard from './PillarCard';
import OhaengChart from './OhaengChart';
import DaeunTimeline from './DaeunTimeline';

interface SajuResultProps {
  result: SajuResultType;
}

type TabType = 'basic' | 'personality' | 'career' | 'relationship' | 'health' | 'lucky' | 'sibsin' | 'sinsal';

export default function SajuResult({ result }: SajuResultProps) {
  const [activeTab, setActiveTab] = useState<TabType>('basic');

  const ohaengAnalysis = useMemo(() => analyzeOhaeng(result.ohaeng, result.ilgan), [result]);
  const sibsinAnalysis = useMemo(() => analyzeSibsin(result), [result]);
  const sinsalAnalysis = useMemo(() => analyzeSinsal(result), [result]);

  const yearAnimalIndex = JIJI.indexOf(result.yearPillar.jiji);
  const yearAnimal = JIJI_ANIMAL[yearAnimalIndex];

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'basic', label: '기본', icon: '📊' },
    { id: 'personality', label: '성격', icon: '👤' },
    { id: 'sibsin', label: '십신', icon: '🔮' },
    { id: 'sinsal', label: '신살', icon: '⚡' },
    { id: 'career', label: '직업', icon: '💼' },
    { id: 'relationship', label: '관계', icon: '🤝' },
    { id: 'health', label: '건강', icon: '🏥' },
    { id: 'lucky', label: '행운', icon: '🍀' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed font-mono">
            {ohaengAnalysis.analysis}
          </div>
        );
      case 'personality':
        return (
          <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed font-mono">
            {ohaengAnalysis.personalityAnalysis}
          </div>
        );
      case 'sibsin':
        return (
          <div className="space-y-4">
            <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed font-mono">
              {sibsinAnalysis.analysis}
            </div>
            <div className="border-t pt-4">
              <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed font-mono">
                {sibsinAnalysis.detailAnalysis}
              </div>
            </div>
          </div>
        );
      case 'sinsal':
        return (
          <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed font-mono">
            {sinsalAnalysis.analysis}
          </div>
        );
      case 'career':
        return (
          <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed font-mono">
            {ohaengAnalysis.careerAnalysis}
          </div>
        );
      case 'relationship':
        return (
          <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed font-mono">
            {ohaengAnalysis.relationshipAnalysis}
          </div>
        );
      case 'health':
        return (
          <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed font-mono">
            {ohaengAnalysis.healthAnalysis}
          </div>
        );
      case 'lucky':
        return (
          <div className="space-y-4">
            <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed font-mono">
              {ohaengAnalysis.luckyElements}
            </div>
            <div className="border-t pt-4">
              <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed font-mono">
                {ohaengAnalysis.balanceAnalysis}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

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

      {/* 탭 네비게이션 */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="flex overflow-x-auto border-b bg-gray-50 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-3 sm:px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* 탭 콘텐츠 */}
        <div className="p-4 sm:p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* 대운 */}
      <DaeunTimeline daeun={result.daeun} saeun={result.saeun} />

      {/* 다른 운세 도구 링크 */}
      <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-6 border">
        <h3 className="font-semibold text-gray-900 mb-4 text-center">다른 운세도 확인해보세요</h3>
        <div className="grid grid-cols-2 gap-4">
          <a
            href="/ko/tools/today-fortune"
            className="flex flex-col items-center p-4 bg-white rounded-xl border hover:border-orange-300 hover:shadow-md transition-all group"
          >
            <span className="text-3xl mb-2">🌅</span>
            <span className="font-medium text-gray-800 group-hover:text-orange-600">오늘의 운세</span>
            <span className="text-xs text-gray-500 mt-1">매일 달라지는 일진 운세</span>
          </a>
          <a
            href="/ko/tools/zodiac-fortune"
            className="flex flex-col items-center p-4 bg-white rounded-xl border hover:border-red-300 hover:shadow-md transition-all group"
          >
            <span className="text-3xl mb-2">🐴</span>
            <span className="font-medium text-gray-800 group-hover:text-red-600">2026 띠별 운세</span>
            <span className="text-xs text-gray-500 mt-1">병오년 12띠 운세</span>
          </a>
        </div>
      </div>
    </div>
  );
}
