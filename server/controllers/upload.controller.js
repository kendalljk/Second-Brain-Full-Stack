const multer = require("multer");

// Define the storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images/"); // Specify the destination directory for storing the uploaded files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = file.originalname.split(".").pop();
        cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext); // Generate a unique filename for each uploaded file
    },
});

// Create an instance of multer with the configured storage
const upload = multer({ storage: storage });

// Modify the addUpload function to use multer middleware
exports.addUpload = async (req, res, next) => {
    try {
        if (!req.file) {
            res.send({
                status: false,
                message: "No files uploaded",
            });
        } else {
                const fileUrl = `${req.protocol}://${req.get(
                    "host"
                )}/public/images/${req.file.filename}`;


            res.json({
                status: true,
                message: "File is uploaded",
                data: {
                    name: req.file.filename,
                    mimetype: req.file.mimetype,
                    size: req.file.size,
                    url: fileUrl,
                },
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.upload = upload;
