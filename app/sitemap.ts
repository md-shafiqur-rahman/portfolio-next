import { MetadataRoute } from "next";
import { getAllPosts } from "../lib/posts";
import { getAllProjects } from "../lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://shafiqur.dev";

  const posts = getAllPosts();
  const projects = getAllProjects();
  const latestContentDate = [...posts, ...projects]
    .map((item) => new Date(item.date))
    .filter((date) => !Number.isNaN(date.getTime()))
    .sort((a, b) => b.getTime() - a.getTime())[0];

  // Dynamic: read all published blog posts from content/blog/
  const blogEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : undefined,
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.9 : 0.7,
  }));

  // Dynamic: read all published projects from content/projects/
  const projectEntries = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.date ? new Date(project.date) : undefined,
    changeFrequency: "monthly" as const,
    priority: project.featured ? 0.9 : 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: latestContentDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestContentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: latestContentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogEntries,
    ...projectEntries,
  ];
}
