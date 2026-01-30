"use client";

import { useState } from "react";
import { loanFinderConfig } from "@/lib/tools/decision-tree/data/loan-finder";
import type { TreeResult, TreeRecommendation } from "@/lib/tools/decision-tree/types";

// ─── 적합도 별 표시 ───
function FitStars({ fit }: { fit: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < fit ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
}

// ─── 추천 카드 ───
function RecommendationCard({ item, rank }: { item: TreeRecommendation; rank: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`border rounded-xl overflow-hidden ${rank === 1 ? "border-blue-400 ring-2 ring-blue-100" : ""}`}>
      {/* 헤더 */}
      <div className="p-4 flex items-start gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
          rank === 1 ? "bg-blue-600" : rank === 2 ? "bg-gray-500" : "bg-gray-400"
        }`}>
          {rank}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-bold text-gray-900">{item.name}</h4>
            {rank === 1 && (
              <span className="px-2 py-0.5 text-xs font-bold bg-blue-100 text-blue-700 rounded">
                최적 추천
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">{item.provider}</p>
          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-gray-400">적합도</span>
            <FitStars fit={item.fit} />
          </div>
        </div>
      </div>

      {/* 핵심 정보 */}
      <div className="px-4 pb-3 grid grid-cols-3 gap-2 text-center">
        {item.rate && (
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-xs text-gray-400">금리</p>
            <p className="text-sm font-bold text-gray-900">{item.rate}</p>
          </div>
        )}
        {item.limit && (
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-xs text-gray-400">한도</p>
            <p className="text-sm font-bold text-gray-900">{item.limit}</p>
          </div>
        )}
        {item.period && (
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-xs text-gray-400">기간</p>
            <p className="text-sm font-bold text-gray-900">{item.period}</p>
          </div>
        )}
      </div>

      {/* 상세 토글 */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 border-t transition-colors"
      >
        {expanded ? "접기 ▲" : "상세 보기 ▼"}
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t">
          <div className="pt-3">
            <p className="text-xs font-medium text-gray-500 mb-2">특징</p>
            <div className="flex flex-wrap gap-1">
              {item.features.map((f, i) => (
                <span key={i} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── 결과 화면 ───
function ResultView({ result, onReset }: { result: TreeResult; onReset: () => void }) {
  return (
    <div className="space-y-6">
      {/* 결과 헤더 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white text-center">
        <p className="text-blue-100 text-sm mb-1">추천 결과</p>
        <p className="text-2xl font-bold">{result.title}</p>
        <p className="text-blue-200 text-sm mt-2">{result.summary}</p>
      </div>

      {/* 추천 목록 */}
      <div className="space-y-4">
        {result.recommendations.map((item, i) => (
          <RecommendationCard key={item.id} item={item} rank={i + 1} />
        ))}
      </div>

      {result.recommendations.length === 0 && (
        <div className="bg-gray-50 rounded-xl p-6 text-center">
          <p className="text-gray-600">입력하신 조건에 정확히 맞는 상품을 찾지 못했습니다.</p>
          <p className="text-gray-500 text-sm mt-2">조건을 변경하거나, 은행 창구를 방문하여 상담받으시길 권합니다.</p>
        </div>
      )}

      {/* 주의사항 */}
      {result.warning && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
          <p className="font-medium mb-1">주의사항</p>
          <p>{result.warning}</p>
        </div>
      )}

      {/* 비교표 */}
      {result.recommendations.length > 1 && (
        <div className="bg-white border rounded-xl p-4 sm:p-6 overflow-x-auto">
          <h3 className="text-lg font-bold text-gray-900 mb-4">추천 상품 비교</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">상품</th>
                <th className="py-2 text-left">금리</th>
                <th className="py-2 text-left">한도</th>
                <th className="py-2 text-left">기간</th>
                <th className="py-2 text-center">적합도</th>
              </tr>
            </thead>
            <tbody>
              {result.recommendations.map((item, i) => (
                <tr key={item.id} className={`border-b ${i === 0 ? "bg-blue-50 font-medium" : ""}`}>
                  <td className="py-2">{item.name}</td>
                  <td className="py-2">{item.rate || "-"}</td>
                  <td className="py-2">{item.limit || "-"}</td>
                  <td className="py-2">{item.period || "-"}</td>
                  <td className="py-2 text-center"><FitStars fit={item.fit} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 다시 하기 */}
      <button
        onClick={onReset}
        className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
      >
        다시 찾기
      </button>
    </div>
  );
}

// ─── 메인 컴포넌트 ───
export default function LoanFinder() {
  const config = loanFinderConfig;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<TreeResult | null>(null);

  const totalQuestions = config.questions.length;
  const currentQuestion = config.questions[currentIndex];
  const progress = Math.round(((currentIndex) / totalQuestions) * 100);

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      const res = config.getResult(newAnswers);
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

  if (result) {
    return <ResultView result={result} onReset={handleReset} />;
  }

  return (
    <div className="space-y-6">
      {/* 진행률 */}
      <div className="bg-white border rounded-xl p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            {currentIndex + 1} / {totalQuestions}
          </span>
          <span className="text-sm font-medium text-blue-600">{progress}%</span>
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
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          {currentQuestion.question}
        </h2>
        {currentQuestion.description && (
          <p className="text-sm text-gray-500 mb-4">{currentQuestion.description}</p>
        )}

        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full text-left px-4 py-3 border-2 rounded-xl transition-colors ${
                answers[currentQuestion.id] === option.value
                  ? "border-blue-500 bg-blue-50"
                  : "hover:border-blue-400 hover:bg-blue-50"
              }`}
            >
              <span className="font-medium text-gray-800">{option.label}</span>
              {option.description && (
                <span className="block text-sm text-gray-500 mt-1">{option.description}</span>
              )}
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
