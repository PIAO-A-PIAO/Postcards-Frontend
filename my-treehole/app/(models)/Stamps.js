import { Schema } from "mongoose";

const stampSchema = new Schema({
    stampId: String,
    name: String,
    description: String,
    image: String,
    price: Number
},{ timestamps: true});