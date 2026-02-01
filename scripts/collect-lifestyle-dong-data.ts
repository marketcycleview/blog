/**
 * 행정동 라이프스타일 데이터 수집 스크립트 (서울 + 경기도)
 * 카카오 Local REST API로 동별 POI 카운트를 수집합니다.
 *
 * 사용법:
 *   npx tsx scripts/collect-lifestyle-dong-data.ts                          # 전체 수집 (서울 25구 + 경기 17구)
 *   npx tsx scripts/collect-lifestyle-dong-data.ts --gu gangnam             # 서울 강남구만 수집
 *   npx tsx scripts/collect-lifestyle-dong-data.ts --gu sn_bundang yi_suji  # 경기 특정 구 수집
 *
 * 출력: public/data/lifestyle-dong/{guCode}.json (구별 분할 저장)
 *
 * 필요 환경변수: KAKAO_REST_API_KEY (.env.local)
 */

import fs from "fs";
import path from "path";
import { SEOUL_DONGS, GU_NAMES } from "../src/lib/tools/lifestyle/seoul-dongs";
import { GYEONGGI_DONGS, GYEONGGI_GU_NAMES } from "../src/lib/tools/lifestyle/gyeonggi-dongs";

// 서울 + 경기 통합 데이터
const ALL_DONGS: Record<string, import("../src/lib/tools/lifestyle/seoul-dongs").DongInfo[]> = {
  ...SEOUL_DONGS,
  ...GYEONGGI_DONGS,
};

const ALL_GU_NAMES: Record<string, string> = {
  ...GU_NAMES,
  ...GYEONGGI_GU_NAMES,
};

// ──────────────────────────────────────────────────────────
// 카테고리 검색 정의 (구 단위 스크립트와 동일)
// ──────────────────────────────────────────────────────────

interface SearchDef {
  id: string;
  type: "keyword" | "category" | "inverse";
  query: string;
}

const SEARCH_DEFS: SearchDef[] = [
  { id: "park", type: "keyword", query: "공원" },
  { id: "mountain", type: "keyword", query: "등산로" },
  { id: "trail", type: "keyword", query: "산책로 둘레길" },
  { id: "bike_road", type: "keyword", query: "자전거도로 자전거길" },
  { id: "gym", type: "keyword", query: "헬스장 피트니스" },
  { id: "swimming", type: "keyword", query: "수영장" },
  { id: "yoga", type: "keyword", query: "요가 필라테스" },
  { id: "futsal", type: "keyword", query: "풋살장 축구장" },
  { id: "tennis", type: "keyword", query: "테니스장" },
  { id: "golf", type: "keyword", query: "골프연습장 스크린골프" },
  { id: "climbing", type: "keyword", query: "클라이밍 볼더링" },
  { id: "bowling", type: "keyword", query: "볼링장" },
  { id: "cafe", type: "category", query: "CE7" },
  { id: "restaurant", type: "category", query: "FD6" },
  { id: "bakery", type: "keyword", query: "베이커리 빵집" },
  { id: "bar", type: "keyword", query: "와인바 칵테일바" },
  { id: "convenience", type: "category", query: "CS2" },
  { id: "mart", type: "category", query: "MT1" },
  { id: "market", type: "keyword", query: "전통시장 재래시장" },
  { id: "laundry", type: "keyword", query: "세탁소" },
  { id: "bank", type: "category", query: "BK9" },
  { id: "parking", type: "category", query: "PK6" },
  { id: "hospital", type: "keyword", query: "종합병원" },
  { id: "clinic", type: "category", query: "HP8" },
  { id: "pharmacy", type: "category", query: "PM9" },
  { id: "dentist", type: "keyword", query: "치과" },
  { id: "oriental", type: "keyword", query: "한의원" },
  { id: "subway", type: "category", query: "SW8" },
  { id: "ktx", type: "keyword", query: "KTX 기차역" },
  { id: "school", type: "category", query: "SC4" },
  { id: "academy", type: "category", query: "AC5" },
  { id: "kindergarten", type: "category", query: "PS3" },
  { id: "university", type: "keyword", query: "대학교" },
  { id: "library", type: "keyword", query: "도서관" },
  { id: "bookstore", type: "keyword", query: "서점" },
  { id: "cinema", type: "keyword", query: "영화관 CGV 메가박스 롯데시네마" },
  { id: "museum", type: "keyword", query: "미술관 박물관" },
  { id: "performance", type: "keyword", query: "공연장 극장" },
  { id: "quiet", type: "inverse", query: "유흥주점 노래방" },
  { id: "safe", type: "keyword", query: "경찰서 파출소" },
  { id: "vet", type: "keyword", query: "동물병원" },
  { id: "kids_cafe", type: "keyword", query: "키즈카페" },
  { id: "pediatric", type: "keyword", query: "소아과 소아청소년과" },
];

// ──────────────────────────────────────────────────────────
// API 호출 함수
// ──────────────────────────────────────────────────────────

const KAKAO_BASE = "https://dapi.kakao.com/v2/local/search";
const RADIUS = 1500; // 동 단위: 1.5km 반경 (구 단위 3km → 축소)

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function searchCategory(apiKey: string, code: string, lng: number, lat: number): Promise<number> {
  const url = `${KAKAO_BASE}/category.json?category_group_code=${code}&x=${lng}&y=${lat}&radius=${RADIUS}&sort=distance&size=1`;
  const res = await fetch(url, { headers: { Authorization: `KakaoAK ${apiKey}` } });
  if (!res.ok) { console.error(`  ❌ category ${code} → ${res.status}`); return 0; }
  const json = await res.json();
  return json.meta?.total_count ?? 0;
}

