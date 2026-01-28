"use client";

import Link from "next/link";
import type { FilterResult } from "@/lib/welfare/types";
import { formatAmount, formatDuration, TARGET_GROUP_LABELS } from "@/lib/welfare/constants";

interface ResultCardProps {
  result: FilterResult;
  locale: string;
}

export default function ResultCard({ result, locale }: ResultCardProps) {
  const { policy, matchedCriteria } = result;
  const { eligibility, benefit } = policy;

  // 지원 금액 표시
  const amountText = benefit.amount
    ? benefit.type === "monthly"
      ? `월 ${formatAmount(benefit.amount)}`
      : benefit.type === "yearly"
      ? `연 ${formatAmount(benefit.amount)}`
      : formatAmount(benefit.amount)
    : null;

  // 지원 기간 표시
  const durationText = benefit.duration
    ? `최대 ${formatDuration(benefit.duration)}`
    : null;

  // 대상 그룹 태그
  const targetTags = eligibility.targetGroups
    .slice(0, 3)
    .map((g) => TARGET_GROUP_LABELS[g as keyof typeof TARGET_GROUP_LABELS] || g);

  return (
    <Link
      href={`/${locale}/subsidy/${policy.slug}`}
      className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* 제목 */}
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
            {policy.title}
          </h3>

          {/* 설명 */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {policy.description}
          </p>

          {/* 지원 내용 */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {amountText && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {amountText}
              </span>
            )}
            {durationText && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {durationText}
              </span>
            )}
          </div>

          {/* 대상 그룹 태그 */}
          <div className="flex flex-wrap gap-1.5">
            {targetTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600"
              >
                {tag}
              </span>
            ))}
            {eligibility.targetGroups.length > 3 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-500">
                +{eligibility.targetGroups.length - 3}
              </span>
            )}
          </div>

          {/* 매칭된 조건 (선택적으로 표시) */}
          {matchedCriteria.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-100">
              <p className="text-xs text-green-600">
                {matchedCriteria.slice(0, 2).join(" · ")}
              </p>
            </div>
          )}
        </div>

        {/* 화살표 아이콘 */}
        <div className="flex-shrink-0 text-gray-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
