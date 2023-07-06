require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

//import routes
const routes = require("./server/routes");

//Create Express app
const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to correctly parse incoming JSON data and Form Data:

// Connect to MongoDB
mongoose
    .connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((result) => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("MongoDB connection error: ", err.message);
    }); // to get more detailed error information

//Routes
app.use("/", routes);

//Start the sever
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));

// Serve static files from the 'public' and 'images' directory
app.use(express.static(path.join(__dirname, "./public")));
app.use("/uploads", express.static(path.join(__dirname, "./public/images")));

app.get("/file-uploader", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
