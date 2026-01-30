# 부동산 정보 글 작성 계획

> 전세/월세, 매매, 청약, 경매, 재개발 등 부동산 정보 글 작성 마스터 플랜
> 생성일: 2026-01-30
> 카테고리: real-estate
> 폴더: `content/ko/real-estate/`

---

## 📊 현황 요약

- **작성 완료**: 0개
- **작성 예정**: 310개
- **총 목표**: 310개

---

## 🔧 도구/계산기 아이디어 (체류시간 ↑)

> 부동산은 "계산"이 핵심. 계산기가 있으면 체류시간 3~5배 증가.

| 도구 | 경로 | 핵심 기능 | 우선순위 |
|------|------|----------|---------|
| 부동산 중개수수료 계산기 | `/tools/brokerage-fee-calculator` | 매매/전세/월세별 중개수수료 자동 계산 | 🔴 최우선 |
| 청약 점수 계산기 | `/tools/subscription-score-calculator` | 가점제 항목별 점수 입력 → 총점 계산 | 🔴 최우선 |
| 취득세 계산기 | `/tools/acquisition-tax-calculator` | 주택 수, 가격별 취득세 자동 계산 | 🔴 최우선 |
| 전세가율 계산기 | `/tools/jeonse-ratio-calculator` | 매매가 대비 전세가 비율 → 깡통전세 위험도 판단 | 🟠 높음 |
| 전세 vs 매매 비교 계산기 | `/tools/jeonse-vs-buy-calculator` | 전세 거주 vs 매매 시 총비용 비교 | 🟠 높음 |
| 대출 가능 금액 계산기 | `/tools/apartment-loan-calculator` | 연소득, LTV, DSR 기반 최대 대출 금액 | 🟡 중간 |
| 재산세 계산기 | `/tools/property-tax-calculator` | 공시가격 기반 재산세 자동 계산 | 🟡 중간 |
| 등기비용 계산기 | `/tools/registration-fee-calculator` | 소유권이전등기 비용 (취득세+등록세+법무사) | 🟢 보통 |

---

## 📝 작성 예정 목록

### 🔴 우선순위 1: 전세/월세 가이드 (20개)

> 전세사기 이슈 이후 전세 관련 검색량 역대급. "전세 계약 체크리스트"만으로 월 5만+ 검색.

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 1 | 전세 계약 전 꼭 확인해야 할 체크리스트 | `jeonse-gyeyak-checklist.mdx` | ⬜ |
| 2 | 전세사기 유형 5가지와 예방법 | `jeonse-sagi-yuhyeong.mdx` | ⬜ |
| 3 | 깡통전세 확인하는 법 (전세가율 계산) | `kkangtong-jeonse-hwain.mdx` | ⬜ |
| 4 | 전세보증보험 가입 방법과 조건 | `jeonse-bojeung-boheom-guide.mdx` | ⬜ |
| 5 | 전세 계약 갱신청구권 총정리 | `jeonse-gaengsin-cheonggu.mdx` | ⬜ |
| 6 | 전세 계약 만료 시 보증금 돌려받는 법 | `jeonse-bojeunggeum-dollyeo.mdx` | ⬜ |
| 7 | 전세보증금 반환소송 절차 | `jeonse-banhwan-sosong.mdx` | ⬜ |
| 8 | 월세 계약서 꼭 확인할 10가지 | `wolse-gyeyakseo-check.mdx` | ⬜ |
| 9 | 전세 vs 월세 뭐가 유리할까 (2026 금리 기준) | `jeonse-vs-wolse-2026.mdx` | ⬜ |
| 10 | 전월세 전환율 계산법과 적정 금액 | `jeonwolse-jeonhwanyul-guide.mdx` | ⬜ |
| 11 | 임대차 3법 핵심 정리 (계약갱신/전월세상한/신고) | `imdaecha-3beop.mdx` | ⬜ |
| 12 | 전월세 신고제 방법과 과태료 | `jeonwolse-singoje.mdx` | ⬜ |
| 13 | 확정일자 받는 법과 효력 | `hwakjeong-ilja.mdx` | ⬜ |
| 14 | 전입신고 방법과 대항력 | `jeonip-singo-daehangryeok.mdx` | ⬜ |
| 15 | 임차인 보증금 우선변제권이란 | `imchain-useon-byeonje.mdx` | ⬜ |
| 16 | 소액임차인 최우선변제금 기준 | `soaek-imchain-choeuseon.mdx` | ⬜ |
| 17 | 원룸/오피스텔 전세 주의사항 | `wonroom-jeonse-juuisahang.mdx` | ⬜ |
| 18 | 빌라/다세대 전세 주의사항 | `villa-jeonse-juuisahang.mdx` | ⬜ |
| 19 | 전세대출 한도 높이는 방법 | `jeonse-daechul-hando.mdx` | ⬜ |
| 20 | 역전세 시 대처법 (보증금 못 받을 때) | `yeokjeonse-daecheobeop.mdx` | ⬜ |

### 🟠 우선순위 2: 아파트 매매 (20개)

