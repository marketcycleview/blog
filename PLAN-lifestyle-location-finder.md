# 라이프스타일 맞춤 거주지 추천 도구 - 확장 계획

## 현재 상태 (2026-02-01)

**전국 134개 지역 구 단위 + 서울·경기 42개 구 행정동 단위 분석 완료.**

---

## 파일 구조

```
src/lib/tools/lifestyle/
├── types.ts          # RegionCode, DistrictScores, ScoredDistrict, DongScores, DongLifestyleData, ScoredDong
├── districts.ts      # ALL_DISTRICTS(134개), REGIONS(18개 탭), 사전점수 3종, DISTRICT_DESCRIPTIONS
├── categories.ts     # CATEGORY_GROUPS(8), ALL_CATEGORIES(43), PRESETS(7), CATEGORY_MAP
├── scoring.ts        # normalizeScores, calculateScores, rankDistricts, calculateDongScores, rankDongs
├── seoul-dongs.ts    # 서울 422개 행정동 좌표 데이터 (자동 생성)
└── gyeonggi-dongs.ts # 경기 213개 행정동 좌표 데이터 (자동 생성)

src/components/tools/map/
├── LifestyleLocationFinder.tsx  # 메인 UI (프리셋, 카테고리, 지도, 랭킹, 상세패널, 동 드릴다운)
└── KakaoMap.tsx                 # 카카오맵 래퍼

src/app/[locale]/tools/lifestyle-location-finder/
└── page.tsx                     # 페이지 (SSG, 메타데이터, SEO 콘텐츠)

scripts/
├── collect-lifestyle-data.ts          # 구 단위 카카오 API 수집 (--only 옵션)
├── generate-seoul-dong-coords.ts      # 서울 동 좌표 geocoding 생성 (--gu 옵션)
├── generate-gyeonggi-dong-coords.ts   # 경기 동 좌표 geocoding 생성 (--gu 옵션)
└── collect-lifestyle-dong-data.ts     # 동 단위 카카오 API 수집 (서울+경기, --gu 옵션)

public/data/
├── lifestyle-scores.json              # 구 단위 134개 지역 × 43개 카테고리
└── lifestyle-dong/                    # 동 단위 (구별 분할)
    ├── gangnam.json                   # 강남구 22개 동
    ├── gangdong.json                  # 강동구 18개 동
    ├── ...                            # (서울 25개 + 경기 17개 = 42개 파일)
    ├── jungnang.json                  # 중랑구 16개 동
    ├── sw_jangan.json                 # 수원 장안구 10개 동
    ├── sn_bundang.json                # 성남 분당구 21개 동
    ├── gy_ilsandong.json              # 고양 일산동구 10개 동
    └── ...                            # (경기 17개 파일)
```

---

## 완료된 단계

### Stage 1: 서울 25개 구 ✅
### Stage 2: + 경기 30 + 인천 8 = 63개 ✅
### Stage 3: + 부산 16 + 대구 8 + 광주 5 + 대전 5 + 울산 5 = 102개 ✅
### Stage 4: + 세종 1 + 충북 4 + 충남 3 + 전북 4 + 전남 3 + 경북 5 + 경남 7 + 강원 3 + 제주 2 = 134개 ✅

**구 단위 지역 분포:**
| 지역 | 수량 | 상세 |
|------|------|------|
| 서울 | 25 | 25개 구 |
| 경기 | 30 | 수원4, 성남3, 고양3, 용인3, 안산2, 안양2, 단일시13 |
| 인천 | 8 | 8개 구 |
| 부산 | 16 | 16개 구/군 |
| 대구 | 8 | 8개 구/군 |
| 광주 | 5 | 5개 구 |
| 대전 | 5 | 5개 구 |
| 울산 | 5 | 5개 구/군 |
| 세종 | 1 | 세종시 |
| 충북 | 4 | 청주 4구 |
| 충남 | 3 | 천안2구 + 아산 |
| 전북 | 4 | 전주2구 + 군산 + 익산 |
| 전남 | 3 | 여수 + 순천 + 목포 |
| 경북 | 5 | 포항2구 + 구미 + 경주 + 김천 |
| 경남 | 7 | 창원5구 + 김해 + 진주 |
| 강원 | 3 | 춘천 + 원주 + 강릉 |
| 제주 | 2 | 제주시 + 서귀포시 |

---

### Stage 5: 서울 422개 행정동 단위 분석 ✅

**완료일: 2026-02-01**

#### 구현 내용
- 서울 25개 구의 행정동(422개) 드릴다운 분석 기능
- 구 상세 패널에서 "동 단위 분석 보기" 버튼 → 동별 순위 + 지도 줌인

#### 구현 상세

| 단계 | 내용 | 상태 |
|------|------|------|
| 1 | 422개 행정동 좌표 수집 (카카오 geocoding API) | ✅ |
| 2 | 동 단위 수집 스크립트 (반경 1.5km, 구별 JSON 분할) | ✅ |
| 3 | 동 타입 정의 (DongScores, DongLifestyleData, ScoredDong) | ✅ |
| 4 | 동 점수 계산 로직 (구 내 정규화) | ✅ |
| 5 | UI 드릴다운 (서울 구 → 동 순위, 지도 줌인, 동 마커) | ✅ |
| 6 | 데이터 수집 (25구 × 422동 × 43카테고리 = 18,146 API 호출) | ✅ |
| 7 | SEO 업데이트 (제목, 설명, FAQ에 동 분석 반영) | ✅ |

