// 의사결정 트리 엔진 공통 타입

export interface TreeOption {
  value: string;
  label: string;
  description?: string;
}

export interface TreeQuestion {
  id: string;
  question: string;
  description?: string;
  options: TreeOption[];
}

export interface TreeRecommendation {
  id: string;
  name: string;
  provider: string; // 기관명
  description: string;
  rate?: string; // 금리 등
  limit?: string; // 한도
  period?: string; // 기간
  features: string[];
  fit: number; // 1~5 적합도
  link?: { label: string; href: string };
}

export interface TreeResult {
  title: string;
  summary: string;
  recommendations: TreeRecommendation[];
  warning?: string;
}

export interface DecisionTreeConfig {
  id: string;
  name: string;
  description: string;
  questions: TreeQuestion[];
  getResult: (answers: Record<string, string>) => TreeResult;
}
