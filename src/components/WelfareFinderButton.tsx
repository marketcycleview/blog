"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface WelfareFinderButtonProps {
  locale: string;
}

export function WelfareFinderButton({ locale }: WelfareFinderButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 300px 스크롤 후 버튼 표시
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Link
      href={`/${locale}/tools/welfare-finder`}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-16 opacity-0 pointer-events-none"
      }`}
      aria-label={locale === "ko" ? "다른 지원금 찾아보기" : "Find more benefits"}
    >
      <span className="text-lg">🔍</span>
      <span className="hidden sm:inline font-medium text-sm">
        {locale === "ko" ? "다른 지원금 찾기" : "Find Benefits"}
      </span>
    </Link>
  );
}
