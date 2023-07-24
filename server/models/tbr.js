const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const tbrSchema = new mongoose.Schema(
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
    },
    { timestamps: true }
);

const TBR = mongoose.model("TBR", tbrSchema);
module.exports = TBR;
