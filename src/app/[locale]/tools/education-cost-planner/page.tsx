import type { Metadata } from "next";
import EducationCostPlanner from "@/components/calculators/EducationCostPlanner";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "자녀 교육비 계산기 - 유치원~대학 교육비 플래너 2026",
  description:
    "자녀 교육비 총액을 유치원부터 대학교까지 단계별로 계산합니다. 공립·사립 선택, 사교육비, 물가상승률 반영. 월 저축 필요액까지 한눈에 확인하세요.",
  keywords: [
    "자녀 교육비 계산기",
    "교육비 플래너",
    "대학 등록금 계산",
    "교육비 얼마",
    "사교육비 계산",
    "교육비 저축 계획",
    "자녀 교육 자금",
  ],
  openGraph: {
    title: "자녀 교육비 계산기 2026",
    description:
      "유치원~대학교 교육비 총액과 월 저축 필요액을 계산하세요.",
    url: `${siteUrl}/ko/tools/education-cost-planner`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function EducationCostPlannerPage({
  params,
}: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko"
            ? "자녀 교육비 계산기"
            : "Education Cost Planner"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "유치원부터 대학교까지, 자녀 교육에 필요한 총비용과 월 저축액을 계산합니다."
            : "Calculate total education costs from kindergarten to university and your monthly savings plan."}
        </p>
      </div>

      <EducationCostPlanner />

      <div className="mt-16 prose prose-gray max-w-none">
        <h2>자녀 교육비, 총 얼마나 들까?</h2>
        <p>
          한국교육개발원과 통계청 자료를 종합하면, 자녀 1명을 유치원부터
          대학교까지 교육시키는 데 <strong>최소 1억원에서 최대 4억원 이상</strong>이
          소요됩니다. 공립 위주로 진학하더라도 사교육비를 포함하면 2억원을
          넘기는 경우가 대부분입니다.
        </p>
        <p>
          특히 교육비는 일반 물가보다 빠르게 오르는 경향이 있어, 현재 기준이
          아닌 미래 물가를 반영한 계획이 필수적입니다. 연 3%의 교육비
          물가상승률을 적용하면 10년 후 교육비는 지금보다 약 34% 높아집니다.
        </p>

        <table>
          <thead>
            <tr>
              <th>교육 단계</th>
              <th>기간</th>
              <th>공립 (연간)</th>
              <th>사립 (연간)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>유치원</td>
              <td>3년</td>
              <td>70만원</td>
              <td>400만원</td>
            </tr>
            <tr>
              <td>초등학교</td>
              <td>6년</td>
              <td>100만원</td>
              <td>1,000만원</td>
            </tr>
            <tr>
              <td>중학교</td>
              <td>3년</td>
              <td>150만원</td>
              <td>1,200만원</td>
            </tr>
            <tr>
              <td>고등학교</td>
              <td>3년</td>
              <td>200만원</td>
              <td>1,500만원</td>
            </tr>
            <tr>
              <td>대학교 (국립)</td>
              <td>4년</td>
              <td colSpan={2}>450만원/년</td>
            </tr>
            <tr>
              <td>대학교 (사립 인문)</td>
              <td>4년</td>
              <td colSpan={2}>700만원/년</td>
            </tr>
            <tr>
              <td>대학교 (사립 이공)</td>
              <td>4년</td>
              <td colSpan={2}>900만원/년</td>
            </tr>
            <tr>
              <td>대학교 (사립 예체능)</td>
              <td>4년</td>
              <td colSpan={2}>1,000만원/년</td>
            </tr>
          </tbody>
        </table>
        <p>
          * 2026년 기준 평균 비용이며, 급식비/교재비/교복비 등 부대비용은
          제외한 금액입니다.
        </p>

        <h2>교육비 마련 전략</h2>
        <p>
          교육비는 단기간에 마련하기 어렵기 때문에 장기적인 저축·투자 계획이
          중요합니다. 아이가 태어나자마자 시작하면 22년이라는 긴 시간을 활용할
          수 있습니다.
        </p>
        <ul>
          <li>
            <strong>아이 명의 적금/CMA:</strong> 출생 직후부터 매월 일정액을
            자동이체하면 복리 효과를 극대화할 수 있습니다. 연 4% 수익률로
            월 30만원씩 18년간 저축하면 약 9,400만원이 됩니다.
          </li>
          <li>
            <strong>교육보험:</strong> 교육 단계별로 학자금을 지급하는
            보험상품입니다. 납입 면제 특약을 추가하면 부모 사망 시에도 학자금이
            보장됩니다. 다만 수익률이 낮은 편이므로 보장 기능 위주로
            검토하세요.
          </li>
          <li>
            <strong>어린이 펀드/ETF:</strong> 장기 투자가 가능하다면
            주식형 펀드나 ETF를 활용하는 것도 방법입니다. 10년 이상
            투자 기간이 있다면 연 6~8%의 기대수익률을 노려볼 수 있습니다.
          </li>
          <li>
            <strong>정부 지원금 활용:</strong> 아동수당(월 10만원),
            영아수당(월 100만원, 만 0세), 양육수당 등 정부 지원금을
            교육비 저축에 그대로 활용하면 목돈 마련에 도움이 됩니다.
          </li>
          <li>
            <strong>학자금 대출 대비:</strong> 대학 교육비까지 모두 저축으로
            마련하기 어렵다면, 한국장학재단의 학자금대출(연 1.7~2.2%)을
            활용할 수 있습니다. 사전에 조건을 확인해두면 좋습니다.
          </li>
        </ul>

        <table>
          <thead>
            <tr>
              <th>저축 방법</th>
              <th>장점</th>
              <th>단점</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>정기적금</td>
              <td>원금 보장, 안정적</td>
              <td>낮은 수익률 (2~4%)</td>
            </tr>
            <tr>
              <td>교육보험</td>
              <td>보장 기능, 단계별 지급</td>
              <td>중도 해지 시 손실</td>
            </tr>
            <tr>
              <td>펀드/ETF</td>
              <td>높은 기대수익률</td>
              <td>원금 손실 위험</td>
            </tr>
            <tr>
              <td>CMA</td>
              <td>유동성 높음</td>
              <td>수익률 변동</td>
            </tr>
          </tbody>
        </table>

        <h2>자주 묻는 질문 (FAQ)</h2>

        <h3>Q. 공립 vs 사립, 교육비 차이가 실제로 이렇게 큰가요?</h3>
        <p>
          공립학교는 수업료가 무상이거나 매우 저렴하지만, 사립학교는
          시설 투자비, 특별 프로그램 비용 등이 포함되어 공립의 5~10배에
          달하는 경우가 있습니다. 초등학교의 경우 공립 연 100만원
          대비 사립은 연 1,000만원으로 약 10배 차이가 납니다. 다만
          사교육비를 줄이는 효과가 있다면 실질 차이는 줄어들 수 있습니다.
        </p>

        <h3>Q. 사교육비 월 50만원은 적정한 수준인가요?</h3>
        <p>
          통계청 사교육비 조사(2025년)에 따르면 초·중·고 학생 1인당
          월 평균 사교육비는 약 43만원입니다. 고등학생은 월 56만원,
          서울 지역은 월 62만원까지 올라갑니다. 가정 상황에 맞게
          조정하되, 학년이 올라갈수록 증가하는 점을 감안하세요.
        </p>

        <h3>Q. 물가상승률 3%가 적절한 설정인가요?</h3>
        <p>
          교육비 물가상승률은 일반 물가상승률(약 2%)보다 높은 편입니다.
          최근 10년간 대학 등록금은 동결 기조이지만, 사교육비와
          생활비 관련 교육비는 꾸준히 올랐습니다. 보수적으로 계획하려면
          3~4%를 적용하는 것이 합리적입니다.
        </p>

        <h3>Q. 대학교 등록금은 계속 동결될까요?</h3>
        <p>
          한국의 대학 등록금은 2012년 이후 정부 정책에 따라 사실상
          동결되어 왔습니다. 그러나 물가와 인건비 상승으로 대학의
          등록금 인상 요구가 커지고 있어, 향후 완화될 가능성이 있습니다.
          국립대는 연 450만원, 사립대는 700~1,000만원 수준을 기준으로
          계획하되 여유 자금을 확보해두는 것이 안전합니다.
        </p>

        <h3>Q. 자녀가 여러 명이면 교육비가 단순히 배수로 늘어나나요?</h3>
        <p>
          기본적으로 자녀 수에 비례하지만, 몇 가지 절감 요인이 있습니다.
          교재나 학용품의 물려쓰기, 형제 할인을 제공하는 학원, 다자녀
          가구 정부 지원(다자녀 학자금 우대 등)을 활용하면 실제
          비용은 단순 배수보다 낮을 수 있습니다. 이 계산기에서는
          보수적으로 동일 비용을 적용합니다.
        </p>
      </div>
    </div>
  );
}
