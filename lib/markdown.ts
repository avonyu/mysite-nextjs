import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

const postsDirectory = path.join(process.cwd(), "content/blog");

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export interface BlogPost extends BlogPostMeta {
  content: string;
  html: string;
}

function parseDate(dateStr: string): Date {
  return new Date(dateStr);
}

export function getAllPostSlugs(): string[] {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): BlogPost {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? data.date.toISOString().split("T")[0] : "Unknown",
    description: data.description ?? "",
    tags: data.tags ?? [],
    content,
    html: md.render(content),
  };
}

export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs();

  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());

  return posts;
}

export function getAllPostMetas(): BlogPostMeta[] {
  const posts = getAllPosts();
  return posts.map(({ slug, title, date, description, tags }) => ({
    slug,
    title,
    date,
    description,
    tags,
  }));
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}
