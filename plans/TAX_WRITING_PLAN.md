# 세금/절세 글 작성 계획

> 연말정산, 종합소득세, 양도세 등 세금 관련 글 작성 마스터 플랜
> 생성일: 2026-01-29
> 카테고리: tax
> 폴더: `content/ko/tax/`

---

## 📊 현황 요약

- **작성 완료**: 15개
- **작성 예정**: 305개 (도구 활용 콘텐츠 15개 포함)
- **총 목표**: 320개

---

## 🔧 도구 아이디어 (체류시간 ↑)

> 세금은 "내가 얼마 내야 하나" + "어떻게 줄이나"가 핵심. 진단형/캘린더형 도구 효과적.

| 도구 | 경로 | 핵심 기능 | 우선순위 |
|------|------|----------|---------|
| 연봉 실수령액 계산기 (기존) | `/tools/salary-calculator` | 연봉 → 4대보험/세금 공제 후 실수령액 | ✅ 완료 |
| 연말정산 환급 계산기 (기존) | `/tools/tax-refund-calculator` | 공제 항목 입력 → 예상 환급/추가납부액 | ✅ 완료 |
| 퇴직금 계산기 (기존) | `/tools/severance-calculator` | 근속연수/급여 → 퇴직금 계산 | ✅ 완료 |
| **세금 캘린더** | `/tools/tax-calendar` | 월별 세금 신고/납부 기한 한눈에 조회 + 알림 | 🔴 최우선 |
| **연말정산 절세 진단** | `/tools/year-end-tax-diagnosis` | 질문 7~10개 답변 → 놓치고 있는 공제 항목 찾기 | 🔴 최우선 |
| **종합소득세 신고 가이드** | `/tools/income-tax-filing-guide` | 소득 유형 선택 → 신고 방법/기한/필요서류 단계별 안내 | 🟠 높음 |
| **직장인 vs 프리랜서 세금 비교기** | `/tools/employee-vs-freelancer-tax` | 같은 연소득 기준 세금/보험료 차이 비교 | 🟠 높음 |
| **절세 체크리스트** | `/tools/tax-saving-checklist` | 직장인/자영업자/프리랜서별 절세 항목 체크 | 🟡 중간 |
| **증여세 간편 계산기** | `/tools/gift-tax-calculator` | 증여 금액/관계 입력 → 증여세 자동 계산 | 🟡 중간 |
| **양도세 간편 계산기** | `/tools/capital-gains-tax-calculator` | 취득가/양도가/보유기간 → 양도세 예상액 | 🟡 중간 |

---

## 📝 작성 예정 목록

### 🔴 우선순위 1: 연말정산 (40개)

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 1 | 연말정산총정리 | `yeonmal-jeongsang-chongjeongli.mdx` | ✅ 완료 |
| 2 | 연말정산기간일정 | `yeonmal-gigan-iljung.mdx` | ✅ 완료 |
| 3 | 연말정산간소화서비스 | `yeonmal-gansohwa.mdx` | ✅ 완료 |
| 4 | 연말정산환급금계산 | `yeonmal-hwangeum-gyesan.mdx` | ✅ 완료 |
| 5 | 연말정산추가납부 | `yeonmal-chuga-napbu.mdx` | ✅ 완료 |
| 6 | 연말정산소득공제 | `yeonmal-sodeuk-gongje.mdx` | ✅ 완료 |
| 7 | 연말정산세액공제 | `yeonmal-seaek-gongje.mdx` | ✅ 완료 |
| 8 | 소득공제vs세액공제차이 | `sodeuk-vs-seaek-gongje.mdx` | ✅ 완료 |
| 9 | 인적공제총정리 | `injeok-gongje.mdx` | ✅ 완료 |
| 10 | 부양가족공제 | `buyang-gajok-gongje.mdx` | ✅ 완료 |
| 11 | 배우자공제 | `baewuja-gongje.mdx` | ✅ 완료 |
| 12 | 자녀공제 | `janyeo-gongje.mdx` | ✅ 완료 |
| 13 | 부모님공제 | `bumonim-gongje.mdx` | ✅ 완료 |
| 14 | 형제자매공제 | `hyeongje-jamae-gongje.mdx` | ✅ 완료 |
| 15 | 신용카드공제 | `sinyong-card-gongje.mdx` | ✅ 완료 |
| 16 | 체크카드공제 | `check-card-gongje.mdx` | ✅ 완료 |
| 17 | 현금영수증공제 | `hyeongeum-yeongsujeung.mdx` | ✅ 완료 |
| 18 | 카드공제한도 | `card-gongje-hando.mdx` | ✅ 완료 |
| 19 | 의료비공제 | `euryobi-gongje.mdx` | ⬜ |
| 20 | 의료비공제한도 | `euryobi-gongje-hando.mdx` | ⬜ |
| 21 | 실손보험의료비공제 | `silson-euryobi-gongje.mdx` | ⬜ |
| 22 | 교육비공제 | `gyoyukbi-gongje.mdx` | ⬜ |
| 23 | 대학등록금공제 | `daehak-deungnokgeum.mdx` | ⬜ |
| 24 | 학원비공제 | `hakwonbi-gongje.mdx` | ⬜ |
| 25 | 월세공제 | `wolse-gongje.mdx` | ⬜ |
| 26 | 월세세액공제조건 | `wolse-seaek-jogeon.mdx` | ⬜ |
| 27 | 전세대출이자공제 | `jeonse-daechul-ija-gongje.mdx` | ⬜ |
| 28 | 주담대이자공제 | `judamdae-ija-gongje.mdx` | ⬜ |
| 29 | 주택청약공제 | `jutaek-cheongnyak-gongje.mdx` | ⬜ |
| 30 | 보험료공제 | `boheomryo-gongje.mdx` | ⬜ |
| 31 | 연금저축공제 | `yeongeum-jeochuk-gongje.mdx` | ⬜ |
| 32 | IRP공제 | `irp-gongje.mdx` | ⬜ |
| 33 | 기부금공제 | `gibugeum-gongje.mdx` | ⬜ |
| 34 | 고향사랑기부금 | `gohyang-sarang-gibugeum.mdx` | ⬜ |
| 35 | 정치자금기부금 | `jeongchi-jageum-gibugeum.mdx` | ⬜ |
| 36 | 중소기업취업청년공제 | `jungso-cheongnyeon-gongje.mdx` | ⬜ |
| 37 | 신혼부부연말정산 | `sinon-bubu-yeonmal.mdx` | ⬜ |
| 38 | 맞벌이연말정산 | `matbeoli-yeonmal.mdx` | ⬜ |
| 39 | 퇴사자연말정산 | `toesaja-yeonmal.mdx` | ⬜ |
| 40 | 이직자연말정산 | `ijikja-yeonmal.mdx` | ⬜ |

