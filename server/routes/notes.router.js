const express = require("express");
const multer = require("multer");
const { addNote } = require("../controllers/notes.controller");
const router = express.Router();

const upload = multer();
//Routes
router.post("/", upload.single('bookCover'), addNote);

module.exports = router;
