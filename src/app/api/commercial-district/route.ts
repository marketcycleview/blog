import { NextRequest, NextResponse } from "next/server";
import type { CommercialData, Store } from "@/lib/tools/commercial/types";

const ENDPOINT = "https://apis.data.go.kr/B553077/api/open/sdsc2";

function safeText(val: unknown): string {
  if (val === null || val === undefined) return "";
  return String(val).trim();
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dongCode = searchParams.get("dong") || "";
  const categoryCode = searchParams.get("category") || "";
  const page = searchParams.get("page") || "1";

  const apiKey = process.env.COMMERCIAL_DISTRICT_API_KEY;
  if (!apiKey || !dongCode) {
    const empty: CommercialData = { stores: [], totalCount: 0, updatedAt: new Date().toISOString(), isLive: false };
    return NextResponse.json(empty);
  }

  try {
    // 행정동 단위 상가업소 조회
    const url = new URL(`${ENDPOINT}/storeListInDong`);
    url.searchParams.set("serviceKey", apiKey);
    url.searchParams.set("divId", "adongCd");
    url.searchParams.set("key", dongCode);
    url.searchParams.set("pageNo", page);
    url.searchParams.set("numOfRows", "100");
    url.searchParams.set("type", "json");

    if (categoryCode) {
      url.searchParams.set("indsLclsCd", categoryCode);
    }

    const res = await fetch(url.toString(), { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error(`API ${res.status}`);

    const json = await res.json();
    const body = json?.body;
    const items = body?.items || [];
    const totalCount = body?.totalCount || 0;

    const stores: Store[] = items.map((item: any) => ({
      id: safeText(item.bizesId),
      name: safeText(item.bizesNm),
      category: safeText(item.indsLclsNm),
      subCategory: safeText(item.indsSclsNm) || safeText(item.indsMclsNm),
      address: safeText(item.lnoAdr) || safeText(item.rdnmAdr) || "",
      lat: parseFloat(item.lat) || 0,
      lng: parseFloat(item.lon) || 0,
      phone: safeText(item.telNo) || undefined,
    }));

    const data: CommercialData = {
      stores: stores.filter((s) => s.lat > 0 && s.lng > 0),
      totalCount,
      updatedAt: new Date().toISOString(),
      isLive: true,
      regionName: stores[0]?.address?.split(" ").slice(0, 2).join(" ") || "",
    };

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch {
    const empty: CommercialData = { stores: [], totalCount: 0, updatedAt: new Date().toISOString(), isLive: false };
    return NextResponse.json(empty);
  }
}
