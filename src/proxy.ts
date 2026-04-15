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

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
