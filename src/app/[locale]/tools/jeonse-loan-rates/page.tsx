import RelatedArticles from "@/components/tools/RelatedArticles";
import type { Metadata } from "next";
import { fetchJeonseLoanRates } from "@/lib/tools/rates/loan-fetcher";
import JeonseLoanRates from "@/components/tools/rates/JeonseLoanRates";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "전세자금대출 금리 비교 2026 | 은행별 전세대출 금리",
  description:
    "2026년 주요 은행 전세자금대출 금리를 한눈에 비교하세요. 고정·변동금리별 최저금리 순위와 대출한도를 확인할 수 있습니다.",
  keywords: [
    "전세대출 금리 비교",
    "전세자금대출 금리",
    "전세대출 낮은 금리",
    "전세대출 은행별 비교",
    "전세대출 금리 순위",
    "2026 전세대출",
    "인터넷은행 전세대출",
  ],
  openGraph: {
    title: "전세자금대출 금리 비교 2026",
    description: "주요 은행 전세자금대출 금리를 한눈에 비교. 최저금리 순위 확인.",
    url: `${siteUrl}/ko/tools/jeonse-loan-rates`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function JeonseLoanRatesPage({ params }: PageProps) {
  const { locale } = await params;
  const data = await fetchJeonseLoanRates();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko"
            ? "🏢 전세자금대출 금리 비교"
            : "🏢 Jeonse Loan Rate Comparison"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "은행별 전세자금대출 금리를 비교하고 최저금리 상품을 찾아보세요."
            : "Compare jeonse (deposit-based lease) loan rates across major banks."}
        </p>
      </div>

      <JeonseLoanRates data={data} />

      <div className="mt-16 prose prose-gray max-w-none">
        <h2>전세대출 금리, 어디가 저렴할까?</h2>
        <p>
          전세대출은 대부분 만기일시상환 방식이고, 금리는 변동금리가 일반적입니다.
          인터넷은행이 시중은행보다 금리가 낮은 경우가 많지만,
          보증기관(HUG, SGI 등)에 따라 조건이 달라질 수 있어요.
        </p>

        <h3>전세대출 vs 정책 전세대출</h3>
        <table>
          <thead>
            <tr><th>구분</th><th>시중은행 전세대출</th><th>버팀목대출 등 정책대출</th></tr>
          </thead>
          <tbody>
            <tr><td>금리</td><td>3.5~5% 수준</td><td>1.5~2.9% 수준</td></tr>
            <tr><td>한도</td><td>보증금의 80%</td><td>수도권 3억, 지방 2억</td></tr>
            <tr><td>자격</td><td>비교적 자유</td><td>소득·자산 요건 있음</td></tr>
            <tr><td>장점</td><td>한도 높고 접근 쉬움</td><td>금리 매우 낮음</td></tr>
          </tbody>
        </table>
        <p>
          소득 요건이 맞다면 버팀목대출, 중소기업 청년 전세대출 같은 정책대출을 먼저 확인하세요.
          시중은행 대출보다 1~2%p 이상 저렴합니다.
        </p>

        <h3>자주 묻는 질문</h3>

        <h4>Q. 전세대출 갈아타기 가능한가요?</h4>
        <p>
          가능합니다. 기존 은행에서 대출을 상환하고 더 낮은 금리의 은행으로 이동하면 됩니다.
          다만 중도상환수수료가 발생할 수 있으니 이자 절감액과 비교해 보세요.
        </p>

        <h4>Q. 전세보증금 반환보증과 전세대출은 다른 건가요?</h4>
        <p>
          다릅니다. 전세보증금 반환보증은 집주인이 보증금을 돌려주지 못할 때를 대비한 보험이고,
          전세대출은 보증금 마련을 위한 대출입니다.
          전세대출 시 보증기관 가입이 필수인 경우가 많아요.
        </p>
      </div>

      <RelatedArticles toolSlug="jeonse-loan-rates" />
    </div>
  );
}