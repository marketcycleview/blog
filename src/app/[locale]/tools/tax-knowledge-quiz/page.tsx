import type { Metadata } from "next";
import TaxKnowledgeQuiz from "@/components/tools/quiz/TaxKnowledgeQuiz";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "세금 상식 퀴즈 - 소득세·부가세·양도세 상식 테스트 2026",
  description:
    "20문제로 세금 상식 수준을 테스트합니다. 소득세, 연말정산, 부가세, 양도세, 절세 영역별 분석.",
  keywords: [
    "세금 상식 퀴즈",
    "세금 테스트",
    "연말정산 퀴즈",
    "세금 기본 상식",
  ],
  openGraph: {
    title: "세금 상식 퀴즈 2026",
    description:
      "20문제로 당신의 세금 상식을 테스트해보세요. 영역별 분석 제공.",
    url: `${siteUrl}/ko/tools/tax-knowledge-quiz`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function TaxKnowledgeQuizPage({
  params,
}: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko"
            ? "세금 상식 퀴즈"
            : "Tax Knowledge Quiz"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "20문제로 소득세, 부가세, 양도세 등 세금 상식을 테스트하고 부족한 영역을 확인하세요."
            : "Test your tax knowledge with 20 questions across income tax, VAT, and more."}
        </p>
      </div>

      <TaxKnowledgeQuiz />

      <div className="mt-16 prose prose-gray max-w-none">
        <h2>직장인이 알아야 할 세금</h2>
        <p>
          직장인이라도 세금을 모르면 매년 수십만원에서 수백만원을 손해볼 수
          있습니다. 연말정산에서 공제 항목 하나를 놓치면 돌려받을 수 있는
          세금을 고스란히 납부하게 됩니다. 아래 표에서 직장인에게 직접적으로
          관련되는 주요 세금을 확인해보세요.
        </p>
        <table>
          <thead>
            <tr>
              <th>세금 종류</th>
              <th>납부 시기</th>
              <th>직장인 관련 포인트</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>근로소득세</td>
              <td>매월 원천징수</td>
              <td>간이세액표 기준, 연말정산으로 정산</td>
            </tr>
            <tr>
              <td>주민세</td>
              <td>근로소득세의 10%</td>
              <td>소득세와 함께 자동 원천징수</td>
            </tr>
            <tr>
              <td>종합소득세</td>
              <td>매년 5월</td>
              <td>부업 소득(유튜브, 블로그 등) 연 300만원 초과 시 신고</td>
            </tr>
            <tr>
              <td>양도소득세</td>
              <td>양도일 2개월 이내</td>
              <td>주택·주식 매도 시 차익에 과세</td>
            </tr>
            <tr>
              <td>증여세</td>
              <td>증여일 3개월 이내</td>
              <td>부모 증여 성인 5,000만원 초과 시 과세</td>
            </tr>
            <tr>
              <td>종합부동산세</td>
              <td>매년 12월</td>
              <td>공시가격 합산 12억원(1세대 1주택) 초과 시</td>
            </tr>
          </tbody>
        </table>

        <h2>자주 틀리는 세금 상식 TOP 5</h2>
        <p>
          세금에 대한 오해는 직접적인 금전 손실로 이어집니다. 아래 다섯
          가지는 많은 사람이 잘못 알고 있는 대표적인 세금 상식입니다.
        </p>
        <table>
          <thead>
            <tr>
              <th>순위</th>
              <th>흔한 오해</th>
              <th>정확한 사실</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                &quot;소득공제로 세금이 그만큼 줄어든다&quot;
              </td>
              <td>
                소득공제는 과세표준을 줄이는 것이지 세금 자체를 줄이는 것이
                아닙니다. 세율을 곱한 금액만큼 절세됩니다.
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>&quot;1주택자는 양도세가 없다&quot;</td>
              <td>
                1세대 1주택이라도 매매가 12억원 초과분에는 양도세가
                부과됩니다. 2년 이상 보유·거주 요건도 충족해야 합니다.
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>&quot;부모님께 돈을 받으면 무조건 증여세&quot;</td>
              <td>
                성인 자녀는 10년간 5,000만원까지 비과세입니다. 생활비,
                교육비, 의료비는 증여에 해당하지 않습니다.
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>
                &quot;체크카드가 신용카드보다 무조건 유리&quot;
              </td>
              <td>
                체크카드 공제율(30%)이 신용카드(15%)보다 높지만, 최저
                사용금액(총급여 25%)까지는 신용카드를 쓰고 초과분부터
                체크카드를 쓰는 전략이 유리합니다.
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>&quot;사업자 등록하면 세금을 더 많이 낸다&quot;</td>
              <td>
                사업자 등록 후 적격증빙으로 경비를 인정받으면 오히려
                세금이 줄어듭니다. 미등록 시 가산세(매출의 1%)가 부과됩니다.
              </td>
            </tr>
          </tbody>
        </table>

        <h2>연말정산 절세 핵심 전략</h2>
        <p>
          연말정산은 &quot;13월의 월급&quot;이라 불릴 만큼 잘 활용하면 큰
          환급을 받을 수 있습니다. 핵심은 세액공제 항목을 빠짐없이 챙기는
          것입니다.
        </p>
        <ul>
          <li>
            <strong>연금저축·IRP:</strong> 연간 납입액의 최대 900만원까지
            세액공제(13.2~16.5%). 총급여 5,500만원 이하면 16.5%, 초과면
            13.2%.
          </li>
          <li>
            <strong>월세 세액공제:</strong> 총급여 8,000만원 이하 무주택
            세대주는 월세의 15~17% 세액공제. 연 최대 750만원 한도.
          </li>
          <li>
            <strong>기부금:</strong> 정치자금 기부금은 10만원까지 전액
            세액공제(100%), 법정기부금은 소득의 100% 한도.
          </li>
          <li>
            <strong>의료비:</strong> 총급여 3% 초과분부터 15% 세액공제.
            난임 시술비는 30% 공제.
          </li>
        </ul>

        <h2>자주 묻는 질문</h2>

        <h3>Q. 세금 퀴즈에서 낮은 점수가 나왔는데, 어디서 공부하나요?</h3>
        <p>
          국세청 홈택스의 &quot;세금 모의계산&quot; 서비스와 국세청
          유튜브 채널에서 기초적인 세금 상식을 무료로 학습할 수 있습니다.
          연말정산 시즌(1~2월)에는 국세청에서 매년 &quot;연말정산
          간소화 서비스 이용 가이드&quot;를 배포하므로 이를 활용하면
          실무적인 절세 방법을 익힐 수 있습니다.
        </p>

        <h3>Q. 프리랜서도 연말정산을 하나요?</h3>
        <p>
          프리랜서(3.3% 원천징수 대상)는 연말정산 대신 매년 5월 종합소득세
          신고를 합니다. 직장과 프리랜서 소득이 모두 있는 경우, 직장에서
          연말정산 후 5월에 프리랜서 소득을 합산하여 종합소득세를
          추가 신고해야 합니다.
        </p>

        <h3>Q. 세금을 잘못 신고하면 어떤 불이익이 있나요?</h3>
        <p>
          과소 신고 시 납부할 세액의 10%(부당 과소 신고는 40%)의 가산세가
          부과되고, 납부 지연 시에는 미납세액에 대해 하루 0.022%의 납부
          지연 가산세가 추가됩니다. 의도적 탈세가 아닌 단순 실수라면
          수정신고를 통해 가산세를 감면(1개월 이내 90%, 3개월 이내 75% 등)
          받을 수 있습니다.
        </p>
      </div>
    </div>
  );
}
