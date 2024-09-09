import mongoose, { Schema } from "mongoose";

const postofficeSchema = new Schema({

});

const Postoffice =
  mongoose.models.Postoffice || mongoose.model("Postoffice", postofficeSchema);
export default Postoffice;
