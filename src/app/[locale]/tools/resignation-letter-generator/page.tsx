import type { Metadata } from "next";
import ResignationLetterGenerator from "@/components/tools/document-generator/ResignationLetterGenerator";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "퇴사 통보서 작성기 - 퇴직 통보서 양식 무료 생성 2026",
  description:
    "퇴사 통보서를 무료로 작성하세요. 이름, 부서, 퇴사 사유를 입력하면 근로기준법에 맞는 퇴사 통보서가 자동 생성됩니다. 복사 및 다운로드 가능.",
  keywords: [
    "퇴사 통보서",
    "퇴직 통보서 양식",
    "퇴사 통보서 작성",
    "퇴사 통보서 쓰는법",
    "사직서 양식",
    "퇴사 통보 30일",
  ],
  openGraph: {
    title: "퇴사 통보서 작성기 - 무료 양식 생성",
    description: "기본 정보만 입력하면 퇴사 통보서를 자동으로 작성합니다.",
    url: `${siteUrl}/ko/tools/resignation-letter-generator`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ResignationLetterPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko" ? "퇴사 통보서 작성기" : "Resignation Letter Generator"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "기본 정보를 입력하면 근로기준법에 맞는 퇴사 통보서를 자동으로 생성합니다."
            : "Enter your information to generate a resignation letter."}
        </p>
      </div>
      <ResignationLetterGenerator />
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>퇴사 통보서란?</h2>
        <p>
          퇴사 통보서는 근로자가 사용자(회사)에게 퇴직 의사를 공식적으로 전달하는 문서입니다.
          근로기준법 제26조에 따르면 <strong>30일 전에 서면으로 통보</strong>해야 하며,
          이를 지키지 않으면 30일분의 통상임금을 해고예고수당으로 지급해야 합니다.
        </p>

        <h2>퇴사 통보서 vs 사직서 차이</h2>
        <table>
          <thead>
            <tr><th>구분</th><th>퇴사 통보서</th><th>사직서</th></tr>
          </thead>
          <tbody>
            <tr><td>작성 주체</td><td>근로자</td><td>근로자</td></tr>
            <tr><td>법적 성격</td><td>일방적 의사 통보</td><td>합의 해지 요청</td></tr>
            <tr><td>효력 발생</td><td>통보 후 30일</td><td>회사 수리 시</td></tr>
            <tr><td>철회 가능</td><td>상대방 도달 전까지</td><td>수리 전까지</td></tr>
            <tr><td>사용 상황</td><td>퇴사 의사가 확고할 때</td><td>합의 퇴직 시</td></tr>
          </tbody>
        </table>

        <h2>퇴사 통보서 작성 시 주의사항</h2>
        <p>
          <strong>1. 30일 전 통보 원칙</strong>: 근로기준법상 30일 전에 통보해야 합니다.
          다만 계약서에 별도 기간이 명시되어 있다면 그에 따릅니다.
        </p>
        <p>
          <strong>2. 서면 제출이 원칙</strong>: 구두 통보도 법적으로는 유효하지만,
          분쟁 예방을 위해 서면(이메일 포함)으로 제출하는 것이 좋습니다.
        </p>
        <p>
          <strong>3. 퇴사 사유는 간략하게</strong>: &quot;일신상의 사유&quot;로 충분합니다.
          구체적인 사유를 쓸 의무는 없습니다.
        </p>
        <p>
          <strong>4. 인수인계 계획 포함</strong>: 원만한 퇴사를 위해 인수인계 일정을
          간략히 포함하면 좋습니다.
        </p>

        <h2>자주 묻는 질문</h2>
        <h3>Q. 퇴사 통보 후 30일을 채우지 못하면?</h3>
        <p>
          근로자가 30일을 채우지 않고 퇴사해도 법적 제재는 없습니다.
          다만 회사와 원만하지 않은 퇴사가 될 수 있으므로, 가능하면 30일을 지키는 것이 좋습니다.
        </p>
        <h3>Q. 수습기간 중에도 30일 전에 통보해야 하나요?</h3>
        <p>
          수습기간(3개월 미만)에는 <strong>해고예고 의무가 면제</strong>되어
          회사도 즉시 해고가 가능합니다. 근로자도 비교적 자유롭게 퇴사할 수 있으나,
          예의상 최소 1~2주 전에 통보하는 것이 좋습니다.
        </p>
        <h3>Q. 이메일로 퇴사 통보해도 되나요?</h3>
        <p>
          네. 이메일 발송도 법적으로 유효합니다. 발송 일시가 기록되므로
          분쟁 시 증거로 활용할 수 있습니다.
          내용증명을 통한 발송도 가능합니다.
        </p>
      </div>
    </div>
  );
}
