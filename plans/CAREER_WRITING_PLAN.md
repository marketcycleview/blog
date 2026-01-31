# 취업/커리어 정보 글 작성 계획

> 연봉, 이직, 퇴사, 부업, 직장인 권리 등 "내 돈 벌기" 정보 글 작성 마스터 플랜
> 생성일: 2026-01-30
> 카테고리: career
> 폴더: `content/ko/career/`

---

## 📊 현황 요약

- **작성 완료**: 0개
- **작성 예정**: 317개 (도구 활용 콘텐츠 12개 포함)
- **총 목표**: 317개

---

## 🔧 도구/계산기 아이디어 (체류시간 ↑)

> 연봉/수당 계산은 직장인 필수 검색. 계산기 하나당 월 1만+ 방문 가능.

| 도구 | 경로 | 핵심 기능 | 우선순위 |
|------|------|----------|---------|
| 연차 계산기 | `/tools/annual-leave-calculator` | 입사일 기준 잔여 연차 자동 계산 | 🔴 최우선 |
| 야근수당 계산기 | `/tools/overtime-pay-calculator` | 시급/월급 입력 → 야근/휴일 수당 계산 | 🔴 최우선 |
| 주휴수당 계산기 | `/tools/weekly-holiday-pay-calculator` | 주 근무시간 → 주휴수당/시급 환산 | 🔴 최우선 |
| 이직 연봉 비교 계산기 | `/tools/salary-comparison-calculator` | 현 연봉 vs 이직 연봉 실수령 비교 | 🟠 높음 |
| 수습기간 급여 계산기 | `/tools/probation-salary-calculator` | 수습 90% 적용 시 실수령액 | 🟡 중간 |
| 해고예고수당 계산기 | `/tools/dismissal-pay-calculator` | 해고 시 받을 수 있는 수당 계산 | 🟢 보통 |
| **퇴사 전 체크리스트** | `/tools/resignation-checklist` | 퇴직금/연차/4대보험/서류 등 퇴사 전 확인 항목 체크 | 🔴 최우선 |
| **퇴직 후 할 일 타임라인** | `/tools/post-resignation-timeline` | 퇴직일 입력 → 건보/연금/실업급여 등 처리 일정표 자동 생성 | 🔴 최우선 |
| **연도별 최저임금 조회표** | `/tools/minimum-wage-table` | 연도/시간 선택 → 일급/주급/월급 자동 환산 | 🟠 높음 |
| **공무원 호봉표 조회** | `/tools/civil-servant-salary-table` | 직급/호봉 선택 → 기본급/수당/실수령액 조회 | 🟠 높음 |
| **직장인 권리 자가진단** | `/tools/worker-rights-diagnosis` | 근무 상황 입력 → 위반 항목/신고처 안내 | 🟡 중간 |

> **기존 계산기 활용**: 연봉 실수령액(`salary-calculator`), 퇴직금(`severance-calculator`), 실업급여(`unemployment-calculator`)

---

## 📝 작성 예정 목록

### 🔴 우선순위 1: 연봉/급여 (15개)

> "연봉 협상", "평균 연봉" = 이직 시즌(1~3월) 검색량 폭발

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 1 | 연봉 협상 방법 (신입/경력 별) | `yeonbong-hyeopsang-bangbeop.mdx` | ✅ 완료 |
| 2 | 연봉 인상률 평균 2026 | `yeonbong-insangryul-2026.mdx` | ✅ 완료 |
| 3 | 직급별 평균 연봉 (대리/과장/차장/부장) | `jikgeupbyeol-pyeonggyun-yeonbong.mdx` | ✅ 완료 |
| 4 | 대기업 vs 중소기업 연봉 차이 현실 | `daegieop-vs-jungso-yeonbong.mdx` | ✅ 완료 |
| 5 | 공무원 급여 체계 총정리 (호봉표) | `gongmuwon-geupyeo-chegye.mdx` | ✅ 완료 |
| 6 | 연봉 3000 vs 4000 실수령 차이 | `yeonbong-3000-vs-4000.mdx` | ⬜ |
| 7 | 연봉에 포함되는 것/안 되는 것 | `yeonbong-pohamdoeneun-geot.mdx` | ⬜ |
| 8 | 통상임금이란? 계산법과 영향 | `tongsang-imgeum.mdx` | ⬜ |
| 9 | 성과급/상여금 세금 계산 | `seonggwageup-segeum.mdx` | ⬜ |
| 10 | 비과세 수당 종류 (식대/차량유지비/육아) | `bigwase-sudang-jongryu.mdx` | ⬜ |
| 11 | 월급날 계산법 (입사일 기준) | `wolgeupnal-gyesan.mdx` | ⬜ |
| 12 | 연봉계약서 확인 사항 | `yeonbong-gyeyakseo-hwain.mdx` | ⬜ |
| 13 | 임금체불 신고 방법 | `imgeum-chebul-singo.mdx` | ⬜ |
| 14 | 최저시급 알바비 계산법 2026 | `choejeo-sigup-alba-2026.mdx` | ⬜ |
| 15 | IT/개발자 연봉 가이드 (연차별) | `it-gaebarja-yeonbong.mdx` | ⬜ |

### 🟠 우선순위 2: 이직/전직 (15개)

> "이직 절차", "이직 시 퇴직금" = 연중 꾸준한 검색

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 16 | 이직 절차 완벽 가이드 (퇴사~입사) | `ijik-jeolcha-guide.mdx` | ⬜ |
| 17 | 이직 시 연차/퇴직금 정산 방법 | `ijik-yeoncha-toejikgeum.mdx` | ⬜ |
| 18 | 이직 시 건강보험/국민연금 처리 | `ijik-geongang-gukmin.mdx` | ⬜ |
| 19 | 경력직 면접 준비 방법 | `gyeongnyeokjik-myeonjeop.mdx` | ⬜ |
| 20 | 이직 사유 베스트 (면접용) | `ijik-sayu-best.mdx` | ⬜ |
| 21 | 경쟁업체 이직 시 주의사항 (전직금지) | `gyeongjaeng-ijik-juui.mdx` | ⬜ |
| 22 | 수습기간 3개월 급여/퇴직금 | `suseup-gigan-geupyeo.mdx` | ⬜ |
| 23 | 이직 시 연말정산 처리 방법 | `ijik-yeonmal-jeongsang.mdx` | ⬜ |
| 24 | 헤드헌터 활용법과 주의점 | `headhunter-hwalyong.mdx` | ⬜ |
| 25 | 이직 후 적응 실패 시 대처법 | `ijik-jeokeung-silpae.mdx` | ⬜ |
| 26 | 40대 이직 현실과 전략 | `40dae-ijik-hyeonsil.mdx` | ⬜ |
| 27 | 경력 단절 후 재취업 가이드 | `gyeongnyeok-danjeol-jaechwieop.mdx` | ⬜ |
| 28 | 공무원 시험 현실 (나이/합격률/급여) | `gongmuwon-siheom-hyeonsil.mdx` | ⬜ |
| 29 | 이직 제안 연봉 어느 정도면 옮겨야 하나 | `ijik-jean-yeonbong-gijun.mdx` | ⬜ |
| 30 | 직무 전환 (비전공자 IT/마케팅) | `jikmu-jeonhwan-guide.mdx` | ⬜ |

