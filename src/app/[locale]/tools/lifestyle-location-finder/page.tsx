import type { Metadata } from "next";
import LifestyleLocationFinder from "@/components/tools/map/LifestyleLocationFinder";
import RelatedArticles from "@/components/tools/RelatedArticles";
import type { LifestyleData } from "@/lib/tools/lifestyle/types";
import fs from "fs";
import path from "path";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "나에게 맞는 동네 찾기 | 서울 25개 구 라이프스타일 맞춤 추천",
  description:
    "공원, 헬스장, 카페, 지하철 등 라이프스타일 조건을 선택하면 서울 25개 구별 점수를 계산해서 나에게 딱 맞는 동네를 추천해 드립니다.",
  keywords: [
    "서울 살기 좋은 동네",
    "서울 거주지 추천",
    "동네 추천",
    "라이프스타일 맞춤 동네",
    "서울 구별 비교",
    "이사 추천 지역",
    "서울 생활환경 비교",
    "나에게 맞는 동네",
    "서울 인프라 비교",
  ],
  openGraph: {
    title: "나에게 맞는 동네 찾기 | 서울 라이프스타일 맞춤 추천",
    description:
      "공원, 헬스장, 카페, 지하철 등 조건을 선택하면 서울 25개 구별 점수로 나에게 맞는 동네를 추천합니다.",
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
            ? "라이프스타일 조건을 선택하면 서울 25개 구별로 점수를 매겨 나에게 맞는 동네를 추천합니다."
            : "Select your lifestyle preferences and we'll score Seoul's 25 districts to find your best match."}
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
        <h2>서울, 어디 살까? 동네 선택이 생활의 질을 바꿉니다</h2>
        <p>
          이사를 준비하거나 독립을 계획 중이라면 &ldquo;어느 동네가 나한테 맞을까&rdquo;
          고민이 됩니다. 같은 서울이라도 구마다 생활 인프라가 상당히 다르거든요.
          헬스장이 많은 동네, 공원이 넓은 동네, 카페 골목이 있는 동네 —
          사람마다 중요하게 생각하는 조건이 다릅니다.
        </p>
        <p>
          이 도구는 카카오 지도 데이터를 기반으로 서울 25개 구의 생활 인프라를
          40개 카테고리로 분석합니다. 원하는 조건과 중요도를 설정하면
          구별 종합 점수를 계산해서 나에게 맞는 동네를 추천해 드립니다.
        </p>

        <h3>사용 방법</h3>
        <ol>
          <li><strong>프리셋 선택</strong> 또는 <strong>직접 설정</strong>으로 시작하세요. 운동러, 육아맘, 문화인 등 7가지 프리셋을 제공합니다.</li>
          <li>카테고리를 체크하고 <strong>중요도(1~5)</strong>를 조절하세요. 5에 가까울수록 해당 조건이 점수에 크게 반영됩니다.</li>
          <li><strong>분석하기</strong>를 누르면 25개 구의 점수가 계산되고, 지도와 랭킹으로 결과를 확인할 수 있습니다.</li>
          <li>구를 클릭하면 카테고리별 상세 점수와 구 설명을 볼 수 있습니다.</li>
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
          각 구 중심 좌표 기준 반경 3km 이내의 시설 수를 카운트합니다.
          분기별로 데이터를 갱신하고 있습니다.
        </p>

        <h4>Q. 구 단위가 너무 넓지 않나요?</h4>
        <p>
          같은 구 안에서도 동마다 차이가 있는 건 사실입니다.
          이 도구는 &ldquo;어느 구 쪽이 나한테 맞을까&rdquo;하는 대략적인 방향을
          잡는 데 유용합니다. 동 단위 분석은 향후 업데이트 예정입니다.
        </p>

        <h4>Q. 점수가 높으면 무조건 좋은 동네인가요?</h4>
        <p>
          점수는 &ldquo;내가 선택한 조건&rdquo;에 맞는 정도를 나타냅니다.
          같은 동네라도 어떤 조건을 중시하느냐에 따라 점수가 달라집니다.
          예를 들어 &ldquo;조용한 환경&rdquo;을 중시하면 강북구·도봉구가 상위권이고,
          &ldquo;카페·지하철&rdquo;을 중시하면 강남구·마포구가 올라갑니다.
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