> "아파트 매매 절차", "등기부등본 보는 법" = 생애 첫 주택 구매자 필수 검색

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 21 | 아파트 매매 절차 완벽 가이드 (초보자용) | `apartment-maemae-jeolcha.mdx` | ⬜ |
| 22 | 등기부등본 보는 법 (갑구/을구 해석) | `deunggibudeungbon-boneun-beop.mdx` | ⬜ |
| 23 | 부동산 매매계약서 체크리스트 | `maemae-gyeyakseo-checklist.mdx` | ⬜ |
| 24 | 부동산 중개수수료 계산법 (매매/전세/월세) | `junggae-susuryo-gyesan.mdx` | ⬜ |
| 25 | 부동산 취득세 계산법 (1주택/다주택) | `budongsan-chwidukse-gyesan.mdx` | ⬜ |
| 26 | 소유권이전등기 방법과 비용 | `soyukwon-ijeon-deunggi.mdx` | ⬜ |
| 27 | 아파트 실거래가 조회 방법 | `apartment-silgeoraega.mdx` | ⬜ |
| 28 | 공시지가 공시가격 확인 방법 | `gongsijiga-hwain.mdx` | ⬜ |
| 29 | KB시세 vs 실거래가 차이 | `kb-sise-vs-silgeorae.mdx` | ⬜ |
| 30 | 갭투자란? 방법과 위험성 | `gap-tuja-guide.mdx` | ⬜ |
| 31 | 아파트 입주 전 체크리스트 | `apartment-ipju-checklist.mdx` | ⬜ |
| 32 | 하자보수 청구 방법과 기간 | `haja-bosu-cheonggu.mdx` | ⬜ |
| 33 | 아파트 관리비 구성과 절약법 | `apartment-gwanlibi.mdx` | ⬜ |
| 34 | 매매 vs 전세 vs 월세 장단점 비교 | `maemae-vs-jeonse-vs-wolse.mdx` | ⬜ |
| 35 | 주택 매도 시 양도세 절세 전략 | `jutaek-maedo-yangdose.mdx` | ⬜ |
| 36 | 1주택자 비과세 조건 총정리 | `1jutaek-bigwase-jogeon.mdx` | ⬜ |
| 37 | 일시적 2주택 비과세 요건 | `ilsijeok-2jutaek-bigwase.mdx` | ⬜ |
| 38 | 부동산 명의 변경 방법과 비용 | `budongsan-myeongui-byeongyeong.mdx` | ⬜ |
| 39 | 오피스텔 매매 주의사항 | `officetel-maemae-juui.mdx` | ⬜ |
| 40 | 생애최초 주택 구입 혜택 총정리 | `saengae-choechu-jutaek.mdx` | ⬜ |

### 🟡 우선순위 3: 청약/분양 (15개)

> "청약 점수", "특별공급 조건" 연중 꾸준한 검색량

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 41 | 청약점수 계산법 완벽 가이드 | `cheongnyak-jeomsu-gyesan.mdx` | ⬜ |
| 42 | 청약통장 가입 방법과 관리 | `cheongnyak-tongjang-gaip.mdx` | ⬜ |
| 43 | 특별공급 종류와 조건 총정리 | `teukbyeol-gonggup-jongryu.mdx` | ⬜ |
| 44 | 생애최초 특별공급 조건 | `saengae-choechu-teukgong.mdx` | ⬜ |
| 45 | 신혼부부 특별공급 조건 | `sinon-teukgong-jogeon.mdx` | ⬜ |
| 46 | 다자녀 특별공급 조건 | `dajanyeo-teukgong.mdx` | ⬜ |
| 47 | 사전청약 vs 본청약 차이 | `sajeon-vs-bon-cheongnyak.mdx` | ⬜ |
| 48 | 분양가상한제란? 해당 지역 | `bunyangga-sanghanje.mdx` | ⬜ |
| 49 | 분양권 전매 조건과 방법 | `bunyangkwon-jeonmae.mdx` | ⬜ |
| 50 | 모델하우스 방문 체크리스트 | `model-house-checklist.mdx` | ⬜ |
| 51 | 청약 당첨 후 절차 (계약~입주) | `cheongnyak-dangcheom-jeolcha.mdx` | ⬜ |
| 52 | 청약 부적격 사유와 구제 방법 | `cheongnyak-bujeokgyeok.mdx` | ⬜ |
| 53 | 무순위/잔여세대 청약 방법 | `musunwi-cheongnyak.mdx` | ⬜ |
| 54 | 2026년 수도권 분양 일정 | `2026-sudokwon-bunyang-iljung.mdx` | ⬜ |
| 55 | 3기 신도시 입주 일정과 특징 | `3gi-sindosi-ipju.mdx` | ⬜ |

### 🟢 우선순위 4: 부동산 투자 (경매/재개발) (15개)

> 경매 입문, 재개발 투자 = 고수익 키워드 + 긴 체류시간

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 56 | 부동산 경매 입문 가이드 (초보자용) | `gyeongmae-ipmun-guide.mdx` | ⬜ |
| 57 | 경매 권리분석 방법 | `gyeongmae-gwonli-bunseok.mdx` | ⬜ |
| 58 | 경매 입찰 방법과 절차 | `gyeongmae-ipchal-jeolcha.mdx` | ⬜ |
| 59 | 경매 낙찰 후 절차 (명도~입주) | `gyeongmae-nakchal-jeolcha.mdx` | ⬜ |
| 60 | 공매 방법과 경매 차이 | `gongmae-vs-gyeongmae.mdx` | ⬜ |
| 61 | 재개발 투자 기초 가이드 | `jaegaebal-tuja-gicho.mdx` | ⬜ |
| 62 | 재건축 투자 기초 가이드 | `jaegeonchuik-tuja-gicho.mdx` | ⬜ |
| 63 | 재개발 vs 재건축 차이점 | `jaegaebal-vs-jaegeonchuik.mdx` | ⬜ |
| 64 | 조합원 입주권이란? | `johapwon-ipjukwon.mdx` | ⬜ |
| 65 | 재개발 사업 단계별 절차 | `jaegaebal-dangyebyeol.mdx` | ⬜ |
| 66 | 토지 투자 기초 가이드 | `toji-tuja-gicho.mdx` | ⬜ |
| 67 | 상가 투자 수익률 계산법 | `sangga-tuja-suyikryul.mdx` | ⬜ |
| 68 | 꼬마빌딩 투자 현실 | `kkoma-building-tuja.mdx` | ⬜ |
| 69 | 부동산 리츠(REITs) 투자 방법 | `budongsan-reits-tuja.mdx` | ⬜ |
| 70 | 부동산 투자 세금 총정리 | `budongsan-tuja-segeum.mdx` | ⬜ |

### 🔵 우선순위 5: 등기/계약/법률 (15개)

