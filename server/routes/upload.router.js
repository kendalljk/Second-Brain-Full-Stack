const express = require("express");
const router = express.Router();
const { addUpload, upload } = require("../controllers/upload.controller");

//Routes
router.post("/", upload.single("bookCover"), addUpload);

module.exports = router;