### 🟡 우선순위 3: 퇴사/해고 (10개)

> "퇴사 절차", "권고사직" = 급할 때 검색 → 높은 클릭률

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 31 | 퇴사 절차 완벽 가이드 (통보~마지막날) | `toesa-jeolcha-guide.mdx` | ⬜ |
| 32 | 퇴사 통보 기간 (법적 기준) | `toesa-tongbo-gigan.mdx` | ⬜ |
| 33 | 권고사직 vs 해고 차이와 실업급여 | `gwongo-sajik-vs-haego.mdx` | ⬜ |
| 34 | 부당해고 구제 신청 방법 | `budang-haego-guje.mdx` | ⬜ |
| 35 | 퇴사 시 받아야 할 서류 목록 | `toesa-seoryu-mogrok.mdx` | ⬜ |
| 36 | 퇴직금 지급 기한과 미지급 시 대처 | `toejikgeum-jigeup-gihan.mdx` | ⬜ |
| 37 | 계약직 만료 후 실업급여 받는 법 | `gyeyakjik-mallyo-silup.mdx` | ⬜ |
| 38 | 자발적 퇴사도 실업급여 받는 조건 | `jabaljeok-toesa-silup-jogeon.mdx` | ⬜ |
| 39 | 직장 내 괴롭힘 신고와 퇴사 | `jikjang-goerohim-singo.mdx` | ⬜ |
| 40 | 정리해고 대상과 보상 기준 | `jeongri-haego-bosang.mdx` | ⬜ |

### 🟢 우선순위 4: 부업/투잡/N잡 (15개)

> "직장인 부업", "투잡 가능한 일" = MZ세대 검색량 급증

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 41 | 직장인 부업 추천 10가지 (현실적) | `jikjangin-buup-chucheon.mdx` | ⬜ |
| 42 | 직장인 부업 회사에 걸리면? (겸업금지) | `buup-hoesa-geollimyeon.mdx` | ⬜ |
| 43 | 재택 부업 현실 수익 총정리 | `jaetaek-buup-hyeonsil.mdx` | ⬜ |
| 44 | 스마트스토어 부업 시작 가이드 | `smart-store-buup-guide.mdx` | ⬜ |
| 45 | 쿠팡파트너스 수익 현실과 시작법 | `coupang-partners-guide.mdx` | ⬜ |
| 46 | 블로그 수익화 현실 (애드센스/협찬) | `blog-sueik-hyeonsil.mdx` | ⬜ |
| 47 | 유튜브 수익 현실 (구독자별) | `youtube-sueik-hyeonsil.mdx` | ⬜ |
| 48 | 크몽/탈잉 프리랜서 수익 현실 | `kmong-taling-hyeonsil.mdx` | ⬜ |
| 49 | 배달 라이더 수익 현실 (쿠팡이츠/배민) | `baedal-rider-sueik.mdx` | ⬜ |
| 50 | 대리운전 수익 현실과 시작법 | `daeri-unjeon-sueik.mdx` | ⬜ |
| 51 | 투잡 세금 신고 방법 총정리 | `tujab-segeum-singo-guide.mdx` | ⬜ |
| 52 | 부업 소득 300만원 이하 세금 | `buup-sodeuk-300.mdx` | ⬜ |
| 53 | 부업 사업자등록 해야 하나? | `buup-saeopja-deungrok.mdx` | ⬜ |
| 54 | 앱테크 추천 (현실적 수익) | `apptech-chucheon-hyeonsil.mdx` | ⬜ |
| 55 | N잡러 4대보험/건강보험 처리 | `njab-4dae-boheom.mdx` | ⬜ |

### 🔵 우선순위 5: 직장인 권리/노동법 (15개)

> "연차 계산", "야근수당" = 직장인 상시 검색 키워드

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 56 | 연차 계산법 완벽 가이드 (입사일 기준) | `yeoncha-gyesan-guide.mdx` | ⬜ |
| 57 | 연차수당 계산법 (미사용 연차) | `yeoncha-sudang-gyesan.mdx` | ⬜ |
| 58 | 야근수당 계산법과 청구 방법 | `yageun-sudang-gyesan.mdx` | ⬜ |
| 59 | 주휴수당이란? 조건과 계산법 | `juhyu-sudang-gyesan.mdx` | ⬜ |
| 60 | 포괄임금제 문제점과 대처법 | `pogwal-imgeum-munje.mdx` | ⬜ |
| 61 | 주52시간제 위반 신고 방법 | `ju-52-sigan-wiban.mdx` | ⬜ |
| 62 | 산업재해 처리 절차와 보상 | `sanup-jaehae-jeolcha.mdx` | ⬜ |
| 63 | 직장인 4대보험 가입 확인 방법 | `4dae-boheom-hwain.mdx` | ⬜ |
| 64 | 국민연금 임의가입/추납 방법 | `gukmin-yeongeum-chunap.mdx` | ⬜ |
| 65 | 고용보험 가입 확인과 이력 | `goyong-boheom-hwain.mdx` | ⬜ |
| 66 | 출산휴가/육아휴직 신청 절차 | `chulsan-yuka-sinchung.mdx` | ⬜ |
| 67 | 육아기 근로시간 단축 신청법 | `yukagi-geunro-danchwuk-sinchung.mdx` | ⬜ |
| 68 | 직장 내 성희롱 신고와 보호 | `jikjang-seonghwirong.mdx` | ⬜ |
| 69 | 근로계약서 필수 기재 사항 | `geunro-gyeyakseo-pilsu.mdx` | ⬜ |
| 70 | 비정규직 권리 총정리 (계약직/파견직) | `bijeonggyujik-gwonli.mdx` | ⬜ |

