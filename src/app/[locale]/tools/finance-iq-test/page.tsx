import type { Metadata } from "next";
import FinanceIQTest from "@/components/tools/quiz/FinanceIQTest";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "금융 IQ 테스트 - 나의 금융 지식 수준은? (20문제)",
  description: "저축, 투자, 보험, 세금, 부채 5개 영역 20문제로 금융 IQ를 측정합니다. 금융 문맹에서 전문가까지 등급과 영역별 분석을 확인하세요.",
  keywords: ["금융 IQ 테스트", "금융 지식 퀴즈", "금융 상식 테스트", "돈 상식 퀴즈", "재테크 퀴즈"],
  openGraph: { title: "금융 IQ 테스트 - 20문제로 측정", description: "당신의 금융 IQ는 몇 점? 5개 영역 20문제로 확인해보세요.", url: `${siteUrl}/ko/tools/finance-iq-test`, type: "website" },
};

export function generateStaticParams() { return [{ locale: "ko" }, { locale: "en" }]; }
interface PageProps { params: Promise<{ locale: string }> }

export default async function FinanceIQTestPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{locale === "ko" ? "금융 IQ 테스트" : "Finance IQ Test"}</h1>
        <p className="text-gray-600">{locale === "ko" ? "20문제로 나의 금융 지식을 테스트하고, 부족한 영역을 확인하세요." : "Test your financial knowledge with 20 questions."}</p>
      </div>
      <FinanceIQTest />
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>왜 금융 IQ가 중요할까?</h2>
        <p>금융 지식은 평생 수천만원의 차이를 만듭니다. 연말정산 공제 하나를 놓치면 연 100만원, 10년이면 1,000만원 이상 손해를 봅니다. <strong>알면 돈이 되고, 모르면 돈을 잃는</strong> 것이 금융 상식입니다.</p>
        <h2>영역별 핵심 지식</h2>
        <table>
          <thead><tr><th>영역</th><th>꼭 알아야 할 개념</th></tr></thead>
          <tbody>
            <tr><td>저축/예금</td><td>복리, 72법칙, 예금자보호(5천만원), 이자소득세</td></tr>
            <tr><td>투자</td><td>ETF, PER, 분산투자, 채권-금리 관계</td></tr>
            <tr><td>보험</td><td>실손보험, 보장성vs저축성, 적정 보험료 비율</td></tr>
            <tr><td>세금</td><td>소득공제vs세액공제, 종소세 신고, 체크카드 공제율</td></tr>
            <tr><td>부채/신용</td><td>DSR, 신용점수 관리, 대환대출, 상환방식 차이</td></tr>
          </tbody>
        </table>
        <h2>자주 묻는 질문</h2>
        <h3>Q. 금융 IQ가 낮으면 어디서 공부하나요?</h3>
        <p>한국은행 경제교육, 금융감독원 금융교육센터에서 무료 강의를 제공합니다. 유튜브의 금융/경제 채널도 좋은 시작점입니다.</p>
        <h3>Q. 몇 점이면 괜찮은 건가요?</h3>
        <p>70점(A등급) 이상이면 일상적인 금융 의사결정에 큰 무리가 없습니다. 50점 미만이면 기본적인 금융 개념을 공부하는 것을 강력히 권합니다.</p>
      </div>
    </div>
  );
}
