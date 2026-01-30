import type { Metadata } from "next";
import PostResignationTimeline from "@/components/tools/timeline/PostResignationTimeline";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "퇴사 후 할 일 타임라인 - 퇴직 체크리스트 2026",
  description:
    "퇴사 후 해야 할 일을 날짜별로 정리해 드립니다. 건강보험 전환, 국민연금 처리, 실업급여 신청, 퇴직금 정산까지 퇴사일 기준 타임라인과 캘린더 다운로드를 제공합니다.",
  keywords: [
    "퇴사 후 해야할 일",
    "퇴사 후 절차",
    "퇴사 체크리스트",
    "퇴직 후 할 일",
    "퇴사 건강보험",
    "퇴사 국민연금",
    "퇴사 실업급여",
    "퇴직 후 4대보험",
  ],
  openGraph: {
    title: "퇴사 후 할 일 타임라인 - 날짜별 체크리스트",
    description: "퇴사일을 입력하면 해야 할 일을 날짜별로 정리하고 캘린더에 추가할 수 있습니다.",
    url: `${siteUrl}/ko/tools/post-resignation-timeline`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function PostResignationTimelinePage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko" ? "퇴사 후 할 일 타임라인" : "Post-Resignation Timeline"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "퇴사일을 입력하면 해야 할 일을 날짜별로 정리하고, 캘린더에 추가할 수 있습니다."
            : "Enter your resignation date to get a timeline of things to do, with calendar export."}
        </p>
      </div>

      <PostResignationTimeline />

      <div className="mt-16 prose prose-gray max-w-none">
        <h2>퇴사 전 반드시 확인할 것</h2>
        <p>
          퇴사를 결정했다면, 서두르지 말고 아래 사항부터 체크하세요.
          특히 <strong>퇴직금, 미사용 연차수당, 4대보험 처리</strong>는
          퇴사 전에 확인하지 않으면 나중에 받기 어려울 수 있습니다.
        </p>
        <table>
          <thead>
            <tr>
              <th>항목</th>
              <th>확인 사항</th>
              <th>시기</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>퇴직금</td>
              <td>1년 이상 근속 시 지급, 14일 이내 정산</td>
              <td>퇴사 전</td>
            </tr>
            <tr>
              <td>미사용 연차</td>
              <td>남은 연차 × 1일 통상임금</td>
              <td>퇴사 전</td>
            </tr>
            <tr>
              <td>경력증명서</td>
              <td>재직 중 발급 요청 (퇴사 후 지연 가능)</td>
              <td>퇴사 전</td>
            </tr>
            <tr>
              <td>원천징수영수증</td>
              <td>연말정산/종소세 신고용</td>
              <td>퇴사 시</td>
            </tr>
            <tr>
              <td>이직확인서</td>
              <td>실업급여 신청 시 필요</td>
              <td>퇴사 후</td>
            </tr>
          </tbody>
        </table>

        <h2>퇴사 후 4대보험 처리 방법</h2>
        <h3>건강보험</h3>
        <p>
          퇴사하면 직장 건강보험 자격이 상실됩니다. 두 가지 선택지가 있습니다.
        </p>
        <ul>
          <li><strong>임의계속가입</strong>: 퇴직 후 36개월간 직장 보험료 수준을 유지. 대부분 이게 더 저렴합니다.</li>
          <li><strong>지역가입자 전환</strong>: 재산·소득 기준으로 보험료 산정. 재산이 많으면 보험료가 올라갈 수 있습니다.</li>
        </ul>

        <h3>국민연금</h3>
        <p>
          소득이 없는 기간에는 <strong>납부예외</strong> 신청이 가능합니다.
          단, 납부하지 않은 기간은 연금 수령액에 반영되지 않으므로,
          여유가 있다면 <strong>임의가입</strong>으로 계속 납부하는 것도 방법입니다.
        </p>

        <h2>실업급여 수급 조건</h2>
        <table>
          <thead>
            <tr>
              <th>조건</th>
              <th>내용</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>고용보험 가입기간</td>
              <td>퇴직 전 18개월 중 180일 이상</td>
            </tr>
            <tr>
              <td>퇴사 사유</td>
              <td>비자발적 (권고사직, 해고, 계약만료 등)</td>
            </tr>
            <tr>
              <td>구직 의사</td>
              <td>적극적 구직활동 필요</td>
            </tr>
            <tr>
              <td>수급액</td>
              <td>퇴직 전 평균임금의 60% (상한 66,000원/일)</td>
            </tr>
          </tbody>
        </table>

        <h2>자주 묻는 질문</h2>
        <h3>Q. 자발적 퇴사도 실업급여를 받을 수 있나요?</h3>
        <p>
          정당한 사유가 있으면 가능합니다. 임금체불, 직장 내 괴롭힘,
          통근 불가(이사), 건강 문제 등이 인정됩니다.
          고용센터에서 퇴사 사유를 심사합니다.
        </p>
        <h3>Q. 퇴직금은 언제 받나요?</h3>
        <p>
          근로기준법상 퇴사일로부터 <strong>14일 이내</strong>에 지급해야 합니다.
          지급하지 않으면 지연이자(연 20%)가 발생하며, 노동청에 진정할 수 있습니다.
        </p>
        <h3>Q. 퇴사 후 건강보험 공백이 생기면?</h3>
        <p>
          건강보험 자격이 없는 기간에도 병원 진료는 가능하지만,
          전액 본인 부담입니다. 가능한 빨리 임의계속가입 또는
          지역가입자 전환을 하세요.
        </p>
        <h3>Q. 퇴사 후 연말정산은 어떻게 하나요?</h3>
        <p>
          연중 퇴사 후 재취업하지 않았다면, 다음 해 5월 종합소득세 신고 기간에
          직접 신고합니다. 이때 과도하게 원천징수된 세금을 환급받을 수 있습니다.
        </p>
      </div>
    </div>
  );
}
