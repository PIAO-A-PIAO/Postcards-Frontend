import mongoose, { Schema } from "mongoose";

const paperSchema = new Schema(
  {
    paperStyleId: String,
    name: String,
    description: String,
    image: String,
    price: String,
  },
  { timestamps: true }
);

const Paper = mongoose.model("Paper", paperSchema);
