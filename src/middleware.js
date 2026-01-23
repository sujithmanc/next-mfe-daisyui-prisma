import { NextResponse } from "next/server";

export function middleware(req) {
  const res = NextResponse.next();

  // Add CORS headers
  res.headers.set("Access-Control-Allow-Origin", "*"); // or restrict to your frontend domain
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight OPTIONS requests
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: res.headers,
    });
  }

  return res;
}

// Apply middleware only to API routes
export const config = {
  matcher: "/api/:path*",
};