import RelatedArticles from "@/components/tools/RelatedArticles";
import type { Metadata } from "next";
import { fetchAllRates } from "@/lib/tools/rates/fetcher";
import InterestRateDashboard from "@/components/tools/rates/InterestRateDashboard";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const revalidate = 86400; // 24시간 ISR

export const metadata: Metadata = {
  title: "오늘의 예금·적금 금리 비교표 2026 | 은행별 금리 한눈에",
  description:
    "2026년 주요 은행 정기예금·적금 금리를 한눈에 비교하세요. 기간별, 은행별 기본금리·최고금리 순위를 실시간으로 확인할 수 있습니다.",
  keywords: [
    "예금 금리 비교",
    "적금 금리 비교",
    "은행 금리 순위",
    "정기예금 금리",
    "적금 금리 높은 은행",
    "2026 예금 금리",
    "은행별 금리 비교표",
    "인터넷은행 금리",
  ],
  openGraph: {
    title: "오늘의 예금·적금 금리 비교표 2026",
    description:
      "주요 은행 정기예금·적금 금리를 한눈에 비교. 기간별 최고금리 순위 확인.",
    url: `${siteUrl}/ko/tools/interest-rate-dashboard`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function InterestRateDashboardPage({
  params,
}: PageProps) {
  const { locale } = await params;
  const data = await fetchAllRates();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko"
            ? "🏦 오늘의 예금·적금 금리 비교표"
            : "🏦 Today's Deposit & Savings Rate Comparison"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "주요 은행의 정기예금·적금 금리를 한눈에 비교해 보세요."
            : "Compare deposit and savings interest rates across major banks at a glance."}
        </p>
      </div>

      <InterestRateDashboard data={data} />

      {/* SEO 콘텐츠 */}
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>은행 금리, 어디가 제일 높을까?</h2>
        <p>
          같은 돈을 예금에 넣더라도 은행에 따라 금리 차이가 꽤 납니다.
          시중은행은 안정적이지만 금리가 낮고, 인터넷전문은행(카카오뱅크, 토스뱅크, 케이뱅크)은
          상대적으로 높은 금리를 제공하는 경우가 많아요.
        </p>

        <h3>정기예금 vs 적금, 뭐가 다른가요?</h3>
        <table>
          <thead>
            <tr>
              <th>구분</th>
              <th>정기예금</th>
              <th>적금</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>납입 방식</td>
              <td>목돈을 한 번에 예치</td>
              <td>매월 일정액 납입</td>
            </tr>
            <tr>
              <td>금리</td>
              <td>비교적 낮음</td>
              <td>비교적 높음</td>
            </tr>
            <tr>
              <td>실수령 이자</td>
              <td>전체 금액에 이자 적용</td>
              <td>납입 시점별 이자 차등</td>
            </tr>
            <tr>
              <td>적합한 경우</td>
              <td>목돈이 있을 때</td>
              <td>매월 저축할 때</td>
            </tr>
          </tbody>
        </table>
        <p>
          목돈이 있다면 정기예금이 유리하고, 매달 모으는 방식이라면 적금이 맞습니다.
          같은 금리라도 정기예금의 실수령 이자가 적금보다 많다는 점 참고하세요.
        </p>

        <h3>기본금리와 최고금리 차이</h3>
        <p>
          은행에서 표시하는 <strong>기본금리</strong>는 아무 조건 없이 받는 금리이고,
          <strong>최고금리</strong>는 우대 조건(급여이체, 카드실적, 앱 가입 등)을
          모두 충족했을 때 받는 금리입니다. 최고금리 조건이 까다로운 경우도 있으니
          가입 전에 우대 조건을 꼭 확인하세요.
        </p>

        <h3>예금·적금 가입 전 체크리스트</h3>
        <ul>
          <li>금리 비교: 기본금리뿐 아니라 우대 조건을 충족할 수 있는지 확인</li>
          <li>가입 기간: 중도해지 시 이자가 크게 줄어들 수 있음</li>
          <li>세금: 이자소득의 15.4%가 세금으로 빠짐 (비과세 상품 확인)</li>
          <li>예금자보호: 1인당 5천만원까지 보호 (은행별)</li>
          <li>가입 한도: 상품별 최대 가입 금액 확인</li>
        </ul>

        <h3>자주 묻는 질문</h3>

        <h4>Q. 금리 정보는 얼마나 자주 업데이트되나요?</h4>
        <p>
          금융감독원 금융상품한눈에 API를 통해 매일 업데이트됩니다.
          다만 은행별 금리 변경 시점은 다를 수 있으니, 가입 전 해당 은행 앱이나 홈페이지에서
          최종 확인하시는 게 좋습니다.
        </p>

        <h4>Q. 인터넷은행이 금리가 더 높은 이유는?</h4>
        <p>
          오프라인 지점 운영 비용이 없어서 그 차이를 고객에게 금리로 돌려주는 구조입니다.
          카카오뱅크, 토스뱅크, 케이뱅크 모두 예금자보호 대상이니 안전성은 동일합니다.
        </p>

        <h4>Q. 단리와 복리 차이는?</h4>
        <p>
          <strong>단리</strong>는 원금에만 이자가 붙고, <strong>복리</strong>는 이자에도
          이자가 붙습니다. 1~2년 단기에선 차이가 크지 않지만, 장기로 갈수록 복리가 유리해요.
          대부분의 은행 예금·적금은 단리 기준입니다.
        </p>
      </div>

      <RelatedArticles toolSlug="interest-rate-dashboard" />
    </div>
  );
}