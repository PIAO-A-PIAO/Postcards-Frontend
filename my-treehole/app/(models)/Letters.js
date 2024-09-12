import mongoose, { Schema } from "mongoose";

const letterSchema = new Schema(
  {
    letterId: String,
    senderId: String,
    recipientId: String,
    contents: [String],
    attachments: [String],
    stampUsed: String,
    paperStyle: String,
    fromAddress: String,
    fromRegion: String,
    toAddress: String,
    toRegion: String,
    language: String,
    isSent: Boolean,
    isRead: Boolean
  },
  { timestamps: true }
);

const Letter = mongoose.models.Letter || mongoose.model("Letter", letterSchema);

export default Letter;