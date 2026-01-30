import type { Metadata } from "next";
import HousingCostSimulator from "@/components/tools/comparator/HousingCostSimulator";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "전세 vs 월세 vs 매매 비교 시뮬레이터 - 어디가 유리할까?",
  description: "전세, 월세, 매매의 총 거주비용을 시뮬레이션합니다. 초기비용, 월비용, 자산형성까지 비교하고 손익분기점을 확인하세요.",
  keywords: ["전세 월세 비교", "전세 매매 비교", "주거비용 계산", "전세vs매매", "월세vs전세", "주거비용 시뮬레이터"],
  openGraph: {
    title: "전세 vs 월세 vs 매매 비교 시뮬레이터",
    description: "같은 조건에서 전세·월세·매매의 총비용을 비교하고 최적의 선택을 찾아보세요.",
    url: `${siteUrl}/ko/tools/housing-cost-simulator`,
    type: "website",
  },
};

export function generateStaticParams() { return [{ locale: "ko" }, { locale: "en" }]; }
interface PageProps { params: Promise<{ locale: string }> }

export default async function HousingCostSimulatorPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{locale === "ko" ? "전세 vs 월세 vs 매매 비교" : "Jeonse vs Monthly Rent vs Purchase"}</h1>
        <p className="text-gray-600">{locale === "ko" ? "같은 조건에서 세 가지 거주 방식의 총비용을 비교합니다." : "Compare total housing costs across three options."}</p>
      </div>
      <HousingCostSimulator />
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>전세 vs 월세 vs 매매, 어떤 기준으로 비교해야 할까?</h2>
        <p>단순히 월 지출만 비교하면 안 됩니다. <strong>초기 비용, 월 비용, 기회비용, 자산 형성</strong>을 모두 고려해야 합니다. 특히 매매는 시세 상승 여부에 따라 결과가 완전히 달라집니다.</p>
        <h2>각 거주 방식의 핵심 특징</h2>
        <table>
          <thead><tr><th>항목</th><th>전세</th><th>월세</th><th>매매</th></tr></thead>
          <tbody>
            <tr><td>초기 자금</td><td>중간 (보증금)</td><td>적음</td><td>많음 (계약금+대출)</td></tr>
            <tr><td>월 비용</td><td>대출이자만</td><td>임대료+관리비</td><td>대출원리금+보유세</td></tr>
            <tr><td>자산 형성</td><td>없음</td><td>없음</td><td>있음 (시세차익)</td></tr>
            <tr><td>리스크</td><td>전세사기</td><td>임대료 인상</td><td>시세 하락</td></tr>
            <tr><td>유동성</td><td>중간</td><td>높음</td><td>낮음</td></tr>
          </tbody>
        </table>
        <h2>자주 묻는 질문</h2>
        <h3>Q. 전세와 매매 중 고민인데요?</h3>
        <p>향후 시세 상승을 확신한다면 매매가, 불확실하다면 전세가 안전합니다. 이 시뮬레이터에서 시세 상승률을 0~5%까지 바꿔보며 비교해보세요.</p>
        <h3>Q. 월세가 무조건 손해인가요?</h3>
        <p>아닙니다. 초기 자금이 부족하거나 유동성이 필요한 경우, 또는 보증금을 투자에 활용할 수 있다면 월세가 합리적일 수 있습니다.</p>
        <h3>Q. 전세대출 받으면 이자가 부담되지 않나요?</h3>
        <p>전세대출 금리가 연 3%라면 3억 대출 시 월 75만원 이자가 발생합니다. 하지만 같은 조건 월세 80만원보다 낮고, 보증금이 돌아오므로 장기적으로 유리한 경우가 많습니다.</p>
      </div>
    </div>
  );
}
