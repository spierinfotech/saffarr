import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  author: string;
  category: string;
  tags: string[];
  cover: string;
  coverAlt: string;
  excerpt: string;
  summary: string;
  readMinutes: number;
};

export type Post = PostMeta & { html: string; toc: { id: string; text: string }[] };

const dir = path.join(process.cwd(), "src/content/posts");

export const categories = [
  "Airport Tips",
  "Weekend Getaways",
  "Monsoon Drives",
  "Pilgrimage",
  "Food Stops",
  "Corporate Travel",
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function readFile(file: string): Post {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const { data, content } = matter(raw);
  const toc: { id: string; text: string }[] = [];
  const md = new Marked({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const id = slugify(text);
        if (depth === 2) toc.push({ id, text: text.replace(/<[^>]+>/g, "") });
        return `<h${depth} id="${id}">${text}</h${depth}>`;
      },
    },
  });
  const html = md.parse(content) as string;
  const words = content.split(/\s+/).length;
  return {
    slug: file.replace(/\.md$/, ""),
    title: data.title,
    date: data.date,
    updated: data.updated,
    author: data.author ?? "Saffarr Travels",
    category: data.category,
    tags: data.tags ?? [],
    cover: data.cover,
    coverAlt: data.coverAlt ?? "",
    excerpt: data.excerpt,
    summary: data.summary ?? data.excerpt,
    readMinutes: Math.max(2, Math.round(words / 220)),
    html,
    toc,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map(readFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function formatDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
