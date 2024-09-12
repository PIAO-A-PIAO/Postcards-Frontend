import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const loggedIn = req.cookies.get("treehole-logged-in");
  if (loggedIn) {
    return NextResponse.next();
  }
  // const token = req.cookies.get("token");
  const token = cookies().get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/404", req.nextUrl));
  }

  try {
    const response = await fetch(
      `${process.env.BASE_URL}/UserManagement/get-user`,
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
      const nextRes = NextResponse.redirect(
        new URL("/onboarding", req.nextUrl)
      );
      nextRes.cookies.set("treehole-logged-in", "true");
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
  matcher: ["/"],
};
