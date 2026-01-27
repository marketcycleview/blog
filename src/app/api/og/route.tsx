import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

// 카테고리별 배경색
const categoryConfig: Record<string, { bgGradient: string }> = {
  subsidy: {
    bgGradient: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
  },
  review: {
    bgGradient: "linear-gradient(135deg, #c2410c 0%, #fb923c 100%)",
  },
  trending: {
    bgGradient: "linear-gradient(135deg, #991b1b 0%, #f87171 100%)",
  },
  default: {
    bgGradient: "linear-gradient(135deg, #374151 0%, #6b7280 100%)",
  },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || "InfoTalker";
  const category = searchParams.get("category") || "default";

  const config = categoryConfig[category] || categoryConfig.default;

  // 제목 15자 이내로
  const shortTitle = title.length > 15 ? title.slice(0, 15) : title;

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
          background: config.bgGradient,
          fontFamily: "sans-serif",
        }}
      >
        {/* 제목 - 크게, 중앙 정렬 */}
        <div
          style={{
            fontSize: 90,
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            lineHeight: 1.2,
            textShadow: "0 4px 20px rgba(0,0,0,0.3)",
            padding: "0 60px",
            wordBreak: "keep-all",
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
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: 22,
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
