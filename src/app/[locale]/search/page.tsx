import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { SearchBar } from "@/components/SearchBar";

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const { q: query } = await searchParams;
  const allPosts = await getAllPosts(locale);

  // 검색 로직
  const searchResults = query
    ? allPosts.filter((post) => {
        const searchText = query.toLowerCase();
        return (
          post.title.toLowerCase().includes(searchText) ||
          post.description.toLowerCase().includes(searchText) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchText)) ||
          post.category.toLowerCase().includes(searchText)
        );
      })
    : [];

  return (
    <div className="max-w-4xl mx-auto">
      {/* 검색창 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {locale === "ko" ? "검색" : "Search"}
        </h1>
        <SearchBar locale={locale} />
      </div>

      {/* 검색 결과 */}
      {query ? (
        <div>
          <p className="text-gray-600 mb-6">
            {locale === "ko" ? (
              <>
                <span className="font-semibold">"{query}"</span> 검색 결과:{" "}
                <span className="font-semibold">{searchResults.length}</span>건
              </>
            ) : (
              <>
                <span className="font-semibold">{searchResults.length}</span> results for{" "}
                <span className="font-semibold">"{query}"</span>
              </>
            )}
          </p>

          {searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((post) => (
                <Link
                  key={`${post.category}-${post.slug}`}
                  href={`/${locale}/${post.category}/${post.slug}`}
                  className="block p-6 bg-white border rounded-lg hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <span className="px-2 py-0.5 bg-gray-100 rounded capitalize">
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 line-clamp-2">{post.description}</p>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-lg">
                {locale === "ko"
                  ? "검색 결과가 없습니다."
                  : "No results found."}
              </p>
              <p className="text-gray-400 mt-2">
                {locale === "ko"
                  ? "다른 검색어를 시도해보세요."
                  : "Try a different search term."}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            {locale === "ko"
              ? "검색어를 입력하세요."
              : "Enter a search term."}
          </p>
        </div>
      )}
    </div>
  );
}

export function generateMetadata() {
  return {
    title: "검색 | SEO 블로그",
    description: "블로그 콘텐츠를 검색하세요.",
  };
}
