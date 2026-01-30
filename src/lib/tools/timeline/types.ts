// 타임라인 엔진 공통 타입

export interface TimelineEvent {
  id: string;
  dayOffset: number; // 기준일 대비 일수 (D-14, D+7 등)
  label: string; // "D-14", "D+7", "D-day" 등
  title: string;
  description: string;
  category: "prepare" | "action" | "finance" | "insurance" | "info";
  important?: boolean;
  link?: { label: string; href: string }; // 내부/외부 링크
  amount?: string; // 금액 정보 (있으면 표시)
}

export interface TimelineConfig {
  id: string;
  name: string;
  description: string;
  baseLabel: string; // "퇴사일", "출산일" 등
}
