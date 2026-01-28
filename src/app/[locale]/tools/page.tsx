import { Metadata } from "next";
import Link from "next/link";
import { ToolCard } from "@/components/ToolCard";
import {
  TOOLS,
  TOOL_CATEGORIES,
  getToolsByCategory,
} from "@/lib/tools/constants";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === "ko" ? "무료 도구 모음" : "Free Tools Collection";
  const description =
    locale === "ko"
      ? "사주팔자, 오늘의 운세, 띠별 운세, 복지 정책 찾기 등 다양한 무료 도구를 이용해보세요."
      : "Try various free tools including Saju analysis, daily fortune, zodiac fortune, welfare policy finder, and more.";

  return {
    title,
    description,
    keywords:
      locale === "ko"
        ? ["무료 사주", "무료 운세", "사주팔자", "오늘의 운세", "띠별 운세", "복지 정책"]
        : ["free saju", "free fortune", "daily fortune", "zodiac fortune", "welfare policy"],
    alternates: {
      canonical: `${siteUrl}/${locale}/tools`,
      languages: {
        ko: `${siteUrl}/ko/tools`,
        en: `${siteUrl}/en/tools`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/tools`,
      siteName: "InfoTalker",
      type: "website",
      images: [
        {
          url: `${siteUrl}/api/og?title=${encodeURIComponent(title)}&category=tools&v=1`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export default async function ToolsPage({ params }: PageProps) {
  const { locale } = await params;

  // 카테고리별로 도구 그룹화
  const categories = Object.keys(TOOL_CATEGORIES).filter(
    (cat) => getToolsByCategory(cat).length > 0
  );

  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="text-center py-12 mb-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {locale === "ko" ? "🛠️ 무료 도구 모음" : "🛠️ Free Tools Collection"}
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          {locale === "ko"
            ? "사주, 운세, 복지 정책 검색까지"
            : "Saju, Fortune, Welfare Policy Finder and more"}
        </p>
        <p className="text-gray-500">
          {locale === "ko"
            ? `총 ${TOOLS.length}개의 무료 도구를 이용해보세요`
            : `Try ${TOOLS.length} free tools`}
        </p>
      </section>

      {/* 전체 도구 그리드 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          {locale === "ko" ? "전체 도구" : "All Tools"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} locale={locale} />
          ))}
        </div>
      </section>

      {/* 카테고리별 섹션 */}
      {categories.map((categoryKey) => {
        const category = TOOL_CATEGORIES[categoryKey];
        const tools = getToolsByCategory(categoryKey);

        if (tools.length === 0) return null;

        return (
          <section key={categoryKey} className="mb-12">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>{category.icon}</span>
              {locale === "ko" ? category.ko : category.en}
              <span className="text-sm font-normal text-gray-500">
                ({tools.length})
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} locale={locale} />
              ))}
            </div>
          </section>
        );
      })}

      {/* SEO 콘텐츠 */}
      <section className="mt-16 prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold mb-4">
          {locale === "ko" ? "InfoTalker 무료 도구 안내" : "About InfoTalker Free Tools"}
        </h2>

        {locale === "ko" ? (
          <>
            <p>
              InfoTalker에서는 다양한 무료 도구를 제공합니다. 회원가입 없이 누구나 바로 사용할 수 있습니다.
            </p>

            <h3>운세/사주 도구</h3>
            <ul>
              <li>
                <strong>무료 사주팔자</strong>: 생년월일시를 입력하면 사주팔자, 오행 분석, 대운, 세운까지 확인할 수 있습니다.
              </li>
              <li>
                <strong>오늘의 운세</strong>: 매일 달라지는 일진 운세를 확인해보세요.
              </li>
              <li>
                <strong>2026 띠별 운세</strong>: 병오년 12띠 운세를 한눈에 확인할 수 있습니다.
              </li>
            </ul>

            <h3>복지 정책 찾기</h3>
            <p>
              나이, 소득, 지역 등 조건을 입력하면 받을 수 있는 복지 정책을 찾아드립니다.
              청년, 신혼부부, 저소득층 등 다양한 조건에 맞는 정책을 검색해보세요.
            </p>
          </>
        ) : (
          <>
            <p>
              InfoTalker provides various free tools. Anyone can use them immediately without registration.
            </p>

            <h3>Fortune/Saju Tools</h3>
            <ul>
              <li>
                <strong>Free Saju Analysis</strong>: Enter your birth date and time to see your Saju analysis, five elements, and fortune cycles.
              </li>
              <li>
                <strong>Today's Fortune</strong>: Check your daily fortune that changes every day.
              </li>
              <li>
                <strong>2026 Zodiac Fortune</strong>: See the fortune for all 12 zodiac signs in 2026.
              </li>
            </ul>

            <h3>Welfare Policy Finder</h3>
            <p>
              Enter your age, income, region and other conditions to find welfare policies available to you.
              Search for policies that match various conditions such as youth, newlyweds, and low-income families.
            </p>
          </>
        )}
      </section>

      {/* 관련 링크 */}
      <section className="mt-12 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-bold mb-4">
          {locale === "ko" ? "관련 페이지" : "Related Pages"}
        </h3>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/${locale}/subsidy`}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm"
          >
            {locale === "ko" ? "지원금 정보" : "Subsidy Info"}
          </Link>
          <Link
            href={`/${locale}`}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm"
          >
            {locale === "ko" ? "메인으로" : "Back to Home"}
          </Link>
        </div>
      </section>
    </div>
  );
}
