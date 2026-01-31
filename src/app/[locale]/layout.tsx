import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "../globals.css";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/JsonLd";
import { AdClickProtection } from "@/components/ads/AdClickProtection";
import { Header } from "@/components/Header";
import { GlobalFloatingShare } from "@/components/GlobalFloatingShare";
import { CATEGORIES } from "@/lib/categories";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-noto-sans-kr",
});

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
    images: [
      {
        url: `${siteUrl}/api/og?type=home`,
        width: 1200,
        height: 630,
        alt: "InfoTalker 인포토커 - 복지, 금융, 세금 정보",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [`${siteUrl}/api/og?type=home`],
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
    <html lang={locale} className={notoSansKR.variable}>
      <head>
        {/* Naver Search Advisor */}
        <meta name="naver-site-verification" content="f9d7ef5f3094536e0f69b04486afad2ead82dc95" />

        {/* Bing Webmaster Tools */}
        <meta name="msvalidate.01" content="B577A370ACD376036A05A05E0DF86F2D" />

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

        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" title="InfoTalker RSS" href={`${siteUrl}/rss.xml`} />

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
      <body className="min-h-screen bg-white font-sans">
        {/* 광고 무효 클릭 방지 */}
        <AdClickProtection />

        <Header locale={locale} />

        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>

        <GlobalFloatingShare />

        <footer className="border-t bg-gray-50 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-10">
            {/* 사이트맵 그리드 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {/* 카테고리 */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                  {locale === "ko" ? "카테고리" : "Categories"}
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {CATEGORIES.map((cat) => (
                    <li key={cat.id}>
                      <a href={`/${locale}${cat.href}`} className="hover:text-gray-900">
                        {cat.icon} {locale === "ko" ? cat.label.ko : cat.label.en}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* 도구 */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                  {locale === "ko" ? "인기 도구" : "Popular Tools"}
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href={`/${locale}/tools/welfare-finder`} className="hover:text-gray-900">{locale === "ko" ? "복지 정책 찾기" : "Welfare Finder"}</a></li>
                  <li><a href={`/${locale}/tools/salary-calculator`} className="hover:text-gray-900">{locale === "ko" ? "연봉 계산기" : "Salary Calculator"}</a></li>
                  <li><a href={`/${locale}/tools/loan-calculator`} className="hover:text-gray-900">{locale === "ko" ? "대출 계산기" : "Loan Calculator"}</a></li>
                  <li><a href={`/${locale}/tools`} className="hover:text-gray-900 font-medium">{locale === "ko" ? "전체 도구 →" : "All Tools →"}</a></li>
                </ul>
              </div>
              {/* 서비스 */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                  {locale === "ko" ? "서비스" : "Service"}
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href={`/${locale}/privacy`} className="hover:text-gray-900">{locale === "ko" ? "개인정보처리방침" : "Privacy Policy"}</a></li>
                  <li><a href={`/${locale}/contact`} className="hover:text-gray-900">{locale === "ko" ? "연락처" : "Contact"}</a></li>
                </ul>
              </div>
            </div>
            {/* 저작권 */}
            <div className="border-t pt-6 text-center text-gray-500 text-sm">
              <p>&copy; 2026 {siteName}. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
