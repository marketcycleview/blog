import { NextRequest, NextResponse } from "next/server";
import type { CommercialData, Store } from "@/lib/tools/commercial/types";

const ENDPOINT = "https://apis.data.go.kr/B553077/api/open/sdsc2";

function safeText(val: unknown): string {
  if (val === null || val === undefined) return "";
  return String(val).trim();
}

function parseStore(item: any): Store {
  return {
    id: safeText(item.bizesId),
    name: safeText(item.bizesNm),
    category: safeText(item.indsLclsNm),
    subCategory: safeText(item.indsSclsNm) || safeText(item.indsMclsNm),
    address: safeText(item.lnoAdr) || safeText(item.rdnmAdr) || "",
    lat: parseFloat(item.lat) || 0,
    lng: parseFloat(item.lon) || 0,
    phone: safeText(item.telNo) || undefined,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cx = searchParams.get("cx") || "";
  const cy = searchParams.get("cy") || "";
  const radius = searchParams.get("radius") || "1000";
  const categoryCode = searchParams.get("category") || "";

  const apiKey = process.env.COMMERCIAL_DISTRICT_API_KEY;
  if (!apiKey || !cx || !cy) {
    const empty: CommercialData = { stores: [], totalCount: 0, updatedAt: new Date().toISOString(), isLive: false };
    return NextResponse.json(empty);
  }

  try {
    // 반경내 상가업소 조회 (페이지네이션으로 전체 수집)
    const allStores: Store[] = [];
    let totalCount = 0;
    const maxPages = 5; // 최대 5페이지 = 5000건

    for (let p = 1; p <= maxPages; p++) {
      const url = new URL(`${ENDPOINT}/storeListInRadius`);
      url.searchParams.set("serviceKey", apiKey);
      url.searchParams.set("radius", radius);
      url.searchParams.set("cx", cx);
      url.searchParams.set("cy", cy);
      url.searchParams.set("pageNo", String(p));
      url.searchParams.set("numOfRows", "1000");
      url.searchParams.set("type", "json");

      if (categoryCode) {
        url.searchParams.set("indsLclsCd", categoryCode);
      }

      const res = await fetch(url.toString(), { next: { revalidate: 86400 } });
      if (!res.ok) break;

      const json = await res.json();
      const items = json?.body?.items || [];
      totalCount = json?.body?.totalCount || totalCount;

      const stores = items.map(parseStore).filter((s: Store) => s.lat > 0 && s.lng > 0);
      allStores.push(...stores);

      // 다 가져왔으면 중단
      if (allStores.length >= totalCount || items.length === 0) break;
    }

    const data: CommercialData = {
      stores: allStores,
      totalCount,
      updatedAt: new Date().toISOString(),
      isLive: true,
      regionName: allStores[0]?.address?.split(" ").slice(0, 3).join(" ") || "",
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