> "등기부등본", "근저당" 등 법률 용어 검색 = 정보 수요 높음

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 71 | 부동산 등기 종류와 방법 | `budongsan-deunggi-jongryu.mdx` | ⬜ |
| 72 | 근저당 설정이란? 확인 방법 | `geunjeodang-seoljeong.mdx` | ⬜ |
| 73 | 근저당 말소 방법과 비용 | `geunjeodang-malso.mdx` | ⬜ |
| 74 | 가등기란? 위험성과 확인법 | `gadeunggi-wiheomseong.mdx` | ⬜ |
| 75 | 가압류 뜻과 부동산 영향 | `gaapnyu-budongsan.mdx` | ⬜ |
| 76 | 임대차보호법 핵심 정리 | `imdaecha-bohobeop.mdx` | ⬜ |
| 77 | 상가 임대차보호법 정리 | `sangga-imdaecha-bohobeop.mdx` | ⬜ |
| 78 | 전세권 설정 방법과 비용 | `jeonsekwon-seoljeong.mdx` | ⬜ |
| 79 | 부동산 가계약금 반환 기준 | `gagyeyakgeum-banhwan.mdx` | ⬜ |
| 80 | 부동산 중도금/잔금 일정 관리 | `jungdogeum-jangeum.mdx` | ⬜ |
| 81 | 명도소송 절차와 비용 | `myeongdo-sosong.mdx` | ⬜ |
| 82 | 부동산 소유권 분쟁 대처법 | `soyukwon-bunjaeng.mdx` | ⬜ |
| 83 | 부동산 사기 유형과 신고 방법 | `budongsan-sagi-yuhyeong.mdx` | ⬜ |
| 84 | 재산세 계산법과 납부 시기 | `jaesanse-gyesan-napbu.mdx` | ⬜ |
| 85 | 종합부동산세 대상과 계산법 | `jongbuse-daesang-gyesan.mdx` | ⬜ |

### 🟣 우선순위 6: 인테리어/이사 (10개)

> 이사 시즌마다 검색량 급등. 비용 관련 검색 특히 많음.

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 86 | 이사 비용 절약하는 현실적 방법 | `isa-biyong-jeolyak.mdx` | ⬜ |
| 87 | 이사 체크리스트 (입주 전/후) | `isa-checklist.mdx` | ⬜ |
| 88 | 이사업체 고르는 법과 비용 비교 | `isa-eopche-bigyo.mdx` | ⬜ |
| 89 | 셀프인테리어 비용 항목별 정리 | `self-interior-biyong.mdx` | ⬜ |
| 90 | 인테리어 업체 고르는 법 (사기 예방) | `interior-eopche-goreugi.mdx` | ⬜ |
| 91 | 도배/장판 셀프 비용 vs 업체 비용 | `dobae-jangpan-biyong.mdx` | ⬜ |
| 92 | 올수리 인테리어 비용 평형별 정리 | `olsuri-biyong.mdx` | ⬜ |
| 93 | 주방 리모델링 비용과 체크포인트 | `jupang-remodeling.mdx` | ⬜ |
| 94 | 화장실 리모델링 비용과 기간 | `hwajangsil-remodeling.mdx` | ⬜ |
| 95 | 입주청소 비용과 업체 선택 | `ipju-cheongso-biyong.mdx` | ⬜ |

### ⚪ 우선순위 7: 지역별 부동산 분석 (프로그래매틱 SEO) (15개)

> 지역명 + 부동산 키워드 = 롱테일 SEO 효과 극대화

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 96 | 서울 아파트 시세 동향 2026 | `2026-seoul-apartment-sise.mdx` | ⬜ |
| 97 | 강남/서초 아파트 시세와 전망 | `gangnam-seocho-apartment.mdx` | ⬜ |
| 98 | 마포/용산 아파트 시세와 전망 | `mapo-yongsan-apartment.mdx` | ⬜ |
| 99 | 노원/도봉 아파트 시세와 전망 | `nowon-dobong-apartment.mdx` | ⬜ |
| 100 | 경기 수도권 신도시 아파트 전망 | `gyeonggi-sindosi-jeonmang.mdx` | ⬜ |
| 101 | 성남/분당 아파트 시세와 전망 | `seongnam-bundang-apartment.mdx` | ⬜ |
| 102 | 수원/화성 아파트 시세와 전망 | `suwon-hwaseong-apartment.mdx` | ⬜ |
| 103 | 인천 아파트 시세와 전망 | `incheon-apartment-jeonmang.mdx` | ⬜ |
| 104 | 부산 아파트 시세와 전망 | `busan-apartment-jeonmang.mdx` | ⬜ |
| 105 | 대구 아파트 시세와 전망 | `daegu-apartment-jeonmang.mdx` | ⬜ |
| 106 | 세종시 아파트 시세와 전망 | `sejong-apartment-jeonmang.mdx` | ⬜ |
| 107 | 광역시별 아파트 평균 시세 비교 | `gwangyeoksi-apartment-bigyo.mdx` | ⬜ |
| 108 | GTX 노선별 수혜 지역 분석 | `gtx-suhye-jiyeok.mdx` | ⬜ |
| 109 | 2026년 입주 물량 많은 지역 | `2026-ipju-mullyang.mdx` | ⬜ |
| 110 | 인구 감소 지역 부동산 전망 | `ingu-gamso-budongsan.mdx` | ⬜ |

### 🧮 우선순위 8: 계산기 활용 콘텐츠 (15개)

> 계산기 도구 연계로 체류시간 3배 이상 증가

