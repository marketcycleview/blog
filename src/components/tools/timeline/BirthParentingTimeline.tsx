"use client";

import { useState, useMemo, useCallback } from "react";
import {
  generateBirthParentingTimeline,
  type ChildOrder,
  type IncomeLevel,
} from "@/lib/tools/timeline/data/birth-parenting";
import { generateICS, downloadICS } from "@/lib/tools/timeline/ics";
import type { TimelineEvent } from "@/lib/tools/timeline/types";

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
      <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full ${colors.dot} ${event.important ? "ring-2 ring-offset-2 ring-pink-400" : ""}`} />
        <div className="w-0.5 flex-1 bg-gray-200" />
      </div>
      <div className={`flex-1 pb-6 ${checked ? "opacity-50" : ""}`}>
        <div className="flex items-start gap-3">
          <input type="checkbox" checked={checked} onChange={onToggle} className="mt-1 w-5 h-5 text-pink-600 rounded" />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2 py-0.5 text-xs font-bold rounded ${colors.bg} ${colors.text}`}>{event.label}</span>
              <span className="text-xs text-gray-400">{dateStr}</span>
              {event.important && <span className="px-2 py-0.5 text-xs font-bold bg-pink-100 text-pink-700 rounded">중요</span>}
              <span className={`px-2 py-0.5 text-xs rounded ${colors.bg} ${colors.text}`}>{CATEGORY_LABELS[event.category]}</span>
            </div>
            <h4 className={`font-bold mt-1 ${checked ? "line-through" : "text-gray-900"}`}>{event.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
            {event.amount && <p className="text-sm font-bold text-green-600 mt-1">{event.amount}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

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
              value === opt.value ? "bg-pink-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function BirthParentingTimeline() {
  const [birthDate, setBirthDate] = useState("");
  const [childOrder, setChildOrder] = useState<ChildOrder>("first");
  const [dualIncome, setDualIncome] = useState(false);
  const [incomeLevel, setIncomeLevel] = useState<IncomeLevel>("mid");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [generated, setGenerated] = useState(false);

  const events = useMemo<TimelineEvent[]>(() => {
    if (!generated) return [];
    return generateBirthParentingTimeline({ childOrder, dualIncome, incomeLevel });
  }, [generated, childOrder, dualIncome, incomeLevel]);

  const baseDate = useMemo(() => (birthDate ? new Date(birthDate) : new Date()), [birthDate]);

  const handleToggle = useCallback((id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleGenerate = () => { setGenerated(true); setCheckedItems({}); };

  const handleDownloadICS = () => {
    const ics = generateICS(events, baseDate, "출산/육아 혜택 타임라인");
    downloadICS(ics, `출산육아_혜택_${birthDate || "timeline"}.ics`);
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = events.length > 0 ? Math.round((checkedCount / events.length) * 100) : 0;

  // 총 수령 예상액 계산 (대략치)
  const totalBenefitEstimate = useMemo(() => {
    if (!generated) return 0;
    let total = 0;
    total += 1_000_000; // 임신출산 바우처
    total += 2_000_000; // 첫만남이용권
    if (childOrder === "third") total += 1_000_000; // 셋째 추가
    total += 100_000 * 12 * 8; // 아동수당 (8년)
    total += 1_000_000 * 12; // 부모급여 0세
    total += 500_000 * 12; // 부모급여 1세
    return total;
  }, [generated, childOrder]);

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">출산/육아 정보 입력</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">출산 예정일 (또는 출산일)</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        <OptionButtons
          label="몇째 아이인가요?"
          options={[
            { value: "first" as ChildOrder, label: "첫째" },
            { value: "second" as ChildOrder, label: "둘째" },
            { value: "third" as ChildOrder, label: "셋째 이상" },
          ]}
          value={childOrder}
          onChange={setChildOrder}
        />

        <div className="flex items-center gap-3">
          <input type="checkbox" id="dualIncome" checked={dualIncome} onChange={(e) => setDualIncome(e.target.checked)} className="w-5 h-5 text-pink-600 rounded" />
          <label htmlFor="dualIncome" className="text-sm text-gray-700">맞벌이 가정</label>
        </div>

        <OptionButtons
          label="소득 수준"
          options={[
            { value: "low" as IncomeLevel, label: "저소득 (기초·차상위)" },
            { value: "mid" as IncomeLevel, label: "일반" },
            { value: "high" as IncomeLevel, label: "고소득" },
          ]}
          value={incomeLevel}
          onChange={setIncomeLevel}
        />

        <button
          onClick={handleGenerate}
          disabled={!birthDate}
          className={`w-full py-3 font-bold rounded-lg transition-colors ${
            birthDate ? "bg-pink-600 text-white hover:bg-pink-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          타임라인 생성
        </button>
      </div>

      {generated && events.length > 0 && (
        <>
          {/* 총 수령 예상액 */}
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-6 text-white text-center">
            <p className="text-pink-100 text-sm mb-1">예상 총 혜택 (출산~만 8세)</p>
            <p className="text-4xl font-bold">약 {Math.round(totalBenefitEstimate / 10000).toLocaleString()}만원</p>
            <p className="text-pink-200 text-sm mt-2">아동수당 + 부모급여 + 바우처 등 합산 (대략치)</p>
          </div>

          {/* 진행률 + 캘린더 */}
          <div className="bg-white border rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-gray-500">체크 진행률</p>
                <p className="text-2xl font-bold text-gray-900">{progress}%</p>
              </div>
              <button onClick={handleDownloadICS} className="px-4 py-2 bg-gray-800 text-white text-sm font-bold rounded-lg hover:bg-gray-900 transition-colors">
                캘린더에 추가 (.ics)
              </button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-pink-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* 타임라인 */}
          <div className="bg-white border rounded-xl p-4 sm:p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">출산/육아 혜택 타임라인</h3>
            <div>
              {events.map((event) => (
                <TimelineItem key={event.id} event={event} baseDate={baseDate} checked={!!checkedItems[event.id]} onToggle={() => handleToggle(event.id)} />
              ))}
            </div>
          </div>
        </>
      )}

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
        <p className="font-medium mb-2">참고사항</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>2026년 기준 정책으로, 변경될 수 있습니다.</li>
          <li>지자체별 추가 출산장려금이 있을 수 있습니다.</li>
          <li>정확한 자격 및 금액은 복지로(bokjiro.go.kr)에서 확인하세요.</li>
        </ul>
      </div>
    </div>
  );
}
