import type { Metadata } from "next";
import "../globals.css";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";
const siteName = "InfoTalker";
const siteDescription = "복지, 금융, 세금 정보를 한 곳에서 - 지원금, 대출, 연말정산";
const adsenseClientId = "ca-pub-1372813266832773";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: ["지원금", "복지정책", "대출", "금융", "세금", "연말정산", "신청방법"],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "ko": `${siteUrl}/ko`,
      "en": `${siteUrl}/en`,
      "x-default": `${siteUrl}/ko`,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: siteName,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Google Search Console 인증 코드 (나중에 추가)
    // google: "your-google-verification-code",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <head>
        {/* Google AdSense */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
          crossOrigin="anonymous"
        />

        {/* hreflang tags for multilingual SEO */}
        <link rel="alternate" hrefLang="ko" href={`${siteUrl}/ko`} />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/en`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/ko`} />

        {/* JSON-LD Structured Data */}
        <OrganizationJsonLd
          name={siteName}
          url={siteUrl}
          description={siteDescription}
        />
        <WebSiteJsonLd
          name={siteName}
          url={siteUrl}
          description={siteDescription}
        />
      </head>
      <body className="min-h-screen bg-white">
        <header className="border-b bg-white sticky top-0 z-50">
          <nav className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <a href={`/${locale}`} className="text-xl font-bold text-gray-900">
                InfoTalker 인포토커
              </a>
              <div className="flex items-center gap-6">
                <a href={`/${locale}/subsidy`} className="text-gray-600 hover:text-gray-900">
                  {locale === "ko" ? "지원금" : "Subsidy"}
                </a>
                <a href={`/${locale}/tools`} className="text-gray-600 hover:text-gray-900">
                  {locale === "ko" ? "도구" : "Tools"}
                </a>
                {/* 언어 전환 */}
                <div className="flex gap-2 text-sm">
                  <a href="/ko" className={locale === "ko" ? "font-bold" : "text-gray-500"}>
                    KO
                  </a>
                  <span className="text-gray-300">|</span>
                  <a href="/en" className={locale === "en" ? "font-bold" : "text-gray-500"}>
                    EN
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="border-t bg-gray-50 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center text-gray-600 text-sm">
              <p>© 2026 {siteName}. All rights reserved.</p>
              <div className="mt-2 flex justify-center gap-4">
                <a href={`/${locale}/privacy`} className="hover:text-gray-900">
                  개인정보처리방침
                </a>
                <a href={`/${locale}/contact`} className="hover:text-gray-900">
                  연락처
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
