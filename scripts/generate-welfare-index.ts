/**
 * 복지 정책 인덱스 생성 스크립트
 * 빌드 전에 실행하여 welfare-index.json 생성
 *
 * 사용법: npx tsx scripts/generate-welfare-index.ts
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface WelfareIndexItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  eligibility: {
    age?: { min?: number; max?: number; note?: string };
    income?: { type: string; percent?: number; maxAmount?: number; note?: string };
    asset?: { max?: number; note?: string };
    targetGroups: string[];
    housing?: string[];
    householdType?: string[];
    region?: string | null;
    gender?: string | null;
    disabilityRequired?: boolean;
    specialConditions?: string[];
  };
  benefit: {
    amount?: number;
    duration?: number;
    type: string;
    note?: string;
  };
}

function generateIndex(): void {
  const contentDir = path.join(process.cwd(), "content", "ko", "subsidy");
  const outputDir = path.join(process.cwd(), "public", "data");
  const outputPath = path.join(outputDir, "welfare-index.json");

  // content/ko/subsidy 디렉토리가 없으면 종료
  if (!fs.existsSync(contentDir)) {
    console.log(`❌ 디렉토리가 존재하지 않습니다: ${contentDir}`);
    process.exit(1);
  }

  // public/data 디렉토리 생성
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // MDX 파일 목록 가져오기
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  console.log(`📂 ${files.length}개의 MDX 파일을 처리합니다...`);

  const index: WelfareIndexItem[] = [];
  let withEligibility = 0;
  let withoutEligibility = 0;

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(content);

    const slug = file.replace(".mdx", "");

    // eligibility 필드가 있는지 확인
    const hasEligibility = data.eligibility && Object.keys(data.eligibility).length > 0;

    if (hasEligibility) {
      withEligibility++;
    } else {
      withoutEligibility++;
    }

    // 기본값으로 인덱스 아이템 생성
    const item: WelfareIndexItem = {
      slug,
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      category: "subsidy",
      eligibility: {
        age: data.eligibility?.age || undefined,
        income: data.eligibility?.income || undefined,
        asset: data.eligibility?.asset || undefined,
        targetGroups: data.eligibility?.targetGroups || [],
        housing: data.eligibility?.housing || undefined,
        householdType: data.eligibility?.householdType || undefined,
        region: data.eligibility?.region ?? null,
        gender: data.eligibility?.gender ?? null,
        disabilityRequired: data.eligibility?.disabilityRequired || false,
        specialConditions: data.eligibility?.specialConditions || [],
      },
      benefit: {
        amount: data.benefit?.amount || undefined,
        duration: data.benefit?.duration || undefined,
        type: data.benefit?.type || "other",
        note: data.benefit?.note || undefined,
      },
    };

    index.push(item);
  }

  // 날짜 기준 내림차순 정렬
  index.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // JSON 파일로 저장
  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2), "utf-8");

  console.log(`\n✅ 인덱스 생성 완료!`);
  console.log(`   - 총 정책 수: ${index.length}개`);
  console.log(`   - eligibility 있음: ${withEligibility}개`);
  console.log(`   - eligibility 없음: ${withoutEligibility}개`);
  console.log(`   - 저장 위치: ${outputPath}`);

  if (withoutEligibility > 0) {
    console.log(
      `\n⚠️  ${withoutEligibility}개 파일에 eligibility 메타데이터가 없습니다.`
    );
    console.log(`   필터링 정확도를 높이려면 메타데이터를 추가해주세요.`);
  }
}

// 실행
generateIndex();
