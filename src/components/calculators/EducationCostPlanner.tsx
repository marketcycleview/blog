"use client";

import { useState, useMemo } from "react";
import {
  calculateEducationCost,
  type EducationCostInput,
} from "@/lib/calculators/education-cost";

function formatWon(n: number): string {
  if (Math.abs(n) >= 100_000_000)
    return `${(n / 100_000_000).toFixed(1)}억원`;
  if (Math.abs(n) >= 10_000)
    return `${Math.round(n / 10_000).toLocaleString()}만원`;
  return `${n.toLocaleString()}원`;
}

type SchoolType = "public" | "private";
type UniType =
  | "national"
  | "private-arts"
  | "private-stem"
  | "private-humanities"
  | "none";

export default function EducationCostPlanner() {
  // 기본 정보
  const [childCount, setChildCount] = useState(1);
  const [currentAge, setCurrentAge] = useState(3);
  const [currentSavings, setCurrentSavings] = useState(0); // 만원

  // 교육 계획
  const [kindergarten, setKindergarten] = useState<SchoolType>("public");
  const [elementary, setElementary] = useState<SchoolType>("public");
  const [middle, setMiddle] = useState<SchoolType>("public");
  const [high, setHigh] = useState<SchoolType>("public");
  const [university, setUniversity] = useState<UniType>("national");

  // 사교육비
  const [monthlyExtra, setMonthlyExtra] = useState(50); // 만원
  const [inflationRate, setInflationRate] = useState(3);

  const result = useMemo(() => {
    const input: EducationCostInput = {
      childCount,
      currentAge,
      kindergarten,
      elementary,
      middle,
      high,
      university,
      monthlyExtra: monthlyExtra * 10000,
      inflationRate,
      currentSavings: currentSavings * 10000,
    };
    return calculateEducationCost(input);
  }, [
    childCount,
    currentAge,
    kindergarten,
    elementary,
    middle,
    high,
    university,
    monthlyExtra,
    inflationRate,
    currentSavings,
  ]);

  return (
    <div className="space-y-6">
      {/* 기본 정보 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">기본 정보</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            자녀 수
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() => setChildCount(n)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  childCount === n
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {n}명
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              첫째 현재 나이
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={currentAge}
                onChange={(e) =>
                  setCurrentAge(
                    Math.max(0, Math.min(18, Number(e.target.value)))
                  )
                }
                min={0}
                max={18}
                className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="text-sm text-gray-500 w-8">세</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              현재 교육 저축
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={currentSavings}
                onChange={(e) =>
                  setCurrentSavings(Math.max(0, Number(e.target.value)))
                }
                min={0}
                className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="text-sm text-gray-500 w-12">만원</span>
            </div>
          </div>
        </div>
      </div>

      {/* 교육 계획 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">교육 계획</h2>

        <StageSelect
          label="유치원 (4~6세)"
          value={kindergarten}
          onChange={(v) => setKindergarten(v as SchoolType)}
          options={[
            { value: "public", label: "공립 (연 70만원)" },
            { value: "private", label: "사립 (연 400만원)" },
          ]}
        />
        <StageSelect
          label="초등학교 (7~12세)"
          value={elementary}
          onChange={(v) => setElementary(v as SchoolType)}
          options={[
            { value: "public", label: "공립 (연 100만원)" },
            { value: "private", label: "사립 (연 1,000만원)" },
          ]}
        />
        <StageSelect
          label="중학교 (13~15세)"
          value={middle}
          onChange={(v) => setMiddle(v as SchoolType)}
          options={[
            { value: "public", label: "공립 (연 150만원)" },
            { value: "private", label: "사립 (연 1,200만원)" },
          ]}
        />
        <StageSelect
          label="고등학교 (16~18세)"
          value={high}
          onChange={(v) => setHigh(v as SchoolType)}
          options={[
            { value: "public", label: "공립 (연 200만원)" },
            { value: "private", label: "사립 (연 1,500만원)" },
          ]}
        />
        <StageSelect
          label="대학교 (19~22세)"
          value={university}
          onChange={(v) => setUniversity(v as UniType)}
          options={[
            { value: "national", label: "국립 (연 450만원)" },
            { value: "private-humanities", label: "사립 인문 (연 700만원)" },
            { value: "private-stem", label: "사립 이공 (연 900만원)" },
            { value: "private-arts", label: "사립 예체능 (연 1,000만원)" },
            { value: "none", label: "미진학" },
          ]}
        />
      </div>

      {/* 사교육비 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">사교육비</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              월 사교육비
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={monthlyExtra}
                onChange={(e) =>
                  setMonthlyExtra(Math.max(0, Number(e.target.value)))
                }
                min={0}
                className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="text-sm text-gray-500 w-12">만원</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              교육비 물가상승률
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={inflationRate}
                onChange={(e) =>
                  setInflationRate(
                    Math.max(0, Math.min(10, Number(e.target.value)))
                  )
                }
                step={0.5}
                min={0}
                max={10}
                className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="text-sm text-gray-500 w-8">%</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-400">
          * 통계청 기준 교육비 물가상승률은 연 3~4% 수준입니다.
        </p>
      </div>

      {/* 메인 결과 */}
      {result && (
        <>
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white text-center">
            <p className="text-sm opacity-80 mb-1">
              자녀 {childCount}명 총 교육비 (물가상승 반영)
            </p>
            <p className="text-3xl font-bold">
              {formatWon(result.inflationAdjustedTotal)}
            </p>
            <div className="flex justify-center gap-6 mt-3 text-sm">
              <div>
                <p className="text-blue-200">1인당</p>
                <p className="font-bold">{formatWon(result.perChildCost)}</p>
              </div>
              <div>
                <p className="text-blue-200">사교육비</p>
                <p className="font-bold">
                  {formatWon(result.extraCostTotal)}
                </p>
              </div>
              <div>
                <p className="text-blue-200">남은 기간</p>
                <p className="font-bold">{result.yearsUntilEnd}년</p>
              </div>
            </div>
          </div>

          {/* 단계별 비용 테이블 */}
          <div className="bg-white border rounded-xl p-4 sm:p-6">
            <h3 className="font-bold text-gray-900 mb-3">
              단계별 비용 (첫째 기준)
            </h3>
            {result.stageBreakdown.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 text-gray-500 font-medium">
                        단계
                      </th>
                      <th className="text-center py-2 text-gray-500 font-medium">
                        기간
                      </th>
                      <th className="text-center py-2 text-gray-500 font-medium">
                        구분
                      </th>
                      <th className="text-right py-2 text-gray-500 font-medium">
                        연 비용
                      </th>
                      <th className="text-right py-2 text-gray-500 font-medium">
                        소계
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.stageBreakdown.map((s) => (
                      <tr key={s.stage} className="border-b last:border-0">
                        <td className="py-2 font-medium text-gray-900">
                          {s.stage}
                        </td>
                        <td className="py-2 text-center text-gray-600">
                          {s.years}년
                        </td>
                        <td className="py-2 text-center">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                              s.type === "공립" || s.type === "국립"
                                ? "bg-green-100 text-green-700"
                                : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            {s.type}
                          </span>
                        </td>
                        <td className="py-2 text-right text-gray-700">
                          {formatWon(s.annualCost)}
                        </td>
                        <td className="py-2 text-right font-bold text-gray-900">
                          {formatWon(s.totalCost)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2">
                      <td
                        colSpan={4}
                        className="py-2 font-bold text-gray-900"
                      >
                        학비 소계 (명목)
                      </td>
                      <td className="py-2 text-right font-bold text-blue-600">
                        {formatWon(result.totalCost)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                현재 나이 기준으로 남은 교육 단계가 없습니다.
              </p>
            )}
          </div>

          {/* 비용 구성 */}
          <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-3">
            <h3 className="font-bold text-gray-900">비용 구성</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">학비 합계 (명목)</span>
                <span className="font-bold">
                  {formatWon(result.totalCost)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">
                  사교육비 합계 (물가반영)
                </span>
                <span className="font-bold">
                  {formatWon(result.extraCostTotal)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">
                  총 교육비 (물가상승 {inflationRate}% 반영)
                </span>
                <span className="font-bold text-blue-600">
                  {formatWon(result.inflationAdjustedTotal)}
                </span>
              </div>
              {childCount > 1 && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">자녀 1인당</span>
                  <span className="font-bold">
                    {formatWon(result.perChildCost)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 저축 계획 */}
          <div
            className={`rounded-xl p-6 text-white text-center ${
              result.gap > 0
                ? "bg-gradient-to-r from-red-600 to-red-700"
                : "bg-gradient-to-r from-green-600 to-green-700"
            }`}
          >
            <p className="text-sm opacity-80 mb-1">월 저축 계획</p>
            {result.gap > 0 ? (
              <>
                <p className="text-3xl font-bold">
                  월 {formatWon(result.monthlySavingsNeeded)}
                </p>
                <div className="flex justify-center gap-6 mt-3 text-sm">
                  <div>
                    <p className="opacity-80">현재 저축</p>
                    <p className="font-bold">
                      {formatWon(result.currentSavings)}
                    </p>
                  </div>
                  <div>
                    <p className="opacity-80">부족분</p>
                    <p className="font-bold">{formatWon(result.gap)}</p>
                  </div>
                  <div>
                    <p className="opacity-80">남은 기간</p>
                    <p className="font-bold">
                      {result.yearsUntilEnd}년 (
                      {result.yearsUntilEnd * 12}개월)
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="text-3xl font-bold">준비 완료!</p>
                <p className="text-sm mt-2 opacity-90">
                  현재 저축({formatWon(result.currentSavings)})으로 예상
                  교육비를 충당할 수 있습니다.
                </p>
              </>
            )}
          </div>

          {/* 참고사항 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
            <p className="font-medium mb-1">참고사항</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                2026년 기준 평균 교육비를 적용한 추정치이며, 실제 비용과 차이가
                있을 수 있습니다.
              </li>
              <li>
                사교육비는 자녀 나이와 관계없이 동일한 금액을 적용했습니다.
                실제로는 학년이 올라갈수록 증가하는 경향이 있습니다.
              </li>
              <li>
                교육비 물가상승률은 일반 물가상승률보다 높은 연 3~4% 수준입니다.
              </li>
              <li>
                다자녀 가정은 첫째 기준 2세 간격으로 계산합니다. 실제 자녀 나이
                차이에 따라 결과가 달라집니다.
              </li>
              <li>
                급식비, 교복비, 교재비 등 부대비용은 포함되지 않았습니다.
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

// 교육 단계 선택 컴포넌트
function StageSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors text-center ${
              value === opt.value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
