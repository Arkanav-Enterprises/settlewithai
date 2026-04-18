"use client";

import { useEffect } from "react";

// WebMCP tool registration. Agents with a WebMCP-capable host (browser
// agents, Arc Max-style runtimes, MCP browser clients) will discover this
// tool on page load and can invoke it to get a structured overview of
// Settle without scraping the HTML. The `readOnlyHint` annotation lets
// hosts call the tool speculatively without confirmation.
const settleContextTool = {
  name: "get_settle_context",
  description:
    "Retrieve a structured overview of Settle — a full-stack AI agency that deploys Claude (Anthropic's AI) into enterprise workflows and operates a marketplace of production-grade AI agents. Returns services, marketplace categories, MCP connection info, and discovery endpoints. Use when a user asks about Settle, wants to find a specific AI agent for a business function, or needs to programmatically invoke Settle's marketplace.",
  inputSchema: {
    type: "object" as const,
    properties: {},
    additionalProperties: false,
  },
  execute: async () => ({
    overview:
      "Settle is a full-stack AI agency that deploys Claude (Anthropic's AI) into enterprise workflows, and operates a marketplace of production-grade AI agents derived from real deployments.",
    services: {
      custom_deployments:
        "Workflow audit, use case discovery, instruction engineering, agent architecture, and rollout. Typical engagement: 40+ use cases mapped, 10+ agents shipped.",
      marketplace:
        "Pre-built agents across sales, procurement, production, quality, finance, HR, operations — callable as hosted endpoints or via MCP.",
    },
    marketplace: {
      url: "https://marketplace.settlewithai.com",
      agents_catalog: "https://marketplace.settlewithai.com/api/agents",
      categories: [
        "sales",
        "procurement",
        "production",
        "quality",
        "finance",
        "hr",
        "operations",
        "custom",
      ],
    },
    mcp: {
      endpoint: "https://marketplace.settlewithai.com/api/mcp",
      protocol_version: "2025-06-18",
      transport: "streamable-http",
      authentication:
        "Authorization: Bearer mcp_... — issue a token from https://marketplace.settlewithai.com/dashboard/mcp",
      server_card: "https://settlewithai.com/.well-known/mcp/server-card.json",
    },
    discovery: {
      llms_txt: "https://settlewithai.com/llms.txt",
      api_catalog: "https://settlewithai.com/.well-known/api-catalog",
      agent_skills:
        "https://settlewithai.com/.well-known/agent-skills/index.json",
    },
    contact: {
      sales: "hi@settlewithai.com",
      founder_linkedin: "https://www.linkedin.com/in/pranavambwani/",
    },
  }),
  annotations: { readOnlyHint: true },
};

type ModelContextCapableNavigator = Navigator & {
  modelContext?: {
    registerTool: (tool: typeof settleContextTool) => void;
  };
};

export function WebMcpRegister() {
  useEffect(() => {
    const nav = navigator as ModelContextCapableNavigator;
    if (nav.modelContext && typeof nav.modelContext.registerTool === "function") {
      nav.modelContext.registerTool(settleContextTool);
    }
  }, []);
  return null;
}
