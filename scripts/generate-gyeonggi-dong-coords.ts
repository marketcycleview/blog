/**
 * 경기도 주요 시 행정동 좌표 데이터 생성 스크립트
 * 카카오 주소 검색 API로 행정동 중심 좌표를 수집합니다.
 *
 * 사용법: npx tsx scripts/generate-gyeonggi-dong-coords.ts
 *         npx tsx scripts/generate-gyeonggi-dong-coords.ts --gu sw_jangan sn_bundang
 * 출력:   src/lib/tools/lifestyle/gyeonggi-dongs.ts
 *
 * 필요 환경변수: KAKAO_REST_API_KEY (.env.local)
 */

import fs from "fs";
import path from "path";

// ──────────────────────────────────────────────────────────
// 경기도 6개 시 (17개 구) × 행정동 목록
// ──────────────────────────────────────────────────────────

interface DongDef {
  code: string;
  name: string;
}

interface GuDef {
  guName: string; // 한글 이름 (e.g. "수원 장안구")
  fullName: string; // geocoding용 (e.g. "경기도 수원시 장안구")
  dongs: DongDef[];
}

const DONG_DATA: Record<string, GuDef> = {
  // ── 수원시 4구 ──
  sw_jangan: {
    guName: "수원 장안구",
    fullName: "경기도 수원시 장안구",
    dongs: [
      { code: "pajang", name: "파장동" },
      { code: "yulcheon", name: "율천동" },
      { code: "sw_jeongja1", name: "정자1동" },
      { code: "sw_jeongja2", name: "정자2동" },
      { code: "sw_jeongja3", name: "정자3동" },
      { code: "yeonghwa", name: "영화동" },
      { code: "songjuk", name: "송죽동" },
      { code: "jowon1", name: "조원1동" },
      { code: "jowon2", name: "조원2동" },
      { code: "yeonmu", name: "연무동" },
    ],
  },
  sw_gwonseon: {
    guName: "수원 권선구",
    fullName: "경기도 수원시 권선구",
    dongs: [
      { code: "seryu1", name: "세류1동" },
      { code: "seryu2", name: "세류2동" },
      { code: "seryu3", name: "세류3동" },
      { code: "pyeong", name: "평동" },
      { code: "seodun", name: "서둔동" },
      { code: "guun", name: "구운동" },
      { code: "sw_geumgok", name: "금곡동" },
      { code: "homaesil", name: "호매실동" },
      { code: "gwonseon1", name: "권선1동" },
      { code: "gwonseon2", name: "권선2동" },
      { code: "gokseon", name: "곡선동" },
      { code: "ipbuk", name: "입북동" },
      { code: "dangsu", name: "당수동" },
    ],
  },
  sw_paldal: {
    guName: "수원 팔달구",
    fullName: "경기도 수원시 팔달구",
    dongs: [
      { code: "maegyo", name: "매교동" },
      { code: "maesan", name: "매산동" },
      { code: "sw_godeung", name: "고등동" },
      { code: "hwaseo1", name: "화서1동" },
      { code: "hwaseo2", name: "화서2동" },
      { code: "ji", name: "지동" },
      { code: "uman1", name: "우만1동" },
      { code: "uman2", name: "우만2동" },
      { code: "ingye", name: "인계동" },
      { code: "namsu", name: "남수동" },
      { code: "haenggung", name: "행궁동" },
    ],
  },
  sw_yeongtong: {
    guName: "수원 영통구",
    fullName: "경기도 수원시 영통구",
    dongs: [
      { code: "maetan1", name: "매탄1동" },
      { code: "maetan2", name: "매탄2동" },
      { code: "maetan3", name: "매탄3동" },
      { code: "maetan4", name: "매탄4동" },
      { code: "yeongtong1", name: "영통1동" },
      { code: "yeongtong2", name: "영통2동" },
      { code: "yeongtong3", name: "영통3동" },
      { code: "taejang", name: "태장동" },
      { code: "sin", name: "신동" },
      { code: "mangpo1", name: "망포1동" },
      { code: "mangpo2", name: "망포2동" },
    ],
  },

  // ── 성남시 3구 ──
  sn_sujeong: {
    guName: "성남 수정구",
    fullName: "경기도 성남시 수정구",
    dongs: [
      { code: "sinheung1", name: "신흥1동" },
      { code: "sinheung2", name: "신흥2동" },
      { code: "sinheung3", name: "신흥3동" },
      { code: "taepyeong1", name: "태평1동" },
      { code: "taepyeong2", name: "태평2동" },
      { code: "taepyeong3", name: "태평3동" },
      { code: "taepyeong4", name: "태평4동" },
      { code: "sujin1", name: "수진1동" },
      { code: "sujin2", name: "수진2동" },
      { code: "sanseong", name: "산성동" },
      { code: "dandae", name: "단대동" },
      { code: "yangji", name: "양지동" },
      { code: "bokjeong", name: "복정동" },
      { code: "sn_wirye", name: "위례동" },
      { code: "sn_siheung", name: "시흥동" },
      { code: "sn_godeung", name: "고등동" },
    ],
  },
  sn_jungwon: {
    guName: "성남 중원구",
    fullName: "경기도 성남시 중원구",
    dongs: [
      { code: "sn_seongnam", name: "성남동" },
      { code: "geumgwang1", name: "금광1동" },
      { code: "geumgwang2", name: "금광2동" },
      { code: "eunhaeng1", name: "은행1동" },
      { code: "eunhaeng2", name: "은행2동" },
      { code: "sangdaewon1", name: "상대원1동" },
      { code: "sangdaewon2", name: "상대원2동" },
      { code: "sangdaewon3", name: "상대원3동" },
      { code: "hadaewon", name: "하대원동" },
      { code: "dochon", name: "도촌동" },
    ],
  },
  sn_bundang: {
    guName: "성남 분당구",
    fullName: "경기도 성남시 분당구",
    dongs: [
      { code: "bundang", name: "분당동" },
      { code: "sunae1", name: "수내1동" },
      { code: "sunae2", name: "수내2동" },
      { code: "sunae3", name: "수내3동" },
      { code: "bd_jeongja1", name: "정자1동" },
      { code: "bd_jeongja2", name: "정자2동" },
      { code: "bd_jeongja3", name: "정자3동" },
      { code: "seohyeon1", name: "서현1동" },
      { code: "seohyeon2", name: "서현2동" },
      { code: "imae1", name: "이매1동" },
      { code: "imae2", name: "이매2동" },
      { code: "yatap1", name: "야탑1동" },
      { code: "yatap2", name: "야탑2동" },
      { code: "yatap3", name: "야탑3동" },
      { code: "pangyo", name: "판교동" },
      { code: "sampyeong", name: "삼평동" },
      { code: "unjung", name: "운중동" },
      { code: "baekhyeon", name: "백현동" },
      { code: "gumi1", name: "구미1동" },
      { code: "gumi", name: "구미동" },
      { code: "bd_geumgok", name: "금곡동" },
    ],
  },

  // ── 고양시 3구 ──
  gy_deogyang: {
    guName: "고양 덕양구",
    fullName: "경기도 고양시 덕양구",
    dongs: [
      { code: "jugyo", name: "주교동" },
      { code: "wonsin", name: "원신동" },
      { code: "heungdo", name: "흥도동" },
      { code: "seongsa1", name: "성사1동" },
      { code: "seongsa2", name: "성사2동" },
      { code: "hwajeong1", name: "화정1동" },
      { code: "hwajeong2", name: "화정2동" },
      { code: "haengju", name: "행주동" },
      { code: "dy_sinwon", name: "신원동" },
      { code: "wondang", name: "원당동" },
      { code: "haengsin1", name: "행신1동" },
      { code: "haengsin2", name: "행신2동" },
      { code: "haengsin3", name: "행신3동" },
      { code: "neunggok", name: "능곡동" },
      { code: "hwajeon", name: "화전동" },
      { code: "daedeok", name: "대덕동" },
      { code: "gwansan", name: "관산동" },
      { code: "ogeum", name: "오금동" },
      { code: "samsong", name: "삼송동" },
    ],
  },
  gy_ilsandong: {
    guName: "고양 일산동구",
    fullName: "경기도 고양시 일산동구",
    dongs: [
      { code: "madu1", name: "마두1동" },
      { code: "madu2", name: "마두2동" },
      { code: "baekseok1", name: "백석1동" },
      { code: "baekseok2", name: "백석2동" },
      { code: "janghang1", name: "장항1동" },
      { code: "janghang2", name: "장항2동" },
      { code: "jeongbalsan", name: "정발산동" },
      { code: "siksa", name: "식사동" },
      { code: "pungsan", name: "풍산동" },
      { code: "jungsan", name: "중산동" },
    ],
  },
  gy_ilsanseo: {
    guName: "고양 일산서구",
    fullName: "경기도 고양시 일산서구",
    dongs: [
      { code: "ilsan1", name: "일산1동" },
      { code: "ilsan2", name: "일산2동" },
      { code: "ilsan3", name: "일산3동" },
      { code: "juyeop1", name: "주엽1동" },
      { code: "juyeop2", name: "주엽2동" },
      { code: "tanhyeon1", name: "탄현1동" },
      { code: "tanhyeon2", name: "탄현2동" },
      { code: "daehwa", name: "대화동" },
      { code: "songpo", name: "송포동" },
      { code: "songsan", name: "송산동" },
      { code: "deogi", name: "덕이동" },
    ],
  },

  // ── 용인시 3구 ──
  yi_cheoin: {
    guName: "용인 처인구",
    fullName: "경기도 용인시 처인구",
    dongs: [
      { code: "yi_jungang", name: "중앙동" },
      { code: "yeokbuk", name: "역북동" },
      { code: "yi_dongbu", name: "동부동" },
      { code: "yurim", name: "유림동" },
    ],
  },
  yi_giheung: {
    guName: "용인 기흥구",
    fullName: "경기도 용인시 기흥구",
    dongs: [
      { code: "singal", name: "신갈동" },
      { code: "gugal", name: "구갈동" },
      { code: "sanggal", name: "상갈동" },
      { code: "bora", name: "보라동" },
      { code: "guseong", name: "구성동" },
      { code: "mabuk", name: "마북동" },
      { code: "dongbaek1", name: "동백1동" },
      { code: "dongbaek2", name: "동백2동" },
      { code: "dongbaek3", name: "동백3동" },
      { code: "gi_jung", name: "중동" },
      { code: "sangha", name: "상하동" },
      { code: "bojeong", name: "보정동" },
      { code: "eonnam", name: "언남동" },
      { code: "yeongdeok", name: "영덕동" },
    ],
  },
  yi_suji: {
    guName: "용인 수지구",
    fullName: "경기도 용인시 수지구",
    dongs: [
      { code: "pungdeokcheon1", name: "풍덕천1동" },
      { code: "pungdeokcheon2", name: "풍덕천2동" },
      { code: "sinbong", name: "신봉동" },
      { code: "jukjeon1", name: "죽전1동" },
      { code: "jukjeon2", name: "죽전2동" },
      { code: "dongcheon", name: "동천동" },
      { code: "seongbok", name: "성복동" },
      { code: "sanghyeon1", name: "상현1동" },
      { code: "sanghyeon2", name: "상현2동" },
      { code: "sanghyeon3", name: "상현3동" },
    ],
  },

  // ── 안산시 2구 ──
  as_sangnok: {
    guName: "안산 상록구",
    fullName: "경기도 안산시 상록구",
    dongs: [
      { code: "as_il", name: "일동" },
      { code: "as_i", name: "이동" },
      { code: "as_sa", name: "사동" },
      { code: "bono1", name: "본오1동" },
      { code: "bono2", name: "본오2동" },
      { code: "bono3", name: "본오3동" },
      { code: "banwol", name: "반월동" },
      { code: "geongeon", name: "건건동" },
      { code: "sasa", name: "사사동" },
      { code: "as_ansan", name: "안산동" },
      { code: "wolpi", name: "월피동" },
      { code: "bugok", name: "부곡동" },
    ],
  },
  as_danwon: {
    guName: "안산 단원구",
    fullName: "경기도 안산시 단원구",
    dongs: [
      { code: "gojan1", name: "고잔1동" },
      { code: "gojan2", name: "고잔2동" },
      { code: "wa", name: "와동" },
      { code: "choji", name: "초지동" },
      { code: "wongokbon", name: "원곡본동" },
      { code: "wonsi", name: "원시동" },
      { code: "seonbu1", name: "선부1동" },
      { code: "seonbu2", name: "선부2동" },
      { code: "seonbu3", name: "선부3동" },
      { code: "daebu", name: "대부동" },
      { code: "hosu", name: "호수동" },
    ],
  },

  // ── 안양시 2구 ──
  ay_manan: {
    guName: "안양 만안구",
    fullName: "경기도 안양시 만안구",
    dongs: [
      { code: "anyang1", name: "안양1동" },
      { code: "anyang2", name: "안양2동" },
      { code: "anyang3", name: "안양3동" },
      { code: "anyang4", name: "안양4동" },
      { code: "anyang5", name: "안양5동" },
      { code: "anyang6", name: "안양6동" },
      { code: "anyang7", name: "안양7동" },
      { code: "anyang8", name: "안양8동" },
      { code: "anyang9", name: "안양9동" },
      { code: "seoksu1", name: "석수1동" },
      { code: "seoksu2", name: "석수2동" },
      { code: "seoksu3", name: "석수3동" },
      { code: "bakdal1", name: "박달1동" },
      { code: "bakdal2", name: "박달2동" },
      { code: "bakdal3", name: "박달3동" },
      { code: "bakdal4", name: "박달4동" },
      { code: "bakdal5", name: "박달5동" },
      { code: "bakdal6", name: "박달6동" },
    ],
  },
  ay_dongan: {
    guName: "안양 동안구",
    fullName: "경기도 안양시 동안구",
    dongs: [
      { code: "bisan1", name: "비산1동" },
      { code: "bisan2", name: "비산2동" },
      { code: "bisan3", name: "비산3동" },
      { code: "gwanyang1", name: "관양1동" },
      { code: "gwanyang2", name: "관양2동" },
      { code: "burim", name: "부림동" },
      { code: "buheung", name: "부흥동" },
      { code: "daran", name: "달안동" },
      { code: "pyeongchon", name: "평촌동" },
      { code: "hogye1", name: "호계1동" },
      { code: "hogye2", name: "호계2동" },
      { code: "hogye3", name: "호계3동" },
      { code: "beomgye", name: "범계동" },
    ],
  },
};

