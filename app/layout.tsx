import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Md Shafiqur Rahman — AI Automation Expert",
  description:
    "Md Shafiqur Rahman is an AI Automation Expert specializing in n8n, Make, Zapier workflows. Building intelligent automation systems that save time and multiply results.",
  metadataBase: new URL("https://shafiqur.vercel.app"),
  openGraph: {
    type: "website",
    url: "https://shafiqur.vercel.app/",
    title: "Md Shafiqur Rahman — AI Automation Expert",
    description:
      "I build smart, scalable automation systems using n8n, Make, Zapier, APIs, and AI Agents that save time and multiply results for businesses.",
    images: ["/md-shafiqur-rahman-n8n-ai-automation-expert.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Shafiqur Rahman — AI Automation Expert",
    description:
      "I build smart, scalable automation systems using n8n, Make, Zapier, APIs, and AI Agents.",
    images: ["/md-shafiqur-rahman-n8n-ai-automation-expert.png"],
  },
  other: {
    "google-site-verification": "-DYKBnPEEeh1L6xYBBVeKZ6Y-xbP9ahjBuzoD2iHd4M",
  },
};

const schemaOrgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://shafiqur.vercel.app/#person",
      name: "Md Shafiqur Rahman",
      url: "https://shafiqur.vercel.app",
      image: {
        "@type": "ImageObject",
        url: "https://shafiqur.vercel.app/profile.png",
        width: 320,
        height: 320,
      },
      jobTitle: "AI Automation Expert",
      description:
        "AI Automation Expert specializing in n8n, Make, Zapier workflows. Building intelligent automation systems that save time and multiply results.",
      sameAs: [
        "https://www.linkedin.com/in/automation-by-shafiq/",
        "https://wa.me/8801600534507",
      ],
      knowsAbout: [
        "AI Automation",
        "n8n Workflow Automation",
        "Make (Integromat)",
        "Zapier",
        "API Integration",
        "AI Agents",
        "Retrieval-Augmented Generation (RAG)",
        "Python Scripting",
        "Business Process Automation",
        "Chatbot Development",
        "SEO",
      ],
      email: "shafiqur.dev@gmail.com",
      telephone: "+8801600534507",
      nationality: "BD",
      hasOccupation: {
        "@type": "Occupation",
        name: "AI Automation Expert",
        occupationLocation: {
          "@type": "Country",
          name: "Bangladesh",
        },
        description: "Building intelligent automation systems using n8n, Make, Zapier, APIs, and AI Agents.",
        skills: "n8n, Make, Zapier, Python, OpenAI, RAG, API Integration",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://shafiqur.vercel.app/#website",
      url: "https://shafiqur.vercel.app",
      name: "Md Shafiqur Rahman — AI Automation Expert",
      description:
        "Portfolio of Md Shafiqur Rahman, an AI Automation Expert specializing in n8n, Make, Zapier, APIs, and AI Agents.",
      publisher: {
        "@id": "https://shafiqur.vercel.app/#person",
      },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": "https://shafiqur.vercel.app/#webpage",
      url: "https://shafiqur.vercel.app",
      name: "Md Shafiqur Rahman — AI Automation Expert | n8n, Make, Zapier",
      isPartOf: { "@id": "https://shafiqur.vercel.app/#website" },
      about: { "@id": "https://shafiqur.vercel.app/#person" },
      description:
        "Hire Md Shafiqur Rahman for AI automation, n8n workflows, Make scenarios, Zapier automations, AI agents, and API integrations. Save time and multiply results.",
      inLanguage: "en-US",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://shafiqur.vercel.app",
          },
        ],
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://shafiqur.vercel.app/#service",
      name: "AI Workflow Automation Services by Md Shafiqur Rahman",
      url: "https://shafiqur.vercel.app",
      description:
        "End-to-end AI automation using n8n, Make, and Zapier. AI agents, API integrations, chatbots, and business process automation.",
      provider: { "@id": "https://shafiqur.vercel.app/#person" },
      areaServed: "Worldwide",
      serviceType: [
        "AI Workflow Automation",
        "AI Agent Development",
        "API Integration",
        "Business Process Automation",
        "Chatbot Development",
        "Automation Consulting",
        "Lead Generation Automation",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Automation Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Workflow Automation",
              description: "End-to-end automation using n8n, Make, and Zapier.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Agent Development",
              description: "Custom AI agents powered by RAG, LLMs, and vector databases.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "API & Data Integration",
              description: "Seamlessly connect CRM, databases, payment systems, and third-party APIs.",
            },
          },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>"
        />
        <link rel="canonical" href="https://shafiqur.vercel.app/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
