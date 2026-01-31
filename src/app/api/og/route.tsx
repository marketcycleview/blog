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

// 제목을 여러 줄로 분리하는 함수
function splitTitle(title: string): string[] {
  // 일반적인 패턴으로 분리: 연도 + 주제 + 유형

  // 1. 연도 패턴 분리 (2024년, 2025년, 2026년 등)
  const yearMatch = title.match(/^(\d{4}년?\s*)/);
  let remaining = title;
  const lines: string[] = [];

  if (yearMatch) {
    lines.push(yearMatch[1].trim());
    remaining = title.slice(yearMatch[0].length);
  }

  // 2. 끝부분 패턴 분리 (총정리, 완벽 가이드, 방법, 비교 등)
  const suffixPatterns = [
    /\s*(총정리|완벽\s*가이드|완벽정리|핵심정리|상세정리)$/,
    /\s*(신청방법|신청\s*방법|가입방법|가입\s*방법)$/,
    /\s*(비교|차이점|장단점)$/,
    /\s*(추천|순위|TOP\s*\d+)$/i,
    /\s*(후기|리뷰|실사용)$/,
  ];

  let suffix = "";
  for (const pattern of suffixPatterns) {
    const match = remaining.match(pattern);
    if (match) {
      suffix = match[1].trim();
      remaining = remaining.slice(0, -match[0].length).trim();
      break;
    }
  }

  // 3. 남은 부분이 메인 주제
  if (remaining) {
    // 너무 길면 적절히 자르기
    if (remaining.length > 15) {
      const midPoint = Math.ceil(remaining.length / 2);
      const spaceIndex = remaining.indexOf(" ", midPoint - 5);
      if (spaceIndex > 0 && spaceIndex < remaining.length - 3) {
        lines.push(remaining.slice(0, spaceIndex).trim());
        lines.push(remaining.slice(spaceIndex).trim());
      } else {
        lines.push(remaining);
      }
    } else {
      lines.push(remaining);
    }
  }

  if (suffix) {
    lines.push(suffix);
  }

  // 최소 1줄, 최대 3줄
  if (lines.length === 0) {
    return [title.slice(0, 20)];
  }

  return lines.slice(0, 3);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || "InfoTalker";
  const category = searchParams.get("category") || "default";
  const type = searchParams.get("type");

  // 사이트 대표 이미지 (type=home)
  if (type === "home") {
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
            background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #3b82f6 100%)",
            fontFamily: "sans-serif",
          }}
        >
          {/* 사이트명 */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "20px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                fontSize: 108,
                fontWeight: 800,
                color: "white",
                textShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              InfoTalker
            </div>
            <div
              style={{
                fontSize: 52,
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.75)",
              }}
            >
              인포토커
            </div>
          </div>

          {/* 태그라인 */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "white",
              marginBottom: "28px",
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            내 돈 챙기기, 여기서 시작
          </div>

          {/* 카테고리 */}
          <div
            style={{
              fontSize: 34,
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.65)",
              letterSpacing: "3px",
            }}
          >
            복지 · 금융 · 세금 · 부동산 · 커리어 · 법률 · 창업
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }

  const config = categoryConfig[category] || categoryConfig.default;

  // 제목을 여러 줄로 분리
  const titleLines = splitTitle(title);

  // 줄 수에 따라 폰트 크기 조정
  const getFontSize = (lineIndex: number, totalLines: number): number => {
    if (totalLines === 1) return 100;
    if (totalLines === 2) {
      return lineIndex === 0 ? 80 : 92;
    }
    // 3줄: 첫 줄(연도) 작게, 가운데(주제) 크게, 마지막(유형) 중간
    if (lineIndex === 0) return 72;
    if (lineIndex === 1) return 92;
    return 76;
  };

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
        {/* 제목 - 여러 줄 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "0 80px",
          }}
        >
          {titleLines.map((line, index) => (
            <div
              key={index}
              style={{
                fontSize: getFontSize(index, titleLines.length),
                fontWeight: index === 1 || titleLines.length === 1 ? 800 : 700,
                color: "white",
                textAlign: "center",
                lineHeight: 1.3,
                textShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              {line}
            </div>
          ))}
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
