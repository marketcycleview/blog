import type { Metadata } from "next";
import { LoanCalculator } from "@/components/calculators";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "대출 이자 계산기 - 원리금균등, 원금균등, 만기일시 비교",
  description:
    "대출 이자와 월 상환액을 계산해보세요. 원리금균등상환, 원금균등상환, 만기일시상환 방식을 비교하고 총 이자 부담을 확인할 수 있습니다.",
  keywords: [
    "대출 계산기",
    "대출 이자 계산",
    "원리금균등상환",
    "원금균등상환",
    "만기일시상환",
    "주택담보대출",
    "전세대출",
    "신용대출",
    "월 상환액",
    "상환 스케줄",
  ],
  openGraph: {
    title: "대출 이자 계산기",
    description:
      "원리금균등, 원금균등, 만기일시 상환 방식을 비교해보세요.",
    url: `${siteUrl}/ko/tools/loan-calculator`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LoanCalculatorPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      {/* 페이지 헤더 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko" ? "대출 이자 계산기" : "Loan Interest Calculator"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "대출금액, 이율, 기간을 입력하면 상환방식별 이자와 월 상환액을 비교해드립니다."
            : "Compare monthly payments and total interest by repayment method."}
        </p>
      </div>

      {/* 계산기 */}
      <LoanCalculator />

      {/* SEO 콘텐츠 */}
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>대출 상환방식 비교</h2>

        <h3>원리금균등상환</h3>
        <p>
          매월 동일한 금액을 상환하는 방식입니다. 초반에는 이자 비중이 높고
          후반에는 원금 비중이 높아집니다. 가장 일반적인 주택담보대출
          상환방식입니다.
        </p>
        <ul>
          <li>장점: 매월 상환액이 일정해 자금 계획이 쉬움</li>
          <li>단점: 원금균등 대비 총 이자가 더 많음</li>
        </ul>

        <h3>원금균등상환</h3>
        <p>
          매월 동일한 원금과 남은 원금에 대한 이자를 상환합니다. 초반 상환액이
          크지만 점점 줄어들며, 총 이자가 가장 적습니다.
        </p>
        <ul>
          <li>장점: 총 이자 부담이 가장 적음</li>
          <li>단점: 초기 상환 부담이 큼</li>
        </ul>

        <h3>만기일시상환</h3>
        <p>
          대출 기간 동안 이자만 납부하고 만기에 원금을 일시 상환합니다. 전세자금
          대출에서 주로 사용됩니다.
        </p>
        <ul>
          <li>장점: 월 부담금이 가장 적음</li>
          <li>단점: 총 이자 부담이 가장 크고, 만기에 원금 마련 필요</li>
        </ul>

        <h2>대출 금리 종류</h2>

        <h3>고정금리</h3>
        <p>
          대출 기간 동안 금리가 변하지 않습니다. 금리 상승기에 유리하지만,
          보통 변동금리보다 초기 금리가 높습니다.
        </p>

        <h3>변동금리</h3>
        <p>
          기준금리(COFIX, CD금리 등)에 연동되어 주기적으로 금리가 변합니다.
          금리 하락기에 유리하지만 상승 위험이 있습니다.
        </p>

        <h2>자주 묻는 질문</h2>

        <h3>어떤 상환방식이 가장 유리한가요?</h3>
        <p>
          총 이자를 줄이려면 원금균등상환, 월 부담을 줄이려면 원리금균등상환이
          유리합니다. 전세대출처럼 만기에 보증금을 돌려받을 계획이라면
          만기일시상환도 고려해볼 수 있습니다.
        </p>

        <h3>중도상환수수료는 어떻게 되나요?</h3>
        <p>
          대출 후 3년 이내 조기 상환 시 남은 원금의 약 1~1.5% 수수료가 부과될 수
          있습니다. 정확한 비율은 대출 상품별로 다릅니다.
        </p>

        <h3>DSR이란 무엇인가요?</h3>
        <p>
          총부채원리금상환비율(Debt Service Ratio)로, 연간 소득 대비 모든 대출의
          원리금 상환액 비율입니다. 현재 40~70% 규제가 적용됩니다.
        </p>
      </div>
    </div>
  );
}
