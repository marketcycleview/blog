# 도구 개발 마스터 플랜

> **목적**: 블로그 도구(Tools) 개발 로드맵. 새 세션에서 이어서 작업할 수 있도록 상세하게 기록.
> **최종 업데이트**: 2026-01-30
> **현재 상태**: Phase 1~5 전체 완료 (30개 도구 + 5개 엔진)

---

## ⚠️ 도구 개발 시 필수 규칙

### 관련 글 목록 연결 (필수!)

도구를 만들거나 관련 콘텐츠를 작성하면, **도구 페이지 하단에 관련 글 링크 목록**을 반드시 추가해야 합니다.
도구 → 글, 글 → 도구 양방향 링크가 있어야 SEO + 체류시간이 올라갑니다.

**작업 방법:**

1. `src/lib/tools/related-articles.ts`에 해당 도구 슬러그 키로 관련 글 데이터 추가
2. 도구 페이지(`src/app/[locale]/tools/[slug]/page.tsx`)에 아래 코드 추가:
   ```tsx
   import RelatedArticles from "@/components/tools/RelatedArticles";
   // ... 페이지 끝부분, 마지막 </div> 직전에:
   <RelatedArticles toolSlug="도구-슬러그" />
   ```
3. 콘텐츠 MDX에서는 `<LinkButton href="/ko/tools/도구-슬러그" label="..." />`로 도구 페이지 연결

**관련 글 데이터 구조** (`related-articles.ts`):
```ts
"도구-슬러그": [
  {
    title: "그룹 제목",
    icon: "📊",
    articles: [
      { href: "/ko/카테고리/slug", label: "글 제목" },
    ],
  },
],
```

### 콘텐츠 양방향 링크 체크리스트

- [ ] 도구 페이지 → 관련 글 목록 (`RelatedArticles` 컴포넌트)
- [ ] 글 → 도구 페이지 (`LinkButton` 컴포넌트)
- [ ] `related-articles.ts`에 데이터 등록

---

## 📊 현황 요약

| 항목 | 수치 |
|------|------|
| 기존 도구 | 9개 (계산기 7 + 예산플래너 1 + 복지찾기 1) |
| 신규 도구 계획 | 30개 |
| **총 도구 목표** | **39개** |
| 핵심 엔진 | 5개 (재활용 가능한 공통 모듈) |
| 연결 콘텐츠 | 86개 글 (각 PLAN 파일에 이미 등록됨) |

---

## 🏗️ 기존 도구 현황 (9개)

| # | 도구 | 슬러그 | 컴포넌트 | 계산 모듈 | 상태 |
|---|------|--------|----------|-----------|------|
| 1 | 연봉 계산기 | salary-calculator | SalaryCalculator.tsx | salary.ts | ✅ 완료 |
| 2 | 대출 계산기 | loan-calculator | LoanCalculator.tsx | loan.ts | ✅ 완료 |
| 3 | 전월세 계산기 | jeonwolse-calculator | JeonwolseCalculator.tsx | jeonwolse.ts | ✅ 완료 |
| 4 | 중위소득 계산기 | median-income-calculator | MedianIncomeCalculator.tsx | median-income.ts | ✅ 완료 |
| 5 | 실업급여 계산기 | unemployment-calculator | UnemploymentCalculator.tsx | unemployment.ts | ✅ 완료 |
| 6 | 퇴직금 계산기 | severance-calculator | SeveranceCalculator.tsx | severance.ts | ✅ 완료 |
| 7 | 환급액 계산기 | tax-refund-calculator | TaxRefundCalculator.tsx | tax-refund.ts | ✅ 완료 |
| 8 | 예산 플래너 | budget-planner | (page 내장) | - | ✅ 완료 |
| 9 | 복지 정책 찾기 | welfare-finder | (page 내장) | - | ✅ 완료 |

---

## 🔧 기존 코드 구조 (새 도구 만들 때 참고)

### 파일 구조 패턴

```
src/
├── app/[locale]/tools/
│   └── [tool-slug]/
│       └── page.tsx              ← 라우트 + SEO 메타데이터 + SEO 콘텐츠
├── components/calculators/
│   ├── index.ts                  ← 모든 컴포넌트 re-export
│   └── [ToolName].tsx            ← "use client" 컴포넌트 (UI + 상태)
└── lib/calculators/
    ├── index.ts                  ← 모든 모듈 re-export
    └── [module].ts               ← 순수 계산 로직 + 타입 정의
```

### page.tsx 패턴

```tsx
import type { Metadata } from "next";
import { ToolComponent } from "@/components/calculators";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

export const metadata: Metadata = {
  title: "도구 제목 - 키워드",
  description: "155자 이내 설명",
  keywords: ["키워드1", "키워드2"],
  openGraph: {
    title: "OG 제목",
    description: "OG 설명",
    url: `${siteUrl}/ko/tools/[slug]`,
    type: "website",
  },
};

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ToolPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-3xl mx-auto">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {locale === "ko" ? "한국어 제목" : "English Title"}
        </h1>
        <p className="text-gray-600">
          {locale === "ko" ? "한국어 설명" : "English desc"}
        </p>
      </div>

      {/* 도구 컴포넌트 */}
      <ToolComponent />

      {/* SEO 콘텐츠 (1500자+) */}
      <div className="mt-16 prose prose-gray max-w-none">
        <h2>섹션 제목</h2>
        <p>내용...</p>
        <table>...</table>
      </div>
    </div>
  );
}
```

### 컴포넌트 패턴

```tsx
"use client";
import { useState, useMemo } from "react";
import { calculateFn, type ResultType } from "@/lib/calculators/module";

function formatNumber(n: number): string {
  return n.toLocaleString("ko-KR");
}

export default function ToolComponent() {
  const [input, setInput] = useState<string>("");
  const result = useMemo(() => { /* ... */ }, [input]);

  return (
    <div className="space-y-6">
      {/* 입력: bg-white border rounded-xl p-4 sm:p-6 */}
      {/* 결과: bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white */}
      {/* 상세: bg-white border rounded-xl, flex justify-between rows */}
      {/* 참고: bg-yellow-50 border border-yellow-200 rounded-lg p-4 */}
    </div>
  );
}
```

### 계산 모듈 패턴

```ts
// 상수
export const RATES_2026 = { /* ... */ };

// 타입
export interface CalculationResult { /* ... */ }

// 헬퍼
function internalCalc(v: number): number { /* ... */ }

// 메인 export
export function calculateFunction(input: number): CalculationResult { /* ... */ }
```

### 새 도구 추가 시 체크리스트

```
[ ] src/app/[locale]/tools/[slug]/page.tsx 생성
[ ] src/components/calculators/[Name].tsx 생성 (또는 components/tools/)
[ ] src/lib/calculators/[module].ts 생성 (계산 로직이 있는 경우)
[ ] src/components/calculators/index.ts에 export 추가
[ ] src/lib/calculators/index.ts에 export 추가
[ ] page.tsx에 Metadata (title, description, keywords, openGraph)
[ ] generateStaticParams() 포함 (ko, en)
[ ] SEO 콘텐츠 1500자+ (h2 3개+, 표, FAQ)
[ ] 모바일 반응형 확인
```

