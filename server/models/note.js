const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const noteSchema = new mongoose.Schema(
    {
        bookId: {
            type: String,
            unique: true,
            default: uuidv4,
        },
        title: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 30,
        },
        author: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 20,
        },
        cover: {
            type: String,
        },
        genre: {
            type: String,
            enum: [
                "biography",
                "business",
                "contemporary",
                "fantasy",
                "historicalFiction",
                "history",
                "humor",
                "mystery",
                "nonFiction",
                "personalDevelopment",
                "philosophy",
                "scienceFiction",
                "youngAdult",
            ],
            required: true,
        },
        summary: {
            type: String,
            required: true,
            minlength: 20,
            maxlength: 300,
        },
        quotes: [
            {
                type: String,
            },
        ],
        notes: [
            {
                type: String,
            },
        ],
        finished: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
