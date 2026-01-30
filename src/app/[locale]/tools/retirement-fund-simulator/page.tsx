import type { Metadata } from "next";
import RetirementFundSimulator from "@/components/calculators/RetirementFundSimulator";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "은퇴자금 시뮬레이터 - 노후 준비 계산기 2026",
  description:
    "현재 자산과 저축 계획으로 은퇴 후 자금이 충분한지 시뮬레이션합니다. 물가상승률, 국민연금 반영. 자산 소진 시점과 추가 저축 필요액을 확인하세요.",
  keywords: [
    "은퇴자금 계산기",
    "노후 준비",
    "은퇴 시뮬레이션",
    "은퇴 자금 부족",
    "노후 대비 얼마",
    "은퇴 자산 추이",
  ],
  openGraph: {
    title: "은퇴자금 시뮬레이터 2026",
    description: "은퇴 후 자금이 충분한지 시뮬레이션합니다.",
    url: `${siteUrl}/ko/tools/retirement-fund-simulator`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function RetirementFundSimulatorPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko" ? "은퇴자금 시뮬레이터" : "Retirement Fund Simulator"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "현재 자산과 저축 계획을 입력하면 은퇴 후 자금이 충분한지 시뮬레이션합니다."
            : "Simulate whether your retirement savings will be sufficient."}
        </p>
      </div>
      <RetirementFundSimulator />
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>은퇴자금, 얼마나 필요할까?</h2>
        <p>
          2026년 국민연금연구원 조사에 따르면 부부 기준 <strong>월 평균 277만원</strong>,
          개인 기준 <strong>월 177만원</strong>의 노후 생활비가 필요합니다.
          국민연금만으로는 부족하므로 개인 저축·투자가 필수입니다.
        </p>
        <table>
          <thead>
            <tr><th>항목</th><th>부부 기준</th><th>개인 기준</th></tr>
          </thead>
          <tbody>
            <tr><td>최소 생활비</td><td>월 198만원</td><td>월 124만원</td></tr>
            <tr><td>적정 생활비</td><td>월 277만원</td><td>월 177만원</td></tr>
            <tr><td>여유 생활비</td><td>월 350만원+</td><td>월 230만원+</td></tr>
          </tbody>
        </table>

        <h2>은퇴자금 3층 구조</h2>
        <p>안정적인 노후를 위해 <strong>국민연금(1층) + 퇴직연금(2층) + 개인연금(3층)</strong>의
          3층 구조가 필요합니다.</p>
        <table>
          <thead>
            <tr><th>구분</th><th>종류</th><th>특징</th></tr>
          </thead>
          <tbody>
            <tr><td>1층: 공적연금</td><td>국민연금</td><td>물가연동, 종신 지급</td></tr>
            <tr><td>2층: 퇴직연금</td><td>DB/DC/IRP</td><td>퇴직 시 일시금 또는 연금</td></tr>
            <tr><td>3층: 개인연금</td><td>연금저축, IRP</td><td>세액공제 + 복리 운용</td></tr>
          </tbody>
        </table>

        <h2>자주 묻는 질문</h2>
        <h3>Q. 은퇴자금 10억이면 충분한가요?</h3>
        <p>
          월 생활비 250만원 기준, 국민연금 100만원을 받는다면 추가로 월 150만원이 필요합니다.
          10억원을 연 3% 수익으로 운용하면 월 250만원 인출 시 약 <strong>40년 이상</strong> 유지 가능합니다.
          다만 물가상승률을 고려하면 실질 구매력은 줄어들므로 시뮬레이터로 정확히 계산해보세요.
        </p>
        <h3>Q. 40대에 시작해도 늦지 않나요?</h3>
        <p>
          40세에 시작해도 은퇴까지 20년 이상 남아 있습니다. 복리 효과를 활용하면
          월 50만원 저축(연 5% 수익률)으로 약 2억원을 모을 수 있습니다.
          시작이 늦을수록 월 저축액을 높이는 것이 핵심입니다.
        </p>
        <h3>Q. 국민연금은 어디서 확인하나요?</h3>
        <p>
          국민연금공단 홈페이지(nps.or.kr)의 &quot;내연금 알아보기&quot; 서비스에서
          예상 수령액을 확인할 수 있습니다. 가입 기간과 소득에 따라 달라집니다.
        </p>
      </div>
    </div>
  );
}
