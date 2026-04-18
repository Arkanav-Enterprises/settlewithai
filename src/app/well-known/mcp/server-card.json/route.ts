// MCP Server Card. Advertises the live Settle Marketplace MCP endpoint so
// agents discovering settlewithai.com can find the callable MCP server at
// the marketplace subdomain without scraping the homepage.

const card = {
  serverInfo: {
    name: "settle-marketplace",
    version: "1.0.0",
    title: "Settle Marketplace",
  },
  description:
    "Browse and execute Settle's production-ready agents — sourcing, procurement, quality, finance, HR, operations — via MCP. Every agent in the marketplace is callable here.",
  url: "https://marketplace.settlewithai.com/api/mcp",
  transport: {
    type: "streamable-http",
  },
  protocolVersion: "2025-06-18",
  capabilities: {
    tools: true,
  },
  authentication: {
    type: "bearer",
    scheme: "Bearer",
    description:
      "Issue an MCP access token from the Settle Marketplace dashboard, then pass it as `Authorization: Bearer mcp_...` on requests to the endpoint.",
    tokenIssuance: "https://marketplace.settlewithai.com/dashboard/mcp",
  },
  documentation: "https://marketplace.settlewithai.com/dashboard/mcp",
  publisher: {
    name: "Settle",
    url: "https://settlewithai.com",
  },
};

export function GET() {
  return new Response(JSON.stringify(card, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
