import type { Metadata } from "next";
import LifestyleLocationFinder from "@/components/tools/map/LifestyleLocationFinder";
import RelatedArticles from "@/components/tools/RelatedArticles";
import type { LifestyleData } from "@/lib/tools/lifestyle/types";
import fs from "fs";
import path from "path";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "나에게 맞는 동네 찾기 | 전국 134개 지역 라이프스타일 맞춤 추천",
  description:
    "서울·경기·인천·부산·대구·광주·대전·울산·세종·충청·전라·경상·강원·제주 전국 134개 지역의 생활 인프라를 비교해서 나에게 맞는 동네를 추천합니다.",
  keywords: [
    "살기 좋은 동네 추천",
    "서울 거주지 추천",
    "경기도 살기 좋은 곳",
    "부산 살기 좋은 동네",
    "대구 거주지 추천",
    "제주 살기 좋은 곳",
    "전국 거주지 비교",
    "동네 추천",
    "라이프스타일 맞춤 동네",
    "전국 지역 비교",
    "이사 추천 지역",
    "나에게 맞는 동네",
  ],
  openGraph: {
    title: "나에게 맞는 동네 찾기 | 전국 라이프스타일 맞춤 추천",
    description:
      "전국 134개 지역의 생활 인프라를 비교해서 나에게 맞는 동네를 추천합니다.",
    url: `${siteUrl}/ko/tools/lifestyle-location-finder`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

function loadLifestyleData(): LifestyleData {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "lifestyle-scores.json"
    );
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {
      updatedAt: new Date().toISOString(),
      districts: [],
    };
  }
}

