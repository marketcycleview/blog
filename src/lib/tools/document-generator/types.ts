// 문서 생성기 엔진 공통 타입

export interface FormField {
  id: string;
  label: string;
  type: "text" | "textarea" | "date" | "select" | "number";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  suffix?: string; // "원", "일" 등
}

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  steps: FormStep[];
  generate: (data: Record<string, string>) => GeneratedDocument;
}

export interface GeneratedDocument {
  title: string;
  content: string; // 줄바꿈 포함된 텍스트
  date: string;
}
