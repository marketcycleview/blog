"use client";

import { useState, useMemo, useCallback } from "react";
import { financialHealthQuiz } from "@/lib/tools/quiz/data/financial-health";
import { calculateQuizResult } from "@/lib/tools/quiz/scoring";
import type { QuizResult, CategoryScore } from "@/lib/tools/quiz/types";

// ─── 레이더 차트 (SVG) ───
function RadarChart({ categories }: { categories: CategoryScore[] }) {
  const size = 240;
  const center = size / 2;
  const radius = 90;
  const count = categories.length;

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // 배경 그리드
  const gridLevels = [25, 50, 75, 100];
  const gridPaths = gridLevels.map((level) => {
    const points = Array.from({ length: count }, (_, i) => {
      const p = getPoint(i, level);
      return `${p.x},${p.y}`;
    });
    return `M${points.join("L")}Z`;
  });

  // 데이터 경로
  const dataPoints = categories.map((cat, i) => {
    const p = getPoint(i, cat.percent);
    return `${p.x},${p.y}`;
  });
  const dataPath = `M${dataPoints.join("L")}Z`;

  // 축 라인
  const axisLines = categories.map((_, i) => {
    const p = getPoint(i, 100);
    return { x1: center, y1: center, x2: p.x, y2: p.y };
  });

  // 라벨 위치
  const labels = categories.map((cat, i) => {
    const p = getPoint(i, 120);
    return { ...p, text: cat.category, score: cat.percent };
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[280px] mx-auto">
      {/* 그리드 */}
      {gridPaths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
      ))}
      {/* 축 */}
      {axisLines.map((line, i) => (
        <line key={i} {...line} stroke="#e5e7eb" strokeWidth="0.5" />
      ))}
      {/* 데이터 */}
      <path d={dataPath} fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2" />
      {/* 데이터 점 */}
      {categories.map((cat, i) => {
        const p = getPoint(i, cat.percent);
        return <circle key={i} cx={p.x} cy={p.y} r="4" fill="#3b82f6" />;
      })}
      {/* 라벨 */}
      {labels.map((l, i) => (
        <text
          key={i}
          x={l.x}
          y={l.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-[10px] fill-gray-600 font-medium"
        >
          {l.text} {l.score}%
        </text>
      ))}
    </svg>
  );
}

// ─── 결과 화면 ───
function ResultView({ result, onReset }: { result: QuizResult; onReset: () => void }) {
  const [shareText] = useState(
    `나의 재무 건강 점수는 ${result.percent}점 (${result.grade.label})! 당신은 몇 점? 👉 infotalker.com/ko/tools/financial-health-score`
  );

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "나의 재무 건강 점수", text: shareText });
      } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(shareText);
      alert("결과가 클립보드에 복사되었습니다!");
    }
  }, [shareText]);

  return (
    <div className="space-y-6">
      {/* 점수 카드 */}
      <div className={`${result.grade.color} rounded-xl p-6 text-white text-center`}>
        <p className="text-white/80 text-sm mb-1">나의 재무 건강 점수</p>
        <p className="text-6xl font-bold">{result.percent}<span className="text-2xl">점</span></p>
        <div className="mt-3 inline-block px-4 py-1 bg-white/20 rounded-full">
          <span className="text-lg font-bold">{result.grade.grade}등급</span>
          <span className="ml-2">{result.grade.label}</span>
        </div>
        <p className="mt-3 text-white/80 text-sm">{result.grade.description}</p>
      </div>

      {/* 레이더 차트 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">영역별 분석</h3>
        <RadarChart categories={result.categories} />
      </div>

      {/* 영역별 상세 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <h3 className="text-lg font-bold text-gray-900">영역별 점수</h3>
        {result.categories.map((cat) => (
          <div key={cat.category}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">{cat.category}</span>
              <span className="text-sm font-bold">{cat.percent}점</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
              <div
                className={`h-2.5 rounded-full transition-all ${
                  cat.percent >= 70 ? "bg-green-500" : cat.percent >= 40 ? "bg-yellow-500" : "bg-red-500"
                }`}
                style={{ width: `${cat.percent}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">{cat.comment}</p>
          </div>
        ))}
      </div>

      {/* 개선 제안 */}
      {result.suggestions.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="font-bold text-blue-900 mb-2">개선 제안</p>
          <ul className="space-y-2 text-sm text-blue-800">
            {result.suggestions.map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 액션 버튼 */}
      <div className="flex gap-3">
        <button
          onClick={handleShare}
          className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
        >
          결과 공유하기
        </button>
        <button
          onClick={onReset}
          className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
        >
          다시 진단
        </button>
      </div>
    </div>
  );
}

// ─── 메인 컴포넌트 ───
export default function FinancialHealthScore() {
  const quiz = financialHealthQuiz;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[currentIndex];
  const progress = Math.round((currentIndex / totalQuestions) * 100);

  const handleSelect = (score: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: score };
    setAnswers(newAnswers);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // 마지막 문제 → 결과 계산
      const res = calculateQuizResult(quiz, newAnswers);
      setResult(res);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
  };

  // 결과 화면
  if (result) {
    return <ResultView result={result} onReset={handleReset} />;
  }

  // 진단 화면
  return (
    <div className="space-y-6">
      {/* 진행률 */}
      <div className="bg-white border rounded-xl p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            {currentIndex + 1} / {totalQuestions}
          </span>
          <span className="text-sm font-medium text-gray-700">{currentQuestion.category}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 질문 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          {currentQuestion.question}
        </h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleSelect(option.score)}
              className="w-full text-left px-4 py-3 border-2 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors"
            >
              <span className="text-gray-800">{option.label}</span>
            </button>
          ))}
        </div>

        {currentIndex > 0 && (
          <button
            onClick={handleBack}
            className="mt-4 px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
          >
            ← 이전 질문
          </button>
        )}
      </div>
    </div>
  );
}
