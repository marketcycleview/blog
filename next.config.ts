import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 다국어 지원
  i18n: undefined, // App Router에서는 미들웨어로 처리

  // MDX 지원
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // 이미지 최적화
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // 삭제/변경된 URL 리다이렉트
  async redirects() {
    return [
      {
        source: "/ko/subsidy/2026-sileop-geupyeo",
        destination: "/ko/subsidy/2026-silup-geupyeo",
        permanent: true,
      },
      {
        source: "/ko/subsidy/2026-ai-dolbom-service",
        destination: "/ko/subsidy/2026-aidolbom-service",
        permanent: true,
      },
      {
        source: "/ko/subsidy/2026-cheosmansam-iyonggwon",
        destination: "/ko/subsidy/2026-cheotmannam-iyonggwon",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
