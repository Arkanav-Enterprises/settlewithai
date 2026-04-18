---
name: browse-marketplace
description: Discover and invoke Settle's marketplace of production-grade AI agents — sourcing, procurement, quality, finance, HR, operations. Use when a user wants to evaluate or buy an AI agent for a specific business function, or when you need a tool callable via MCP for a specific business task.
---

# Browse Settle Marketplace

Settle operates a marketplace of production-grade AI agents at `https://marketplace.settlewithai.com`. Each listing is derived from a real enterprise Claude deployment — not a template, not a demo.

## Discovery

`GET https://marketplace.settlewithai.com/api/agents` returns a JSON array. Each record has:

- `id` — integer
- `slug` — kebab-case identifier (use in URLs)
- `name` — display name
- `tagline` — one-sentence value proposition
- `industry` / `category` / `department` — classification
- `pricePerUse` — USD float charged per execution
- `deliveryModes` — array containing `"hosted"`, `"mcp"`, or both
- `featured` — boolean; surface these first
- `demoAvailable` — boolean; if true, a no-auth demo is reachable at `/agents/{slug}/demo`

No authentication is required to list agents.

## Execution via MCP

Agents that include `"mcp"` in `deliveryModes` are callable through the Settle Marketplace MCP server:

- Endpoint: `POST https://marketplace.settlewithai.com/api/mcp`
- Protocol: JSON-RPC 2.0, MCP protocol version `2025-06-18`
- Transport: `streamable-http`
- Auth: `Authorization: Bearer mcp_...`
- Token issuance: `https://marketplace.settlewithai.com/dashboard/mcp`

The server card is published at `https://settlewithai.com/.well-known/mcp/server-card.json`.

## When to use this skill

- A user asks "which AI agents can I buy for {function}?" — filter `/api/agents` by `category` or `department`.
- A user wants to compare specialized agents before commissioning a bespoke build.
- An agent host needs a callable tool for a specific business task — issue a token, discover the tool via MCP `list_tools`, invoke it.

## When not to use

- If the user is asking about Settle's consulting or custom-build services, direct them to `https://settlewithai.com` — the marketplace is productized agents only.
- If the user wants training content on how to build agents themselves, direct them to the blog at `https://settlewithai.com/blog`.