| # | 주제 | 파일명 | 계산기 연계 | 상태 |
|---|------|--------|-------------|------|
| 111 | 부동산 중개수수료 얼마나 내야 하나 | `junggae-susuryo-eolma.mdx` | brokerage-fee | ⬜ |
| 112 | 청약 점수 몇 점이면 당첨 가능할까 | `cheongnyak-jeomsu-dangcheom.mdx` | subscription-score | ⬜ |
| 113 | 아파트 취득세 얼마나 나올까 (1~3주택) | `apartment-chwidukse-eolma.mdx` | acquisition-tax | ⬜ |
| 114 | 전세가율 70% 넘으면 위험한가 | `jeonsegayul-70-wiheom.mdx` | jeonse-ratio | ⬜ |
| 115 | 내 연봉으로 대출 얼마까지 가능할까 | `yeonbong-daechul-eolma.mdx` | apartment-loan | ⬜ |
| 116 | 3억 전세 vs 5억 매매 뭐가 유리할까 | `3eok-jeonse-vs-5eok-maemae.mdx` | jeonse-vs-buy | ⬜ |
| 117 | 아파트 재산세 얼마나 내야 하나 | `apartment-jaesanse-eolma.mdx` | property-tax | ⬜ |
| 118 | 등기비용 총정리 (취득세+등록세+법무사) | `deunggi-biyong-chongjeongli.mdx` | registration-fee | ⬜ |
| 119 | 보증금 올리면 월세 얼마나 줄까 | `bojeunggeum-olligi-wolse.mdx` | jeonwolse-calculator | ⬜ |
| 120 | 전세 3억 월세 전환하면 얼마 | `jeonse-3eok-wolse-jeonhwan.mdx` | jeonwolse-calculator | ⬜ |
| 121 | 아파트 매매 시 총비용 (취득세+중개+등기) | `apartment-chongbiyong.mdx` | acquisition-tax | ⬜ |
| 122 | 재산세 vs 종부세 내가 해당되나 | `jaesanse-vs-jongbuse.mdx` | property-tax | ⬜ |
| 123 | 청약통장 납입 몇 년 해야 유리할까 | `cheongnyak-napip-myeon.mdx` | subscription-score | ⬜ |
| 124 | DSR 40% 기준 대출 한도 계산 | `dsr-40-daechul-hando.mdx` | apartment-loan | ⬜ |
| 125 | 법정 전월세 전환율 상한 2026 | `beopjeong-jeonwolse-sanghan-2026.mdx` | jeonwolse-calculator | ⬜ |

### 💰 우선순위 9: 부동산 대출 심화 (15개)

> "전세대출 금리", "주담대 갈아타기" = 금리 변동기마다 검색 폭발

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 126 | 전세대출 금리 비교 2026 (은행별) | `jeonse-daechul-geumli-2026.mdx` | ⬜ |
| 127 | 주택담보대출 금리 비교 2026 | `jutaek-dambo-geumli-2026.mdx` | ⬜ |
| 128 | 주담대 갈아타기 방법과 절차 | `judamdae-galatagi-bangbeop.mdx` | ⬜ |
| 129 | LTV DTI DSR 뜻과 계산법 | `ltv-dti-dsr-gyesan.mdx` | ⬜ |
| 130 | DSR 40% 규제 대출 한도 줄어드는 이유 | `dsr-40-gyuje.mdx` | ⬜ |
| 131 | 신생아 특례대출 조건과 금리 | `singaena-teukrye-daechul.mdx` | ⬜ |
| 132 | 신혼부부 전세대출 조건 비교 | `sinon-jeonse-daechul.mdx` | ⬜ |
| 133 | 중소기업 청년 전세대출 자격과 한도 | `jungso-cheongnyeon-jeonse.mdx` | ⬜ |
| 134 | 카카오뱅크 전세대출 조건과 후기 | `kakao-jeonse-daechul.mdx` | ⬜ |
| 135 | 토스뱅크 전세대출 조건과 후기 | `toss-jeonse-daechul.mdx` | ⬜ |
| 136 | 전세대출 한도 늘리는 5가지 방법 | `jeonse-daechul-hando-neulligi.mdx` | ⬜ |
| 137 | 전세대출 거절 사유와 대처법 | `jeonse-daechul-geojeol.mdx` | ⬜ |
| 138 | 주담대 고정금리 vs 변동금리 | `judamdae-gojeong-vs-byeondong.mdx` | ⬜ |
| 139 | 중도상환수수료 없는 주담대 찾기 | `jungdo-sanghwan-eopneun.mdx` | ⬜ |
| 140 | 전세대출 만기 연장 방법과 조건 | `jeonse-daechul-mangi-yeonjang.mdx` | ⬜ |

### 🏘️ 우선순위 10: 주택 유형별 가이드 (15개)

> 빌라/오피스텔/단독주택 = 아파트 외 주거형태 검색 증가

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 141 | 빌라 매매 장단점과 주의사항 | `villa-maemae-jangdanjeom.mdx` | ⬜ |
| 142 | 빌라 전세 주의사항 (사기 예방) | `villa-jeonse-juui.mdx` | ⬜ |
| 143 | 오피스텔 매매 장단점 (주거용/업무용) | `officetel-maemae-jangdan.mdx` | ⬜ |
| 144 | 오피스텔 전세 주의사항 | `officetel-jeonse-juui.mdx` | ⬜ |
| 145 | 다세대 vs 다가구 vs 연립 차이 | `dasedae-vs-dagagu.mdx` | ⬜ |
| 146 | 단독주택 매매 체크리스트 | `dandok-jutaek-checklist.mdx` | ⬜ |
| 147 | 타운하우스 장단점과 매매 시 주의 | `townhouse-jangdanjeom.mdx` | ⬜ |
| 148 | 도시형생활주택이란? 투자 가치 | `dosihyeong-saenghwal-jutaek.mdx` | ⬜ |
| 149 | 신축 vs 구축 아파트 비교 | `sinchuk-vs-guchuk.mdx` | ⬜ |
| 150 | 로열층/비로열층 가격 차이와 선택 | `royal-cheung-seontaek.mdx` | ⬜ |
| 151 | 복층 오피스텔 장단점 | `bokcheung-officetel.mdx` | ⬜ |
| 152 | 주상복합 아파트 장단점 | `jusang-bokhap-jangdan.mdx` | ⬜ |
| 153 | 지식산업센터(지산) 투자 가이드 | `jisik-sanup-center.mdx` | ⬜ |
| 154 | 생활형숙박시설 투자 현실 | `saenghwalhyeong-sukbak.mdx` | ⬜ |
| 155 | 소형 아파트(원룸/투룸) 투자 가치 | `sohyeong-apartment-tuja.mdx` | ⬜ |

