import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRIMARY_HOST = "settlewithai.com";

// Redirect any request served from a *.vercel.app hostname to the primary
// domain so the alias never accumulates a crawlable surface area. Keeps
// Bing/Google link graphs honest and prevents accidental alias sharing.
export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (host.endsWith(".vercel.app")) {
    const url = new URL(request.nextUrl.pathname + request.nextUrl.search, `https://${PRIMARY_HOST}`);
    return NextResponse.redirect(url, 308);
  }

  // Markdown content negotiation on the homepage. Agents advertising
  // `Accept: text/markdown` get the llms.txt representation; everyone else
  // gets HTML. `Vary: Accept` on both branches prevents caches from serving
  // whichever format arrived first to every subsequent requester.
  if (request.nextUrl.pathname === "/") {
    const accept = request.headers.get("accept") ?? "";
    if (accept.includes("text/markdown")) {
      const url = request.nextUrl.clone();
      url.pathname = "/llms.txt";
      return NextResponse.rewrite(url, {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          Vary: "Accept",
        },
      });
    }
    const response = NextResponse.next();
    response.headers.set("Vary", "Accept");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
