import mongoose, { Schema } from "mongoose";

const badgeSchema = new Schema(
  {
    badgeId: String,
    name: String,
    description: String,
    image: String,
    criteria: String,
  },
  {
    timestamps: true,
  }
);

const Badge = mongoose.model("Badge", badgeSchema);
