// 퀴즈/진단 엔진 공통 타입

export interface QuizOption {
  label: string;
  score: number;
}

export interface QuizQuestion {
  id: string;
  category: string; // 영역 이름
  question: string;
  options: QuizOption[];
}

export interface QuizGrade {
  min: number;
  max: number;
  grade: string;
  label: string;
  color: string; // tailwind bg color class
  description: string;
}

export interface CategoryScore {
  category: string;
  score: number;
  maxScore: number;
  percent: number;
  comment: string;
}

export interface QuizResult {
  totalScore: number;
  maxScore: number;
  percent: number;
  grade: QuizGrade;
  categories: CategoryScore[];
  suggestions: string[];
}

export interface QuizConfig {
  id: string;
  name: string;
  description: string;
  questions: QuizQuestion[];
  grades: QuizGrade[];
  getCategoryComment: (category: string, percent: number) => string;
  getSuggestions: (categories: CategoryScore[]) => string[];
}
