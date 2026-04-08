import { MetadataRoute } from "next";
import { getAllPosts } from "../lib/posts";
import { getAllProjects } from "../lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://shafiqur.dev";

  // Dynamic: read all published blog posts from content/blog/
  const blogEntries = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.9 : 0.7,
  }));

  // Dynamic: read all published projects from content/projects/
  const projectEntries = getAllProjects().map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: project.featured ? 0.9 : 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogEntries,
    ...projectEntries,
  ];
}
