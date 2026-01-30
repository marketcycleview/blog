"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  // 경로 변경 시 메뉴 닫기
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    return pathname.startsWith(`/${locale}${href}`);
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <Link href={`/${locale}`} className="text-xl font-bold text-gray-900 flex-shrink-0">
            InfoTalker 인포토커
          </Link>

          {/* 데스크탑 네비 (lg 이상) */}
          <div className="hidden lg:flex items-center gap-1">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/${locale}${cat.href}`}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(cat.href)
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {locale === "ko" ? cat.label.ko : cat.label.en}
              </Link>
            ))}
            <Link
              href={`/${locale}/tools`}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isActive("/tools")
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {locale === "ko" ? "도구" : "Tools"}
            </Link>
          </div>

          {/* 언어 전환 + 햄버거 */}
          <div className="flex items-center gap-3">
            <div className="flex gap-2 text-sm">
              <Link
                href="/ko"
                className={locale === "ko" ? "font-bold text-gray-900" : "text-gray-500 hover:text-gray-700"}
              >
                KO
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="/en"
                className={locale === "en" ? "font-bold text-gray-900" : "text-gray-500 hover:text-gray-700"}
              >
                EN
              </Link>
            </div>

            {/* 햄버거 버튼 (lg 미만) */}
            <button
              ref={buttonRef}
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="메뉴 열기"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 패널 */}
        {menuOpen && (
          <div ref={menuRef} className="lg:hidden mt-3 pb-3 border-t pt-3">
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/${locale}${cat.href}`}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(cat.href)
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{cat.icon}</span>
                  {locale === "ko" ? cat.label.ko : cat.label.en}
                </Link>
              ))}
              <Link
                href={`/${locale}/tools`}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/tools")
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span>🛠️</span>
                {locale === "ko" ? "도구" : "Tools"}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
