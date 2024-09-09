import mongoose, { Schema } from "mongoose";

const letterSchema = new Schema({
  letter_id: String,
  letter_title: String,
  letter_content: [String],
  sender_id: String,
  recipient_id: String,
  date: Date,
});

const contactSchema = new Schema({
  contact_id: String,
  letters: [letterSchema],
});

const treeholeSchema = new Schema(
  {
    userName: String,
    userId: String,
    location: String,
    stamps: [String],
    languages: [String],
    onboard: Boolean,
    sent: [letterSchema],
    inbox: {
      unread: [letterSchema],
      read: {
        contacts: [contactSchema],
        unknowns: [letterSchema],
      },
    },
  },
  {
    timestamps: true,
  }
);

const Treehole =
  mongoose.models.Treehole || mongoose.model("Treehole", treeholeSchema);
export default Treehole;
