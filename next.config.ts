import type { NextConfig } from "next";

const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://app.cal.com https://cal.com https://*.vercel-scripts.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://www.google-analytics.com https://app.cal.com https://cal.com https://*.vercel-insights.com https://*.vercel-analytics.com https://vitals.vercel-insights.com",
  "frame-src 'self' https://app.cal.com https://cal.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  async rewrites() {
    // App Router skips dotted folders, so /.well-known/* is served by route
    // handlers living under src/app/well-known/*. This rewrite keeps the
    // public-facing paths spec-compliant while letting the filesystem be sane.
    return [
      { source: "/.well-known/:path*", destination: "/well-known/:path*" },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy-Report-Only",
            value: CSP_REPORT_ONLY,
          },
        ],
      },
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value: [
              '</llms.txt>; rel="describedby"; type="text/plain"',
              '</.well-known/api-catalog>; rel="api-catalog"',
              '</.well-known/mcp/server-card.json>; rel="service-desc"; type="application/json"',
              '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
            ].join(", "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
