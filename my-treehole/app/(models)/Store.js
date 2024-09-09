import { Schema } from "mongoose";

const storeSchema = new Schema({
    items: [String]
},{ timestamps: true})