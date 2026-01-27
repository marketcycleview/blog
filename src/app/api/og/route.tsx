import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

// 카테고리별 설정
const categoryConfig: Record<string, { color: string; icon: string; bgGradient: string }> = {
  subsidy: {
    color: "#2563eb",
    icon: "💰",
    bgGradient: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
  },
  review: {
    color: "#ea580c",
    icon: "⭐",
    bgGradient: "linear-gradient(135deg, #c2410c 0%, #fb923c 100%)",
  },
  trending: {
    color: "#dc2626",
    icon: "🔥",
    bgGradient: "linear-gradient(135deg, #991b1b 0%, #f87171 100%)",
  },
  default: {
    color: "#4b5563",
    icon: "📄",
    bgGradient: "linear-gradient(135deg, #374151 0%, #6b7280 100%)",
  },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || "InfoTalker";
  const description = searchParams.get("description") || "";
  const category = searchParams.get("category") || "default";

  const config = categoryConfig[category] || categoryConfig.default;

  // 제목이 너무 길면 자르기
  const displayTitle = title.length > 40 ? title.slice(0, 40) + "..." : title;
  const displayDesc = description.length > 60 ? description.slice(0, 60) + "..." : description;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          background: config.bgGradient,
          fontFamily: "sans-serif",
        }}
      >
        {/* 상단: 로고 + 카테고리 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "white",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            InfoTalker
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              padding: "8px 20px",
              borderRadius: "20px",
              color: "white",
              fontSize: 20,
            }}
          >
            {config.icon} {category === "subsidy" ? "지원금" : category === "review" ? "리뷰" : category === "trending" ? "트렌딩" : "정보"}
          </div>
        </div>

        {/* 중앙: 제목 + 설명 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.2,
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            {displayTitle}
          </div>
          {displayDesc && (
            <div
              style={{
                fontSize: 28,
                color: "rgba(255, 255, 255, 0.85)",
                lineHeight: 1.4,
              }}
            >
              {displayDesc}
            </div>
          )}
        </div>

        {/* 하단: 사이트 URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: 24,
          }}
        >
          infotalker.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
