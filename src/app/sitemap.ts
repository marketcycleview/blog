import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const locales = ["ko", "en"];

  // 정적 페이지
  const staticPages: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    // 메인 페이지
    staticPages.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    });

    // 카테고리 페이지
    const categories = ["subsidy", "review", "trending"];
    for (const category of categories) {
      staticPages.push({
        url: `${baseUrl}/${locale}/${category}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      });
    }

    // 검색 페이지
    staticPages.push({
      url: `${baseUrl}/${locale}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    });
  }

  // 동적 페이지 (글)
  const postPages: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const posts = await getAllPosts(locale);

    for (const post of posts) {
      postPages.push({
        url: `${baseUrl}/${locale}/${post.category}/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: post.category === "trending" ? "daily" : "weekly",
        priority: 0.7,
      });
    }
  }

  return [...staticPages, ...postPages];
}