### 🟠 우선순위 2: 종합소득세 (30개)

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 41 | 종합소득세총정리 | `jonghap-sodeukse-chongjeongli.mdx` | ⬜ |
| 42 | 종합소득세신고기간 | `jonghap-singo-gigan.mdx` | ⬜ |
| 43 | 종합소득세신고방법 | `jonghap-singo-bangbeop.mdx` | ⬜ |
| 44 | 홈택스종합소득세 | `hometax-jonghap.mdx` | ⬜ |
| 45 | 종합소득세계산 | `jonghap-sodeukse-gyesan.mdx` | ⬜ |
| 46 | 종합소득세율표 | `jonghap-sodeukse-yulpyo.mdx` | ⬜ |
| 47 | 프리랜서종합소득세 | `freelancer-jonghap.mdx` | ⬜ |
| 48 | 유튜버종합소득세 | `youtuber-jonghap.mdx` | ⬜ |
| 49 | 블로거종합소득세 | `blogger-jonghap.mdx` | ⬜ |
| 50 | 배달라이더세금 | `baedal-rider-segeum.mdx` | ⬜ |
| 51 | 대리운전세금 | `daeri-unjeon-segeum.mdx` | ⬜ |
| 52 | 투잡세금신고 | `tujab-segeum-singo.mdx` | ⬜ |
| 53 | N잡러세금 | `njab-segeum.mdx` | ⬜ |
| 54 | 단순경비율 | `dansun-gyeongbiryul.mdx` | ⬜ |
| 55 | 기준경비율 | `gijun-gyeongbiryul.mdx` | ⬜ |
| 56 | 간편장부 | `ganpyeon-jangbu.mdx` | ⬜ |
| 57 | 복식부기 | `boksik-bugi.mdx` | ⬜ |
| 58 | 필요경비처리 | `piryo-gyeongbi-cheori.mdx` | ⬜ |
| 59 | 세금계산서발행 | `segeum-gyesanseo-balhaeng.mdx` | ⬜ |
| 60 | 원천징수 | `woncheon-jingsu.mdx` | ⬜ |
| 61 | 3.3%원천징수 | `3.3-woncheon.mdx` | ⬜ |
| 62 | 사업소득세 | `saeop-sodeukse.mdx` | ⬜ |
| 63 | 기타소득세 | `gita-sodeukse.mdx` | ⬜ |
| 64 | 근로소득vs사업소득 | `geunro-vs-saeop-sodeuk.mdx` | ⬜ |
| 65 | 종합소득세환급 | `jonghap-hwangeum.mdx` | ⬜ |
| 66 | 종합소득세분납 | `jonghap-bunnap.mdx` | ⬜ |
| 67 | 종합소득세가산세 | `jonghap-gasanse.mdx` | ⬜ |
| 68 | 세무사비용 | `semusa-biyong.mdx` | ⬜ |
| 69 | 삼쩜삼환급 | `samjjeomsam-hwangeum.mdx` | ⬜ |
| 70 | 세금신고앱비교 | `segeum-singo-app.mdx` | ⬜ |

### 🟡 우선순위 3: 부가가치세 (20개)

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 71 | 부가가치세총정리 | `bugagachise-chongjeongli.mdx` | ⬜ |
| 72 | 부가세신고기간 | `bugase-singo-gigan.mdx` | ⬜ |
| 73 | 부가세신고방법 | `bugase-singo-bangbeop.mdx` | ⬜ |
| 74 | 일반과세자부가세 | `ilban-gwaseja-bugase.mdx` | ⬜ |
| 75 | 간이과세자부가세 | `gani-gwaseja-bugase.mdx` | ⬜ |
| 76 | 면세사업자 | `myeonse-saeopja.mdx` | ⬜ |
| 77 | 일반vs간이과세 | `ilban-vs-gani.mdx` | ⬜ |
| 78 | 간이과세기준 | `gani-gwase-gijun.mdx` | ⬜ |
| 79 | 부가세환급 | `bugase-hwangeum.mdx` | ⬜ |
| 80 | 부가세예정신고 | `bugase-yejeong-singo.mdx` | ⬜ |
| 81 | 부가세확정신고 | `bugase-hwakjeong-singo.mdx` | ⬜ |
| 82 | 매입세액공제 | `maeip-seaek-gongje.mdx` | ⬜ |
| 83 | 세금계산서 | `segeum-gyesanseo.mdx` | ⬜ |
| 84 | 전자세금계산서 | `jeonja-segeum-gyesanseo.mdx` | ⬜ |
| 85 | 현금영수증의무발행 | `hyeongeum-uimu-balhaeng.mdx` | ⬜ |
| 86 | 사업자등록방법 | `saeopja-deungrok.mdx` | ⬜ |
| 87 | 간이과세자등록 | `gani-gwaseja-deungrok.mdx` | ⬜ |
| 88 | 사업자폐업신고 | `saeopja-pyeeop-singo.mdx` | ⬜ |
| 89 | 부가세가산세 | `bugase-gasanse.mdx` | ⬜ |
| 90 | 부가세절세방법 | `bugase-jeolse.mdx` | ⬜ |

