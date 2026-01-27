"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  locale: string;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ locale, placeholder, className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const defaultPlaceholder =
    locale === "ko"
      ? "궁금한 정보를 검색하세요... (예: 민생지원금, 뉴발란스)"
      : "Search for information... (e.g., subsidy, reviews)";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-2xl mx-auto ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder || defaultPlaceholder}
          className="w-full px-6 py-4 pr-14 text-lg border-2 border-gray-200 rounded-full
                     focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                     shadow-sm hover:shadow-md transition-shadow bg-white"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-blue-600 text-white
                     rounded-full hover:bg-blue-700 transition-colors"
          aria-label={locale === "ko" ? "검색" : "Search"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
