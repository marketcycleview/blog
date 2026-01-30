import type { Metadata } from "next";
import LegalNoticeGenerator from "@/components/tools/document-generator/LegalNoticeGenerator";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "내용증명 작성기 - 임금체불, 보증금반환, 계약해지 자동작성",
  description:
    "내용증명을 무료로 작성하세요. 임금체불, 전세보증금 반환, 계약 해지, 손해배상 등 유형별 내용증명 양식을 자동으로 생성해 드립니다. 복사·다운로드·인쇄까지 한번에.",
  keywords: [
    "내용증명 작성",
    "내용증명 양식",
    "내용증명 쓰는법",
    "내용증명 보내는법",
    "임금체불 내용증명",
    "보증금 반환 내용증명",
    "계약해지 내용증명",
    "내용증명 무료",
  ],
  openGraph: {
    title: "내용증명 작성기 - 유형별 자동 작성",
    description:
      "임금체불, 보증금반환, 계약해지, 손해배상 내용증명을 3분 안에 작성하세요.",
    url: `${siteUrl}/ko/tools/legal-notice-generator`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LegalNoticeGeneratorPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko" ? "내용증명 작성기" : "Legal Notice Generator"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "임금체불, 보증금 반환, 계약 해지 등 내용증명을 쉽고 빠르게 작성하세요."
            : "Easily create legal notices for unpaid wages, deposit returns, contract termination, and more."}
        </p>
      </div>

      {/* 도구 */}
      <LegalNoticeGenerator />

      {/* SEO 콘텐츠 */}
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>내용증명이란?</h2>
        <p>
          내용증명은 발신인이 수신인에게 어떤 내용의 문서를 언제 보냈는지를
          우체국이 공적으로 증명해주는 제도입니다. 법적 분쟁에서{" "}
          <strong>의사표시의 존재와 시점을 입증</strong>하는 데 활용됩니다.
        </p>
        <p>
          내용증명 자체가 법적 강제력을 갖지는 않지만, 상대방에게 심리적 압박을
          주고 향후 소송에서 증거로 사용할 수 있어 분쟁 해결의 첫 단계로 널리
          활용됩니다.
        </p>

        <h2>내용증명을 보내야 하는 경우</h2>
        <table>
          <thead>
            <tr>
              <th>상황</th>
              <th>목적</th>
              <th>관련 법률</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>임금체불</td>
              <td>미지급 임금 지급 요구</td>
              <td>근로기준법 제36조</td>
            </tr>
            <tr>
              <td>보증금 미반환</td>
              <td>전세/월세 보증금 반환 요구</td>
              <td>주택임대차보호법</td>
            </tr>
            <tr>
              <td>계약 해지</td>
              <td>계약 해지 의사 전달 증명</td>
              <td>민법 제543조</td>
            </tr>
            <tr>
              <td>손해배상</td>
              <td>피해 사실 통보 및 배상 요구</td>
              <td>민법 제750조</td>
            </tr>
            <tr>
              <td>채권 추심</td>
              <td>빌려준 돈 반환 요구</td>
              <td>민법 제598조</td>
            </tr>
          </tbody>
        </table>

        <h2>내용증명 보내는 방법</h2>
        <h3>1. 우체국 방문</h3>
        <p>
          같은 내용의 문서 <strong>3통</strong>을 준비합니다(발신인 보관용,
          수신인 발송용, 우체국 보관용). 가까운 우체국에 방문하여 내용증명
          접수를 요청하면 됩니다. 비용은 일반 등기우편 요금에 내용증명
          수수료(약 1,300원)가 추가됩니다.
        </p>
        <h3>2. 인터넷우체국 (온라인)</h3>
        <p>
          인터넷우체국(epost.go.kr)에서 회원가입 후 온라인으로 내용증명을
          발송할 수 있습니다. 문서를 직접 입력하거나 파일을 업로드하면 되며,
          집에서 편리하게 보낼 수 있습니다.
        </p>

        <h2>내용증명 작성 시 주의사항</h2>
        <ul>
          <li>
            <strong>사실만 기재</strong>: 허위 사실이나 과장된 표현은 오히려
            불리하게 작용할 수 있습니다.
          </li>
          <li>
            <strong>구체적으로 작성</strong>: 날짜, 금액, 장소 등을 구체적으로
            기재하세요.
          </li>
          <li>
            <strong>이행 기한 명시</strong>: 상대방에게 합리적인 이행 기한을
            부여하세요 (보통 7~14일).
          </li>
          <li>
            <strong>법적 조치 예고</strong>: 불이행 시 법적 조치를 취할 것임을
            명시하면 효과적입니다.
          </li>
          <li>
            <strong>감정적 표현 자제</strong>: 욕설이나 위협적 표현은
            삼가세요.
          </li>
        </ul>

        <h2>자주 묻는 질문</h2>
        <h3>Q. 내용증명을 보내면 법적 효력이 있나요?</h3>
        <p>
          내용증명 자체에 법적 강제력은 없습니다. 다만 &quot;이런 내용을 이 날짜에
          보냈다&quot;는 사실을 우체국이 증명해주므로, 향후 소송에서 중요한
          증거가 됩니다. 상대방에 대한 심리적 압박 효과도 큽니다.
        </p>
        <h3>Q. 내용증명 비용은 얼마인가요?</h3>
        <p>
          우체국 방문 시 등기우편 요금(약 3,000~4,000원) + 내용증명
          수수료(1장 기준 약 1,300원)로, 총 5,000~6,000원 정도입니다.
          인터넷우체국도 비슷한 금액입니다.
        </p>
        <h3>Q. 내용증명을 받은 후 무시하면 어떻게 되나요?</h3>
        <p>
          내용증명을 무시한다고 바로 불이익이 생기지는 않습니다. 하지만
          발신인이 후속 법적 조치(소송, 진정 등)를 취할 경우, 내용증명을
          보냈는데 이행하지 않았다는 점이 불리하게 작용할 수 있습니다.
        </p>
        <h3>Q. 변호사 없이 내용증명을 보내도 되나요?</h3>
        <p>
          네, 내용증명은 누구나 작성하고 보낼 수 있습니다. 다만 금액이 크거나
          복잡한 법적 분쟁인 경우에는 변호사 상담을 받는 것이 좋습니다.
        </p>
        <h3>Q. 내용증명을 보낸 후에는 어떻게 해야 하나요?</h3>
        <p>
          발신인 보관용 1통을 잘 보관하세요. 이행 기한까지 응답이 없으면
          관할 기관(노동청, 법원 등)에 정식으로 조치를 취할 수 있습니다.
          우체국에서 배달 확인도 가능합니다.
        </p>
      </div>
    </div>
  );
}
