import { Schema } from "mongoose";

const badgeSchema = new Schema({
    badgeId: String,
    name: String,
    description: String,
    image: String,
    criteria: String
},{
    timestamps: true
})