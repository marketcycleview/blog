import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ReviewSection } from "@/components/ReviewSection";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { LinkButton } from "@/components/LinkButton";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { WelfareFinderButton } from "@/components/WelfareFinderButton";
import { TableOfContents } from "@/components/TableOfContents";
import type { Metadata } from "next";
import Image from "next/image";
import remarkGfm from "remark-gfm";

// 텍스트를 URL-safe한 id로 변환
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
const siteName = "SEO 블로그";

interface PageProps {
  params: Promise<{ locale: string; category: string; slug: string }>;
}

// MDX에서 사용할 커스텀 컴포넌트
const components = {
  ReviewSection,
  AdPlaceholder,
  LinkButton,
  // 이미지 컴포넌트 (Next.js Image 최적화)
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const { src, alt, width, height, ...rest } = props;
    if (!src || typeof src !== "string") return null;

    // 외부 URL인 경우 일반 img 태그 사용
    if (src.startsWith("http")) {
      return (
        <figure className="my-6">
          <img
            src={src}
            alt={alt || ""}
            className="w-full rounded-lg shadow-md"
            loading="lazy"
            {...rest}
          />
          {alt && (
            <figcaption className="text-center text-sm text-gray-500 mt-2">
              {alt}
            </figcaption>
          )}
        </figure>
      );
    }

    // 내부 이미지는 Next.js Image 사용
    return (
      <figure className="my-6">
        <Image
          src={src}
          alt={alt || ""}
          width={800}
          height={450}
          className="w-full rounded-lg shadow-md"
          {...rest}
        />
        {alt && (
          <figcaption className="text-center text-sm text-gray-500 mt-2">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  },
  // 헤딩 컴포넌트 (목차 연동을 위한 id 자동 생성)
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = typeof props.children === "string" ? props.children : "";
    const id = slugify(text);
    return (
      <h2 id={id} className="text-[1.625rem] font-bold mt-14 mb-5 pb-3 border-b-2 border-blue-600 text-gray-900 scroll-mt-20" {...props} />
    );
  },
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = typeof props.children === "string" ? props.children : "";
    const id = slugify(text);
    return (
      <h3 id={id} className="text-lg font-semibold mt-8 mb-3 text-gray-900 pl-3 border-l-[3px] border-blue-400 scroll-mt-20" {...props} />
    );
  },
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-5 text-[1.0625rem] leading-[1.85] text-gray-800 tracking-[-0.01em] break-keep" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-5 pl-6 list-disc space-y-2.5" {...props} />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-5 pl-6 list-decimal space-y-2.5" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="text-gray-800 text-[1.0625rem] leading-[1.85] break-keep" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-blue-600 hover:text-blue-800 underline underline-offset-2"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-blue-500 pl-4 py-4 my-8 bg-blue-50 rounded-r-lg text-gray-700"
      {...props}
    />
  ),
  // 테이블 (반응형 래퍼 포함)
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6 rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full min-w-full divide-y divide-gray-200" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-blue-50" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="bg-white divide-y divide-gray-200" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-gray-50 transition-colors" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-4 py-3.5 text-left text-sm font-bold text-blue-900 whitespace-nowrap"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3.5 text-sm text-gray-700 break-keep" {...props} />
  ),
  // 코드 블록
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="my-4 p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm" {...props} />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    // code block 내부(pre > code)인 경우 별도 스타일 적용하지 않음
    if (className?.startsWith('language-')) {
      return <code className={className} {...props} />;
    }
    return (
      <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-semibold" {...props} />
    );
  },
  // 수평선
  hr: () => <hr className="my-12 border-t border-gray-200" />,
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, category, slug } = await params;
  const post = await getPostBySlug(locale, category, slug);

  if (!post) {
    return {
      title: "Not Found",
    };
  }

  const postUrl = `${siteUrl}/${locale}/${category}/${slug}`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  // 동적 OG 이미지 URL 생성
  const ogImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description || "")}&category=${encodeURIComponent(category)}&v=2`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: postUrl,
      languages: {
        [locale]: postUrl,
        [alternateLocale]: `${siteUrl}/${alternateLocale}/${category}/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: postUrl,
      siteName: siteName,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { locale, category, slug } = await params;
  const post = await getPostBySlug(locale, category, slug);

  if (!post) {
    notFound();
  }

  const postUrl = `${siteUrl}/${locale}/${category}/${slug}`;
  const categoryNames: Record<string, Record<string, string>> = {
    ko: { subsidy: "지원금", review: "리뷰", trending: "트렌딩" },
    en: { subsidy: "Subsidy", review: "Review", trending: "Trending" },
  };
  const homeName = locale === "ko" ? "홈" : "Home";
  const categoryDisplayName = categoryNames[locale]?.[category] || category;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        url={postUrl}
        datePublished={post.date}
        authorName={siteName}
        publisherName={siteName}
      />
      <BreadcrumbJsonLd
        items={[
          { name: homeName, url: `${siteUrl}/${locale}` },
          { name: categoryDisplayName, url: `${siteUrl}/${locale}/${category}` },
          { name: post.title, url: postUrl },
        ]}
      />

      <article className="max-w-3xl mx-auto">
        {/* 헤더 */}
        <header className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <a href={`/${locale}`} className="hover:text-gray-700">
            {locale === "ko" ? "홈" : "Home"}
          </a>
          <span>›</span>
          <a href={`/${locale}/${category}`} className="hover:text-gray-700 capitalize">
            {category}
          </a>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 break-keep">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-gray-500">
          <time dateTime={post.date}>{post.date}</time>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* 광고 영역 - 상단 */}
      <AdPlaceholder slot="top" />

      {/* 목차 */}
      <TableOfContents content={post.content} locale={locale} />

      {/* 콘텐츠 */}
      <div className="prose prose-lg max-w-none">
        <MDXRemote
          source={post.content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </div>

      {/* 광고 영역 - 하단 */}
      <AdPlaceholder slot="bottom" />

      {/* 푸터 */}
      <footer className="mt-12 pt-8 border-t">
        <div className="flex justify-between items-center">
          <a
            href={`/${locale}/${category}`}
            className="text-blue-600 hover:underline"
          >
            ← {locale === "ko" ? "목록으로 돌아가기" : "Back to list"}
          </a>
        </div>
      </footer>
    </article>

    {/* subsidy 카테고리에만 플로팅 버튼 표시 */}
    {category === "subsidy" && <WelfareFinderButton locale={locale} />}
    </>
  );
}

export async function generateStaticParams() {
  const locales = ["ko", "en"];
  const params: { locale: string; category: string; slug: string }[] = [];

  for (const locale of locales) {
    const posts = await getAllPosts(locale);
    for (const post of posts) {
      params.push({
        locale,
        category: post.category,
        slug: post.slug,
      });
    }
  }

  return params;
}
