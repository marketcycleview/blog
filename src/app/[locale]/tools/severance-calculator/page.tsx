import RelatedArticles from "@/components/tools/RelatedArticles";
import type { Metadata } from "next";
import { SeveranceCalculator } from "@/components/calculators";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "퇴직금 계산기 - 근속연수별 예상 퇴직금, 세금 계산",
  description:
    "퇴직금을 계산해보세요. 근속기간과 평균 급여를 입력하면 예상 퇴직금과 퇴직소득세를 확인할 수 있습니다. 1년 이상 근무 시 지급 대상입니다.",
  keywords: [
    "퇴직금",
    "퇴직금 계산기",
    "퇴직금 계산",
    "퇴직소득세",
    "퇴직금 세금",
    "근속연수",
    "평균임금",
    "퇴직금 지급",
    "1년 퇴직금",
  ],
  openGraph: {
    title: "퇴직금 계산기",
    description:
      "근속기간과 급여로 예상 퇴직금과 세후 수령액을 계산하세요.",
    url: `${siteUrl}/ko/tools/severance-calculator`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function SeveranceCalculatorPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      {/* 페이지 헤더 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko" ? "퇴직금 계산기" : "Severance Pay Calculator"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "근속기간과 평균 급여를 입력하면 예상 퇴직금과 세금을 계산해드립니다."
            : "Calculate your expected severance pay based on work period and salary."}
        </p>
      </div>

      {/* 계산기 */}
      <SeveranceCalculator />

      {/* SEO 콘텐츠 */}
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>퇴직금이란?</h2>
        <p>
          퇴직금은 1년 이상 근무한 근로자가 퇴직할 때 받는 금액입니다.
          근로기준법에 따라 계속근로기간 1년에 대해 30일분 이상의 평균임금을
          지급해야 합니다.
        </p>

        <h2>퇴직금 계산 공식</h2>
        <p>
          <strong>퇴직금 = 평균임금 × 30일 × (총 근속일수 ÷ 365일)</strong>
        </p>
        <ul>
          <li>
            <strong>평균임금:</strong> 퇴직 전 3개월간 지급받은 임금 총액 ÷ 그
            기간의 총 일수
          </li>
          <li>
            평균임금에는 기본급, 상여금, 연차수당, 정기 수당 등이 포함됩니다
          </li>
          <li>통상임금과 평균임금 중 높은 금액을 적용받을 수 있습니다</li>
        </ul>

        <h2>퇴직금 지급 조건</h2>
        <ul>
          <li>
            <strong>계속 근로기간 1년 이상:</strong> 1년 미만은 퇴직금 없음
          </li>
          <li>
            <strong>주 15시간 이상 근무:</strong> 4주 평균 주 15시간 이상
          </li>
          <li>
            <strong>5인 이상 사업장:</strong> 5인 미만도 퇴직급여제도 의무화 (2022년~)
          </li>
        </ul>

        <h2>퇴직금 세금</h2>
        <p>
          퇴직금은 &quot;퇴직소득세&quot;가 적용됩니다. 일반 소득세와 달리 분류과세
          되어 세 부담이 낮습니다. 근속연수가 길수록 세금 공제가 커집니다.
        </p>
        <table>
          <thead>
            <tr>
              <th>근속연수</th>
              <th>세금 부담</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>5년 이하</td>
              <td>상대적으로 높음</td>
            </tr>
            <tr>
              <td>5~10년</td>
              <td>중간</td>
            </tr>
            <tr>
              <td>10년 이상</td>
              <td>상대적으로 낮음</td>
            </tr>
          </tbody>
        </table>

        <h2>자주 묻는 질문</h2>

        <h3>퇴직금은 언제 받나요?</h3>
        <p>
          근로기준법상 퇴직일로부터 14일 이내에 지급해야 합니다. 특별한 사정이
          있으면 당사자 합의로 연장 가능하나, 지연 시 지연이자를 청구할 수
          있습니다.
        </p>

        <h3>중간정산 받으면 다시 처음부터인가요?</h3>
        <p>
          네, 중간정산 시 그 시점까지의 퇴직금을 정산하고 근속연수가 다시
          시작됩니다. 중간정산은 주택 구입, 질병 치료 등 법정 사유에만 가능합니다.
        </p>

        <h3>1년 11개월 일하면 퇴직금 없나요?</h3>
        <p>
          아닙니다! 1년 이상만 충족하면 됩니다. 1년 11개월 = 약 1.92년분의
          퇴직금을 받습니다.
        </p>

        <h3>계약직도 퇴직금 받나요?</h3>
        <p>
          네, 계약직이든 정규직이든 1년 이상 근무하면 퇴직금 대상입니다.
          고용 형태와 관계없이 근로기준법이 적용됩니다.
        </p>

        <h3>퇴직연금(DC/DB)과 퇴직금의 차이는?</h3>
        <p>
          퇴직연금은 회사가 외부 금융기관에 적립하는 방식입니다. DC(확정기여형)는
          회사가 매월 적립하고, DB(확정급여형)는 퇴직 시 기존 퇴직금 계산 방식과
          동일하게 받습니다.
        </p>
      </div>

      <RelatedArticles toolSlug="severance-calculator" />
    </div>
  );
}