### 📖 우선순위 11: 부동산 용어/개념 (20개)

> 부동산 용어 검색 = SEO 롱테일 금광. "~란" "~뜻" 키워드 CPC 높음.

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 156 | 공시지가란? 시가와 차이 | `gongsijiga-ran.mdx` | ⬜ |
| 157 | 공시가격이란? 조회 방법 | `gongsigagyeok-ran.mdx` | ⬜ |
| 158 | 감정평가란? 비용과 방법 | `gamjeong-pyeongga-ran.mdx` | ⬜ |
| 159 | 용적률이란? 건폐율과 차이 | `yongjeokryul-ran.mdx` | ⬜ |
| 160 | 대지지분이란? 확인 방법 | `daeji-jibun-ran.mdx` | ⬜ |
| 161 | 토지이용계획확인서 보는 법 | `toji-iyong-gyehoek.mdx` | ⬜ |
| 162 | 지목이란? 종류와 변경 | `jimok-ran.mdx` | ⬜ |
| 163 | 전용면적 vs 공급면적 vs 계약면적 | `jeonyong-vs-gonggup-myeonjeok.mdx` | ⬜ |
| 164 | 분양가란? 구성 항목 | `bunyangga-ran.mdx` | ⬜ |
| 165 | 실거래가 조회 방법 (국토부/네이버) | `silgeoraega-johoe.mdx` | ⬜ |
| 166 | 선순위 임차인이란? 확인 방법 | `seonsunwi-imchain.mdx` | ⬜ |
| 167 | 대항력이란? 확보 조건 | `daehangryeok-ran.mdx` | ⬜ |
| 168 | 우선변제권이란? 소액임차인 기준 | `useon-byeonje-ran.mdx` | ⬜ |
| 169 | 권리금이란? 보호와 회수 | `gwolligeum-ran.mdx` | ⬜ |
| 170 | 조정대상지역이란? 규제 내용 | `jojeong-daesang-jiyeok.mdx` | ⬜ |
| 171 | 투기과열지구란? 해당 지역 | `tugi-gwayeol-jigu.mdx` | ⬜ |
| 172 | 재개발 vs 재건축 vs 리모델링 차이 | `jaegaebal-vs-jaegeonchuik-vs-remodeling.mdx` | ⬜ |
| 173 | 분양전환이란? 임대아파트 분양전환 | `bunyang-jeonhwan-ran.mdx` | ⬜ |
| 174 | 역세권이란? 투자 가치 판단 기준 | `yeoksekwon-ran.mdx` | ⬜ |
| 175 | 학세권이란? 학군 확인 방법 | `haksekwon-ran.mdx` | ⬜ |

### 🗺️ 우선순위 12: 지역별 분석 확대 (30개)

> 지역 + 부동산 = 프로그래매틱 SEO 최고 효율. 검색량 안정적.

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 176 | 송파/강동 아파트 시세와 전망 | `songpa-gangdong-apartment.mdx` | ⬜ |
| 177 | 영등포/구로 아파트 시세와 전망 | `yeongdeungpo-guro-apartment.mdx` | ⬜ |
| 178 | 중랑/동대문 아파트 시세와 전망 | `jungnang-dongdaemun-apartment.mdx` | ⬜ |
| 179 | 서대문/은평 아파트 시세와 전망 | `seodaemun-eunpyeong-apartment.mdx` | ⬜ |
| 180 | 관악/동작 아파트 시세와 전망 | `gwanak-dongjak-apartment.mdx` | ⬜ |
| 181 | 고양/파주 아파트 시세와 전망 | `goyang-paju-apartment.mdx` | ⬜ |
| 182 | 김포 아파트 시세와 전망 | `gimpo-apartment-jeonmang.mdx` | ⬜ |
| 183 | 하남/광주 아파트 시세와 전망 | `hanam-gwangju-apartment.mdx` | ⬜ |
| 184 | 의정부/양주 아파트 시세와 전망 | `uijeongbu-yangju-apartment.mdx` | ⬜ |
| 185 | 안양/군포/의왕 아파트 시세와 전망 | `anyang-gunpo-apartment.mdx` | ⬜ |
| 186 | 평택/안성 아파트 시세와 전망 | `pyeongtaek-anseong-apartment.mdx` | ⬜ |
| 187 | 용인 수지/기흥/처인 아파트 비교 | `yongin-suji-giheung.mdx` | ⬜ |
| 188 | 동탄 신도시 아파트 전망 | `dongtan-sindosi-jeonmang.mdx` | ⬜ |
| 189 | 위례 신도시 아파트 전망 | `wirye-sindosi-jeonmang.mdx` | ⬜ |
| 190 | 광교 신도시 아파트 전망 | `gwanggyo-sindosi-jeonmang.mdx` | ⬜ |
| 191 | 판교 아파트 시세와 전망 | `pangyo-apartment-jeonmang.mdx` | ⬜ |
| 192 | 대전 둔산/유성 아파트 전망 | `daejeon-dunsan-yuseong.mdx` | ⬜ |
| 193 | 대구 수성/달서 아파트 전망 | `daegu-suseong-dalseo.mdx` | ⬜ |
| 194 | 부산 해운대/수영 아파트 전망 | `busan-haeundae-suyeong.mdx` | ⬜ |
| 195 | 광주 광산/서구 아파트 전망 | `gwangju-gwangsan-seogu.mdx` | ⬜ |
| 196 | 울산 남구/중구 아파트 전망 | `ulsan-namgu-junggu.mdx` | ⬜ |
| 197 | 창원/김해 아파트 전망 | `changwon-gimhae-apartment.mdx` | ⬜ |
| 198 | 천안/아산 아파트 전망 | `cheonan-asan-apartment.mdx` | ⬜ |
| 199 | 청주 아파트 시세와 전망 | `cheongju-apartment-jeonmang.mdx` | ⬜ |
| 200 | 전주 아파트 시세와 전망 | `jeonju-apartment-jeonmang.mdx` | ⬜ |
| 201 | 제주도 부동산 시세와 전망 | `jeju-budongsan-jeonmang.mdx` | ⬜ |
| 202 | 세종시 아파트 투자 가치 분석 | `sejong-tuja-gachi.mdx` | ⬜ |
| 203 | GTX-A 수혜 지역 아파트 전망 | `gtx-a-suhye-jeonmang.mdx` | ⬜ |
| 204 | GTX-B/C 수혜 지역 분석 | `gtx-bc-suhye-bunseok.mdx` | ⬜ |
| 205 | 2026년 서울 재개발 유망 지역 | `2026-seoul-jaegaebal-yumang.mdx` | ⬜ |

