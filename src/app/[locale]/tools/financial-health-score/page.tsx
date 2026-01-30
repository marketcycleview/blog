import type { Metadata } from "next";
import FinancialHealthScore from "@/components/tools/quiz/FinancialHealthScore";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "나의 재무 건강 점수 - 무료 재무 진단 테스트",
  description:
    "저축, 부채, 보험, 투자, 비상자금 5개 영역을 진단하고 100점 만점으로 재무 건강 상태를 알려드립니다. 약한 영역별 개선 제안과 관련 정보도 함께 제공합니다.",
  keywords: [
    "재무 건강 점수",
    "재무 진단",
    "재무 상태 체크",
    "재무 건강 테스트",
    "돈 관리 진단",
    "재테크 진단",
    "금융 건강 점수",
  ],
  openGraph: {
    title: "나의 재무 건강 점수 - 무료 진단 테스트",
    description: "15개 질문으로 나의 재무 건강 상태를 100점 만점으로 진단해보세요.",
    url: `${siteUrl}/ko/tools/financial-health-score`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function FinancialHealthScorePage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko" ? "나의 재무 건강 점수" : "My Financial Health Score"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "15개 질문으로 나의 재무 상태를 진단하고, 개선 방법을 알아보세요."
            : "Diagnose your financial health with 15 questions and get improvement tips."}
        </p>
      </div>

      <FinancialHealthScore />

      <div className="mt-16 prose prose-gray max-w-none">
        <h2>재무 건강이란?</h2>
        <p>
          재무 건강(Financial Health)이란 단순히 돈이 많은 것이 아니라,
          <strong>소득을 잘 관리하고 미래에 대비하는 균형 잡힌 상태</strong>를
          의미합니다. 높은 연봉을 받아도 저축 없이 모두 쓰면 재무 건강이 나쁘고,
          적은 소득이라도 체계적으로 관리하면 건강한 재무 상태를 유지할 수 있습니다.
        </p>

        <h2>5가지 재무 건강 영역</h2>
        <table>
          <thead>
            <tr>
              <th>영역</th>
              <th>핵심 지표</th>
              <th>목표</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>저축</td>
              <td>저축률, 자동이체 여부</td>
              <td>소득의 20% 이상 저축</td>
            </tr>
            <tr>
              <td>부채 관리</td>
              <td>부채 비율, 고금리 부채</td>
              <td>상환 비율 20% 이하</td>
            </tr>
            <tr>
              <td>보험</td>
              <td>실손보험, 4대보험, 보험비율</td>
              <td>소득의 5~10%</td>
            </tr>
            <tr>
              <td>투자</td>
              <td>투자 경험, 연금저축, 분산</td>
              <td>연금저축+IRP 한도 납입</td>
            </tr>
            <tr>
              <td>비상자금</td>
              <td>보유 개월, 접근성</td>
              <td>생활비 3~6개월</td>
            </tr>
          </tbody>
        </table>

        <h2>연령대별 재무 건강 기준</h2>
        <table>
          <thead>
            <tr>
              <th>나이</th>
              <th>최우선 과제</th>
              <th>핵심 조언</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>20대</td>
              <td>저축 습관 + 비상자금</td>
              <td>소액이라도 자동이체로 저축 시작. 신용점수 관리 시작.</td>
            </tr>
            <tr>
              <td>30대</td>
              <td>투자 시작 + 보험 정비</td>
              <td>연금저축/IRP 가입. 결혼·주택 자금 계획. 실손보험 필수.</td>
            </tr>
            <tr>
              <td>40대</td>
              <td>부채 정리 + 투자 확대</td>
              <td>고금리 부채 상환 완료. 은퇴 준비 본격화. 자녀 교육비 대비.</td>
            </tr>
            <tr>
              <td>50대 이상</td>
              <td>은퇴 준비 + 건강 대비</td>
              <td>연금 수령 계획 수립. 의료비 대비. 자산 인출 전략.</td>
            </tr>
          </tbody>
        </table>

        <h2>자주 묻는 질문</h2>
        <h3>Q. 재무 건강 점수가 낮으면 어디서부터 시작해야 하나요?</h3>
        <p>
          가장 먼저 <strong>비상자금</strong>부터 마련하세요. 월급의 일부를
          별도 통장에 자동이체하여 최소 생활비 3개월치를 모으는 것이 첫 번째입니다.
          그 다음 고금리 부채 정리 → 보험 점검 → 저축률 높이기 → 투자 시작
          순서로 진행하세요.
        </p>
        <h3>Q. 저축률 20%가 현실적인가요?</h3>
        <p>
          처음부터 20%는 어려울 수 있습니다. 5%부터 시작해서 매달 1%씩
          올리면 됩니다. 핵심은 <strong>자동이체</strong>입니다. 급여일에
          자동으로 빠져나가도록 설정하면 자연스럽게 저축 습관이 만들어집니다.
        </p>
        <h3>Q. 투자를 전혀 안 하는데 괜찮나요?</h3>
        <p>
          물가 상승률(연 3~4%)을 고려하면, 예금만으로는 자산이 실질적으로
          줄어듭니다. 위험이 부담된다면 <strong>연금저축 펀드</strong>나
          <strong>적립식 ETF</strong>부터 소액으로 시작해보세요.
          세액공제 혜택도 받을 수 있습니다.
        </p>
        <h3>Q. 보험을 너무 많이 들었는데 어떻게 해야 하나요?</h3>
        <p>
          보험료가 소득의 10%를 넘으면 과다합니다. 실손보험은 유지하되,
          중복되는 보장이나 불필요한 특약은 정리하세요. 보험 리모델링
          서비스를 활용하면 전문가가 무료로 분석해줍니다.
        </p>
      </div>
    </div>
  );
}
