import type { Metadata } from "next";
import LeaseContractChecker from "@/components/tools/LeaseContractChecker";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "임대차 계약서 검토 도구 - 전세사기 예방 체크리스트 2026",
  description:
    "전세·월세 계약 전 반드시 확인해야 할 항목을 체크리스트로 제공합니다. 등기부등본, 보증금 안전, 전입신고 등.",
  keywords: [
    "임대차 계약 체크리스트",
    "전세 계약 주의사항",
    "전세사기 예방",
    "등기부등본 확인",
  ],
  openGraph: {
    title: "임대차 계약서 검토 도구 2026",
    description:
      "전세·월세 계약 체크리스트로 전세사기를 예방하세요.",
    url: `${siteUrl}/ko/tools/lease-contract-checker`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LeaseContractCheckerPage({
  params,
}: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko"
            ? "임대차 계약서 검토 도구"
            : "Lease Contract Checker"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "전세·월세 계약 전 반드시 확인해야 할 항목을 체크리스트로 점검하세요."
            : "Check essential items before signing a lease contract."}
        </p>
      </div>

      <LeaseContractChecker />

      <div className="mt-16 prose prose-gray max-w-none">
        <h2>전세사기 예방 핵심 체크리스트</h2>
        <p>
          2023~2024년 전세사기 피해가 사회 문제로 대두되면서 정부는
          전세사기특별법을 제정했습니다. 그러나 법적 보호만으로는 부족하고,
          계약 단계에서 직접 확인해야 할 항목이 있습니다. 아래 표의 항목을
          빠짐없이 점검하면 대부분의 전세사기를 사전에 예방할 수 있습니다.
        </p>
        <table>
          <thead>
            <tr>
              <th>확인 항목</th>
              <th>확인 방법</th>
              <th>위험 신호</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>등기부등본 갑구</td>
              <td>인터넷등기소에서 발급</td>
              <td>가압류, 가처분, 경매개시결정 존재</td>
            </tr>
            <tr>
              <td>등기부등본 을구</td>
              <td>근저당 설정 금액 확인</td>
              <td>근저당 + 보증금 합계가 시세의 70% 초과</td>
            </tr>
            <tr>
              <td>임대인 본인 확인</td>
              <td>신분증과 등기부 소유자 대조</td>
              <td>대리인 계약, 법인 명의 건물</td>
            </tr>
            <tr>
              <td>건축물대장</td>
              <td>정부24에서 발급</td>
              <td>불법 건축물, 위반 건축물 표시</td>
            </tr>
            <tr>
              <td>시세 대비 보증금</td>
              <td>KB시세, 국토부 실거래가 확인</td>
              <td>시세의 80% 이상 보증금 요구</td>
            </tr>
            <tr>
              <td>국세·지방세 완납 증명</td>
              <td>임대인에게 요청</td>
              <td>체납 세금이 있으면 보증금보다 우선 변제</td>
            </tr>
          </tbody>
        </table>

        <h2>등기부등본 읽는 법</h2>
        <p>
          등기부등본은 부동산의 &quot;신분증&quot;입니다. 갑구(소유권 관련)와
          을구(소유권 외 권리)로 나뉘며, 각 항목의 의미를 정확히 이해해야
          안전한 계약이 가능합니다.
        </p>
        <p>
          <strong>갑구</strong>에서는 현재 소유자가 누구인지, 가압류나
          가처분 같은 소유권 제한이 있는지 확인합니다. 소유권 이전 날짜가
          최근이라면 &quot;갭투자&quot; 가능성을 의심해야 합니다.
        </p>
        <p>
          <strong>을구</strong>에서는 근저당권 설정 금액을 확인합니다.
          근저당 채권최고액은 실제 대출금의 120~130%로 설정되므로, 채권최고액이
          3억이라면 실제 대출금은 약 2.3~2.5억원입니다. 이 금액에 내 보증금을
          더했을 때 시세의 70%를 넘으면 위험합니다.
        </p>

        <h2>전세보증보험 가입 방법</h2>
        <p>
          전세보증보험은 임대인이 보증금을 돌려주지 않을 때 보증기관이 대신
          지급하는 보험입니다. HUG(주택도시보증공사), SGI서울보증, HF(한국주택
          금융공사) 세 곳에서 가입할 수 있습니다.
        </p>
        <table>
          <thead>
            <tr>
              <th>보증기관</th>
              <th>보증 한도</th>
              <th>보증료율(연)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>HUG (주택도시보증공사)</td>
              <td>수도권 7억, 기타 5억</td>
              <td>연 0.115~0.154%</td>
            </tr>
            <tr>
              <td>SGI서울보증</td>
              <td>개별 심사</td>
              <td>연 0.183~0.208%</td>
            </tr>
            <tr>
              <td>HF (한국주택금융공사)</td>
              <td>수도권 7억, 기타 5억</td>
              <td>연 0.12~0.16%</td>
            </tr>
          </tbody>
        </table>
        <p>
          가입 시 전입신고와 확정일자를 먼저 받아야 하며, 계약 체결 후 즉시
          가입하는 것이 안전합니다. 임대인 동의 없이도 가입 가능하지만,
          건물 감정가 대비 보증금 비율이 높으면 가입이 거절될 수 있습니다.
        </p>

        <h2>자주 묻는 질문</h2>

        <h3>Q. 전입신고와 확정일자는 언제 하나요?</h3>
        <p>
          잔금을 치르고 이사한 당일에 전입신고와 확정일자를 동시에 받는 것이
          가장 안전합니다. 전입신고는 주민센터 방문 또는 정부24 온라인으로
          가능하며, 확정일자는 주민센터에서 계약서에 도장을 받으면 됩니다.
          이 두 가지를 갖추면 대항력과 우선변제권이 생깁니다.
        </p>

        <h3>Q. 깡통전세란 무엇인가요?</h3>
        <p>
          집값 대비 대출(근저당)과 보증금의 합이 집값을 초과하는 상태를
          &quot;깡통전세&quot;라 합니다. 예를 들어 시세 3억 아파트에 근저당
          2억, 보증금 1.5억이면 합계 3.5억으로 시세를 초과합니다. 이 경우
          집이 경매로 넘어가면 보증금 전액을 돌려받기 어렵습니다.
        </p>

        <h3>Q. 임대인이 세금 체납이 있으면 어떻게 되나요?</h3>
        <p>
          2024년부터 임대인의 미납 국세가 있으면 임차인의 보증금보다 국세가
          우선 변제됩니다. 따라서 계약 전에 임대인에게 국세완납증명서와
          지방세완납증명서를 반드시 요청해야 합니다. 정당한 요청이므로
          거부하는 임대인은 의심해볼 필요가 있습니다.
        </p>
      </div>
    </div>
  );
}
