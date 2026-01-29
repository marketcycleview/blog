import { NextRequest, NextResponse } from "next/server";
import { submitUrl, submitUrls } from "@/lib/indexnow";
import { getAllPosts } from "@/lib/posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

/**
 * GET: 모든 글 URL 제출 (초기 설정용)
 * POST: 특정 URL 제출
 */

export async function GET() {
  try {
    // 모든 한국어 글 가져오기
    const posts = await getAllPosts("ko");

    const urls = posts.map(
      (post) => `${SITE_URL}/ko/${post.category}/${post.slug}`
    );

    // 메인 페이지들도 추가
    const mainUrls = [
      `${SITE_URL}/ko`,
      `${SITE_URL}/ko/subsidy`,
      `${SITE_URL}/ko/tools`,
    ];

    const allUrls = [...mainUrls, ...urls];

    const result = await submitUrls(allUrls);

    return NextResponse.json({
      ...result,
      urlCount: allUrls.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `에러: ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, urls } = body;

    if (urls && Array.isArray(urls)) {
      const result = await submitUrls(urls);
      return NextResponse.json(result);
    }

    if (url) {
      const result = await submitUrl(url);
      return NextResponse.json(result);
    }

    return NextResponse.json(
      { success: false, message: "url 또는 urls 필요" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `에러: ${error}` },
      { status: 500 }
    );
  }
}
