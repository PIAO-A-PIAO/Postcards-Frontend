import mongoose, { Schema } from "mongoose";

const treeholeSchema = new Schema({
  location: String,
  userId: String,
  stamps: [String],
  languages: [String],
  onboard: Boolean,
});

const Treehole =
  mongoose.models.Treehole || mongoose.model("Treehole", treeholeSchema);
export default Treehole;
