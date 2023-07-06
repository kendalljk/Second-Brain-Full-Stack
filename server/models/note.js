const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const noteSchema = new mongoose.Schema(
  {
    bookId: {
      type: ObjectId,
      unique: true,
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
      name: String,
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
      required: true
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