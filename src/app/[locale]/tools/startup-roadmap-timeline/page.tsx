import type { Metadata } from "next";
import StartupRoadmapTimeline from "@/components/tools/timeline/StartupRoadmapTimeline";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "창업 로드맵 타임라인 - 사업자등록부터 영업까지 체크리스트 2026",
  description:
    "업종과 영업 개시일을 입력하면 사업계획 수립부터 세금 신고까지 단계별 창업 로드맵을 자동 생성합니다. 캘린더에 추가하고 진행 상황을 체크하세요.",
  keywords: [
    "창업 로드맵",
    "창업 체크리스트",
    "사업자등록 절차",
    "음식점 창업 절차",
    "온라인 쇼핑몰 창업",
    "창업 준비 타임라인",
  ],
  openGraph: {
    title: "창업 로드맵 타임라인 2026",
    description: "업종별 맞춤 창업 절차를 타임라인으로 확인하세요.",
    url: `${siteUrl}/ko/tools/startup-roadmap-timeline`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function StartupRoadmapTimelinePage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko" ? "창업 로드맵 타임라인" : "Startup Roadmap Timeline"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "업종과 영업 개시 예정일을 입력하면 단계별 준비 사항을 날짜와 함께 안내합니다."
            : "Enter your business type and start date to get a step-by-step timeline."}
        </p>
      </div>
      <StartupRoadmapTimeline />
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>창업 절차 핵심 요약</h2>
        <table>
          <thead>
            <tr><th>단계</th><th>시기</th><th>주요 할 일</th></tr>
          </thead>
          <tbody>
            <tr><td>사업 계획</td><td>D-90</td><td>시장조사, 자금 계획, 사업계획서</td></tr>
            <tr><td>사업장 확보</td><td>D-75</td><td>입지 선정, 임대 계약</td></tr>
            <tr><td>사업자등록</td><td>D-60</td><td>세무서/홈택스 신청</td></tr>
            <tr><td>인허가</td><td>D-50</td><td>영업신고, 위생교육 등</td></tr>
            <tr><td>설비/인테리어</td><td>D-35</td><td>공사, 설비 설치</td></tr>
            <tr><td>직원 채용</td><td>D-14</td><td>4대보험 신고, 근로계약서</td></tr>
            <tr><td>영업 개시</td><td>D-day</td><td>오픈 마케팅, 판매 시작</td></tr>
          </tbody>
        </table>

        <h2>업종별 필수 인허가</h2>
        <table>
          <thead>
            <tr><th>업종</th><th>필수 인허가</th><th>신청처</th></tr>
          </thead>
          <tbody>
            <tr><td>음식점</td><td>영업신고 + 위생교육</td><td>관할 구청</td></tr>
            <tr><td>카페</td><td>휴게음식점 영업신고</td><td>관할 구청</td></tr>
            <tr><td>온라인쇼핑몰</td><td>통신판매업 신고</td><td>관할 구청</td></tr>
            <tr><td>제조업</td><td>공장등록 + 업종별 허가</td><td>구청/시청</td></tr>
            <tr><td>프리랜서</td><td>별도 인허가 없음</td><td>-</td></tr>
          </tbody>
        </table>

        <h2>자주 묻는 질문</h2>
        <h3>Q. 사업자등록은 언제 해야 하나요?</h3>
        <p>
          사업 개시일로부터 <strong>20일 이내</strong>에 사업자등록을 해야 합니다.
          다만 사업장 임대 계약 후 인테리어 전에 미리 등록하는 것이 일반적입니다.
          매입세금계산서를 받으려면 사업자등록이 먼저 되어야 합니다.
        </p>
        <h3>Q. 개인사업자와 법인 중 어떤 것이 좋나요?</h3>
        <p>
          초기에는 개인사업자가 간편합니다. 연 매출이 일정 규모 이상이면 법인 전환이 세금상 유리할 수 있습니다.
          개인사업자 vs 법인 세금 비교 도구로 확인해보세요.
        </p>
        <h3>Q. 소상공인 정책자금은 어떻게 신청하나요?</h3>
        <p>
          소상공인시장진흥공단 홈페이지에서 신청할 수 있습니다.
          창업 1년 이내 사업자는 우대 금리를 적용받을 수 있으며,
          연 2~3% 수준의 저금리 대출이 가능합니다.
        </p>
      </div>
    </div>
  );
}
