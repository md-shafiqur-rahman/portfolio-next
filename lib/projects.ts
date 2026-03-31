import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export interface ProjectMeta {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    tag: string;
    tagCls: string;
    icon: string;
    tools: string[];
    screenshots: string[];   // image filenames from /public/projects/<slug>/
    featured: boolean;
    published: boolean;
    liveUrl?: string;
    videoUrl?: string;
    results?: string;        // one-liner result/impact e.g. "Saved 15 hrs/week"
    workflowFile?: string;   // e.g. "workflow.json" → /public/projects/<slug>/workflow.json
}

export interface Project extends ProjectMeta {
    contentHtml: string;
}

function tagColor(category: string): string {
    const map: Record<string, string> = {
        "ai automation": "tag-purple",
        automation: "tag-purple",
        "lead generation": "tag-teal",
        crm: "tag-orange",
        ecommerce: "tag-pink",
        chatbot: "tag-gold",
        scraping: "tag-orange",
        n8n: "tag-orange",
        api: "tag-teal",
        reporting: "tag-gold",
    };
    return map[category.toLowerCase()] ?? "tag-purple";
}

function categoryIcon(category: string): string {
    const map: Record<string, string> = {
        "ai automation": "🤖",
        automation: "⚙️",
        "lead generation": "🎯",
        crm: "🗂️",
        ecommerce: "🛒",
        chatbot: "💬",
        scraping: "🔍",
        n8n: "🚀",
        api: "🔗",
        reporting: "📊",
    };
    return map[category.toLowerCase()] ?? "⚡";
}

function tagLabel(category: string): string {
    const map: Record<string, string> = {
        "ai automation": "AI Automation",
        automation: "Automation",
        "lead generation": "Lead Gen",
        crm: "CRM",
        ecommerce: "E-commerce",
        chatbot: "Chatbot",
        scraping: "Scraping",
        n8n: "n8n",
        api: "API",
        reporting: "Reporting",
    };
    return map[category.toLowerCase()] ?? category;
}

export function getAllProjects(): ProjectMeta[] {
    if (!fs.existsSync(PROJECTS_DIR)) return [];

    const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".md"));

    const projects: ProjectMeta[] = files
        .map((filename) => {
            const slug = filename.replace(/\.md$/, "");
            const fullPath = path.join(PROJECTS_DIR, filename);
            const fileContent = fs.readFileSync(fullPath, "utf8");
            const { data } = matter(fileContent);

            const category = (data.category ?? "automation").toLowerCase();

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
                category,
                tag: data.tag ?? tagLabel(category),
                tagCls: data.tagCls ?? tagColor(category),
                icon: data.icon ?? categoryIcon(category),
                tools: Array.isArray(data.tools) ? data.tools : [],
                screenshots: Array.isArray(data.screenshots) ? data.screenshots : [],
                featured: data.featured === true,
                published: data.published !== false,
                liveUrl: data.liveUrl ?? "",
                videoUrl: data.videoUrl ?? "",
                results: data.results ?? "",
                workflowFile: data.workflowFile ?? "",
            };
        })
        .filter((p) => p.published)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return projects;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    const fullPath = path.join(PROJECTS_DIR, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContent = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContent);

    const processed = await remark()
        .use(remarkGfm)
        .use(remarkHtml, { sanitize: false })
        .process(content);
    const contentHtml = processed.toString();

    const category = (data.category ?? "automation").toLowerCase();

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
        category,
        tag: data.tag ?? tagLabel(category),
        tagCls: data.tagCls ?? tagColor(category),
        icon: data.icon ?? categoryIcon(category),
        tools: Array.isArray(data.tools) ? data.tools : [],
        screenshots: Array.isArray(data.screenshots) ? data.screenshots : [],
        featured: data.featured === true,
        published: data.published !== false,
        liveUrl: data.liveUrl ?? "",
        videoUrl: data.videoUrl ?? "",
        results: data.results ?? "",
        workflowFile: data.workflowFile ?? "",
        contentHtml,
    };
}
