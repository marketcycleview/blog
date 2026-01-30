import type { Metadata } from "next";
import { fetchRentHeatmap } from "@/lib/tools/rates/rent-fetcher";
import RentPriceHeatmap from "@/components/tools/rates/RentPriceHeatmap";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "전월세 시세 히트맵 2026 | 지역별 아파트 전세·월세 실거래 비교",
  description:
    "서울·경기·부산 등 전국 아파트 전월세 실거래가를 구별 히트맵으로 비교하세요. 국토교통부 실거래 데이터 기반, 전세 보증금·월세 평균 한눈에 확인.",
  keywords: [
    "전월세 시세",
    "아파트 전세 시세",
    "전세 보증금 비교",
    "월세 시세",
    "전월세 실거래가",
    "지역별 전세 비교",
    "서울 전세 시세",
    "경기 전세 시세",
    "국토교통부 실거래",
  ],
  openGraph: {
    title: "전월세 시세 히트맵 | 지역별 아파트 실거래 비교",
    description:
      "전국 아파트 전월세 실거래가를 구별 히트맵으로 비교. 국토교통부 데이터 기반.",
    url: `${siteUrl}/ko/tools/rent-price-heatmap`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

function getDefaultMonth(): string {
  const now = new Date();
  now.setMonth(now.getMonth() - 2);
  return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export default async function RentPriceHeatmapPage({ params }: PageProps) {
  const { locale } = await params;
  const data = await fetchRentHeatmap("11", getDefaultMonth());

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko"
            ? "🗺️ 전월세 시세 히트맵"
            : "🗺️ Rent Price Heatmap"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "국토교통부 실거래 데이터로 지역별 아파트 전세·월세 시세를 한눈에 비교하세요."
            : "Compare apartment rent prices by district using official transaction data."}
        </p>
      </div>

      <RentPriceHeatmap initialData={data} />

      {/* SEO 콘텐츠 */}
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>전월세 실거래가, 왜 확인해야 할까요?</h2>
        <p>
          전세나 월세 계약을 앞두고 있다면, 실제 거래된 가격을 확인하는 게 가장 중요합니다.
          호가(집주인이 부르는 가격)와 실거래가는 꽤 차이가 나는 경우가 많거든요.
          이 도구는 국토교통부에서 공개하는 아파트 전월세 실거래 데이터를 기반으로,
          지역별 평균 시세를 히트맵 형태로 보여줍니다.
        </p>

        <h3>실거래가 데이터 특징</h3>
        <table>
          <thead>
            <tr>
              <th>항목</th>
              <th>내용</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>데이터 출처</td>
              <td>국토교통부 실거래가 공개시스템</td>
            </tr>
            <tr>
              <td>업데이트 주기</td>
              <td>매월 (거래 후 약 1~2개월 후 공개)</td>
            </tr>
            <tr>
              <td>포함 범위</td>
              <td>아파트 전세·월세 거래</td>
            </tr>
            <tr>
              <td>지역 단위</td>
              <td>시/군/구 → 법정동</td>
            </tr>
          </tbody>
        </table>

        <h3>히트맵 읽는 법</h3>
        <ul>
          <li><strong>진한 빨강/주황</strong>: 해당 지역 평균 가격이 높은 편</li>
          <li><strong>연한 파랑/녹색</strong>: 상대적으로 저렴한 지역</li>
          <li><strong>거래 건수</strong>가 적은 곳은 평균값 신뢰도가 낮을 수 있으니 참고로만 보세요</li>
        </ul>
        <p>
          같은 구 안에서도 동(洞)이나 아파트 단지에 따라 가격 차이가 크니까,
          히트맵으로 대략적인 시세를 파악한 뒤 구체적인 매물을 찾아보는 게 좋습니다.
        </p>

        <h3>전세 vs 월세, 어떤 게 유리할까?</h3>
        <p>
          전세는 큰 금액을 한 번에 맡기지만 매달 나가는 돈이 없고,
          월세는 초기 부담이 적지만 매달 고정 지출이 생깁니다.
          전세자금대출 금리가 낮다면 전세가 유리할 수 있고,
          목돈이 부족하다면 월세+투자 전략이 나을 수도 있어요.
        </p>

        <h2>자주 묻는 질문</h2>

        <h4>Q. 데이터가 최신이 아닌 것 같아요</h4>
        <p>
          국토교통부 실거래 데이터는 거래 후 약 1~2개월 후에 공개됩니다.
          그래서 가장 최근 데이터가 2개월 전 기준인 경우가 많아요.
          실시간 시세가 아니라 실제 계약된 가격이라는 점에서 오히려 신뢰할 수 있습니다.
        </p>

        <h4>Q. 신축 아파트는 데이터가 없나요?</h4>
        <p>
          입주 초기에는 거래 건수가 적어 평균값이 나오지 않을 수 있습니다.
          시간이 지나면서 데이터가 쌓이면 자연스럽게 반영됩니다.
        </p>

        <h4>Q. 오피스텔이나 빌라 데이터도 있나요?</h4>
        <p>
          현재 이 도구는 아파트 전월세 데이터만 제공합니다.
          오피스텔과 연립/다세대 주택은 별도 API를 사용하는데, 추후 추가할 예정이에요.
        </p>

        <h4>Q. 전세사기 예방에 도움이 되나요?</h4>
        <p>
          실거래가를 확인하면 시세보다 지나치게 낮은 전세가를 걸러낼 수 있습니다.
          시세의 80% 이상인 전세가라면 깐깐하게 확인해 보세요.
          등기부등본 확인, 전세보증보험 가입도 반드시 병행하시고요.
        </p>
      </div>
    </div>
  );
}
