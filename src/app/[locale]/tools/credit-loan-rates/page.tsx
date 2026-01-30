import RelatedArticles from "@/components/tools/RelatedArticles";
import type { Metadata } from "next";
import { fetchCreditLoanRates } from "@/lib/tools/rates/loan-fetcher";
import CreditLoanRates from "@/components/tools/rates/CreditLoanRates";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "신용대출 금리 비교 2026 | 신용등급별 은행 금리 조회",
  description:
    "내 신용등급으로 은행별 신용대출 금리를 바로 확인하세요. 1등급부터 13등급까지 은행별 대출금리를 한눈에 비교할 수 있습니다.",
  keywords: [
    "신용대출 금리 비교",
    "신용등급별 대출 금리",
    "신용대출 금리 낮은 은행",
    "1등급 신용대출 금리",
    "은행별 신용대출 비교",
    "2026 신용대출",
    "인터넷은행 신용대출",
  ],
  openGraph: {
    title: "신용대출 금리 비교 2026 | 신용등급별 조회",
    description: "내 신용등급으로 은행별 신용대출 금리를 바로 확인. 등급별 금리 차이 시각화.",
    url: `${siteUrl}/ko/tools/credit-loan-rates`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function CreditLoanRatesPage({ params }: PageProps) {
  const { locale } = await params;
  const data = await fetchCreditLoanRates();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko"
            ? "💳 신용대출 금리 비교 (등급별)"
            : "💳 Credit Loan Rate Comparison"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "내 신용등급을 선택하면 은행별 예상 대출금리를 바로 확인할 수 있습니다."
            : "Select your credit grade to instantly see estimated loan rates by bank."}
        </p>
      </div>

      <CreditLoanRates data={data} />

      <div className="mt-16 prose prose-gray max-w-none">
        <h2>신용등급에 따라 대출 금리가 이렇게 다릅니다</h2>
        <p>
          같은 은행, 같은 상품이라도 신용등급에 따라 금리 차이가 2~6%p까지 날 수 있어요.
          1등급과 10등급의 금리 차이가 크기 때문에, 대출 전 신용점수를 올리는 것만으로도
          수십만 원의 이자를 아낄 수 있습니다.
        </p>

        <table>
          <thead>
            <tr><th>등급 구간</th><th>일반적 금리 범위</th><th>대상</th></tr>
          </thead>
          <tbody>
            <tr><td>1~4등급</td><td>4~6%대</td><td>우량 고객</td></tr>
            <tr><td>5~6등급</td><td>6~8%대</td><td>일반 고객</td></tr>
            <tr><td>10등급 이하</td><td>8~12%대</td><td>저신용 고객</td></tr>
          </tbody>
        </table>

        <h3>신용대출 금리 낮추는 방법</h3>
        <ul>
          <li>신용점수 올리기: 카드 대금 연체 없이 6개월 이상 사용</li>
          <li>급여이체 은행에서 대출받기 (우대금리 적용)</li>
          <li>인터넷은행 비교: 카카오뱅크, 토스뱅크가 금리 낮은 편</li>
          <li>대환대출 플랫폼 활용 (대출이동제)</li>
        </ul>

        <h3>자주 묻는 질문</h3>

        <h4>Q. 신용등급은 어디서 확인하나요?</h4>
        <p>
          NICE지키미(nicezikimi.com)나 올크레딧(allcredit.co.kr)에서 무료로 확인 가능합니다.
          토스, 카카오페이 같은 앱에서도 간편하게 조회할 수 있어요.
        </p>

        <h4>Q. 대출 조회만 해도 신용등급이 떨어지나요?</h4>
        <p>
          2021년부터 대출 금리 비교 목적의 조회는 신용점수에 영향을 주지 않습니다.
          편하게 여러 은행 금리를 비교해 보세요.
        </p>

        <h4>Q. 인터넷은행이 금리가 더 낮은 이유는?</h4>
        <p>
          오프라인 지점 비용이 없어서 그 차이를 금리로 돌려주는 구조입니다.
          다만 대출 한도가 시중은행보다 낮을 수 있으니 한도도 함께 확인하세요.
        </p>
      </div>

      <RelatedArticles toolSlug="credit-loan-rates" />
    </div>
  );
}