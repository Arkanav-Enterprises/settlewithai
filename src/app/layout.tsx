import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://settlewithai.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Settle — AI, thoughtfully deployed.",
    template: "%s | Settle",
  },
  description:
    "We settle AI into your team's actual workflows — structured rollouts, production-grade instructions, and real results. Not a chatbot demo. Not a slide deck.",
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
    title: "Settle — AI, thoughtfully deployed.",
    description:
      "We settle AI into your team's actual workflows — structured rollouts, production-grade instructions, and real results.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Settle — AI, thoughtfully deployed.",
    description:
      "We settle AI into your team's actual workflows — structured rollouts, production-grade instructions, and real results.",
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
          "AI deployment studio that settles AI into businesses with structured rollouts, production-grade instructions, and real results.",
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
        name: "AI Deployment Services",
        provider: {
          "@type": "Organization",
          name: "Settle",
        },
        description:
          "End-to-end AI deployment — readiness assessment, deployment dashboards, instruction engineering, setup and training.",
        serviceType: "AI Consulting and Deployment",
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
