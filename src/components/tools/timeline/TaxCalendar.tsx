"use client";

import { useState, useMemo, useCallback } from "react";
import { generateTaxCalendar, type JobType } from "@/lib/tools/timeline/data/tax-calendar";
import { generateICS, downloadICS } from "@/lib/tools/timeline/ics";
import type { TimelineEvent } from "@/lib/tools/timeline/types";

const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  prepare: { bg: "bg-gray-50", text: "text-gray-700", dot: "bg-gray-400" },
  action: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
  finance: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  info: { bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500" },
};

const MONTH_NAMES = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

function TimelineItem({ event, year }: { event: TimelineEvent; year: number }) {
  const colors = CATEGORY_COLORS[event.category] || CATEGORY_COLORS.info;
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full ${colors.dot} ${event.important ? "ring-2 ring-offset-2 ring-red-300" : ""}`} />
        <div className="w-0.5 flex-1 bg-gray-200" />
      </div>
      <div className="flex-1 pb-5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-2 py-0.5 text-xs font-bold rounded ${colors.bg} ${colors.text}`}>{event.label}</span>
          {event.important && <span className="px-2 py-0.5 text-xs font-bold bg-red-100 text-red-700 rounded">신고/납부</span>}
        </div>
        <h4 className="font-bold text-gray-900 mt-1">{event.title}</h4>
        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
      </div>
    </div>
  );
}

export default function TaxCalendar() {
  const [jobType, setJobType] = useState<JobType>("employee");
  const [hasVAT, setHasVAT] = useState(false);
  const [hasComprehensive, setHasComprehensive] = useState(false);
  const [generated, setGenerated] = useState(false);

  const year = new Date().getFullYear();

  const events = useMemo<TimelineEvent[]>(() => {
    if (!generated) return [];
    return generateTaxCalendar({ jobType, hasVAT, hasComprehensiveTax: hasComprehensive }, year);
  }, [generated, jobType, hasVAT, hasComprehensive, year]);

  // 월별 그룹
  const monthlyGroups = useMemo(() => {
    const groups: { month: string; events: TimelineEvent[] }[] = [];
    if (events.length === 0) return groups;
    const baseDate = new Date(year, 0, 1);
    let currentMonth = -1;
    for (const ev of events) {
      const d = new Date(baseDate);
      d.setDate(d.getDate() + ev.dayOffset);
      const m = d.getMonth();
      if (m !== currentMonth) {
        currentMonth = m;
        groups.push({ month: MONTH_NAMES[m], events: [] });
      }
      groups[groups.length - 1].events.push(ev);
    }
    return groups;
  }, [events, year]);

  const handleDownloadICS = useCallback(() => {
    const baseDate = new Date(year, 0, 1);
    const ics = generateICS(events, baseDate, `${year}년 세금 캘린더`);
    downloadICS(ics, `세금캘린더_${year}.ics`);
  }, [events, year]);

  const jobOptions: { value: JobType; label: string }[] = [
    { value: "employee", label: "직장인" },
    { value: "selfGeneral", label: "자영업 (일반과세)" },
    { value: "selfSimple", label: "자영업 (간이과세)" },
    { value: "freelancer", label: "프리랜서" },
    { value: "landlord", label: "부동산 임대" },
    { value: "corporation", label: "법인 대표" },
  ];

  const showVAT = ["selfGeneral", "selfSimple", "corporation"].includes(jobType);
  const showComprehensive = jobType === "employee";

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">소득 유형 선택</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">직업 유형</label>
          <div className="flex flex-wrap gap-2">
            {jobOptions.map((opt) => (
              <button key={opt.value} onClick={() => { setJobType(opt.value); setGenerated(false); }} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${jobType === opt.value ? "bg-red-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {showVAT && (
          <div className="flex items-center gap-3">
            <input type="checkbox" id="vat" checked={hasVAT} onChange={(e) => setHasVAT(e.target.checked)} className="w-5 h-5 text-red-600 rounded" />
            <label htmlFor="vat" className="text-sm text-gray-700">부가가치세 과세 사업자</label>
          </div>
        )}

        {showComprehensive && (
          <div className="flex items-center gap-3">
            <input type="checkbox" id="comp" checked={hasComprehensive} onChange={(e) => setHasComprehensive(e.target.checked)} className="w-5 h-5 text-red-600 rounded" />
            <label htmlFor="comp" className="text-sm text-gray-700">근로소득 외 추가 소득 있음 (부업, 투잡, 임대소득 등)</label>
          </div>
        )}

        <button onClick={() => setGenerated(true)} className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
          {year}년 세금 캘린더 생성
        </button>
      </div>

      {generated && events.length > 0 && (
        <>
          <div className="bg-white border rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">{year}년 세금 캘린더</h3>
              <button onClick={handleDownloadICS} className="px-4 py-2 bg-gray-800 text-white text-sm font-bold rounded-lg hover:bg-gray-900 transition-colors">
                캘린더에 추가 (.ics)
              </button>
            </div>

            {/* 월별 요약 바 */}
            <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
              {MONTH_NAMES.map((m, i) => {
                const hasEvents = monthlyGroups.some((g) => g.month === m);
                const hasImportant = monthlyGroups.find((g) => g.month === m)?.events.some((e) => e.important);
                return (
                  <div key={m} className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${hasImportant ? "bg-red-500 text-white" : hasEvents ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-400"}`}>
                    {i + 1}월
                  </div>
                );
              })}
            </div>

            {/* 타임라인 */}
            {monthlyGroups.map((group) => (
              <div key={group.month} className="mb-4">
                <h4 className="text-sm font-bold text-gray-500 mb-2 pl-8">{group.month}</h4>
                {group.events.map((ev) => <TimelineItem key={ev.id} event={ev} year={year} />)}
              </div>
            ))}
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="font-bold text-red-900 mb-2">신고/납부 일정 총 {events.filter((e) => e.important).length}건</p>
            <ul className="space-y-1 text-sm text-red-800">
              {events.filter((e) => e.important).map((e) => (
                <li key={e.id} className="flex gap-2">
                  <span className="font-bold w-20">{e.label}</span>
                  <span>{e.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
        <p className="font-medium mb-2">참고사항</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>{year}년 기준이며, 법 개정 시 변경될 수 있습니다.</li>
          <li>신고 기한이 공휴일/주말이면 다음 영업일로 연장됩니다.</li>
          <li>.ics 파일로 구글/애플 캘린더에 일정을 추가할 수 있습니다.</li>
        </ul>
      </div>
    </div>
  );
}
