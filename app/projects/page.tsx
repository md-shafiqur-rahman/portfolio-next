import type { Metadata } from "next";
import { getAllProjects } from "../../lib/projects";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
    title: "Portfolio — AI Automation Projects | Md Shafiqur Rahman",
    description: "Real automation workflows built for real clients — lead generation, WhatsApp bots, CRM automation, AI agents and more. Browse my project portfolio with screenshots and results.",
    alternates: { canonical: "/projects" },
    openGraph: {
        type: "website",
        url: "/projects",
        title: "AI Automation Project Portfolio | Md Shafiqur Rahman",
        description: "Real n8n, AI agent, reporting, CRM, and business automation projects with workflows and results.",
    },
};

export default function ProjectsPage() {
    const projects = getAllProjects();
    return <ProjectsClient projects={projects} />;
}
