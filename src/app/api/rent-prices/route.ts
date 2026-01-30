import { NextRequest, NextResponse } from "next/server";
import { fetchRentHeatmap } from "@/lib/tools/rates/rent-fetcher";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const sido = searchParams.get("sido") || "11";
  const month = searchParams.get("month") || getDefaultMonth();

  // 간단한 유효성 검사
  if (!/^\d{2}$/.test(sido) || !/^\d{6}$/.test(month)) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  const data = await fetchRentHeatmap(sido, month);
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" },
  });
}

function getDefaultMonth(): string {
  const now = new Date();
  // 2개월 전 (데이터 지연 고려)
  now.setMonth(now.getMonth() - 2);
  return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;
}
