import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");
const IMAGE_EXTS = [".png", ".jpg", ".jpeg", ".webp", ".gif"];

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
    screenshots: string[];    // auto-detected from project folder
    hasWorkflow: boolean;     // true if workflow.json exists in project folder
    featured: boolean;
    published: boolean;
    results?: string;
}

export interface Project extends ProjectMeta {
    contentHtml: string;
}

// ─── helpers ────────────────────────────────────────────────────────────────

function tagColor(category: string): string {
    const map: Record<string, string> = {
        "ai automation": "tag-purple",
        automation:      "tag-purple",
        "lead generation": "tag-teal",
        crm:             "tag-orange",
        ecommerce:       "tag-pink",
        chatbot:         "tag-gold",
        scraping:        "tag-orange",
        n8n:             "tag-orange",
        api:             "tag-teal",
        reporting:       "tag-gold",
    };
    return map[category.toLowerCase()] ?? "tag-purple";
}

function categoryIcon(category: string): string {
    const map: Record<string, string> = {
        "ai automation": "🤖",
        automation:      "⚙️",
        "lead generation": "🎯",
        crm:             "🗂️",
        ecommerce:       "🛒",
        chatbot:         "💬",
        scraping:        "🔍",
        n8n:             "🚀",
        api:             "🔗",
        reporting:       "📊",
    };
    return map[category.toLowerCase()] ?? "⚡";
}

function tagLabel(category: string): string {
    const map: Record<string, string> = {
        "ai automation": "AI Automation",
        automation:      "Automation",
        "lead generation": "Lead Gen",
        crm:             "CRM",
        ecommerce:       "E-commerce",
        chatbot:         "Chatbot",
        scraping:        "Scraping",
        n8n:             "n8n",
        api:             "API",
        reporting:       "Reporting",
    };
    return map[category.toLowerCase()] ?? category;
}

/**
 * Read a project folder and auto-detect:
 *  - screenshots (any image files except those starting with _)
 *  - workflow.json existence
 * Returns paths relative to /public/projects/<slug>/  (used in <img src>)
 */
function detectAssets(slug: string): { screenshots: string[]; hasWorkflow: boolean } {
    // Assets live in public/projects/<slug>/
    const assetDir = path.join(process.cwd(), "public", "projects", slug);

    if (!fs.existsSync(assetDir)) {
        return { screenshots: [], hasWorkflow: false };
    }

    const files = fs.readdirSync(assetDir).sort(); // alphabetical

    const screenshots = files.filter((f) => {
        const ext = path.extname(f).toLowerCase();
        return IMAGE_EXTS.includes(ext) && !f.startsWith("_");
    });

    const hasWorkflow = files.includes("workflow.json");

    return { screenshots, hasWorkflow };
}

/**
 * Finds the markdown content for a slug.
 * Supports two layouts:
 *   A) content/projects/<slug>/index.md   ← new folder-based
 *   B) content/projects/<slug>.md         ← old flat file
 */
function findMarkdownPath(slug: string): string | null {
    const folderIndex = path.join(PROJECTS_DIR, slug, "index.md");
    if (fs.existsSync(folderIndex)) return folderIndex;

    const flatFile = path.join(PROJECTS_DIR, `${slug}.md`);
    if (fs.existsSync(flatFile)) return flatFile;

    return null;
}

// ─── public API ─────────────────────────────────────────────────────────────

export function getAllProjects(): ProjectMeta[] {
    if (!fs.existsSync(PROJECTS_DIR)) return [];

    // Collect slugs from BOTH folder-based and flat-file projects
    const entries = fs.readdirSync(PROJECTS_DIR, { withFileTypes: true });

    const slugs = new Set<string>();

    for (const entry of entries) {
        if (entry.isDirectory()) {
            // Folder project: must contain index.md
            const idx = path.join(PROJECTS_DIR, entry.name, "index.md");
            if (fs.existsSync(idx)) slugs.add(entry.name);
        } else if (entry.isFile() && entry.name.endsWith(".md")) {
            slugs.add(entry.name.replace(/\.md$/, ""));
        }
    }

    const projects: ProjectMeta[] = [...slugs]
        .map((slug) => {
            const mdPath = findMarkdownPath(slug);
            if (!mdPath) return null;

            const fileContent = fs.readFileSync(mdPath, "utf8");
            const { data } = matter(fileContent);

            const category = (data.category ?? "automation").toLowerCase();
            const { screenshots, hasWorkflow } = detectAssets(slug);

            return {
                slug,
                title:    data.title    ?? "Untitled",
                excerpt:  data.excerpt  ?? "",
                date: data.date
                    ? new Date(data.date).toLocaleDateString("en-US", {
                          month: "short", day: "numeric", year: "numeric",
                      })
                    : "",
                category,
                tag:    data.tag    ?? tagLabel(category),
                tagCls: data.tagCls ?? tagColor(category),
                icon:   data.icon   ?? categoryIcon(category),
                tools:  Array.isArray(data.tools) ? data.tools : [],
                screenshots,
                hasWorkflow,
                featured:  data.featured  === true,
                published: data.published !== false,
                results:   data.results   ?? "",
            } satisfies ProjectMeta;
        })
        .filter(Boolean)
        .filter((p) => p!.published)
        .sort((a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime()) as ProjectMeta[];

    return projects;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    const mdPath = findMarkdownPath(slug);
    if (!mdPath) return null;

    const fileContent = fs.readFileSync(mdPath, "utf8");
    const { data, content } = matter(fileContent);

    const processed = await remark()
        .use(remarkGfm)
        .use(remarkHtml, { sanitize: false })
        .process(content);
    const contentHtml = processed.toString();

    const category = (data.category ?? "automation").toLowerCase();
    const { screenshots, hasWorkflow } = detectAssets(slug);

    return {
        slug,
        title:    data.title    ?? "Untitled",
        excerpt:  data.excerpt  ?? "",
        date: data.date
            ? new Date(data.date).toLocaleDateString("en-US", {
                  month: "short", day: "numeric", year: "numeric",
              })
            : "",
        category,
        tag:    data.tag    ?? tagLabel(category),
        tagCls: data.tagCls ?? tagColor(category),
        icon:   data.icon   ?? categoryIcon(category),
        tools:  Array.isArray(data.tools) ? data.tools : [],
        screenshots,
        hasWorkflow,
        featured:  data.featured  === true,
        published: data.published !== false,
        results:   data.results   ?? "",
        contentHtml,
    };
}
