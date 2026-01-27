import type { Metadata } from "next";
import "../globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
const siteName = "SEO 블로그";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: "정보와 리뷰를 한 곳에서 - 지원금, 제품 리뷰, 트렌딩 이슈",
  keywords: ["지원금", "리뷰", "트렌딩", "정보", "정책", "신청방법"],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: siteName,
    description: "정보와 리뷰를 한 곳에서 - 지원금, 제품 리뷰, 트렌딩 이슈",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: "정보와 리뷰를 한 곳에서 - 지원금, 제품 리뷰, 트렌딩 이슈",
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
      <body className="min-h-screen bg-white">
        <header className="border-b bg-white sticky top-0 z-50">
          <nav className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <a href={`/${locale}`} className="text-xl font-bold text-gray-900">
                SEO 블로그
              </a>
              <div className="flex items-center gap-6">
                <a href={`/${locale}/subsidy`} className="text-gray-600 hover:text-gray-900">
                  지원금
                </a>
                <a href={`/${locale}/review`} className="text-gray-600 hover:text-gray-900">
                  리뷰
                </a>
                <a href={`/${locale}/trending`} className="text-gray-600 hover:text-gray-900">
                  트렌딩
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
              <p>© 2026 SEO 블로그. All rights reserved.</p>
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
