import type { Metadata } from "next";
import PensionTimingComparator from "@/components/tools/comparator/PensionTimingComparator";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "국민연금 수령시기별 비교 - 조기수령 vs 정상 vs 연기 2026",
  description:
    "국민연금을 조기수령, 정상수령, 연기수령할 때 월 수령액과 누적 총액을 비교합니다. 손익분기점 나이까지 확인하세요.",
  keywords: [
    "국민연금 수령 시기",
    "국민연금 조기수령",
    "국민연금 연기수령",
    "국민연금 언제 받는게 유리",
    "국민연금 손익분기점",
  ],
  openGraph: {
    title: "국민연금 수령시기별 비교 2026",
    description: "조기수령·정상수령·연기수령 시 총 수령액을 비교합니다.",
    url: `${siteUrl}/ko/tools/pension-timing-comparator`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function PensionTimingComparatorPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko" ? "국민연금 수령시기별 비교" : "Pension Timing Comparator"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "조기수령, 정상수령, 연기수령 중 어떤 것이 유리한지 비교합니다."
            : "Compare early, normal, and deferred pension start times."}
        </p>
      </div>
      <PensionTimingComparator />
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>국민연금 수령시기 3가지 옵션</h2>
        <table>
          <thead>
            <tr><th>구분</th><th>수령 나이</th><th>조정</th><th>특징</th></tr>
          </thead>
          <tbody>
            <tr><td>조기수령</td><td>60세 (1969년생 이후)</td><td>연 6% 감액</td><td>5년 일찍, 30% 감액</td></tr>
            <tr><td>정상수령</td><td>65세 (1969년생 이후)</td><td>없음</td><td>기본 수령액 100%</td></tr>
            <tr><td>연기수령</td><td>70세 (최대)</td><td>연 7.2% 증액</td><td>5년 늦추면 36% 증액</td></tr>
          </tbody>
        </table>

        <h2>출생연도별 수령 개시 나이</h2>
        <table>
          <thead>
            <tr><th>출생연도</th><th>정상 수령 나이</th><th>조기 수령 가능</th></tr>
          </thead>
          <tbody>
            <tr><td>1957~1960년</td><td>62세</td><td>57세</td></tr>
            <tr><td>1961~1964년</td><td>63세</td><td>58세</td></tr>
            <tr><td>1965~1968년</td><td>64세</td><td>59세</td></tr>
            <tr><td>1969년 이후</td><td>65세</td><td>60세</td></tr>
          </tbody>
        </table>

        <h2>자주 묻는 질문</h2>
        <h3>Q. 조기수령 하면 평생 감액인가요?</h3>
        <p>
          네. 조기수령을 선택하면 <strong>평생 감액된 금액</strong>을 받습니다.
          다만 물가상승률에 따른 인상은 적용됩니다. 한 번 결정하면 번복할 수 없으므로 신중하게 판단하세요.
        </p>
        <h3>Q. 연기수령 중 취소할 수 있나요?</h3>
        <p>
          연기수령 신청 후에도 <strong>언제든지 수령을 시작</strong>할 수 있습니다.
          연기한 기간만큼 증액이 적용됩니다. 최대 5년까지 연기 가능합니다.
        </p>
        <h3>Q. 건강이 안 좋으면 조기수령이 유리한가요?</h3>
        <p>
          손익분기점 이전에 사망할 경우 조기수령이 총 수령액 기준으로 유리합니다.
          다만 유족연금도 함께 고려해야 합니다. 유족연금은 가입기간에 따라 결정됩니다.
        </p>
      </div>
    </div>
  );
}
