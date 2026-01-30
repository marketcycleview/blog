import type { Metadata } from "next";
import BirthParentingTimeline from "@/components/tools/timeline/BirthParentingTimeline";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "출산/육아 혜택 타임라인 - 임신부터 초등학교까지 총정리 2026",
  description:
    "출산 예정일을 입력하면 임신부터 초등 입학까지 받을 수 있는 혜택을 날짜별로 정리합니다. 첫만남이용권, 부모급여, 아동수당, 육아휴직 등 총 수령액도 계산합니다.",
  keywords: ["출산 혜택", "육아 지원금", "부모급여", "아동수당", "첫만남이용권", "육아휴직", "출산 지원금 총정리"],
  openGraph: {
    title: "출산/육아 혜택 타임라인 2026",
    description: "임신부터 초등학교까지 받을 수 있는 모든 혜택을 날짜별로 정리합니다.",
    url: `${siteUrl}/ko/tools/birth-parenting-timeline`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps { params: Promise<{ locale: string }> }

export default async function BirthParentingTimelinePage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko" ? "출산/육아 혜택 타임라인" : "Birth & Parenting Benefits Timeline"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "출산 예정일을 입력하면 혜택을 날짜별로 정리하고, 캘린더에 추가할 수 있습니다."
            : "Enter your due date to get a timeline of benefits with calendar export."}
        </p>
      </div>
      <BirthParentingTimeline />
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>2026년 출산/육아 지원금 한눈에 보기</h2>
        <table>
          <thead><tr><th>혜택</th><th>금액</th><th>대상</th><th>신청 시기</th></tr></thead>
          <tbody>
            <tr><td>임신출산 진료비</td><td>100만원 (다태 140만원)</td><td>임산부</td><td>임신 확인 후</td></tr>
            <tr><td>첫만남이용권</td><td>200만원 (셋째 300만원)</td><td>출생아</td><td>출생신고 시</td></tr>
            <tr><td>부모급여 (0세)</td><td>월 100만원</td><td>만 0세</td><td>출생 후</td></tr>
            <tr><td>부모급여 (1세)</td><td>월 50만원</td><td>만 1세</td><td>자동 전환</td></tr>
            <tr><td>아동수당</td><td>월 10만원</td><td>만 8세 미만</td><td>출생 후</td></tr>
            <tr><td>출산휴가 급여</td><td>통상임금 100%</td><td>고용보험 가입자</td><td>출산 후</td></tr>
            <tr><td>육아휴직 급여</td><td>첫 3개월 100%</td><td>만 8세↓ 자녀</td><td>출산휴가 후</td></tr>
          </tbody>
        </table>
        <h2>맞벌이 부부를 위한 3+3 부모육아휴직제</h2>
        <p>부부가 같은 자녀에 대해 순차적으로 육아휴직을 사용하면, <strong>첫 3개월간 통상임금 100%(상한 300만원)</strong>을 지급받습니다. 맞벌이 가정이라면 반드시 활용하세요.</p>
        <h2>자주 묻는 질문</h2>
        <h3>Q. 부모급여와 어린이집 보육료를 동시에 받을 수 있나요?</h3>
        <p>동시 수급은 불가합니다. 어린이집 이용 시 보육료 바우처가 지급되고, 부모급여와의 차액을 현금으로 받습니다. 가정양육 시에는 부모급여 전액을 받습니다.</p>
        <h3>Q. 지자체 출산장려금은 별도인가요?</h3>
        <p>네, 중앙정부 지원금과 별도로 지자체에서 추가 지급합니다. 지역에 따라 첫째 50~100만원, 둘째 100~300만원, 셋째 500만원 이상인 곳도 있습니다.</p>
        <h3>Q. 전업주부도 육아휴직 급여를 받나요?</h3>
        <p>육아휴직 급여는 <strong>고용보험 가입자</strong>만 받을 수 있습니다. 전업주부는 부모급여, 아동수당, 양육수당 등을 신청하세요.</p>
      </div>
    </div>
  );
}
