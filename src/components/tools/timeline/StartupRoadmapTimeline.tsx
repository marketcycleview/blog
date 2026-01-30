"use client";

import { useState, useMemo, useCallback } from "react";
import type { TimelineEvent } from "@/lib/tools/timeline/types";
import { generateStartupRoadmap, type BusinessType, type EntityType } from "@/lib/tools/timeline/data/startup-roadmap";
import { generateICS, downloadICS } from "@/lib/tools/timeline/ics";

const CATEGORY_STYLES: Record<string, { bg: string; text: string; icon: string }> = {
  prepare: { bg: "bg-gray-100", text: "text-gray-700", icon: "📋" },
  action: { bg: "bg-blue-100", text: "text-blue-700", icon: "✅" },
  finance: { bg: "bg-green-100", text: "text-green-700", icon: "💰" },
  insurance: { bg: "bg-purple-100", text: "text-purple-700", icon: "🛡️" },
  info: { bg: "bg-yellow-100", text: "text-yellow-700", icon: "ℹ️" },
};

function TimelineItem({ event, baseDate, checked, onToggle }: {
  event: TimelineEvent; baseDate: Date; checked: boolean; onToggle: () => void;
}) {
  const style = CATEGORY_STYLES[event.category] || CATEGORY_STYLES.info;
  const eventDate = new Date(baseDate);
  eventDate.setDate(eventDate.getDate() + event.dayOffset);
  const dateStr = `${eventDate.getFullYear()}.${String(eventDate.getMonth() + 1).padStart(2, "0")}.${String(eventDate.getDate()).padStart(2, "0")}`;

  return (
    <div className={`flex gap-3 ${checked ? "opacity-60" : ""}`}>
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${event.important ? "ring-2 ring-orange-400" : ""} ${style.bg}`}>{style.icon}</div>
        <div className="w-0.5 flex-1 bg-gray-200 mt-1" />
      </div>
      <div className="flex-1 pb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-2 py-0.5 text-xs font-bold rounded ${style.bg} ${style.text}`}>{event.label}</span>
          <span className="text-xs text-gray-400">{dateStr}</span>
          {event.important && <span className="px-1.5 py-0.5 text-xs font-bold bg-orange-100 text-orange-700 rounded">중요</span>}
        </div>
        <div className="flex items-start gap-2 mt-1">
          <button onClick={onToggle} className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center text-xs ${checked ? "bg-green-500 border-green-500 text-white" : "border-gray-300"}`}>
            {checked && "✓"}
          </button>
          <div>
            <h4 className={`font-bold text-gray-900 ${checked ? "line-through" : ""}`}>{event.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
            {event.amount && <p className="text-sm font-bold text-green-600 mt-1">{event.amount}</p>}
            {event.link && <a href={event.link.href} className="inline-block mt-1 text-sm text-blue-600 hover:underline">{event.link.label} →</a>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StartupRoadmapTimeline() {
  const [businessType, setBusinessType] = useState<BusinessType>("restaurant");
  const [entityType, setEntityType] = useState<EntityType>("individual");
  const [hasEmployees, setHasEmployees] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [generated, setGenerated] = useState(false);

  const events = useMemo(() => {
    if (!generated) return [];
    return generateStartupRoadmap({ businessType, entityType, hasEmployees });
  }, [generated, businessType, entityType, hasEmployees]);

  const baseDate = useMemo(() => startDate ? new Date(startDate) : new Date(), [startDate]);

  const toggleCheck = (id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try { localStorage.setItem("startup-roadmap-checked", JSON.stringify(next)); } catch { /* noop */ }
      return next;
    });
  };

  const handleGenerate = () => setGenerated(true);

  const handleICSDownload = useCallback(() => {
    const ics = generateICS(events, baseDate, "창업 로드맵");
    downloadICS(ics, `창업로드맵_${businessType}.ics`);
  }, [events, baseDate, businessType]);

  const progress = events.length > 0 ? Math.round(Object.values(checked).filter(Boolean).length / events.length * 100) : 0;

  if (!generated) {
    return (
      <div className="space-y-6">
        <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-900">창업 정보 입력</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">업종</label>
            <select value={businessType} onChange={(e) => setBusinessType(e.target.value as BusinessType)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500">
              <option value="restaurant">음식점</option>
              <option value="cafe">카페</option>
              <option value="online">온라인 쇼핑몰</option>
              <option value="freelancer">프리랜서</option>
              <option value="manufacturing">제조업</option>
              <option value="service">서비스업</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">사업자 유형</label>
            <div className="flex gap-3">
              <button onClick={() => setEntityType("individual")} className={`flex-1 px-4 py-3 rounded-xl border-2 font-bold ${entityType === "individual" ? "border-orange-500 bg-orange-50 text-orange-700" : "border-gray-200"}`}>개인사업자</button>
              <button onClick={() => setEntityType("corporation")} className={`flex-1 px-4 py-3 rounded-xl border-2 font-bold ${entityType === "corporation" ? "border-orange-500 bg-orange-50 text-orange-700" : "border-gray-200"}`}>법인</button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">직원 채용 계획</label>
            <div className="flex gap-3">
              <button onClick={() => setHasEmployees(false)} className={`flex-1 px-4 py-3 rounded-xl border-2 font-bold ${!hasEmployees ? "border-orange-500 bg-orange-50 text-orange-700" : "border-gray-200"}`}>1인 창업</button>
              <button onClick={() => setHasEmployees(true)} className={`flex-1 px-4 py-3 rounded-xl border-2 font-bold ${hasEmployees ? "border-orange-500 bg-orange-50 text-orange-700" : "border-gray-200"}`}>직원 채용 예정</button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">영업 개시 예정일</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" />
          </div>
          <button onClick={handleGenerate}
            className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors">
            로드맵 생성
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 진행률 */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-6 text-white text-center">
        <p className="text-orange-100 text-sm mb-1">창업 로드맵</p>
        <p className="text-3xl font-bold">{progress}% 완료</p>
        <p className="text-orange-200 text-sm mt-1">총 {events.length}개 항목 중 {Object.values(checked).filter(Boolean).length}개 완료</p>
      </div>

      {/* 다운로드 + 리셋 */}
      <div className="flex gap-3">
        <button onClick={handleICSDownload} className="flex-1 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors">
          .ics 캘린더 다운로드
        </button>
        <button onClick={() => { setGenerated(false); setChecked({}); }} className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200">
          다시 설정
        </button>
      </div>

      {/* 타임라인 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6">
        {events.map((event) => (
          <TimelineItem
            key={event.id}
            event={event}
            baseDate={baseDate}
            checked={!!checked[event.id]}
            onToggle={() => toggleCheck(event.id)}
          />
        ))}
      </div>
    </div>
  );
}
