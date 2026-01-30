import RelatedArticles from "@/components/tools/RelatedArticles";
import type { Metadata } from "next";
import { MedianIncomeCalculator } from "@/components/calculators";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "중위소득 계산기 2026 - 기준 중위소득 확인, 복지 자격 조회",
  description:
    "2026년 기준 중위소득을 확인하고 내 소득이 몇 %인지 계산해보세요. 가구원수별 중위소득표와 복지 정책 수급 기준을 한눈에 확인할 수 있습니다.",
  keywords: [
    "중위소득",
    "기준 중위소득",
    "2026 중위소득",
    "중위소득 계산기",
    "복지 자격",
    "생계급여",
    "의료급여",
    "주거급여",
    "교육급여",
    "가구원수별 중위소득",
  ],
  openGraph: {
    title: "중위소득 계산기 2026",
    description:
      "가구원수별 기준 중위소득과 복지 수급 자격을 확인하세요.",
    url: `${siteUrl}/ko/tools/median-income-calculator`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function MedianIncomeCalculatorPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      {/* 페이지 헤더 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko" ? "중위소득 계산기 2026" : "Median Income Calculator 2026"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "가구원 수와 소득을 입력하면 중위소득 대비 비율과 복지 자격을 확인해드립니다."
            : "Check your income percentage against median and welfare eligibility."}
        </p>
      </div>

      {/* 계산기 */}
      <MedianIncomeCalculator />

      {/* SEO 콘텐츠 */}
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>기준 중위소득이란?</h2>
        <p>
          기준 중위소득은 전체 가구를 소득순으로 줄 세웠을 때 정확히 중간에 있는
          가구의 소득입니다. 매년 보건복지부에서 발표하며, 대부분의 복지 정책
          수급 자격 기준으로 활용됩니다.
        </p>

        <h2>2026년 가구별 기준 중위소득</h2>
        <table>
          <thead>
            <tr>
              <th>가구원 수</th>
              <th>기준 중위소득 (월)</th>
              <th>50%</th>
              <th>60%</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1인</td>
              <td>2,392,013원</td>
              <td>1,196,007원</td>
              <td>1,435,208원</td>
            </tr>
            <tr>
              <td>2인</td>
              <td>3,932,658원</td>
              <td>1,966,329원</td>
              <td>2,359,595원</td>
            </tr>
            <tr>
              <td>3인</td>
              <td>5,025,353원</td>
              <td>2,512,677원</td>
              <td>3,015,212원</td>
            </tr>
            <tr>
              <td>4인</td>
              <td>6,097,773원</td>
              <td>3,048,887원</td>
              <td>3,658,664원</td>
            </tr>
          </tbody>
        </table>
        <p>* 2026년 예상치입니다. 정확한 금액은 보건복지부 발표를 확인하세요.</p>

        <h2>소득인정액 계산 방법</h2>
        <p>
          복지 정책 자격 확인 시에는 단순 근로소득이 아닌 &quot;소득인정액&quot;을
          사용합니다.
        </p>
        <p>
          <strong>소득인정액 = 소득평가액 + 재산의 소득환산액</strong>
        </p>
        <ul>
          <li>
            <strong>소득평가액:</strong> 근로소득, 사업소득, 재산소득, 이전소득 등
            (일부 공제 적용)
          </li>
          <li>
            <strong>재산의 소득환산액:</strong> 재산에서 기본재산액을 뺀 후
            환산율 적용
          </li>
        </ul>

        <h2>중위소득 비율별 주요 복지 정책</h2>

        <h3>중위소득 30% 이하 (생계급여)</h3>
        <p>
          기초생활수급자 중 생계급여 대상입니다. 생계급여 선정기준액에서 소득
          인정액을 뺀 금액을 지원받습니다.
        </p>

        <h3>중위소득 40% 이하 (의료급여)</h3>
        <p>
          의료비 대부분을 국가에서 지원받습니다. 1종은 본인부담 없음, 2종은
          일부 본인부담이 있습니다.
        </p>

        <h3>중위소득 48% 이하 (주거급여)</h3>
        <p>
          임차가구는 지역별 기준임대료를 지원받고, 자가가구는 수선비를
          지원받습니다.
        </p>

        <h3>중위소득 60% 이하</h3>
        <p>
          청년월세지원, 청년도약계좌 등 다양한 청년 지원 정책의 기준입니다.
        </p>

        <h2>자주 묻는 질문</h2>

        <h3>부모님과 같이 살면 가구원 수에 포함되나요?</h3>
        <p>
          같은 주소지에 거주하면 보통 한 가구로 봅니다. 다만, 청년 정책 중
          일부는 청년 본인 가구만 인정하기도 합니다.
        </p>

        <h3>세전 소득과 세후 소득 중 어떤 것을 입력하나요?</h3>
        <p>
          일반적으로 세전(총급여) 기준입니다. 근로소득의 경우 원천징수 전
          금액을 사용합니다.
        </p>

        <h3>중위소득 100%면 평균이 아닌가요?</h3>
        <p>
          아닙니다. 중위소득은 &quot;중간값&quot;이고, 평균소득은 &quot;산술 평균&quot;입니다.
          고소득층이 평균을 끌어올리기 때문에 평균소득이 중위소득보다 높습니다.
        </p>
      </div>

      <RelatedArticles toolSlug="median-income-calculator" />
    </div>
  );
}