import connectDB from "../../../../lib/connectDB";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import Letter from "../../../../(models)/Letters";

export default async function POST(req) {
  try {
    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }
}
