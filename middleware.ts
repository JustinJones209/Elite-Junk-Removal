import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Canonical host is callmegonejunk.com (no www). */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  if (host === "www.callmegonejunk.com") {
    const dest = new URL(request.url);
    dest.hostname = "callmegonejunk.com";
    dest.protocol = "https:";
    dest.port = "";
    return NextResponse.redirect(dest, 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
