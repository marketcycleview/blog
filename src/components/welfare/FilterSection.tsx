"use client";

import { useState } from "react";
import type {
  UserConditions,
  TargetGroup,
  HousingType,
  HouseholdType,
  Region,
  Gender,
} from "@/lib/welfare/types";
import {
  TARGET_GROUP_LABELS,
  HOUSING_TYPE_LABELS,
  HOUSEHOLD_TYPE_LABELS,
  REGION_LABELS,
  GENDER_LABELS,
  INCOME_LEVEL_OPTIONS,
} from "@/lib/welfare/constants";

interface FilterSectionProps {
  conditions: UserConditions;
  onChange: (conditions: UserConditions) => void;
  onSearch: () => void;
  onReset: () => void;
}

export default function FilterSection({
  conditions,
  onChange,
  onSearch,
  onReset,
}: FilterSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // 필드 업데이트 헬퍼
  const updateField = <K extends keyof UserConditions>(
    field: K,
    value: UserConditions[K]
  ) => {
    onChange({ ...conditions, [field]: value });
  };

  // 체크박스 토글 헬퍼
  const toggleArrayItem = <T extends string>(
    field: "targetGroups" | "householdTypes" | "specialConditions",
    item: T
  ) => {
    const current = conditions[field] as T[];
    const updated = current.includes(item)
      ? current.filter((i) => i !== item)
      : [...current, item];
    updateField(field, updated as UserConditions[typeof field]);
  };

  // 직업/상황 그룹
  const occupationGroups: TargetGroup[] = [
    "youth",
    "student",
    "jobseeker",
    "worker",
    "selfemployed",
    "senior",
  ];

  // 특수 상황 그룹
  const specialGroups: TargetGroup[] = [
    "disabled",
    "pregnant",
    "singleparent",
    "multicultural",
    "veteran",
    "infant",
    "child",
    "lowIncome",
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
      {/* 기본 필터 (항상 표시) */}
      <div className="space-y-4">
        {/* 1행: 나이, 성별, 지역 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* 나이 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              나이
            </label>
            <input
              type="number"
              min={0}
              max={120}
              placeholder="만 나이"
              value={conditions.age ?? ""}
              onChange={(e) =>
                updateField("age", e.target.value ? Number(e.target.value) : null)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* 성별 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              성별
            </label>
            <select
              value={conditions.gender ?? ""}
              onChange={(e) =>
                updateField("gender", (e.target.value || null) as Gender | null)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">선택 안함</option>
              {Object.entries(GENDER_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* 지역 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              지역
            </label>
            <select
              value={conditions.region ?? ""}
              onChange={(e) =>
                updateField("region", (e.target.value || null) as Region | null)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">전국</option>
              {Object.entries(REGION_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 2행: 소득 수준 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            소득 수준 (가구 기준)
          </label>
          <select
            value={conditions.incomePercent ?? ""}
            onChange={(e) =>
              updateField(
                "incomePercent",
                e.target.value ? Number(e.target.value) : null
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">선택 안함</option>
            {INCOME_LEVEL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* 3행: 직업/상황 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            직업/상황 (복수 선택 가능)
          </label>
          <div className="flex flex-wrap gap-2">
            {occupationGroups.map((group) => (
              <button
                key={group}
                type="button"
                onClick={() => toggleArrayItem("targetGroups", group)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  conditions.targetGroups.includes(group)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {TARGET_GROUP_LABELS[group]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 확장 필터 토글 */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full mt-4 py-2 text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center gap-1"
      >
        {isExpanded ? "상세 조건 접기" : "상세 조건 펼치기"}
        <svg
          className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* 확장 필터 */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
          {/* 주거 형태 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              주거 형태
            </label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(HOUSING_TYPE_LABELS) as HousingType[]).map(
                (housing) => (
                  <button
                    key={housing}
                    type="button"
                    onClick={() =>
                      updateField(
                        "housing",
                        conditions.housing === housing ? null : housing
                      )
                    }
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      conditions.housing === housing
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {HOUSING_TYPE_LABELS[housing]}
                  </button>
                )
              )}
            </div>
          </div>

          {/* 가구 유형 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              가구 유형 (복수 선택 가능)
            </label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(HOUSEHOLD_TYPE_LABELS) as HouseholdType[]).map(
                (household) => (
                  <button
                    key={household}
                    type="button"
                    onClick={() => toggleArrayItem("householdTypes", household)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      conditions.householdTypes.includes(household)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {HOUSEHOLD_TYPE_LABELS[household]}
                  </button>
                )
              )}
            </div>
          </div>

          {/* 특수 상황 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              특수 상황 (복수 선택 가능)
            </label>
            <div className="flex flex-wrap gap-2">
              {specialGroups.map((group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => {
                    // 장애인, 임산부는 별도 필드
                    if (group === "disabled") {
                      updateField("hasDisability", !conditions.hasDisability);
                    } else if (group === "pregnant") {
                      updateField("isPregnant", !conditions.isPregnant);
                    } else {
                      toggleArrayItem("targetGroups", group);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    (group === "disabled" && conditions.hasDisability) ||
                    (group === "pregnant" && conditions.isPregnant) ||
                    (group !== "disabled" &&
                      group !== "pregnant" &&
                      conditions.targetGroups.includes(group))
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {TARGET_GROUP_LABELS[group]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 버튼 영역 */}
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onSearch}
          className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          🔍 정책 찾기
        </button>
        <button
          type="button"
          onClick={onReset}
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          초기화
        </button>
      </div>
    </div>
  );
}
