import Link from "next/link";
import { Tool, TOOL_CATEGORIES } from "@/lib/tools/constants";

interface ToolCardProps {
  tool: Tool;
  locale: string;
}

// 카테고리별 색상 클래스
const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  fortune: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    border: "border-purple-200 hover:border-purple-400",
  },
  calculator: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-200 hover:border-blue-400",
  },
  finder: {
    bg: "bg-green-50",
    text: "text-green-600",
    border: "border-green-200 hover:border-green-400",
  },
  other: {
    bg: "bg-gray-50",
    text: "text-gray-600",
    border: "border-gray-200 hover:border-gray-400",
  },
};

export function ToolCard({ tool, locale }: ToolCardProps) {
  const colors = categoryColors[tool.category] || categoryColors.other;
  const category = TOOL_CATEGORIES[tool.category];

  return (
    <Link
      href={`/${locale}${tool.href}`}
      className={`block p-4 rounded-xl border-2 ${colors.border} ${colors.bg} hover:shadow-md transition-all duration-200 group`}
    >
      {/* 아이콘 & 배지 */}
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{tool.icon}</span>
        <div className="flex gap-1">
          {tool.isPopular && (
            <span className="px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-600 rounded-full">
              {locale === "ko" ? "인기" : "Popular"}
            </span>
          )}
          {tool.isNew && (
            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-600 rounded-full">
              NEW
            </span>
          )}
        </div>
      </div>

      {/* 제목 */}
      <h3 className={`font-bold text-lg mb-1 ${colors.text} group-hover:underline`}>
        {locale === "ko" ? tool.title.ko : tool.title.en}
      </h3>

      {/* 설명 */}
      <p className="text-sm text-gray-600 line-clamp-2">
        {locale === "ko" ? tool.description.ko : tool.description.en}
      </p>

      {/* 카테고리 태그 */}
      <div className="mt-3">
        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
          {category?.icon} {locale === "ko" ? category?.ko : category?.en}
        </span>
      </div>
    </Link>
  );
}

// 메인페이지용 간소화된 카드
export function ToolCardCompact({ tool, locale }: ToolCardProps) {
  const colors = categoryColors[tool.category] || categoryColors.other;

  return (
    <Link
      href={`/${locale}${tool.href}`}
      className={`flex items-center gap-3 p-3 rounded-lg border ${colors.border} bg-white hover:shadow-md transition-all duration-200 group`}
    >
      <span className="text-2xl flex-shrink-0">{tool.icon}</span>
      <div className="min-w-0 flex-1">
        <h3 className={`font-semibold text-sm ${colors.text} group-hover:underline truncate`}>
          {locale === "ko" ? tool.title.ko : tool.title.en}
        </h3>
        <p className="text-xs text-gray-500 truncate">
          {locale === "ko" ? tool.description.ko : tool.description.en}
        </p>
      </div>
      {(tool.isNew || tool.isPopular) && (
        <div className="flex-shrink-0">
          {tool.isNew && (
            <span className="px-1.5 py-0.5 text-[10px] font-medium bg-green-100 text-green-600 rounded">
              NEW
            </span>
          )}
          {tool.isPopular && !tool.isNew && (
            <span className="px-1.5 py-0.5 text-[10px] font-medium bg-orange-100 text-orange-600 rounded">
              HOT
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
