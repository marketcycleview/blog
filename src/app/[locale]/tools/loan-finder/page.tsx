import type { Metadata } from "next";
import LoanFinder from "@/components/tools/decision-tree/LoanFinder";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "나에게 맞는 대출 찾기 - 맞춤 대출 추천 2026",
  description:
    "직업, 소득, 목적, 신용등급에 맞는 대출 상품을 추천합니다. 정부 정책대출(디딤돌, 버팀목)부터 시중은행 대출까지, 7개 질문으로 최적의 대출을 찾아보세요.",
  keywords: [
    "대출 추천",
    "나에게 맞는 대출",
    "대출 비교",
    "대출 찾기",
    "정책대출 추천",
    "디딤돌대출",
    "버팀목대출",
    "신용대출 비교",
  ],
  openGraph: {
    title: "나에게 맞는 대출 찾기 - 7개 질문으로 맞춤 추천",
    description: "직업, 소득, 신용등급에 맞는 대출 상품을 비교 추천합니다.",
    url: `${siteUrl}/ko/tools/loan-finder`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LoanFinderPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko" ? "나에게 맞는 대출 찾기" : "Find the Right Loan for You"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "7개 질문에 답하면 조건에 맞는 대출 상품을 추천해 드립니다."
            : "Answer 7 questions to get personalized loan recommendations."}
        </p>
      </div>

      <LoanFinder />

      <div className="mt-16 prose prose-gray max-w-none">
        <h2>대출 전 반드시 확인할 것</h2>
        <p>
          대출은 빌리는 것보다 <strong>갚을 수 있는지</strong>가 더 중요합니다.
          대출을 받기 전에 아래 사항을 반드시 확인하세요.
        </p>
        <ul>
          <li><strong>DSR(총부채원리금상환비율)</strong>: 연소득 대비 모든 대출의 연간 원리금 상환 비율. 40%를 넘기지 않는 것이 안전합니다.</li>
          <li><strong>금리 유형</strong>: 고정금리(안정적)와 변동금리(초기 저렴, 상승 위험) 중 선택.</li>
          <li><strong>중도상환수수료</strong>: 만기 전 상환 시 수수료가 붙는지 확인.</li>
          <li><strong>금리 비교</strong>: 최소 3곳 이상 금융기관에서 견적을 비교하세요.</li>
        </ul>

        <h2>2026년 주요 정책대출 비교</h2>
        <table>
          <thead>
            <tr>
              <th>상품</th>
              <th>대상</th>
              <th>금리</th>
              <th>한도</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>디딤돌대출</td>
              <td>무주택, 연소득 6천만원↓</td>
              <td>2.15~3.0%</td>
              <td>2.5억</td>
            </tr>
            <tr>
              <td>보금자리론</td>
              <td>9억↓ 주택 구입</td>
              <td>3.5~4.5% (고정)</td>
              <td>3.6억</td>
            </tr>
            <tr>
              <td>버팀목 전세</td>
              <td>무주택, 연소득 5천만원↓</td>
              <td>1.8~2.4%</td>
              <td>1.2억 (수도권)</td>
            </tr>
            <tr>
              <td>청년전용 전세</td>
              <td>만19~34세, 연소득 5천만원↓</td>
              <td>1.5~2.1%</td>
              <td>1.2억 (수도권)</td>
            </tr>
            <tr>
              <td>소상공인 정책자금</td>
              <td>소상공인</td>
              <td>2.0~3.5%</td>
              <td>1억</td>
            </tr>
          </tbody>
        </table>

        <h2>대출 금리 낮추는 방법</h2>
        <ol>
          <li><strong>신용점수 관리</strong>: 연체 없이 꾸준히 관리하면 점수가 올라갑니다.</li>
          <li><strong>주거래 은행 활용</strong>: 급여 이체, 카드 사용 등 실적을 쌓으면 우대금리 적용.</li>
          <li><strong>대환대출</strong>: 기존 고금리 대출을 저금리로 갈아타기.</li>
          <li><strong>정책대출 우선</strong>: 시중은행보다 정부 정책대출이 항상 금리가 낮습니다.</li>
          <li><strong>비대면 대출</strong>: 인터넷은행은 지점 운영비가 없어 금리가 낮은 경우가 많습니다.</li>
        </ol>

        <h2>자주 묻는 질문</h2>
        <h3>Q. 정책대출과 시중은행 대출 중 어떤 게 나은가요?</h3>
        <p>
          자격이 된다면 <strong>정책대출이 항상 유리</strong>합니다.
          디딤돌대출(2%대), 버팀목대출(1%대)은 시중은행(4~5%대)보다
          금리가 훨씬 낮습니다. 다만 소득 요건 등 자격 조건이 있으므로
          먼저 확인하세요.
        </p>
        <h3>Q. 대출 여러 건을 받아도 되나요?</h3>
        <p>
          가능하지만 DSR 규제로 인해 총 상환 부담이 연소득의 40%를
          넘기기 어렵습니다. 기존 대출이 있으면 추가 대출 한도가 줄어듭니다.
        </p>
        <h3>Q. 신용점수가 낮으면 대출이 불가능한가요?</h3>
        <p>
          불가능하지 않지만 금리가 높아집니다. 저신용자를 위한
          <strong>중금리 대출</strong>(카카오뱅크, 토스뱅크 등)이나
          정부 지원 <strong>햇살론</strong> 등을 알아보세요.
        </p>
        <h3>Q. 대출 상담은 어디서 받나요?</h3>
        <p>
          은행 창구 방문이 가장 정확합니다. 정책대출은 한국주택금융공사(1688-8114),
          주택도시기금(1566-9009)에 전화 상담도 가능합니다.
          최근에는 대부분 비대면(앱/웹)으로 조회와 신청이 가능합니다.
        </p>
      </div>
    </div>
  );
}
