import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    tag: string;
    tagCls: string;
    icon: string;
    featured: boolean;
    published: boolean;
}

export interface Post extends PostMeta {
    contentHtml: string;
}

function tagColor(category: string): string {
    const map: Record<string, string> = {
        n8n: "tag-orange",
        automation: "tag-purple",
        ai: "tag-teal",
        tutorial: "tag-gold",
        business: "tag-pink",
        "lead generation": "tag-teal",
    };
    return map[category.toLowerCase()] ?? "tag-orange";
}

function categoryIcon(category: string): string {
    const map: Record<string, string> = {
        n8n: "🚀",
        automation: "🤖",
        ai: "🧠",
        tutorial: "🔗",
        business: "📈",
        "lead generation": "🎯",
    };
    return map[category.toLowerCase()] ?? "📝";
}

function tagLabel(category: string): string {
    const map: Record<string, string> = {
        n8n: "n8n",
        automation: "Automation",
        ai: "AI & LLMs",
        tutorial: "Tutorial",
        business: "Business",
        "lead generation": "Lead Gen",
    };
    return map[category.toLowerCase()] ?? category;
}

export function getAllPosts(): PostMeta[] {
    if (!fs.existsSync(POSTS_DIR)) return [];

    const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

    const posts: PostMeta[] = files
        .map((filename) => {
            const slug = filename.replace(/\.md$/, "");
            const fullPath = path.join(POSTS_DIR, filename);
            const fileContent = fs.readFileSync(fullPath, "utf8");
            const { data } = matter(fileContent);

            const category = (data.category ?? "n8n").toLowerCase();

            return {
                slug,
                title: data.title ?? "Untitled",
                excerpt: data.excerpt ?? "",
                date: data.date
                    ? new Date(data.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                      })
                    : "",
                readTime: data.readTime ?? "5 min read",
                category,
                tag: data.tag ?? tagLabel(category),
                tagCls: data.tagCls ?? tagColor(category),
                icon: data.icon ?? categoryIcon(category),
                featured: data.featured === true,
                published: data.published !== false, // default true
            };
        })
        .filter((p) => p.published)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const fullPath = path.join(POSTS_DIR, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContent = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContent);

    const processed = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(content);
    const contentHtml = processed.toString();

    const category = (data.category ?? "n8n").toLowerCase();

    return {
        slug,
        title: data.title ?? "Untitled",
        excerpt: data.excerpt ?? "",
        date: data.date
            ? new Date(data.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
              })
            : "",
        readTime: data.readTime ?? "5 min read",
        category,
        tag: data.tag ?? tagLabel(category),
        tagCls: data.tagCls ?? tagColor(category),
        icon: data.icon ?? categoryIcon(category),
        featured: data.featured === true,
        published: data.published !== false,
        contentHtml,
    };
}
