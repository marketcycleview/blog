import RelatedArticles from "@/components/tools/RelatedArticles";
import type { Metadata } from "next";
import { BudgetPlanner } from "@/components/budget";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "재무설계 계산기 - 월 지출 분석 및 예산 관리",
  description:
    "월 수입과 지출을 기초생활비, 여유비, 사치비로 분류하고 저축 가능액을 계산해보세요. 같은 항목도 상황에 따라 자유롭게 분류할 수 있는 스마트한 예산 관리 도구입니다.",
  keywords: [
    "재무설계",
    "예산 관리",
    "지출 분석",
    "가계부",
    "월 지출",
    "저축",
    "소비 패턴",
    "기초생활비",
    "여유비",
    "사치비",
    "재테크",
    "돈 관리",
  ],
  openGraph: {
    title: "재무설계 계산기 - 월 지출 분석",
    description:
      "월 지출을 3가지 카테고리로 나누고 내 소비 패턴을 파악해보세요.",
    url: `${siteUrl}/ko/tools/budget-planner`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function BudgetPlannerPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-4xl mx-auto">
      {/* 페이지 헤더 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko" ? "재무설계 계산기" : "Budget Planner"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "월 지출을 기초생활비 / 여유비 / 사치비로 나누고 저축 가능액을 계산해보세요."
            : "Divide your monthly expenses into essential, flexible, and luxury categories."}
        </p>
      </div>

      {/* 예산 계획 도구 */}
      <BudgetPlanner />

      {/* SEO 콘텐츠 */}
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>재무설계 계산기란?</h2>
        <p>
          월 수입과 지출을 입력하면 자동으로 카테고리별 비율을 분석하고,
          저축 가능액과 저축률을 계산해주는 도구입니다. 일반적인 가계부와 달리
          같은 항목(예: 외식)도 상황에 따라 &quot;기초생활비&quot;가 될 수도 있고
          &quot;사치비&quot;가 될 수도 있어요. 자유롭게 분류해서 진짜 내 소비 패턴을
          파악해보세요.
        </p>

        <h2>3가지 카테고리 설명</h2>

        <h3>🔵 기초생활비 (권장 50-60%)</h3>
        <p>
          꼭 필요한 고정 지출입니다. 월세, 관리비, 공과금, 대중교통비, 기본 식비,
          보험료, 통신비 등이 해당됩니다. 이 비율이 너무 높다면 고정비 절감을
          고려해보세요.
        </p>

        <h3>🟢 여유비 (권장 20-30%)</h3>
        <p>
          생활의 질을 위한 선택적 지출입니다. 외식, 카페, 영화, 운동, 취미활동,
          의류 구매 등이 해당됩니다. 완전히 없앨 필요는 없지만 적절한 통제가
          필요해요.
        </p>

        <h3>🟠 사치비 (권장 0-10%)</h3>
        <p>
          꼭 필요하지 않은 과소비입니다. 명품, 해외여행, 고가 전자기기, 과도한
          유흥비 등이 해당됩니다. 가끔은 자신에게 보상을 주는 것도 중요하지만,
          비율이 높다면 조절이 필요합니다.
        </p>

        <h2>저축률 목표</h2>
        <ul>
          <li><strong>30% 이상:</strong> 훌륭합니다! 재무 건전성이 매우 좋아요.</li>
          <li><strong>20-30%:</strong> 좋습니다. 건강한 재무 상태입니다.</li>
          <li><strong>10-20%:</strong> 주의가 필요해요. 지출을 점검해보세요.</li>
          <li><strong>10% 미만:</strong> 위험 신호입니다. 지출 구조 개선이 필요해요.</li>
        </ul>

        <h2>자주 묻는 질문</h2>

        <h3>데이터는 어디에 저장되나요?</h3>
        <p>
          입력한 데이터는 브라우저의 로컬 스토리지에 저장됩니다. 서버로 전송되지
          않으며, 같은 브라우저에서 다시 접속하면 이전 데이터가 유지됩니다.
          브라우저 데이터를 삭제하면 함께 삭제됩니다.
        </p>

        <h3>같은 항목을 다른 카테고리에 넣을 수 있나요?</h3>
        <p>
          네, 가능합니다. 예를 들어 &quot;외식&quot;이라도 회사 근처 점심은
          기초생활비로, 특별한 날 고급 레스토랑 방문은 사치비로 분류할 수 있어요.
          카테고리 옆의 색상 버튼을 클릭하면 언제든 변경할 수 있습니다.
        </p>

        <h3>권장 비율을 꼭 지켜야 하나요?</h3>
        <p>
          권장 비율은 일반적인 가이드라인입니다. 개인의 상황(소득 수준, 거주 지역,
          가족 구성 등)에 따라 적정 비율은 달라질 수 있어요. 중요한 것은 자신의
          소비 패턴을 파악하고 의식적으로 관리하는 것입니다.
        </p>
      </div>

      <RelatedArticles toolSlug="budget-planner" />
    </div>
  );
}