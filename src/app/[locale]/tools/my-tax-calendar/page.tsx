import type { Metadata } from "next";
import TaxCalendar from "@/components/tools/timeline/TaxCalendar";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "나의 세금 캘린더 2026 - 직업별 신고/납부 일정 총정리",
  description: "직장인, 자영업자, 프리랜서, 법인 대표 등 직업별 세금 신고·납부 일정을 캘린더로 정리합니다. .ics 파일로 구글/애플 캘린더에 추가하세요.",
  keywords: ["세금 캘린더", "세금 납부 일정", "종합소득세 기한", "부가세 신고", "연말정산 일정", "법인세 기한"],
  openGraph: { title: "나의 세금 캘린더 2026", description: "직업별 세금 신고·납부 일정을 캘린더로 확인하고 다운로드하세요.", url: `${siteUrl}/ko/tools/my-tax-calendar`, type: "website" },
};

export function generateStaticParams() { return [{ locale: "ko" }, { locale: "en" }]; }
interface PageProps { params: Promise<{ locale: string }> }

export default async function TaxCalendarPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{locale === "ko" ? "나의 세금 캘린더 2026" : "My Tax Calendar 2026"}</h1>
        <p className="text-gray-600">{locale === "ko" ? "직업 유형을 선택하면 1년간 세금 신고·납부 일정을 정리해 드립니다." : "Select your job type to get a full year of tax deadlines."}</p>
      </div>
      <TaxCalendar />
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>직업별 주요 세금 일정 요약</h2>
        <table>
          <thead><tr><th>직업</th><th>주요 신고</th><th>시기</th></tr></thead>
          <tbody>
            <tr><td>직장인</td><td>연말정산</td><td>1~2월</td></tr>
            <tr><td>자영업자 (일반)</td><td>부가세 4회 + 종소세</td><td>1,4,7,10월 / 5월</td></tr>
            <tr><td>자영업자 (간이)</td><td>부가세 2회 + 종소세</td><td>1,7월 / 5월</td></tr>
            <tr><td>프리랜서</td><td>종합소득세</td><td>5월</td></tr>
            <tr><td>법인 대표</td><td>법인세 + 부가세</td><td>3월 / 1,4,7,10월</td></tr>
            <tr><td>부동산 임대</td><td>종합소득세 + 재산세</td><td>5월 / 7,9월</td></tr>
          </tbody>
        </table>
        <h2>세금 기한을 놓치면?</h2>
        <p>신고 기한을 넘기면 <strong>무신고 가산세(20%)</strong>와 <strong>납부불성실 가산세(일 0.022%)</strong>가 부과됩니다. 1개월만 늦어도 수십만원의 추가 부담이 생길 수 있으니, 캘린더에 미리 등록해두는 것이 중요합니다.</p>
        <h2>자주 묻는 질문</h2>
        <h3>Q. 직장인인데 종합소득세도 신고해야 하나요?</h3>
        <p>근로소득만 있다면 연말정산으로 끝납니다. 하지만 <strong>부업, 투잡, 임대소득, 금융소득(2천만원 초과)</strong> 등이 있으면 5월에 종합소득세 신고를 별도로 해야 합니다.</p>
        <h3>Q. 간이과세자와 일반과세자의 차이는?</h3>
        <p>연매출 8천만원 미만이면 간이과세자로, 부가세 신고가 연 2회(1월, 7월)로 줄어들고 세율도 낮습니다. 8천만원 이상이면 일반과세자로 연 4회 신고합니다.</p>
      </div>
    </div>
  );
}
