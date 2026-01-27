import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ReviewSection } from "@/components/ReviewSection";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ locale: string; category: string; slug: string }>;
}

// MDX에서 사용할 커스텀 컴포넌트
const components = {
  ReviewSection,
  // 필요한 컴포넌트 추가
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-relaxed" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 pl-6 list-disc" {...props} />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 pl-6 list-decimal" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="mb-2" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-blue-600 hover:text-blue-800 underline" {...props} />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-700" {...props} />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="border border-gray-300 px-4 py-2 text-left bg-gray-100 font-semibold" {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-gray-300 px-4 py-2 text-left" {...props} />
  ),
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, category, slug } = await params;
  const post = await getPostBySlug(locale, category, slug);

  if (!post) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { locale, category, slug } = await params;
  const post = await getPostBySlug(locale, category, slug);

  if (!post) {
    notFound();
  }

  return (
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
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-500">
          <time dateTime={post.date}>{post.date}</time>
          {post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* 콘텐츠 */}
      <div className="prose max-w-none">
        <MDXRemote source={post.content} components={components} />
      </div>

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
