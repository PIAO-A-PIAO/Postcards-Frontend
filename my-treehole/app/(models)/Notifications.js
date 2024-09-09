import { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    notificationId: String,
    type: String,
    title: String,
    message: String,
    validUntil: String,
    actionLink: String,
  },
  { timestamps: true }
);
