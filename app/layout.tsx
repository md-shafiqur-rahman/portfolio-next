import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Md Shafiqur Rahman — AI Automation Expert",
  description:
    "Md Shafiqur Rahman is an AI Automation Expert specializing in n8n, Make, Zapier workflows. Building intelligent automation systems that save time and multiply results.",
  metadataBase: new URL("https://shafiqur.dev"),
  openGraph: {
    type: "website",
    url: "https://shafiqur.dev/",
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
        <link rel="canonical" href="https://shafiqur.dev/" />
      </head>
      <body>{children}</body>
    </html>
  );
}