### 🟣 우선순위 6: 프리랜서/1인 사업자 (10개)

> 프리랜서 증가 추세. 세금/4대보험 처리 검색 많음.

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 71 | 프리랜서 시작 가이드 (세금/보험/계약) | `freelancer-sijak-guide.mdx` | ⬜ |
| 72 | 프리랜서 3.3% 원천징수 뜻과 환급 | `freelancer-3.3-woncheon.mdx` | ⬜ |
| 73 | 프리랜서 4대보험 가입 방법 | `freelancer-4dae-boheom.mdx` | ⬜ |
| 74 | 프리랜서 건강보험료 줄이는 법 | `freelancer-geongang-boheom.mdx` | ⬜ |
| 75 | 프리랜서 계약서 작성 체크리스트 | `freelancer-gyeyakseo.mdx` | ⬜ |
| 76 | 프리랜서 단가 책정 방법 | `freelancer-danga-chaekjeong.mdx` | ⬜ |
| 77 | 프리랜서 vs 직장인 뭐가 유리할까 | `freelancer-vs-jikjangin.mdx` | ⬜ |
| 78 | 1인 사업자 등록 방법 (프리랜서용) | `1in-saeopja-deungrok.mdx` | ⬜ |
| 79 | 프리랜서 경비 처리 가능한 항목 | `freelancer-gyeongbi-cheori.mdx` | ⬜ |
| 80 | 프리랜서 퇴직금 없이 노후 준비 | `freelancer-nohu-junbi.mdx` | ⬜ |

### ⚪ 우선순위 7: 자격증/스펙 (10개)

> "돈 되는 자격증", "쓸모있는 자격증" = 연중 검색량 상위

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 81 | 돈 되는 자격증 TOP 10 (2026) | `don-doeneun-jagyeokjeung-2026.mdx` | ⬜ |
| 82 | 국가공인 자격증 종류와 취득 방법 | `gukga-gongin-jagyeokjeung.mdx` | ⬜ |
| 83 | 공인중개사 현실 (수입/전망) | `gongin-junggaesa-hyeonsil.mdx` | ⬜ |
| 84 | 세무사/회계사 현실 (연봉/난이도) | `semusa-hoegyesa-hyeonsil.mdx` | ⬜ |
| 85 | 정보처리기사 취득 가이드 | `jeongbo-cheori-gisa.mdx` | ⬜ |
| 86 | 전기기사 취득 가이드와 현실 | `jeongi-gisa-guide.mdx` | ⬜ |
| 87 | 주 52시간 시대 부업용 자격증 | `buup-yong-jagyeokjeung.mdx` | ⬜ |
| 88 | 무료 국비지원 교육 찾는 법 | `gukbi-jiwon-gyoyuk.mdx` | ⬜ |
| 89 | 직장인 자기계발 추천 (MBA/온라인강의) | `jikjangin-jagi-gyebal.mdx` | ⬜ |
| 90 | 코딩 독학 → 취업 현실적 가이드 | `coding-dokhak-chwieop.mdx` | ⬜ |

### 🧮 우선순위 8: 계산기 활용 콘텐츠 (10개)

| # | 주제 | 파일명 | 계산기 연계 | 상태 |
|---|------|--------|-------------|------|
| 91 | 내 연차 며칠 남았나 (입사일별 계산) | `yeoncha-myeochil-namat.mdx` | annual-leave | ⬜ |
| 92 | 야근 10시간 하면 수당 얼마 받나 | `yageun-10sigan-sudang.mdx` | overtime-pay | ⬜ |
| 93 | 알바 주휴수당 포함 실제 시급 | `alba-juhyu-silje-sigup.mdx` | weekly-holiday-pay | ⬜ |
| 94 | 연봉 500만원 올리면 실수령 얼마 차이 | `yeonbong-500-ollimyeon.mdx` | salary-calculator | ⬜ |
| 95 | 이직 연봉 비교 (현직 vs 이직처) | `ijik-yeonbong-bigyo.mdx` | salary-comparison | ⬜ |
| 96 | 3년 근무 퇴직금 얼마 받나 | `3nyeon-toejikgeum.mdx` | severance-calculator | ⬜ |
| 97 | 실업급여 최대 얼마까지 받을 수 있나 | `silup-choedae-eolma.mdx` | unemployment-calculator | ⬜ |
| 98 | 수습 90% 적용 시 실수령액 | `suseup-90-silsuryeong.mdx` | probation-salary | ⬜ |
| 99 | 알바 월급 계산 (주 3일/4일/5일) | `alba-wolgeup-gyesan.mdx` | weekly-holiday-pay | ⬜ |
| 100 | 프리랜서 3.3% 떼면 실수령 얼마 | `freelancer-3.3-silsuryeong.mdx` | salary-calculator | ⬜ |

### 💼 우선순위 9: 직종별 연봉 가이드 (30개)

