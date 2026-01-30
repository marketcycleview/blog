"use client";

import { useState, useMemo } from "react";
import { taxQuizConfig } from "@/lib/tools/quiz/data/tax-quiz";
import { calculateQuizResult } from "@/lib/tools/quiz/scoring";
import type { QuizResult } from "@/lib/tools/quiz/types";

export default function TaxKnowledgeQuiz() {
  const config = taxQuizConfig;
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  const total = config.questions.length;
  const current = config.questions[idx];

  const handleSelect = (score: number) => {
    const newA = { ...answers, [current.id]: score };
    setAnswers(newA);
    if (idx < total - 1) setIdx((p) => p + 1);
    else setResult(calculateQuizResult(config, newA));
  };

  const reset = () => { setIdx(0); setAnswers({}); setResult(null); };

  const maxCatScore = useMemo(() => {
    if (!result) return 100;
    return Math.max(...result.categories.map((c) => c.maxScore), 1);
  }, [result]);

  if (result) return (
    <div className="space-y-6">
      <div className={`${result.grade.color} rounded-xl p-6 text-white text-center`}>
        <p className="text-sm opacity-80 mb-1">세금 상식 등급</p>
        <p className="text-5xl font-bold">{result.grade.grade}</p>
        <p className="text-xl font-bold mt-2">{result.grade.label}</p>
        <p className="text-sm mt-2 opacity-90">{result.percent}점 / 100점</p>
      </div>
      <div className="bg-white border rounded-xl p-4 sm:p-6">
        <p className="text-sm text-gray-600 mb-4">{result.grade.description}</p>
        <h3 className="font-bold text-gray-900 mb-3">영역별 분석</h3>
        <div className="space-y-3">
          {result.categories.map((cat) => (
            <div key={cat.category}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{cat.category}</span>
                <span className="font-bold">{cat.percent}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className={`h-3 rounded-full ${cat.percent >= 80 ? "bg-green-500" : cat.percent >= 50 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${cat.percent}%` }} />
              </div>
              <p className="text-xs text-gray-400 mt-1">{cat.comment}</p>
            </div>
          ))}
        </div>
      </div>
      {result.suggestions.length > 0 && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <h3 className="font-bold text-purple-800 mb-2">개선 제안</h3>
          <ul className="space-y-1 text-sm text-purple-700 list-disc list-inside">
            {result.suggestions.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}
      <button onClick={reset} className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200">다시 풀기</button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-xl p-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-500">{idx + 1} / {total}</span>
          <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded">{current.category}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-purple-600 h-2 rounded-full transition-all" style={{ width: `${Math.round((idx / total) * 100)}%` }} /></div>
      </div>
      <div className="bg-white border rounded-xl p-4 sm:p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">{current.question}</h2>
        <div className="space-y-3">
          {current.options.map((o, oi) => (
            <button key={oi} onClick={() => handleSelect(o.score)}
              className="w-full text-left px-4 py-3 border-2 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-colors">
              <span className="text-gray-800">{o.label}</span>
            </button>
          ))}
        </div>
        {idx > 0 && <button onClick={() => setIdx((p) => p - 1)} className="mt-4 px-4 py-2 text-sm text-gray-500 hover:text-gray-700">← 이전</button>}
      </div>
    </div>
  );
}
