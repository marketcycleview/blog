import RelatedArticles from "@/components/tools/RelatedArticles";
import type { Metadata } from "next";
import { UnemploymentCalculator } from "@/components/calculators";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "실업급여 계산기 2026 - 수급 자격, 지급액, 지급일수 확인",
  description:
    "2026년 실업급여(구직급여)를 계산해보세요. 나이, 고용보험 가입기간, 급여를 입력하면 예상 수령액과 지급일수를 확인할 수 있습니다.",
  keywords: [
    "실업급여",
    "구직급여",
    "실업급여 계산기",
    "실업급여 수령액",
    "실업급여 지급일수",
    "고용보험",
    "실업급여 자격",
    "2026 실업급여",
    "실업급여 신청",
  ],
  openGraph: {
    title: "실업급여 계산기 2026",
    description:
      "고용보험 가입기간과 급여로 실업급여 예상 수령액을 계산하세요.",
    url: `${siteUrl}/ko/tools/unemployment-calculator`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function UnemploymentCalculatorPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      {/* 페이지 헤더 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko" ? "실업급여 계산기 2026" : "Unemployment Benefit Calculator 2026"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "나이, 고용보험 가입기간, 급여를 입력하면 실업급여 예상 수령액을 계산해드립니다."
            : "Calculate your expected unemployment benefits based on your work history."}
        </p>
      </div>

      {/* 계산기 */}
      <UnemploymentCalculator />

      {/* SEO 콘텐츠 */}
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>실업급여(구직급여)란?</h2>
        <p>
          실업급여는 고용보험에 가입한 근로자가 비자발적으로 실직했을 때 재취업
          활동 기간 동안 생활 안정을 위해 지급하는 급여입니다. 정식 명칭은
          &quot;구직급여&quot;이며, 고용센터에서 신청합니다.
        </p>

        <h2>실업급여 수급 자격</h2>
        <ul>
          <li>
            <strong>비자발적 퇴직:</strong> 권고사직, 계약만료, 정리해고, 폐업 등
          </li>
          <li>
            <strong>고용보험 가입:</strong> 퇴직 전 18개월 중 180일(약 6개월) 이상
          </li>
          <li>
            <strong>근로 의사와 능력:</strong> 취업할 의사가 있고 일할 수 있는 상태
          </li>
          <li>
            <strong>적극적 구직활동:</strong> 고용센터에서 정기적으로 구직활동 증명
          </li>
        </ul>

        <h2>2026년 실업급여 지급 기준</h2>
        <table>
          <thead>
            <tr>
              <th>항목</th>
              <th>기준</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>지급률</td>
              <td>퇴직 전 평균임금의 60%</td>
            </tr>
            <tr>
              <td>일일 상한액</td>
              <td>77,000원</td>
            </tr>
            <tr>
              <td>일일 하한액</td>
              <td>64,192원 (최저임금의 80%)</td>
            </tr>
            <tr>
              <td>지급일수</td>
              <td>120일~270일 (가입기간/나이에 따라)</td>
            </tr>
          </tbody>
        </table>

        <h2>실업급여 신청 절차</h2>
        <ol>
          <li>
            <strong>퇴직 후:</strong> 회사에서 피보험자격 상실 신고
          </li>
          <li>
            <strong>고용센터 방문:</strong> 구직 등록 및 수급자격 신청
          </li>
          <li>
            <strong>수급자격 인정:</strong> 심사 후 수급자 교육 이수
          </li>
          <li>
            <strong>7일 대기기간:</strong> 대기기간 후 지급 시작
          </li>
          <li>
            <strong>실업인정:</strong> 1~4주마다 구직활동 증명
          </li>
        </ol>

        <h2>자주 묻는 질문</h2>

        <h3>자발적 퇴직도 실업급여 받을 수 있나요?</h3>
        <p>
          정당한 사유가 있는 자발적 퇴직은 수급 가능합니다. 정당한 사유에는
          임금 체불, 근로조건 악화, 건강상 이유, 육아/간병, 통근 불가능 등이
          포함됩니다.
        </p>

        <h3>알바도 실업급여 받을 수 있나요?</h3>
        <p>
          고용보험에 가입된 주 15시간 이상 근로자는 알바(단시간 근로자)도 수급
          가능합니다. 다만 일용직의 경우 별도 기준이 적용됩니다.
        </p>

        <h3>실업급여 받으면서 알바해도 되나요?</h3>
        <p>
          일부 취업(월 60시간 미만, 소득 월 약 100만원 미만)은 가능하나
          감액됩니다. 취업 사실을 반드시 신고해야 하며, 미신고 시 부정수급으로
          처벌받습니다.
        </p>

        <h3>실업급여 신청 기한이 있나요?</h3>
        <p>
          퇴직일 다음날부터 12개월 이내에 신청해야 합니다. 기한을 넘기면 수급
          자격이 소멸합니다.
        </p>
      </div>

      <RelatedArticles toolSlug="unemployment-calculator" />
    </div>
  );
}