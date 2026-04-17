import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-manrope",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const siteUrl = "https://settlewithai.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Settle — Full-Stack AI Agency",
    template: "%s | Settle",
  },
  description:
    "We deploy Claude AI (Anthropic's AI) across your team's actual workflows. Structured rollouts, production-grade instructions, real results. Built for manufacturers and mid-market companies.",
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
    title: "Settle — Full-Stack AI Agency for Traditional Businesses",
    description:
      "We deploy Claude AI (Anthropic's AI) across your team's actual workflows. Structured rollouts, production-grade instructions, real results. Built for manufacturers and mid-market companies.",
    images: [{ url: "/og-image.png", width: 1519, height: 1090, alt: "Settle — Full-Stack AI Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Settle — Full-Stack AI Agency",
    description:
      "We deploy Claude AI (Anthropic's AI) across your team's actual workflows. Structured rollouts, production-grade instructions, real results.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgId = `${siteUrl}/#organization`;
  const personId = `${siteUrl}/#pranav`;
  const websiteId = `${siteUrl}/#website`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": orgId,
        name: "Settle AI",
        legalName: "Settle",
        alternateName: ["Settle AI", "Settle with AI", "Settle"],
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/apple-touch-icon.png`,
          width: 512,
          height: 512,
        },
        image: `${siteUrl}/og-image.png`,
        description:
          "Full-stack AI agency that deploys Claude AI (Anthropic) into the actual workflows of manufacturers, professional services firms, and mid-market companies — from workflow discovery and instruction engineering to custom agent builds, integrations, and ongoing optimization.",
        slogan: "Your business, made AI-native.",
        foundingDate: "2025-11",
        foundingLocation: {
          "@type": "Place",
          name: "Global (remote-first)",
        },
        founder: { "@id": personId },
        brand: {
          "@type": "Brand",
          name: "Settle AI",
          alternateName: "Settle with AI",
          url: siteUrl,
          logo: `${siteUrl}/apple-touch-icon.png`,
        },
        knowsLanguage: ["English"],
        contactPoint: {
          "@type": "ContactPoint",
          email: "hi@settlewithai.com",
          contactType: "sales",
          availableLanguage: ["English"],
        },
        priceRange: "$$",
        areaServed: { "@type": "Place", name: "Worldwide" },
        serviceType: [
          "AI Integration",
          "AI Deployment",
          "AI Consulting",
          "Claude AI Deployment",
          "Workflow Automation",
          "AI Agent Development",
        ],
        sameAs: [
          "https://www.linkedin.com/company/settle-with-ai",
          "https://www.linkedin.com/in/pranavambwani/",
          "https://medium.com/@pranavambwani",
        ],
        knowsAbout: [
          "Artificial Intelligence",
          "AI Integration",
          "AI Deployment",
          "AI Workflow Automation",
          "Instruction Engineering",
          "Claude AI",
          "Anthropic Claude",
          "Model Context Protocol",
          "MCP",
          "Enterprise AI",
          "AI for Manufacturing",
          "AI Agent Development",
        ],
        makesOffer: [
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
              name: "AI Agent Deployment",
              description:
                "End-to-end deployment of Claude AI agents across sales, operations, procurement, finance, HR, and support workflows.",
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
      {
        "@type": "Person",
        "@id": personId,
        name: "Pranav Ambwani",
        givenName: "Pranav",
        familyName: "Ambwani",
        jobTitle: "Founder",
        description:
          "Founder of Settle. Builds and deploys production-grade Claude AI agents across mid-market businesses — 49 use cases mapped, 11 agents shipped in a single engagement with Orient Printing & Packaging.",
        worksFor: { "@id": orgId },
        url: siteUrl,
        sameAs: ["https://www.linkedin.com/in/pranavambwani/"],
        knowsAbout: [
          "Claude AI Deployment",
          "AI Integration for Business",
          "Instruction Engineering",
          "Workflow Automation",
          "AI Agent Architecture",
          "Model Context Protocol (MCP)",
          "Enterprise AI Strategy",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: "Settle",
        url: siteUrl,
        publisher: { "@id": orgId },
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: "Settle — Full-Stack AI Agency for Mid-Market Businesses",
        isPartOf: { "@id": websiteId },
        about: { "@id": orgId },
        primaryImageOfPage: { "@type": "ImageObject", url: `${siteUrl}/og-image.png` },
        description:
          "Full-stack AI agency that deploys Claude AI across manufacturers, professional services firms, and mid-market companies. From discovery to deployment — instruction engineering, custom agents, integrations, and ongoing optimization.",
        inLanguage: "en-US",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [
            ".hero-eyebrow",
            "h1",
            ".hero-subtitle",
          ],
        },
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-ai-deployment`,
        name: "Claude AI Integration & Deployment",
        provider: { "@id": orgId },
        description:
          "End-to-end Claude AI (Anthropic) integration — readiness assessment, deployment dashboards, instruction engineering, setup and training for manufacturers and mid-market companies. Typical engagement: 49 use cases mapped, 11 agents deployed, task time reduced from 4 hours to 30 minutes.",
        serviceType: "AI Integration and Deployment",
        areaServed: { "@type": "Place", name: "Worldwide" },
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Manufacturers and mid-market companies (50–500 employees)",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "AI Integration Services",
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
      /* FAQPage lives on the homepage only. Keeping it here caused GSC
         to flag "Duplicate field 'FAQPage'" on /ai-consulting-for/* and
         /compare/* pages (which get their own FAQ schema from
         ArticleLayout). See src/app/page.tsx for the homepage FAQ. */
    ],
  };

  return (
    <html lang="en" className={`h-full antialiased ${manrope.variable} ${fraunces.variable}`}>
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
