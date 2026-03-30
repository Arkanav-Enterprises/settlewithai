import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://settlewithai.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Settle — Claude AI Deployment Studio",
    template: "%s | Settle",
  },
  description:
    "We deploy Claude (Anthropic's AI) across your team's actual workflows. Structured rollouts, production-grade instructions, real results. Built for manufacturers and mid-market companies.",
  keywords: [
    "AI deployment",
    "AI consulting",
    "AI implementation",
    "Claude AI",
    "AI for business",
    "AI workflow automation",
    "enterprise AI",
    "AI rollout",
    "instruction engineering",
    "AI readiness assessment",
  ],
  authors: [{ name: "Settle" }],
  creator: "Settle",
  publisher: "Settle",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Settle",
    title: "Settle — Claude AI Deployment Studio for Traditional Businesses",
    description:
      "We deploy Claude (Anthropic's AI) across your team's actual workflows. Structured rollouts, production-grade instructions, real results. Built for manufacturers and mid-market companies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Settle — Claude AI Deployment Studio",
    description:
      "We deploy Claude (Anthropic's AI) across your team's actual workflows. Structured rollouts, production-grade instructions, real results.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Settle",
        url: siteUrl,
        description:
          "Claude AI deployment studio that settles Anthropic's Claude into businesses with structured rollouts, production-grade instructions, and real results.",
        knowsAbout: [
          "Artificial Intelligence",
          "AI Deployment",
          "Workflow Automation",
          "Instruction Engineering",
          "Claude AI",
        ],
      },
      {
        "@type": "WebSite",
        name: "Settle",
        url: siteUrl,
      },
      {
        "@type": "Service",
        name: "Claude AI Deployment Services",
        provider: {
          "@type": "Organization",
          name: "Settle",
        },
        description:
          "End-to-end Claude (Anthropic) deployment — readiness assessment, deployment dashboards, instruction engineering, setup and training for manufacturers and mid-market companies.",
        serviceType: "Claude AI Consulting and Deployment",
        areaServed: "Worldwide",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "AI Deployment Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Readiness Assessment",
                description:
                  "Department-by-department workflow audit, use case discovery, and tier-based rollout planning.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Instruction Engineering",
                description:
                  "Production-grade AI instructions with review gates, safety rules, and knowledge file specifications.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Setup & Training",
                description:
                  "Project creation, knowledge file preparation, team training, and ongoing iteration support.",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0FV33C7PC2"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-0FV33C7PC2');`,
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=sentient@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
