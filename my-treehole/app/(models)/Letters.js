import { Schema } from "mongoose";

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
    deliveryStatus: String,
  },
  {  timestamps: true}
);
