import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/config";

// Password protection cookie name
const SITE_ACCESS_COOKIE = "site_access_granted";

// Routes that should be accessible without password
const publicPaths = ["/password", "/api/auth/site-access"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip password protection for static files and certain paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") || // files with extensions (favicon.ico, etc)
    publicPaths.some((path) => pathname.startsWith(path))
  ) {
    // For API routes, still check access cookie (except site-access endpoint)
    if (pathname.startsWith("/api") && !pathname.startsWith("/api/auth/site-access")) {
      const hasAccess = request.cookies.get(SITE_ACCESS_COOKIE);
      if (!hasAccess) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }
    return NextResponse.next();
  }

  // Check for site access cookie
  const hasAccess = request.cookies.get(SITE_ACCESS_COOKIE);

  if (!hasAccess) {
    // Redirect to password page
    const passwordUrl = new URL("/password", request.url);
    // Store the original URL to redirect back after password entry
    passwordUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(passwordUrl);
  }

  // User has access, continue with internationalization middleware
  const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale,
    localePrefix: "as-needed",
  });

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except static files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
