const express = require("express");
const router = express.Router();

const { addNote } = require("../controllers/notes.controller");

//Routes
router.post("/", addNote);

module.exports = router;
