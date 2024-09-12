import mongoose, { Schema } from "mongoose";

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

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);

export default Notification;