---

## 🎯 핵심 전략: 5대 엔진

> **원칙**: 공통 엔진을 먼저 만들고, 각 도구는 엔진 + 데이터로 조합한다.
> 5개 엔진만 잘 만들면 16개+ 도구로 확장 가능.

### 엔진 1: 문서 생성기 (Document Generator Engine)

```
용도: 폼 입력 → 서식화된 텍스트/PDF 생성
기술: React Hook Form + 클립보드 복사 + (선택) jsPDF 또는 @react-pdf/renderer
공통 컴포넌트:
  - DocumentForm: 단계별 폼 (스텝 UI)
  - DocumentPreview: 실시간 미리보기 (마크다운 렌더링)
  - DocumentActions: 복사 / 다운로드(txt, PDF) / 인쇄 버튼

재활용 대상:
  → 내용증명 작성기 (1순위)
  → 퇴사 통보서 작성기 (3순위)
  → 사업계획서 템플릿 생성기 (4순위)

파일 구조:
  src/components/tools/document-generator/
  ├── DocumentForm.tsx          ← 공통 스텝 폼
  ├── DocumentPreview.tsx       ← 실시간 미리보기
  ├── DocumentActions.tsx       ← 복사/다운로드/인쇄
  └── templates/
      ├── legal-notice.ts       ← 내용증명 템플릿 데이터
      ├── resignation.ts        ← 퇴사 통보서 템플릿 데이터
      └── business-plan.ts      ← 사업계획서 템플릿 데이터
```

### 엔진 2: 의사결정 트리 (Decision Tree Engine)

```
용도: 질문-응답 흐름 → 최종 추천 결과
기술: 상태 머신 (배열 기반 스텝) + 조건부 분기 + 결과 매핑
공통 컴포넌트:
  - DecisionWizard: 질문 카드 + 진행 표시줄
  - OptionSelector: 선택지 버튼/카드 그리드
  - ResultCard: 추천 결과 + 비교표 + 관련 글 링크

재활용 대상:
  → 나에게 맞는 대출 찾기 (1순위)
  → 분쟁 해결 경로 안내 (3순위)
  → 나에게 맞는 청약 전략 (3순위)
  → 창업 vs 프리랜서 vs 취업 진단 (4순위)

파일 구조:
  src/components/tools/decision-tree/
  ├── DecisionWizard.tsx        ← 공통 위자드 컨테이너
  ├── QuestionCard.tsx          ← 질문 표시 + 선택지
  ├── ProgressBar.tsx           ← 진행 표시줄
  ├── ResultCard.tsx            ← 결과 카드
  └── types.ts                  ← 공통 타입 (Question, Option, Result)

  src/lib/tools/decision-tree/
  ├── engine.ts                 ← 분기 로직 엔진
  └── data/
      ├── loan-finder.ts        ← 대출 찾기 질문/결과 데이터
      ├── dispute-resolver.ts   ← 분쟁 해결 질문/결과 데이터
      ├── housing-strategy.ts   ← 청약 전략 질문/결과 데이터
      └── career-path.ts        ← 커리어 경로 질문/결과 데이터
```

### 엔진 3: 타임라인 (Timeline Engine)

```
용도: 이벤트 날짜 기반 → 시간순 할 일/혜택 목록 생성
기술: 날짜 계산(date-fns) + 타임라인 UI + 체크리스트 + .ics 생성
공통 컴포넌트:
  - TimelineView: 세로 타임라인 UI (날짜 + 아이콘 + 내용)
  - TimelineChecklist: 체크박스 연동 (localStorage 저장)
  - CalendarExport: .ics 파일 생성 + 다운로드

재활용 대상:
  → 퇴사 후 할 일 타임라인 (1순위)
  → 출산/육아 혜택 타임라인 (2순위)
  → 창업 로드맵 타임라인 (3순위)

파일 구조:
  src/components/tools/timeline/
  ├── TimelineView.tsx          ← 타임라인 시각화
  ├── TimelineItem.tsx          ← 개별 아이템 (아이콘, 날짜, 내용, 체크)
  ├── CalendarExport.tsx        ← .ics 다운로드 버튼
  └── types.ts                  ← TimelineEvent, TimelineConfig 등

  src/lib/tools/timeline/
  ├── generator.ts              ← 날짜 기반 이벤트 생성 로직
  ├── ics.ts                    ← .ics 파일 포맷 생성
  └── data/
      ├── post-resignation.ts   ← 퇴사 후 이벤트 데이터
      ├── birth-parenting.ts    ← 출산/육아 이벤트 데이터
      └── startup-roadmap.ts    ← 창업 로드맵 이벤트 데이터
```

### 엔진 4: 비교 시뮬레이터 (Comparison Simulator Engine)

```
용도: 2~3개 옵션을 동일 조건에서 시뮬레이션 → 시각적 비교
기술: 병렬 계산 + Chart.js/Recharts + 슬라이더 입력
공통 컴포넌트:
  - ComparisonInput: 공통 조건 입력 (슬라이더 + 숫자)
  - ComparisonChart: 병렬 바/라인 차트
  - ComparisonTable: 항목별 비교표
  - ComparisonSummary: 승자 하이라이트 + 요약

재활용 대상:
  → 전세 vs 월세 vs 매매 시뮬레이터 (2순위)
  → 원리금균등 vs 원금균등 vs 만기일시 (3순위)
  → 국민연금 수령시기별 비교 (3순위)
  → 개인사업자 vs 법인 세금 비교 (2순위)

파일 구조:
  src/components/tools/comparator/
  ├── ComparisonInput.tsx       ← 슬라이더 + 숫자 입력
  ├── ComparisonChart.tsx       ← 병렬 차트 (bar/line 선택)
  ├── ComparisonTable.tsx       ← 비교표
  ├── ComparisonSummary.tsx     ← 결론 요약
  └── types.ts

  src/lib/tools/comparator/
  └── data/
      ├── housing-compare.ts    ← 전세/월세/매매 계산 로직
      ├── repayment-compare.ts  ← 상환방식 계산 로직
      ├── pension-compare.ts    ← 연금 수령시기 계산 로직
      └── tax-entity-compare.ts ← 개인/법인 세금 계산 로직
```

### 엔진 5: 퀴즈 (Quiz Engine)

