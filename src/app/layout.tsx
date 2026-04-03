import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

const sentient = localFont({
  src: [
    { path: "../fonts/sentient-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/sentient-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/sentient-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-sentient",
});

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
              text: "Claude is Anthropic\u2019s AI assistant, purpose-built for long, complex reasoning and safe enterprise use. Settle chose to work exclusively with Claude because, after testing every major model in production business workflows, it consistently outperforms on the tasks that matter most: multi-step document generation, precise instruction following, and reliable output across hundreds of runs. At Orient Printing, for example, Claude handles everything from generating 8-page sales proposals with accurate pricing to troubleshooting industrial printing press issues from technical manuals. One model, deeply understood, produces better results than spreading across three or four.",
            },
          },
          {
            "@type": "Question",
            name: "Is AI realistic for manufacturers and traditional businesses?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Absolutely. Settle\u2019s first client is a 79-year-old printing and packaging manufacturer with 20,000+ units installed across 50 countries. Settle mapped 49 use cases across their 7 departments and deployed 11 in the first engagement, covering offer generation, RFQ drafting, BOM creation, service troubleshooting, and vendor analysis. Traditional businesses often have the most to gain from AI because their workflows are repeatable, documentation-heavy, and largely unchanged for years. The offer generator alone cut document creation time from 4 hours to 30 minutes.",
            },
          },
          {
            "@type": "Question",
            name: "How is Settle different from hiring a big consulting firm?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Large consulting firms charge enterprise rates, take months to deliver a strategy deck, and then hand you a PDF that your team has to figure out how to implement. Settle does the opposite. Working Claude projects ship in the first two to three weeks. Your team is using AI from week one, not waiting for a 200-page assessment. Settle is built specifically for companies with 50 to 500 employees \u2014 too complex for a DIY tutorial but too lean to justify a Big Four engagement. Every project comes with production-grade instructions, safety rules, and review gates. Not a strategy deck. Working tools.",
            },
          },
          {
            "@type": "Question",
            name: "What does a typical Claude AI deployment engagement look like?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Four phases. First, Discovery: auditing every department\u2019s workflows to identify where AI will have the highest impact. Second, Architecture: building a prioritised rollout plan that groups use cases by workflow cluster, not department. Third, Instruction Engineering: writing production-grade Claude project instructions with safety rules, edge case handling, review gates, and knowledge file specifications. Fourth, Deploy and Settle: projects go live, the team gets trained, and Settle iterates based on real usage. Quick wins typically ship in the first 2\u20133 weeks. Deeper integrations with ERP or CRM follow in subsequent phases.",
            },
          },
          {
            "@type": "Question",
            name: "How long until we see results from AI deployment?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Most teams see their first working Claude project within 2 to 3 weeks. These are typically high-volume, low-complexity tasks like email drafting, document generation, or knowledge base Q&A. The full rollout depends on scope and how many departments are involved. Orient Printing deployed 11 projects across 7 departments over about 6 months, but they were measuring time savings from month one. The key is starting with a quick win that proves the value, then expanding. Once one department sees results, the others start asking when they\u2019re next.",
            },
          },
          {
            "@type": "Question",
            name: "What systems can Claude connect to?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Claude connects to business systems through MCP (Model Context Protocol), an open standard built by Anthropic specifically for enterprise integration. If your system has an API or structured data export, Settle can build a connector for it. Connectors have been built for ERPs like SAP, CRMs like HubSpot and Salesforce, document stores like SharePoint and Google Drive, email systems, and custom internal databases. Each connector is a lightweight server that translates data between Claude and your system. Most take a few days to build and test.",
            },
          },
          {
            "@type": "Question",
            name: "Do employees need technical skills to use Claude?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Not at all. Settle engineers the instructions so your team interacts with Claude in plain language, exactly the way they\u2019d talk to a knowledgeable colleague. They don\u2019t write prompts, configure settings, or understand anything about AI. They use structured Claude projects built and tested specifically for their workflows. A sales engineer types in a customer name and product requirements, and gets back a formatted offer document. A procurement manager describes what they need, and gets a complete RFQ. The complexity is in the instructions, not in what your team has to do.",
            },
          },
          {
            "@type": "Question",
            name: "Is company data safe with Claude AI?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Claude is built by Anthropic, which leads the industry in AI safety research. Data sent to Claude via the API is not used for model training by default. Anthropic holds SOC 2 Type II certification and offers HIPAA-eligible plans for healthcare data. Beyond Anthropic\u2019s security, every project Settle deploys includes explicit safety rules, review gates, and output boundaries written into the instructions. Claude won\u2019t share data between departments unless configured to. It won\u2019t fabricate information. It won\u2019t take actions without human approval at defined checkpoints.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className={`h-full antialiased ${inter.variable} ${sentient.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0FV33C7PC2"
          strategy="afterInteractive"
        />
        <Script id="gtag-config" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-0FV33C7PC2');`}
        </Script>
      </body>
    </html>
  );
}
