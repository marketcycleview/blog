"use client";

import type { FilterResult } from "@/lib/welfare/types";
import ResultCard from "./ResultCard";

interface ResultListProps {
  results: FilterResult[];
  locale: string;
  isLoading?: boolean;
  isEmpty?: boolean;
  hasFilters?: boolean;
}

export default function ResultList({
  results,
  locale,
  isLoading = false,
  isEmpty = false,
  hasFilters = false,
}: ResultListProps) {
  // 로딩 중
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse"
          >
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-full mb-3" />
            <div className="flex gap-2">
              <div className="h-6 bg-gray-200 rounded w-20" />
              <div className="h-6 bg-gray-200 rounded w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 데이터 로드 전 (필터 선택 안 함)
  if (isEmpty && !hasFilters) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          조건을 선택해주세요
        </h3>
        <p className="text-gray-600">
          위에서 나이, 소득, 상황 등을 선택하면
          <br />
          해당되는 복지 정책을 찾아드립니다.
        </p>
      </div>
    );
  }

  // 결과 없음
  if (results.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <div className="text-4xl mb-4">😢</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          조건에 맞는 정책이 없습니다
        </h3>
        <p className="text-gray-600">
          다른 조건으로 다시 검색해보세요.
          <br />
          일부 조건을 해제하면 더 많은 결과를 볼 수 있습니다.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* 결과 개수 */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-blue-600">{results.length}</span>
          개의 정책을 찾았습니다
        </p>
      </div>

      {/* 결과 목록 */}
      <div className="space-y-3">
        {results.map((result) => (
          <ResultCard
            key={result.policy.slug}
            result={result}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
}