```
용도: N문제 퀴즈 → 점수 + 등급 + SNS 공유 카드
기술: 상태 관리 + 결과 카드 생성(Canvas 또는 OG API) + Web Share API
공통 컴포넌트:
  - QuizContainer: 문제 네비게이션 + 진행률
  - QuestionView: 문제 + 선택지 (OX, 4지선다, 매칭)
  - QuizResult: 점수 + 등급 + 해설
  - ShareCard: SNS 공유용 이미지 카드 생성

재활용 대상:
  → 금융 IQ 테스트 (2순위)
  → 재무 건강 점수 (1순위) — 퀴즈 변형 (진단형)
  → 세금 상식 퀴즈 (4순위)
  → 부동산 용어 퀴즈 (4순위)

파일 구조:
  src/components/tools/quiz/
  ├── QuizContainer.tsx         ← 퀴즈 컨테이너
  ├── QuestionView.tsx          ← 문제 표시
  ├── QuizResult.tsx            ← 결과 + 등급
  ├── ShareCard.tsx             ← 공유 카드 생성
  └── types.ts                  ← Question, Answer, QuizConfig 등

  src/lib/tools/quiz/
  ├── scoring.ts                ← 점수 계산 + 등급 매핑
  └── data/
      ├── finance-iq.ts         ← 금융 IQ 문제 데이터
      ├── financial-health.ts   ← 재무 건강 진단 문제 데이터
      ├── tax-quiz.ts           ← 세금 상식 문제 데이터
      └── realestate-quiz.ts    ← 부동산 용어 문제 데이터
```

---

## 📋 전체 도구 목록 (30개) — 우선순위순

### 🔴 Phase 1 — 1순위 (핵심 엔진 확보 + 고임팩트)

> **목표**: 문서생성 엔진, 타임라인 엔진, 퀴즈/진단 엔진, 의사결정 트리 엔진 확보
> **산출물**: 5개 도구 + 4개 엔진

| # | 도구명 | 슬러그 | 엔진 | 카테고리 | 상태 |
|---|--------|--------|------|----------|------|
| 1 | 내용증명 작성기 | legal-notice-generator | 문서생성 | 법률 | ✅ 완료 |
| 2 | 연말정산 간소화 시뮬레이터 | year-end-tax-simulator | (독립 계산기) | 세금 | ✅ 완료 |
| 3 | 퇴사 후 할 일 타임라인 | post-resignation-timeline | 타임라인 | 커리어 | ✅ 완료 |
| 4 | 나의 재무 건강 점수 | financial-health-score | 퀴즈(진단) | 금융 | ✅ 완료 |
| 5 | 나에게 맞는 대출 찾기 | loan-finder | 의사결정트리 | 금융 | ✅ 완료 |

#### 도구 1: 내용증명 작성기 ★ (문서생성 엔진 첫 구현)

```
슬러그: legal-notice-generator
URL: /ko/tools/legal-notice-generator
SEO 키워드: "내용증명 작성", "내용증명 양식", "내용증명 쓰는법"

[개요]
유형 선택(임금체불, 보증금반환, 계약해지, 손해배상, 기타) →
당사자 정보 입력(발신인/수신인 이름, 주소) →
핵심 내용 입력(사건 경위, 요구사항, 기한) →
내용증명 문서 미리보기 →
복사 / 텍스트 다운로드

[입력 필드]
Step 1 - 유형 선택:
  - 임금체불 (미지급 임금 청구)
  - 보증금 반환 (전세/월세 보증금)
  - 계약 해지 (일반 계약 해지 통보)
  - 손해배상 (손해배상 청구)
  - 자유 작성 (직접 입력)

Step 2 - 당사자 정보:
  - 발신인: 이름, 주소, 연락처
  - 수신인: 이름/상호, 주소

Step 3 - 내용 입력 (유형별 분기):
  [임금체불]
    - 근무 기간 (시작일~종료일)
    - 미지급 금액
    - 지급 요구 기한
  [보증금 반환]
    - 계약 기간
    - 보증금 금액
    - 퇴거일
    - 반환 요구 기한
  [계약 해지]
    - 계약 체결일
    - 계약 내용 요약
    - 해지 사유
    - 해지 요구일
  [손해배상]
    - 사건 발생일
    - 피해 내용
    - 청구 금액
    - 이행 기한
  [자유 작성]
    - 제목
    - 본문 (자유 입력)

Step 4 - 미리보기 + 다운로드

[출력]
  - 내용증명 서식에 맞춘 텍스트 (발신인/수신인/제목/본문/날짜)
  - 복사 버튼 (클립보드)
  - .txt 다운로드
  - (선택) PDF 다운로드

[SEO 콘텐츠 섹션]
  - 내용증명이란? (정의)
  - 내용증명 보내는 방법 (우체국 방문/인터넷 우체국)
  - 내용증명 작성 시 주의사항
  - 내용증명 효력과 법적 의미
  - FAQ 5개

[관련 콘텐츠 연결]
  → /ko/legal/ 카테고리 글 연결
  → LEGAL_WRITING_PLAN.md #301~#310 도구활용 글
```

#### 도구 2: 연말정산 간소화 시뮬레이터

```
슬러그: year-end-tax-simulator
URL: /ko/tools/year-end-tax-simulator
SEO 키워드: "연말정산 계산기", "연말정산 환급액", "연말정산 시뮬레이션"

[개요]
총급여 입력 → 공제항목별 금액 입력 →
예상 결정세액 계산 → 이미 납부한 세금과 비교 →
환급/추가납부 예상액 표시 + 추가 공제 가능 항목 추천

[입력 필드]
  기본:
    - 총급여액 (연봉)
    - 부양가족 수 (본인 포함)
    - 20세 이하 자녀 수
    - 배우자 유무

  소득공제:
    - 국민연금 납입액
    - 건강보험료
    - 고용보험료
    - 주택청약 납입액
    - 신용카드 사용액
    - 체크카드/현금영수증 사용액
    - 전통시장/대중교통 사용액

  세액공제:
    - 의료비 지출액
    - 교육비 지출액
    - 기부금
    - 월세 지급액 (무주택 세대주)
    - 연금저축 납입액
    - IRP 납입액
    - 보험료 납입액

[출력]
  메인: 예상 환급액 or 추가납부액
  상세:
    - 총급여 → 근로소득금액
    - 소득공제 합계 (항목별 분해)
    - 과세표준
    - 산출세액
    - 세액공제 합계 (항목별 분해)
    - 결정세액
    - 기납부세액 (간이세액표 기준 자동 계산)
    - 차감: 환급/추가납부
  추천: "이런 공제도 가능합니다" (입력하지 않은 공제 항목 안내)

[SEO 콘텐츠 섹션]
  - 2026년 연말정산 일정
  - 소득공제 vs 세액공제 차이
  - 놓치기 쉬운 공제 항목 TOP 5
  - FAQ 5개

[계산 모듈]
  src/lib/calculators/year-end-tax.ts
  - 2026년 간이세액표
  - 소득공제 한도 계산
  - 과세표준 구간별 세율
  - 세액공제 한도 계산

[관련 콘텐츠]
  → TAX_WRITING_PLAN.md 연말정산 관련 글 전체
```

#### 도구 3: 퇴사 후 할 일 타임라인 ★ (타임라인 엔진 첫 구현)

