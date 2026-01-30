import type { Metadata } from "next";
import RegionalWelfareMap from "@/components/tools/map/RegionalWelfareMap";
import RelatedArticles from "@/components/tools/RelatedArticles";
import type { WelfareData } from "@/lib/tools/welfare/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "지역별 복지 혜택 지도 | 나에게 맞는 복지서비스 찾기",
  description:
    "지도에서 지역을 선택하고 받을 수 있는 복지 혜택을 확인하세요. 생활안정, 주거, 교육, 고용, 건강 분야별로 중앙부처 복지서비스를 한눈에 비교합니다.",
  keywords: [
    "복지 혜택 지도",
    "지역별 복지",
    "복지서비스 찾기",
    "정부 복지 혜택",
    "복지 지원금",
    "나에게 맞는 복지",
    "복지로",
    "중앙부처 복지",
    "복지 정책 검색",
  ],
  openGraph: {
    title: "지역별 복지 혜택 지도 | 나에게 맞는 복지서비스 찾기",
    description:
      "지도에서 지역을 선택하고 받을 수 있는 복지 혜택을 확인하세요.",
    url: `${siteUrl}/ko/tools/regional-welfare-map`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

async function fetchWelfareData(): Promise<WelfareData> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/welfare-services`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`fetch ${res.status}`);
    return res.json();
  } catch {
    return { services: [], totalCount: 0, updatedAt: new Date().toISOString(), isLive: false };
  }
}

export default async function RegionalWelfareMapPage({ params }: PageProps) {
  const { locale } = await params;
  const data = await fetchWelfareData();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko"
            ? "🗺️ 지역별 복지 혜택 지도"
            : "🗺️ Regional Welfare Map"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "지역을 선택하고 받을 수 있는 복지 혜택을 확인해 보세요. 분야별·대상별로 필터링할 수 있습니다."
            : "Select your region and discover available welfare benefits. Filter by category and target group."}
        </p>
      </div>

      <RegionalWelfareMap initialData={data} />

      {/* SEO 콘텐츠 */}
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>복지 혜택, 모르면 못 받습니다</h2>
        <p>
          한국에는 중앙부처와 지자체가 운영하는 복지서비스가 수백 가지 넘습니다.
          문제는 대부분 신청해야 받을 수 있다는 점이에요.
          자격이 되는데도 몰라서 못 받는 경우가 생각보다 많습니다.
        </p>
        <p>
          이 도구는 복지로 공공데이터를 기반으로 주요 복지서비스를 분야별·대상별로 정리했습니다.
          지역을 선택하면 해당 지역 복지 담당기관이 지도에 표시되고,
          아래에서 나에게 맞는 복지 혜택을 필터링할 수 있습니다.
        </p>

        <h3>분야별 복지서비스</h3>
        <table>
          <thead>
            <tr>
              <th>분야</th>
              <th>주요 내용</th>
              <th>예시</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>💰 생활안정</td>
              <td>기초생활급여, 연금, 수당</td>
              <td>기초연금, 아동수당, 부모급여</td>
            </tr>
            <tr>
              <td>🏠 주거</td>
              <td>주거비 지원, 임대주택</td>
              <td>주거급여, 청년월세지원, 공공임대</td>
            </tr>
            <tr>
              <td>📚 교육</td>
              <td>장학금, 보육료, 교육비</td>
              <td>국가장학금, 영유아 보육료</td>
            </tr>
            <tr>
              <td>💼 고용</td>
              <td>취업지원, 직업훈련, 일자리</td>
              <td>국민취업지원, 실업급여</td>
            </tr>
            <tr>
              <td>🏥 건강</td>
              <td>의료비 지원, 건강검진</td>
              <td>의료급여, 장애인 활동지원</td>
            </tr>
            <tr>
              <td>🎭 문화</td>
              <td>문화·여가 바우처</td>
              <td>문화누리카드</td>
            </tr>
          </tbody>
        </table>

        <h3>복지서비스 신청 방법</h3>
        <p>대부분의 복지서비스는 아래 방법으로 신청할 수 있습니다.</p>
        <ul>
          <li><strong>주민센터 방문</strong>: 가장 확실한 방법. 신분증 지참</li>
          <li><strong>복지로 온라인</strong>: bokjiro.go.kr에서 24시간 신청</li>
          <li><strong>정부24</strong>: gov.kr에서 일부 서비스 신청 가능</li>
          <li><strong>129 전화</strong>: 정부민원안내 콜센터</li>
        </ul>

        <h2>자주 묻는 질문</h2>

        <h4>Q. 여러 복지를 동시에 받을 수 있나요?</h4>
        <p>
          서비스 성격에 따라 다릅니다. 예를 들어 기초연금과 아동수당은 동시에 받을 수 있지만,
          생계급여와 일부 지원금은 중복 수급이 제한될 수 있습니다.
          정확한 확인은 주민센터나 복지로 상담을 이용해 보세요.
        </p>

        <h4>Q. 소득 기준은 어떻게 확인하나요?</h4>
        <p>
          대부분의 복지서비스는 기준 중위소득을 기준으로 자격을 판단합니다.
          본인 가구의 소득인정액은 주민센터에서 확인할 수 있고,
          대략적인 수준은 중위소득 계산기로도 체크 가능합니다.
        </p>

        <h4>Q. 지역마다 받을 수 있는 복지가 다른가요?</h4>
        <p>
          이 도구에서 보여주는 서비스는 중앙부처(전국) 복지입니다.
          이 외에도 각 시·도, 시·군·구에서 운영하는 지역 복지서비스가 별도로 있습니다.
          지역 복지는 해당 지자체 홈페이지나 복지로에서 확인할 수 있어요.
        </p>

        <h4>Q. 신청 후 얼마나 걸리나요?</h4>
        <p>
          서비스에 따라 다르지만, 보통 신청 후 30일 이내에 결과가 나옵니다.
          긴급복지지원의 경우 즉시 지원이 가능한 경우도 있습니다.
        </p>
      </div>

      <RelatedArticles toolSlug="regional-welfare-map" />
    </div>
  );
}
