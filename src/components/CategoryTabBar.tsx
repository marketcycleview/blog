"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Category } from "@/lib/categories";

interface CategoryTabBarProps {
  locale: string;
  categories: Category[];
  sectionIds: string[];
}

// 카테고리 색상 → tailwind 배경/텍스트 매핑
const colorMap: Record<string, { active: string; text: string }> = {
  blue: { active: "bg-blue-600 text-white", text: "text-blue-600" },
  green: { active: "bg-green-600 text-white", text: "text-green-600" },
  purple: { active: "bg-purple-600 text-white", text: "text-purple-600" },
  orange: { active: "bg-orange-500 text-white", text: "text-orange-600" },
  indigo: { active: "bg-indigo-600 text-white", text: "text-indigo-600" },
  red: { active: "bg-red-600 text-white", text: "text-red-600" },
  amber: { active: "bg-amber-500 text-white", text: "text-amber-600" },
};

export function CategoryTabBar({
  locale,
  categories,
  sectionIds,
}: CategoryTabBarProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // IntersectionObserver로 현재 보이는 섹션 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-120px 0px -60% 0px",
      }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  // 활성 필이 보이도록 수평 스크롤
  useEffect(() => {
    if (activeId && pillRefs.current[activeId] && scrollRef.current) {
      const pill = pillRefs.current[activeId]!;
      const container = scrollRef.current;
      const pillLeft = pill.offsetLeft;
      const pillWidth = pill.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollLeft = container.scrollLeft;

      if (pillLeft < scrollLeft || pillLeft + pillWidth > scrollLeft + containerWidth) {
        container.scrollTo({
          left: pillLeft - containerWidth / 2 + pillWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [activeId]);

  const handleClick = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  if (categories.length === 0) return null;

  return (
    <div className="sticky top-[52px] z-40 bg-white border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div
          ref={scrollRef}
          className="flex gap-2 py-2.5 overflow-x-auto scrollbar-hide"
        >
          {categories.map((cat) => {
            const sectionId = `section-${cat.id}`;
            const isActive = activeId === sectionId;
            const colors = colorMap[cat.color] || colorMap.blue;

            return (
              <button
                key={cat.id}
                ref={(el) => { pillRefs.current[sectionId] = el; }}
                onClick={() => handleClick(sectionId)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  isActive
                    ? colors.active
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span>{cat.icon}</span>
                {locale === "ko" ? cat.label.ko : cat.label.en}
              </button>
            );
          })}
          {/* 도구 탭 */}
          <button
            onClick={() => handleClick("section-tools")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
              activeId === "section-tools"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            🛠️ {locale === "ko" ? "도구" : "Tools"}
          </button>
        </div>
      </div>
    </div>
  );
}
