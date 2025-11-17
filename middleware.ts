import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware for route protection
 * - Protects /dashboard routes (requires authentication)
 * - Allows public access to / (login page) and /api/login
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get auth token from cookies
  const authToken = request.cookies.get("auth-token")?.value;

  // Protected routes (dashboard and its sub-routes)
  const isProtectedRoute = pathname.startsWith("/dashboard");

  // If accessing a protected route without auth token, redirect to login page with redirect parameter
  if (isProtectedRoute && !authToken) {
    const loginUrl = new URL("/", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If accessing login page with valid auth token, redirect to dashboard
  if (pathname === "/" && authToken) {
    const redirectTo =
      request.nextUrl.searchParams.get("redirect") || "/dashboard";
    // Validate redirectTo to prevent open redirects
    if (redirectTo.startsWith("/dashboard") || redirectTo === "/dashboard") {
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes) - but we still want to check /api/login
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)",
  ],
};