```
슬러그: post-resignation-timeline
URL: /ko/tools/post-resignation-timeline
SEO 키워드: "퇴사 후 해야할 일", "퇴사 후 절차", "퇴사 체크리스트"

[개요]
퇴사일 입력 + 상황 선택(자발적/권고사직/해고, 재취업 예정 여부) →
날짜 기반으로 해야 할 일 타임라인 자동 생성 →
체크리스트로 진행 상황 추적 + .ics 캘린더 다운로드

[입력 필드]
  - 퇴사일 (날짜 선택)
  - 퇴사 유형: 자발적 / 권고사직 / 해고 / 계약만료
  - 근속기간: 1년 미만 / 1~3년 / 3~10년 / 10년 이상
  - 재취업 예정: 있음(입사일 입력) / 없음
  - 4대보험 가입 여부: 예 / 아니오

[생성되는 타임라인 이벤트 예시]
  D-14: 퇴사 통보 (서면)
  D-7: 업무 인수인계 완료
  D-day: 퇴사 (퇴직금/미사용연차 정산 확인)
  D+1: 건강보험 자격상실 확인
  D+7: 건강보험 임의계속 또는 지역가입자 전환 신청
  D+14: 실업급여 수급자격 신청 (해당 시)
       국민연금 납부예외/임의가입 신청
  D+30: 퇴직소득세 원천징수영수증 수령
  D+60: 주민세 변동 확인
  D+180: 실업급여 종료 (해당 시)

  (자발적 퇴사인 경우 실업급여 관련 이벤트 제외)
  (재취업 예정인 경우 4대보험 전환 이벤트 조정)

[출력]
  - 세로 타임라인 UI (날짜 | 아이콘 | 할 일 | 상세 설명)
  - 각 항목 체크박스 (localStorage 저장)
  - .ics 파일 다운로드 (구글캘린더/애플캘린더에 추가 가능)
  - 예상 수령 금액 요약 (퇴직금 + 미사용연차수당 + 실업급여)

[SEO 콘텐츠]
  - 퇴사 전 반드시 확인할 것
  - 4대보험 처리 방법
  - 실업급여 수급 조건
  - FAQ 5개

[관련 콘텐츠]
  → CAREER_WRITING_PLAN.md #306~#317 도구활용 글
  → 실업급여, 퇴직금, 건강보험 관련 글
```

#### 도구 4: 나의 재무 건강 점수 ★ (퀴즈/진단 엔진 첫 구현)

```
슬러그: financial-health-score
URL: /ko/tools/financial-health-score
SEO 키워드: "재무 건강 점수", "재무 진단", "재무 상태 체크"

[개요]
5개 영역(저축, 부채, 보험, 투자, 비상자금) × 각 3~4개 질문 →
100점 만점 점수 + 등급(A~F) + 영역별 분석 →
개선 제안 + SNS 공유 카드

[진단 영역 & 질문]
  1. 저축 (20점)
    - 월 소득 대비 저축률? (0%/10%미만/10~20%/20%이상)
    - 목적별 저축 계좌 분리? (안함/일부/완전분리)
    - 자동이체 설정? (안함/일부/전액)

  2. 부채 관리 (20점)
    - 월 소득 대비 부채 상환 비율? (없음/20%미만/20~40%/40%이상)
    - 고금리(10%+) 부채 보유? (없음/있음-상환계획있음/있음-계획없음)
    - 신용점수 확인 주기? (매월/분기/연1회/모름)

  3. 보험 (20점)
    - 실손보험 가입? (예/아니오)
    - 4대보험 가입 상태? (직장/지역/미가입)
    - 보험료가 소득의 몇%? (5%이하/5~10%/10%이상)

  4. 투자 (20점)
    - 투자 경험? (없음/예적금만/펀드ETF/주식직접)
    - 연금저축/IRP 가입? (예-한도납입/예-일부/아니오)
    - 투자 포트폴리오 분산? (안함/일부/분산완료)

  5. 비상자금 (20점)
    - 비상자금 보유 개월? (없음/1~2개월/3~5개월/6개월+)
    - 비상자금 접근성? (즉시출금/며칠소요/없음)
    - 예상치 못한 지출 대비? (전혀안됨/일부가능/충분)

[출력]
  메인: 100점 만점 점수 + 등급
    A (90~100): 재무 우등생
    B (70~89): 양호
    C (50~69): 보통 — 개선 여지 있음
    D (30~49): 주의 필요
    F (0~29): 위험 — 즉시 개선 필요

  영역별:
    - 레이더 차트 (5개 영역)
    - 각 영역 점수 + 한줄 코멘트
    - 가장 약한 영역 TOP 2 → 개선 제안 + 관련 글 링크

  공유:
    - 결과 카드 이미지 생성 (Canvas API 또는 /api/og 활용)
    - "나의 재무 건강 점수는 72점! 당신은?" 형태
    - 카카오톡/트위터/링크 공유 버튼

[SEO 콘텐츠]
  - 재무 건강이란?
  - 영역별 개선 방법
  - 연령대별 재무 건강 기준
  - FAQ 5개

[관련 콘텐츠]
  → FINANCE_WRITING_PLAN.md 금융 글 전체
```

#### 도구 5: 나에게 맞는 대출 찾기 ★ (의사결정 트리 엔진 첫 구현)

```
슬러그: loan-finder
URL: /ko/tools/loan-finder
SEO 키워드: "대출 추천", "나에게 맞는 대출", "대출 비교"

[개요]
5~7개 질문 (직업, 소득, 목적, 신용등급, 담보 여부) →
조건에 맞는 대출 상품 3~5개 추천 →
비교표 + 각 상품 상세 + 신청 링크

[질문 플로우]
  Q1. 대출 목적은?
    → 주택구입 / 전세자금 / 생활자금 / 사업자금 / 학자금 / 자동차

  Q2. 직업은?
    → 직장인 / 자영업자 / 프리랜서 / 공무원 / 학생 / 무직

  Q3. 연소득은?
    → 2천만원 미만 / 2~4천 / 4~6천 / 6~8천 / 8천 이상

  Q4. 신용점수 대략?
    → 900+ / 800~899 / 700~799 / 600~699 / 600 미만 / 모름

  Q5. 담보 가능한 자산?
    → 부동산 있음 / 전세보증금 / 자동차 / 없음

  Q6. 희망 대출 금액?
    → 1천만원 이하 / 1~5천 / 5천~1억 / 1~3억 / 3억 이상

  Q7. 상환 기간 선호?
    → 1년 이내 / 1~3년 / 3~5년 / 5~10년 / 10년 이상

[결과]
  추천 상품 리스트:
  - 상품명 (은행/기관명)
  - 예상 금리 범위
  - 한도
  - 특징 1줄
  - 적합도 (★★★★★)
  - 신청 링크 (LinkButton)

  비교표:
  | 상품 | 금리 | 한도 | 기간 | 특징 |

  주의사항: "실제 금리는 신용평가 결과에 따라 다를 수 있습니다"

[데이터 구조]
  대출 상품 데이터베이스 (JSON):
  - 정부 정책대출 (버팀목, 디딤돌, 학자금 등)
  - 시중은행 주요 상품
  - 조건별 매핑 (직업×목적×소득→적합상품)

[관련 콘텐츠]
  → FINANCE_WRITING_PLAN.md 대출 관련 글
```