export default async function LifestyleLocationFinderPage({
  params,
}: PageProps) {
  const { locale } = await params;
  const data = loadLifestyleData();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko"
            ? "🏠 나에게 맞는 동네 찾기"
            : "🏠 Find Your Ideal Neighborhood"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "라이프스타일 조건을 선택하면 전국 134개 지역별 점수를 매겨 나에게 맞는 동네를 추천합니다."
            : "Select your lifestyle preferences and we'll score 134 districts across all major Korean cities to find your best match."}
        </p>
      </div>

      {data.districts.length > 0 ? (
        <LifestyleLocationFinder data={data} />
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🗺️</p>
          <p>데이터를 준비 중입니다. 잠시 후 다시 확인해 주세요.</p>
        </div>
      )}

      {/* SEO 콘텐츠 */}
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>전국 어디 살까? 동네 선택이 생활의 질을 바꿉니다</h2>
        <p>
          이사를 준비하거나 독립을 계획 중이라면 &ldquo;어느 동네가 나한테 맞을까&rdquo;
          고민이 됩니다. 수도권부터 부산·대구·광주·대전·울산은 물론
          세종, 충청, 전라, 경상, 강원, 제주까지 전국 주요 도시를 한 번에 비교할 수 있습니다.
          같은 도시 안에서도 구마다 생활 인프라가 상당히 다르거든요.
        </p>
        <p>
          이 도구는 카카오 지도 데이터를 기반으로 전국 17개 시/도의 134개 지역
          생활 인프라를 43개 카테고리로 분석합니다.
          원하는 조건과 중요도를 설정하면 지역별 종합 점수를 계산해서
          나에게 맞는 동네를 추천해 드립니다.
        </p>

        <h3>사용 방법</h3>
        <ol>
          <li><strong>프리셋 선택</strong> 또는 <strong>직접 설정</strong>으로 시작하세요. 운동러, 육아맘, 문화인 등 7가지 프리셋을 제공합니다.</li>
          <li>카테고리를 체크하고 <strong>중요도(1~5)</strong>를 조절하세요. 5에 가까울수록 해당 조건이 점수에 크게 반영됩니다.</li>
          <li><strong>분석하기</strong>를 누르면 134개 지역의 점수가 계산되고, 지도와 랭킹으로 결과를 확인할 수 있습니다.</li>
          <li><strong>지역 탭</strong>으로 시/도별 필터를 전환하고, 지역을 클릭하면 카테고리별 상세 점수를 볼 수 있습니다.</li>
        </ol>

        <h3>분석 가능한 카테고리</h3>
        <table>
          <thead>
            <tr>
              <th>그룹</th>
              <th>항목 수</th>
              <th>예시</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>🌳 자연/환경</td>
              <td>6개</td>
              <td>공원, 등산로, 강/하천, 산책로, 자전거길, 녹지율</td>
            </tr>
            <tr>
              <td>💪 운동/스포츠</td>
              <td>8개</td>
              <td>헬스장, 수영장, 요가, 풋살, 테니스, 골프, 클라이밍, 볼링</td>
            </tr>
            <tr>
              <td>🍽️ 식음료</td>
              <td>4개</td>
              <td>카페, 식당, 베이커리, 바</td>
            </tr>
            <tr>
              <td>🏪 생활편의</td>
              <td>6개</td>
              <td>편의점, 대형마트, 전통시장, 은행, 세탁소, 주차장</td>
            </tr>
            <tr>
              <td>🏥 의료/건강</td>
              <td>5개</td>
              <td>종합병원, 의원, 약국, 치과, 한의원</td>
            </tr>
            <tr>
              <td>🚇 교통</td>
              <td>3개</td>
              <td>지하철역, 버스정류장, KTX</td>
            </tr>
            <tr>
              <td>📚 교육/문화</td>
              <td>9개</td>
              <td>학교, 학원, 어린이집, 대학교, 도서관, 영화관, 미술관 등</td>
            </tr>
            <tr>
              <td>🏠 주거환경</td>
              <td>6개</td>
              <td>조용한 환경, 번화가, 치안, 동물병원, 키즈카페, 소아과</td>
            </tr>
          </tbody>
        </table>

        <h2>자주 묻는 질문</h2>

        <h4>Q. 데이터는 어디서 오나요?</h4>
        <p>
          카카오 지도 Local API로 수집한 POI(장소) 데이터입니다.
          각 지역 중심 좌표 기준 반경 3km 이내의 시설 수를 카운트합니다.
          분기별로 데이터를 갱신하고 있습니다.
        </p>

        <h4>Q. 어떤 지역이 포함되어 있나요?</h4>
        <p>
          서울, 경기, 인천, 부산, 대구, 광주, 대전, 울산, 세종,
          충북(청주), 충남(천안·아산), 전북(전주·군산·익산), 전남(여수·순천·목포),
          경북(포항·구미·경주), 경남(창원·김해·진주), 강원(춘천·원주·강릉), 제주
          총 134개 지역을 분석합니다.
          상단 지역 탭으로 시/도별로 필터링할 수 있습니다.
          동 단위 세부 분석은 향후 업데이트 예정입니다.
        </p>

        <h4>Q. 점수가 높으면 무조건 좋은 동네인가요?</h4>
        <p>
          점수는 &ldquo;내가 선택한 조건&rdquo;에 맞는 정도를 나타냅니다.
          같은 동네라도 어떤 조건을 중시하느냐에 따라 점수가 달라집니다.
          예를 들어 &ldquo;조용한 환경&rdquo;을 중시하면 도봉구·과천시·울산 울주군이 상위권이고,
          &ldquo;카페·지하철&rdquo;을 중시하면 강남구·마포구·부산 해운대구가 올라갑니다.
        </p>

        <h4>Q. 전세·월세 시세도 볼 수 있나요?</h4>
        <p>
          현재 버전에서는 생활 인프라 분석만 제공합니다.
          실거래가 비교는{" "}
          <a href="/ko/tools/rent-price-heatmap">전월세 시세 히트맵</a>
          {" "}도구를 함께 활용해 보세요.
        </p>
      </div>

      <RelatedArticles toolSlug="lifestyle-location-finder" />
    </div>
  );
}
