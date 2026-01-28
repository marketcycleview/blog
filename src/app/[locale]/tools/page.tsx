import { Metadata } from "next";
import Link from "next/link";
import { ToolCard } from "@/components/ToolCard";
import {
  TOOL_CATEGORIES,
  getToolsByCategory,
  getVisibleTools,
} from "@/lib/tools/constants";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === "ko" ? "복지·금융·세금 무료 도구" : "Welfare & Finance Free Tools";
  const description =
    locale === "ko"
      ? "복지 정책 찾기, 연봉 실수령액 계산기, 대출 이자 계산기 등 생활에 필요한 무료 도구를 이용해보세요."
      : "Try free tools for welfare policy finder, salary calculator, loan interest calculator, and more.";

  return {
    title,
    description,
    keywords:
      locale === "ko"
        ? ["복지 정책 찾기", "연봉 계산기", "대출 계산기", "연말정산", "지원금 검색", "세금 계산"]
        : ["welfare policy finder", "salary calculator", "loan calculator", "tax calculator"],
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

  const visibleTools = getVisibleTools();

  // 카테고리별로 도구 그룹화
  const categories = Object.keys(TOOL_CATEGORIES).filter(
    (cat) => getToolsByCategory(cat).length > 0
  );

  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="text-center py-12 mb-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {locale === "ko" ? "💰 복지·금융·세금 도구" : "💰 Welfare & Finance Tools"}
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          {locale === "ko"
            ? "내 돈 챙기기, 여기서 시작하세요"
            : "Start managing your money here"}
        </p>
        <p className="text-gray-500">
          {locale === "ko"
            ? `${visibleTools.length}개의 무료 도구를 이용해보세요`
            : `Try ${visibleTools.length} free tools`}
        </p>
      </section>

      {/* 전체 도구 그리드 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          {locale === "ko" ? "전체 도구" : "All Tools"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleTools.map((tool) => (
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
          {locale === "ko" ? "InfoTalker 생활 경제 도구 안내" : "About InfoTalker Finance Tools"}
        </h2>

        {locale === "ko" ? (
          <>
            <p>
              InfoTalker에서는 복지, 금융, 세금 관련 무료 도구를 제공합니다.
              회원가입 없이 누구나 바로 사용할 수 있어요.
            </p>

            <h3>복지 정책 찾기</h3>
            <p>
              나이, 소득, 지역 등 조건을 입력하면 받을 수 있는 복지 정책을 찾아드립니다.
              청년, 신혼부부, 저소득층 등 다양한 조건에 맞는 지원금 정책을 검색해보세요.
            </p>

            <h3>금융/대출 계산기 (준비중)</h3>
            <p>
              대출 이자 계산, 예적금 이자 계산, 원리금균등상환 계산 등
              금융 관련 계산기를 곧 추가할 예정입니다.
            </p>

            <h3>세금/연말정산 계산기 (준비중)</h3>
            <p>
              연봉 실수령액 계산, 연말정산 환급액 예상, 종합소득세 계산 등
              세금 관련 도구도 준비 중입니다.
            </p>
          </>
        ) : (
          <>
            <p>
              InfoTalker provides free tools for welfare, finance, and tax calculations.
              Anyone can use them immediately without registration.
            </p>

            <h3>Welfare Policy Finder</h3>
            <p>
              Enter your age, income, region and other conditions to find welfare policies available to you.
              Search for policies that match various conditions such as youth, newlyweds, and low-income families.
            </p>

            <h3>Finance Calculators (Coming Soon)</h3>
            <p>
              Loan interest calculator, savings interest calculator, and amortization calculator
              will be added soon.
            </p>

            <h3>Tax Calculators (Coming Soon)</h3>
            <p>
              Net salary calculator, year-end tax refund estimator, and income tax calculator
              are also in preparation.
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