---

### 🟠 Phase 2 — 2순위 (엔진 재활용 + 높은 가치)

> **목표**: Phase 1 엔진 재활용 + 비교 시뮬레이터 엔진 확보
> **산출물**: 5개 도구 + 1개 엔진 (비교 시뮬레이터)

| # | 도구명 | 슬러그 | 엔진 | 카테고리 | 상태 |
|---|--------|--------|------|----------|------|
| 6 | 출산/육아 혜택 타임라인 | birth-parenting-timeline | 타임라인 | 복지 | ✅ 완료 |
| 7 | 전세vs월세vs매매 시뮬레이터 | housing-cost-simulator | 비교시뮬레이터 | 부동산 | ✅ 완료 |
| 8 | 개인사업자 vs 법인 세금 비교 | individual-vs-corp-tax | 비교시뮬레이터 | 세금+창업 | ✅ 완료 |
| 9 | 금융 IQ 테스트 | finance-iq-test | 퀴즈 | 금융 | ✅ 완료 |
| 10 | 나의 세금 캘린더 | my-tax-calendar | 타임라인(변형) | 세금 | ✅ 완료 |

#### 도구 6: 출산/육아 혜택 타임라인 (타임라인 엔진 재활용)

```
슬러그: birth-parenting-timeline
URL: /ko/tools/birth-parenting-timeline

[입력]
  - 출산 예정일 (또는 출산일)
  - 첫째/둘째/셋째 이상
  - 맞벌이 여부
  - 소득 수준 (중위소득 기준)

[생성되는 타임라인]
  임신 확인: 임신출산진료비 바우처(100만원) 신청
  임신 중기: 고위험 임산부 의료비 지원 확인
  출산일: 출생신고 + 첫만남이용권(200만원)
  D+14: 출산휴가 급여 신청
  D+30: 아동수당(월10만원) 신청
  D+60: 부모급여(월100만원/70만원) 신청
  ~12개월: 육아휴직 급여 신청
  12개월: 영아수당 전환 확인
  24개월: 어린이집/유치원 보육료 지원
  36개월: 아이돌봄서비스 신청
  ~7세: 아동수당 지속 확인

  (둘째 이상: 다자녀 추가 혜택 표시)
  (소득 기준: 해당되는 추가 혜택 필터)

[출력]
  타임라인 + 총 수령 예상액 요약 + .ics 다운로드
```

#### 도구 7: 전세vs월세vs매매 시뮬레이터 ★ (비교 시뮬레이터 엔진 첫 구현)

```
슬러그: housing-cost-simulator
URL: /ko/tools/housing-cost-simulator

[입력]
  공통: 거주 기간(2/5/10년), 지역
  전세: 전세금, 전세대출 금리
  월세: 보증금, 월세, 월세 인상률
  매매: 매매가, 대출비율, 대출금리, 예상 시세상승률

[출력]
  - 기간별 총 거주비용 비교 차트 (라인 or 바)
  - 비교표: 초기비용 / 월비용 / 총비용 / 자산형성
  - 결론: "당신의 조건에서는 [X]가 유리합니다" + 이유
  - 손익분기점: "매매가 유리해지려면 시세가 X% 이상 올라야 합니다"
```

#### 도구 8: 개인사업자 vs 법인 세금 비교 (비교 시뮬레이터 재활용)

```
슬러그: individual-vs-corp-tax
URL: /ko/tools/individual-vs-corp-tax

[입력]
  - 예상 연매출
  - 예상 비용/경비율
  - 급여 지급 계획 (법인의 경우 대표자 급여)
  - 업종

[출력]
  - 개인 vs 법인: 세금 비교표 (종소세/법인세/배당세/4대보험)
  - 실수령액 비교
  - 손익분기 매출: "연매출 X원 이상이면 법인이 유리"
  - 각 장단점 요약
```

#### 도구 9: 금융 IQ 테스트 (퀴즈 엔진 재활용)

```
슬러그: finance-iq-test
URL: /ko/tools/finance-iq-test

[구조]
  20문제 (OX 10 + 4지선다 10)
  영역: 저축/투자/보험/세금/부채 각 4문제

[예시 문제]
  - "적금 이자에도 세금이 붙는다" (O)
  - "신용점수는 카드를 안 쓰면 올라간다" (X)
  - "복리 72법칙이란?" (4지선다)

[결과]
  점수 + 등급 (금융문맹/초보/중수/고수/전문가)
  틀린 문제 해설 + 관련 글 링크
  SNS 공유 카드
```

#### 도구 10: 나의 세금 캘린더 (타임라인 변형)

```
슬러그: my-tax-calendar
URL: /ko/tools/my-tax-calendar

[입력]
  - 직업 유형: 직장인/자영업(일반)/자영업(간이)/프리랜서/부동산임대
  - 부가세 과세 여부
  - 종합소득세 신고 대상 여부

[출력]
  12개월 캘린더 형태:
  1월: 부가세 확정신고(자영업), 연말정산 서류 준비
  2월: 연말정산 완료
  3월: 법인세 신고(법인)
  4월: -
  5월: 종합소득세 신고
  6월: -
  7월: 부가세 예정신고(자영업), 재산세
  8월: 주민세
  9월: 재산세
  10월: -
  11월: 종합부동산세
  12월: -

  + .ics 파일 다운로드 (각 일정별 알림 포함)
```

---

### 🟡 Phase 3 — 3순위 (엔진 재활용, 추가 개발 최소)

> **목표**: 기존 엔진만으로 도구 확장
> **산출물**: 7개 도구 (신규 엔진 없음)

| # | 도구명 | 슬러그 | 엔진 | 카테고리 | 상태 |
|---|--------|--------|------|----------|------|
| 11 | 분쟁 해결 경로 안내 | dispute-resolution-guide | 의사결정트리 | 법률 | ✅ 완료 |
| 12 | 퇴사 통보서 작성기 | resignation-letter-generator | 문서생성 | 커리어 | ✅ 완료 |
| 13 | 은퇴자금 시뮬레이터 | retirement-fund-simulator | (독립 계산기) | 금융 | ✅ 완료 |
| 14 | 국민연금 수령시기별 비교 | pension-timing-comparator | 비교시뮬레이터 | 복지 | ✅ 완료 |
| 15 | 나에게 맞는 청약 전략 | housing-subscription-guide | 의사결정트리 | 부동산 | ✅ 완료 |
| 16 | 창업 로드맵 타임라인 | startup-roadmap-timeline | 타임라인 | 창업 | ✅ 완료 |
| 17 | 원리금균등vs원금균등vs만기일시 | repayment-method-comparator | 비교시뮬레이터 | 금융 | ✅ 완료 |

#### 도구 11: 분쟁 해결 경로 안내

