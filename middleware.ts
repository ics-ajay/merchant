// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/signup");
  const isDashboard = pathname.startsWith("/dashboard");

  const res = await fetch(`${req.nextUrl.origin}/api/auth/me`, {
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
  });

  const isAuthenticated = res.ok;

  // 🔒 Block dashboard if not logged in
  if (isDashboard && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🚫 Block login/signup if already logged in
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
