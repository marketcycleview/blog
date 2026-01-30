import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { SearchBar } from "@/components/SearchBar";
import { ToolsStrip } from "@/components/ToolsStrip";
import { CategoryTabBar } from "@/components/CategoryTabBar";
import { VerticalPostCard } from "@/components/PostCards";
import { CATEGORIES } from "@/lib/categories";

interface PageProps {
  params: Promise<{ locale: string }>;
}

// 카테고리별 "더보기" 버튼 색상
const buttonColors: Record<string, string> = {
  blue: "bg-blue-600 hover:bg-blue-700",
  green: "bg-green-600 hover:bg-green-700",
  purple: "bg-purple-600 hover:bg-purple-700",
  orange: "bg-orange-500 hover:bg-orange-600",
  indigo: "bg-indigo-600 hover:bg-indigo-700",
  red: "bg-red-600 hover:bg-red-700",
  amber: "bg-amber-500 hover:bg-amber-600",
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const posts = await getAllPosts(locale);

  // 카테고리별 글 분류
  const postsByCategory: Record<string, typeof posts> = {};
  for (const cat of CATEGORIES) {
    postsByCategory[cat.id] = posts
      .filter((p) => p.category === cat.id)
      .slice(0, 3);
  }

  // 글이 있는 카테고리만 필터링
  const activeCategories = CATEGORIES.filter(
    (cat) => postsByCategory[cat.id].length > 0
  );
  const activeSectionIds = activeCategories.map((cat) => `section-${cat.id}`);

  // 트렌딩: 전체 카테고리 최신 6개
  const trendingPosts = posts.slice(0, 6);

  return (
    <div>
      {/* Sticky 카테고리 탭 바 */}
      <CategoryTabBar
        locale={locale}
        categories={activeCategories}
        sectionIds={[...activeSectionIds, "section-tools"]}
      />

      {/* 히어로 섹션 */}
      <section className="text-center py-10 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          {locale === "ko"
            ? "내 돈 챙기기, 여기서 시작"
            : "Manage Your Money Here"}
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6">
          {locale === "ko"
            ? "복지 · 금융 · 세금 · 부동산 · 커리어 · 법률 · 창업"
            : "Welfare · Finance · Tax · Real Estate · Career · Legal · Business"}
        </p>
        <SearchBar locale={locale} />
      </section>

      {/* 인기 도구 스트립 */}
      <section id="section-tools" className="mb-10 scroll-mt-[120px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {locale === "ko" ? "🛠️ 인기 도구" : "🛠️ Popular Tools"}
          </h2>
          <Link
            href={`/${locale}/tools`}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            {locale === "ko" ? "전체 보기 →" : "View All →"}
          </Link>
        </div>
        <ToolsStrip locale={locale} limit={8} />
      </section>

      {/* 지금 많이 보는 글 (크로스 카테고리) */}
      {trendingPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">
            {locale === "ko"
              ? "🔥 지금 많이 보는 글"
              : "🔥 Trending Now"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingPosts.map((post) => (
              <VerticalPostCard
                key={post.slug}
                post={post}
                locale={locale}
              />
            ))}
          </div>
        </section>
      )}

      {/* 카테고리별 섹션 */}
      {CATEGORIES.map((cat) => {
        const catPosts = postsByCategory[cat.id];
        if (catPosts.length === 0) return null;

        const btnColor = buttonColors[cat.color] || buttonColors.blue;

        return (
          <section
            key={cat.id}
            id={`section-${cat.id}`}
            className="mb-12 scroll-mt-[120px]"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {cat.icon}{" "}
                {locale === "ko" ? cat.label.ko : cat.label.en}
              </h2>
              <Link
                href={`/${locale}${cat.href}`}
                className={`px-4 py-1.5 ${btnColor} text-white text-sm rounded-lg transition`}
              >
                {locale === "ko" ? "더보기" : "View All"}
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {catPosts.map((post) => (
                <VerticalPostCard
                  key={post.slug}
                  post={post}
                  locale={locale}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