```
슬러그: dispute-resolution-guide

[질문 플로우]
  Q1. 분쟁 유형? (금전/계약/부동산/근로/소비자/이웃)
  Q2. 분쟁 금액? (100만원미만/100~3000만원/3000만원~2억/2억이상)
  Q3. 상대방과 대화 가능? (가능/불가능/시도했으나실패)
  Q4. 증거 보유? (서면계약/녹취/메시지/증인/없음 - 복수선택)
  Q5. 원하는 결과? (금전배상/이행강제/관계회복/사과)

[결과]
  추천 경로 (우선순위):
  1. 내용증명 발송 → [내용증명 작성기] 링크
  2. 민사조정 신청 (3000만원 이하)
  3. 소액소송 (3000만원 이하, 간단한 경우)
  4. 민사소송 (3000만원 이상)
  5. 소비자원 분쟁조정 (소비자 분쟁)
  6. 노동위원회 (근로 분쟁)

  각 경로: 절차 요약 + 예상 비용 + 소요기간 + 관련 글 링크
```

#### 도구 12: 퇴사 통보서 작성기

```
슬러그: resignation-letter-generator

[입력]
  - 이름, 부서, 직급
  - 입사일, 희망 퇴사일
  - 퇴사 사유 (일신상의 사유/이직/학업/건강/기타)
  - 인수인계 계획 (간략)

[출력]
  퇴사 통보서 서식 (복사/다운로드)
  + 퇴사 시 챙겨야 할 것 체크리스트
  + [퇴사 후 할 일 타임라인] 연결
```

#### 도구 13: 은퇴자금 시뮬레이터

```
슬러그: retirement-fund-simulator

[입력]
  - 현재 나이, 은퇴 희망 나이
  - 현재 자산 (예적금/투자/부동산)
  - 월 저축액, 예상 수익률
  - 국민연금 예상 수령액 (또는 자동 계산)
  - 은퇴 후 월 희망 생활비

[출력]
  - 자산 추이 그래프 (현재~은퇴~90세)
  - 은퇴 시점 예상 자산
  - 은퇴 후 자산 소진 시점
  - 부족분 / 추가 필요 저축액
  - 시나리오 비교: 낙관적/보통/비관적
```

#### 도구 14: 국민연금 수령시기별 비교

```
슬러그: pension-timing-comparator

[입력]
  - 현재 나이
  - 예상 월 수령액 (국민연금공단 기준)

[출력]
  비교표:
  | 시기 | 수령 나이 | 감액/증액 | 월수령액 | 80세까지 총액 | 85세까지 총액 |
  | 조기수령 | 60세 | -30% | X원 | X원 | X원 |
  | 정상수령 | 65세 | 0% | X원 | X원 | X원 |
  | 연기수령 | 70세 | +36% | X원 | X원 | X원 |

  + 손익분기 나이: "X세 이후 생존하면 연기수령이 유리"
  + 차트: 누적 수령액 곡선 (3개 선 교차)
```

#### 도구 15: 나에게 맞는 청약 전략

```
슬러그: housing-subscription-guide

[질문 플로우]
  Q1. 나이? (19~29/30~39/40~49/50+)
  Q2. 혼인 여부? (미혼/신혼/기혼-자녀있음)
  Q3. 세대주? (세대주/세대원)
  Q4. 주택 소유? (무주택/1주택/다주택)
  Q5. 청약통장 가입기간? (미가입/1년미만/1~5년/5~10년/10년+)
  Q6. 소득? (중위소득 기준 구간)
  Q7. 자녀수? (0/1/2/3+)

[결과]
  추천 공급유형:
  - 일반공급 (가점제/추첨제) + 예상 가점
  - 특별공급 유형 (신혼/생애최초/다자녀/노부모 등)
  - 각 유형별 당첨 가능성 (높음/보통/낮음)
  - 추천 전략: "현재 가점 XX점, 3년 뒤 XX점. 지금은 특별공급, 3년 후 일반공급 노려볼 만합니다"
```

#### 도구 16: 창업 로드맵 타임라인

```
슬러그: startup-roadmap-timeline

[입력]
  - 업종 (음식점/카페/온라인쇼핑몰/프리랜서/제조업/서비스업)
  - 예상 창업자금
  - 법인/개인 사업자
  - 창업 예정 시기

[타임라인]
  D-90: 사업계획 수립 + 시장조사
  D-60: 사업자 등록 (세무서)
  D-45: 인허가 신청 (해당 업종)
  D-30: 사업장 계약 + 인테리어
  D-14: 4대보험 신고 (직원 있는 경우)
  D-7: 카드단말기/POS 설치
  D-day: 영업 개시
  D+30: 첫 부가세 예정신고 준비
  D+90: 소상공인 지원사업 신청 확인
  D+180: 반기 실적 점검
```

#### 도구 17: 상환방식 비교 시뮬레이터

```
슬러그: repayment-method-comparator

[입력]
  - 대출금액, 금리, 기간

[출력]
  3가지 방식 비교:
  | 항목 | 원리금균등 | 원금균등 | 만기일시 |
  | 첫 달 납입액 | | | |
  | 마지막 달 | | | |
  | 총 이자 | | | |
  | 총 상환액 | | | |

  + 월별 상환 스케줄 차트 (3개 선)
  + 결론: "총이자 기준 원금균등이 X만원 절약"
```

---

### 🟢 Phase 4 — 4순위 (엔진 재활용 + 신규 일부)

| # | 도구명 | 슬러그 | 엔진 | 카테고리 | 상태 |
|---|--------|--------|------|----------|------|
| 18 | 사업계획서 템플릿 생성기 | business-plan-generator | 문서생성 | 창업 | ✅ 완료 |
| 19 | 임대차 계약서 검토 도구 | lease-contract-checker | (독립) | 부동산 | ✅ 완료 |
| 20 | 내 집 마련 타임라인 | home-purchase-timeline | 비교시뮬+타임라인 | 부동산 | ✅ 완료 |
| 21 | 창업vs프리랜서vs취업 진단 | career-path-diagnosis | 의사결정트리 | 창업 | ✅ 완료 |
| 22 | 세금 상식 퀴즈 | tax-knowledge-quiz | 퀴즈 | 세금 | ✅ 완료 |
| 23 | 부동산 용어 퀴즈 | realestate-terms-quiz | 퀴즈 | 부동산 | ✅ 완료 |
| 24 | 물가 상승률 체감 계산기 | inflation-calculator | (독립 계산기) | 금융 | ✅ 완료 |

#### 도구 18: 사업계획서 템플릿 생성기

```
슬러그: business-plan-generator

[입력]
  Step 1: 업종/아이템 선택
  Step 2: 시장 분석 (타겟 고객, 경쟁사)
  Step 3: 자금 계획 (초기자금, 운영비)
  Step 4: 마케팅 전략 (선택)
  Step 5: 재무 예측 (월 매출 목표)

[출력]
  - 사업계획서 골격 문서 (복사/다운로드)
  - 섹션: 사업개요/시장분석/제품서비스/마케팅/재무계획/SWOT
  - 빈칸 + 가이드 코멘트 포함 (사용자가 채울 수 있도록)
```

#### 도구 19: 임대차 계약서 검토 도구

