const express = require("express");
const { addTBR } = require("../controllers/tbr.controller");
const router = express.Router();


//Routes
router.post("/", addTBR);

module.exports = router;
