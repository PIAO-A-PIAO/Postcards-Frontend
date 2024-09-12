import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
  {
    contactId: String,
    userId: String,
    contactUserId: String,
    receivedLetters: [String],
    sentLetters: [String],
  },
  {
    timestamps: true,
  }
);

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