```
슬러그: lease-contract-checker

[입력]
  - 계약 유형: 전세/월세
  - 체크리스트 항목별 확인:
    [ ] 등기부등본 확인했나?
    [ ] 근저당 설정 금액 확인?
    [ ] 전입신고 예정?
    [ ] 확정일자 받을 예정?
    [ ] 보증보험 가입?
    [ ] 특약사항 확인?
    ... (20개+ 항목)

[출력]
  - 위험도 점수 (안전/주의/위험)
  - 미확인 항목별 위험 설명
  - "반드시 확인해야 할 항목" 하이라이트
  - 전세사기 예방 가이드 링크
```

#### 도구 20: 내 집 마련 타임라인

```
슬러그: home-purchase-timeline

[입력]
  - 현재 자금, 월 저축액
  - 목표 주택 가격
  - 대출 비율/금리

[출력]
  - 목표 달성까지 예상 기간
  - 자금 축적 그래프
  - "3년 후 자금 X원 + 대출 X원 = 목표 달성" 시나리오
  - 청약 전략 연계: [청약 전략 도구] 링크
```

#### 도구 21~24: (Phase 3까지의 엔진 재활용으로 데이터만 추가)

```
도구 21 (창업vs프리랜서vs취업): 의사결정 트리 데이터만 추가
도구 22 (세금 상식 퀴즈): 퀴즈 데이터만 추가
도구 23 (부동산 용어 퀴즈): 퀴즈 데이터만 추가
도구 24 (물가 상승률): 통계청 물가지수 데이터 + 독립 계산기
```

---

### 🔵 Phase 5 — 5순위 (데이터 의존, 장기 과제)

| # | 도구명 | 슬러그 | 난이도 | 카테고리 | 상태 |
|---|--------|--------|--------|----------|------|
| 25 | 오늘의 금리 비교표 | interest-rate-dashboard | 상 | 금융 | ✅ 완료 |
| 26 | 전월세 시세 히트맵 | rent-price-heatmap | 상 | 부동산 | ✅ 완료 |
| 27 | 지역별 복지 혜택 지도 | regional-welfare-map | 상 | 복지 | ✅ 완료 |
| 28 | 창업 상권 분석 지도 | commercial-district-map | 상 | 창업 | ✅ 완료 |
| 29 | 자녀 교육비 플래너 | education-cost-planner | 중 | 금융 | ✅ 완료 |
| 30 | 적금vsETFvs부동산 수익비교 | investment-comparator | 중 | 금융 | ✅ 완료 |

#### Phase 5 외부 API 정보

| # | 도구 | 필요 API | 비용 | 무료 한도 |
|---|------|----------|------|-----------|
| 25 | 금리 비교표 | 금융감독원 금융상품한눈에 API | 무료 | 제한 없음 (공공데이터) | ✅ 완료 |
| 26 | 전월세 시세 히트맵 | 국토교통부 실거래가 API | 무료 | 제한 없음 (공공데이터) | ✅ 완료 |
| 27 | 복지 혜택 지도 | 복지로 API + 카카오맵 | 무료 | 카카오맵: 일 30만건 |
| 28 | 상권 분석 지도 | 소상공인진흥공단 API + 카카오맵 | 무료 | 카카오맵: 일 30만건 |
| 29 | 교육비 플래너 | 외부 API 불필요 (정적 데이터) | 무료 | - | ✅ 완료 |
| 30 | 투자 수익 비교 | 외부 API 불필요 (정적 데이터) | 무료 | - | ✅ 완료 |

#### API 인증키 발급처

| API | 발급 사이트 | 인증키 |
|-----|------------|--------|
| 금융감독원 금융상품한눈에 | https://finlife.fss.or.kr/finlife/api/finlifeApiKey/list.do?menuNo=700034 | 32자리, 이메일 발송 |
| 국토교통부 실거래가 | https://www.data.go.kr (공공데이터포털) | 신청 후 자동 발급 |
| 복지로 API | https://www.data.go.kr (공공데이터포털) | 신청 후 자동 발급 |
| 소상공인진흥공단 | https://www.data.go.kr (공공데이터포털) | 신청 후 자동 발급 |
| 카카오맵 | https://developers.kakao.com | JavaScript 앱키 |

#### 기술 요구사항

```
- ISR/cron으로 데이터 주기적 갱신 (revalidate: 86400 = 24시간)
- 환경변수로 API 키 관리 (.env.local / Vercel 환경변수)
- API 키 미설정 시 샘플 데이터 fallback
- 서버 컴포넌트에서 fetch → 클라이언트는 필터/정렬만
```

---

## 🔗 콘텐츠 연결 현황

각 PLAN 파일에 이미 등록된 "도구 활용 콘텐츠" 목록:

| 카테고리 | PLAN 파일 | 도구활용 글 번호 | 글 수 |
|----------|-----------|-----------------|-------|
| 복지 | POLICY_WRITING_PLAN.md | #296~#305 | 10개 |
| 금융 | FINANCE_WRITING_PLAN.md | #407~#421 | 15개 |
| 세금 | TAX_WRITING_PLAN.md | #306~#320 | 15개 |
| 법률 | LEGAL_WRITING_PLAN.md | #301~#310 | 10개 |
| 부동산 | REAL_ESTATE_WRITING_PLAN.md | #311~#322 | 12개 |
| 커리어 | CAREER_WRITING_PLAN.md | #306~#317 | 12개 |
| 창업 | BUSINESS_WRITING_PLAN.md | #306~#317 | 12개 |
| **합계** | | | **86개** |

---

## 📁 전체 파일 구조 (신규 생성 예정)

