import Treehole from "@/app/(models)/Treehole";
import connectDB from "../../../lib/connectDB";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB(); // Connect to MongoDB

    const token = req.cookies.get("token");
    const decoded = jwt.verify(token.value, process.env.TOKEN_SECRET);
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const result = await Treehole.findOne({ userId: decoded.userId });

    if (!result) {
      await Treehole.create({
        userId: decoded.userId,
        stamps: [],
        languages: [],
        location: "",
        onboard: false,
      });
      return NextResponse.json(
        { message: "New treehole created", onboard: false },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "Treehole found", onboard: result.onboard },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
