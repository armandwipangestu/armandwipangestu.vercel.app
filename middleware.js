import { NextResponse } from "next/server";
import { LEGACY_SLUG_MAP } from "./utilities/legacy-slug-map";

export function middleware(request) {
  if (process.env.ENABLE_REDIRECT_TO_NEW_WEBSITE === "true") {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/blog/posts/")) {
        const slug = pathname.replace("/blog/posts/", "");

        const fixedSlug = LEGACY_SLUG_MAP[slug] || slug;

        return NextResponse.redirect(
        `${process.env.NEW_WEBSITE_URL}/id/blog/${fixedSlug}`,
        LEGACY_SLUG_MAP[slug] ? 308 : 307
        );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blog/posts/:path*"],
};
