import mongoose, { Schema } from "mongoose";

const storeSchema = new Schema(
  {
    items: [String],
  },
  { timestamps: true }
);

const Store = mongoose.models.Store || mongoose.model("Store", storeSchema);

export default Store;
