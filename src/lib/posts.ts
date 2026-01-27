import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  keywords: string[];
  content: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
}

export async function getAllPosts(locale: string): Promise<PostMeta[]> {
  const posts: PostMeta[] = [];
  const localeDir = path.join(contentDirectory, locale);

  if (!fs.existsSync(localeDir)) {
    return posts;
  }

  const categories = fs.readdirSync(localeDir);

  for (const category of categories) {
    const categoryDir = path.join(localeDir, category);
    const stat = fs.statSync(categoryDir);

    if (!stat.isDirectory()) continue;

    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith(".mdx"));

    for (const file of files) {
      const filePath = path.join(categoryDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      posts.push({
        slug: file.replace(".mdx", ""),
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        category: category,
        tags: data.tags || [],
      });
    }
  }

  // 날짜 기준 내림차순 정렬
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostsByCategory(locale: string, category: string): Promise<PostMeta[]> {
  const allPosts = await getAllPosts(locale);
  return allPosts.filter((post) => post.category === category);
}

export async function getPostBySlug(
  locale: string,
  category: string,
  slug: string
): Promise<Post | null> {
  const filePath = path.join(contentDirectory, locale, category, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || "",
    description: data.description || "",
    date: data.date || "",
    category,
    tags: data.tags || [],
    keywords: data.keywords || [],
    content,
  };
}

export async function getAllSlugs(locale: string, category: string): Promise<string[]> {
  const categoryDir = path.join(contentDirectory, locale, category);

  if (!fs.existsSync(categoryDir)) {
    return [];
  }

  return fs
    .readdirSync(categoryDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}
