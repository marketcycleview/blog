import Link from "next/link";
import { getRelatedArticles } from "@/lib/tools/related-articles";

interface Props {
  toolSlug: string;
}

export default function RelatedArticles({ toolSlug }: Props) {
  const groups = getRelatedArticles(toolSlug);
  if (groups.length === 0) return null;

  return (
    <div className="mt-16 border-t pt-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">📖 관련 글</h2>
      <div className={`grid gap-8 ${groups.length > 1 ? "md:grid-cols-2" : ""}`}>
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
              {group.icon} {group.title}
            </h3>
            <ul className="space-y-2">
              {group.articles.map((article) => (
                <li key={article.href}>
                  <Link
                    href={article.href}
                    className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
                  >
                    {article.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
