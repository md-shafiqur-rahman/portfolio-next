import type { Metadata } from "next";
import { getAllProjects } from "../../lib/projects";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
    title: "Portfolio — AI Automation Projects | Md Shafiqur Rahman",
    description: "Real automation workflows built for real clients — lead generation, WhatsApp bots, CRM automation, AI agents and more. Browse my project portfolio with screenshots and results.",
};

export default function ProjectsPage() {
    const projects = getAllProjects();
    return <ProjectsClient projects={projects} />;
}
