// .ics (iCalendar) 파일 생성 유틸리티

import type { TimelineEvent } from "./types";

function formatICSDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

function escapeICS(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export function generateICS(
  events: TimelineEvent[],
  baseDate: Date,
  calendarName: string
): string {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//InfoTalker//Timeline//KO",
    `X-WR-CALNAME:${escapeICS(calendarName)}`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];

  for (const event of events) {
    const eventDate = new Date(baseDate);
    eventDate.setDate(eventDate.getDate() + event.dayOffset);

    const dateStr = formatICSDate(eventDate);
    const uid = `${event.id}-${dateStr}@infotalker.com`;

    lines.push("BEGIN:VEVENT");
    lines.push(`DTSTART;VALUE=DATE:${dateStr}`);
    lines.push(`DTEND;VALUE=DATE:${dateStr}`);
    lines.push(`UID:${uid}`);
    lines.push(`SUMMARY:${escapeICS(event.title)}`);
    lines.push(`DESCRIPTION:${escapeICS(event.description)}`);
    if (event.important) {
      lines.push("PRIORITY:1");
    }
    // 하루 전 알림
    lines.push("BEGIN:VALARM");
    lines.push("TRIGGER:-P1D");
    lines.push("ACTION:DISPLAY");
    lines.push(`DESCRIPTION:내일: ${escapeICS(event.title)}`);
    lines.push("END:VALARM");
    lines.push("END:VEVENT");
  }

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function downloadICS(icsContent: string, filename: string): void {
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