### 🟢 우선순위 4: 양도소득세 (25개)

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 91 | 양도소득세총정리 | `yangdo-sodeukse-chongjeongli.mdx` | ⬜ |
| 92 | 양도세계산방법 | `yangdose-gyesan.mdx` | ⬜ |
| 93 | 양도세세율표 | `yangdose-seyul.mdx` | ⬜ |
| 94 | 양도세신고기간 | `yangdose-singo-gigan.mdx` | ⬜ |
| 95 | 1세대1주택비과세 | `1sedae-1jutaek-bigwase.mdx` | ⬜ |
| 96 | 1세대1주택조건 | `1sedae-1jutaek-jogeon.mdx` | ⬜ |
| 97 | 일시적2주택비과세 | `ilsijeok-2jutaek.mdx` | ⬜ |
| 98 | 다주택자양도세 | `dajutaekja-yangdose.mdx` | ⬜ |
| 99 | 다주택자중과세 | `dajutaekja-junggwase.mdx` | ⬜ |
| 100 | 장기보유특별공제 | `janggi-boyu-teukbyeol-gongje.mdx` | ⬜ |
| 101 | 양도세비과세요건 | `yangdose-bigwase-yogeon.mdx` | ⬜ |
| 102 | 분양권양도세 | `bunyangkwon-yangdose.mdx` | ⬜ |
| 103 | 입주권양도세 | `ipjukwon-yangdose.mdx` | ⬜ |
| 104 | 재개발재건축양도세 | `jaegaebal-yangdose.mdx` | ⬜ |
| 105 | 상가양도세 | `sangga-yangdose.mdx` | ⬜ |
| 106 | 오피스텔양도세 | `officetel-yangdose.mdx` | ⬜ |
| 107 | 토지양도세 | `toji-yangdose.mdx` | ⬜ |
| 108 | 주식양도세 | `jusik-yangdose.mdx` | ⬜ |
| 109 | 대주주양도세 | `daejuju-yangdose.mdx` | ⬜ |
| 110 | 해외주식양도세 | `haeoe-jusik-yangdose.mdx` | ⬜ |
| 111 | 비트코인양도세 | `bitcoin-yangdose.mdx` | ⬜ |
| 112 | 가상자산세금 | `gasang-jasan-segeum.mdx` | ⬜ |
| 113 | 양도세절세방법 | `yangdose-jeolse.mdx` | ⬜ |
| 114 | 양도세분납 | `yangdose-bunnap.mdx` | ⬜ |
| 115 | 양도세가산세 | `yangdose-gasanse.mdx` | ⬜ |

### 🔵 우선순위 5: 증여세/상속세 (20개)

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 116 | 증여세총정리 | `jeungyeose-chongjeongli.mdx` | ⬜ |
| 117 | 증여세계산 | `jeungyeose-gyesan.mdx` | ⬜ |
| 118 | 증여세세율 | `jeungyeose-seyul.mdx` | ⬜ |
| 119 | 증여세공제한도 | `jeungyeose-gongje-hando.mdx` | ⬜ |
| 120 | 자녀증여한도 | `janyeo-jeungye-hando.mdx` | ⬜ |
| 121 | 배우자증여한도 | `baewuja-jeungye-hando.mdx` | ⬜ |
| 122 | 부모자녀간증여 | `bumo-janyeo-jeungye.mdx` | ⬜ |
| 123 | 현금증여신고 | `hyeongeum-jeungye-singo.mdx` | ⬜ |
| 124 | 부동산증여 | `budongsan-jeungye.mdx` | ⬜ |
| 125 | 주식증여 | `jusik-jeungye.mdx` | ⬜ |
| 126 | 증여세절세방법 | `jeungyeose-jeolse.mdx` | ⬜ |
| 127 | 상속세총정리 | `sangsokse-chongjeongli.mdx` | ⬜ |
| 128 | 상속세계산 | `sangsokse-gyesan.mdx` | ⬜ |
| 129 | 상속세세율 | `sangsokse-seyul.mdx` | ⬜ |
| 130 | 상속세공제 | `sangsokse-gongje.mdx` | ⬜ |
| 131 | 배우자상속공제 | `baewuja-sangsok-gongje.mdx` | ⬜ |
| 132 | 상속세신고기한 | `sangsokse-singo-gihan.mdx` | ⬜ |
| 133 | 상속포기 | `sangsok-pogi.mdx` | ⬜ |
| 134 | 한정승인 | `hanjeong-seungin.mdx` | ⬜ |
| 135 | 상속세절세방법 | `sangsokse-jeolse.mdx` | ⬜ |

