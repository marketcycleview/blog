"use client";

import { useState, useMemo, useCallback } from "react";
import { financeIQQuiz } from "@/lib/tools/quiz/data/finance-iq";
import { calculateQuizResult } from "@/lib/tools/quiz/scoring";
import type { QuizResult, CategoryScore } from "@/lib/tools/quiz/types";

function RadarChart({ categories }: { categories: CategoryScore[] }) {
  const size = 240; const center = size / 2; const radius = 90; const count = categories.length;
  const getPoint = (i: number, v: number) => { const a = (Math.PI * 2 * i) / count - Math.PI / 2; const r = (v / 100) * radius; return { x: center + r * Math.cos(a), y: center + r * Math.sin(a) }; };
  const gridPaths = [25, 50, 75, 100].map((l) => { const pts = Array.from({ length: count }, (_, i) => { const p = getPoint(i, l); return `${p.x},${p.y}`; }); return `M${pts.join("L")}Z`; });
  const dataPath = `M${categories.map((_, i) => { const p = getPoint(i, categories[i].percent); return `${p.x},${p.y}`; }).join("L")}Z`;
  const labels = categories.map((cat, i) => ({ ...getPoint(i, 125), text: cat.category, score: cat.percent }));

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[280px] mx-auto">
      {gridPaths.map((d, i) => <path key={i} d={d} fill="none" stroke="#e5e7eb" strokeWidth="0.5" />)}
      {categories.map((_, i) => { const p = getPoint(i, 100); return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#e5e7eb" strokeWidth="0.5" />; })}
      <path d={dataPath} fill="rgba(234, 179, 8, 0.2)" stroke="#eab308" strokeWidth="2" />
      {categories.map((_, i) => { const p = getPoint(i, categories[i].percent); return <circle key={i} cx={p.x} cy={p.y} r="4" fill="#eab308" />; })}
      {labels.map((l, i) => <text key={i} x={l.x} y={l.y} textAnchor="middle" dominantBaseline="middle" className="text-[9px] fill-gray-600 font-medium">{l.text} {l.score}%</text>)}
    </svg>
  );
}

function ResultView({ result, onReset }: { result: QuizResult; onReset: () => void }) {
  const shareText = `나의 금융 IQ는 ${result.percent}점 (${result.grade.label})! 당신의 금융 IQ는? 👉 infotalker.com/ko/tools/finance-iq-test`;
  const handleShare = useCallback(async () => {
    if (navigator.share) { try { await navigator.share({ title: "금융 IQ 테스트", text: shareText }); } catch {} }
    else { await navigator.clipboard.writeText(shareText); alert("결과가 클립보드에 복사되었습니다!"); }
  }, [shareText]);

  return (
    <div className="space-y-6">
      <div className={`${result.grade.color} rounded-xl p-6 text-white text-center`}>
        <p className="text-white/80 text-sm mb-1">나의 금융 IQ</p>
        <p className="text-6xl font-bold">{result.percent}<span className="text-2xl">점</span></p>
        <div className="mt-3 inline-block px-4 py-1 bg-white/20 rounded-full">
          <span className="text-lg font-bold">{result.grade.grade}등급</span>
          <span className="ml-2">{result.grade.label}</span>
        </div>
        <p className="mt-3 text-white/80 text-sm">{result.grade.description}</p>
        <p className="text-white/60 text-xs mt-2">{result.totalScore} / {result.maxScore} 정답</p>
      </div>

      <div className="bg-white border rounded-xl p-4 sm:p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">영역별 분석</h3>
        <RadarChart categories={result.categories} />
      </div>

      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <h3 className="text-lg font-bold text-gray-900">영역별 정답률</h3>
        {result.categories.map((cat) => (
          <div key={cat.category}>
            <div className="flex justify-between mb-1"><span className="text-sm font-medium">{cat.category}</span><span className="text-sm font-bold">{cat.percent}%</span></div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
              <div className={`h-2.5 rounded-full ${cat.percent >= 70 ? "bg-green-500" : cat.percent >= 40 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${cat.percent}%` }} />
            </div>
            <p className="text-xs text-gray-500">{cat.comment}</p>
          </div>
        ))}
      </div>

      {result.suggestions.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="font-bold text-yellow-900 mb-2">공부하면 좋은 분야</p>
          <ul className="space-y-2 text-sm text-yellow-800">
            {result.suggestions.map((s, i) => <li key={i} className="flex gap-2"><span className="text-yellow-500">•</span><span>{s}</span></li>)}
          </ul>
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={handleShare} className="flex-1 py-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-colors">결과 공유하기</button>
        <button onClick={onReset} className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors">다시 테스트</button>
      </div>
    </div>
  );
}

export default function FinanceIQTest() {
  const quiz = financeIQQuiz;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  const total = quiz.questions.length;
  const current = quiz.questions[currentIndex];
  const progress = Math.round((currentIndex / total) * 100);

  const handleSelect = (score: number) => {
    const newAnswers = { ...answers, [current.id]: score };
    setAnswers(newAnswers);
    if (currentIndex < total - 1) setCurrentIndex((p) => p + 1);
    else setResult(calculateQuizResult(quiz, newAnswers));
  };

  if (result) return <ResultView result={result} onReset={() => { setCurrentIndex(0); setAnswers({}); setResult(null); }} />;

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-xl p-4">
        <div className="flex justify-between mb-2"><span className="text-sm text-gray-500">{currentIndex + 1} / {total}</span><span className="text-sm font-medium text-yellow-600">{current.category}</span></div>
        <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-yellow-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} /></div>
      </div>
      <div className="bg-white border rounded-xl p-4 sm:p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">{current.question}</h2>
        <div className="space-y-3">
          {current.options.map((opt, i) => (
            <button key={i} onClick={() => handleSelect(opt.score)} className="w-full text-left px-4 py-3 border-2 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-colors">
              <span className="text-gray-800">{opt.label}</span>
            </button>
          ))}
        </div>
        {currentIndex > 0 && <button onClick={() => setCurrentIndex((p) => p - 1)} className="mt-4 px-4 py-2 text-sm text-gray-500 hover:text-gray-700">← 이전 질문</button>}
      </div>
    </div>
  );
}
