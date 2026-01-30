import type { Metadata } from "next";
import CommercialDistrictMap from "@/components/tools/map/CommercialDistrictMap";
import RelatedArticles from "@/components/tools/RelatedArticles";
import type { CommercialData } from "@/lib/tools/commercial/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "창업 상권 분석 지도 | 업종·지역별 상가업소 현황",
  description:
    "지도에서 지역을 선택하고 상권을 분석하세요. 업종별 상가업소 분포, 업소 밀집도, 경쟁 현황을 한눈에 확인합니다. 소상공인진흥공단 공공데이터 기반.",
  keywords: [
    "상권 분석",
    "상권 지도",
    "창업 상권",
    "업종 분석",
    "상가 밀집도",
    "소상공인",
    "상가업소 현황",
    "창업 입지",
    "프랜차이즈 분석",
    "상권 조사",
  ],
  openGraph: {
    title: "창업 상권 분석 지도 | 업종·지역별 상가업소 현황",
    description:
      "지도에서 지역을 선택하고 상권을 분석하세요. 소상공인진흥공단 데이터 기반.",
    url: `${siteUrl}/ko/tools/commercial-district-map`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function CommercialDistrictMapPage({
  params,
}: PageProps) {
  const { locale } = await params;
  const initialData: CommercialData = { stores: [], totalCount: 0, updatedAt: new Date().toISOString(), isLive: true };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko"
            ? "📍 창업 상권 분석 지도"
            : "📍 Commercial District Map"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "지역과 업종을 선택하면 상가업소 분포와 경쟁 현황을 지도 위에서 확인할 수 있습니다."
            : "Select a region and business type to analyze commercial districts on the map."}
        </p>
      </div>

      <CommercialDistrictMap initialData={initialData} />

      {/* SEO 콘텐츠 */}
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>상권 분석, 왜 중요한가요?</h2>
        <p>
          음식점이든 카페든 창업할 때 가장 중요한 건 입지입니다.
          같은 업종이 이미 밀집해 있는 곳은 경쟁이 치열하고,
          반대로 수요 대비 공급이 부족한 곳은 기회가 될 수 있어요.
        </p>
        <p>
          이 도구는 소상공인시장진흥공단의 상가(상권)정보 공공데이터를 활용합니다.
          지역과 업종을 선택하면 해당 지역의 업소 분포를 지도와 차트로 보여줍니다.
        </p>

        <h3>상권 분석 시 체크포인트</h3>
        <table>
          <thead>
            <tr>
              <th>항목</th>
              <th>확인 사항</th>
              <th>좋은 조건</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>경쟁 업소 수</td>
              <td>같은 업종 업소가 몇 개인지</td>
              <td>수요 대비 적당한 수</td>
            </tr>
            <tr>
              <td>유동인구</td>
              <td>주변 유동인구 규모</td>
              <td>타겟 고객층 유동 활발</td>
            </tr>
            <tr>
              <td>임대료</td>
              <td>평당 임대료 수준</td>
              <td>예상 매출 대비 적정</td>
            </tr>
            <tr>
              <td>접근성</td>
              <td>대중교통, 주차 편의</td>
              <td>역세권 또는 주차 가능</td>
            </tr>
            <tr>
              <td>업종 다양성</td>
              <td>주변 업종 구성</td>
              <td>시너지 효과 기대 가능</td>
            </tr>
          </tbody>
        </table>

        <h3>업종별 창업 팁</h3>
        <ul>
          <li>
            <strong>음식점</strong>: 점심 유동인구가 많은 오피스 밀집 지역이
            유리. 배달 비중도 고려.
          </li>
          <li>
            <strong>카페</strong>: 주거지역 + 대학가 인근이 안정적. 주말
            유동인구도 중요.
          </li>
          <li>
            <strong>소매업</strong>: 편의점은 1인가구 밀집 지역, 슈퍼마켓은
            가족 주거지역.
          </li>
          <li>
            <strong>교육</strong>: 학교 밀집 지역, 학부모 유동인구가 많은 곳.
          </li>
          <li>
            <strong>생활서비스</strong>: 미용실·세탁소 등은 주거지역 상가
            1층이 유리.
          </li>
        </ul>

        <h2>자주 묻는 질문</h2>

        <h4>Q. 데이터는 얼마나 최신인가요?</h4>
        <p>
          소상공인시장진흥공단에서 국세청·카드사 데이터를 기반으로 업데이트합니다.
          정확한 업데이트 주기는 분기별이며, 실시간 데이터는 아닙니다.
          폐업한 업소가 포함되어 있을 수 있으니 참고 자료로 활용하세요.
        </p>

        <h4>Q. 매출이나 유동인구 데이터도 볼 수 있나요?</h4>
        <p>
          현재 이 도구에서는 업소 위치와 업종 정보만 제공합니다.
          매출 추정, 유동인구 분석은 소상공인시장진흥공단의 상권분석시스템(sg.sbiz.or.kr)에서
          더 상세하게 확인할 수 있어요.
        </p>

        <h4>Q. 프랜차이즈와 개인 매장을 구분할 수 있나요?</h4>
        <p>
          현재 공공데이터에서는 프랜차이즈 여부를 직접 구분하지 않습니다.
          다만 상호명으로 대략적인 판단이 가능합니다.
        </p>

        <h4>Q. 실제 창업 시 이 데이터만으로 충분한가요?</h4>
        <p>
          이 도구는 1차 탐색용입니다. 실제 창업 결정 전에는 현장 방문,
          임대료 확인, 소상공인시장진흥공단 무료 컨설팅 등을 반드시 병행하세요.
        </p>
      </div>

      <RelatedArticles toolSlug="commercial-district-map" />
    </div>
  );
}
