import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["ko", "en"];
const defaultLocale = "ko";

function getLocale(request: NextRequest): string {
  // Accept-Language 헤더에서 언어 감지
  const acceptLanguage = request.headers.get("accept-language");

  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim().substring(0, 2))
      .find((lang) => locales.includes(lang));

    if (preferredLocale) {
      return preferredLocale;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 이미 로케일이 있는 경로는 그대로 진행
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // 정적 파일, API 등은 리다이렉트하지 않음
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // 파일 확장자가 있는 경우 (favicon.ico 등)
  ) {
    return NextResponse.next();
  }

  // 루트 경로 또는 로케일 없는 경로 → 기본 로케일로 리다이렉트
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // 정적 파일 및 API 제외
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
