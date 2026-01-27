import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ko" ? "개인정보처리방침" : "Privacy Policy",
    description:
      locale === "ko"
        ? "개인정보 수집 및 이용에 관한 방침입니다."
        : "Our privacy policy regarding data collection and usage.",
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;

  if (locale === "ko") {
    return (
      <div className="max-w-3xl mx-auto prose prose-lg">
        <h1>개인정보처리방침</h1>
        <p className="text-gray-500">최종 수정일: 2026년 1월 27일</p>

        <h2>1. 개인정보의 수집 및 이용 목적</h2>
        <p>
          본 웹사이트는 다음의 목적을 위해 개인정보를 수집하고 있습니다:
        </p>
        <ul>
          <li>웹사이트 이용 통계 분석 및 서비스 개선</li>
          <li>문의 응대 및 고객 지원</li>
          <li>맞춤형 광고 제공 (Google AdSense)</li>
        </ul>

        <h2>2. 수집하는 개인정보 항목</h2>
        <p>본 웹사이트는 다음과 같은 정보를 자동으로 수집할 수 있습니다:</p>
        <ul>
          <li>IP 주소, 브라우저 종류, 운영체제</li>
          <li>방문 일시, 페이지 조회 기록</li>
          <li>쿠키 정보</li>
        </ul>

        <h2>3. 쿠키(Cookie) 사용</h2>
        <p>
          본 웹사이트는 사용자 경험 향상과 광고 제공을 위해 쿠키를 사용합니다.
          쿠키는 웹사이트가 사용자의 컴퓨터에 저장하는 작은 텍스트 파일입니다.
        </p>
        <p>
          사용자는 브라우저 설정을 통해 쿠키 사용을 거부할 수 있으나,
          이 경우 일부 서비스 이용에 제한이 있을 수 있습니다.
        </p>

        <h2>4. Google AdSense 및 광고</h2>
        <p>
          본 웹사이트는 Google AdSense를 통해 광고를 게재합니다.
          Google은 사용자의 관심사에 맞는 광고를 표시하기 위해
          쿠키를 사용할 수 있습니다.
        </p>
        <p>
          Google의 광고 쿠키 사용에 대한 자세한 내용은{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google 광고 정책
          </a>
          에서 확인하실 수 있습니다.
        </p>

        <h2>5. Google Analytics</h2>
        <p>
          본 웹사이트는 방문자 통계 분석을 위해 Google Analytics를 사용합니다.
          Google Analytics는 쿠키를 통해 사용자의 웹사이트 이용 정보를 수집합니다.
        </p>
        <p>
          수집된 정보는 Google의 개인정보처리방침에 따라 처리됩니다.
          자세한 내용은{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google 개인정보처리방침
          </a>
          을 참조하세요.
        </p>

        <h2>6. 개인정보의 보유 및 파기</h2>
        <p>
          수집된 개인정보는 수집 목적이 달성된 후 지체 없이 파기됩니다.
          단, 관련 법령에 의해 보존이 필요한 경우 해당 기간 동안 보관됩니다.
        </p>

        <h2>7. 개인정보 보호책임자</h2>
        <p>
          개인정보 처리에 관한 문의사항은{" "}
          <a href="/ko/contact">연락처 페이지</a>를 통해 문의해 주세요.
        </p>

        <h2>8. 방침 변경</h2>
        <p>
          본 개인정보처리방침은 법령 변경이나 서비스 변경에 따라
          수정될 수 있습니다. 변경 시 웹사이트를 통해 공지합니다.
        </p>
      </div>
    );
  }

  // English version
  return (
    <div className="max-w-3xl mx-auto prose prose-lg">
      <h1>Privacy Policy</h1>
      <p className="text-gray-500">Last updated: January 27, 2026</p>

      <h2>1. Information We Collect</h2>
      <p>We may automatically collect the following information:</p>
      <ul>
        <li>IP address, browser type, operating system</li>
        <li>Visit date/time, pages viewed</li>
        <li>Cookie information</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the collected information to:</p>
      <ul>
        <li>Analyze website usage and improve our services</li>
        <li>Respond to inquiries and provide customer support</li>
        <li>Display personalized advertisements (Google AdSense)</li>
      </ul>

      <h2>3. Cookies</h2>
      <p>
        This website uses cookies to enhance user experience and serve advertisements.
        You can choose to disable cookies through your browser settings,
        but this may limit some functionality.
      </p>

      <h2>4. Google AdSense</h2>
      <p>
        This website uses Google AdSense to display advertisements.
        Google may use cookies to show ads based on your interests.
        For more information, please visit{" "}
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Ad Policies
        </a>.
      </p>

      <h2>5. Google Analytics</h2>
      <p>
        We use Google Analytics to analyze website traffic.
        For more information, please see{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Privacy Policy
        </a>.
      </p>

      <h2>6. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy,
        please contact us through our{" "}
        <a href="/en/contact">Contact page</a>.
      </p>

      <h2>7. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time.
        Changes will be posted on this page.
      </p>
    </div>
  );
}
