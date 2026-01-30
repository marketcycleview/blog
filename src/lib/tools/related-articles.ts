/** 도구별 관련 글 데이터 */

export interface RelatedArticle {
  href: string;
  label: string;
}

export interface RelatedArticleGroup {
  title: string;
  icon: string;
  articles: RelatedArticle[];
}

const data: Record<string, RelatedArticleGroup[]> = {
  "budget-planner": [
    {
      title: "월급별 예산 짜기",
      icon: "💰",
      articles: [
        { href: "/ko/finance/budget-200man", label: "월급 200만원 예산 짜는 법" },
        { href: "/ko/finance/budget-300man", label: "월급 300만원 예산 짜는 법" },
        { href: "/ko/finance/budget-400man", label: "월급 400만원 예산 짜는 법" },
        { href: "/ko/finance/budget-500man", label: "월급 500만원 예산 짜는 법" },
        { href: "/ko/finance/50-30-20-budget-rule", label: "50/30/20 예산 법칙 완벽 가이드" },
        { href: "/ko/finance/monthly-budget-ratio", label: "월급 관리 황금 비율 가이드" },
      ],
    },
    {
      title: "절약 & 저축",
      icon: "🏦",
      articles: [
        { href: "/ko/finance/saving-rate-20-percent", label: "저축률 20% 만드는 현실적인 방법" },
        { href: "/ko/finance/saving-rate-30-percent", label: "저축률 30% 달성한 사람들의 공통점" },
        { href: "/ko/finance/deficit-to-surplus", label: "적자 가계부 흑자로 바꾸는 방법" },
        { href: "/ko/finance/reduce-essential-cost", label: "기초생활비 줄이는 10가지 방법" },
        { href: "/ko/finance/reduce-eating-out", label: "외식비 줄이는 현실적인 방법" },
        { href: "/ko/finance/reduce-phone-bill", label: "통신비 3만원대로 낮추는 방법" },
      ],
    },
    {
      title: "상황별 생활비 가이드",
      icon: "👥",
      articles: [
        { href: "/ko/finance/single-living-cost", label: "1인 가구 적정 생활비 (2026년)" },
        { href: "/ko/finance/newlywed-living-cost", label: "신혼부부 적정 생활비 가이드" },
        { href: "/ko/finance/first-salary-management", label: "사회초년생 첫 월급 관리법" },
        { href: "/ko/finance/salary-rent-ratio", label: "연봉별 적정 월세 기준" },
      ],
    },
  ],

  "unemployment-calculator": [
    {
      title: "실업급여 금액·기간",
      icon: "💵",
      articles: [
        { href: "/ko/finance/silup-geupyeo-eolma", label: "실업급여 얼마나 받을 수 있나 (월급별 시뮬레이션)" },
        { href: "/ko/finance/silup-geupyeo-sanghan-2026", label: "실업급여 상한액·하한액 2026년 기준" },
        { href: "/ko/finance/silup-geupyeo-jigupilsu", label: "실업급여 지급일수 기준표" },
        { href: "/ko/finance/wolgeup-300-silup", label: "월급 300만원 실업급여 얼마?" },
        { href: "/ko/finance/wolgeup-400-silup", label: "월급 400만원 실업급여 얼마?" },
      ],
    },
    {
      title: "실업급여 자격·신청",
      icon: "📋",
      articles: [
        { href: "/ko/subsidy/silup-geupyeo-jagyeok-check", label: "실업급여 수급 자격 체크리스트" },
        { href: "/ko/subsidy/silup-geupyeo-sinchung-guide", label: "실업급여 신청 절차 상세가이드" },
        { href: "/ko/finance/jabaljeok-toesa-silup", label: "자발적 퇴사도 실업급여 받을 수 있나?" },
        { href: "/ko/finance/silup-alba-doena", label: "실업급여 받으면서 알바해도 되나?" },
        { href: "/ko/subsidy/silup-bujeong-sugup-juui", label: "실업급여 부정수급 주의사항" },
      ],
    },
    {
      title: "관련 제도 비교",
      icon: "🔄",
      articles: [
        { href: "/ko/subsidy/silup-vs-gujikchokjin", label: "실업급여 vs 구직촉진수당 차이" },
        { href: "/ko/subsidy/50se-silup-udae", label: "50세 이상 실업급여 우대 조건" },
        { href: "/ko/subsidy/goyong-boheom-gigan-silup", label: "고용보험 가입기간별 실업급여 지급일수" },
      ],
    },
  ],

  "salary-calculator": [
    {
      title: "연봉별 실수령액",
      icon: "💰",
      articles: [
        { href: "/ko/tax/2026-yeonbong-silsuryeongaek-pyo", label: "2026년 연봉별 실수령액표 (2400만~1억)" },
        { href: "/ko/tax/yeonbong-3000-silsuryeong", label: "연봉 3000만원 실수령액" },
        { href: "/ko/tax/yeonbong-4000-silsuryeong", label: "연봉 4000만원 실수령액" },
        { href: "/ko/tax/yeonbong-5000-silsuryeong", label: "연봉 5000만원 실수령액" },
        { href: "/ko/tax/yeonbong-6000-silsuryeong", label: "연봉 6000만원 실수령액" },
        { href: "/ko/tax/yeonbong-7000-silsuryeong", label: "연봉 7000만원 실수령액" },
        { href: "/ko/tax/yeonbong-1eok-silsuryeong", label: "연봉 1억 실수령액" },
      ],
    },
    {
      title: "공제 항목 이해하기",
      icon: "📊",
      articles: [
        { href: "/ko/tax/2026-4dae-boheom-yoyul", label: "2026년 4대보험 요율 정리" },
        { href: "/ko/tax/2026-sodeukse-yulpyo", label: "2026년 소득세율표 정리" },
      ],
    },
  ],

  "median-income-calculator": [
    {
      title: "가구별 중위소득 복지",
      icon: "👨‍👩‍👧‍👦",
      articles: [
        { href: "/ko/subsidy/1in-gagu-jungwi-bokji", label: "1인가구 중위소득 복지 총정리" },
        { href: "/ko/subsidy/2in-gagu-jungwi-bokji", label: "2인가구 중위소득 복지 총정리" },
        { href: "/ko/subsidy/3in-gagu-jungwi-bokji", label: "3인가구 중위소득 복지 총정리" },
        { href: "/ko/subsidy/4in-gagu-jungwi-bokji", label: "4인가구 중위소득 복지 총정리" },
      ],
    },
    {
      title: "중위소득 비율별 혜택",
      icon: "📋",
      articles: [
        { href: "/ko/subsidy/2026-jungwi-50-bokji", label: "중위소득 50% 이하 받을 수 있는 복지" },
        { href: "/ko/subsidy/2026-jungwi-60-bokji", label: "중위소득 60% 이하 받을 수 있는 복지" },
        { href: "/ko/subsidy/2026-jungwi-80-bokji", label: "중위소득 80% 이하 받을 수 있는 복지" },
      ],
    },
    {
      title: "확인 방법",
      icon: "🔍",
      articles: [
        { href: "/ko/subsidy/jungwi-sodeuk-hwain-beop", label: "중위소득 몇 프로인지 확인하는 법" },
        { href: "/ko/subsidy/sodeuk-injeongaek-gyesan", label: "소득인정액 계산법 완벽가이드" },
      ],
    },
  ],

  "jeonse-loan-rates": [
    {
      title: "전세대출 금리 비교",
      icon: "📊",
      articles: [
        { href: "/ko/finance/2026-jeonse-loan-rate-bigyo", label: "2026년 전세대출 금리 비교 (은행별)" },
        { href: "/ko/finance/jeonse-loan-low-rate-top5", label: "전세대출 금리 낮은 은행 TOP 5" },
        { href: "/ko/finance/kakao-vs-toss-jeonse", label: "카카오뱅크 vs 토스뱅크 전세대출 비교" },
        { href: "/ko/finance/butimmok-vs-bank-jeonse", label: "버팀목대출 vs 시중은행 전세대출 비교" },
      ],
    },
    {
      title: "전세대출 전략",
      icon: "💡",
      articles: [
        { href: "/ko/finance/jeonse-loan-limit-bigyo", label: "전세대출 한도 은행별 비교" },
        { href: "/ko/finance/jeonse-fixed-vs-variable", label: "전세대출 고정금리 vs 변동금리 비교" },
        { href: "/ko/finance/jeonse-refinance-guide", label: "전세대출 갈아타기 절감액 계산" },
        { href: "/ko/finance/jeonse-prepay-fee", label: "전세대출 중도상환수수료 비교" },
      ],
    },
  ],

  "interest-rate-dashboard": [
    {
      title: "예적금 금리 비교",
      icon: "🏦",
      articles: [
        { href: "/ko/finance/2026-deposit-rate-top10", label: "2026년 정기예금 금리 TOP 10" },
        { href: "/ko/finance/2026-savings-rate-top10", label: "2026년 적금 금리 TOP 10" },
        { href: "/ko/finance/6month-deposit-rate-2026", label: "6개월 단기 예금 금리 비교" },
        { href: "/ko/finance/savings-premium-rate-conditions", label: "적금 우대금리 조건 총정리" },
      ],
    },
    {
      title: "상품 선택 가이드",
      icon: "💡",
      articles: [
        { href: "/ko/finance/deposit-vs-savings-bigyo", label: "예금 vs 적금 뭐가 유리할까?" },
        { href: "/ko/finance/parking-vs-deposit", label: "파킹통장 vs 정기예금 비교" },
        { href: "/ko/finance/internet-vs-major-bank-rate", label: "인터넷은행 vs 시중은행 금리 차이" },
        { href: "/ko/finance/high-rate-deposit-find", label: "예금 금리 높은 은행 찾는 법" },
      ],
    },
  ],

  "credit-loan-rates": [
    {
      title: "신용대출 금리 비교",
      icon: "📊",
      articles: [
        { href: "/ko/finance/2026-credit-loan-rate-bigyo", label: "2026년 신용대출 금리 비교 (은행별)" },
        { href: "/ko/finance/credit-loan-low-rate-top5", label: "신용대출 금리 낮은 은행 TOP 5" },
        { href: "/ko/finance/kakao-vs-toss-credit", label: "카카오뱅크 vs 토스뱅크 신용대출 비교" },
        { href: "/ko/finance/1st-vs-2nd-tier-credit", label: "1금융권 vs 2금융권 신용대출 비교" },
      ],
    },
    {
      title: "신용대출 전략",
      icon: "💡",
      articles: [
        { href: "/ko/finance/worker-credit-loan-2026", label: "직장인 신용대출 금리 비교" },
        { href: "/ko/finance/minus-account-rate-bigyo", label: "마이너스통장 금리 비교" },
        { href: "/ko/finance/credit-grade-rate-gap", label: "신용등급별 대출 금리 차이" },
        { href: "/ko/finance/credit-up-rate-down", label: "신용등급 올리면 금리 얼마나 줄까?" },
      ],
    },
  ],

  "loan-calculator": [
    {
      title: "주담대 금리 비교",
      icon: "🏠",
      articles: [
        { href: "/ko/finance/2026-mortgage-rate-bigyo", label: "2026년 주택담보대출 금리 비교" },
        { href: "/ko/finance/apartment-mortgage-low-rate", label: "아파트 담보대출 금리 낮은 은행 TOP 5" },
        { href: "/ko/finance/mortgage-fixed-vs-variable", label: "주담대 고정금리 vs 변동금리" },
      ],
    },
    {
      title: "상환 방식 & 전략",
      icon: "💡",
      articles: [
        { href: "/ko/finance/wonligeum-vs-wongeum-bigyo", label: "원리금균등 vs 원금균등 상환 비교" },
        { href: "/ko/finance/daechul-sanghwan-guide", label: "대출 상환방식 선택 가이드" },
        { href: "/ko/finance/mangi-ilsi-jangdanjeom", label: "만기일시상환 장단점 완벽정리" },
        { href: "/ko/finance/daechul-geumli-1-chaiyi", label: "대출금리 1% 차이, 이자 얼마나 다를까" },
        { href: "/ko/finance/judamdae-galatagi-ija", label: "주담대 갈아타기 이자 얼마나 줄까" },
        { href: "/ko/finance/mortgage-prepay-fee-bigyo", label: "주담대 중도상환수수료 비교" },
        { href: "/ko/finance/mortgage-refinance-checklist", label: "주담대 갈아타기 전 확인사항 5가지" },
      ],
    },
  ],

  "mortgage-rate-comparison": [
    {
      title: "주담대 금리 비교",
      icon: "📊",
      articles: [
        { href: "/ko/finance/2026-mortgage-rate-bigyo", label: "2026년 주택담보대출 금리 비교 (은행별)" },
        { href: "/ko/finance/apartment-mortgage-low-rate", label: "아파트 담보대출 금리 낮은 은행 TOP 5" },
        { href: "/ko/finance/internet-bank-mortgage-2026", label: "인터넷은행 주담대 금리 비교" },
        { href: "/ko/finance/mortgage-hybrid-rate", label: "혼합금리 주담대란? 장단점과 선택 기준" },
      ],
    },
    {
      title: "주담대 전략",
      icon: "💡",
      articles: [
        { href: "/ko/finance/mortgage-fixed-vs-variable", label: "주담대 고정금리 vs 변동금리" },
        { href: "/ko/finance/mortgage-prepay-fee-bigyo", label: "주담대 중도상환수수료 비교" },
        { href: "/ko/finance/mortgage-refinance-checklist", label: "주담대 갈아타기 전 확인사항 5가지" },
        { href: "/ko/finance/mortgage-extra-cost", label: "주택담보대출 부대비용 총정리" },
      ],
    },
  ],

  "severance-calculator": [
    {
      title: "퇴직금 계산·시뮬레이션",
      icon: "💰",
      articles: [
        { href: "/ko/tax/toejikgeum-gyesan-guide", label: "퇴직금 계산법 완벽가이드" },
        { href: "/ko/finance/toejikgeum-1nyeon-eolma", label: "퇴직금 1년에 얼마 받을까" },
        { href: "/ko/finance/toejikgeum-5nyeon-10nyeon", label: "퇴직금 5년·10년 예상액" },
      ],
    },
    {
      title: "퇴직금 세금·제도",
      icon: "📋",
      articles: [
        { href: "/ko/tax/toejikgeum-segeum-gyesan", label: "퇴직금 세금 얼마나 내나요?" },
        { href: "/ko/finance/toejikgeum-segeum-eolma", label: "퇴직금 받으면 세금 얼마? (금액별)" },
        { href: "/ko/tax/toejikgeum-junggan-jeongsan", label: "퇴직금 중간정산 조건 6가지" },
      ],
    },
  ],

  "jeonwolse-calculator": [
    {
      title: "전월세 전환 계산",
      icon: "🔄",
      articles: [
        { href: "/ko/finance/jeonwolse-jeonhwanyul-guide", label: "전월세 전환율 계산법 완벽가이드" },
        { href: "/ko/finance/beopjeong-jeonwolse-sanghan", label: "법정 전월세 전환율 상한 (2026년)" },
        { href: "/ko/finance/jeonse-3eok-wolse-jeonhwan", label: "전세 3억 월세로 전환하면 얼마?" },
        { href: "/ko/finance/bojeunggeum-olligi-wolse", label: "보증금 올리면 월세 얼마나 줄까" },
      ],
    },
    {
      title: "전세 vs 월세 비교",
      icon: "⚖️",
      articles: [
        { href: "/ko/finance/jeonse-vs-wolse-2026", label: "전세 vs 월세 뭐가 유리할까 (2026년)" },
        { href: "/ko/real-estate/jeonse-vs-wolse-jiyeokbyeol", label: "전세 vs 월세 지역별 비용 비교" },
      ],
    },
  ],

  "tax-refund-calculator": [
    {
      title: "연말정산 환급 전략",
      icon: "💰",
      articles: [
        { href: "/ko/tax/yeonmal-hwangeum-manhi", label: "연말정산 환급 많이 받는 법 7가지" },
        { href: "/ko/tax/sinyong-vs-check-gongje", label: "신용카드 vs 체크카드 소득공제 비교" },
        { href: "/ko/tax/yeongeum-jeochuk-choedaehwa", label: "연금저축 세액공제 최대화 전략" },
      ],
    },
  ],

  "rent-price-heatmap": [
    {
      title: "지역별 전세 시세",
      icon: "🗺️",
      articles: [
        { href: "/ko/real-estate/2026-seoul-jeonse-sise-gubyeol", label: "2026년 서울 전세 시세 구별 비교 총정리" },
        { href: "/ko/real-estate/2026-gyeonggi-jeonse-sise", label: "경기도 전세 시세 시군별 비교 (2026년)" },
        { href: "/ko/real-estate/2026-busan-jeonse-sise", label: "부산 전세 시세 구별 비교 (2026년)" },
        { href: "/ko/real-estate/2026-incheon-jeonse-sise", label: "인천 전세 시세 구별 비교 (2026년)" },
        { href: "/ko/real-estate/2026-gwangyeoksi-jeonse-bigyo", label: "대구·대전·광주 전세 시세 비교" },
      ],
    },
    {
      title: "저렴한 곳 & 예산별 가이드",
      icon: "💰",
      articles: [
        { href: "/ko/real-estate/seoul-jeonse-jeoryeom-top5", label: "서울 전세 저렴한 구 TOP 5" },
        { href: "/ko/real-estate/seoul-wolse-jeoryeom-top5", label: "서울 월세 싼 구 TOP 5" },
        { href: "/ko/real-estate/seoul-jeonse-3eok-iha", label: "서울 전세 3억 이하 가능한 곳" },
        { href: "/ko/real-estate/seoul-jeonse-5eok-bigyo", label: "서울 전세 5억대 살 수 있는 구 비교" },
        { href: "/ko/real-estate/jeonse-vs-wolse-jiyeokbyeol", label: "전세 vs 월세 지역별 비용 비교" },
      ],
    },
    {
      title: "대상별 전세 가이드",
      icon: "👥",
      articles: [
        { href: "/ko/real-estate/seoul-1in-jeonwolse-guide", label: "서울 1인가구 전월세 가이드" },
        { href: "/ko/real-estate/sinhobubu-jeonse-chucheon", label: "신혼부부 전세 추천 지역 (서울·경기)" },
        { href: "/ko/real-estate/jeonse-vs-maemae-2026", label: "전세 vs 매매 뭐가 유리? (2026년)" },
        { href: "/ko/real-estate/2026-jeonse-sijang-jeonmang", label: "2026년 전세 시장 전망" },
      ],
    },
    {
      title: "계약·실전 팁",
      icon: "📋",
      articles: [
        { href: "/ko/real-estate/jeonwolse-silgeorae-johoe-bangbeop", label: "전월세 실거래가 조회 방법 3가지" },
        { href: "/ko/real-estate/jeonse-bojeunggeum-hyeopsang", label: "전세 보증금 협상하는 법" },
        { href: "/ko/real-estate/ggangttong-jeonse-pihaneun-beop", label: "깡통전세 피하는 법" },
        { href: "/ko/real-estate/jeonwolse-gyeyak-checklist", label: "전월세 계약 전 필수 체크리스트 7가지" },
        { href: "/ko/real-estate/jeonse-daechul-jeonche-gwajung", label: "전세자금대출 받고 전세 구하는 전체 과정" },
        { href: "/ko/real-estate/jeonse-bojeunggeum-an-dollyeojul-ttae", label: "보증금 안 돌려줄 때 대처법" },
      ],
    },
  ],
};

export function getRelatedArticles(toolSlug: string): RelatedArticleGroup[] {
  return data[toolSlug] ?? [];
}
