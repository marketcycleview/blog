import type { Metadata } from "next";
import { SalaryCalculator } from "@/components/calculators";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "연봉 실수령액 계산기 2026 - 4대보험, 소득세 자동 계산",
  description:
    "2026년 연봉 실수령액을 계산해보세요. 4대보험료(국민연금, 건강보험, 고용보험)와 소득세를 자동으로 계산하여 월급에서 실제로 받는 금액을 확인할 수 있습니다.",
  keywords: [
    "연봉 실수령액",
    "연봉 계산기",
    "월급 계산기",
    "4대보험 계산",
    "실수령액 계산기",
    "세후 연봉",
    "소득세 계산",
    "2026 연봉",
    "급여 계산기",
  ],
  openGraph: {
    title: "연봉 실수령액 계산기 2026",
    description:
      "4대보험료와 소득세를 자동 계산하여 실수령액을 확인하세요.",
    url: `${siteUrl}/ko/tools/salary-calculator`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function SalaryCalculatorPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      {/* 페이지 헤더 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko" ? "연봉 실수령액 계산기" : "Net Salary Calculator"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "2026년 기준 4대보험료와 소득세를 계산하여 실제 수령액을 확인하세요."
            : "Calculate your net salary with insurance and tax deductions."}
        </p>
      </div>

      {/* 계산기 */}
      <SalaryCalculator />

      {/* SEO 콘텐츠 */}
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>연봉 실수령액이란?</h2>
        <p>
          연봉 실수령액은 회사에서 정한 연봉(세전 급여)에서 4대보험료와 소득세를
          공제한 후 실제로 통장에 들어오는 금액입니다. 같은 연봉이라도 부양가족
          수에 따라 소득세가 달라지므로 실수령액이 다를 수 있습니다.
        </p>

        <h2>2026년 4대보험 요율</h2>
        <table>
          <thead>
            <tr>
              <th>보험 종류</th>
              <th>근로자 부담률</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>국민연금</td>
              <td>4.5%</td>
              <td>상한 617만원</td>
            </tr>
            <tr>
              <td>건강보험</td>
              <td>3.545%</td>
              <td>근로자 부담분 (전체 7.09%)</td>
            </tr>
            <tr>
              <td>장기요양보험</td>
              <td>12.95%</td>
              <td>건강보험의 12.95%</td>
            </tr>
            <tr>
              <td>고용보험</td>
              <td>0.9%</td>
              <td>근로자 부담분</td>
            </tr>
          </tbody>
        </table>

        <h2>소득세 계산 방법</h2>
        <p>
          근로소득세는 간이세액표를 기준으로 월급에서 원천징수됩니다. 부양가족이
          많을수록 세금이 줄어들며, 연말정산을 통해 정확한 세액을 정산합니다.
        </p>

        <h2>자주 묻는 질문</h2>

        <h3>퇴직금이 연봉에 포함되어 있으면?</h3>
        <p>
          퇴직금 별도 계약(연봉에 퇴직금 포함)인 경우, 실제 월급은 연봉의
          12/13입니다. 계산기에서 &quot;퇴직금 별도 계약&quot; 옵션을 선택하면
          자동으로 반영됩니다.
        </p>

        <h3>비과세 급여는 어떻게 되나요?</h3>
        <p>
          식대(월 20만원)는 비과세로 소득세 계산에서 제외됩니다. 이 계산기에는
          식대 비과세가 기본 반영되어 있습니다.
        </p>

        <h3>연봉과 실수령액 차이가 왜 이렇게 큰가요?</h3>
        <p>
          고소득일수록 소득세율이 높아지는 누진세 구조이기 때문입니다. 연봉
          5,000만원의 공제율은 약 15%이지만, 1억원은 약 22%까지 올라갑니다.
        </p>
      </div>
    </div>
  );
}