### 🏢 우선순위 13: 임대사업/수익형 부동산 (15개)

> "임대사업자", "월세 수익률" = 투자 목적 검색. CPC 높음.

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 206 | 임대사업자 등록 방법과 혜택 | `imdae-saeopja-deungrok.mdx` | ⬜ |
| 207 | 임대사업자 세금 혜택 총정리 | `imdae-saeopja-segeum.mdx` | ⬜ |
| 208 | 월세 수익률 계산법과 적정 기준 | `wolse-suyikryul-gyesan.mdx` | ⬜ |
| 209 | 원룸 건물 투자 현실 (수익/관리) | `wonroom-geonmul-tuja.mdx` | ⬜ |
| 210 | 상가 투자 수익률과 주의사항 | `sangga-tuja-suyikryul.mdx` | ⬜ |
| 211 | 에어비앤비 임대사업 현실 | `airbnb-imdae-hyeonsil.mdx` | ⬜ |
| 212 | 오피스텔 임대 수익률 현실 | `officetel-imdae-suyikryul.mdx` | ⬜ |
| 213 | 임대소득세 계산법과 신고 | `imdae-sodeukse-gyesan.mdx` | ⬜ |
| 214 | 전세→월세 전환 시 임대인 주의사항 | `jeonse-wolse-jeonhwan-imdaein.mdx` | ⬜ |
| 215 | 임대차분쟁조정위원회 이용 방법 | `imdaecha-bunjaeng-jojeong.mdx` | ⬜ |
| 216 | 주택임대관리업이란? | `jutaek-imdae-gwanli.mdx` | ⬜ |
| 217 | 다가구주택 투자 장단점 | `dagagu-tuja-jangdan.mdx` | ⬜ |
| 218 | 임대보증금 보증보험 가입 의무 | `imdae-bojeunggeum-boheom.mdx` | ⬜ |
| 219 | 공실 줄이는 임대 전략 | `gongsil-juligi-jeonryak.mdx` | ⬜ |
| 220 | 부동산 간접투자 방법 (리츠/펀드) | `budongsan-ganjeop-tuja.mdx` | ⬜ |

### 💒 우선순위 14: 신혼부부/생애최초 주택 (15개)

> "신혼부부 전세", "생애최초" = 결혼 시즌 검색 폭발. 전환율 높음.

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 221 | 신혼부부 전세 vs 매매 뭐가 유리할까 | `sinon-jeonse-vs-maemae.mdx` | ⬜ |
| 222 | 신혼부부 주택 구입 혜택 총정리 | `sinon-jutaek-hyetaek.mdx` | ⬜ |
| 223 | 신혼부부 디딤돌대출 조건과 금리 | `sinon-didimddol-daechul.mdx` | ⬜ |
| 224 | 신혼부부 버팀목대출 조건과 한도 | `sinon-butimmok-daechul.mdx` | ⬜ |
| 225 | 신혼희망타운 입주 조건과 일정 | `sinon-huimang-town-ipju.mdx` | ⬜ |
| 226 | 생애최초 주택 취득세 감면 조건 | `saengae-chwidukse-gamyeon.mdx` | ⬜ |
| 227 | 생애최초 주택 대출 한도와 금리 | `saengae-daechul-hando.mdx` | ⬜ |
| 228 | 신혼집 전세 구할 때 체크리스트 | `sinhonjip-jeonse-checklist.mdx` | ⬜ |
| 229 | 신혼집 매매 예산 짜는 법 | `sinhonjip-yesan-jabgi.mdx` | ⬜ |
| 230 | 혼인신고 전후 주택 관련 차이 | `honin-singo-jutaek-chai.mdx` | ⬜ |
| 231 | 신혼부부 청약 가점 올리는 법 | `sinon-cheongnyak-gajeom.mdx` | ⬜ |
| 232 | 맞벌이 신혼부부 대출 전략 | `matbeoli-sinon-daechul.mdx` | ⬜ |
| 233 | 부모님 도움 없이 내 집 마련 전략 | `bumonim-eopsi-naejip.mdx` | ⬜ |
| 234 | 신혼부부 전세임대 신청 방법 | `sinon-jeonse-imdae-sinchung.mdx` | ⬜ |
| 235 | 행복주택 신혼부부 입주 조건 | `haengbok-jutaek-sinon.mdx` | ⬜ |

### 📱 우선순위 15: 부동산 앱/플랫폼 활용 (10개)

> "호갱노노", "네이버부동산" = 실용 도구 검색. 체류시간 길음.

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 236 | 네이버 부동산 활용법 (시세/매물) | `naver-budongsan-hwalyong.mdx` | ⬜ |
| 237 | 호갱노노 사용법 (아파트 시세) | `hogang-nono-sayongbeop.mdx` | ⬜ |
| 238 | 직방/다방 활용법 비교 | `jikbang-dabang-bigyo.mdx` | ⬜ |
| 239 | 국토부 실거래가 공개시스템 사용법 | `guktobu-silgeoraega.mdx` | ⬜ |
| 240 | 등기부등본 인터넷 발급 방법 | `deunggibu-internet-balgup.mdx` | ⬜ |
| 241 | 건축물대장 열람 방법과 확인 사항 | `geonchugmul-daejang.mdx` | ⬜ |
| 242 | 토지이음 사용법 (용도지역 확인) | `toji-ieum-sayongbeop.mdx` | ⬜ |
| 243 | 청약홈 사용법 완벽 가이드 | `cheongnyakhom-sayongbeop.mdx` | ⬜ |
| 244 | 부동산114 활용법 (시세/분석) | `budongsan114-hwalyong.mdx` | ⬜ |
| 245 | 경매 사이트 추천 (대법원/지지옥션) | `gyeongmae-site-chucheon.mdx` | ⬜ |

