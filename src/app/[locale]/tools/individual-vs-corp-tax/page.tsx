import type { Metadata } from "next";
import TaxEntityComparator from "@/components/tools/comparator/TaxEntityComparator";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "개인사업자 vs 법인 세금 비교 시뮬레이터 2026",
  description: "같은 매출에서 개인사업자와 법인의 세금 차이를 비교합니다. 종합소득세 vs 법인세, 4대보험, 배당세까지 실효세율을 계산해보세요.",
  keywords: ["개인사업자 법인 비교", "개인 법인 세금", "법인전환", "법인 설립 절세", "종합소득세 법인세 비교"],
  openGraph: { title: "개인사업자 vs 법인 세금 비교", description: "같은 매출에서 개인 vs 법인 세금 차이를 시뮬레이션합니다.", url: `${siteUrl}/ko/tools/individual-vs-corp-tax`, type: "website" },
};

export function generateStaticParams() { return [{ locale: "ko" }, { locale: "en" }]; }
interface PageProps { params: Promise<{ locale: string }> }

export default async function TaxEntityPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{locale === "ko" ? "개인사업자 vs 법인 세금 비교" : "Individual vs Corporate Tax Comparison"}</h1>
        <p className="text-gray-600">{locale === "ko" ? "매출과 경비율을 입력하면 개인/법인의 세금 차이를 비교합니다." : "Compare tax burden between individual and corporate entities."}</p>
      </div>
      <TaxEntityComparator />
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>개인사업자 vs 법인, 언제 전환해야 할까?</h2>
        <p>일반적으로 <strong>연 순이익(매출-경비) 4,600만원</strong>을 넘기 시작하면 법인이 세금 측면에서 유리해집니다. 이는 개인 소득세 최고세율(42%)이 법인세율(9~24%)보다 높기 때문입니다. 다만 법인은 배당 시 추가 세금이 발생하므로 단순 비교는 어렵습니다.</p>
        <h2>법인 전환의 장단점</h2>
        <table>
          <thead><tr><th>구분</th><th>장점</th><th>단점</th></tr></thead>
          <tbody>
            <tr><td>세금</td><td>낮은 법인세율(9~24%)</td><td>배당소득세(15.4%) 추가</td></tr>
            <tr><td>신뢰도</td><td>거래처/금융기관 신뢰 높음</td><td>-</td></tr>
            <tr><td>비용처리</td><td>대표자 급여도 비용 처리</td><td>세무/법무 관리 비용 증가</td></tr>
            <tr><td>유연성</td><td>지분 양도/투자 유치 용이</td><td>폐업 절차 복잡</td></tr>
          </tbody>
        </table>
        <h2>자주 묻는 질문</h2>
        <h3>Q. 법인 대표자 급여를 얼마로 설정해야 하나요?</h3>
        <p>법인세와 소득세의 균형을 맞추는 것이 핵심입니다. 급여를 높이면 법인세는 줄지만 소득세가 늘어나고, 낮추면 반대입니다. 세무사와 상의하여 최적 급여를 설정하세요.</p>
        <h3>Q. 1인 법인도 가능한가요?</h3>
        <p>네, 대표 1인으로 법인 설립이 가능합니다. 최소 자본금 제한도 없어졌습니다(100원도 가능). 다만 4대보험 의무 가입, 세무신고 복잡성 등을 고려해야 합니다.</p>
      </div>
    </div>
  );
}
