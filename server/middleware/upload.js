const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "./public/images");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize, maxSize },
}).single("file");

let uploadFileMiddleware