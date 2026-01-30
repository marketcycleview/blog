import type { Metadata } from "next";
import CareerPathDiagnosis from "@/components/tools/decision-tree/CareerPathDiagnosis";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "창업 vs 프리랜서 vs 취업 진단 - 나에게 맞는 커리어 경로 2026",
  description:
    "성향, 리스크 감수도, 자본금 등 6가지 질문으로 나에게 맞는 커리어 경로를 추천합니다.",
  keywords: [
    "창업 vs 취업",
    "프리랜서 시작",
    "커리어 진단",
    "창업 적성 테스트",
  ],
  openGraph: {
    title: "창업 vs 프리랜서 vs 취업 진단 2026",
    description:
      "6가지 질문으로 나에게 맞는 커리어 경로를 찾아보세요.",
    url: `${siteUrl}/ko/tools/career-path-diagnosis`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function CareerPathDiagnosisPage({
  params,
}: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko"
            ? "나에게 맞는 커리어 경로 진단"
            : "Career Path Diagnosis"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "성향과 상황에 맞는 커리어 경로를 6가지 질문으로 진단합니다."
            : "Find your best career path with 6 simple questions."}
        </p>
      </div>

      <CareerPathDiagnosis />

      <div className="mt-16 prose prose-gray max-w-none">
        <h2>커리어 경로별 비교</h2>
        <p>
          취업, 프리랜서, 창업은 각각 장단점이 뚜렷합니다. 자신의 성향,
          재무 상황, 리스크 감수 능력에 따라 최적의 선택이 달라집니다.
          아래 표에서 핵심 항목별 차이를 한눈에 비교해보세요.
        </p>
        <table>
          <thead>
            <tr>
              <th>항목</th>
              <th>취업 (직장인)</th>
              <th>프리랜서</th>
              <th>창업</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>소득 안정성</td>
              <td>높음 (고정 월급)</td>
              <td>중간 (프로젝트별)</td>
              <td>낮음 (매출 의존)</td>
            </tr>
            <tr>
              <td>소득 상한</td>
              <td>제한적 (연봉 테이블)</td>
              <td>중간 (시간 한계)</td>
              <td>무제한 (확장 가능)</td>
            </tr>
            <tr>
              <td>초기 자본</td>
              <td>불필요</td>
              <td>소액 (장비 등)</td>
              <td>필요 (업종별 상이)</td>
            </tr>
            <tr>
              <td>시간 자유도</td>
              <td>낮음 (출퇴근)</td>
              <td>높음</td>
              <td>매우 낮음 (초기)</td>
            </tr>
            <tr>
              <td>4대보험</td>
              <td>회사와 분담</td>
              <td>전액 본인 부담</td>
              <td>대표자 지역가입</td>
            </tr>
            <tr>
              <td>세금 신고</td>
              <td>연말정산 (간편)</td>
              <td>종합소득세 (직접)</td>
              <td>법인세/종소세 (직접)</td>
            </tr>
            <tr>
              <td>퇴직금</td>
              <td>법적 보장</td>
              <td>없음</td>
              <td>없음</td>
            </tr>
          </tbody>
        </table>

        <h2>프리랜서 시작 시 준비사항</h2>
        <p>
          프리랜서로 전환하기 전에 최소 6개월치 생활비를 확보하는 것이
          안전합니다. 초기에는 수입이 불안정하므로, 직장을 다니면서 부업으로
          시작한 뒤 안정적 수입이 확인되면 전환하는 방법도 있습니다.
        </p>
        <table>
          <thead>
            <tr>
              <th>준비 항목</th>
              <th>세부 내용</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>사업자 등록</td>
              <td>면세/과세 선택, 홈택스에서 온라인 등록 가능</td>
            </tr>
            <tr>
              <td>건강보험 전환</td>
              <td>퇴사 후 지역가입으로 전환, 임의계속가입 검토</td>
            </tr>
            <tr>
              <td>국민연금</td>
              <td>지역가입자로 전환, 납부예외 신청 가능</td>
            </tr>
            <tr>
              <td>종합소득세</td>
              <td>매년 5월 신고, 경비 증빙 관리 필수</td>
            </tr>
            <tr>
              <td>계약서 관리</td>
              <td>용역 계약서 작성, 대금 지급 조건 명시</td>
            </tr>
            <tr>
              <td>비상 자금</td>
              <td>최소 6개월 생활비 확보</td>
            </tr>
          </tbody>
        </table>

        <h2>창업 전 반드시 확인할 3가지</h2>
        <p>
          창업은 취업이나 프리랜서에 비해 리스크가 높습니다. 통계청에 따르면
          신규 사업체의 약 60%가 5년 이내에 폐업합니다. 실패 확률을 줄이려면
          시장 검증, 자금 계획, 법적 준비를 철저히 해야 합니다.
        </p>
        <ul>
          <li>
            <strong>시장 검증:</strong> 아이디어 단계에서 실제 고객에게 검증
            (설문, MVP 테스트). &quot;내가 만들고 싶은 것&quot;이 아니라
            &quot;고객이 돈을 내고 살 것&quot;을 확인해야 합니다.
          </li>
          <li>
            <strong>자금 계획:</strong> 초기 투자금 + 최소 12개월 운영비 확보.
            정부 창업 지원금(예비창업패키지 최대 1억원, 초기창업패키지 최대
            1억원)을 적극 활용하세요.
          </li>
          <li>
            <strong>법적 준비:</strong> 개인사업자 vs 법인 설립 결정, 업종별
            인허가 확인, 사업자 등록 및 통신판매업 신고(온라인 사업 시).
          </li>
        </ul>

        <h2>자주 묻는 질문</h2>

        <h3>Q. 직장을 다니면서 부업으로 시작해도 되나요?</h3>
        <p>
          네, 가장 안전한 방법입니다. 다만 현재 회사의 겸업금지 조항을
          확인해야 합니다. 근로계약서나 취업규칙에 겸업금지 규정이 있으면
          회사의 사전 승인을 받아야 합니다. 공무원은 원칙적으로 겸업이
          금지되어 있으므로 주의가 필요합니다.
        </p>

        <h3>Q. 프리랜서와 자영업자의 차이는 뭔가요?</h3>
        <p>
          세법상 큰 차이는 없으며 둘 다 개인사업자로 종합소득세를 신고합니다.
          다만 프리랜서는 주로 인적 용역(개발, 디자인, 번역 등)을 제공하며
          3.3% 원천징수를 받는 경우가 많습니다. 자영업자는 사업장을 운영하며
          부가가치세 신고 의무가 있는 경우가 일반적입니다.
        </p>

        <h3>Q. 창업 실패하면 재취업이 어려운가요?</h3>
        <p>
          업종과 기간에 따라 다릅니다. 2~3년 이내의 창업 경험은 오히려
          기업에서 긍정적으로 평가하는 경우가 많습니다. 다만 경력 공백이
          길어지면 재취업이 어려워질 수 있으므로, 창업 중에도 업계 네트워크를
          유지하고 전문성을 기록으로 남겨두는 것이 중요합니다.
        </p>
      </div>
    </div>
  );
}
