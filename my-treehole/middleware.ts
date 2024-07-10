import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  console.log(token);
  if (!token) {
    return NextResponse.redirect(new URL("/404", req.nextUrl));
  }
}

export const config = {
  matcher: ["/"],
};