> "간호사 연봉", "교사 연봉", "개발자 연봉" = 직종마다 월 1만+ 검색. 시리즈로 무한 확장 가능.

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 101 | 간호사 연봉 현실 (연차별/병원별) | `ganhosa-yeonbong.mdx` | ⬜ |
| 102 | 교사 연봉 현실 (호봉표/수당) | `gyosa-yeonbong.mdx` | ⬜ |
| 103 | 소방관 연봉 현실 (계급별) | `sobangwan-yeonbong.mdx` | ⬜ |
| 104 | 경찰 연봉 현실 (계급별) | `gyeongchal-yeonbong.mdx` | ⬜ |
| 105 | 군인 연봉 현실 (계급별/부사관/장교) | `gunin-yeonbong-gyegeup.mdx` | ⬜ |
| 106 | 약사 연봉 현실 (약국/병원/제약) | `yaksa-yeonbong.mdx` | ⬜ |
| 107 | 변호사 연봉 현실 (로펌/개업/공공) | `byeonhosa-yeonbong.mdx` | ⬜ |
| 108 | 회계사 연봉 현실 (회계법인/기업) | `hoegyesa-yeonbong.mdx` | ⬜ |
| 109 | 세무사 연봉 현실 (개업/근무) | `semusa-yeonbong.mdx` | ⬜ |
| 110 | 개발자 연봉 현실 (프론트/백엔드/AI) | `gaebarja-yeonbong.mdx` | ⬜ |
| 111 | 디자이너 연봉 현실 (UI/UX/그래픽) | `designer-yeonbong.mdx` | ⬜ |
| 112 | 마케터 연봉 현실 (디지털/브랜드) | `marketer-yeonbong.mdx` | ⬜ |
| 113 | 물류/택배 기사 연봉 현실 | `mulryu-taekbae-yeonbong.mdx` | ⬜ |
| 114 | 배달 라이더 월수입 현실 | `baedal-rider-wolsuip.mdx` | ⬜ |
| 115 | 공인중개사 수입 현실 | `gongin-junggaesa-suip.mdx` | ⬜ |
| 116 | 은행원 연봉 현실 (시중/특수/인터넷) | `eunhaengwon-yeonbong.mdx` | ⬜ |
| 117 | 증권사 연봉 현실 | `jeungkwonsa-yeonbong.mdx` | ⬜ |
| 118 | 보험설계사 수입 현실 | `boheom-seolgyesa-suip.mdx` | ⬜ |
| 119 | 항공사 승무원 연봉 현실 | `seungmuwon-yeonbong.mdx` | ⬜ |
| 120 | 건설현장 일당/월급 현실 | `geonseol-hyeonjang-ilsdang.mdx` | ⬜ |
| 121 | 전기기사 연봉 현실 | `jeongi-gisa-yeonbong.mdx` | ⬜ |
| 122 | 요리사/셰프 연봉 현실 | `yorisa-chef-yeonbong.mdx` | ⬜ |
| 123 | 유치원/어린이집 교사 연봉 | `yuchiwon-gyosa-yeonbong.mdx` | ⬜ |
| 124 | 사회복지사 연봉 현실 | `sahoe-bokjisa-yeonbong.mdx` | ⬜ |
| 125 | 물리치료사 연봉 현실 | `mulli-chiryosa-yeonbong.mdx` | ⬜ |
| 126 | 방사선사/임상병리사 연봉 | `bangsasonsa-yeonbong.mdx` | ⬜ |
| 127 | 데이터분석가 연봉 현실 | `data-analyst-yeonbong.mdx` | ⬜ |
| 128 | PM/기획자 연봉 현실 | `pm-gihoekja-yeonbong.mdx` | ⬜ |
| 129 | 영업직 연봉 현실 (기본급+인센티브) | `yeongeopjik-yeonbong.mdx` | ⬜ |
| 130 | 연구원 연봉 현실 (석사/박사) | `yeonguwon-yeonbong.mdx` | ⬜ |

### 📝 우선순위 10: 면접/이력서/자소서 (15개)

> "면접 질문", "자소서 쓰는 법" = 취준 시즌마다 폭발. 상시 검색량도 높음.

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 131 | 면접 자기소개 1분 스피치 예시 | `myeonjeop-jagi-sogae.mdx` | ⬜ |
| 132 | 면접 마지막 질문 뭐라고 해야 하나 | `myeonjeop-majimak-jilmun.mdx` | ⬜ |
| 133 | 면접 지원동기 답변 방법 | `myeonjeop-jiwon-donggi.mdx` | ⬜ |
| 134 | 면접 장단점 답변 예시 | `myeonjeop-jangdanjeom.mdx` | ⬜ |
| 135 | 압박면접 대처법 | `appak-myeonjeop-daecheo.mdx` | ⬜ |
| 136 | AI면접/화상면접 준비 방법 | `ai-myeonjeop-junbi.mdx` | ⬜ |
| 137 | 이력서 작성법 (경력직/신입) | `iryeokseo-jakseongbeop.mdx` | ⬜ |
| 138 | 자소서 쓰는 법 (항목별 가이드) | `jasoseo-sseuneun-beop.mdx` | ⬜ |
| 139 | 포트폴리오 만드는 법 (직종별) | `portfolio-mandeuneun-beop.mdx` | ⬜ |
| 140 | 경력기술서 작성법 | `gyeongnyeok-gisulseo.mdx` | ⬜ |
| 141 | 면접 복장 가이드 (남성/여성) | `myeonjeop-bokjang.mdx` | ⬜ |
| 142 | 면접 후 합격/불합격 신호 | `myeonjeop-hapgyeok-sinho.mdx` | ⬜ |
| 143 | 면접 탈락 후 재지원 가능한가 | `myeonjeop-talrak-jaejiwon.mdx` | ⬜ |
| 144 | 인적성검사 준비 방법 | `injeokseong-geomsa-junbi.mdx` | ⬜ |
| 145 | 채용공고 읽는 법 (숨은 의미) | `chaeyong-gonggo-ikneun-beop.mdx` | ⬜ |

### 🍔 우선순위 11: 알바/파트타임 (15개)

> "알바 시급", "주휴수당 계산" = 10~20대 필수 검색. 연중 안정적.

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 146 | 2026년 최저시급 알바 월급 계산 | `2026-choejeo-sigup-wolgeup.mdx` | ⬜ |
| 147 | 알바 주휴수당 조건과 계산법 | `alba-juhyu-sudang-jogeon.mdx` | ⬜ |
| 148 | 알바 퇴직금 받을 수 있나? 조건 | `alba-toejikgeum-jogeon.mdx` | ⬜ |
| 149 | 알바 부당해고 신고 방법 | `alba-budang-haego.mdx` | ⬜ |
| 150 | 알바 근로계약서 안 쓰면 어떻게 되나 | `alba-gyeyakseo-an-sseumyeon.mdx` | ⬜ |
| 151 | 알바 야간수당/휴일수당 계산 | `alba-yagan-hyuil-sudang.mdx` | ⬜ |
| 152 | 고등학생 알바 나이/시간 제한 | `godeunghaksaeng-alba.mdx` | ⬜ |
| 153 | 대학생 알바 추천 (시급 높은 알바) | `daehaksaeng-alba-chucheon.mdx` | ⬜ |
| 154 | 편의점 알바 현실 (시급/업무) | `pyeonuijeom-alba-hyeonsil.mdx` | ⬜ |
| 155 | 카페 알바 현실 (시급/팁) | `cafe-alba-hyeonsil.mdx` | ⬜ |
| 156 | 쿠팡 물류센터 알바 현실 | `coupang-mulryu-alba.mdx` | ⬜ |
| 157 | 알바 4대보험 가입 기준 | `alba-4dae-boheom-gijun.mdx` | ⬜ |
| 158 | 알바 임금체불 노동청 신고 방법 | `alba-imgeum-chebul.mdx` | ⬜ |
| 159 | 단기알바 찾는 법 (일용직/이벤트) | `dangi-alba-chatgi.mdx` | ⬜ |
| 160 | 알바 세금 (3.3% 원천징수/연말정산) | `alba-segeum-3.3.mdx` | ⬜ |

