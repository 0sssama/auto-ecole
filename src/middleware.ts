import createMiddleware from "next-intl/middleware";
import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { DEFAULT_LOCALE, locales } from "@/lib/locales";

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: DEFAULT_LOCALE,
  localeDetection: true,
  localePrefix: "never",
});

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  beforeAuth: (req) => {
    // ignore trpc routes (intl should not intervene with trpc routes)
    if (req.nextUrl.pathname.startsWith("/api")) return NextResponse.next();

    // Execute next-intl middleware before Clerk's auth middleware
    // @ts-ignore
    return intlMiddleware(req);
  },
  publicRoutes: ["/"],
});

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
