import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/404", req.nextUrl));
  }

  try {
    const response = await fetch("http://localhost:8080/api/Treehole/get-user", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie: `token=${token.value}`
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch user data");
      return NextResponse.redirect(new URL("/404", req.nextUrl));
    }

    const result = await response.json();
    if (!result.onboard) {
      return NextResponse.redirect(new URL("/onboarding", req.nextUrl));
    }

    // If user is onboarded, allow the request to continue
    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware fetch:", error);
    return NextResponse.redirect(new URL("/404", req.nextUrl));
  }
}

export const config = {
  matcher: ["/"],
};