// ──────────────────────────────────────────────────────────
// 카카오 주소 검색 API
// ──────────────────────────────────────────────────────────

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function geocodeDong(
  apiKey: string,
  fullGuName: string,
  dongName: string
): Promise<{ lat: number; lng: number } | null> {
  const query = encodeURIComponent(`${fullGuName} ${dongName}`);
  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${query}&size=1`;
  try {
    const res = await fetch(url, {
      headers: { Authorization: `KakaoAK ${apiKey}` },
    });
    if (!res.ok) {
      console.error(`  ❌ geocode failed: ${fullGuName} ${dongName} → ${res.status}`);
      return null;
    }
    const json = await res.json();
    const doc = json.documents?.[0];
    if (!doc) {
      return geocodeDongKeyword(apiKey, fullGuName, dongName);
    }
    return { lat: parseFloat(doc.y), lng: parseFloat(doc.x) };
  } catch (err) {
    console.error(`  ❌ geocode error: ${fullGuName} ${dongName}`, err);
    return null;
  }
}

async function geocodeDongKeyword(
  apiKey: string,
  fullGuName: string,
  dongName: string
): Promise<{ lat: number; lng: number } | null> {
  // 주민센터 키워드로 검색 (더 정확한 위치)
  const shortName = fullGuName.replace("경기도 ", "");
  const query = encodeURIComponent(`${shortName} ${dongName} 주민센터`);
  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&size=1`;
  try {
    const res = await fetch(url, {
      headers: { Authorization: `KakaoAK ${apiKey}` },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const doc = json.documents?.[0];
    if (!doc) {
      // 최후 수단: 동 이름만으로 키워드 검색
      return geocodeDongFallback(apiKey, shortName, dongName);
    }
    return { lat: parseFloat(doc.y), lng: parseFloat(doc.x) };
  } catch {
    return null;
  }
}

async function geocodeDongFallback(
  apiKey: string,
  shortGuName: string,
  dongName: string
): Promise<{ lat: number; lng: number } | null> {
  const query = encodeURIComponent(`${shortGuName} ${dongName}`);
  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&size=1`;
  try {
    const res = await fetch(url, {
      headers: { Authorization: `KakaoAK ${apiKey}` },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const doc = json.documents?.[0];
    if (!doc) return null;
    return { lat: parseFloat(doc.y), lng: parseFloat(doc.x) };
  } catch {
    return null;
  }
}

// ──────────────────────────────────────────────────────────
// 메인
// ──────────────────────────────────────────────────────────

async function main() {
  // API 키 로드
  let apiKey = process.env.KAKAO_REST_API_KEY || "";
  if (!apiKey) {
    try {
      const envPath = path.join(process.cwd(), ".env.local");
      const envContent = fs.readFileSync(envPath, "utf-8");
      const match = envContent.match(/KAKAO_REST_API_KEY=(.+)/);
      if (match) apiKey = match[1].trim();
    } catch { /* ignore */ }
  }
  if (!apiKey) {
    console.error("❌ KAKAO_REST_API_KEY가 .env.local에 없습니다.");
    process.exit(1);
  }

  // --gu 옵션: 특정 구만 수집
  const args = process.argv.slice(2);
  const guIdx = args.indexOf("--gu");
  const targetGus = guIdx >= 0 ? args.slice(guIdx + 1) : null;

  // 기존 좌표 데이터 로드 (부분 수집 시 병합용)
  const outputPath = path.join(process.cwd(), "src", "lib", "tools", "lifestyle", "gyeonggi-dongs.ts");
  let existingCoords: Record<string, Record<string, { lat: number; lng: number }>> = {};
  if (targetGus && fs.existsSync(outputPath)) {
    try {
      const content = fs.readFileSync(outputPath, "utf-8");
      const matches = content.matchAll(/code: "([^"]+)",\s*name: "[^"]+",\s*parentCode: "([^"]+)",\s*lat: ([\d.]+),\s*lng: ([\d.]+)/g);
      for (const m of matches) {
        const [, code, parent, lat, lng] = m;
        if (!existingCoords[parent]) existingCoords[parent] = {};
        existingCoords[parent][code] = { lat: parseFloat(lat), lng: parseFloat(lng) };
      }
      console.log(`📂 기존 좌표 데이터 로드 완료\n`);
    } catch { /* ignore */ }
  }

  const guCodes = targetGus || Object.keys(DONG_DATA);
  const totalDongs = guCodes.reduce((sum, gu) => sum + (DONG_DATA[gu]?.dongs.length ?? 0), 0);

  console.log("🚀 경기도 행정동 좌표 수집 시작");
  console.log(`   대상: ${guCodes.length}개 구, ${totalDongs}개 동`);
  console.log(`   예상 API 호출: ${totalDongs}~${totalDongs * 3}회\n`);

  // 좌표 수집
  const results: Record<string, Array<{ code: string; name: string; parentCode: string; lat: number; lng: number }>> = {};
  let success = 0;
  let failed = 0;

  for (const guCode of guCodes) {
    const gu = DONG_DATA[guCode];
    if (!gu) { console.error(`❌ 알 수 없는 구: ${guCode}`); continue; }

    console.log(`📍 ${gu.guName} (${guCode}) - ${gu.dongs.length}개 동`);
    results[guCode] = [];

    for (const dong of gu.dongs) {
      const coords = await geocodeDong(apiKey, gu.fullName, dong.name);
      await sleep(100);

      if (coords) {
        results[guCode].push({
          code: dong.code,
          name: dong.name,
          parentCode: guCode,
          lat: coords.lat,
          lng: coords.lng,
        });
        success++;
        console.log(`   ✅ ${dong.name} → ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`);
      } else {
        failed++;
        console.log(`   ❌ ${dong.name} → 좌표 수집 실패`);
      }
    }
    console.log();
  }

  // 기존 데이터와 병합
  for (const [guCode, gu] of Object.entries(DONG_DATA)) {
    if (results[guCode]) continue;
    if (!existingCoords[guCode]) continue;

    results[guCode] = gu.dongs
      .filter((d) => existingCoords[guCode]?.[d.code])
      .map((d) => ({
        code: d.code,
        name: d.name,
        parentCode: guCode,
        lat: existingCoords[guCode][d.code].lat,
        lng: existingCoords[guCode][d.code].lng,
      }));
  }

  // TypeScript 파일 생성
  const guEntries = Object.keys(DONG_DATA)
    .filter((guCode) => results[guCode]?.length)
    .map((guCode) => {
      const dongs = results[guCode]
        .map(
          (d) =>
            `    { code: "${d.code}", name: "${d.name}", parentCode: "${d.parentCode}", lat: ${d.lat}, lng: ${d.lng} },`
        )
        .join("\n");
      return `  ${guCode}: [\n${dongs}\n  ],`;
    })
    .join("\n");

  const guNameEntries = Object.entries(DONG_DATA)
    .map(([code, gu]) => `  ${code}: "${gu.guName}",`)
    .join("\n");

  const output = `/**
 * 경기도 주요 시 행정동 좌표 데이터 (자동 생성)
 * 생성일: ${new Date().toISOString()}
 * 생성 스크립트: scripts/generate-gyeonggi-dong-coords.ts
 */

import type { DongInfo } from "./seoul-dongs";

/** 구 코드 → 한글 이름 */
export const GYEONGGI_GU_NAMES: Record<string, string> = {
${guNameEntries}
};

/** 구별 행정동 좌표 데이터 */
export const GYEONGGI_DONGS: Record<string, DongInfo[]> = {
${guEntries}
};

/** 전체 동 수 */
export const GYEONGGI_TOTAL_DONG_COUNT = Object.values(GYEONGGI_DONGS).reduce((sum, dongs) => sum + dongs.length, 0);
`;

  fs.writeFileSync(outputPath, output, "utf-8");

  console.log(`✅ 좌표 수집 완료!`);
  console.log(`   성공: ${success}개, 실패: ${failed}개`);
  console.log(`   저장: ${outputPath}`);
}

main().catch((err) => {
  console.error("❌ 에러:", err);
  process.exit(1);
});
