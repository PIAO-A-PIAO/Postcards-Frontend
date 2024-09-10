import mongoose, { Schema } from "mongoose";

const userNotificationSchema = new Schema(
  {
    userNotificationId: String,
    userId: String,
    notificationId: String,
    readStatus: Boolean,
    readAt: Date,
  },
  { timestamps: true }
);

const UserNotification = mongoose.model(
  "UserNotification",
  userNotificationSchema
);
