"use client";

interface AdPlaceholderProps {
  slot: "top" | "middle" | "bottom" | "sidebar";
  className?: string;
}

export function AdPlaceholder({ slot, className = "" }: AdPlaceholderProps) {
  // 개발 환경에서는 플레이스홀더 표시
  // 프로덕션에서는 실제 애드센스 코드로 교체
  const isProduction = process.env.NODE_ENV === "production";

  const slotLabels = {
    top: "광고 영역 (상단)",
    middle: "광고 영역 (중간)",
    bottom: "광고 영역 (하단)",
    sidebar: "광고 영역 (사이드바)",
  };

  const slotStyles = {
    top: "h-24 md:h-28",
    middle: "h-64 md:h-72",
    bottom: "h-24 md:h-28",
    sidebar: "h-64",
  };

  if (isProduction) {
    // 프로덕션: 실제 애드센스 코드
    // data-ad-client와 data-ad-slot은 애드센스 승인 후 교체
    return (
      <div className={`ad-container my-6 ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // 개발 환경: 플레이스홀더
  return (
    <div
      className={`
        ${slotStyles[slot]}
        ${className}
        my-6 bg-gray-100 border-2 border-dashed border-gray-300
        rounded-lg flex items-center justify-center text-gray-400
        text-sm
      `}
    >
      {slotLabels[slot]}
    </div>
  );
}
