import type { Metadata } from "next";
import RepaymentMethodComparator from "@/components/tools/comparator/RepaymentMethodComparator";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "상환방식 비교 - 원리금균등 vs 원금균등 vs 만기일시 계산기 2026",
  description:
    "대출 상환방식별 월 납입액, 총 이자, 상환 스케줄을 비교합니다. 원리금균등, 원금균등, 만기일시 상환 중 나에게 유리한 방식을 찾아보세요.",
  keywords: [
    "원리금균등 원금균등 차이",
    "대출 상환방식 비교",
    "원리금균등 계산기",
    "원금균등 계산기",
    "만기일시상환",
    "대출 이자 비교",
  ],
  openGraph: {
    title: "상환방식 비교 계산기 2026",
    description: "원리금균등·원금균등·만기일시 상환을 한눈에 비교합니다.",
    url: `${siteUrl}/ko/tools/repayment-method-comparator`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function RepaymentMethodComparatorPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko"
            ? "원리금균등 vs 원금균등 vs 만기일시 비교"
            : "Loan Repayment Method Comparator"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "대출 조건을 입력하면 3가지 상환방식의 월 납입액, 총 이자, 스케줄을 비교합니다."
            : "Compare monthly payments, total interest, and schedules for 3 repayment methods."}
        </p>
      </div>
      <RepaymentMethodComparator />
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>대출 상환방식 3가지 한눈에 비교</h2>
        <table>
          <thead>
            <tr><th>항목</th><th>원리금균등</th><th>원금균등</th><th>만기일시</th></tr>
          </thead>
          <tbody>
            <tr><td>월 납입액</td><td>매달 동일</td><td>점점 줄어듦</td><td>이자만 (만기에 원금)</td></tr>
            <tr><td>총 이자</td><td>중간</td><td>가장 적음</td><td>가장 많음</td></tr>
            <tr><td>초기 부담</td><td>중간</td><td>가장 큼</td><td>가장 적음</td></tr>
            <tr><td>추천 상황</td><td>안정적 소득자</td><td>이자 절약 원할 때</td><td>단기 대출</td></tr>
          </tbody>
        </table>

        <h2>어떤 상환방식을 선택해야 할까?</h2>
        <p>
          <strong>소득이 일정하고 예산 관리가 중요하다면</strong> 원리금균등 상환이 적합합니다.
          매달 같은 금액을 내므로 생활비 계획이 쉽습니다.
        </p>
        <p>
          <strong>총 이자를 최소화하고 싶다면</strong> 원금균등 상환이 유리합니다.
          초반에는 납입액이 크지만 갈수록 줄어들며, 총 이자가 가장 적습니다.
        </p>
        <p>
          <strong>단기간(1~2년) 사용 후 일시 상환할 계획이라면</strong> 만기일시 상환을 고려할 수 있습니다.
          다만 장기 대출에는 총 이자가 크게 불어나므로 비추천입니다.
        </p>

        <h2>자주 묻는 질문</h2>
        <h3>Q. 중도상환하면 위약금이 있나요?</h3>
        <p>
          은행별로 다릅니다. 일반적으로 대출 실행 후 3년 이내 중도상환 시
          <strong>1~1.5% 수준의 중도상환 수수료</strong>가 부과됩니다.
          3년 경과 후에는 대부분 수수료가 없습니다.
        </p>
        <h3>Q. 상환방식을 중간에 변경할 수 있나요?</h3>
        <p>
          대출 조건 변경(리파이낸싱)을 통해 가능합니다.
          다만 새로운 대출로 전환하는 것이므로 수수료와 금리를 다시 확인해야 합니다.
        </p>
        <h3>Q. 변동금리와 고정금리 중 어떤 것이 좋나요?</h3>
        <p>
          금리가 상승 추세라면 고정금리, 하락 추세라면 변동금리가 유리합니다.
          5년 이상 장기 대출이라면 고정금리(또는 혼합형)가 안정적입니다.
        </p>
      </div>
    </div>
  );
}
