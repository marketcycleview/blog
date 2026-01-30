import Link from "next/link";
import Image from "next/image";
import { CATEGORY_MAP } from "@/lib/categories";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

// 세로형 카드 (메인페이지 3열 그리드용)
export function VerticalPostCard({
  post,
  locale,
}: {
  post: Post;
  locale: string;
}) {
  const ogImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}&v=4`;
  const cat = CATEGORY_MAP[post.category];

  return (
    <Link
      href={`/${locale}/${post.category}/${post.slug}`}
      className="flex flex-col bg-white border rounded-lg overflow-hidden hover:shadow-lg transition group"
    >
      <div className="relative w-full aspect-[1200/630] bg-gray-100">
        <Image
          src={ogImageUrl}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        {cat && (
          <div className="text-xs text-gray-500 mb-1">
            {cat.icon} {locale === "ko" ? cat.label.ko : cat.label.en}
          </div>
        )}
        <div className="text-xs text-gray-400 mb-2">{post.date}</div>
        <h3 className="text-base font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>
      </div>
    </Link>
  );
}

// 가로형 카드 (카테고리 페이지용)
export function HorizontalPostCard({
  post,
  locale,
}: {
  post: Post;
  locale: string;
}) {
  const ogImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}&v=4`;
  const cat = CATEGORY_MAP[post.category];

  return (
    <Link
      href={`/${locale}/${post.category}/${post.slug}`}
      className="flex flex-col sm:flex-row gap-4 p-4 bg-white border rounded-lg hover:shadow-lg transition group"
    >
      <div className="relative w-full sm:w-48 h-32 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={ogImageUrl}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, 192px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          {cat && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full">
              {cat.icon} {locale === "ko" ? cat.label.ko : cat.label.en}
            </span>
          )}
          <span>{post.date}</span>
        </div>
        <h3 className="text-lg font-semibold mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {post.description}
        </p>
      </div>
    </Link>
  );
}

// 빈 카테고리 표시
export function EmptyCard({
  locale,
  category,
}: {
  locale: string;
  category: string;
}) {
  const cat = CATEGORY_MAP[category];
  const label = cat
    ? locale === "ko"
      ? cat.label.ko
      : cat.label.en
    : category;

  return (
    <div className="p-6 bg-gray-50 border border-dashed rounded-lg text-center text-gray-500">
      {locale === "ko"
        ? `아직 ${label} 정보가 없습니다.`
        : `No ${label} info yet.`}
    </div>
  );
}
