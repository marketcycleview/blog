import Link from "next/link";
import Image from "next/image";
import { getPostsByCategory } from "@/lib/posts";
import { notFound } from "next/navigation";
import { SearchBar } from "@/components/SearchBar";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

const validCategories = ["subsidy", "review", "trending"];

const categoryNames = {
  ko: {
    subsidy: "지원금/정책 정보",
    review: "제품 리뷰",
    trending: "트렌딩 이슈",
  },
  en: {
    subsidy: "Subsidies & Policies",
    review: "Product Reviews",
    trending: "Trending Issues",
  },
};

const categoryDescriptions = {
  ko: {
    subsidy: "정부/지자체 지원금, 복지 정책, 세금 관련 정보를 한눈에 확인하세요.",
    review: "실사용자 리뷰를 모아 제품의 장단점을 객관적으로 분석합니다.",
    trending: "실시간 화제가 되는 이슈와 뉴스를 빠르게 정리합니다.",
  },
  en: {
    subsidy: "Find government subsidies, welfare policies, and tax information.",
    review: "We collect real user reviews to objectively analyze product pros and cons.",
    trending: "Quick summary of trending issues and news.",
  },
};

interface PageProps {
  params: Promise<{ locale: string; category: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { locale, category } = await params;

  if (!validCategories.includes(category)) {
    notFound();
  }

  const posts = await getPostsByCategory(locale, category);
  const lang = locale as "ko" | "en";
  const categoryName = categoryNames[lang]?.[category as keyof typeof categoryNames.ko] || category;
  const categoryDesc = categoryDescriptions[lang]?.[category as keyof typeof categoryDescriptions.ko] || "";

  return (
    <div>
      {/* 카테고리 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
        <p className="text-gray-600 mb-4">{categoryDesc}</p>
        <SearchBar locale={locale} />
      </div>

      {/* 글 목록 */}
      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => {
            const ogImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(category)}&v=2`;

            return (
              <Link
                key={post.slug}
                href={`/${locale}/${category}/${post.slug}`}
                className="flex flex-col sm:flex-row gap-4 p-4 bg-white border rounded-lg hover:shadow-lg transition group"
              >
                {/* 썸네일 이미지 */}
                <div className="relative w-full sm:w-48 h-32 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={ogImageUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 192px"
                  />
                </div>

                {/* 텍스트 영역 */}
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500 mb-2">{post.date}</div>
                  <h2 className="text-lg font-semibold mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">{post.description}</p>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">
            {locale === "ko"
              ? "아직 작성된 글이 없습니다."
              : "No posts yet."}
          </p>
          <p className="text-gray-400 mt-2">
            {locale === "ko"
              ? "곧 새로운 콘텐츠가 업데이트됩니다."
              : "New content coming soon."}
          </p>
        </div>
      )}
    </div>
  );
}

export function generateStaticParams() {
  const locales = ["ko", "en"];
  const categories = ["subsidy", "review", "trending"];

  return locales.flatMap((locale) =>
    categories.map((category) => ({
      locale,
      category,
    }))
  );
}
