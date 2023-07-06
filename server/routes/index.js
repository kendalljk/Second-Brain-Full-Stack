const express = require("express");
const router = express.Router();

//other route files
const notesRouter = require("./notes.router");
const uploadRouter = require("./upload.router");

//Routes
router.use("/notes", notesRouter);
router.use("/uploads", uploadRouter);

module.exports = router;
