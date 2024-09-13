import connectDB from "../../../../lib/connectDB";
import { NextResponse } from "next/server";
import Letter from "../../../../(models)/Letters";

export default async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const formData = body.formData;
    const letterId = body.letterId;

    if (letterId) {
      // Find the draft by ID and replace all fields with formData
      const draft = await Letter.findOneAndUpdate({ id: letterId }, formData);
      if (draft) {
        return NextResponse.json(
          { message: "Draft updated successfully" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Draft not found" },
          { status: 404 }
        );
      }
    } else {
      // Create a new draft
      await Letter.create(formData);
      return NextResponse.json(
        { message: "Draft created successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
