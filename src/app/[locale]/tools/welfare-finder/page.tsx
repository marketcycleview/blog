import type { Metadata } from "next";
import { WelfareFinder } from "@/components/welfare";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "복지 정책 찾기 - 내 조건에 맞는 지원금 검색",
  description:
    "나이, 소득, 상황에 맞는 복지 정책을 찾아보세요. 청년, 노인, 장애인, 한부모 등 다양한 조건으로 받을 수 있는 지원금을 한눈에 확인할 수 있습니다.",
  keywords: [
    "복지 정책",
    "지원금 찾기",
    "정부 지원금",
    "복지 혜택",
    "청년 지원금",
    "노인 복지",
    "장애인 지원",
    "한부모 지원",
    "저소득층 지원",
    "복지로",
  ],
  openGraph: {
    title: "복지 정책 찾기",
    description:
      "내 조건에 맞는 복지 정책을 찾아보세요. 나이, 소득, 상황별 지원금 검색.",
    url: `${siteUrl}/ko/tools/welfare-finder`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function WelfareFinderPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      {/* 페이지 헤더 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko" ? "복지 정책 찾기" : "Welfare Policy Finder"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko"
            ? "나이, 소득, 상황을 선택하면 받을 수 있는 지원금을 찾아드립니다."
            : "Select your age, income, and situation to find available benefits."}
        </p>
      </div>

      {/* 복지 정책 찾기 도구 */}
      <WelfareFinder locale={locale} />

      {/* SEO 콘텐츠 */}
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>복지 정책 찾기란?</h2>
        <p>
          정부와 지자체에서 제공하는 수백 가지 복지 정책 중에서 나에게 해당되는
          지원금을 찾기란 쉽지 않습니다. 이 도구를 사용하면 나이, 소득 수준,
          직업, 가구 형태 등 간단한 조건만 입력해도 신청 가능한 복지 정책을 한눈에
          확인할 수 있습니다.
        </p>

        <h2>어떤 조건으로 검색할 수 있나요?</h2>
        <ul>
          <li>
            <strong>기본 정보:</strong> 나이, 성별, 거주 지역
          </li>
          <li>
            <strong>소득 수준:</strong> 기준 중위소득 대비 비율로 선택
          </li>
          <li>
            <strong>직업/상황:</strong> 청년, 대학생, 구직자, 직장인, 자영업자,
            노인 등
          </li>
          <li>
            <strong>주거 형태:</strong> 무주택, 전세, 월세, 자가
          </li>
          <li>
            <strong>가구 유형:</strong> 1인 가구, 신혼부부, 다자녀, 조손가정 등
          </li>
          <li>
            <strong>특수 상황:</strong> 장애인, 임산부, 한부모, 다문화가정 등
          </li>
        </ul>

        <h2>자주 묻는 질문</h2>

        <h3>검색 결과가 정확한가요?</h3>
        <p>
          입력하신 조건을 기준으로 필터링한 결과입니다. 실제 신청 자격은 각
          정책마다 세부 요건이 다를 수 있으니, 관심 있는 정책은 상세 페이지에서
          정확한 자격 요건을 확인해주세요.
        </p>

        <h3>지역별 정책도 검색되나요?</h3>
        <p>
          네, 지역을 선택하면 해당 지역에서만 신청 가능한 정책도 함께
          검색됩니다. 지역을 선택하지 않으면 전국 공통 정책만 표시됩니다.
        </p>

        <h3>중복으로 받을 수 있는 지원금이 있나요?</h3>
        <p>
          일부 지원금은 중복 수령이 가능하고, 일부는 불가능합니다. 각 정책의
          상세 페이지에서 중복 수령 가능 여부를 확인하시기 바랍니다.
        </p>
      </div>
    </div>
  );
}
