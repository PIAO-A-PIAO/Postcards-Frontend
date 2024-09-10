import mongoose, { Schema } from "mongoose";

const stampSchema = new Schema(
  {
    stampId: String,
    name: String,
    description: String,
    image: String,
    price: Number,
  },
  { timestamps: true }
);

const Stamp = mongoose.model("Stamp", stampSchema);
