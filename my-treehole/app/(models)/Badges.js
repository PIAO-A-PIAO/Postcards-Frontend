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

const Badge = mongoose.models.Badege || mongoose.model("Badge", badgeSchema);
export default Badge;
