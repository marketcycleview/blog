import RelatedArticles from "@/components/tools/RelatedArticles";
import type { Metadata } from "next";
import { TaxRefundCalculator } from "@/components/calculators";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "연말정산 환급액 계산기 2026 - 소득공제, 세액공제 시뮬레이션",
  description:
    "2026년 연말정산 예상 환급액을 계산해보세요. 소득공제, 세액공제 항목을 입력하면 환급액 또는 추가 납부액을 확인할 수 있습니다.",
  keywords: [
    "연말정산",
    "연말정산 환급",
    "연말정산 계산기",
    "소득공제",
    "세액공제",
    "연말정산 환급액",
    "신용카드 공제",
    "연금저축 공제",
    "월세 공제",
    "2026 연말정산",
  ],
  openGraph: {
    title: "연말정산 환급액 계산기 2026",
    description:
      "소득공제와 세액공제를 입력하여 예상 환급액을 계산하세요.",
    url: `${siteUrl}/ko/tools/tax-refund-calculator`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function TaxRefundCalculatorPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      {/* 페이지 헤더 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko" ? "연말정산 환급액 계산기" : "Year-End Tax Refund Calculator"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "2026년 연말정산 예상 환급액을 미리 계산해보세요."
            : "Estimate your year-end tax refund with deductions."}
        </p>
      </div>

      {/* 계산기 */}
      <TaxRefundCalculator />

      {/* SEO 콘텐츠 */}
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>연말정산이란?</h2>
        <p>
          연말정산은 1년간 원천징수한 소득세와 실제 납부해야 할 세금을 비교하여
          차액을 정산하는 과정입니다. 공제 항목이 많으면 환급을 받고, 부족하면
          추가 납부합니다.
        </p>

        <h2>연말정산 계산 흐름</h2>
        <ol>
          <li>
            <strong>총급여 - 근로소득공제 = 근로소득금액</strong>
          </li>
          <li>
            <strong>근로소득금액 - 소득공제 = 과세표준</strong>
          </li>
          <li>
            <strong>과세표준 × 세율 = 산출세액</strong>
          </li>
          <li>
            <strong>산출세액 - 세액공제 = 결정세액</strong>
          </li>
          <li>
            <strong>기납부세액 - 결정세액 = 환급(또는 추가납부)</strong>
          </li>
        </ol>

        <h2>주요 공제 항목</h2>

        <h3>소득공제 (과세표준을 낮춤)</h3>
        <ul>
          <li>
            <strong>인적공제:</strong> 본인, 배우자, 부양가족 1인당 150만원
          </li>
          <li>
            <strong>국민연금:</strong> 납입액 전액 공제
          </li>
          <li>
            <strong>건강보험료:</strong> 납입액 전액 공제
          </li>
          <li>
            <strong>신용카드 등:</strong> 총급여 25% 초과 사용액의 15~40%
          </li>
          <li>
            <strong>주택자금:</strong> 주택청약저축, 주택담보대출 이자 등
          </li>
        </ul>

        <h3>세액공제 (산출세액에서 직접 차감)</h3>
        <ul>
          <li>
            <strong>근로소득세액공제:</strong> 최대 74만원
          </li>
          <li>
            <strong>연금저축/IRP:</strong> 납입액의 13.2~16.5% (최대 900만원 한도)
          </li>
          <li>
            <strong>월세 세액공제:</strong> 월세의 15~17% (총급여 8천만원 이하)
          </li>
          <li>
            <strong>의료비:</strong> 총급여 3% 초과분의 15%
          </li>
          <li>
            <strong>교육비:</strong> 교육비의 15%
          </li>
          <li>
            <strong>기부금:</strong> 기부금의 15~30%
          </li>
        </ul>

        <h2>환급액 늘리는 팁</h2>

        <h3>1. 체크카드/현금영수증 비중 높이기</h3>
        <p>
          신용카드 공제율은 15%지만, 체크카드/현금영수증은 30%입니다. 총급여 25%
          초과 사용분부터 공제되므로, 기본은 신용카드로 쓰고 25% 초과분은
          체크카드로 쓰는 것이 유리합니다.
        </p>

        <h3>2. 연금저축/IRP 가입</h3>
        <p>
          연금저축과 IRP를 합쳐 연 최대 900만원까지 세액공제 받을 수 있습니다.
          총급여 5,500만원 이하면 16.5%, 초과하면 13.2% 공제율이 적용됩니다.
        </p>

        <h3>3. 월세 세액공제</h3>
        <p>
          총급여 8,000만원 이하 무주택 세대주(또는 세대원)는 월세의 15~17%를
          세액공제 받을 수 있습니다. 최대 한도는 900만원입니다.
        </p>

        <h2>자주 묻는 질문</h2>

        <h3>연말정산 안 하면 어떻게 되나요?</h3>
        <p>
          회사에서 기본 공제만 적용하여 정산합니다. 추가 공제 항목을 반영하지
          못해 환급받을 금액을 못 받게 됩니다. 놓친 경우 5월 종합소득세 신고로
          정정 가능합니다.
        </p>

        <h3>맞벌이 부부는 어떻게 공제하나요?</h3>
        <p>
          공제 항목별로 한 명에게만 적용됩니다. 소득이 높은 쪽이 공제받으면
          절세 효과가 더 큽니다. 다만, 각자 본인 명의 지출은 각자 공제받는 것이
          원칙입니다.
        </p>

        <h3>부양가족 공제 기준은?</h3>
        <p>
          연간 소득 100만원(근로소득만 있으면 총급여 500만원) 이하인 가족이
          대상입니다. 배우자는 나이 제한 없고, 부모님은 60세 이상, 자녀는 20세
          이하가 기본 조건입니다.
        </p>
      </div>

      <RelatedArticles toolSlug="tax-refund-calculator" />
    </div>
  );
}