### 🏛️ 우선순위 12: 공무원/공기업 (15개)

> "공무원 시험", "공기업 연봉" = 취준생 황금 키워드. CPC 높음.

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 161 | 9급 공무원 시험 현실 (경쟁률/합격률) | `9geup-gongmuwon-hyeonsil.mdx` | ⬜ |
| 162 | 7급 공무원 시험 현실과 준비 | `7geup-gongmuwon-hyeonsil.mdx` | ⬜ |
| 163 | 공무원 연봉 호봉표 2026 | `gongmuwon-hobongpyo-2026.mdx` | ⬜ |
| 164 | 공무원 수당 종류 총정리 | `gongmuwon-sudang-jongryu.mdx` | ⬜ |
| 165 | 공무원 연금 얼마나 받나 | `gongmuwon-yeongeum-eolma.mdx` | ⬜ |
| 166 | 공기업 연봉 순위 TOP 20 | `gonggieoip-yeonbong-sunwi.mdx` | ⬜ |
| 167 | 공기업 취업 준비 방법 (NCS) | `gonggieoip-chwieop-ncs.mdx` | ⬜ |
| 168 | 한전/가스공사/수공 연봉과 복지 | `hanjeon-gasu-sugong.mdx` | ⬜ |
| 169 | 인천공항공사/코레일 연봉과 복지 | `incheongonghang-korail.mdx` | ⬜ |
| 170 | 국민건강보험공단/연금공단 연봉 | `geongang-yeongeum-gongdan.mdx` | ⬜ |
| 171 | 군무원 채용과 연봉 현실 | `gunmuwon-chaeyong.mdx` | ⬜ |
| 172 | 소방공무원 채용과 현실 | `sobang-gongmuwon-chaeyong.mdx` | ⬜ |
| 173 | 경찰 채용 과정과 현실 | `gyeongchal-chaeyong.mdx` | ⬜ |
| 174 | 교원임용고시 현실과 준비 | `gyowon-imyong-gosi.mdx` | ⬜ |
| 175 | 공무원 vs 대기업 뭐가 나을까 | `gongmuwon-vs-daegieop.mdx` | ⬜ |

### 🗣️ 우선순위 13: 직장생활 꿀팁 (15개)

> "연봉 협상 타이밍", "사직서 쓰는 법" = 직장인 공감 키워드. 공유율 높음.

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 176 | 연봉 협상 타이밍과 전략 | `yeonbong-hyeopsang-timing.mdx` | ⬜ |
| 177 | 사직서 쓰는 법 (양식/예시) | `sajikseo-sseuneun-beop.mdx` | ⬜ |
| 178 | 인수인계 잘하는 법 | `insuingye-jal-haneun-beop.mdx` | ⬜ |
| 179 | 직장 내 인간관계 스트레스 대처 | `jikjang-ingwan-stress.mdx` | ⬜ |
| 180 | 회의 잘하는 법 (발표/보고) | `hoeui-jal-haneun-beop.mdx` | ⬜ |
| 181 | 업무 메일 잘 쓰는 법 | `eopmu-mail-sseuneun-beop.mdx` | ⬜ |
| 182 | 직장인 점심시간 활용법 | `jeomsimsigan-hwalyong.mdx` | ⬜ |
| 183 | 승진 잘 되는 사람 특징 | `seungjin-jal-doeneun.mdx` | ⬜ |
| 184 | 야근 줄이는 업무 효율화 방법 | `yageun-juligi-hyoyulhwa.mdx` | ⬜ |
| 185 | 재택근무 꿀팁 (생산성/관리) | `jaetaek-geunmu-kkultip.mdx` | ⬜ |
| 186 | 직장인 자기계발 현실적 방법 | `jikjangin-jagi-gyebal.mdx` | ⬜ |
| 187 | 연차 눈치 안 보고 쓰는 법 | `yeoncha-nunchi-an-bogo.mdx` | ⬜ |
| 188 | 직장 갑질 대응 방법 | `jikjang-gabjil-daeung.mdx` | ⬜ |
| 189 | 퇴사 후 1개월 해야 할 일 | `toesa-hu-1gaewol.mdx` | ⬜ |
| 190 | 경력직 첫날 적응 가이드 | `gyeongnyeokjik-cheotnal.mdx` | ⬜ |

### 👤 우선순위 14: 연령별/상황별 커리어 (15개)

> "30대 이직", "50대 일자리" = 연령별 고민. 공감도 높고 검색 꾸준.

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 191 | 20대 첫 취업 준비 로드맵 | `20dae-chwieop-roadmap.mdx` | ⬜ |
| 192 | 20대 후반 취업 늦은 건 아닌가 | `20dae-huban-chwieop.mdx` | ⬜ |
| 193 | 30대 이직 현실과 전략 | `30dae-ijik-hyeonsil.mdx` | ⬜ |
| 194 | 30대 커리어 전환 가능한 직종 | `30dae-career-jeonhwan.mdx` | ⬜ |
| 195 | 40대 이직이 어려운 이유와 돌파법 | `40dae-ijik-eoryeoun.mdx` | ⬜ |
| 196 | 40대 제2의 커리어 시작 가이드 | `40dae-je2-career.mdx` | ⬜ |
| 197 | 50대 일자리 찾는 현실적 방법 | `50dae-iljari-chatgi.mdx` | ⬜ |
| 198 | 50대 퇴직 후 뭘 해야 하나 | `50dae-toejik-hu.mdx` | ⬜ |
| 199 | 60대 일자리 추천과 지원 제도 | `60dae-iljari-chucheon.mdx` | ⬜ |
| 200 | 경력단절여성 재취업 가이드 | `gyeongnyeok-danjeol-yeoseong.mdx` | ⬜ |
| 201 | 육아 후 복직 현실과 권리 | `yuka-hu-bokjik.mdx` | ⬜ |
| 202 | 군 전역 후 취업 로드맵 | `gun-jeonyeok-chwieop.mdx` | ⬜ |
| 203 | 비전공자 IT 전환 현실 가이드 | `bijeon-gongja-it.mdx` | ⬜ |
| 204 | 문과 취업 현실과 유망 직종 | `mungwa-chwieop-hyeonsil.mdx` | ⬜ |
| 205 | 전문대 vs 4년제 취업 차이 현실 | `jeonmundae-vs-4nyeonje.mdx` | ⬜ |

