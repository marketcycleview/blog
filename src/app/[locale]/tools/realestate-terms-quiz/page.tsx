import type { Metadata } from "next";
import RealEstateTermsQuiz from "@/components/tools/quiz/RealEstateTermsQuiz";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "부동산 용어 퀴즈 - 전세·청약·등기 상식 테스트 2026",
  description:
    "20문제로 부동산 상식을 테스트합니다. 기본 용어, 계약, 청약, 세금 영역별 분석.",
  keywords: [
    "부동산 용어 퀴즈",
    "부동산 상식 테스트",
    "전세 상식",
    "청약 용어",
  ],
  openGraph: {
    title: "부동산 용어 퀴즈 2026",
    description:
      "20문제로 부동산 상식을 테스트하고 영역별 약점을 파악하세요.",
    url: `${siteUrl}/ko/tools/realestate-terms-quiz`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function RealEstateTermsQuizPage({
  params,
}: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko"
            ? "부동산 용어 퀴즈"
            : "Real Estate Terms Quiz"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "20문제로 부동산 기본 용어, 계약, 청약, 세금 상식을 테스트해보세요."
            : "Test your real estate knowledge with 20 questions."}
        </p>
      </div>

      <RealEstateTermsQuiz />

      <div className="mt-16 prose prose-gray max-w-none">
        <h2>부동산 필수 용어 정리</h2>
        <p>
          부동산 거래에서는 전문 용어를 정확히 이해하지 못하면 계약서를
          제대로 읽을 수 없고, 심각한 재산 피해로 이어질 수 있습니다.
          아래 표에서 반드시 알아야 할 핵심 용어를 정리했습니다.
        </p>
        <table>
          <thead>
            <tr>
              <th>용어</th>
              <th>의미</th>
              <th>알아야 하는 이유</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>전세권</td>
              <td>등기부에 등록된 전세 보증금에 대한 권리</td>
              <td>경매 시 우선변제 가능, 확정일자와 별도</td>
            </tr>
            <tr>
              <td>근저당권</td>
              <td>채권 최고액 범위 내 담보 설정</td>
              <td>채권최고액이 실대출의 120~130%로 설정됨</td>
            </tr>
            <tr>
              <td>대항력</td>
              <td>제3자에게 임차권을 주장할 수 있는 힘</td>
              <td>전입신고 + 점유(거주) 시 다음날 발생</td>
            </tr>
            <tr>
              <td>확정일자</td>
              <td>계약서에 공적 날짜 도장을 받는 것</td>
              <td>우선변제권 확보 요건 (대항력 + 확정일자)</td>
            </tr>
            <tr>
              <td>LTV</td>
              <td>주택 담보 대출 비율 (Loan to Value)</td>
              <td>주택 가격 대비 대출 한도 결정</td>
            </tr>
            <tr>
              <td>DSR</td>
              <td>총부채 원리금 상환 비율</td>
              <td>연소득 대비 대출 상환액 비율, 40% 규제</td>
            </tr>
            <tr>
              <td>공시가격</td>
              <td>정부가 발표하는 부동산 가격</td>
              <td>재산세, 종부세, 건보료 산정 기준</td>
            </tr>
            <tr>
              <td>전용면적</td>
              <td>실제 거주 공간 면적</td>
              <td>공급면적과 구분, 실거주 공간 크기 판단</td>
            </tr>
          </tbody>
        </table>

        <h2>부동산 계약 시 주의사항</h2>
        <p>
          부동산 계약은 금액이 크고 한번 체결하면 되돌리기 어렵습니다.
          특히 전세 계약 시에는 최근 급증한 전세사기 피해를 예방하기 위해
          아래 사항을 반드시 확인해야 합니다.
        </p>
        <table>
          <thead>
            <tr>
              <th>계약 단계</th>
              <th>확인 사항</th>
              <th>주의 포인트</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>계약 전</td>
              <td>등기부등본 열람</td>
              <td>갑구 가압류·을구 근저당 확인, 계약 당일 재발급</td>
            </tr>
            <tr>
              <td>계약 전</td>
              <td>시세 확인</td>
              <td>KB시세, 국토부 실거래가로 적정 보증금 판단</td>
            </tr>
            <tr>
              <td>계약 시</td>
              <td>임대인 본인 확인</td>
              <td>신분증과 등기부 소유자 동일 여부</td>
            </tr>
            <tr>
              <td>계약 시</td>
              <td>특약 사항 기재</td>
              <td>전세보증보험 가입 동의, 전입신고 협조 등</td>
            </tr>
            <tr>
              <td>계약 후</td>
              <td>전입신고 + 확정일자</td>
              <td>잔금일 당일 즉시 처리</td>
            </tr>
            <tr>
              <td>계약 후</td>
              <td>전세보증보험 가입</td>
              <td>HUG, SGI, HF 중 선택</td>
            </tr>
          </tbody>
        </table>

        <h2>청약 관련 핵심 용어</h2>
        <p>
          청약은 주택을 분양받기 위한 신청 절차입니다. 가점제와 추첨제의
          차이, 특별공급 유형, 당첨자 발표 및 계약 절차 등을 이해해야
          유리한 전략을 세울 수 있습니다.
        </p>
        <ul>
          <li>
            <strong>가점제:</strong> 무주택기간(32점), 부양가족수(35점),
            청약통장 가입기간(17점) 합산 84점 만점으로 당첨자 결정. 가점이
            높을수록 유리하며 투기과열지구 85㎡ 이하는 가점제 100% 적용.
          </li>
          <li>
            <strong>추첨제:</strong> 가점 상관없이 무작위 추첨. 85㎡
            초과 주택이나 비규제 지역에서 주로 적용. 1주택자도 신청 가능한
            경우가 많아 &quot;로또 청약&quot;이라 불림.
          </li>
          <li>
            <strong>특별공급:</strong> 신혼부부, 생애최초, 다자녀, 노부모
            부양, 기관추천 등 일정 요건 충족 시 별도 물량으로 신청.
            경쟁률이 일반공급보다 낮은 경우가 많음.
          </li>
          <li>
            <strong>사전청약:</strong> 본청약(입주 2~3년 전)보다 먼저
            신청하는 제도. 당첨 시 분양가 확정은 본청약 때 이루어짐.
          </li>
        </ul>

        <h2>자주 묻는 질문</h2>

        <h3>Q. 부동산 용어를 어디서 체계적으로 공부할 수 있나요?</h3>
        <p>
          국토교통부의 &quot;부동산 거래 매뉴얼&quot;과 한국부동산원의
          &quot;부동산 용어사전&quot;이 공식 자료로 가장 정확합니다.
          실전적인 내용은 대한법률구조공단의 &quot;전세 계약 가이드&quot;도
          도움이 됩니다. 부동산 초보라면 국토교통부 실거래가 공개시스템에서
          실제 거래 사례를 살펴보는 것부터 시작하세요.
        </p>

        <h3>Q. 전세와 월세 중 어떤 것이 유리한가요?</h3>
        <p>
          일반적으로 금리가 낮을 때는 전세가, 금리가 높을 때는 월세가
          유리합니다. 전세보증금 3억원의 기회비용(연 4% 기준 연 1,200만원,
          월 100만원)과 월세를 비교해보세요. 전세사기 리스크까지 고려하면
          보증보험 가입이 가능한 안전한 전세와 월세(+투자)를 비교 분석하는
          것이 현명합니다.
        </p>

        <h3>Q. 퀴즈에서 어떤 점수가 나오면 부동산 거래를 해도 되나요?</h3>
        <p>
          점수와 관계없이 실제 거래 시에는 반드시 전문가(공인중개사, 법무사)의
          도움을 받으세요. 다만 70점(A등급) 이상이면 기본적인 위험 요소를
          스스로 판단할 수 있는 수준입니다. 50점 미만이라면 계약 전에
          부동산 기초 용어부터 꼭 학습하시기 바랍니다.
        </p>
      </div>
    </div>
  );
}
