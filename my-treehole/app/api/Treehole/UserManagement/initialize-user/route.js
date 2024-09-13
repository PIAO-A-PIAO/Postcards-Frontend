import TreeholeUser from "../../../../(models)/TreeholeUsers";
import connectDB from "../../../../lib/connectDB";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import Letter from "../../../../(models)/Letters";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    // connect to DB
    await connectDB();

    // check identity
    const token = req.cookies.get("token");
    const decoded = jwt.verify(token.value, process.env.TOKEN_SECRET);
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // find user
    const result = await TreeholeUser.findOne({ userId: decoded.userId });

    // user exists but treehole user does not exist
    if (!result) {
      await TreeholeUser.create({
        userId: decoded.userId,
        onboarded: false,
      });
      return NextResponse.json(
        { message: "New User created", onboarded: false },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "User found", onboarded: result.onboarded },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
