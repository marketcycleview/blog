"use client";

import { useState, useMemo, useCallback } from "react";
import {
  generateResignationTimeline,
  type ResignationType,
  type TenureRange,
} from "@/lib/tools/timeline/data/post-resignation";
import { generateICS, downloadICS } from "@/lib/tools/timeline/ics";
import type { TimelineEvent } from "@/lib/tools/timeline/types";

// ─── 카테고리 색상 ───
const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  prepare: { bg: "bg-gray-50", text: "text-gray-700", dot: "bg-gray-400" },
  action: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  finance: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  insurance: { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500" },
  info: { bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500" },
};

const CATEGORY_LABELS: Record<string, string> = {
  prepare: "준비",
  action: "행동",
  finance: "금전",
  insurance: "보험",
  info: "참고",
};

// ─── 타임라인 아이템 ───
function TimelineItem({
  event,
  baseDate,
  checked,
  onToggle,
}: {
  event: TimelineEvent;
  baseDate: Date;
  checked: boolean;
  onToggle: () => void;
}) {
  const colors = CATEGORY_COLORS[event.category] || CATEGORY_COLORS.info;
  const actualDate = new Date(baseDate);
  actualDate.setDate(actualDate.getDate() + event.dayOffset);
  const dateStr = `${actualDate.getFullYear()}.${String(actualDate.getMonth() + 1).padStart(2, "0")}.${String(actualDate.getDate()).padStart(2, "0")}`;

  return (
    <div className="flex gap-4">
      {/* 타임라인 라인 */}
      <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full ${colors.dot} ${event.important ? "ring-2 ring-offset-2 ring-blue-400" : ""}`} />
        <div className="w-0.5 flex-1 bg-gray-200" />
      </div>

      {/* 콘텐츠 */}
      <div className={`flex-1 pb-6 ${checked ? "opacity-50" : ""}`}>
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={checked}
            onChange={onToggle}
            className="mt-1 w-5 h-5 text-blue-600 rounded"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2 py-0.5 text-xs font-bold rounded ${colors.bg} ${colors.text}`}>
                {event.label}
              </span>
              <span className="text-xs text-gray-400">{dateStr}</span>
              {event.important && (
                <span className="px-2 py-0.5 text-xs font-bold bg-red-100 text-red-700 rounded">중요</span>
              )}
              <span className={`px-2 py-0.5 text-xs rounded ${colors.bg} ${colors.text}`}>
                {CATEGORY_LABELS[event.category]}
              </span>
            </div>
            <h4 className={`font-bold mt-1 ${checked ? "line-through" : "text-gray-900"}`}>
              {event.title}
            </h4>
            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
            {event.amount && (
              <p className="text-sm font-bold text-green-600 mt-1">{event.amount}</p>
            )}
            {event.link && (
              <a
                href={event.link.href}
                className="inline-block mt-2 text-sm text-blue-600 hover:underline"
              >
                {event.link.label} →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 옵션 선택 버튼 ───
function OptionButtons<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              value === opt.value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── 메인 컴포넌트 ───
export default function PostResignationTimeline() {
  const [resignDate, setResignDate] = useState("");
  const [resignType, setResignType] = useState<ResignationType>("voluntary");
  const [tenure, setTenure] = useState<TenureRange>("1to3");
  const [hasNextJob, setHasNextJob] = useState(false);
  const [hasInsurance, setHasInsurance] = useState(true);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [generated, setGenerated] = useState(false);

  const events = useMemo<TimelineEvent[]>(() => {
    if (!generated) return [];
    return generateResignationTimeline({
      type: resignType,
      tenure,
      hasNextJob,
      hasInsurance,
    });
  }, [generated, resignType, tenure, hasNextJob, hasInsurance]);

  const baseDate = useMemo(() => {
    if (!resignDate) return new Date();
    return new Date(resignDate);
  }, [resignDate]);

  const handleToggle = useCallback((id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleGenerate = () => {
    setGenerated(true);
    setCheckedItems({});
  };

  const handleDownloadICS = () => {
    const ics = generateICS(events, baseDate, "퇴사 후 할 일");
    const dateStr = resignDate || new Date().toISOString().slice(0, 10);
    downloadICS(ics, `퇴사후_할일_${dateStr}.ics`);
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = events.length > 0 ? Math.round((checkedCount / events.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* 입력 섹션 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">퇴사 정보 입력</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">퇴사일</label>
          <input
            type="date"
            value={resignDate}
            onChange={(e) => setResignDate(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <OptionButtons
          label="퇴사 유형"
          options={[
            { value: "voluntary" as ResignationType, label: "자발적 퇴사" },
            { value: "recommended" as ResignationType, label: "권고사직" },
            { value: "fired" as ResignationType, label: "해고" },
            { value: "contractEnd" as ResignationType, label: "계약만료" },
          ]}
          value={resignType}
          onChange={setResignType}
        />

        <OptionButtons
          label="근속 기간"
          options={[
            { value: "under1" as TenureRange, label: "1년 미만" },
            { value: "1to3" as TenureRange, label: "1~3년" },
            { value: "3to10" as TenureRange, label: "3~10년" },
            { value: "over10" as TenureRange, label: "10년 이상" },
          ]}
          value={tenure}
          onChange={setTenure}
        />

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="hasNextJob"
              checked={hasNextJob}
              onChange={(e) => setHasNextJob(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <label htmlFor="hasNextJob" className="text-sm text-gray-700">재취업 예정 (다음 직장이 있음)</label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="hasInsurance"
              checked={hasInsurance}
              onChange={(e) => setHasInsurance(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <label htmlFor="hasInsurance" className="text-sm text-gray-700">4대보험 가입 중</label>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!resignDate}
          className={`w-full py-3 font-bold rounded-lg transition-colors ${
            resignDate
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          타임라인 생성
        </button>
      </div>

      {/* 타임라인 결과 */}
      {generated && events.length > 0 && (
        <>
          {/* 진행률 + 캘린더 다운로드 */}
          <div className="bg-white border rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-gray-500">진행률</p>
                <p className="text-2xl font-bold text-gray-900">{progress}%</p>
              </div>
              <button
                onClick={handleDownloadICS}
                className="px-4 py-2 bg-gray-800 text-white text-sm font-bold rounded-lg hover:bg-gray-900 transition-colors"
              >
                캘린더에 추가 (.ics)
              </button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {checkedCount}/{events.length} 완료 — 체크박스를 눌러 완료 표시하세요
            </p>
          </div>

          {/* 타임라인 */}
          <div className="bg-white border rounded-xl p-4 sm:p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">퇴사 후 할 일 타임라인</h3>
            <div>
              {events.map((event) => (
                <TimelineItem
                  key={event.id}
                  event={event}
                  baseDate={baseDate}
                  checked={!!checkedItems[event.id]}
                  onToggle={() => handleToggle(event.id)}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* 참고사항 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
        <p className="font-medium mb-2">참고사항</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>타임라인은 일반적인 기준으로, 회사 규정에 따라 다를 수 있습니다.</li>
          <li>실업급여 수급 일수는 나이와 고용보험 가입기간에 따라 달라집니다.</li>
          <li>자발적 퇴사도 정당한 사유가 있으면 실업급여 수급 가능합니다.</li>
          <li>.ics 파일은 구글 캘린더, 애플 캘린더 등에서 열 수 있습니다.</li>
        </ul>
      </div>
    </div>
  );
}
