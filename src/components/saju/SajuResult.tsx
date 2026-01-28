'use client';

import { useState } from 'react';
import type { SajuResult as SajuResultType } from '@/lib/saju/types';
import { analyzeOhaeng } from '@/lib/saju/ohaeng-analyzer';
import { JIJI_ANIMAL, JIJI } from '@/lib/saju/constants';
import PillarCard from './PillarCard';
import OhaengChart from './OhaengChart';
import DaeunTimeline from './DaeunTimeline';

interface SajuResultProps {
  result: SajuResultType;
}

type TabType = 'basic' | 'personality' | 'career' | 'relationship' | 'health' | 'lucky';

export default function SajuResult({ result }: SajuResultProps) {
  const [activeTab, setActiveTab] = useState<TabType>('basic');
  const ohaengAnalysis = analyzeOhaeng(result.ohaeng, result.ilgan);
  const yearAnimalIndex = JIJI.indexOf(result.yearPillar.jiji);
  const yearAnimal = JIJI_ANIMAL[yearAnimalIndex];

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'basic', label: '기본 분석', icon: '📊' },
    { id: 'personality', label: '성격', icon: '👤' },
    { id: 'career', label: '직업/적성', icon: '💼' },
    { id: 'relationship', label: '대인관계', icon: '🤝' },
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
        <div className="flex overflow-x-auto border-b bg-gray-50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* 탭 콘텐츠 */}
        <div className="p-4 sm:p-6 max-h-[500px] overflow-y-auto">
          {renderTabContent()}
        </div>
      </div>

      {/* 대운 */}
      <DaeunTimeline daeun={result.daeun} saeun={result.saeun} />
    </div>
  );
}
