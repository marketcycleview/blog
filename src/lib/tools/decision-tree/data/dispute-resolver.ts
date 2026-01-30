import type { DecisionTreeConfig, TreeResult, TreeRecommendation } from "../types";

const RESOLUTION_PATHS: TreeRecommendation[] = [
  { id: "notice", name: "내용증명 발송", provider: "우체국/인터넷우체국", description: "상대방에게 공식적으로 의사를 전달하고 증거를 확보합니다. 가장 먼저 시도할 수 있는 방법.", rate: "5,000~6,000원", limit: "제한 없음", period: "발송 후 7~14일 대기", features: ["저비용", "빠른 처리", "증거 확보", "심리적 압박"], fit: 0, link: { label: "내용증명 작성기", href: "/ko/tools/legal-notice-generator" } },
  { id: "mediation", name: "민사조정", provider: "법원", description: "법원에서 조정위원이 중재하여 합의를 도출합니다. 소송보다 빠르고 저렴합니다.", rate: "인지대 소액", limit: "금액 제한 없음", period: "1~3개월", features: ["비용 저렴", "합의 중심", "비공개"], fit: 0 },
  { id: "small-claims", name: "소액소송 (소액사건심판)", provider: "법원", description: "3,000만원 이하 금전 청구 시 간소한 절차로 소송 진행. 변호사 없이 직접 가능.", rate: "인지대 수만원", limit: "3,000만원 이하", period: "1~3개월", features: ["간소한 절차", "혼자 가능", "3천만원 이하"], fit: 0 },
  { id: "civil-lawsuit", name: "민사소송", provider: "법원", description: "정식 소송을 통해 법원의 판결을 받습니다. 금액이 크거나 복잡한 분쟁에 적합.", rate: "인지대+변호사비", limit: "제한 없음", period: "6개월~2년", features: ["강제 이행 가능", "확정 판결"], fit: 0 },
  { id: "labor-board", name: "노동위원회 구제신청", provider: "노동위원회", description: "부당해고, 임금체불 등 근로 분쟁을 노동위원회에서 심판합니다.", rate: "무료", limit: "근로 분쟁만", period: "1~3개월", features: ["무료", "근로자 보호", "원직복직 가능"], fit: 0 },
  { id: "labor-office", name: "노동청 진정", provider: "고용노동부", description: "임금체불, 퇴직금 미지급 등을 관할 노동청에 신고합니다. 행정적 강제력이 있습니다.", rate: "무료", limit: "임금체불 등", period: "2~4주", features: ["무료", "빠른 처리", "행정 제재"], fit: 0 },
  { id: "consumer-dispute", name: "소비자분쟁조정", provider: "한국소비자원", description: "소비자 피해(환불, 교환, 하자 등)를 한국소비자원에서 조정합니다.", rate: "무료", limit: "소비자 분쟁", period: "1~2개월", features: ["무료", "소비자 보호", "조정 효력"], fit: 0 },
  { id: "criminal-complaint", name: "형사고소/고발", provider: "경찰/검찰", description: "사기, 횡령 등 범죄 행위에 대해 형사 고소합니다. 민사와 별도 진행 가능.", rate: "무료", limit: "범죄 행위", period: "수개월~1년", features: ["범죄 처벌", "합의 유도"], fit: 0 },
];

function scoreResolution(r: TreeRecommendation, answers: Record<string, string>): number {
  let score = 0;
  const { disputeType, amount, communication, evidence, goal } = answers;

  // 유형별 매칭
  if (disputeType === "money" && ["notice", "small-claims", "civil-lawsuit", "mediation"].includes(r.id)) score += 20;
  if (disputeType === "contract" && ["notice", "mediation", "civil-lawsuit"].includes(r.id)) score += 20;
  if (disputeType === "realestate" && ["notice", "mediation", "civil-lawsuit"].includes(r.id)) score += 20;
  if (disputeType === "labor" && ["labor-office", "labor-board", "notice"].includes(r.id)) score += 25;
  if (disputeType === "consumer" && ["consumer-dispute", "notice"].includes(r.id)) score += 25;
  if (disputeType === "neighbor" && ["mediation", "notice"].includes(r.id)) score += 20;
  if (disputeType === "fraud" && ["criminal-complaint", "civil-lawsuit", "notice"].includes(r.id)) score += 25;

  // 금액별
  if (amount === "under1m" && ["notice", "consumer-dispute", "small-claims"].includes(r.id)) score += 15;
  if (amount === "1to30m" && ["small-claims", "notice", "mediation"].includes(r.id)) score += 15;
  if (amount === "30to200m" && ["civil-lawsuit", "mediation"].includes(r.id)) score += 15;
  if (amount === "over200m" && ["civil-lawsuit"].includes(r.id)) score += 20;

  // 대화 가능 여부
  if (communication === "possible" && ["mediation", "notice"].includes(r.id)) score += 10;
  if (communication === "impossible" && ["civil-lawsuit", "small-claims", "criminal-complaint"].includes(r.id)) score += 10;

  // 증거
  if (evidence === "strong" && ["civil-lawsuit", "small-claims"].includes(r.id)) score += 10;
  if (evidence === "weak" && ["notice", "mediation"].includes(r.id)) score += 5;

  // 목표
  if (goal === "money" && ["small-claims", "civil-lawsuit", "notice"].includes(r.id)) score += 10;
  if (goal === "enforce" && ["civil-lawsuit", "labor-board"].includes(r.id)) score += 10;
  if (goal === "reconcile" && ["mediation", "consumer-dispute"].includes(r.id)) score += 15;
  if (goal === "punish" && ["criminal-complaint"].includes(r.id)) score += 20;

  // 내용증명은 거의 항상 첫 단계
  if (r.id === "notice") score += 10;

  return score;
}

