import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import { SearchBar } from "@/components/SearchBar";
import { ToolCard } from "@/components/ToolCard";
import { getFeaturedTools } from "@/lib/tools/constants";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const posts = await getAllPosts(locale);

  // 카테고리별로 최신 글 가져오기
  const subsidyPosts = posts.filter((p) => p.category === "subsidy").slice(0, 3);
  const trendingPosts = posts.filter((p) => p.category === "trending").slice(0, 3);

  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="text-center py-12 mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {locale === "ko"
            ? "내 돈 챙기기, 여기서 시작"
            : "Manage Your Money Here"}
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          {locale === "ko"
            ? "복지 지원금, 금융 정보, 세금 가이드"
            : "Welfare Benefits, Finance Info, Tax Guide"}
        </p>

        {/* 검색창 */}
        <SearchBar locale={locale} />
      </section>

      {/* 지원금/정책 섹션 */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {locale === "ko" ? "💰 지원금/정책 정보" : "💰 Subsidies & Policies"}
          </h2>
          <Link href={`/${locale}/subsidy`} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
            {locale === "ko" ? "전체 보기" : "View All"}
          </Link>
        </div>

        {/* 복지 정책 찾기 CTA 배너 */}
        <Link
          href={`/${locale}/tools/welfare-finder`}
          className="block mb-6 p-4 sm:p-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl group"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🔍</span>
                <h3 className="text-lg sm:text-xl font-bold">
                  {locale === "ko" ? "나에게 맞는 지원금 찾기" : "Find Benefits for You"}
                </h3>
              </div>
              <p className="text-emerald-100 text-sm sm:text-base">
                {locale === "ko"
                  ? "나이, 소득, 상황에 맞는 지원금을 1분 만에 확인하세요"
                  : "Find eligible benefits based on your age, income, and situation in 1 minute"}
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition">
              <span className="font-medium">
                {locale === "ko" ? "지금 찾아보기" : "Find Now"}
              </span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subsidyPosts.length > 0 ? (
            subsidyPosts.map((post) => (
              <VerticalPostCard key={post.slug} post={post} locale={locale} siteUrl={siteUrl} />
            ))
          ) : (
            <EmptyCard locale={locale} category="subsidy" />
          )}
        </div>
      </section>

      {/* 트렌딩 섹션 */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {locale === "ko" ? "🔥 트렌딩 이슈" : "🔥 Trending Issues"}
          </h2>
          <Link href={`/${locale}/trending`} className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition">
            {locale === "ko" ? "전체 보기" : "View All"}
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingPosts.length > 0 ? (
            trendingPosts.map((post) => (
              <VerticalPostCard key={post.slug} post={post} locale={locale} siteUrl={siteUrl} />
            ))
          ) : (
            <EmptyCard locale={locale} category="trending" />
          )}
        </div>
      </section>

      {/* 무료 도구 섹션 */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {locale === "ko" ? "🛠️ 무료 도구" : "🛠️ Free Tools"}
          </h2>
          <Link href={`/${locale}/tools`} className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition">
            {locale === "ko" ? "전체 보기" : "View All"}
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {getFeaturedTools(4).map((tool) => (
            <ToolCard key={tool.id} tool={tool} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

const categoryLabels: Record<string, { ko: string; en: string; icon: string }> = {
  subsidy: { ko: "지원금", en: "Subsidy", icon: "💰" },
  trending: { ko: "트렌딩", en: "Trending", icon: "🔥" },
  finance: { ko: "금융", en: "Finance", icon: "🏦" },
  tax: { ko: "세금", en: "Tax", icon: "📋" },
};

// 세로형 카드 (메인페이지용 - 3열 그리드)
function VerticalPostCard({ post, locale, siteUrl }: { post: Post; locale: string; siteUrl: string }) {
  const ogImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}&v=4`;

  return (
    <Link
      href={`/${locale}/${post.category}/${post.slug}`}
      className="flex flex-col bg-white border rounded-lg overflow-hidden hover:shadow-lg transition group"
    >
      {/* 썸네일 이미지 - 세로형은 이미지가 크게 */}
      <div className="relative w-full aspect-[1200/630] bg-gray-100">
        <Image
          src={ogImageUrl}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* 텍스트 영역 */}
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-2">{post.date}</div>
        <h3 className="text-base font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>
      </div>
    </Link>
  );
}

// 가로형 카드 (카테고리 페이지용 - 유지)
function PostCard({ post, locale, siteUrl }: { post: Post; locale: string; siteUrl: string }) {
  // OG 이미지 URL 생성
  const ogImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}&v=4`;
  const label = categoryLabels[post.category] || { ko: "정보", en: "Info", icon: "📄" };

  return (
    <Link
      href={`/${locale}/${post.category}/${post.slug}`}
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
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full">
            {label.icon} {locale === "ko" ? label.ko : label.en}
          </span>
          <span>{post.date}</span>
        </div>
        <h3 className="text-lg font-semibold mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">{post.description}</p>
      </div>
    </Link>
  );
}

function EmptyCard({ locale, category }: { locale: string; category: string }) {
  const messages = {
    ko: {
      subsidy: "아직 지원금 정보가 없습니다.",
      trending: "아직 트렌딩 이슈가 없습니다.",
      finance: "아직 금융 정보가 없습니다.",
      tax: "아직 세금 정보가 없습니다.",
    },
    en: {
      subsidy: "No subsidy info yet.",
      trending: "No trending issues yet.",
      finance: "No finance info yet.",
      tax: "No tax info yet.",
    },
  };

  return (
    <div className="p-6 bg-gray-50 border border-dashed rounded-lg text-center text-gray-500">
      {messages[locale as keyof typeof messages]?.[category as keyof typeof messages.ko] || "Coming soon..."}
    </div>
  );
}
