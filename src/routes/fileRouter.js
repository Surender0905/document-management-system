const multer = require("multer");
const express = require("express");
const { upload } = require("../middlewares/fileUpload");
const { UNEXPECTED_FILE_TYPE } = require("../constants/file");
const { fileController } = require("../controllers/fileController");
const resizeImage = require("../middlewares/imageResize");
const isFilePresent = require("../middlewares/validators/isFilePresent");

const router = express.Router();

// http://localhost:3000/folders/:folderId/files --upload a file
router.post("/", isFilePresent, resizeImage, function (req, res, next) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            if (err.code === UNEXPECTED_FILE_TYPE.code) {
                return res
                    .status(400)
                    .json({ error_routes: { description: err.field } });
            }
        } else if (err) {
            return res.status(500).json({
                error_routes: {
                    description: err.message,
                },
            });
        }

        next();
    });
    fileController;
});

// GET- http://localhost:3000/folders/:folderId/files/:fileId
router.get("/:fileId", (req, res) => {
    res.send("File retrieved successfully");
});

/// PUT- http://localhost:3000/folders/:folderId/files/:fileId

router.put("/:fileId", (req, res) => {
    res.send("File updated successfully");
});

//  DELETE /folders/:folderId/files/:fileId
router.delete("/:fileId", (req, res) => {
    res.send("File deleted successfully");
});

// GET- http://localhost:3000/folders/:folderId/files
router.get("/", (req, res) => {
    res.send("Files retrieved successfully");
});

// GET- http://localhost:3000/folders/:folderId/filesBySort?sort=size --size
router.get("/filesBySort", (req, res) => {
    res.send("Files retrieved successfully");
});

// GET- http://localhost:3000/folders/:folderId/filesBySort?sort=uploadedAt --uploadedAt
router.get("/filesBySort", (req, res) => {
    res.send("Files retrieved successfully");
});

// GET- http://localhost:3000/files?type=pdf --type
router.get("/", (req, res) => {
    res.send("Files retrieved successfully");
});

// GET- http://localhost:3000/folders/:folderId/files/metadata
router.get("/metadata", (req, res) => {
    res.send("Files metadata retrieved successfully");
});

module.exports = router;
