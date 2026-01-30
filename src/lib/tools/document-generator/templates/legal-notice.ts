import type { DocumentTemplate, FormStep } from "../types";

const NOTICE_TYPES = [
  { value: "wage", label: "임금체불 (미지급 임금 청구)" },
  { value: "deposit", label: "보증금 반환 (전세/월세)" },
  { value: "contract", label: "계약 해지 통보" },
  { value: "damage", label: "손해배상 청구" },
  { value: "free", label: "자유 작성" },
];

const commonSteps: FormStep[] = [
  {
    id: "type",
    title: "내용증명 유형 선택",
    description: "어떤 목적의 내용증명을 보내시나요?",
    fields: [
      {
        id: "noticeType",
        label: "유형",
        type: "select",
        required: true,
        options: NOTICE_TYPES,
      },
    ],
  },
  {
    id: "parties",
    title: "당사자 정보",
    description: "발신인(본인)과 수신인(상대방) 정보를 입력하세요.",
    fields: [
      { id: "senderName", label: "발신인 이름", type: "text", required: true, placeholder: "홍길동" },
      { id: "senderAddress", label: "발신인 주소", type: "text", required: true, placeholder: "서울시 강남구 테헤란로 123" },
      { id: "senderPhone", label: "발신인 연락처", type: "text", placeholder: "010-1234-5678" },
      { id: "receiverName", label: "수신인 이름/상호", type: "text", required: true, placeholder: "김철수 또는 (주)OO회사" },
      { id: "receiverAddress", label: "수신인 주소", type: "text", required: true, placeholder: "서울시 서초구 서초대로 456" },
    ],
  },
];

// 유형별 상세 입력 필드
const wageFields: FormStep = {
  id: "details",
  title: "임금체불 상세 정보",
  description: "미지급 임금 관련 정보를 입력하세요.",
  fields: [
    { id: "company", label: "회사명", type: "text", required: true, placeholder: "(주)OO회사" },
    { id: "workStart", label: "근무 시작일", type: "date", required: true },
    { id: "workEnd", label: "근무 종료일 (또는 현재 재직 중이면 비워두세요)", type: "date" },
    { id: "unpaidAmount", label: "미지급 금액", type: "text", required: true, placeholder: "3,000,000", suffix: "원" },
    { id: "unpaidPeriod", label: "미지급 기간", type: "text", required: true, placeholder: "2025년 10월~12월분 급여" },
    { id: "deadline", label: "지급 요구 기한", type: "date", required: true },
  ],
};

const depositFields: FormStep = {
  id: "details",
  title: "보증금 반환 상세 정보",
  description: "보증금 반환 관련 정보를 입력하세요.",
  fields: [
    { id: "propertyAddress", label: "임대 물건 주소", type: "text", required: true, placeholder: "서울시 마포구 합정동 123-45, 201호" },
    { id: "contractStart", label: "계약 시작일", type: "date", required: true },
    { id: "contractEnd", label: "계약 종료일", type: "date", required: true },
    { id: "depositAmount", label: "보증금 금액", type: "text", required: true, placeholder: "50,000,000", suffix: "원" },
    { id: "moveOutDate", label: "퇴거일 (또는 퇴거 예정일)", type: "date", required: true },
    { id: "deadline", label: "반환 요구 기한", type: "date", required: true },
  ],
};

const contractFields: FormStep = {
  id: "details",
  title: "계약 해지 상세 정보",
  description: "해지할 계약 관련 정보를 입력하세요.",
  fields: [
    { id: "contractDate", label: "계약 체결일", type: "date", required: true },
    { id: "contractSubject", label: "계약 내용 요약", type: "text", required: true, placeholder: "OO 서비스 이용 계약" },
    { id: "cancelReason", label: "해지 사유", type: "textarea", required: true, placeholder: "계약 조건 불이행으로 인해..." },
    { id: "cancelDate", label: "해지 요구일", type: "date", required: true },
  ],
};

