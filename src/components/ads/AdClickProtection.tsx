"use client";

import { useEffect, useCallback } from "react";

// 설정값
const CONFIG = {
  maxClicks: 3,              // 시간 윈도우 내 최대 클릭 수
  timeWindow: 60 * 1000,     // 1분
  blockDuration: 30 * 60 * 1000, // 30분 동안 광고 숨김
  storageKey: "ad_click_data",
};

interface ClickData {
  clicks: number[];
  blockedUntil: number | null;
  fingerprint: string;
}

// 간단한 브라우저 fingerprint 생성
function generateFingerprint(): string {
  if (typeof window === "undefined") return "";

  const data = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    navigator.hardwareConcurrency || 0,
  ].join("|");

  // 간단한 해시
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// 로컬 스토리지에서 데이터 가져오기
function getClickData(): ClickData {
  if (typeof window === "undefined") {
    return { clicks: [], blockedUntil: null, fingerprint: "" };
  }

  try {
    const stored = localStorage.getItem(CONFIG.storageKey);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // 파싱 실패 시 초기화
  }

  return {
    clicks: [],
    blockedUntil: null,
    fingerprint: generateFingerprint(),
  };
}

// 로컬 스토리지에 데이터 저장
function saveClickData(data: ClickData): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(data));
  } catch {
    // 저장 실패 무시
  }
}

// 광고 요소 숨기기/보이기
function setAdsVisibility(visible: boolean): void {
  const ads = document.querySelectorAll(
    'ins.adsbygoogle, [id^="google_ads"], .ad-container, [data-ad-slot]'
  );

  ads.forEach((ad) => {
    (ad as HTMLElement).style.display = visible ? "block" : "none";
  });
}

// GA4 이벤트 전송
function trackSuspiciousActivity(reason: string, clickCount: number): void {
  if (typeof window !== "undefined" && "gtag" in window) {
    (window as typeof window & { gtag: Function }).gtag("event", "suspicious_ad_click", {
      event_category: "ad_protection",
      event_label: reason,
      value: clickCount,
    });
  }

  // 개발 환경 로그
  if (process.env.NODE_ENV === "development") {
    console.warn(`[AdProtection] ${reason} - 클릭 수: ${clickCount}`);
  }
}

export function AdClickProtection() {
  const handleClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;

    // 광고 영역 클릭인지 확인
    const isAdClick = !!(
      target.closest("ins.adsbygoogle") ||
      target.closest('[id^="google_ads"]') ||
      target.closest(".ad-container") ||
      target.closest("[data-ad-slot]")
    );

    if (!isAdClick) return;

    const now = Date.now();
    const data = getClickData();

    // 이미 차단 상태인지 확인
    if (data.blockedUntil && now < data.blockedUntil) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // 차단 해제 시간이 지났으면 초기화
    if (data.blockedUntil && now >= data.blockedUntil) {
      data.blockedUntil = null;
      data.clicks = [];
      setAdsVisibility(true);
    }

    // 시간 윈도우 내 클릭만 유지
    data.clicks = data.clicks.filter(
      (timestamp) => now - timestamp < CONFIG.timeWindow
    );

    // 현재 클릭 추가
    data.clicks.push(now);

    // 무효 클릭 감지
    if (data.clicks.length > CONFIG.maxClicks) {
      data.blockedUntil = now + CONFIG.blockDuration;

      // 광고 숨기기
      setAdsVisibility(false);

      // 의심 활동 추적
      trackSuspiciousActivity(
        `${CONFIG.timeWindow / 1000}초 내 ${data.clicks.length}회 클릭`,
        data.clicks.length
      );
    }

    saveClickData(data);
  }, []);

  useEffect(() => {
    // 페이지 로드 시 차단 상태 확인
    const data = getClickData();
    const now = Date.now();

    if (data.blockedUntil && now < data.blockedUntil) {
      // 아직 차단 중
      setAdsVisibility(false);

      // 차단 해제 시 광고 다시 표시
      const remaining = data.blockedUntil - now;
      const timer = setTimeout(() => {
        setAdsVisibility(true);
        const newData = getClickData();
        newData.blockedUntil = null;
        newData.clicks = [];
        saveClickData(newData);
      }, remaining);

      return () => clearTimeout(timer);
    }

    // 클릭 이벤트 리스너 등록 (캡처 단계)
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [handleClick]);

  // 이 컴포넌트는 UI를 렌더링하지 않음
  return null;
}