### 🏢 우선순위 15: 회사별/업계별 정보 (20개)

> "삼성 연봉", "네이버 복지" = 특정 회사 검색 최상위 키워드

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 206 | 삼성전자 연봉과 복지 현실 | `samsung-yeonbong-bokji.mdx` | ⬜ |
| 207 | SK하이닉스 연봉과 복지 현실 | `sk-hynix-yeonbong.mdx` | ⬜ |
| 208 | 현대자동차 연봉과 복지 현실 | `hyundai-yeonbong.mdx` | ⬜ |
| 209 | LG에너지솔루션 연봉과 복지 | `lg-energy-yeonbong.mdx` | ⬜ |
| 210 | 네이버 연봉과 복지 현실 | `naver-yeonbong-bokji.mdx` | ⬜ |
| 211 | 카카오 연봉과 복지 현실 | `kakao-yeonbong-bokji.mdx` | ⬜ |
| 212 | 쿠팡 연봉과 복지 현실 | `coupang-yeonbong-bokji.mdx` | ⬜ |
| 213 | 토스/비바리퍼블리카 연봉과 복지 | `toss-yeonbong-bokji.mdx` | ⬜ |
| 214 | 대기업 연봉 순위 TOP 20 (2026) | `daegieop-yeonbong-sunwi-2026.mdx` | ⬜ |
| 215 | IT 스타트업 연봉 현실 (시리즈별) | `it-startup-yeonbong.mdx` | ⬜ |
| 216 | 금융업 연봉 순위 (은행/증권/보험) | `geumyung-yeonbong-sunwi.mdx` | ⬜ |
| 217 | 제약/바이오 연봉 현실 | `jeyak-bio-yeonbong.mdx` | ⬜ |
| 218 | 건설업 연봉 현실 (시공/설계/감리) | `geonseol-yeonbong.mdx` | ⬜ |
| 219 | 물류업 연봉 현실 (CJ/한진/롯데) | `mulryu-yeonbong.mdx` | ⬜ |
| 220 | 유통업 연봉 현실 (이마트/롯데/신세계) | `yutong-yeonbong.mdx` | ⬜ |
| 221 | 광고/마케팅 업계 연봉 현실 | `gwanggo-marketing-yeonbong.mdx` | ⬜ |
| 222 | 게임업계 연봉 현실 (넥슨/NC/크래프톤) | `game-yeonbong.mdx` | ⬜ |
| 223 | 콘텐츠/미디어 업계 연봉 현실 | `contents-media-yeonbong.mdx` | ⬜ |
| 224 | 외국계 기업 연봉과 문화 현실 | `oegukgye-gikeop-yeonbong.mdx` | ⬜ |
| 225 | 스타트업 vs 대기업 뭐가 나을까 | `startup-vs-daegieop.mdx` | ⬜ |

### 🌏 우선순위 16: 해외 취업/워홀 (10개)

> "해외 취업 방법", "워킹홀리데이" = 청년층 관심 급증

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 226 | 해외 취업 방법 총정리 (나라별) | `haeoe-chwieop-chongjeongli.mdx` | ⬜ |
| 227 | 일본 취업 현실과 준비 | `ilbon-chwieop-hyeonsil.mdx` | ⬜ |
| 228 | 미국 취업 비자와 방법 | `miguk-chwieop-visa.mdx` | ⬜ |
| 229 | 캐나다 워킹홀리데이 가이드 | `canada-working-holiday.mdx` | ⬜ |
| 230 | 호주 워킹홀리데이 현실 수입 | `australia-working-holiday.mdx` | ⬜ |
| 231 | 싱가포르 취업 현실과 연봉 | `singapore-chwieop.mdx` | ⬜ |
| 232 | 독일 취업/워홀 가이드 | `germany-chwieop.mdx` | ⬜ |
| 233 | K-Move 해외취업 지원 프로그램 | `k-move-haeoe-chwieop.mdx` | ⬜ |
| 234 | 해외 취업 시 세금 처리 | `haeoe-chwieop-segeum.mdx` | ⬜ |
| 235 | 해외 원격근무 가능한 직종 | `haeoe-wongyeok-geunmu.mdx` | ⬜ |

### 🧓 우선순위 17: 퇴직/은퇴 후 생활 (15개)

> "퇴직 후 뭘 해야", "은퇴 자금" = 40~60대 필수 검색

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 236 | 명예퇴직 조건과 퇴직금 계산 | `myeongye-toejik.mdx` | ⬜ |
| 237 | 정년퇴직 나이와 퇴직금 | `jeongnyeon-toejik.mdx` | ⬜ |
| 238 | 퇴직 후 건강보험 처리 방법 | `toejik-geongang-boheom.mdx` | ⬜ |
| 239 | 퇴직 후 국민연금 임의가입 | `toejik-gukmin-yeongeum.mdx` | ⬜ |
| 240 | 퇴직연금 수령 방법 (일시금 vs 연금) | `toejik-yeongeum-suryeong.mdx` | ⬜ |
| 241 | 은퇴 후 생활비 얼마나 필요한가 | `euntoe-saenghwalbi-eolma.mdx` | ⬜ |
| 242 | 은퇴 후 할 수 있는 일 10가지 | `euntoe-hu-hal-su-inneun.mdx` | ⬜ |
| 243 | 귀농/귀촌 현실 가이드 | `guinong-guichon-hyeonsil.mdx` | ⬜ |
| 244 | 퇴직금 IRP 이전 방법과 세금 절약 | `toejikgeum-irp-ijeon.mdx` | ⬜ |
| 245 | 퇴직금 중간정산 받은 사람 노후 대책 | `junggan-jeongsan-nohu.mdx` | ⬜ |
| 246 | 은퇴 후 건강보험 피부양자 조건 | `euntoe-pibuyangja.mdx` | ⬜ |
| 247 | 국민연금 조기수령 조건과 감액 | `gukmin-yeongeum-jogi.mdx` | ⬜ |
| 248 | 국민연금 연기수령 조건과 증액 | `gukmin-yeongeum-yeongi.mdx` | ⬜ |
| 249 | 실버 일자리 찾는 방법 | `silver-iljari-chatgi.mdx` | ⬜ |
| 250 | 퇴직 후 창업 현실 가이드 | `toejik-hu-changup.mdx` | ⬜ |

