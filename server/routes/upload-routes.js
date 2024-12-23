// route for uploading images to the db with multer

const express = require("express");
const upload = require("../utils/uploads");

const router = express.Router();

const handleFileUpload = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const filePath = req.file.path;
    res.status(200).json({
      message: "File uploaded successfully",
      filePath,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error uploading file",
      error: error.message,
    });
  }
};

router.post("/upload", upload.single("image"), handleFileUpload);
(module.exports = router), handleFileUpload;