### 🟣 우선순위 6: 취득세/재산세/종부세 (25개)

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 136 | 취득세총정리 | `chwidukkse-chongjeongli.mdx` | ⬜ |
| 137 | 취득세계산 | `chwidukkse-gyesan.mdx` | ⬜ |
| 138 | 취득세세율 | `chwidukkse-seyul.mdx` | ⬜ |
| 139 | 주택취득세 | `jutaek-chwidukkse.mdx` | ⬜ |
| 140 | 다주택자취득세 | `dajutaekja-chwidukkse.mdx` | ⬜ |
| 141 | 생애최초취득세감면 | `saengae-choechu-gamyeon.mdx` | ⬜ |
| 142 | 신혼부부취득세감면 | `sinon-chwidukkse-gamyeon.mdx` | ⬜ |
| 143 | 취득세감면조건 | `chwidukkse-gamyeon-jogeon.mdx` | ⬜ |
| 144 | 재산세총정리 | `jaesanse-chongjeongli.mdx` | ⬜ |
| 145 | 재산세계산 | `jaesanse-gyesan.mdx` | ⬜ |
| 146 | 재산세납부기간 | `jaesanse-napbu-gigan.mdx` | ⬜ |
| 147 | 재산세감면 | `jaesanse-gamyeon.mdx` | ⬜ |
| 148 | 종합부동산세총정리 | `jongbu-chongjeongli.mdx` | ⬜ |
| 149 | 종부세계산 | `jongbuse-gyesan.mdx` | ⬜ |
| 150 | 종부세대상 | `jongbuse-daesang.mdx` | ⬜ |
| 151 | 종부세세율 | `jongbuse-seyul.mdx` | ⬜ |
| 152 | 종부세1세대1주택 | `jongbuse-1sedae.mdx` | ⬜ |
| 153 | 종부세합산배제 | `jongbuse-hapsan-baje.mdx` | ⬜ |
| 154 | 자동차세총정리 | `jadongchase-chongjeongli.mdx` | ⬜ |
| 155 | 자동차세계산 | `jadongchase-gyesan.mdx` | ⬜ |
| 156 | 자동차세연납할인 | `jadongchase-yeonnap.mdx` | ⬜ |
| 157 | 전기차자동차세 | `jeongicha-jadongchase.mdx` | ⬜ |
| 158 | 지방세총정리 | `jibangse-chongjeongli.mdx` | ⬜ |
| 159 | 주민세 | `juminse.mdx` | ⬜ |
| 160 | 지방소득세 | `jibang-sodeukse.mdx` | ⬜ |

### ⚪ 우선순위 7: 절세/세금전략 (20개)

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 161 | 직장인절세방법 | `jikjangin-jeolse.mdx` | ⬜ |
| 162 | 프리랜서절세방법 | `freelancer-jeolse.mdx` | ⬜ |
| 163 | 자영업자절세방법 | `jaeyeongeopja-jeolse.mdx` | ⬜ |
| 164 | 1인사업자절세 | `1in-saeopja-jeolse.mdx` | ⬜ |
| 165 | 법인전환절세 | `beopin-jeonhwan-jeolse.mdx` | ⬜ |
| 166 | 부동산절세방법 | `budongsan-jeolse.mdx` | ⬜ |
| 167 | 주식투자세금절세 | `jusik-tuja-jeolse.mdx` | ⬜ |
| 168 | ISA절세활용 | `isa-jeolse-hwalyong.mdx` | ⬜ |
| 169 | 연금저축절세 | `yeongeum-jeochuk-jeolse.mdx` | ⬜ |
| 170 | IRP절세활용 | `irp-jeolse-hwalyong.mdx` | ⬜ |
| 171 | 소득분산절세 | `sodeuk-bunsan-jeolse.mdx` | ⬜ |
| 172 | 가족법인절세 | `gajok-beopin-jeolse.mdx` | ⬜ |
| 173 | 노란우산공제 | `noran-usan-gongje.mdx` | ⬜ |
| 174 | 성실신고확인 | `seongssil-singo-hwagin.mdx` | ⬜ |
| 175 | 세무조사대비 | `semujosa-daebi.mdx` | ⬜ |
| 176 | 경정청구 | `gyeongjeong-cheonggu.mdx` | ⬜ |
| 177 | 수정신고 | `sujeong-singo.mdx` | ⬜ |
| 178 | 기한후신고 | `gihanhu-singo.mdx` | ⬜ |
| 179 | 가산세줄이기 | `gasanse-juligi.mdx` | ⬜ |
| 180 | 세금체납시불이익 | `segeum-chenap-burieik.mdx` | ⬜ |

### 🟤 우선순위 8: 세금용어/계산기 (20개)

> 💡 **계산기 연계**: `/tools/salary-calculator`, `/tools/tax-refund-calculator`, `/tools/severance-calculator` 활용

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 181 | 과세표준이란 | `gwase-pyojun.mdx` | ⬜ |
| 182 | 세율이란 | `seyul-iran.mdx` | ⬜ |
| 183 | 누진세란 | `nujinse-ran.mdx` | ⬜ |
| 184 | 원천징수란 | `woncheon-jingsu-ran.mdx` | ⬜ |
| 185 | 필요경비란 | `piryo-gyeongbi-ran.mdx` | ⬜ |
| 186 | 공제란 | `gongje-ran.mdx` | ⬜ |
| 187 | 감면이란 | `gamyeon-iran.mdx` | ⬜ |
| 188 | 비과세란 | `bigwase-ran.mdx` | ⬜ |
| 189 | 분리과세란 | `bunli-gwase-ran.mdx` | ⬜ |
| 190 | 종합과세란 | `jonghap-gwase-ran.mdx` | ⬜ |
| 191 | 연말정산계산기 | `yeonmal-gyesangi.mdx` | ⬜ |
| 192 | 종합소득세계산기 | `jonghap-gyesangi.mdx` | ⬜ |
| 193 | 양도세계산기 | `yangdose-gyesangi.mdx` | ⬜ |
| 194 | 증여세계산기 | `jeungyeose-gyesangi.mdx` | ⬜ |
| 195 | 상속세계산기 | `sangsokse-gyesangi.mdx` | ⬜ |
| 196 | 취득세계산기 | `chwidukkse-gyesangi.mdx` | ⬜ |
| 197 | 종부세계산기 | `jongbuse-gyesangi.mdx` | ⬜ |
| 198 | 자동차세계산기 | `jadongchase-gyesangi.mdx` | ⬜ |
| 199 | 부가세계산기 | `bugase-gyesangi.mdx` | ⬜ |
| 200 | 세금캘린더2026 | `segeum-calendar-2026.mdx` | ⬜ |

### 🧮 우선순위 9: 계산기 활용 콘텐츠 (15개) - NEW

> **연계 계산기**: 연봉 실수령액, 연말정산 환급액, 퇴직금 계산기

#### 📋 콘텐츠 유형별 분류

