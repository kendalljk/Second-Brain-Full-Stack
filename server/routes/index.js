const express = require("express");
const router = express.Router();

//other route files
const notesRouter = require("./notes.router");
const uploadRouter = require("./upload.router");
const tbrRouter = require("./tbr.router");

//Routes
router.use("/notes", notesRouter);
router.use("/uploads", uploadRouter);
router.use("/TBR", tbrRouter);

module.exports = router;
