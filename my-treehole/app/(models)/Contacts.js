import { Schema } from "mongoose";

const contactSchema = new Schema({
    contactId: String,
    userId: String,
    contactUserId: String,
    receivedLetters: [String],
    sentLetters: [String]
},{
    timestamps: true
})