### 📈 우선순위 16: 부동산 트렌드/전망 (15개)

> 전망 키워드 = 시의성 높고 공유율 높음. 매년 업데이트 가능.

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 246 | 2026년 부동산 시장 전망 총정리 | `2026-budongsan-jeonmang.mdx` | ⬜ |
| 247 | 2026년 전세 시장 전망과 대응 | `2026-jeonse-jeonmang.mdx` | ⬜ |
| 248 | 2026년 분양 시장 전망 | `2026-bunyang-jeonmang.mdx` | ⬜ |
| 249 | 2026년 부동산 정책 변경사항 총정리 | `2026-budongsan-jeongchaek.mdx` | ⬜ |
| 250 | 금리 인하 시 부동산 영향 | `geumli-inha-budongsan.mdx` | ⬜ |
| 251 | 금리 인상 시 부동산 영향 | `geumli-insang-budongsan.mdx` | ⬜ |
| 252 | 인구 감소와 부동산 전망 | `ingu-gamso-budongsan-jeonmang.mdx` | ⬜ |
| 253 | 1인 가구 증가와 부동산 트렌드 | `1in-gagu-budongsan-trend.mdx` | ⬜ |
| 254 | 서울 vs 수도권 어디가 유리할까 | `seoul-vs-sudokwon.mdx` | ⬜ |
| 255 | 지방 부동산 투자 가치 있을까 | `jibang-budongsan-gachi.mdx` | ⬜ |
| 256 | 전세 소멸 시대? 월세 전환 트렌드 | `jeonse-somyeol-wolse-trend.mdx` | ⬜ |
| 257 | 역전세 위기 현황과 대응 | `yeokjeonse-wigi-hyeonhwang.mdx` | ⬜ |
| 258 | 부동산 버블 징후 판단법 | `budongsan-bubble-jinghu.mdx` | ⬜ |
| 259 | 공공주택 확대 정책과 영향 | `gonggoong-jutaek-hwakdae.mdx` | ⬜ |
| 260 | 부동산 PF 위기와 개인 투자자 영향 | `budongsan-pf-wigi.mdx` | ⬜ |

### 🏗️ 우선순위 17: 아파트 브랜드/단지 비교 (15개)

> "자이 vs 래미안", "브랜드 아파트 순위" = 매수 결정 단계 검색

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 261 | 아파트 브랜드 순위 2026 (래미안/자이/힐스테이트) | `apartment-brand-sunwi-2026.mdx` | ⬜ |
| 262 | 래미안 vs 자이 vs 힐스테이트 비교 | `raemian-vs-xi-vs-hillstate.mdx` | ⬜ |
| 263 | 디에이치(DH) 아파트 특징과 시세 | `dh-apartment-teukjing.mdx` | ⬜ |
| 264 | 올림픽파크포레온 입주 분석 | `olympic-park-foreon.mdx` | ⬜ |
| 265 | 대장 아파트란? 지역별 대장 아파트 | `daejang-apartment-ran.mdx` | ⬜ |
| 266 | 브랜드 아파트 vs 비브랜드 가격 차이 | `brand-vs-non-brand.mdx` | ⬜ |
| 267 | 아파트 평형별 장단점 (24/34/59평) | `apartment-pyeonghyeong-jangdan.mdx` | ⬜ |
| 268 | 아파트 동/호수 선택 가이드 | `apartment-dong-hosu-guide.mdx` | ⬜ |
| 269 | 아파트 커뮤니티 시설 비교 | `apartment-community-bigyo.mdx` | ⬜ |
| 270 | 준신축 아파트 (5~10년) 투자 가치 | `junsinchuk-tuja-gachi.mdx` | ⬜ |
| 271 | 재건축 대상 아파트 찾는 법 | `jaegeonchuik-daesang-chatgi.mdx` | ⬜ |
| 272 | 서울 1000만원 이하 아파트 있을까 | `seoul-1000-iha-apartment.mdx` | ⬜ |
| 273 | 수도권 3억 이하 아파트 추천 지역 | `sudokwon-3eok-iha.mdx` | ⬜ |
| 274 | 신혼부부 5억 이하 아파트 추천 | `sinon-5eok-iha-apartment.mdx` | ⬜ |
| 275 | 학군 좋은 아파트 찾는 법 (학세권) | `hakgun-joheun-apartment.mdx` | ⬜ |

### ❓ 우선순위 18: 부동산 Q&A 롱테일 (35개)

