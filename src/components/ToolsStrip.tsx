import Link from "next/link";
import { getFeaturedTools, TOOL_CATEGORIES } from "@/lib/tools/constants";

interface ToolsStripProps {
  locale: string;
  limit?: number;
}

export function ToolsStrip({ locale, limit = 8 }: ToolsStripProps) {
  const tools = getFeaturedTools(limit);

  return (
    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
      <div className="flex gap-3">
        {tools.map((tool) => {
          const category = TOOL_CATEGORIES[tool.category];
          return (
            <Link
              key={tool.id}
              href={`/${locale}${tool.href}`}
              className="w-[200px] flex-shrink-0 p-4 bg-white border rounded-xl hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">{tool.icon}</span>
                {tool.isPopular && (
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-orange-100 text-orange-600 rounded">
                    HOT
                  </span>
                )}
                {tool.isNew && !tool.isPopular && (
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-green-100 text-green-600 rounded">
                    NEW
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                {locale === "ko" ? tool.title.ko : tool.title.en}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2">
                {locale === "ko" ? tool.description.ko : tool.description.en}
              </p>
              {category && (
                <div className="mt-2 text-[10px] text-gray-400">
                  {category.icon} {locale === "ko" ? category.ko : category.en}
                </div>
              )}
            </Link>
          );
        })}
        {/* 전체 보기 카드 */}
        <Link
          href={`/${locale}/tools`}
          className="w-[200px] flex-shrink-0 p-4 bg-gray-50 border border-dashed rounded-xl hover:bg-gray-100 transition-all flex flex-col items-center justify-center text-center"
        >
          <span className="text-3xl mb-2">+</span>
          <span className="text-sm font-medium text-gray-600">
            {locale === "ko" ? "전체 도구 보기" : "View All Tools"}
          </span>
        </Link>
      </div>
    </div>
  );
}
