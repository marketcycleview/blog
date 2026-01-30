import type { QuizConfig, QuizResult, CategoryScore } from "./types";

export function calculateQuizResult(
  config: QuizConfig,
  answers: Record<string, number> // questionId → selected score
): QuizResult {
  // 카테고리별 점수 집계
  const categoryMap = new Map<string, { score: number; maxScore: number }>();

  for (const q of config.questions) {
    const existing = categoryMap.get(q.category) || { score: 0, maxScore: 0 };
    const maxOption = Math.max(...q.options.map((o) => o.score));
    existing.maxScore += maxOption;
    existing.score += answers[q.id] ?? 0;
    categoryMap.set(q.category, existing);
  }

  const categories: CategoryScore[] = [];
  let totalScore = 0;
  let maxScore = 0;

  for (const [category, data] of categoryMap) {
    const percent = data.maxScore > 0 ? Math.round((data.score / data.maxScore) * 100) : 0;
    categories.push({
      category,
      score: data.score,
      maxScore: data.maxScore,
      percent,
      comment: config.getCategoryComment(category, percent),
    });
    totalScore += data.score;
    maxScore += data.maxScore;
  }

  const percent = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  // 등급 결정
  const grade = config.grades.find((g) => percent >= g.min && percent <= g.max) || config.grades[config.grades.length - 1];

  // 개선 제안
  const suggestions = config.getSuggestions(categories);

  return {
    totalScore,
    maxScore,
    percent,
    grade,
    categories,
    suggestions,
  };
}
