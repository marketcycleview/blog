import type { Metadata } from "next";
import HousingSubscriptionGuide from "@/components/tools/decision-tree/HousingSubscriptionGuide";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "나에게 맞는 청약 전략 - 특별공급·일반공급 추천 2026",
  description:
    "나이, 혼인 상태, 소득, 청약통장 가입기간 등을 입력하면 맞춤형 청약 전략을 추천합니다. 특별공급, 가점제, 추첨제 중 어떤 것이 유리한지 확인하세요.",
  keywords: [
    "청약 전략",
    "청약 추천",
    "특별공급 자격",
    "청약 가점 계산",
    "신혼부부 특별공급",
    "생애최초 특별공급",
  ],
  openGraph: {
    title: "나에게 맞는 청약 전략 2026",
    description: "7개 질문으로 나에게 맞는 청약 전략을 찾아보세요.",
    url: `${siteUrl}/ko/tools/housing-subscription-guide`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HousingSubscriptionGuidePage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko" ? "나에게 맞는 청약 전략" : "Housing Subscription Guide"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "7가지 질문에 답하면 나에게 맞는 청약 전략과 예상 가점을 알려드립니다."
            : "Answer 7 questions to find the best housing subscription strategy for you."}
        </p>
      </div>
      <HousingSubscriptionGuide />
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>2026년 청약 가점 배점표</h2>
        <table>
          <thead>
            <tr><th>항목</th><th>만점</th><th>기준</th></tr>
          </thead>
          <tbody>
            <tr><td>무주택기간</td><td>32점</td><td>1년 2점 ~ 15년 이상 32점</td></tr>
            <tr><td>부양가족수</td><td>35점</td><td>0명 5점 ~ 6명 이상 35점</td></tr>
            <tr><td>청약통장 가입기간</td><td>17점</td><td>6개월 1점 ~ 15년 이상 17점</td></tr>
          </tbody>
        </table>

        <h2>특별공급 종류와 자격</h2>
        <table>
          <thead>
            <tr><th>유형</th><th>대상</th><th>소득 기준</th></tr>
          </thead>
          <tbody>
            <tr><td>신혼부부</td><td>혼인 7년 이내</td><td>도시근로자 130% 이하</td></tr>
            <tr><td>생애최초</td><td>생애 첫 주택</td><td>도시근로자 130% 이하</td></tr>
            <tr><td>다자녀</td><td>미성년 3자녀+</td><td>일부 소득 기준</td></tr>
            <tr><td>노부모 부양</td><td>65세+ 직계존속 부양</td><td>없음</td></tr>
          </tbody>
        </table>

        <h2>자주 묻는 질문</h2>
        <h3>Q. 청약통장은 어떤 것으로 가입해야 하나요?</h3>
        <p>
          2024년부터 <strong>청약통합저축</strong>으로 일원화되었습니다.
          기존 청약예금·부금도 전환 가능합니다. 월 최소 2만원부터 50만원까지 납입 가능합니다.
        </p>
        <h3>Q. 1주택자는 청약이 불가능한가요?</h3>
        <p>
          1주택자도 일반공급(추첨제) 신청은 가능하지만, <strong>대부분의 특별공급과 가점제에서 불리</strong>합니다.
          처분 후 무주택 기간을 확보하는 것이 장기적으로 유리할 수 있습니다.
        </p>
        <h3>Q. 세대원도 청약 신청할 수 있나요?</h3>
        <p>
          세대원도 청약 신청이 가능하지만, <strong>노부모 부양 특별공급은 세대주만</strong> 가능합니다.
          일반공급은 세대원도 신청할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
