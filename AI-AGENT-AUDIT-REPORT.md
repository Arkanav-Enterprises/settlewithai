# AI Agent Readiness Audit — settlewithai.com

**Date:** 2026-04-18
**Scanner:** [isitagentready.com](https://isitagentready.com/) (Cloudflare)
**Score:** **83 / 100** — Level 5 "Agent-Native" (up from 25, Level 1 "Basic Web Presence")
**Shipped in:** commit `f148e7b` — *Agent-readiness: content signals, well-known manifests, WebMCP tool*

---

## Score Breakdown

| Category | Before | After | Delta |
|---|---|---|---|
| Discoverability | 67 (2/3) | **100 (3/3)** | +33 |
| Content Accessibility | 0 (0/1) | **100 (1/1)** | +100 |
| Bot Access Control | 50 (1/2) | **100 (2/2)** | +50 |
| API / Auth / MCP / Skills | 0 (0/6) | **67 (4/6)** | +67 |
| **Overall** | **25** | **83** | **+58** |

Three of four categories are at ceiling. The two remaining checks in the fourth category are intentionally deferred — see [What We Intentionally Skipped](#what-we-intentionally-skipped).

---

## What Shipped (the 7 fixes)

| # | Fix | File(s) | Unlocks scanner check |
|---|---|---|---|
| 1 | Cloudflare `Content-Signal` directive | `public/robots.txt` | Bot Access Control → content signals |
| 2 | `Link` headers on `/` (4 rels) | `next.config.ts` | Discoverability → describedby/api-catalog/service-desc |
| 3 | Markdown content negotiation via proxy | `src/proxy.ts` | Content Accessibility → markdown representation |
| 4 | RFC 9727 API Catalog (linkset) | `src/app/well-known/api-catalog/route.ts` | API / Auth / MCP → api-catalog |
| 5 | MCP Server Card | `src/app/well-known/mcp/server-card.json/route.ts` | API / Auth / MCP → MCP discovery |
| 6 | Agent Skills 0.2.0 index + `SKILL.md` | `public/.well-known/agent-skills/` | API / Auth / MCP → skill discovery |
| 7 | WebMCP tool (`get_settle_context`) | `src/app/webmcp-register.tsx` → mounted in `src/app/layout.tsx` | API / Auth / MCP → WebMCP |

All seven endpoints are served from the root origin. The dotted-folder URLs (`/.well-known/*`) are mapped to non-dotted route handlers under `src/app/well-known/*` via a rewrite in `next.config.ts` — see [Invariants](#invariants).

---

## What We Intentionally Skipped

Two scanner checks remain at zero. Both are **not applicable to settlewithai.com's architecture** and would be actively harmful to fake.

### `/.well-known/oauth-authorization-server` (RFC 8414)

The scanner asks: *"If your site has protected APIs, publish OAuth discovery metadata with `authorization_endpoint`, `token_endpoint`, `jwks_uri`, `grant_types_supported`."*

**Answer:** `settlewithai.com` has no protected APIs. The marketing site is fully public. The marketplace at `marketplace.settlewithai.com` issues bearer tokens manually via `/dashboard/mcp` — a dashboard-driven copy-paste flow, not a spec-compliant OAuth 2.0 authorization server.

Publishing this metadata would advertise endpoints that don't exist. Agent hosts discovering the metadata would hit `/oauth/authorize` and `/oauth/token`, get 404s, and fail silently.

### `/.well-known/oauth-protected-resource` (RFC 9728)

The scanner asks: *"Publish your resource identifier and `authorization_servers` (OAuth/OIDC issuer URLs that can issue tokens for this resource)."*

**Answer:** Root domain has no protected resources. `authorization_servers` requires URLs that serve spec-compliant `oauth-authorization-server` metadata — which the marketplace doesn't currently have. Pointing at a non-compliant issuer would mislead every agent host that trusts the metadata.

### Summary

| Check | Why skipped | Cost of faking |
|---|---|---|
| `oauth-authorization-server` | No OAuth 2.0 server exists on any Settle origin | Agent hosts hit dead endpoints, lose trust |
| `oauth-protected-resource` | Root domain has no protected APIs | Claims resource scope that can't be validated |

**Level 5 "Agent-Native" is the scanner's top tier.** There is no Level 6. Scoring higher than 83 requires building the underlying OAuth infrastructure first, not publishing manifests for infrastructure that doesn't exist.

---

## Deferred to `settle-client-brain`

The OAuth work, if it ever happens, belongs in the subdomain repo (`/Users/pranavambwani/Documents/settle-client-brain`), which owns `marketplace.settlewithai.com`.

**Sequence for future work:**

1. Build a real OAuth 2.0 authorization server on the marketplace (authorize + token + refresh + revoke + JWKS). Replaces the current dashboard-issued bearer tokens.
2. Publish `marketplace.settlewithai.com/.well-known/oauth-authorization-server` (RFC 8414 metadata — issuer, endpoints, JWKS URL, supported grant types).
3. Publish `marketplace.settlewithai.com/.well-known/oauth-protected-resource` (RFC 9728 metadata — resource identifier, authorization_servers list, supported scopes).
4. *Optionally* publish `settlewithai.com/.well-known/oauth-protected-resource` pointing at the marketplace as the authorization server. This is the cross-origin case RFC 9728 was designed for.

Step 1 is weeks of product/engineering. Steps 2–4 are each under a day of manifest work. **Do not do steps 2–4 without step 1** — publishing discovery metadata for an auth server that doesn't exist is worse than publishing nothing.

---

## How to Re-Audit

**UI:**
```
open "https://isitagentready.com/settlewithai.com"
```

**API (returns full per-check JSON):**
```bash
curl -s https://isitagentready.com/api/scan \
  -H 'content-type: application/json' \
  -d '{"url":"https://settlewithai.com","enabledChecks":[]}' | jq
```

**Cache behavior:** Scanner caches results for several minutes. If you want a fresh result after a deploy:
- Append `?refresh=1` to the UI URL, OR
- Wait 5–10 minutes for cache rollover, OR
- Hit the API directly (less aggressive cache).

**What to check after any deploy touching discovery/manifests:**
- `curl -I https://settlewithai.com/` — verify `Link` header still lists all 4 rels
- `curl -H 'Accept: text/markdown' https://settlewithai.com/` — verify markdown content negotiation returns `llms.txt`
- `curl https://settlewithai.com/.well-known/api-catalog` — verify `application/linkset+json` response
- `curl https://settlewithai.com/.well-known/mcp/server-card.json` — verify MCP endpoint points at real marketplace URL
- `curl https://settlewithai.com/.well-known/agent-skills/index.json` — verify digest matches SKILL.md

---

## Invariants

Things that will silently break agent discovery if changed without care.

### 1. Agent skill digest must match SKILL.md byte-for-byte

`public/.well-known/agent-skills/index.json` embeds a SHA256 of `browse-marketplace/SKILL.md`. Agent hosts verify the hash before trusting the skill. If `SKILL.md` is edited — even a trailing newline change — the served file will diverge from the advertised digest and every compliant host will reject the skill.

**After any SKILL.md edit:**
```bash
shasum -a 256 public/.well-known/agent-skills/browse-marketplace/SKILL.md
# → copy the hash into public/.well-known/agent-skills/index.json
#   under skills[0].digest as "sha256:<hash>"
```

Current digest: `sha256:101eec9f6c7c0a1e14554b8b650c6cf486c0306bc566d7a994e56a2b729500f0`

### 2. The `.well-known` rewrite in `next.config.ts` is load-bearing

App Router silently skips folders whose names start with `.`. Every dynamic `/.well-known/*` endpoint (`api-catalog`, `mcp/server-card.json`) lives under `src/app/well-known/*` (non-dotted) and is publicly reachable only because of:

```ts
async rewrites() {
  return [
    { source: "/.well-known/:path*", destination: "/well-known/:path*" },
  ];
}
```

Remove this rewrite and every discovery endpoint served by a route handler 404s. Static files under `public/.well-known/` are unaffected (Next serves them directly).

### 3. WebMCP tool stays docs-only

`src/app/webmcp-register.tsx` registers a `get_settle_context` tool that returns **static** context (overview, endpoints, categories). Do not convert it to a live `fetch()` against `marketplace.settlewithai.com` — the marketplace sends no `Access-Control-Allow-Origin` for root-domain origins, so cross-origin fetches fail silently in the browser. Agents that need live data should call the marketplace MCP directly.

### 4. `Vary: Accept` on the homepage

The proxy (`src/proxy.ts`) sets `Vary: Accept` on both branches of homepage content negotiation so shared caches don't serve the wrong representation. The HTML branch may have this header overwritten by Next's RSC renderer — acceptable because the homepage is dynamically rendered and not cached. If the homepage ever moves to ISR or static export, revisit this.

### 5. Link header + api-catalog stay in sync

The `Link` header in `next.config.ts` (`source: "/"`) lists 4 rels. The `api-catalog` linkset at `src/app/well-known/api-catalog/route.ts` duplicates that information. Any new manifest added in the future needs both:
- A new entry in `next.config.ts` → `headers()` → `source: "/"` → Link header
- A new entry in `api-catalog` linkset

---

## Bibliography

**Specs**
- [RFC 9727](https://www.rfc-editor.org/rfc/rfc9727) — API Catalog (well-known URI)
- [RFC 9264](https://www.rfc-editor.org/rfc/rfc9264) — Linkset JSON format
- [RFC 9728](https://www.rfc-editor.org/rfc/rfc9728) — OAuth Protected Resource Metadata (*deferred*)
- [RFC 8414](https://www.rfc-editor.org/rfc/rfc8414) — OAuth Authorization Server Metadata (*deferred*)
- [RFC 8631](https://www.rfc-editor.org/rfc/rfc8631) — `service-desc` / `service-doc` link relations

**Agent / AI discovery**
- [Cloudflare Content Signals Policy](https://contentsignals.org) — `search=`, `ai-input=`, `ai-train=` directives in robots.txt
- [MCP (Model Context Protocol)](https://modelcontextprotocol.io) — protocol version `2025-06-18`, transport `streamable-http`
- [Agent Skills discovery schema 0.2.0](https://schemas.agentskills.io/discovery/0.2.0/schema.json) — Anthropic + Vercel Labs
- [WebMCP](https://webmcp.org) — `navigator.modelContext.registerTool` API for in-browser agent hosts
- [llms.txt proposal](https://llmstxt.org) — markdown summary for LLM consumers

**Scanner**
- [isitagentready.com](https://isitagentready.com) — Cloudflare's agent readiness scanner (launched 2026-03)
- Scan API: `POST https://isitagentready.com/api/scan` with `{"url":"...","enabledChecks":[]}`

---

## Prior Score History

| Date | Score | Level | Notes |
|---|---|---|---|
| 2026-04-18 (morning) | 25 | Level 1 — Basic Web Presence | Pre-audit baseline |
| 2026-04-18 (afternoon) | **83** | **Level 5 — Agent-Native** | After commit `f148e7b` |
