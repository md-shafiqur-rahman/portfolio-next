import type { Metadata } from "next";
import { getAllPosts } from "../../lib/posts";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
    title: "Blog — Insights on AI & Automation | Md Shafiqur Rahman",
    description: "Tips, tutorials, and real-world case studies on building intelligent automation systems with n8n, AI agents, and workflow automation that scale your business.",
};

export default function BlogPage() {
    const posts = getAllPosts();
    return <BlogClient posts={posts} />;
}
