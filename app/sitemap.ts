import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://shafiqur.dev";

  const blogSlugs = [
    { slug: "ai-automation-specialist-n8n", priority: 0.9 },
    { slug: "automate-business-with-n8n", priority: 0.8 },
    { slug: "rag-ai-agents-explained", priority: 0.7 },
    { slug: "n8n-vs-make-vs-zapier", priority: 0.7 },
    { slug: "webhook-api-integration-guide", priority: 0.7 },
    { slug: "automation-roi-calculator", priority: 0.7 },
    { slug: "crm-automation-hubspot-n8n", priority: 0.7 },
    { slug: "chatbot-customer-support", priority: 0.7 },
  ];

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
    ...blogSlugs.map(({ slug, priority }) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
    })),
  ];
}
