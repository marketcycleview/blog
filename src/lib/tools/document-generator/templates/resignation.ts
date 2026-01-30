import type { DocumentTemplate } from "../types";

function formatDate(d: string): string {
  if (!d) return "____년 __월 __일";
  const dt = new Date(d);
  return `${dt.getFullYear()}년 ${dt.getMonth() + 1}월 ${dt.getDate()}일`;
}
function today(): string { const d = new Date(); return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`; }

const REASONS: Record<string, string> = {
  personal: "일신상의 사유",
  career: "새로운 커리어 기회 추구",
  study: "학업(진학)",
  health: "건강상의 사유",
  family: "가정 사정",
  other: "",
};

export const resignationTemplate: DocumentTemplate = {
  id: "resignation-letter",
  name: "퇴사 통보서 작성기",
  description: "퇴사 통보서를 쉽고 빠르게 작성합니다.",
  steps: [
    { id: "info", title: "기본 정보", fields: [
      { id: "name", label: "이름", type: "text", required: true, placeholder: "홍길동" },
      { id: "department", label: "부서", type: "text", placeholder: "개발팀" },
      { id: "position", label: "직급", type: "text", placeholder: "대리" },
      { id: "joinDate", label: "입사일", type: "date", required: true },
      { id: "resignDate", label: "희망 퇴사일", type: "date", required: true },
    ]},
    { id: "reason", title: "퇴사 사유", fields: [
      { id: "reasonType", label: "퇴사 사유", type: "select", required: true, options: [
        { value: "personal", label: "일신상의 사유" },
        { value: "career", label: "새로운 커리어 기회" },
        { value: "study", label: "학업(진학)" },
        { value: "health", label: "건강상의 사유" },
        { value: "family", label: "가정 사정" },
        { value: "other", label: "기타 (직접 입력)" },
      ]},
      { id: "reasonDetail", label: "상세 사유 (선택)", type: "textarea", placeholder: "구체적인 사유를 적어주세요 (선택사항)" },
    ]},
    { id: "handover", title: "인수인계", fields: [
      { id: "handoverPlan", label: "인수인계 계획", type: "textarea", placeholder: "담당 업무 목록 및 인수인계 일정을 간략히 적어주세요" },
      { id: "companyName", label: "회사명 (수신인)", type: "text", required: true, placeholder: "(주)OO회사" },
      { id: "recipientTitle", label: "수신인 직함", type: "text", placeholder: "대표이사 (또는 팀장님)" },
    ]},
  ],
  generate(data) {
    const reason = data.reasonType === "other" ? (data.reasonDetail || "개인 사정") : REASONS[data.reasonType] || "일신상의 사유";
    const detail = data.reasonDetail ? `\n\n구체적 사유:\n${data.reasonDetail}` : "";
    const handover = data.handoverPlan ? `\n\n[인수인계 계획]\n${data.handoverPlan}` : "";

    return {
      title: "퇴사 통보서",
      date: today(),
      content: `퇴 사 통 보 서

수신: ${data.companyName || "____"} ${data.recipientTitle || "대표이사"} 귀하

발신: ${data.department ? data.department + " " : ""}${data.position ? data.position + " " : ""}${data.name || "____"}

제목: 퇴사 통보의 건

안녕하세요, ${data.department ? data.department + " " : ""}${data.name || "____"}입니다.

저는 ${formatDate(data.joinDate)}에 입사하여 근무해 왔으나, ${reason}으로 인해 퇴사를 결정하게 되었습니다.${detail}

희망 퇴사일은 ${formatDate(data.resignDate)}이며, 퇴사일까지 담당 업무의 원활한 인수인계를 위해 최선을 다하겠습니다.${handover}

그동안 함께 일할 수 있어 감사했습니다.
원만한 퇴사 절차가 진행될 수 있도록 협조 부탁드립니다.

${today()}

${data.department ? data.department + " " : ""}${data.position ? data.position + " " : ""}${data.name || "____"} 드림`,
    };
  },
};
