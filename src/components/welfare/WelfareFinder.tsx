"use client";

import { useState, useEffect, useCallback } from "react";
import type { UserConditions, WelfarePolicy } from "@/lib/welfare/types";
import {
  filterPolicies,
  createEmptyConditions,
  isConditionsEmpty,
} from "@/lib/welfare/filter";
import type { FilterResult } from "@/lib/welfare/types";
import FilterSection from "./FilterSection";
import ResultList from "./ResultList";

interface WelfareFinderProps {
  locale: string;
}

export default function WelfareFinder({ locale }: WelfareFinderProps) {
  const [policies, setPolicies] = useState<WelfarePolicy[]>([]);
  const [conditions, setConditions] = useState<UserConditions>(
    createEmptyConditions()
  );
  const [results, setResults] = useState<FilterResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 인덱스 데이터 로드
  useEffect(() => {
    async function loadIndex() {
      try {
        setIsLoading(true);
        const response = await fetch("/data/welfare-index.json");

        if (!response.ok) {
          throw new Error("데이터를 불러올 수 없습니다.");
        }

        const data = await response.json();
        setPolicies(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load welfare index:", err);
        setError("데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    }

    loadIndex();
  }, []);

  // 검색 실행
  const handleSearch = useCallback(() => {
    setHasSearched(true);

    if (isConditionsEmpty(conditions)) {
      // 조건이 비어있으면 모든 정책 표시 (점수 없이)
      setResults(
        policies.map((policy) => ({
          policy,
          matchScore: 0,
          matchedCriteria: [],
        }))
      );
    } else {
      // 조건에 맞는 정책 필터링
      const filtered = filterPolicies(policies, conditions);
      setResults(filtered);
    }
  }, [policies, conditions]);

  // 초기화
  const handleReset = useCallback(() => {
    setConditions(createEmptyConditions());
    setResults([]);
    setHasSearched(false);
  }, []);

  // 에러 상태
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          오류가 발생했습니다
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          새로고침
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 필터 섹션 */}
      <FilterSection
        conditions={conditions}
        onChange={setConditions}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {/* 결과 섹션 */}
      <ResultList
        results={results}
        locale={locale}
        isLoading={isLoading}
        isEmpty={!hasSearched}
        hasFilters={hasSearched}
      />

      {/* 안내 문구 */}
      {hasSearched && results.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <p>
            <strong>💡 참고:</strong> 표시된 정책은 입력하신 조건을 기준으로
            필터링한 결과입니다. 실제 신청 자격은 각 정책의 상세 페이지에서
            정확한 요건을 확인해주세요.
          </p>
        </div>
      )}

      {/* 통계 정보 */}
      {!isLoading && (
        <div className="text-center text-sm text-gray-500">
          총 {policies.length}개의 복지 정책이 등록되어 있습니다.
        </div>
      )}
    </div>
  );
}
