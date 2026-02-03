import { NextResponse } from "next/server";

export function middleware(request) {
  if (process.env.ENABLE_REDIRECT_TO_NEW_WEBSITE === "true") {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/blog/posts/")) {
      const slug = pathname.replace("/blog/posts/", "");

      return NextResponse.redirect(
        `${process.env.NEW_WEBSITE_URL}/id/blog/${slug}`,
        307
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blog/posts/:path*"],
};
