import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import Treehole from "@/app/(models)/Treehole"; // Update with your actual import path for Treehole model
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

    // Find or create Treehole document for the user
    let treehole = await Treehole.findOne({ userId: decoded.userId });

    if (!treehole) {
      return NextResponse.json(
        {
          message: "Couldn't find",
        },
        { status: 404 }
      );
    }

    // Update treehole data
    treehole.languages = languages;
    treehole.location = location;
    treehole.stamps = Array(5).fill(location);
    treehole.onboard = true;

    // Save treehole document
    await treehole.save();

    return NextResponse.json(
      { message: "Treehole updated successfully", data: treehole },
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
