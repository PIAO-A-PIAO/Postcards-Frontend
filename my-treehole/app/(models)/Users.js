import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userId: String,
    userName: String,
    region: String,
    virtualAddress: String,
    zipCode: string,
    stamps: [String],
    paperStyles: [String],
    contacts: [String],
    badges: [String],
    languages: [String],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
