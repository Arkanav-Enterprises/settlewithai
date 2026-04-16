import type { Metadata } from "next";
import Script from "next/script";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-manrope",
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
    title: "Settle — Claude AI Deployment Studio for Traditional Businesses",
    description:
      "We deploy Claude AI (Anthropic's AI) across your team's actual workflows. Structured rollouts, production-grade instructions, real results. Built for manufacturers and mid-market companies.",
    images: [{ url: "/og-image.png", width: 1519, height: 1090, alt: "Settle — Claude AI Deployment Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Settle — Claude AI Deployment Studio",
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
          "Claude AI deployment studio that settles Anthropic's Claude AI into businesses with structured rollouts, production-grade instructions, and real results.",
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
          "AI deployment studio specializing in Claude AI (Anthropic) deployment for mid-market businesses. Structured rollouts, instruction engineering, measurable results.",
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
          "End-to-end Claude AI (Anthropic) deployment — readiness assessment, deployment dashboards, instruction engineering, setup and training for manufacturers and mid-market companies.",
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
      /* FAQPage lives on the homepage only. Keeping it here caused GSC
         to flag "Duplicate field 'FAQPage'" on /ai-consulting-for/* and
         /compare/* pages (which get their own FAQ schema from
         ArticleLayout). See src/app/page.tsx for the homepage FAQ. */
    ],
  };

  return (
    <html lang="en" className={`h-full antialiased ${manrope.variable} ${sentient.variable}`}>
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