#### 설계 결정사항
- **데이터 분할**: 구별 별도 JSON (초기 로딩 부담 방지)
- **정규화 범위**: 구 내 동끼리 비교 (전국 비교 X)
- **검색 반경**: 1.5km (구 단위 3km의 절반, 동 면적에 적합)
- **사전 점수**: 동 단위에서는 RIVER/NATURE_RATIO/BUS 미적용
- **지도**: 동 보기 시 zoom level 6으로 줌인 + 동별 마커 표시

#### 서울 동 분포 (25개 구, 422개 동)
| 구 | 동 수 | 구 | 동 수 |
|----|-------|----|-------|
| 강남구 | 22 | 마포구 | 16 |
| 강동구 | 18 | 서대문구 | 14 |
| 강북구 | 13 | 서초구 | 18 |
| 강서구 | 20 | 성동구 | 17 |
| 관악구 | 21 | 성북구 | 20 |
| 광진구 | 15 | 송파구 | 26 |
| 구로구 | 15 | 양천구 | 18 |
| 금천구 | 10 | 영등포구 | 18 |
| 노원구 | 20 | 용산구 | 16 |
| 도봉구 | 14 | 은평구 | 16 |
| 동대문구 | 14 | 종로구 | 16 |
| 동작구 | 15 | 중구 | 14 |
|  |  | 중랑구 | 16 |

---

### Stage 6: 경기도 6개 시(17개 구) 213개 행정동 단위 분석 ✅

**완료일: 2026-02-01**

#### 구현 내용
- 경기도 6개 시(수원·성남·고양·용인·안산·안양) 17개 구의 행정동(213개) 드릴다운 분석
- Stage 5 서울 동 분석과 동일한 구조/패턴 적용

#### 대상 시/구 (17개 구, 213개 동)

| 시 | 구 | 코드 | 동 수 |
|----|----|----|-------|
| 수원시 | 장안구 | sw_jangan | 10 |
| 수원시 | 권선구 | sw_gwonseon | 13 |
| 수원시 | 팔달구 | sw_paldal | 11 |
| 수원시 | 영통구 | sw_yeongtong | 11 |
| 성남시 | 수정구 | sn_sujeong | 16 |
| 성남시 | 중원구 | sn_jungwon | 10 |
| 성남시 | 분당구 | sn_bundang | 21 |
| 고양시 | 덕양구 | gy_deogyang | 19 |
| 고양시 | 일산동구 | gy_ilsandong | 10 |
| 고양시 | 일산서구 | gy_ilsanseo | 10 |
| 용인시 | 처인구 | yi_cheoin | 4 |
| 용인시 | 기흥구 | yi_giheung | 14 |
| 용인시 | 수지구 | yi_suji | 10 |
| 안산시 | 상록구 | as_sangnok | 12 |
| 안산시 | 단원구 | as_danwon | 11 |
| 안양시 | 만안구 | ay_manan | 18 |
| 안양시 | 동안구 | ay_dongan | 13 |

#### 구현 상세

| 단계 | 내용 | 상태 |
|------|------|------|
| 1 | 경기 동 목록 + 좌표 수집 스크립트 (generate-gyeonggi-dong-coords.ts) | ✅ |
| 2 | 좌표 geocoding 실행 (213/214 성공, 1건 실패) | ✅ |
| 3 | gyeonggi-dongs.ts 자동 생성 (DongInfo 재사용) | ✅ |
| 4 | collect-lifestyle-dong-data.ts 확장 (서울+경기 통합) | ✅ |
| 5 | UI 동 드릴다운 조건 변경 (region==="seoul" → DONG_SUPPORTED set) | ✅ |
| 6 | SEO 메타데이터/FAQ 업데이트 | ✅ |
| 7 | 데이터 수집 (17구 × 213동 × 43카테고리 = 9,159 API 호출) | ✅ |

#### 설계 결정사항
- **별도 파일**: gyeonggi-dongs.ts (seoul-dongs.ts의 DongInfo 인터페이스 재사용)
- **수집 스크립트 통합**: collect-lifestyle-dong-data.ts가 ALL_DONGS (서울+경기) 통합 사용
- **UI 조건**: DONG_SUPPORTED Set으로 42개 구 코드 관리 (서울 25 + 경기 17)
- **처인구 예외**: 동 4개만 존재 (읍/면 제외, 1.5km 반경 부적합)
- **좌표 실패 1건**: 일산서구 송산동 (geocoding 실패, 10/11동 수집)

#### 동 단위 분석 종합 현황
| 지역 | 구 수 | 동 수 |
|------|-------|-------|
| 서울 | 25 | 422 |
| 경기 | 17 | 213 |
| **합계** | **42** | **635** |

---

## 향후 확장 아이디어

- **Stage 7**: 실거래가/전월세 데이터 연동
- **Stage 8**: 사용자 리뷰/만족도 데이터 수집
- **Stage 9**: 출퇴근 시간 시뮬레이션 (직장 위치 입력 → 통근 고려 추천)
- **Stage 10**: 인천·부산 등 추가 광역시 동 단위 분석
