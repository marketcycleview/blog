import type { Metadata } from "next";
import BusinessPlanGenerator from "@/components/tools/document-generator/BusinessPlanGenerator";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "사업계획서 템플릿 생성기 - 업종별 무료 사업계획서 작성 2026",
  description:
    "업종, 시장 분석, 재무 계획을 입력하면 사업계획서 골격을 자동 생성합니다. 복사 및 다운로드 가능.",
  keywords: [
    "사업계획서 양식",
    "사업계획서 작성법",
    "사업계획서 템플릿",
    "창업 사업계획서",
  ],
  openGraph: {
    title: "사업계획서 템플릿 생성기 2026",
    description:
      "업종별 맞춤 사업계획서를 자동으로 생성하세요. 복사 및 다운로드 가능.",
    url: `${siteUrl}/ko/tools/business-plan-generator`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function BusinessPlanGeneratorPage({
  params,
}: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko"
            ? "사업계획서 템플릿 생성기"
            : "Business Plan Generator"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "업종과 핵심 정보를 입력하면 사업계획서 골격을 자동으로 만들어드립니다."
            : "Enter your industry and key details to auto-generate a business plan outline."}
        </p>
      </div>

      <BusinessPlanGenerator />

      <div className="mt-16 prose prose-gray max-w-none">
        <h2>사업계획서란?</h2>
        <p>
          사업계획서는 창업 아이디어를 구체적인 실행 계획으로 옮긴 문서입니다.
          사업 목표, 시장 분석, 수익 모델, 재무 계획 등을 체계적으로 정리하여
          투자자나 금융기관, 정부 지원 사업 심사위원에게 사업의 가능성을
          설득하는 역할을 합니다. 잘 작성된 사업계획서는 창업자 본인의 사업
          방향을 명확히 하는 데에도 큰 도움이 됩니다.
        </p>

        <h2>좋은 사업계획서의 구성 요소</h2>
        <p>
          심사위원이나 투자자가 집중적으로 보는 항목을 빠짐없이 포함해야
          합니다. 아래 표는 사업계획서의 핵심 구성 항목과 각 항목에서 강조해야
          할 포인트입니다.
        </p>
        <table>
          <thead>
            <tr>
              <th>구성 항목</th>
              <th>포함 내용</th>
              <th>작성 포인트</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>사업 개요</td>
              <td>아이템, 비전, 핵심 가치</td>
              <td>한 문장으로 사업을 설명할 수 있어야 함</td>
            </tr>
            <tr>
              <td>시장 분석</td>
              <td>시장 규모, 트렌드, 타겟 고객</td>
              <td>구체적 수치(TAM/SAM/SOM) 제시</td>
            </tr>
            <tr>
              <td>경쟁 분석</td>
              <td>주요 경쟁사, 차별점</td>
              <td>경쟁사 대비 우위 요소 명확히</td>
            </tr>
            <tr>
              <td>수익 모델</td>
              <td>매출 구조, 가격 정책</td>
              <td>현실적인 매출 추정 근거 포함</td>
            </tr>
            <tr>
              <td>마케팅 전략</td>
              <td>고객 확보 채널, 프로모션</td>
              <td>초기 고객 확보 방안 구체적으로</td>
            </tr>
            <tr>
              <td>재무 계획</td>
              <td>초기 투자금, 월 고정비, BEP</td>
              <td>3년 추정 손익계산서 포함 권장</td>
            </tr>
            <tr>
              <td>팀 소개</td>
              <td>대표 경력, 핵심 인력</td>
              <td>사업 관련 경험 강조</td>
            </tr>
          </tbody>
        </table>

        <h2>정부 지원 사업 신청 시 사업계획서 작성 팁</h2>
        <p>
          정부 창업 지원 사업(예비창업패키지, 초기창업패키지 등)은 사업계획서
          심사가 선정의 핵심입니다. 평가 항목별 배점을 이해하고 맞춤형으로
          작성해야 합니다.
        </p>
        <table>
          <thead>
            <tr>
              <th>평가 항목</th>
              <th>배점(예시)</th>
              <th>작성 전략</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>문제 인식 및 동기</td>
              <td>20점</td>
              <td>고객의 구체적 불편(Pain Point)을 데이터로 증명</td>
            </tr>
            <tr>
              <td>해결 방안(아이템)</td>
              <td>30점</td>
              <td>기존 대안 대비 차별성, 기술적 실현 가능성</td>
            </tr>
            <tr>
              <td>시장성 및 성장성</td>
              <td>20점</td>
              <td>시장 규모 수치, 성장률 근거 자료 인용</td>
            </tr>
            <tr>
              <td>사업화 역량</td>
              <td>15점</td>
              <td>대표자 관련 경력, 팀 구성, 보유 자원</td>
            </tr>
            <tr>
              <td>자금 운용 계획</td>
              <td>15점</td>
              <td>항목별 세부 지출 근거, 자부담 비율</td>
            </tr>
          </tbody>
        </table>

        <h2>자주 묻는 질문</h2>

        <h3>Q. 사업계획서는 몇 페이지가 적당한가요?</h3>
        <p>
          정부 지원 사업은 보통 15~25페이지가 적정합니다. 투자 유치용은
          10~15페이지 분량의 IR 자료가 별도로 필요합니다. 핵심은 분량보다
          내용의 구체성과 논리적 흐름입니다. 심사위원은 수십 건을 검토하므로,
          요점을 명확히 전달하는 것이 중요합니다.
        </p>

        <h3>Q. 재무 계획에 매출 추정은 어떻게 하나요?</h3>
        <p>
          Bottom-up 방식을 권장합니다. &quot;월 고객 100명 x 객단가 3만원 =
          월 매출 300만원&quot;처럼 현실적인 가정에서 출발하세요. 업종별 평균
          객단가, 재방문율 등 공개 통계를 활용하면 설득력이 높아집니다.
          낙관적 시나리오와 보수적 시나리오를 함께 제시하면 더 좋습니다.
        </p>

        <h3>Q. 창업 경험이 없어도 사업계획서를 쓸 수 있나요?</h3>
        <p>
          물론 가능합니다. 직접 경험이 없다면 관련 업종의 실무 경험이나 교육
          이수 이력을 강조하세요. 사전 시장 조사(설문, 인터뷰), 시제품 제작,
          파일럿 테스트 등 준비 과정을 구체적으로 보여주면 경험 부족을 충분히
          보완할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
