import type { Metadata } from "next";
import InvestmentComparator from "@/components/tools/comparator/InvestmentComparator";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "적금 vs ETF vs 부동산 수익 비교 계산기 2026",
  description:
    "같은 금액을 적금, ETF, 부동산에 투자하면 수익 차이가 얼마나 날까? 세후 수익률까지 한눈에 비교하는 투자 시뮬레이터입니다.",
  keywords: [
    "적금 ETF 부동산 비교",
    "투자 수익 비교 계산기",
    "적금 vs 주식 vs 부동산",
    "투자 시뮬레이터",
    "재테크 비교",
    "투자 수익률 계산",
    "ETF 수익률 계산기",
    "부동산 투자 수익률",
  ],
  openGraph: {
    title: "적금 vs ETF vs 부동산 수익 비교 계산기 2026",
    description:
      "같은 금액을 적금, ETF, 부동산에 투자하면 수익 차이는? 세후 기준 비교 시뮬레이터",
    url: `${siteUrl}/ko/tools/investment-comparator`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function InvestmentComparatorPage({
  params,
}: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko"
            ? "적금 vs ETF vs 부동산 수익 비교"
            : "Savings vs ETF vs Real Estate Comparison"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "같은 금액을 적금, ETF, 부동산에 투자하면 수익 차이가 얼마나 날까요? 세후 기준으로 비교해 보세요."
            : "Compare returns from savings, ETF, and real estate investments with the same amount."}
        </p>
      </div>

      <InvestmentComparator />

      <div className="mt-16 prose prose-gray max-w-none">
        <h2>적금, ETF, 부동산 — 어디에 투자해야 할까?</h2>
        <p>
          &ldquo;목돈이 생겼는데 어디에 넣어야 할까?&rdquo; 많은 사람이 고민하는 질문입니다.
          세 가지 대표 투자처의 특성은 완전히 다릅니다. 안정성, 수익률, 유동성, 세금 부담까지
          종합적으로 따져야 자신에게 맞는 전략을 세울 수 있습니다.
        </p>

        <table>
          <thead>
            <tr>
              <th>항목</th>
              <th>적금</th>
              <th>ETF/펀드</th>
              <th>부동산</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>기대 수익률</td>
              <td>연 3~4%</td>
              <td>연 7~10%</td>
              <td>연 3~5% + 임대</td>
            </tr>
            <tr>
              <td>위험도</td>
              <td>매우 낮음</td>
              <td>중~높음</td>
              <td>중간</td>
            </tr>
            <tr>
              <td>유동성</td>
              <td>높음</td>
              <td>높음</td>
              <td>낮음</td>
            </tr>
            <tr>
              <td>최소 투자금</td>
              <td>1만원~</td>
              <td>1만원~</td>
              <td>수천만원~</td>
            </tr>
            <tr>
              <td>레버리지</td>
              <td>불가</td>
              <td>일부 가능</td>
              <td>대출 활용</td>
            </tr>
            <tr>
              <td>세금</td>
              <td>이자소득세 15.4%</td>
              <td>배당/양도세</td>
              <td>양도소득세 6~45%</td>
            </tr>
          </tbody>
        </table>

        <h2>투자 유형별 특징</h2>

        <h3>적금 — 안전하지만 낮은 수익</h3>
        <p>
          예금자보호법에 따라 5,000만원까지 원금이 보장됩니다. 금리가 물가상승률보다 낮은 시기에는
          실질 수익이 마이너스가 될 수 있습니다. 비상자금이나 단기 목적 자금에 적합합니다.
        </p>

        <h3>ETF/인덱스펀드 — 분산투자의 힘</h3>
        <p>
          KOSPI200, S&P500 등 지수를 추종하는 ETF는 개별 주식보다 리스크가 낮으면서
          장기 수익률은 연 7~10% 수준입니다. 단, 단기 변동성이 크기 때문에 최소 5년 이상
          투자 기간이 필요합니다. 적립식으로 매월 분할매수하면 변동성 리스크를 줄일 수 있습니다.
        </p>

        <h3>부동산 — 레버리지와 실물 자산</h3>
        <p>
          대출(레버리지)을 활용해 자기자본 대비 큰 자산을 매입할 수 있습니다.
          시세 차익과 임대 수익 두 가지 수입원이 있지만, 취득세·보유세·양도세 등
          세금 부담이 크고 환금성이 낮습니다. 금리 변동에도 민감합니다.
        </p>

        <h2>투자 시 꼭 알아야 할 세금</h2>
        <table>
          <thead>
            <tr>
              <th>투자 유형</th>
              <th>세금 종류</th>
              <th>세율</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>적금</td>
              <td>이자소득세</td>
              <td>15.4% (소득세 14% + 지방세 1.4%)</td>
            </tr>
            <tr>
              <td>ETF (국내)</td>
              <td>배당소득세</td>
              <td>15.4%</td>
            </tr>
            <tr>
              <td>ETF (해외)</td>
              <td>양도소득세</td>
              <td>22% (250만원 기본공제 후)</td>
            </tr>
            <tr>
              <td>부동산</td>
              <td>양도소득세</td>
              <td>6~45% (보유기간·주택수에 따라)</td>
            </tr>
            <tr>
              <td>부동산</td>
              <td>취득세</td>
              <td>1~12% (매입 시 1회)</td>
            </tr>
          </tbody>
        </table>

        <h2>자주 묻는 질문</h2>

        <h3>Q. 초보자는 어디에 투자하는 게 좋나요?</h3>
        <p>
          비상자금(생활비 3~6개월)은 적금에 넣고, 나머지는 ETF 적립식 투자로 시작하는 것을
          추천합니다. 부동산은 목돈과 대출 여력이 생긴 후 검토해도 늦지 않습니다.
        </p>

        <h3>Q. ETF 수익률 8%는 현실적인가요?</h3>
        <p>
          S&P500 지수의 최근 30년 연평균 수익률은 약 10%입니다. KOSPI의 경우 연 7~8% 수준이며,
          배당 재투자를 포함한 총수익률 기준입니다. 단, 특정 기간에는 마이너스 수익이 날 수 있습니다.
        </p>

        <h3>Q. 부동산 대출 레버리지가 항상 유리한가요?</h3>
        <p>
          시세 상승률이 대출 금리보다 높을 때만 유리합니다. 금리가 5%인데 시세가 연 2%만 오르면
          레버리지가 오히려 손실을 키웁니다. 역전세 리스크도 고려해야 합니다.
        </p>

        <h3>Q. 세금을 줄이는 방법이 있나요?</h3>
        <p>
          ISA 계좌를 활용하면 이자·배당소득 200~400만원까지 비과세 혜택을 받을 수 있습니다.
          연금저축과 IRP는 세액공제 + 과세이연 효과가 있습니다. 부동산은 1세대 1주택 비과세 요건(2년 이상 보유)을
          충족하면 양도세를 면제받을 수 있습니다.
        </p>

        <h3>Q. 분산투자는 어떻게 하나요?</h3>
        <p>
          자산배분의 기본 원칙은 &ldquo;한 바구니에 계란을 담지 말라&rdquo;입니다.
          나이와 리스크 성향에 따라 적금(안전):ETF(성장):부동산(실물) 비율을 조절하세요.
          일반적으로 &ldquo;100 - 나이 = 주식 비중(%)&rdquo; 공식이 참고가 됩니다.
        </p>
      </div>
    </div>
  );
}
