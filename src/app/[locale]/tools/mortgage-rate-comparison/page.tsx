import type { Metadata } from "next";
import { fetchMortgageRates } from "@/lib/tools/rates/loan-fetcher";
import MortgageRateComparison from "@/components/tools/rates/MortgageRateComparison";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "주택담보대출 금리 비교 2026 | 은행별 주담대 금리 한눈에",
  description:
    "2026년 주요 은행 주택담보대출 금리를 한눈에 비교하세요. 고정·변동·혼합금리, 담보유형별 최저금리 순위를 확인할 수 있습니다.",
  keywords: [
    "주택담보대출 금리 비교",
    "주담대 금리 순위",
    "아파트 담보대출 금리",
    "주담대 고정금리",
    "주담대 변동금리",
    "2026 주택담보대출",
    "은행별 주담대 비교",
  ],
  openGraph: {
    title: "주택담보대출 금리 비교 2026 | 은행별 주담대 금리",
    description: "주요 은행 주택담보대출 금리를 한눈에 비교. 고정·변동·혼합금리 최저금리 순위.",
    url: `${siteUrl}/ko/tools/mortgage-rate-comparison`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function MortgageRateComparisonPage({ params }: PageProps) {
  const { locale } = await params;
  const data = await fetchMortgageRates();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko"
            ? "🏠 주택담보대출 금리 비교"
            : "🏠 Mortgage Rate Comparison"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "은행별 주택담보대출 금리를 고정·변동·혼합금리별로 비교해 보세요."
            : "Compare mortgage rates across banks by fixed, variable, and hybrid rates."}
        </p>
      </div>

      <MortgageRateComparison data={data} />

      <div className="mt-16 prose prose-gray max-w-none">
        <h2>주택담보대출, 금리 유형부터 이해하자</h2>
        <p>
          주담대 금리는 크게 고정금리, 변동금리, 혼합금리 세 가지로 나뉩니다.
          금리 인상기에는 고정금리가, 인하기에는 변동금리가 유리한데요.
          어떤 게 나에게 맞는지는 대출 기간과 금리 전망에 따라 다릅니다.
        </p>

        <table>
          <thead>
            <tr><th>금리유형</th><th>특징</th><th>유리한 상황</th></tr>
          </thead>
          <tbody>
            <tr><td>고정금리</td><td>대출 기간 동안 금리 불변</td><td>금리 인상기</td></tr>
            <tr><td>변동금리</td><td>기준금리에 따라 변동</td><td>금리 인하기</td></tr>
            <tr><td>혼합금리</td><td>초기 고정 → 이후 변동</td><td>단기 안정 + 장기 유연</td></tr>
          </tbody>
        </table>

        <h3>주담대 금리 비교 시 확인할 것</h3>
        <ul>
          <li>최저금리의 조건 (우대금리 충족 가능한지)</li>
          <li>중도상환수수료 (3년 이내 상환 시 부과)</li>
          <li>LTV·DTI·DSR 한도 (대출 가능 금액에 영향)</li>
          <li>부대비용 (인지세, 국민주택채권 매입비)</li>
        </ul>

        <h3>자주 묻는 질문</h3>

        <h4>Q. 고정금리와 변동금리 중 뭐가 유리한가요?</h4>
        <p>
          한국은행 기준금리가 높은 시점이라면 앞으로 인하될 가능성이 있으니 변동금리가 유리할 수 있어요.
          반대로 저금리 시기라면 고정금리로 잠가두는 게 안전합니다.
          확신이 없다면 혼합금리(5년 고정 후 변동)도 고려해 보세요.
        </p>

        <h4>Q. 인터넷은행 주담대가 더 저렴한가요?</h4>
        <p>
          일반적으로 카카오뱅크, 토스뱅크 등 인터넷은행의 주담대 금리가
          시중은행보다 0.1~0.3%p 정도 낮은 편입니다.
          다만 대면 상담이 어렵고, 아파트 위주로 취급 가능한 점은 확인하세요.
        </p>
      </div>
    </div>
  );
}