| 유형 | 콘텐츠 | 핵심 구조 |
|------|--------|-----------|
| 시뮬레이션형 | 연봉 3000~1억 실수령액 | 결과표 → 공제 상세 → 계산기 CTA |
| 기준표형 | 4대보험요율, 소득세율표 | 표 → 적용 예시 → 계산기 CTA |
| 가이드형 | 퇴직금 계산법 완벽가이드, 환급 많이 받는법 | 단계별 설명 → 팁 → 계산기 CTA |
| 비교형 | 신용카드 vs 체크카드 공제 | 비교표 → 상황별 추천 → 계산기 CTA |
| 상황별 FAQ형 | 퇴직금 세금, 중간정산 조건 | 질문→결론→상세→계산기 CTA |

| # | 주제 | 파일명 | 계산기 연계 | 유형 | 상태 |
|---|------|--------|-------------|------|------|
| 201 | ~~2026년 연봉별 실수령액표~~ | `2026-yeonbong-silsuryeongaek-pyo.mdx` | salary-calculator | 기준표 | ✅ 완료 |
| 202 | ~~연봉 3000만원 실수령액~~ | `yeonbong-3000-silsuryeong.mdx` | salary-calculator | 시뮬레이션 | ✅ 완료 |
| 203 | ~~연봉 4000만원 실수령액~~ | `yeonbong-4000-silsuryeong.mdx` | salary-calculator | 시뮬레이션 | ✅ 완료 |
| 204 | ~~연봉 5000만원 실수령액~~ | `yeonbong-5000-silsuryeong.mdx` | salary-calculator | 시뮬레이션 | ✅ 완료 |
| 205 | ~~연봉 6000만원 실수령액~~ | `yeonbong-6000-silsuryeong.mdx` | salary-calculator | 시뮬레이션 | ✅ 완료 |
| 206 | ~~연봉 7000만원 실수령액~~ | `yeonbong-7000-silsuryeong.mdx` | salary-calculator | 시뮬레이션 | ✅ 완료 |
| 207 | ~~연봉 1억 실수령액~~ | `yeonbong-1eok-silsuryeong.mdx` | salary-calculator | 시뮬레이션 | ✅ 완료 |
| 208 | ~~2026년 4대보험요율 정리~~ | `2026-4dae-boheom-yoyul.mdx` | salary-calculator | 기준표 | ✅ 완료 |
| 209 | ~~2026년 소득세율표~~ | `2026-sodeukse-yulpyo.mdx` | salary-calculator | 기준표 | ✅ 완료 |
| 210 | ~~퇴직금 계산법 완벽가이드~~ | `toejikgeum-gyesan-guide.mdx` | severance-calculator | 가이드 | ✅ 완료 |
| 211 | ~~퇴직금 세금 계산법~~ | `toejikgeum-segeum-gyesan.mdx` | severance-calculator | 상황FAQ | ✅ 완료 |
| 212 | ~~퇴직금 중간정산 조건~~ | `toejikgeum-junggan-jeongsan.mdx` | severance-calculator | 상황FAQ | ✅ 완료 |
| 213 | ~~연말정산 환급 많이 받는법~~ | `yeonmal-hwangeum-manhi.mdx` | tax-refund-calculator | 가이드 | ✅ 완료 |
| 214 | ~~연금저축 세액공제 최대화~~ | `yeongeum-jeochuk-choedaehwa.mdx` | tax-refund-calculator | 가이드 | ✅ 완료 |
| 215 | ~~신용카드 vs 체크카드 공제 비교~~ | `sinyong-vs-check-gongje.mdx` | tax-refund-calculator | 비교 | ✅ 완료 |

---

> 📖 **계산기 활용 콘텐츠 상세 작성 가이드**: `WRITING_GUIDE.md` 참조

---

### 🪙 우선순위 10: 가상자산 과세 (10개)

> 2026년 가상자산 과세 시행! 코인 세금 검색량 폭발 예상. 최우선 작성 권장.

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 216 | 가상자산 과세 총정리 2026 | `gasang-jasan-gwase-2026.mdx` | ⬜ |
| 217 | 코인 세금 계산 방법 (수익 250만원 비과세) | `coin-segeum-gyesan.mdx` | ⬜ |
| 218 | 코인 수익 홈택스 신고 방법 | `coin-hometax-singo.mdx` | ⬜ |
| 219 | 해외 거래소 코인 세금 신고 | `haeoe-georaeso-coin-segeum.mdx` | ⬜ |
| 220 | 스테이킹/에어드랍 수익 세금 | `staking-airdrop-segeum.mdx` | ⬜ |
| 221 | NFT 거래 세금 부과 기준 | `nft-georae-segeum.mdx` | ⬜ |
| 222 | 코인 손실 공제 가능한가? | `coin-sonsil-gongje.mdx` | ⬜ |
| 223 | 가상자산 세금 절세 방법 | `gasang-jasan-jeolse.mdx` | ⬜ |
| 224 | 코인 증여세 (자녀에게 코인 보내면?) | `coin-jeungyeose.mdx` | ⬜ |
| 225 | 가상자산 세금 FAQ 10가지 | `gasang-jasan-segeum-faq.mdx` | ⬜ |

### 📱 우선순위 11: 부업/플랫폼 소득 세금 (12개)

> 스마트스토어/유튜브/쿠팡파트너스 등 부업 세금 = 20~40대 필수 검색

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 226 | 스마트스토어 세금 총정리 | `smart-store-segeum.mdx` | ⬜ |
| 227 | 쿠팡파트너스 수익 세금 신고 | `coupang-partners-segeum.mdx` | ⬜ |
| 228 | 유튜브 수익 세금 신고 방법 | `youtube-sueik-segeum.mdx` | ⬜ |
| 229 | 인스타그램 광고/협찬 수익 세금 | `instagram-gwanggo-segeum.mdx` | ⬜ |
| 230 | 당근마켓/중고거래 세금 기준 | `danggeun-junggo-segeum.mdx` | ⬜ |
| 231 | 에어비앤비 수익 세금 | `airbnb-sueik-segeum.mdx` | ⬜ |
| 232 | 쿠팡플렉스/배달 라이더 세금 | `coupang-flex-segeum.mdx` | ⬜ |
| 233 | 블로그 애드센스 수익 세금 | `adsense-sueik-segeum.mdx` | ⬜ |
| 234 | 전자책/PDF 판매 세금 | `ebook-panmae-segeum.mdx` | ⬜ |
| 235 | 크몽/프리랜서 플랫폼 세금 | `kmong-freelancer-segeum.mdx` | ⬜ |
| 236 | 부업 연 300만원 이하 세금 내야 하나? | `buup-300-segeum.mdx` | ⬜ |
| 237 | 투잡 직장인 세금 신고 총정리 | `tujab-jikjangin-segeum.mdx` | ⬜ |

