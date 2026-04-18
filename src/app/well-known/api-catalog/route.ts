// RFC 9727 API Catalog, serialized as RFC 9264 Linkset JSON.
// Lives at /.well-known/api-catalog via the rewrite in next.config.ts.

const SITE = "https://settlewithai.com";
const MARKETPLACE = "https://marketplace.settlewithai.com";

const catalog = {
  linkset: [
    {
      anchor: `${SITE}/.well-known/api-catalog`,
      "service-desc": [
        {
          href: `${MARKETPLACE}/api/mcp`,
          type: "application/json",
          title: "Settle Marketplace MCP server metadata (JSON-RPC 2.0 endpoint)",
        },
        {
          href: `${MARKETPLACE}/api/agents`,
          type: "application/json",
          title: "Settle Marketplace agent catalog",
        },
      ],
      "service-doc": [
        {
          href: `${MARKETPLACE}/dashboard/mcp`,
          type: "text/html",
          title: "Settle MCP documentation",
        },
      ],
      describedby: [
        {
          href: `${SITE}/llms.txt`,
          type: "text/markdown",
          title: "Settle — agent-readable overview",
        },
        {
          href: `${SITE}/llms-full.txt`,
          type: "text/markdown",
          title: "Settle — full agent-readable content",
        },
      ],
      sitemap: [
        {
          href: `${SITE}/sitemap.xml`,
          type: "application/xml",
          title: "Settle sitemap",
        },
      ],
    },
  ],
};

export function GET() {
  return new Response(JSON.stringify(catalog, null, 2), {
    headers: {
      "Content-Type":
        'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