```
src/
├── app/[locale]/tools/
│   ├── (기존 9개 도구)
│   │
│   ├── legal-notice-generator/         ← Phase 1
│   │   └── page.tsx
│   ├── year-end-tax-simulator/         ← Phase 1
│   │   └── page.tsx
│   ├── post-resignation-timeline/      ← Phase 1
│   │   └── page.tsx
│   ├── financial-health-score/         ← Phase 1
│   │   └── page.tsx
│   ├── loan-finder/                    ← Phase 1
│   │   └── page.tsx
│   │
│   ├── birth-parenting-timeline/       ← Phase 2
│   ├── housing-cost-simulator/         ← Phase 2
│   ├── individual-vs-corp-tax/         ← Phase 2
│   ├── finance-iq-test/               ← Phase 2
│   ├── my-tax-calendar/               ← Phase 2
│   │
│   ├── (Phase 3~5 도구들...)
│   └── ...
│
├── components/
│   ├── calculators/                    ← 기존 (계산기 전용)
│   │   ├── index.ts
│   │   └── (기존 컴포넌트들)
│   │
│   └── tools/                          ← 신규 (엔진 기반 도구)
│       ├── document-generator/         ← 엔진 1
│       │   ├── DocumentForm.tsx
│       │   ├── DocumentPreview.tsx
│       │   ├── DocumentActions.tsx
│       │   └── templates/
│       │       ├── legal-notice.ts
│       │       ├── resignation.ts
│       │       └── business-plan.ts
│       │
│       ├── decision-tree/              ← 엔진 2
│       │   ├── DecisionWizard.tsx
│       │   ├── QuestionCard.tsx
│       │   ├── ProgressBar.tsx
│       │   ├── ResultCard.tsx
│       │   └── types.ts
│       │
│       ├── timeline/                   ← 엔진 3
│       │   ├── TimelineView.tsx
│       │   ├── TimelineItem.tsx
│       │   ├── CalendarExport.tsx
│       │   └── types.ts
│       │
│       ├── comparator/                 ← 엔진 4
│       │   ├── ComparisonInput.tsx
│       │   ├── ComparisonChart.tsx
│       │   ├── ComparisonTable.tsx
│       │   ├── ComparisonSummary.tsx
│       │   └── types.ts
│       │
│       └── quiz/                       ← 엔진 5
│           ├── QuizContainer.tsx
│           ├── QuestionView.tsx
│           ├── QuizResult.tsx
│           ├── ShareCard.tsx
│           └── types.ts
│
└── lib/
    ├── calculators/                    ← 기존
    │   └── (기존 모듈들)
    │
    └── tools/                          ← 신규
        ├── document-generator/
        │   └── templates/
        │       ├── legal-notice.ts
        │       ├── resignation.ts
        │       └── business-plan.ts
        │
        ├── decision-tree/
        │   ├── engine.ts
        │   └── data/
        │       ├── loan-finder.ts
        │       ├── dispute-resolver.ts
        │       ├── housing-strategy.ts
        │       └── career-path.ts
        │
        ├── timeline/
        │   ├── generator.ts
        │   ├── ics.ts
        │   └── data/
        │       ├── post-resignation.ts
        │       ├── birth-parenting.ts
        │       └── startup-roadmap.ts
        │
        ├── comparator/
        │   └── data/
        │       ├── housing-compare.ts
        │       ├── repayment-compare.ts
        │       ├── pension-compare.ts
        │       └── tax-entity-compare.ts
        │
        └── quiz/
            ├── scoring.ts
            └── data/
                ├── finance-iq.ts
                ├── financial-health.ts
                ├── tax-quiz.ts
                └── realestate-quiz.ts
```

---

## 🛠️ 기술 의존성 (추가 설치 필요)

### Phase 1에서 필요

```
npm install:
  - react-hook-form          ← 문서 생성기 폼 관리
  - date-fns                 ← 타임라인 날짜 계산
  (Chart.js는 이미 설치되어 있을 가능성 높음 — 확인 필요)

선택:
  - jspdf                    ← PDF 다운로드 (Phase 1에서는 txt로 충분)
  - @react-pdf/renderer      ← PDF 다운로드 대안
```

### Phase 2에서 필요

```
npm install:
  - recharts 또는 chart.js   ← 비교 시뮬레이터 차트 (기존 설치 여부 확인)
```

### Phase 5에서 필요

```
npm install:
  - kakao-map (또는 @react-google-maps/api)  ← 지도 기반 도구
```

---

## ✅ 진행 체크리스트

### 엔진 개발 상태

| 엔진 | 상태 | 첫 구현 도구 | Phase |
|------|------|-------------|-------|
| 문서 생성기 | ✅ 완료 | 내용증명 작성기 (#1) | Phase 1 |
| 의사결정 트리 | ✅ 완료 | 나에게 맞는 대출 찾기 (#5) | Phase 1 |
| 타임라인 | ✅ 완료 | 퇴사 후 할 일 타임라인 (#3) | Phase 1 |
| 비교 시뮬레이터 | ✅ 완료 | 전세vs월세vs매매 (#7) | Phase 2 |
| 퀴즈 | ✅ 완료 | 나의 재무 건강 점수 (#4) | Phase 1 |

### 도구별 개발 상태

```
Phase 1:
  [x] #1  내용증명 작성기
  [x] #2  연말정산 간소화 시뮬레이터
  [x] #3  퇴사 후 할 일 타임라인
  [x] #4  나의 재무 건강 점수
  [x] #5  나에게 맞는 대출 찾기

Phase 2:
  [x] #6  출산/육아 혜택 타임라인
  [x] #7  전세vs월세vs매매 시뮬레이터
  [x] #8  개인사업자 vs 법인 세금 비교
  [x] #9  금융 IQ 테스트
  [x] #10 나의 세금 캘린더

Phase 3:
  [x] #11 분쟁 해결 경로 안내
  [x] #12 퇴사 통보서 작성기
  [x] #13 은퇴자금 시뮬레이터
  [x] #14 국민연금 수령시기별 비교
  [x] #15 나에게 맞는 청약 전략
  [x] #16 창업 로드맵 타임라인
  [x] #17 원리금균등vs원금균등vs만기일시

Phase 4:
  [x] #18 사업계획서 템플릿 생성기
  [x] #19 임대차 계약서 검토 도구
  [x] #20 내 집 마련 타임라인
  [x] #21 창업vs프리랜서vs취업 진단
  [x] #22 세금 상식 퀴즈
  [x] #23 부동산 용어 퀴즈
  [x] #24 물가 상승률 체감 계산기

Phase 5:
  [x] #25 오늘의 금리 비교표
  [x] #26 전월세 시세 히트맵
  [x] #27 지역별 복지 혜택 지도
  [x] #28 창업 상권 분석 지도
  [x] #29 자녀 교육비 플래너
  [x] #30 적금vsETFvs부동산 수익비교
```

---

## 📝 새 세션에서 이어서 할 때

```
1. 이 파일(TOOL_DEVELOPMENT_PLAN.md) 읽기
2. 체크리스트에서 현재 진행 상태 확인
3. 다음 미착수 도구의 상세 스펙 확인
4. 해당 엔진이 이미 구현되었는지 확인
   - 구현됨 → 데이터만 추가
   - 미구현 → 엔진부터 구현
5. 코드 작성 → 테스트 → 체크리스트 업데이트
```

---

## 🗂️ 관련 파일 목록

| 파일 | 용도 |
|------|------|
| TOOL_DEVELOPMENT_PLAN.md | 이 파일 (도구 개발 마스터 플랜) |
| CLAUDE.md | 프로젝트 전체 가이드라인 |
| WRITING_GUIDE.md | 글쓰기 톤/구조 가이드 |
| POLICY_WRITING_PLAN.md | 복지 콘텐츠 플랜 (380개) |
| FINANCE_WRITING_PLAN.md | 금융 콘텐츠 플랜 (421개) |
| TAX_WRITING_PLAN.md | 세금 콘텐츠 플랜 (320개) |
| REAL_ESTATE_WRITING_PLAN.md | 부동산 콘텐츠 플랜 (322개) |
| CAREER_WRITING_PLAN.md | 커리어 콘텐츠 플랜 (317개) |
| LEGAL_WRITING_PLAN.md | 법률 콘텐츠 플랜 (310개) |
| BUSINESS_WRITING_PLAN.md | 창업 콘텐츠 플랜 (317개) |