### 💡 우선순위 12: 생활 속 세금 이슈 (10개)

> "부모님께 돈 보내면 증여세?" 등 일상 궁금증 = 높은 클릭률

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 238 | 부모님께 돈 보내면 증여세 내야 하나? | `bumonim-don-jeungyeose.mdx` | ⬜ |
| 239 | 자녀 용돈/세뱃돈 증여세 기준 | `janyeo-yongdon-jeungyeose.mdx` | ⬜ |
| 240 | 부부간 통장 이체 증여세 기준 | `bubu-tongjang-iche-jeungyeose.mdx` | ⬜ |
| 241 | 경품 당첨 세금 (이벤트/경품/복권) | `gyeongpum-dangcheom-segeum.mdx` | ⬜ |
| 242 | 복권 당첨금 세금 얼마나 떼나 | `bokgwon-dangcheomgeum-segeum.mdx` | ⬜ |
| 243 | 이혼 시 재산분할 세금 | `ihon-jaesanbunhal-segeum.mdx` | ⬜ |
| 244 | 부동산 명의 이전 시 세금 | `budongsan-myeongui-ijeon-segeum.mdx` | ⬜ |
| 245 | 해외 직구 관세/부가세 기준 | `haeoe-jikgu-gwanse.mdx` | ⬜ |
| 246 | 중고차 취득세 계산 방법 | `junggocha-chwidukse.mdx` | ⬜ |
| 247 | 퇴직금 받으면 세금 얼마나 내나 | `toejikgeum-segeum-eolma.mdx` | ⬜ |

### 🌏 우선순위 13: 해외 소득/거주 세금 (8개)

> 해외 취업/이주/투자 증가로 해외 세금 관련 검색 급증

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 248 | 해외 근무자 국내 세금 신고 의무 | `haeoe-geunmuja-segeum.mdx` | ⬜ |
| 249 | 해외 거주자 국내 부동산 세금 | `haeoe-geojuja-budongsan-segeum.mdx` | ⬜ |
| 250 | 해외 이자/배당 소득 세금 | `haeoe-ija-baedang-segeum.mdx` | ⬜ |
| 251 | 이중과세방지협정이란? | `ijung-gwase-bangji.mdx` | ⬜ |
| 252 | 해외 금융계좌 신고 의무 (5억 이상) | `haeoe-gyejwa-singo.mdx` | ⬜ |
| 253 | 해외 송금 세금과 신고 기준 | `haeoe-songgeum-segeum.mdx` | ⬜ |
| 254 | 해외 상속/증여 세금 | `haeoe-sangsok-jeungye-segeum.mdx` | ⬜ |
| 255 | 해외 부동산 양도세 | `haeoe-budongsan-yangdose.mdx` | ⬜ |

### ❓ 우선순위 14: 세금 Q&A 롱테일 (25개)

> "~하면 세금 내야 하나", "~얼마나 떼나" = 구체적 질문 롱테일. 경쟁 적고 전환율 높음.

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 256 | 월세 살면서 세액공제 못 받는 경우 | `wolse-seaek-mot-badneun.mdx` | ⬜ |
| 257 | 연말정산 놓쳤으면 어떻게 하나 | `yeonmal-nochyeosseumyeon.mdx` | ⬜ |
| 258 | 연말정산 부양가족 중복 공제 걸리면 | `buyang-jungbok-geollimyeon.mdx` | ⬜ |
| 259 | 종합소득세 안 내면 어떻게 되나 | `jonghap-an-naemyeon.mdx` | ⬜ |
| 260 | 세금 체납하면 신용등급 떨어지나 | `segeum-chenap-sinyong.mdx` | ⬜ |
| 261 | 세금 분납 신청 방법과 조건 | `segeum-bunnap-sinchung.mdx` | ⬜ |
| 262 | 세금 환급 언제 들어오나 (시기별) | `segeum-hwangeum-eonje.mdx` | ⬜ |
| 263 | 부모님 의료비 내가 공제 가능한가 | `bumonim-euryobi-gongje-ganeung.mdx` | ⬜ |
| 264 | 형제자매 부양가족 등록 조건 | `hyeongje-buyang-deungrok.mdx` | ⬜ |
| 265 | 맞벌이 자녀 공제 누가 받는 게 유리 | `matbeoli-janyeo-nugaga-yuri.mdx` | ⬜ |
| 266 | 연말정산 추가납부 분할 가능한가 | `yeonmal-chuga-bunhal.mdx` | ⬜ |
| 267 | 현금 거래 세금 신고 안 하면 | `hyeongeum-georae-an-hamyeon.mdx` | ⬜ |
| 268 | 세무서에서 연락 오면 어떻게 하나 | `semuseo-yeollak-omyeon.mdx` | ⬜ |
| 269 | 경정청구로 세금 돌려받는 방법 | `gyeongjeong-dolryeo-badgi.mdx` | ⬜ |
| 270 | 5년 전 세금도 돌려받을 수 있나 | `5nyeon-jeon-segeum-dolryeo.mdx` | ⬜ |
| 271 | 증여세 자진신고 안 하면 벌금 | `jeungyeose-an-hamyeon.mdx` | ⬜ |
| 272 | 부동산 증여 vs 매매 뭐가 유리 | `budongsan-jeungye-vs-maemae.mdx` | ⬜ |
| 273 | 양도세 비과세 2년 거주 조건 상세 | `yangdose-2nyeon-geoju.mdx` | ⬜ |
| 274 | 재산세 너무 많이 나왔을 때 이의신청 | `jaesanse-uisinchung.mdx` | ⬜ |
| 275 | 종부세 합산 배제 신고 방법 | `jongbuse-hapsan-baje-singo.mdx` | ⬜ |
| 276 | 사업자 세금 미납 시 불이익 총정리 | `saeopja-minap-burieik.mdx` | ⬜ |
| 277 | 세금 폭탄 피하는 연간 절세 로드맵 | `segeum-poktan-pihagi.mdx` | ⬜ |
| 278 | 자녀 결혼 자금 증여세 공제 한도 | `janyeo-gyeolhon-jeungye.mdx` | ⬜ |
| 279 | 전세 보증금 돌려줄 때 세금 | `jeonse-dolryeojul-ttae-segeum.mdx` | ⬜ |
| 280 | 상가 임대소득 세금 신고 방법 | `sangga-imdae-sodeuk-segeum.mdx` | ⬜ |