async function searchKeyword(apiKey: string, keyword: string, lng: number, lat: number): Promise<number> {
  const url = `${KAKAO_BASE}/keyword.json?query=${encodeURIComponent(keyword)}&x=${lng}&y=${lat}&radius=${RADIUS}&sort=distance&size=1`;
  const res = await fetch(url, { headers: { Authorization: `KakaoAK ${apiKey}` } });
  if (!res.ok) { console.error(`  ❌ keyword "${keyword}" → ${res.status}`); return 0; }
  const json = await res.json();
  return json.meta?.total_count ?? 0;
}

// ──────────────────────────────────────────────────────────
// 메인 수집 로직
// ──────────────────────────────────────────────────────────

async function main() {
  // .env.local에서 API 키 로드
  let apiKey = process.env.KAKAO_REST_API_KEY || "";
  if (!apiKey) {
    try {
      const envPath = path.join(process.cwd(), ".env.local");
      const envContent = fs.readFileSync(envPath, "utf-8");
      const match = envContent.match(/KAKAO_REST_API_KEY=(.+)/);
      if (match) apiKey = match[1].trim();
    } catch { /* ignore */ }
  }
  if (!apiKey) { console.error("❌ KAKAO_REST_API_KEY가 .env.local에 없습니다."); process.exit(1); }

  // --gu 옵션: 특정 구만 수집
  const args = process.argv.slice(2);
  const guIdx = args.indexOf("--gu");
  const targetGus = guIdx >= 0 ? args.slice(guIdx + 1) : Object.keys(ALL_DONGS);

  // 출력 디렉토리
  const outputDir = path.join(process.cwd(), "public", "data", "lifestyle-dong");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  // 통계 계산
  const totalDongs = targetGus.reduce((sum, gu) => sum + (ALL_DONGS[gu]?.length ?? 0), 0);
  const totalCalls = totalDongs * SEARCH_DEFS.length;

  console.log("🚀 행정동 라이프스타일 데이터 수집 시작 (서울 + 경기)");
  console.log(`   대상: ${targetGus.length}개 구, ${totalDongs}개 동`);
  console.log(`   카테고리: ${SEARCH_DEFS.length}개`);
  console.log(`   반경: ${RADIUS}m (동 단위)`);
  console.log(`   예상 API 호출: ${totalCalls}회`);
  console.log(`   예상 시간: ~${Math.ceil(totalCalls * 0.11 / 60)}분\n`);

  let globalCalls = 0;
  let guCount = 0;

  for (const guCode of targetGus) {
    const dongs = ALL_DONGS[guCode];
    if (!dongs || dongs.length === 0) {
      console.error(`❌ 알 수 없는 구: ${guCode}`);
      continue;
    }

    guCount++;
    const guName = ALL_GU_NAMES[guCode] || guCode;
    console.log(`\n📍 [${guCount}/${targetGus.length}] ${guName} (${guCode}) - ${dongs.length}개 동`);

    // 기존 데이터 로드 (부분 실패 시 재시작용)
    const outputPath = path.join(outputDir, `${guCode}.json`);
    let existingDongs: Record<string, any> = {};
    if (fs.existsSync(outputPath)) {
      try {
        const raw = JSON.parse(fs.readFileSync(outputPath, "utf-8"));
        for (const d of raw.dongs || []) {
          existingDongs[d.code] = d;
        }
        console.log(`   📂 기존 데이터: ${Object.keys(existingDongs).length}개 동`);
      } catch { /* ignore */ }
    }

    const results: Array<{
      code: string;
      name: string;
      parentCode: string;
      lat: number;
      lng: number;
      counts: Record<string, number>;
    }> = [];

    for (let i = 0; i < dongs.length; i++) {
      const dong = dongs[i];
      console.log(`   [${i + 1}/${dongs.length}] ${dong.name} (${dong.code}) 수집 중...`);
      const counts: Record<string, number> = {};

      for (const def of SEARCH_DEFS) {
        const count = def.type === "category"
          ? await searchCategory(apiKey, def.query, dong.lng, dong.lat)
          : await searchKeyword(apiKey, def.query, dong.lng, dong.lat);

        counts[def.id] = count;
        globalCalls++;
        await sleep(110);
      }

      results.push({
        code: dong.code,
        name: dong.name,
        parentCode: dong.parentCode,
        lat: dong.lat,
        lng: dong.lng,
        counts,
      });
    }

    // 기존 데이터와 병합
    for (const r of results) {
      existingDongs[r.code] = r;
    }

    // 원래 순서 유지하며 저장
    const finalDongs = dongs
      .map((d) => existingDongs[d.code])
      .filter(Boolean);

    const output = {
      updatedAt: new Date().toISOString(),
      guCode,
      guName,
      dongs: finalDongs,
    };

    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), "utf-8");
    console.log(`   ✅ ${guName} 저장 완료: ${finalDongs.length}개 동 → ${outputPath}`);
  }

  console.log(`\n✅ 전체 수집 완료!`);
  console.log(`   총 API 호출: ${globalCalls}회`);
  console.log(`   저장 위치: ${outputDir}/`);
}

main().catch((err) => { console.error("❌ 에러:", err); process.exit(1); });
