import mongoose, { Schema } from "mongoose";

const treeholeUserSchema = new Schema(
  {
    userId: String,
    userName: String,
    region: String,
    virtualAddress: String,
    zipCode: String,
    stamps: [String],
    paperStyles: [String],
    contacts: [String],
    badges: [String],
    languages: [String],
    onboarded: Boolean,
  },
  { timestamps: true }
);

const TreeholeUser =
  mongoose.models.TreeholeUser ||
  mongoose.model("TreeholeUser", treeholeUserSchema);
export default TreeholeUser;