### 🏢 우선순위 15: 법인세/사업자 세금 심화 (15개)

> 법인 운영 세금 = 사업자 필수 검색. BUSINESS 카테고리와 차별화 (세금 계산/신고 중심)

| # | 주제 | 파일명 | 상태 |
|---|------|--------|------|
| 281 | 법인세 총정리 (세율/신고/납부) | `beopinse-chongjeongli.mdx` | ⬜ |
| 282 | 법인세 세율표 2026 | `beopinse-seyul-2026.mdx` | ⬜ |
| 283 | 법인세 신고 방법 (홈택스) | `beopinse-singo-bangbeop.mdx` | ⬜ |
| 284 | 법인세 절세 방법 10가지 | `beopinse-jeolse-10.mdx` | ⬜ |
| 285 | 법인 대표 급여 vs 배당 세금 비교 | `beopin-geupyeo-vs-baedang.mdx` | ⬜ |
| 286 | 법인 접대비 한도와 처리 | `beopin-jeopdaebi-hando.mdx` | ⬜ |
| 287 | 법인 차량 비용 처리 기준 | `beopin-charyang-biyong.mdx` | ⬜ |
| 288 | 법인 가지급금 세금 문제 | `beopin-gajigeup-segeum.mdx` | ⬜ |
| 289 | 소규모 법인 세금 혜택 | `sogyumo-beopin-hyetaek.mdx` | ⬜ |
| 290 | 개인사업자 법인전환 세금 비교 | `gaein-beopin-segeum-bigyo.mdx` | ⬜ |
| 291 | 임대사업자 세금 총정리 | `imdae-saeopja-segeum.mdx` | ⬜ |
| 292 | 주택임대소득 세금 계산법 | `jutaek-imdae-sodeuk-gyesan.mdx` | ⬜ |
| 293 | 간주임대료 계산과 세금 | `ganju-imdaeryo-segeum.mdx` | ⬜ |
| 294 | 사업자 인건비 세금 처리 총정리 | `saeopja-ingeonbi-segeum.mdx` | ⬜ |
| 295 | 사업자 감가상각비 세금 공제 | `saeopja-gamga-gongje.mdx` | ⬜ |

### 📊 우선순위 16: 세금 시뮬레이션/연봉대별 (10개)

> 연봉별/상황별 구체적 세금 = 검색량 높은 시뮬레이션형 콘텐츠

| # | 주제 | 파일명 | 계산기 연계 | 상태 |
|---|------|--------|-------------|------|
| 296 | 연봉 2500만원 세금 얼마나 떼나 | `yeonbong-2500-segeum.mdx` | salary-calculator | ⬜ |
| 297 | 연봉 3500만원 세금 얼마나 떼나 | `yeonbong-3500-segeum.mdx` | salary-calculator | ⬜ |
| 298 | 연봉 4500만원 세금 얼마나 떼나 | `yeonbong-4500-segeum.mdx` | salary-calculator | ⬜ |
| 299 | 연봉 8000만원 세금과 절세 전략 | `yeonbong-8000-segeum.mdx` | salary-calculator | ⬜ |
| 300 | 연봉 1.5억 세금과 절세 전략 | `yeonbong-1.5eok-segeum.mdx` | salary-calculator | ⬜ |
| 301 | 프리랜서 연소득 3000만원 세금 | `freelancer-3000-segeum.mdx` | - | ⬜ |
| 302 | 프리랜서 연소득 5000만원 세금 | `freelancer-5000-segeum.mdx` | - | ⬜ |
| 303 | 자영업자 매출 1억 세금 얼마 | `jayeongeopja-1eok-segeum.mdx` | - | ⬜ |
| 304 | 주택 1채 팔면 양도세 얼마 (사례별) | `jutaek-1chae-yangdose.mdx` | - | ⬜ |
| 305 | 아파트 증여 시 세금 시뮬레이션 | `apartment-jeungye-simulation.mdx` | - | ⬜ |

### 🛠️ 도구 활용 콘텐츠 (15개)

> 신규 도구와 연계하여 트래픽 유도 + 체류시간 증가

