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
  "@type": "Person",
  name: "Md Shafiqur Rahman",
  url: "https://shafiqur.vercel.app",
  image: "https://shafiqur.vercel.app/profile.png",
  jobTitle: "AI Automation Expert",
  description:
    "AI Automation Expert specializing in n8n, Make, Zapier workflows. Building intelligent automation systems that save time and multiply results.",
  sameAs: [
    "https://www.linkedin.com/in/automation-by-shafiq/",
  ],
  knowsAbout: [
    "AI Automation",
    "n8n",
    "Make",
    "Zapier",
    "API Integration",
    "AI Agents",
    "RAG",
    "Python",
    "Workflow Automation",
  ],
  email: "shafiqur.dev@gmail.com",
  offers: {
    "@type": "Offer",
    name: "AI Workflow Automation Services",
    description:
      "End-to-end automation using n8n, Make, and Zapier. AI agents, API integrations, and business process automation.",
  },
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
