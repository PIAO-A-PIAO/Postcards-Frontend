import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import TreeholeUser from "../../../../(models)/TreeholeUsers";
import connectDB from "../../../../lib/connectDB";

export async function POST(req) {
  try {
    const token = req.cookies.get("token");
    if (!token) {
      return NextResponse.json(
        {
          message: "Token not found",
        },
        { status: 404 }
      );
    }

    const decoded = jwt.verify(token.value, process.env.TOKEN_SECRET);

    if (!decoded || !decoded.userId) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();
    const formData = body.formData;

    if (!formData || formData.languages.length === 0 || !formData.location) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const { languages, location } = formData;

    // Find or create User document for the user
    let user = await TreeholeUser.findOne({ userId: decoded.userId });

    if (!user) {
      return NextResponse.json(
        {
          message: "Couldn't find",
        },
        { status: 404 }
      );
    }

    // Update treehole data
    user.languages = languages;
    user.location = location;
    user.onboarded = true;

    // Save treehole document
    await user.save();

    return NextResponse.json(
      { message: "User updated successfully", data: user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST function:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
