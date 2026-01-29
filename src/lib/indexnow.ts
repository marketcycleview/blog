/**
 * IndexNow API - 검색엔진에 새 URL 즉시 알림
 * Bing, Yandex 등 지원
 */

const INDEXNOW_KEY = "cd9729f36cb9405db628d32c338c3c93";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://infotalker.com";

interface IndexNowResponse {
  success: boolean;
  message: string;
}

/**
 * 단일 URL 제출
 */
export async function submitUrl(url: string): Promise<IndexNowResponse> {
  const endpoint = `https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${INDEXNOW_KEY}`;

  try {
    const response = await fetch(endpoint, { method: "GET" });

    // 200, 202 = 성공
    if (response.status === 200 || response.status === 202) {
      return { success: true, message: `URL 제출 성공: ${url}` };
    }

    return { success: false, message: `제출 실패 (${response.status}): ${url}` };
  } catch (error) {
    return { success: false, message: `에러: ${error}` };
  }
}

/**
 * 여러 URL 일괄 제출
 */
export async function submitUrls(urls: string[]): Promise<IndexNowResponse> {
  const host = new URL(SITE_URL).host;

  const body = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.status === 200 || response.status === 202) {
      return { success: true, message: `${urls.length}개 URL 제출 성공` };
    }

    return { success: false, message: `제출 실패 (${response.status})` };
  } catch (error) {
    return { success: false, message: `에러: ${error}` };
  }
}

/**
 * 새 글 발행 시 호출
 */
export async function notifyNewPost(
  locale: string,
  category: string,
  slug: string
): Promise<IndexNowResponse> {
  const url = `${SITE_URL}/${locale}/${category}/${slug}`;
  return submitUrl(url);
}

/**
 * 사이트맵의 모든 URL 제출 (초기 설정용)
 */
export async function submitSitemap(urls: string[]): Promise<IndexNowResponse> {
  // IndexNow는 한 번에 최대 10,000개 URL 제출 가능
  const batchSize = 10000;
  const results: IndexNowResponse[] = [];

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const result = await submitUrls(batch);
    results.push(result);
  }

  const allSuccess = results.every((r) => r.success);
  return {
    success: allSuccess,
    message: allSuccess
      ? `총 ${urls.length}개 URL 제출 완료`
      : `일부 제출 실패`,
  };
}
