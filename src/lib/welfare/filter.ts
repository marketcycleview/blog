import type { WelfarePolicy, UserConditions, FilterResult } from "./types";

/**
 * 복지 정책 필터링
 * 사용자 조건에 맞는 정책을 필터링하고 매칭 점수를 계산
 */
export function filterPolicies(
  policies: WelfarePolicy[],
  conditions: UserConditions
): FilterResult[] {
  const results: FilterResult[] = [];

  for (const policy of policies) {
    const { eligible, score, matchedCriteria } = checkEligibility(
      policy,
      conditions
    );

    if (eligible) {
      results.push({
        policy,
        matchScore: score,
        matchedCriteria,
      });
    }
  }

  // 매칭 점수 순으로 정렬 (높은 점수 우선)
  return results.sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * 단일 정책에 대한 자격 체크
 */
function checkEligibility(
  policy: WelfarePolicy,
  conditions: UserConditions
): { eligible: boolean; score: number; matchedCriteria: string[] } {
  const { eligibility } = policy;
  const matchedCriteria: string[] = [];
  let score = 0;

  // === 필수 조건 체크 (하나라도 불충족시 제외) ===

  // 1. 나이 체크
  if (conditions.age && eligibility.age) {
    const { min, max } = eligibility.age;
    if (min && conditions.age < min) {
      return { eligible: false, score: 0, matchedCriteria: [] };
    }
    if (max && conditions.age > max) {
      return { eligible: false, score: 0, matchedCriteria: [] };
    }
    matchedCriteria.push("나이 조건 충족");
    score += 10;
  }

  // 2. 소득 체크 (중위소득 기준)
  if (conditions.incomePercent && eligibility.income?.percent) {
    if (conditions.incomePercent > eligibility.income.percent) {
      return { eligible: false, score: 0, matchedCriteria: [] };
    }
    matchedCriteria.push("소득 조건 충족");
    score += 15;
  }

  // 3. 지역 체크 (정책이 특정 지역 한정인 경우)
  if (eligibility.region && conditions.region) {
    if (eligibility.region !== conditions.region) {
      return { eligible: false, score: 0, matchedCriteria: [] };
    }
    matchedCriteria.push("지역 조건 충족");
    score += 5;
  }

  // 4. 성별 체크 (정책이 특정 성별 한정인 경우)
  if (eligibility.gender && conditions.gender) {
    if (eligibility.gender !== conditions.gender) {
      return { eligible: false, score: 0, matchedCriteria: [] };
    }
    matchedCriteria.push("성별 조건 충족");
    score += 5;
  }

  // 5. 장애인 필수 정책 체크
  if (eligibility.disabilityRequired && !conditions.hasDisability) {
    return { eligible: false, score: 0, matchedCriteria: [] };
  }
  if (eligibility.disabilityRequired && conditions.hasDisability) {
    matchedCriteria.push("장애인 대상");
    score += 20;
  }

  // === 선택적 조건 체크 (매칭되면 점수 추가) ===

  // 6. 대상 그룹 매칭
  if (eligibility.targetGroups?.length > 0) {
    const matchedGroups = conditions.targetGroups.filter((g) =>
      eligibility.targetGroups.includes(g)
    );

    if (matchedGroups.length > 0) {
      matchedCriteria.push(`대상: ${matchedGroups.join(", ")}`);
      score += matchedGroups.length * 10;
    } else if (conditions.targetGroups.length > 0) {
      // 사용자가 대상 그룹을 선택했는데 매칭이 안 되면 낮은 우선순위
      score -= 5;
    }
  }

  // 7. 주거 형태 매칭
  if (conditions.housing && eligibility.housing && eligibility.housing.length > 0) {
    if (eligibility.housing.includes(conditions.housing)) {
      matchedCriteria.push("주거 형태 일치");
      score += 10;
    }
  }

  // 8. 가구 유형 매칭
  if (
    conditions.householdTypes.length > 0 &&
    eligibility.householdType?.length > 0
  ) {
    const matchedHouseholds = conditions.householdTypes.filter((h) =>
      eligibility.householdType!.includes(h)
    );

    if (matchedHouseholds.length > 0) {
      matchedCriteria.push("가구 유형 일치");
      score += matchedHouseholds.length * 8;
    }
  }

  // 9. 임산부 체크
  if (conditions.isPregnant) {
    if (eligibility.targetGroups.includes("pregnant")) {
      matchedCriteria.push("임산부 대상");
      score += 15;
    }
  }

  // 10. 특수 조건 매칭
  if (conditions.specialConditions.length > 0) {
    const matchedSpecial = conditions.specialConditions.filter((s) =>
      eligibility.specialConditions?.includes(s)
    );

    if (matchedSpecial.length > 0) {
      matchedCriteria.push(`특수 조건: ${matchedSpecial.join(", ")}`);
      score += matchedSpecial.length * 5;
    }
  }

  // 지원금액이 높을수록 보너스 점수
  if (policy.benefit.amount) {
    score += Math.min(policy.benefit.amount / 100000, 10); // 최대 10점
  }

  return {
    eligible: true,
    score: Math.max(score, 1), // 최소 1점
    matchedCriteria,
  };
}

/**
 * 검색어로 정책 필터링 (제목, 설명에서 검색)
 */
export function searchPolicies(
  policies: WelfarePolicy[],
  query: string
): WelfarePolicy[] {
  if (!query.trim()) return policies;

  const searchTerms = query.toLowerCase().split(/\s+/);

  return policies.filter((policy) => {
    const searchText =
      `${policy.title} ${policy.description}`.toLowerCase();
    return searchTerms.every((term) => searchText.includes(term));
  });
}

/**
 * 조건 필터링 + 검색어 필터링 결합
 */
export function filterAndSearchPolicies(
  policies: WelfarePolicy[],
  conditions: UserConditions,
  query?: string
): FilterResult[] {
  // 먼저 검색어로 필터링
  const searchedPolicies = query
    ? searchPolicies(policies, query)
    : policies;

  // 조건으로 필터링
  return filterPolicies(searchedPolicies, conditions);
}

/**
 * 빈 사용자 조건 생성
 */
export function createEmptyConditions(): UserConditions {
  return {
    age: null,
    gender: null,
    region: null,
    incomePercent: null,
    targetGroups: [],
    housing: null,
    householdTypes: [],
    hasDisability: false,
    isPregnant: false,
    specialConditions: [],
  };
}

/**
 * 조건이 비어있는지 체크
 */
export function isConditionsEmpty(conditions: UserConditions): boolean {
  return (
    !conditions.age &&
    !conditions.gender &&
    !conditions.region &&
    !conditions.incomePercent &&
    conditions.targetGroups.length === 0 &&
    !conditions.housing &&
    conditions.householdTypes.length === 0 &&
    !conditions.hasDisability &&
    !conditions.isPregnant &&
    conditions.specialConditions.length === 0
  );
}
