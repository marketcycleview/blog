"use client";

import { useState } from "react";
import { disputeResolverConfig } from "@/lib/tools/decision-tree/data/dispute-resolver";
import type { TreeResult, TreeRecommendation } from "@/lib/tools/decision-tree/types";

function FitStars({ fit }: { fit: number }) {
  return <div className="flex gap-0.5">{Array.from({ length: 5 }, (_, i) => <span key={i} className={i < fit ? "text-yellow-400" : "text-gray-300"}>★</span>)}</div>;
}

function RecommendationCard({ item, rank }: { item: TreeRecommendation; rank: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden ${rank === 1 ? "border-red-400 ring-2 ring-red-100" : ""}`}>
      <div className="p-4 flex items-start gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${rank === 1 ? "bg-red-600" : rank === 2 ? "bg-gray-500" : "bg-gray-400"}`}>{rank}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-bold text-gray-900">{item.name}</h4>
            {rank === 1 && <span className="px-2 py-0.5 text-xs font-bold bg-red-100 text-red-700 rounded">최우선 추천</span>}
          </div>
          <p className="text-sm text-gray-500">{item.provider}</p>
          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          <div className="flex items-center gap-2 mt-2"><span className="text-xs text-gray-400">적합도</span><FitStars fit={item.fit} /></div>
        </div>
      </div>
      <div className="px-4 pb-3 grid grid-cols-3 gap-2 text-center">
        {item.rate && <div className="bg-gray-50 rounded-lg p-2"><p className="text-xs text-gray-400">비용</p><p className="text-sm font-bold">{item.rate}</p></div>}
        {item.limit && <div className="bg-gray-50 rounded-lg p-2"><p className="text-xs text-gray-400">대상</p><p className="text-sm font-bold">{item.limit}</p></div>}
        {item.period && <div className="bg-gray-50 rounded-lg p-2"><p className="text-xs text-gray-400">소요기간</p><p className="text-sm font-bold">{item.period}</p></div>}
      </div>
      <button onClick={() => setExpanded(!expanded)} className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t transition-colors">{expanded ? "접기 ▲" : "상세 ▼"}</button>
      {expanded && (
        <div className="px-4 pb-4 border-t pt-3">
          <div className="flex flex-wrap gap-1">{item.features.map((f, i) => <span key={i} className="px-2 py-1 text-xs bg-red-50 text-red-700 rounded">{f}</span>)}</div>
          {item.link && <a href={item.link.href} className="inline-block mt-3 text-sm text-red-600 hover:underline font-medium">{item.link.label} →</a>}
        </div>
      )}
    </div>
  );
}

export default function DisputeResolver() {
  const config = disputeResolverConfig;
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<TreeResult | null>(null);

  const total = config.questions.length;
  const current = config.questions[idx];

  const handleSelect = (value: string) => {
    const newA = { ...answers, [current.id]: value };
    setAnswers(newA);
    if (idx < total - 1) setIdx((p) => p + 1);
    else setResult(config.getResult(newA));
  };

  const reset = () => { setIdx(0); setAnswers({}); setResult(null); };

  if (result) return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white text-center">
        <p className="text-red-100 text-sm mb-1">추천 결과</p>
        <p className="text-2xl font-bold">{result.title}</p>
        <p className="text-red-200 text-sm mt-2">{result.summary}</p>
      </div>
      <div className="space-y-4">{result.recommendations.map((item, i) => <RecommendationCard key={item.id} item={item} rank={i + 1} />)}</div>
      {result.warning && <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800"><p className="font-medium mb-1">주의</p><p>{result.warning}</p></div>}
      <button onClick={reset} className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors">다시 진단</button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-xl p-4">
        <div className="flex justify-between mb-2"><span className="text-sm text-gray-500">{idx + 1} / {total}</span></div>
        <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-red-600 h-2 rounded-full transition-all" style={{ width: `${Math.round((idx / total) * 100)}%` }} /></div>
      </div>
      <div className="bg-white border rounded-xl p-4 sm:p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">{current.question}</h2>
        {current.description && <p className="text-sm text-gray-500 mb-4">{current.description}</p>}
        <div className="space-y-3">{current.options.map((o) => <button key={o.value} onClick={() => handleSelect(o.value)} className="w-full text-left px-4 py-3 border-2 rounded-xl hover:border-red-400 hover:bg-red-50 transition-colors"><span className="text-gray-800">{o.label}</span></button>)}</div>
        {idx > 0 && <button onClick={() => setIdx((p) => p - 1)} className="mt-4 px-4 py-2 text-sm text-gray-500 hover:text-gray-700">← 이전</button>}
      </div>
    </div>
  );
}
