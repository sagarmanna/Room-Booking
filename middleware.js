import { NextResponse } from "next/server";

export function middleware(request) {
  const user = request.cookies.get("user");
  const { pathname } = request.nextUrl;

  if (
    !user &&
    (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/bookings") ||
      pathname.startsWith("/admin")
    )
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/bookings/:path*",
    "/admin/:path*",
  ],
};