### ❓ 우선순위 18: 커리어 Q&A 롱테일 (30개)

> "~하면 어떻게 되나", "~할 수 있나" = 롱테일 황금. 경쟁 적고 전환율 높음.

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 251 | 수습 중 퇴사해도 경력에 남나 | `suseup-toesa-gyeongnyeok.mdx` | ⬜ |
| 252 | 1년 미만 퇴사 이직에 불리한가 | `1nyeon-miman-toesa.mdx` | ⬜ |
| 253 | 이직 시 연봉 얼마나 올려야 하나 | `ijik-yeonbong-eolma.mdx` | ⬜ |
| 254 | 공백기 어떻게 설명하나 | `gongbaekgi-seolmyeong.mdx` | ⬜ |
| 255 | 연봉 깎고 이직해도 될까 | `yeonbong-kkakgo-ijik.mdx` | ⬜ |
| 256 | 퇴사 후 쉬는 기간 적정선 | `toesa-hu-swieneun-gigan.mdx` | ⬜ |
| 257 | 이직 몇 번까지 괜찮은가 | `ijik-myeot-beon.mdx` | ⬜ |
| 258 | 연차 소진 안 하고 퇴사하면 | `yeoncha-sojin-an-hago.mdx` | ⬜ |
| 259 | 퇴직금 포기 각서 유효한가 | `toejikgeum-pogi-gakseo.mdx` | ⬜ |
| 260 | 회사에서 연봉삭감 통보하면 | `hoesa-yeonbong-sakgam.mdx` | ⬜ |
| 261 | 수습 기간 해고 가능한가 | `suseup-haego-ganeung.mdx` | ⬜ |
| 262 | 겸업금지 위반하면 해고당하나 | `gyeomup-geumji-wiban.mdx` | ⬜ |
| 263 | 퇴사 번복 가능한가 | `toesa-beonbok-ganeung.mdx` | ⬜ |
| 264 | 연봉 통보 거부하면 어떻게 되나 | `yeonbong-tongbo-geobu.mdx` | ⬜ |
| 265 | 수당 미지급 시 어디에 신고하나 | `sudang-mijigeup-singo.mdx` | ⬜ |
| 266 | 야근 강요 거부 가능한가 | `yageun-gangyo-geobu.mdx` | ⬜ |
| 267 | 주말 출근 수당 안 주면 | `jumal-chulgeun-sudang.mdx` | ⬜ |
| 268 | 정규직 전환 안 해주면 | `jeonggyujik-jeonhwan-an.mdx` | ⬜ |
| 269 | 파견직에서 정규직 전환 가능? | `paegyeonjik-jeonhwan.mdx` | ⬜ |
| 270 | 인턴 중 퇴사 가능한가 | `intern-toesa-ganeung.mdx` | ⬜ |
| 271 | 경력 부풀리면 어떻게 되나 | `gyeongnyeok-bupulligi.mdx` | ⬜ |
| 272 | 학력 위조 걸리면? | `hagnyeok-wijo-geollimyeon.mdx` | ⬜ |
| 273 | 이직 후 전 직장에서 연락 오면 | `ijik-hu-jeon-jikjang-yeollak.mdx` | ⬜ |
| 274 | 레퍼런스 체크 어디까지 확인하나 | `reference-check-eodikkaji.mdx` | ⬜ |
| 275 | 퇴사 시 경업금지 약정 효력 | `toesa-gyeongup-geumji.mdx` | ⬜ |
| 276 | 급여명세서 안 주면 위법인가 | `geupyeo-myeongse-an-jumyeon.mdx` | ⬜ |
| 277 | 직장인 투잡 4대보험 이중 가입? | `tujab-4dae-ijung.mdx` | ⬜ |
| 278 | 비자발적 퇴사 증명 방법 | `bijabaljeok-toesa-jeungmyeong.mdx` | ⬜ |
| 279 | 회사가 권고사직 강요하면 | `hoesa-gwongo-gangyo.mdx` | ⬜ |
| 280 | 고용보험 미가입 확인 시 대처 | `goyong-boheom-migaip.mdx` | ⬜ |

### 🏥 우선순위 19: 직장인 건강/복지/생활 (25개)

