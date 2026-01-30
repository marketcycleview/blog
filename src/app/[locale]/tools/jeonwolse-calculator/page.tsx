import RelatedArticles from "@/components/tools/RelatedArticles";
import type { Metadata } from "next";
import { JeonwolseCalculator } from "@/components/calculators";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "전월세 전환 계산기 - 전세 월세 환산, 보증금 조정",
  description:
    "전세와 월세를 상호 전환해보세요. 전월세 전환율을 적용하여 보증금 변경 시 월세 변동액을 계산할 수 있습니다. 지역별 평균 전환율 제공.",
  keywords: [
    "전월세 전환",
    "전세 월세 계산",
    "전월세 전환율",
    "보증금 월세 환산",
    "전세 월세 비교",
    "월세 보증금",
    "임대차 계산",
    "전환율 계산기",
  ],
  openGraph: {
    title: "전월세 전환 계산기",
    description:
      "전세 ↔ 월세 전환 시 보증금과 월세를 계산해보세요.",
    url: `${siteUrl}/ko/tools/jeonwolse-calculator`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function JeonwolseCalculatorPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      {/* 페이지 헤더 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko" ? "전월세 전환 계산기" : "Deposit-Rent Conversion Calculator"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "전세와 월세를 전환하거나 보증금 조정 시 월세 변동액을 계산하세요."
            : "Convert between Jeonse and monthly rent deposits."}
        </p>
      </div>

      {/* 계산기 */}
      <JeonwolseCalculator />

      {/* SEO 콘텐츠 */}
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>전월세 전환율이란?</h2>
        <p>
          전월세 전환율은 보증금을 월세로 전환할 때 적용하는 연이율입니다.
          예를 들어 전환율 5%일 때, 보증금 1억원을 줄이면 월세가 약 42만원
          늘어납니다 (1억 × 5% ÷ 12개월).
        </p>

        <h2>법정 전환율 상한</h2>
        <p>
          주택임대차보호법에 따라 전월세 전환율은 &quot;기준금리 + 3.5%&quot; 또는
          &quot;연 10%&quot; 중 낮은 값을 초과할 수 없습니다. 2024년 기준 한국은행
          기준금리가 3.5%이므로 법정 상한은 약 7%입니다.
        </p>

        <h2>지역별 평균 전환율</h2>
        <table>
          <thead>
            <tr>
              <th>지역</th>
              <th>평균 전환율</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>서울</td>
              <td>4.5%</td>
              <td>수도권 최저</td>
            </tr>
            <tr>
              <td>경기</td>
              <td>5.0%</td>
              <td></td>
            </tr>
            <tr>
              <td>인천</td>
              <td>5.5%</td>
              <td></td>
            </tr>
            <tr>
              <td>부산</td>
              <td>5.5%</td>
              <td></td>
            </tr>
            <tr>
              <td>지방</td>
              <td>6.0%</td>
              <td>지역별 상이</td>
            </tr>
          </tbody>
        </table>

        <h2>전세 vs 월세, 뭐가 유리할까?</h2>

        <h3>전세가 유리한 경우</h3>
        <ul>
          <li>목돈이 있고 장기 거주 계획일 때</li>
          <li>전세자금대출 금리가 전환율보다 낮을 때</li>
          <li>전세가격 상승이 예상될 때</li>
        </ul>

        <h3>월세가 유리한 경우</h3>
        <ul>
          <li>보증금 마련이 어려울 때</li>
          <li>단기 거주 계획일 때</li>
          <li>전세 사기 위험을 피하고 싶을 때</li>
        </ul>

        <h2>자주 묻는 질문</h2>

        <h3>임대인이 전환율을 높게 요구하면?</h3>
        <p>
          법정 상한(현재 약 7~10%)을 초과하는 전환율은 무효입니다. 임대인과
          협의하되, 법정 상한을 알려주고 조정을 요청할 수 있습니다.
        </p>

        <h3>보증금을 올리면 월세가 줄어드나요?</h3>
        <p>
          네, 보증금 증액분에 전환율을 적용하여 월세가 감소합니다. 예를 들어
          보증금 1천만원 증액 시 전환율 5% 기준 월 약 4만원 절약됩니다.
        </p>

        <h3>반전세는 어떻게 계산하나요?</h3>
        <p>
          반전세는 전세와 월세의 중간 형태로, 보증금 일부를 월세로 전환한
          형태입니다. 이 계산기로 원하는 보증금 수준에서의 월세를 계산해보세요.
        </p>
      </div>

      <RelatedArticles toolSlug="jeonwolse-calculator" />
    </div>
  );
}