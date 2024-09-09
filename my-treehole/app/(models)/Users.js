import { timeStamp } from "console";
import { Schema } from "mongoose";

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
  },
  { timestamps: true }
);
