import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const posts = await getAllPosts(locale);

  // 카테고리별로 최신 글 가져오기
  const subsidyPosts = posts.filter((p) => p.category === "subsidy").slice(0, 3);
  const reviewPosts = posts.filter((p) => p.category === "review").slice(0, 3);
  const trendingPosts = posts.filter((p) => p.category === "trending").slice(0, 3);

  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="text-center py-12 mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {locale === "ko"
            ? "정보와 리뷰를 한 곳에서"
            : "Information & Reviews in One Place"}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {locale === "ko"
            ? "지원금 정보, 제품 리뷰, 실시간 트렌딩 이슈"
            : "Subsidy Info, Product Reviews, Trending Issues"}
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href={`/${locale}/subsidy`}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {locale === "ko" ? "지원금 정보 보기" : "View Subsidies"}
          </Link>
          <Link
            href={`/${locale}/review`}
            className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            {locale === "ko" ? "리뷰 보기" : "View Reviews"}
          </Link>
        </div>
      </section>

      {/* 지원금/정책 섹션 */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {locale === "ko" ? "💰 지원금/정책 정보" : "💰 Subsidies & Policies"}
          </h2>
          <Link href={`/${locale}/subsidy`} className="text-blue-600 hover:underline">
            {locale === "ko" ? "전체 보기 →" : "View All →"}
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {subsidyPosts.length > 0 ? (
            subsidyPosts.map((post) => (
              <PostCard key={post.slug} post={post} locale={locale} />
            ))
          ) : (
            <EmptyCard locale={locale} category="subsidy" />
          )}
        </div>
      </section>

      {/* 리뷰 섹션 */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {locale === "ko" ? "⭐ 제품 리뷰" : "⭐ Product Reviews"}
          </h2>
          <Link href={`/${locale}/review`} className="text-blue-600 hover:underline">
            {locale === "ko" ? "전체 보기 →" : "View All →"}
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviewPosts.length > 0 ? (
            reviewPosts.map((post) => (
              <PostCard key={post.slug} post={post} locale={locale} />
            ))
          ) : (
            <EmptyCard locale={locale} category="review" />
          )}
        </div>
      </section>

      {/* 트렌딩 섹션 */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {locale === "ko" ? "🔥 트렌딩 이슈" : "🔥 Trending Issues"}
          </h2>
          <Link href={`/${locale}/trending`} className="text-blue-600 hover:underline">
            {locale === "ko" ? "전체 보기 →" : "View All →"}
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {trendingPosts.length > 0 ? (
            trendingPosts.map((post) => (
              <PostCard key={post.slug} post={post} locale={locale} />
            ))
          ) : (
            <EmptyCard locale={locale} category="trending" />
          )}
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

function PostCard({ post, locale }: { post: Post; locale: string }) {
  return (
    <Link
      href={`/${locale}/${post.category}/${post.slug}`}
      className="block p-6 bg-white border rounded-lg hover:shadow-lg transition"
    >
      <div className="text-sm text-gray-500 mb-2">{post.date}</div>
      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
      <p className="text-gray-600 text-sm line-clamp-2">{post.description}</p>
    </Link>
  );
}

function EmptyCard({ locale, category }: { locale: string; category: string }) {
  const messages = {
    ko: {
      subsidy: "아직 지원금 정보가 없습니다.",
      review: "아직 리뷰가 없습니다.",
      trending: "아직 트렌딩 이슈가 없습니다.",
    },
    en: {
      subsidy: "No subsidy info yet.",
      review: "No reviews yet.",
      trending: "No trending issues yet.",
    },
  };

  return (
    <div className="p-6 bg-gray-50 border border-dashed rounded-lg text-center text-gray-500">
      {messages[locale as keyof typeof messages]?.[category as keyof typeof messages.ko] || "Coming soon..."}
    </div>
  );
}