| # | 주제 | 파일명 | 연계 도구 | 상태 |
|---|------|--------|----------|------|
| 306 | 2026년 월별 세금 신고 캘린더 | `2026-wolbyeol-segeum-calendar.mdx` | tax-calendar | ⬜ |
| 307 | 이달에 해야 할 세금 신고 총정리 | `idal-segeum-singo-chongjeongli.mdx` | tax-calendar | ⬜ |
| 308 | 연말정산 놓친 공제 찾기 가이드 | `yeonmal-nochim-gongje-chatgi.mdx` | year-end-tax-diagnosis | ⬜ |
| 309 | 연말정산 최대 환급 받는 공제 조합 | `yeonmal-choedae-gongje-johap.mdx` | year-end-tax-diagnosis | ⬜ |
| 310 | 종합소득세 처음 신고하는 사람 가이드 | `jonghap-cheoeum-singo-guide.mdx` | income-tax-filing-guide | ⬜ |
| 311 | 종합소득세 모두채움 신고 방법 | `jonghap-moduchaeum-singo.mdx` | income-tax-filing-guide | ⬜ |
| 312 | 같은 연봉 직장인 vs 프리랜서 세금 차이 | `jikjangin-vs-freelancer-segeum.mdx` | employee-vs-freelancer-tax | ⬜ |
| 313 | 프리랜서가 직장인보다 세금 더 내는 이유 | `freelancer-segeum-deo-naeneun.mdx` | employee-vs-freelancer-tax | ⬜ |
| 314 | 직장인 절세 체크리스트 (연말정산 전) | `jikjangin-jeolse-checklist.mdx` | tax-saving-checklist | ⬜ |
| 315 | 자영업자 절세 체크리스트 (종소세 전) | `jayeongeopja-jeolse-checklist.mdx` | tax-saving-checklist | ⬜ |
| 316 | 자녀에게 현금 증여 시 세금 계산 사례 | `janyeo-jeungye-sarye.mdx` | gift-tax-calculator | ⬜ |
| 317 | 부부간 부동산 증여 세금 시뮬레이션 | `bubu-budongsan-jeungye-sim.mdx` | gift-tax-calculator | ⬜ |
| 318 | 1주택 양도 시 비과세 요건 자가진단 | `1jutaek-bigwase-jindan.mdx` | capital-gains-tax-calculator | ⬜ |
| 319 | 양도세 줄이는 매도 타이밍 전략 | `yangdose-maedo-timing.mdx` | capital-gains-tax-calculator | ⬜ |
| 320 | 세금 신고 앱 비교 (삼쩜삼/홈택스/SSEM) | `segeum-singo-app-bigyo.mdx` | - | ⬜ |

---

## 🚫 중복 방지 규칙

글 작성 전 반드시 확인:
1. 이 파일에서 해당 주제가 이미 ✅ 완료인지 확인
2. `content/ko/tax/` 폴더에 유사한 파일명이 있는지 확인
3. 완료 후 반드시 이 파일의 해당 항목을 ✅ 완료로 변경

---

## 📅 작성 일정 계획

### Phase 1: 연말정산 (1~2월 집중)
- 연말정산 기본 개념
- 각종 공제 항목별 상세
- 맞벌이/신혼부부 전략

### Phase 2: 종합소득세 (4~5월 집중)
- 프리랜서/N잡러 가이드
- 홈택스 신고 방법
- 경비처리/절세 방법

### Phase 3: 양도세/증여세/상속세 (상시)
- 부동산 관련 세금
- 주식 관련 세금
- 가족간 자산이전

### Phase 4: 재산세/종부세 (6~9월)
- 재산세 납부 시즌
- 종부세 대비

### Phase 5: 가상자산 과세 (상시 - 2026 신규!)
- 코인 세금 신고, 절세, FAQ
- NFT/스테이킹 세금

### Phase 6: 부업/플랫폼 소득 세금 (상시)
- 스마트스토어, 유튜브, 애드센스 세금
- 투잡 직장인 세금 신고

### Phase 7: 생활 속 세금/해외 세금 (상시)
- 증여세 일상 이슈 (부모님 돈, 부부 이체)
- 해외 소득/거주 세금

### Phase 8: 세금 Q&A/법인세/시뮬레이션 (상시)
- 세금 Q&A 롱테일 (25개)
- 법인세/사업자 세금 심화 (15개)
- 연봉대별/상황별 세금 시뮬레이션 (10개)

---

## 🎯 작성 시 체크리스트

각 글 작성 전:
- [ ] 이 파일에서 해당 주제 상태 확인 (중복 방지)
- [ ] 국세청/홈택스 최신 정보 확인
- [ ] 세법 개정사항 반영
- [ ] 관련 글 내부링크 연결

각 글 작성 후:
- [ ] SEO 체크리스트 확인
- [ ] 홈택스 링크 등 공식 출처 확인
- [ ] 1500자 이상 확인
- [ ] 표/계산 예시 포함 확인
- [ ] **이 파일에서 해당 항목 ✅ 완료로 변경** ← 필수!

---

## 📝 글 작성 가이드 (세금)

### 세금/연말정산 정보 글 구조

```
1. 핵심 요약 (신고 기간, 예상 환급/납부액)
2. 대상자 확인
3. 신고/신청 방법 (단계별)
4. 필요 서류
5. 공제 항목 설명
6. 계산 방법/예시
7. 자주 하는 실수
8. FAQ
```

**필수 포함 요소**:
- 신고 기한 명확히
- 홈택스 링크 (공식 출처)
- 실제 계산 예시
- 절세 팁

**SEO 키워드 패턴**:
- `연말정산 [항목] 공제`
- `[세금] 신고 방법`
- `[세금] 계산`
- `[세금] 절세 방법`
- `[세금] 언제까지`

**예시 제목**:
- 2026년 연말정산 기간과 신청방법 총정리
- 종합소득세 신고 방법 (프리랜서/자영업자)
- 양도소득세 계산법과 절세 방법

**주의사항**:
- YMYL(Your Money Your Life) 카테고리
- 세법 개정사항 반드시 반영
- 정확한 세율/기준 명시

---

## 📌 참고 사이트

- 국세청: https://www.nts.go.kr
- 홈택스: https://www.hometax.go.kr
- 위택스: https://www.wetax.go.kr
- 국세법령정보: https://txsi.hometax.go.kr
- 국세청유튜브: https://www.youtube.com/@NTSKorea
- 삼쩜삼: https://www.3o3.co.kr