export const disputeResolverConfig: DecisionTreeConfig = {
  id: "dispute-resolver",
  name: "분쟁 해결 경로 안내",
  description: "5개 질문에 답하면 최적의 분쟁 해결 방법을 추천합니다.",
  questions: [
    { id: "disputeType", question: "어떤 유형의 분쟁인가요?", options: [
      { value: "money", label: "금전 분쟁 (빌려준 돈, 미지급)" },
      { value: "contract", label: "계약 분쟁 (계약 위반, 해지)" },
      { value: "realestate", label: "부동산 분쟁 (보증금, 하자)" },
      { value: "labor", label: "근로 분쟁 (임금체불, 부당해고)" },
      { value: "consumer", label: "소비자 분쟁 (환불, 하자)" },
      { value: "fraud", label: "사기/범죄 피해" },
    ]},
    { id: "amount", question: "분쟁 금액은 대략 얼마인가요?", options: [
      { value: "under1m", label: "100만원 미만" },
      { value: "1to30m", label: "100만원~3,000만원" },
      { value: "30to200m", label: "3,000만원~2억원" },
      { value: "over200m", label: "2억원 이상" },
    ]},
    { id: "communication", question: "상대방과 대화가 가능한가요?", options: [
      { value: "possible", label: "대화 가능" },
      { value: "tried", label: "시도했으나 실패" },
      { value: "impossible", label: "연락 불가 / 거부" },
    ]},
    { id: "evidence", question: "증거를 보유하고 있나요?", description: "계약서, 녹취, 문자, 이체내역 등", options: [
      { value: "strong", label: "서면 계약서/이체내역 등 확실한 증거" },
      { value: "partial", label: "문자/메신저/증인 등 일부 증거" },
      { value: "weak", label: "증거가 거의 없음" },
    ]},
    { id: "goal", question: "원하는 결과는?", options: [
      { value: "money", label: "금전 배상 (돈 돌려받기)" },
      { value: "enforce", label: "이행 강제 (약속 지키게)" },
      { value: "reconcile", label: "원만한 해결 (관계 유지)" },
      { value: "punish", label: "처벌 (사기 등 범죄)" },
    ]},
  ],
  getResult(answers) {
    const scored = RESOLUTION_PATHS.map((r) => ({ ...r, fit: scoreResolution(r, answers) }));
    scored.sort((a, b) => b.fit - a.fit);
    const top = scored.filter((l) => l.fit > 0).slice(0, 5);
    const maxFit = top[0]?.fit || 1;
    const recommendations = top.map((l) => ({ ...l, fit: Math.max(1, Math.round((l.fit / maxFit) * 5)) }));
    const typeLabels: Record<string, string> = { money: "금전", contract: "계약", realestate: "부동산", labor: "근로", consumer: "소비자", neighbor: "이웃", fraud: "사기" };
    return {
      title: `${typeLabels[answers.disputeType] || ""} 분쟁 해결 추천`,
      summary: `입력하신 조건에 맞는 해결 방법 ${recommendations.length}가지를 추천합니다. 1순위부터 순서대로 시도해보세요.`,
      recommendations,
      warning: "본 안내는 일반적인 참고 정보이며, 법률 자문이 아닙니다. 복잡한 분쟁은 변호사 상담을 받으시기 바랍니다.",
    };
  },
};
