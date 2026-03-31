import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
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
  other: {
    "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
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
    images: [{ url: "/og-image.png", width: 1519, height: 1090, alt: "Settle — Claude AI Deployment Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Settle — Claude AI Deployment Studio",
    description:
      "We deploy Claude (Anthropic's AI) across your team's actual workflows. Structured rollouts, production-grade instructions, real results.",
    images: ["/og-image.png"],
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
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/apple-touch-icon.png`,
        },
        description:
          "Claude AI deployment studio that settles Anthropic's Claude into businesses with structured rollouts, production-grade instructions, and real results.",
        foundingDate: "2026",
        contactPoint: {
          "@type": "ContactPoint",
          email: "hi@settlewithai.com",
          contactType: "sales",
          availableLanguage: ["English"],
        },
        sameAs: [],
        knowsAbout: [
          "Artificial Intelligence",
          "AI Deployment",
          "Workflow Automation",
          "Instruction Engineering",
          "Claude AI",
          "Anthropic",
          "Model Context Protocol",
        ],
      },
      {
        "@type": "WebSite",
        name: "Settle",
        url: siteUrl,
        publisher: {
          "@type": "Organization",
          name: "Settle",
        },
      },
      {
        "@type": "ProfessionalService",
        name: "Settle",
        url: siteUrl,
        description:
          "AI deployment studio specializing in Claude (Anthropic) deployment for mid-market businesses. Structured rollouts, instruction engineering, measurable results.",
        priceRange: "$$",
        areaServed: {
          "@type": "Place",
          name: "Worldwide",
        },
        serviceType: "AI Consulting and Deployment",
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
        areaServed: { "@type": "Place", name: "Worldwide" },
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
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Claude AI, and why does Settle use it exclusively?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Claude is Anthropic\u2019s AI assistant \u2014 built for long, complex reasoning and safe enterprise use. Settle chose it exclusively because it handles multi-step business workflows (pricing, documentation, diagnostics) better than any model we\u2019ve tested. One model, deep expertise, no vendor sprawl.",
            },
          },
          {
            "@type": "Question",
            name: "Is AI realistic for manufacturers and traditional businesses?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Settle\u2019s first client is a 79-year-old printing and packaging manufacturer. We mapped 49 use cases across 7 departments and deployed 11 in the first engagement \u2014 from offer generation to BOM creation to service troubleshooting.",
            },
          },
          {
            "@type": "Question",
            name: "How is Settle different from hiring a big consulting firm?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Large firms charge enterprise rates, move slowly, and usually hand you a strategy deck. Settle deploys working Claude projects your team uses from week one. Built for the 50\u2013500 employee company that\u2019s too complex for DIY but doesn\u2019t need a six-month discovery phase.",
            },
          },
          {
            "@type": "Question",
            name: "What does a typical Claude AI deployment engagement look like?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Four phases: Discovery (audit every department\u2019s workflows), Architecture (prioritised rollout plan), Instruction Engineering (production-grade Claude projects with safety rules), and Deploy & Settle (training, launch, iteration). Quick wins ship in weeks.",
            },
          },
          {
            "@type": "Question",
            name: "How long until we see results from AI deployment?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Most teams see their first working Claude project within 2\u20133 weeks. Orient deployed 11 projects across 7 departments in about 6 months, with measurable time savings from month one.",
            },
          },
          {
            "@type": "Question",
            name: "What systems can Claude connect to?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Claude can read and write to ERPs, CRMs, databases, and internal tools via MCP (Model Context Protocol). If your system has an API or structured data export, Settle can connect it.",
            },
          },
          {
            "@type": "Question",
            name: "Do employees need technical skills to use Claude?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Settle engineers the instructions so your team interacts with Claude in plain language. They don\u2019t write prompts or configure anything \u2014 they use structured projects built and tested for their specific workflows.",
            },
          },
          {
            "@type": "Question",
            name: "Is company data safe with Claude AI?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Claude is built by Anthropic with enterprise-grade security. Data sent via the API is not used for training. Every project is configured with explicit safety rules, review gates, and output boundaries.",
            },
          },
        ],
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
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