> "직장인 건강검진", "복지포인트 세금" = 실용 정보. 체류시간 긴 편.

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 281 | 직장인 건강검진 항목과 주기 | `jikjangin-geongang-geomjin.mdx` | ⬜ |
| 282 | 복지포인트 세금 부과 기준 | `bokji-point-segeum.mdx` | ⬜ |
| 283 | 경조사비 회사 지원 기준 | `gyeongjosabi-hoesa-jiwon.mdx` | ⬜ |
| 284 | 직장인 학자금 대출 지원 | `jikjangin-hakjageum.mdx` | ⬜ |
| 285 | 회사 연수/해외출장 수당 | `hoesa-yeonsu-sudang.mdx` | ⬜ |
| 286 | 직장인 퇴직연금 DC형 관리법 | `jikjangin-toejik-dc.mdx` | ⬜ |
| 287 | 직장인 ISA 활용 절세 전략 | `jikjangin-isa-jeolse.mdx` | ⬜ |
| 288 | 직장인 연금저축 최적 전략 | `jikjangin-yeongeum-jeochuk.mdx` | ⬜ |
| 289 | 직장인 통신비 절약 방법 | `jikjangin-tongsinbi.mdx` | ⬜ |
| 290 | 직장인 교통비 절약 (K-패스/알뜰) | `jikjangin-gyotongbi.mdx` | ⬜ |
| 291 | 직장인 점심값 아끼는 현실적 방법 | `jikjangin-jeomsimgap.mdx` | ⬜ |
| 292 | 직장인 운동 루틴 (출퇴근/점심) | `jikjangin-undong.mdx` | ⬜ |
| 293 | 번아웃 증상과 극복 방법 | `burnout-jeungssang.mdx` | ⬜ |
| 294 | 직장인 우울증 대처와 지원 | `jikjangin-uuljeung.mdx` | ⬜ |
| 295 | 산업재해 심리치료 지원 | `sanjae-simli-chiryo.mdx` | ⬜ |
| 296 | 직장인 식대 비과세 20만원 활용 | `sikdae-bigwase-20.mdx` | ⬜ |
| 297 | 차량유지비 비과세 20만원 활용 | `charyangbi-bigwase-20.mdx` | ⬜ |
| 298 | 직장인 소득공제 최대화 전략 | `jikjangin-sodeuk-gongje.mdx` | ⬜ |
| 299 | 직장인 세액공제 최대화 전략 | `jikjangin-seaek-gongje.mdx` | ⬜ |
| 300 | 맞벌이 부부 연말정산 절세 전략 | `matbeoli-yeonmal-jeolse.mdx` | ⬜ |
| 301 | 육아휴직 급여 계산과 신청 | `yukahyujik-geupyeo-gyesan.mdx` | ⬜ |
| 302 | 배우자 출산휴가 신청 방법 | `baewuja-chulsan-hyuga.mdx` | ⬜ |
| 303 | 가족돌봄휴가 사용 방법 | `gajok-dolbom-hyuga.mdx` | ⬜ |
| 304 | 직장인 대출 한도 높이는 법 | `jikjangin-daechul-hando.mdx` | ⬜ |
| 305 | 직장인 신용점수 관리 방법 | `jikjangin-sinyong-jeomsu.mdx` | ⬜ |

### 🛠️ 도구 활용 콘텐츠 (12개)

> 신규 도구와 연계하여 트래픽 유도 + 체류시간 증가

| # | 주제 | 파일명 | 연계 도구 | 상태 |
|---|------|--------|----------|------|
| 306 | 퇴사 전 꼭 확인해야 할 10가지 | `toesa-jeon-hwain-10gaji.mdx` | resignation-checklist | ⬜ |
| 307 | 퇴사 시 받아야 할 서류와 돈 총정리 | `toesa-badaya-hal-chongjeongli.mdx` | resignation-checklist | ⬜ |
| 308 | 퇴직 후 1주일 안에 해야 할 일 | `toejik-hu-1juil-halil.mdx` | post-resignation-timeline | ⬜ |
| 309 | 퇴직 후 건보/연금/실업급여 처리 타임라인 | `toejik-cheori-timeline.mdx` | post-resignation-timeline | ⬜ |
| 310 | 2026년 최저시급 알바 월급 환산표 | `2026-choejeo-wolgeup-hwansan.mdx` | minimum-wage-table | ⬜ |
| 311 | 연도별 최저임금 변천사 (2015~2026) | `yeondoByeol-choejeo-byeoncheon.mdx` | minimum-wage-table | ⬜ |
| 312 | 9급 공무원 호봉표로 보는 실수령액 | `9geup-hobong-silsuryeong.mdx` | civil-servant-salary-table | ⬜ |
| 313 | 경찰/소방 공무원 호봉표와 수당 | `gyeongchal-sobang-hobong.mdx` | civil-servant-salary-table | ⬜ |
| 314 | 교사 호봉표와 실수령액 (2026) | `gyosa-hobong-2026.mdx` | civil-servant-salary-table | ⬜ |
| 315 | 내 야근수당 제대로 받고 있나? 진단 | `yageun-sudang-jindan.mdx` | worker-rights-diagnosis | ⬜ |
| 316 | 주휴수당 안 받고 있으면 어떻게 하나 | `juhyu-an-badgo-isseumyeon.mdx` | worker-rights-diagnosis | ⬜ |
| 317 | 직장인 권리 침해 자가진단 체크리스트 | `jikjangin-gwonli-checklist.mdx` | worker-rights-diagnosis | ⬜ |

---

## 🚫 중복 방지 규칙

글 작성 전 반드시 확인:
1. 이 파일에서 해당 주제가 이미 ✅ 완료인지 확인
2. `content/ko/career/` 폴더에 유사한 파일명이 있는지 확인
3. TAX_WRITING_PLAN.md와 중복 여부 확인 (연봉 실수령액, 세금 관련)
4. POLICY_WRITING_PLAN.md와 중복 여부 확인 (실업급여, 육아휴직 등)
5. 완료 후 반드시 이 파일의 해당 항목을 ✅ 완료로 변경

---

## 📅 작성 일정 계획

### Phase 1: 연봉/급여 (1~3월 이직 시즌)
- 연봉 협상, 실수령액, 평균 연봉

### Phase 2: 직장인 권리 (상시)
- 연차/야근수당/주휴수당 계산
- 노동법 기본

### Phase 3: 부업/투잡 (상시)
- 부업 추천, 수익 현실
- 세금 처리

### Phase 4: 퇴사/이직 (상시)
- 퇴사 절차, 실업급여
- 이직 가이드

### Phase 5: 프리랜서/자격증
- 프리랜서 가이드
- 자격증 추천

---

## 🎯 작성 시 체크리스트

각 글 작성 전:
- [ ] 이 파일에서 해당 주제 상태 확인 (중복 방지)
- [ ] 고용노동부/근로기준법 최신 정보 확인
- [ ] 최저임금/4대보험 요율 반영
- [ ] 관련 글 내부링크 연결

각 글 작성 후:
- [ ] SEO 체크리스트 확인
- [ ] LinkButton URL 검증
- [ ] 1500자 이상 확인
- [ ] 표/계산 예시 포함 확인
- [ ] **이 파일에서 해당 항목 ✅ 완료로 변경** ← 필수!

---

## 📌 참고 사이트

- 고용노동부: https://www.moel.go.kr
- 고용24 (워크넷): https://www.work24.go.kr
- 국민연금공단: https://www.nps.or.kr
- 건강보험공단: https://www.nhis.or.kr
- 근로복지공단: https://www.comwel.or.kr
- 노동OK: https://www.nodong.kr
- 대한법률구조공단: https://www.klac.or.kr
- HRD-Net (직업훈련): https://www.hrd.go.kr
