import Treehole from "@/app/(models)/Treehole";
import Postoffice from "@app/(models)/Postoffice";
import connectDB from "@app/lib/connectDB";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB(); 
    const token = req.cookies.get("token");
    const { sender_id, content, attachments, languages } = req;

    if (req.recipient_id) {
    } else {
        
    }
  } catch (error) {}
} 