const damageFields: FormStep = {
  id: "details",
  title: "손해배상 상세 정보",
  description: "손해배상 청구 관련 정보를 입력하세요.",
  fields: [
    { id: "incidentDate", label: "사건 발생일", type: "date", required: true },
    { id: "incidentDesc", label: "피해 내용", type: "textarea", required: true, placeholder: "구체적인 피해 상황을 기술하세요" },
    { id: "damageAmount", label: "청구 금액", type: "text", required: true, placeholder: "5,000,000", suffix: "원" },
    { id: "deadline", label: "이행 기한", type: "date", required: true },
  ],
};

const freeFields: FormStep = {
  id: "details",
  title: "내용 직접 작성",
  description: "내용증명 제목과 본문을 직접 작성하세요.",
  fields: [
    { id: "freeTitle", label: "제목", type: "text", required: true, placeholder: "OO에 관한 통지서" },
    { id: "freeBody", label: "본문", type: "textarea", required: true, placeholder: "통지 내용을 자유롭게 작성하세요.\n\n1. 사실 관계\n2. 요구 사항\n3. 불이행 시 조치" },
  ],
};

function getDetailStep(noticeType: string): FormStep {
  switch (noticeType) {
    case "wage": return wageFields;
    case "deposit": return depositFields;
    case "contract": return contractFields;
    case "damage": return damageFields;
    case "free": return freeFields;
    default: return freeFields;
  }
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "____년 __월 __일";
  const d = new Date(dateStr);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function getTodayFormatted(): string {
  const d = new Date();
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function generateWageNotice(data: Record<string, string>): string {
  return `내 용 증 명

제목: 미지급 임금 지급 청구의 건

수신: ${data.receiverName || "____"}
주소: ${data.receiverAddress || "____"}

발신: ${data.senderName || "____"}
주소: ${data.senderAddress || "____"}
연락처: ${data.senderPhone || "____"}

위 발신인은 아래와 같이 통지합니다.

1. 발신인은 ${data.company || "____"}에서 ${formatDate(data.workStart)}부터 ${data.workEnd ? formatDate(data.workEnd) + "까지" : "현재까지"} 근무하고 있는(근무하였던) 근로자입니다.

2. 그런데 수신인은 ${data.unpaidPeriod || "____"} 임금 합계 금 ${data.unpaidAmount || "____"}원을 현재까지 지급하지 않고 있습니다.

3. 이에 발신인은 수신인에게 위 미지급 임금 금 ${data.unpaidAmount || "____"}원을 ${formatDate(data.deadline)}까지 아래 계좌로 지급할 것을 요청합니다.

4. 만약 위 기한까지 지급하지 않을 경우, 근로기준법 제36조 및 제109조에 따라 관할 노동청에 진정을 제기하고, 민사상 소송을 포함한 법적 조치를 취할 수밖에 없음을 통지합니다.

${getTodayFormatted()}

발신인: ${data.senderName || "____"} (서명 또는 날인)`;
}

function generateDepositNotice(data: Record<string, string>): string {
  return `내 용 증 명

제목: 임대차 보증금 반환 청구의 건

수신: ${data.receiverName || "____"}
주소: ${data.receiverAddress || "____"}

발신: ${data.senderName || "____"}
주소: ${data.senderAddress || "____"}
연락처: ${data.senderPhone || "____"}

위 발신인은 아래와 같이 통지합니다.

1. 발신인은 수신인 소유의 ${data.propertyAddress || "____"} 부동산에 대하여 ${formatDate(data.contractStart)}부터 ${formatDate(data.contractEnd)}까지를 기간으로 하는 임대차 계약을 체결하고, 보증금 금 ${data.depositAmount || "____"}원을 지급한 바 있습니다.

2. 위 임대차 계약은 ${formatDate(data.contractEnd)} 만료되며, 발신인은 ${formatDate(data.moveOutDate)} 위 부동산에서 퇴거할 예정(퇴거하였음)입니다.

3. 이에 발신인은 수신인에게 임대차보증금 금 ${data.depositAmount || "____"}원을 ${formatDate(data.deadline)}까지 반환할 것을 요청합니다.

4. 만약 위 기한까지 보증금을 반환하지 않을 경우, 주택임대차보호법 등 관련 법령에 따라 임차권등기명령 신청, 보증금반환 소송 등 법적 조치를 취할 수밖에 없음을 통지합니다.

${getTodayFormatted()}

발신인: ${data.senderName || "____"} (서명 또는 날인)`;
}

function generateContractNotice(data: Record<string, string>): string {
  return `내 용 증 명

제목: 계약 해지 통보의 건

수신: ${data.receiverName || "____"}
주소: ${data.receiverAddress || "____"}

발신: ${data.senderName || "____"}
주소: ${data.senderAddress || "____"}
연락처: ${data.senderPhone || "____"}

위 발신인은 아래와 같이 통지합니다.

1. 발신인은 수신인과 ${formatDate(data.contractDate)} "${data.contractSubject || "____"}"에 관한 계약을 체결한 바 있습니다.

2. 그러나 아래의 사유로 인하여 위 계약을 해지하고자 합니다.

[해지 사유]
${data.cancelReason || "____"}

3. 이에 발신인은 ${formatDate(data.cancelDate)}부로 위 계약의 해지를 통보하며, 계약에 따른 정산이 필요한 경우 성실히 이행할 것을 약속드립니다.

4. 본 통지에 대해 이의가 있으시면 7일 이내에 서면으로 회신하여 주시기 바랍니다.

${getTodayFormatted()}

발신인: ${data.senderName || "____"} (서명 또는 날인)`;
}

function generateDamageNotice(data: Record<string, string>): string {
  return `내 용 증 명

제목: 손해배상 청구의 건

수신: ${data.receiverName || "____"}
주소: ${data.receiverAddress || "____"}

발신: ${data.senderName || "____"}
주소: ${data.senderAddress || "____"}
연락처: ${data.senderPhone || "____"}

위 발신인은 아래와 같이 통지합니다.

1. ${formatDate(data.incidentDate)} 아래와 같은 사건이 발생하였습니다.

[피해 내용]
${data.incidentDesc || "____"}

2. 위 사건으로 인하여 발신인은 금 ${data.damageAmount || "____"}원의 손해를 입었습니다.

3. 이에 발신인은 수신인에게 손해배상금 금 ${data.damageAmount || "____"}원을 ${formatDate(data.deadline)}까지 지급할 것을 요청합니다.

4. 만약 위 기한까지 배상하지 않을 경우, 민사소송 등 법적 조치를 취할 수밖에 없음을 통지합니다.

${getTodayFormatted()}

발신인: ${data.senderName || "____"} (서명 또는 날인)`;
}

function generateFreeNotice(data: Record<string, string>): string {
  return `내 용 증 명

제목: ${data.freeTitle || "____"}

수신: ${data.receiverName || "____"}
주소: ${data.receiverAddress || "____"}

발신: ${data.senderName || "____"}
주소: ${data.senderAddress || "____"}
연락처: ${data.senderPhone || "____"}

위 발신인은 아래와 같이 통지합니다.

${data.freeBody || "____"}

${getTodayFormatted()}

발신인: ${data.senderName || "____"} (서명 또는 날인)`;
}

export const legalNoticeTemplate: DocumentTemplate = {
  id: "legal-notice",
  name: "내용증명 작성기",
  description: "임금체불, 보증금 반환, 계약 해지, 손해배상 등 내용증명을 작성할 수 있습니다.",
  steps: commonSteps, // 기본 steps (유형 선택, 당사자 정보). 상세 step은 동적으로 추가됨
  generate: (data) => {
    let content: string;
    switch (data.noticeType) {
      case "wage": content = generateWageNotice(data); break;
      case "deposit": content = generateDepositNotice(data); break;
      case "contract": content = generateContractNotice(data); break;
      case "damage": content = generateDamageNotice(data); break;
      case "free": content = generateFreeNotice(data); break;
      default: content = generateFreeNotice(data);
    }
    return {
      title: "내용증명",
      content,
      date: getTodayFormatted(),
    };
  },
};

export { getDetailStep };