> "~하면 어떻게 되나", "~할 수 있나" = 롱테일 황금 키워드. 경쟁 적고 전환율 높음.

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 276 | 전세 계약 중 집주인 변경되면? | `jeonse-jipjuin-byeongyeong.mdx` | ⬜ |
| 277 | 전세 만기 전 이사 가능한가? | `jeonse-mangi-jeon-isa.mdx` | ⬜ |
| 278 | 전세보증금 올려달라면 거부할 수 있나 | `jeonse-bojeunggeum-ollyo.mdx` | ⬜ |
| 279 | 임대인이 집 보여달라면 거부 가능? | `imdaein-jip-boyeo.mdx` | ⬜ |
| 280 | 전세 계약 해지 통보 기간 | `jeonse-haeji-tongbo.mdx` | ⬜ |
| 281 | 월세 밀리면 어떻게 되나 | `wolse-millimyeon.mdx` | ⬜ |
| 282 | 월세에서 전세로 전환 가능한가 | `wolse-jeonse-jeonhwan.mdx` | ⬜ |
| 283 | 전입신고 안 하면 어떻게 되나 | `jeonip-singo-an-hamyeon.mdx` | ⬜ |
| 284 | 보증금 돌려받기 전 이사 가도 되나 | `bojeunggeum-isa-doena.mdx` | ⬜ |
| 285 | 집주인 동의 없이 인테리어 해도 되나 | `jipjuin-dongui-interior.mdx` | ⬜ |
| 286 | 청약 당첨 후 포기하면 불이익? | `cheongnyak-pogi-burieik.mdx` | ⬜ |
| 287 | 분양권 전매 시 세금은? | `bunyangkwon-jeonmae-segeum.mdx` | ⬜ |
| 288 | 무주택 기간 산정 방법 | `mujutaek-gigan-sanjeong.mdx` | ⬜ |
| 289 | 부부 공동명의 장단점 | `bubu-gongdong-myeongui.mdx` | ⬜ |
| 290 | 1주택자 추가 매수 시 세금 | `1jutaek-chuga-maesu.mdx` | ⬜ |
| 291 | 부동산 증여 vs 매매 뭐가 유리할까 | `budongsan-jeungye-vs-maemae.mdx` | ⬜ |
| 292 | 상속받은 주택 양도세 | `sangsok-jutaek-yangdose.mdx` | ⬜ |
| 293 | 경매 낙찰 후 임차인 안 나가면? | `gyeongmae-imchain-an-nagamyeon.mdx` | ⬜ |
| 294 | 재개발 조합원 분담금이란? | `jaegaebal-bundamgeum.mdx` | ⬜ |
| 295 | 아파트 누수 책임은 누구? | `apartment-nusu-chaegim.mdx` | ⬜ |
| 296 | 공인중개사 중개사고 배상 청구 | `junggae-sago-baesang.mdx` | ⬜ |
| 297 | 허위매물 신고 방법 | `heoui-maemul-singo.mdx` | ⬜ |
| 298 | 부동산 계약 파기 시 위약금 | `budongsan-pagi-wiyakgeum.mdx` | ⬜ |
| 299 | 이사 시 원상복구 범위 | `isa-wongsang-bokgu.mdx` | ⬜ |
| 300 | 전세보증금 깎는 협상 방법 | `jeonse-kkakneun-hyeopsang.mdx` | ⬜ |
| 301 | 신축 아파트 하자 발견 시 대처 | `sinchuk-haja-daecheo.mdx` | ⬜ |
| 302 | 주택 매매 시 대출 끼고 사는 법 | `jutaek-daechul-kkigo.mdx` | ⬜ |
| 303 | 갭투자 실패하면 어떻게 되나 | `gap-tuja-silpae.mdx` | ⬜ |
| 304 | 경매 유찰되면 다시 참여 가능? | `gyeongmae-yuchal-dasi.mdx` | ⬜ |
| 305 | 다주택자 종부세 얼마나 내나 | `dajutaekja-jongbuse-eolma.mdx` | ⬜ |
| 306 | 전세대출 갈아타기 가능한가 | `jeonse-daechul-galatagi.mdx` | ⬜ |
| 307 | 재개발 입주권 매매 주의사항 | `jaegaebal-ipjukwon-juui.mdx` | ⬜ |
| 308 | 오피스텔 주거용/업무용 세금 차이 | `officetel-jugeo-eomu-segeum.mdx` | ⬜ |
| 309 | 집값 떨어지면 대출은 어떻게 되나 | `jipgap-tteoleojimyeon-daechul.mdx` | ⬜ |
| 310 | 전세 계약 시 특약사항 뭘 넣어야 하나 | `jeonse-teuknyak-sahang.mdx` | ⬜ |

---

## 🚫 중복 방지 규칙

글 작성 전 반드시 확인:
1. 이 파일에서 해당 주제가 이미 ✅ 완료인지 확인
2. `content/ko/real-estate/` 폴더에 유사한 파일명이 있는지 확인
3. FINANCE_WRITING_PLAN.md와 중복 여부 확인 (대출/금리 관련)
4. TAX_WRITING_PLAN.md와 중복 여부 확인 (취득세/양도세/재산세)
5. 완료 후 반드시 이 파일의 해당 항목을 ✅ 완료로 변경

---

## 📅 작성 일정 계획

### Phase 1: 전세/월세 (최우선)
- 전세사기 예방, 계약 체크리스트
- 전세보증보험, 확정일자

### Phase 2: 매매/등기
- 매매 절차, 등기부등본
- 취득세, 중개수수료

### Phase 3: 청약/분양
- 청약 점수, 특별공급
- 분양 일정

### Phase 4: 투자/경매
- 경매 입문, 재개발 기초
- 상가/토지 투자

### Phase 5: 지역별 분석
- 서울/수도권 시세
- GTX/신도시

---

## 🎯 작성 시 체크리스트

각 글 작성 전:
- [ ] 이 파일에서 해당 주제 상태 확인 (중복 방지)
- [ ] 국토교통부/한국부동산원 최신 정보 확인
- [ ] 관련 법률 개정사항 반영
- [ ] 관련 글 내부링크 연결

각 글 작성 후:
- [ ] SEO 체크리스트 확인
- [ ] LinkButton URL 검증
- [ ] 1500자 이상 확인
- [ ] 표/비교표 포함 확인
- [ ] **이 파일에서 해당 항목 ✅ 완료로 변경** ← 필수!

---

## 📌 참고 사이트

- 국토교통부: https://www.molit.go.kr
- 한국부동산원: https://www.reb.or.kr
- 한국토지주택공사(LH): https://www.lh.or.kr
- 청약홈: https://www.applyhome.co.kr
- 대법원 인터넷등기소: https://www.iros.go.kr
- 국토교통부 실거래가: https://rt.molit.go.kr
- 대한법률구조공단: https://www.klac.or.kr
- 서울부동산정보광장: https://land.seoul.go.kr
