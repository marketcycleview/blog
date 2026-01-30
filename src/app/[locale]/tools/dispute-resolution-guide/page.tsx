import type { Metadata } from "next";
import DisputeResolver from "@/components/tools/decision-tree/DisputeResolver";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";
export const metadata: Metadata = {
  title: "분쟁 해결 경로 안내 - 내용증명·소송·조정 최적 방법 찾기",
  description: "금전, 계약, 부동산, 근로, 소비자 분쟁 유형별 최적의 해결 방법을 추천합니다. 내용증명, 소액소송, 민사조정, 노동청 진정 등 비용과 기간도 비교해보세요.",
  keywords: ["분쟁 해결", "소송 방법", "내용증명 보내야 할까", "소액소송", "민사조정", "노동청 진정"],
  openGraph: { title: "분쟁 해결 경로 안내", description: "5개 질문으로 최적의 분쟁 해결 방법을 찾아보세요.", url: `${siteUrl}/ko/tools/dispute-resolution-guide`, type: "website" },
};
export function generateStaticParams() { return [{ locale: "ko" }, { locale: "en" }]; }
interface PageProps { params: Promise<{ locale: string }> }
export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{locale === "ko" ? "분쟁 해결 경로 안내" : "Dispute Resolution Guide"}</h1>
        <p className="text-gray-600">{locale === "ko" ? "분쟁 상황을 입력하면 최적의 해결 방법과 절차를 안내합니다." : "Get the best resolution path for your dispute."}</p>
      </div>
      <DisputeResolver />
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>분쟁 해결 방법 비교</h2>
        <table><thead><tr><th>방법</th><th>비용</th><th>기간</th><th>강제력</th></tr></thead>
          <tbody>
            <tr><td>내용증명</td><td>5천원</td><td>즉시</td><td>없음 (심리적 압박)</td></tr>
            <tr><td>민사조정</td><td>소액</td><td>1~3개월</td><td>합의 시 판결과 동일</td></tr>
            <tr><td>소액소송</td><td>수만원</td><td>1~3개월</td><td>판결 강제력</td></tr>
            <tr><td>민사소송</td><td>수십~수백만원</td><td>6개월~2년</td><td>판결 강제력</td></tr>
            <tr><td>노동청 진정</td><td>무료</td><td>2~4주</td><td>행정 제재</td></tr>
            <tr><td>소비자원 조정</td><td>무료</td><td>1~2개월</td><td>조정 효력</td></tr>
          </tbody></table>
        <h2>자주 묻는 질문</h2>
        <h3>Q. 변호사 없이도 소송할 수 있나요?</h3>
        <p>3,000만원 이하 소액소송은 변호사 없이 본인이 직접 진행할 수 있습니다. 법원 민원실에서 서식을 받아 작성하면 됩니다.</p>
        <h3>Q. 내용증명을 먼저 보내야 하나요?</h3>
        <p>법적 의무는 아니지만, 대부분의 경우 내용증명을 먼저 보내는 것이 좋습니다. 상대방이 응하면 소송 없이 해결되고, 응하지 않으면 소송에서 유리한 증거가 됩니다.</p>
      </div>
    </div>
  );
}
