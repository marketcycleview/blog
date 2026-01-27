import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

// 카테고리별 설정
const categoryConfig: Record<string, { icon: string; bgGradient: string }> = {
  subsidy: {
    icon: "💰",
    bgGradient: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
  },
  review: {
    icon: "⭐",
    bgGradient: "linear-gradient(135deg, #c2410c 0%, #fb923c 100%)",
  },
  trending: {
    icon: "🔥",
    bgGradient: "linear-gradient(135deg, #991b1b 0%, #f87171 100%)",
  },
  default: {
    icon: "📄",
    bgGradient: "linear-gradient(135deg, #374151 0%, #6b7280 100%)",
  },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || "InfoTalker";
  const category = searchParams.get("category") || "default";

  const config = categoryConfig[category] || categoryConfig.default;

  // 제목 간단하게 처리 (30자 이내로)
  const shortTitle = title.length > 30 ? title.slice(0, 30) + "..." : title;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          background: config.bgGradient,
          fontFamily: "sans-serif",
        }}
      >
        {/* 아이콘 */}
        <div
          style={{
            fontSize: 80,
            marginBottom: "20px",
          }}
        >
          {config.icon}
        </div>

        {/* 제목 - 크고 심플하게 */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            lineHeight: 1.3,
            textShadow: "0 4px 20px rgba(0,0,0,0.3)",
            maxWidth: "90%",
          }}
        >
          {shortTitle}
        </div>

        {/* 하단: 사이트명 */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            right: "40px",
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          InfoTalker
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
