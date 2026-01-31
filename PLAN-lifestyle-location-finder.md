# 라이프스타일 맞춤 거주지 추천 도구 - 확장 계획

## 현재 상태 (2026-01-31)

**전국 17개 시/도 134개 지역 구 단위 분석 완료. 배포 완료 상태.**

---

## 파일 구조

```
src/lib/tools/lifestyle/
├── types.ts          # RegionCode (17개 시/도), DistrictScores, LifestyleData, UserPreference, ScoredDistrict
├── districts.ts      # ALL_DISTRICTS(134개), REGIONS(18개 탭), 사전점수 3종, DISTRICT_DESCRIPTIONS
├── categories.ts     # CATEGORY_GROUPS(8), ALL_CATEGORIES(43), PRESETS(7), CATEGORY_MAP
└── scoring.ts        # normalizeScores, calculateScores, rankDistricts

src/components/tools/map/
├── LifestyleLocationFinder.tsx  # 메인 UI 컴포넌트 (프리셋, 카테고리, 지도, 랭킹, 상세패널)
└── KakaoMap.tsx                 # 카카오맵 래퍼

src/app/[locale]/tools/lifestyle-location-finder/
└── page.tsx                     # 페이지 (SSG, 메타데이터, SEO 콘텐츠)

scripts/
└── collect-lifestyle-data.ts    # 카카오 Local REST API 데이터 수집 (--only 옵션 지원)

public/data/
└── lifestyle-scores.json        # 수집된 POI 데이터 (134개 지역 × 43개 카테고리)
```

---

## 완료된 단계

### Stage 1: 서울 25개 구 ✅
### Stage 2: + 경기 30 + 인천 8 = 63개 ✅
### Stage 3: + 부산 16 + 대구 8 + 광주 5 + 대전 5 + 울산 5 = 102개 ✅
### Stage 4: + 세종 1 + 충북 4 + 충남 3 + 전북 4 + 전남 3 + 경북 5 + 경남 7 + 강원 3 + 제주 2 = 134개 ✅

**지역 분포:**
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

## Stage 5: 서울 동 단위 분석 (다음 작업)

### 개요
- 서울 25개 구의 행정동(약 425개)을 추가하여 동 단위 세부 분석 제공
- 현재 구 단위 분석과 별도 레이어(드릴다운 방식)로 구현

### 핵심 설계 결정사항

**1. 데이터 구조 (JSON 분할)**
- 현재 `lifestyle-scores.json`은 구 단위 134개 → 그대로 유지
- 동 단위는 구별로 별도 JSON 파일로 분할:
  ```
  public/data/lifestyle-dong/
  ├── gangnam.json      # 강남구 22개 동
  ├── gangdong.json     # 강동구 18개 동
  ├── ...
  └── jungnang.json     # 중랑구 16개 동
  ```
- 이유: 425개를 한 파일에 넣으면 ~500KB+로 초기 로딩에 부담

**2. UI: 드릴다운 방식**
```
[구 단위 리스트 (현재)] → 구 클릭 → [해당 구의 동 리스트 표시]
```
- 구 상세 패널에 "동 단위 분석 보기" 버튼 추가
- 클릭 시 해당 구의 동 JSON을 dynamic import로 로드
- 지도도 해당 구 줌인 + 동 마커 표시

**3. 수집 스크립트**
- 카카오 API 반경: 구 단위 3km → 동 단위 1~1.5km로 축소
- 서울 행정동 좌표 목록 필요 (별도 데이터)
- `--dong gangnam` 같은 옵션으로 구별 수집
- 예상: 425동 × 43카테고리 = ~18,000 API 호출 (약 33분)

**4. 구현 순서**
1. 서울 425개 행정동 좌표 데이터 수집/정리
2. 동 단위 수집 스크립트 작성 (반경 축소, 구별 JSON 분할 저장)
3. 동 데이터 타입 정의 (DongScores 등)
4. 동 단위 점수 계산 로직 (구 단위와 동일 알고리즘, 동 내부에서 정규화)
5. UI: 구 상세 패널에 "동 분석" 드릴다운 추가
6. 데이터 수집 실행 (25개 구 순차적으로)
7. page.tsx SEO 업데이트

### 주의사항
- 지도 마커: 한 구의 동(15~25개)만 표시 → 성능 문제 없음
- 정규화: 동 단위는 해당 구 내에서 정규화 (전국 비교 X, 구 내 비교)
- 사전 점수(RIVER/NATURE_RATIO/BUS): 동 단위는 생략하거나, 구 점수를 그대로 사용
