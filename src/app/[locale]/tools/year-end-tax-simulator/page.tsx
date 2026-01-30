import type { Metadata } from "next";
import YearEndTaxSimulator from "@/components/calculators/YearEndTaxSimulator";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "연말정산 계산기 2026 - 환급액 시뮬레이터 (소득공제·세액공제)",
  description:
    "2026년 연말정산 환급액을 미리 계산하세요. 소득공제(신용카드, 청약, 4대보험)와 세액공제(연금저축, IRP, 의료비, 월세)를 입력하면 예상 환급액과 추가 절세 팁을 알려드립니다.",
  keywords: [
    "연말정산 계산기",
    "연말정산 환급액",
    "연말정산 시뮬레이터",
    "연말정산 소득공제",
    "연말정산 세액공제",
    "2026 연말정산",
    "연금저축 세액공제",
    "월세 세액공제",
  ],
  openGraph: {
    title: "연말정산 계산기 2026 - 환급액 시뮬레이터",
    description: "소득공제·세액공제 항목을 입력하면 예상 환급액을 바로 확인할 수 있습니다.",
    url: `${siteUrl}/ko/tools/year-end-tax-simulator`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function YearEndTaxSimulatorPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko" ? "연말정산 계산기 2026" : "Year-End Tax Calculator 2026"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "공제 항목을 입력하면 예상 환급액과 추가 절세 방법을 알려드립니다."
            : "Enter your deductions to calculate your expected tax refund."}
        </p>
      </div>

      <YearEndTaxSimulator />

      <div className="mt-16 prose prose-gray max-w-none">
        <h2>2026년 연말정산 핵심 변경사항</h2>
        <p>
          2026년 연말정산에서 가장 중요한 변경사항은 <strong>연금저축 세액공제 한도 확대</strong>입니다.
          연금저축 납입 한도가 연 600만원, IRP 포함 시 900만원까지 세액공제를 받을 수 있습니다.
          총급여 5,500만원 이하인 경우 15%, 초과인 경우 12% 공제율이 적용됩니다.
        </p>

        <h2>소득공제 vs 세액공제 차이</h2>
        <table>
          <thead>
            <tr>
              <th>구분</th>
              <th>소득공제</th>
              <th>세액공제</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>방식</td>
              <td>과세표준을 줄여줌</td>
              <td>산출세액에서 직접 차감</td>
            </tr>
            <tr>
              <td>효과</td>
              <td>세율에 따라 다름</td>
              <td>고정 비율만큼 절세</td>
            </tr>
            <tr>
              <td>고소득자</td>
              <td>유리 (높은 세율 적용)</td>
              <td>동일 효과</td>
            </tr>
            <tr>
              <td>예시</td>
              <td>신용카드, 국민연금, 청약</td>
              <td>연금저축, 의료비, 월세</td>
            </tr>
          </tbody>
        </table>

        <h2>놓치기 쉬운 공제 항목 TOP 5</h2>
        <ol>
          <li>
            <strong>월세 세액공제</strong>: 총급여 7천만원 이하 무주택 세대주라면 월세의 최대 17%를 돌려받습니다.
          </li>
          <li>
            <strong>체크카드 전환</strong>: 총급여 25% 이상 사용분부터 공제 시작. 신용카드(15%)보다 체크카드(30%)가 공제율 2배입니다.
          </li>
          <li>
            <strong>IRP 추가 납입</strong>: 연금저축만 하고 있다면 IRP 추가 개설로 합산 900만원까지 공제 가능합니다.
          </li>
          <li>
            <strong>안경·콘택트렌즈</strong>: 의료비 세액공제에 안경 구입비(1인당 50만원 한도)도 포함됩니다.
          </li>
          <li>
            <strong>대중교통 사용</strong>: 대중교통 비용은 40% 높은 공제율이 적용되므로 따로 집계하면 유리합니다.
          </li>
        </ol>

        <h2>연말정산 일정 (2026년 귀속)</h2>
        <table>
          <thead>
            <tr>
              <th>기간</th>
              <th>내용</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2027년 1월 15일</td>
              <td>간소화 서비스 오픈</td>
            </tr>
            <tr>
              <td>1월 15일~2월 15일</td>
              <td>공제 증명자료 확인·수정</td>
            </tr>
            <tr>
              <td>2월 28일까지</td>
              <td>회사에 공제 서류 제출</td>
            </tr>
            <tr>
              <td>3월</td>
              <td>환급금 지급 (회사 급여일)</td>
            </tr>
          </tbody>
        </table>

        <h2>자주 묻는 질문</h2>
        <h3>Q. 연말정산에서 돈을 더 돌려받으려면?</h3>
        <p>
          가장 효과적인 방법은 <strong>연금저축 + IRP</strong>에 합산 900만원을 납입하는 것입니다.
          최대 148.5만원(총급여 5,500만원 이하 기준)을 돌려받을 수 있습니다.
          그 다음으로 체크카드 사용 비중을 높이고, 해당되면 월세 세액공제를 꼭 챙기세요.
        </p>
        <h3>Q. 13월의 월급은 누가 받나요?</h3>
        <p>
          소비를 많이 해서 환급받는 게 아니라, <strong>세액공제 항목을 잘 활용</strong>해야 합니다.
          연금저축, IRP, 월세, 기부금 등은 실질적인 절세 효과가 큰 항목입니다.
        </p>
        <h3>Q. 맞벌이 부부는 어떻게 하나요?</h3>
        <p>
          의료비는 소득이 낮은 쪽에, 신용카드 공제는 소득이 높은 쪽에 몰아주는 것이
          유리합니다. 자녀 공제는 세율이 높은 배우자가 받는 게 좋습니다.
        </p>
        <h3>Q. 프리랜서도 연말정산 하나요?</h3>
        <p>
          프리랜서(사업소득)는 연말정산이 아닌 <strong>5월 종합소득세 신고</strong>를 합니다.
          다만 직장에서 근로소득이 있으면서 프리랜서 수입이 있다면,
          근로소득은 연말정산 후 나머지를 종합소득세로 신고해야 합니다.
        </p>
      </div>
    </div>
  );
}
