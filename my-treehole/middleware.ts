import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  // Check if the request is for the root path "/"
  if (req.nextUrl.pathname !== "/") {
    return NextResponse.next();
  }

  const token = cookies().get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/404", req.nextUrl));
  }

  const loggedIn = req.cookies.get("treehole-logged-in");
  if (loggedIn) {
    return NextResponse.next();
  }

  try {
    const response = await fetch(
      `${process.env.BASE_URL}/UserManagement/initialize-user`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Cookie: `token=${token.value}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch user data");
      return NextResponse.redirect(new URL("/404", req.nextUrl));
    }

    const result = await response.json();
    if (!result.onboarded) {
      const nextRes = NextResponse.redirect(new URL("/onboarding", req.nextUrl));
      return nextRes;
    }

    // If user is onboarded, allow the request to continue
    const nextRes = NextResponse.next();
    nextRes.cookies.set("treehole-logged-in", "true");

    return nextRes;
  } catch (error) {
    console.error("Error in middleware fetch:", error);
    return NextResponse.redirect(new URL("/404", req.nextUrl));
  }
}

export const config = {
  matcher: ["/"],  // Apply middleware only to the root path
};
