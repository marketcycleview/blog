"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  locale?: string;
}

// 텍스트를 URL-safe한 id로 변환
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// MDX 콘텐츠에서 헤딩 추출
function extractHeadings(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugify(text);

    headings.push({ id, text, level });
  }

  return headings;
}

export function TableOfContents({ content, locale = "ko" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const headings = extractHeadings(content);

  // 스크롤 위치에 따라 현재 섹션 하이라이트
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) {
    return null; // 헤딩이 3개 미만이면 목차 표시 안함
  }

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-blue-50/60 rounded-lg p-5 mb-10 border border-blue-100">
      <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span>📑</span>
        {locale === "ko" ? "목차" : "Table of Contents"}
      </h2>
      <ul className="space-y-1">
        {headings.map((heading, index) => (
          <li
            key={`${heading.id}-${index}`}
            className={heading.level === 3 ? "ml-4" : ""}
          >
            <button
              onClick={() => handleClick(heading.id)}
              className={`
                text-left text-sm w-full py-1.5 px-3 rounded transition-colors
                hover:bg-blue-100/70
                ${activeId === heading.id
                  ? "text-blue-700 font-semibold bg-blue-100"
                  : "text-gray-600"
                }
              `}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
