const express = require("express");
const router = express.Router();
const fileRouter = require("./fileRouter");

//http://localhost:3000/folder/create
router.post("/create", (req, res) => {
    res.send("Folder created successfully");
});

//http://localhost:3000/folders/:folderId -update
router.put("/:folderId", (req, res) => {
    res.send("Folder updated successfully");
});

//http://localhost:3000/folders/:folderId -delete

router.delete("/:folderId", (req, res) => {
    res.send("Folder deleted successfully");
});

//http://localhost:3000/folders/:folderId -get
router.get("/:folderId", (req, res) => {
    res.send("Folder retrieved successfully");
});

//http://localhost:3000/folders -get
router.get("/", (req, res) => {
    res.send("Folders retrieved successfully"); //get all folders
});

//connect to fileRouter
router.use("/:folderId/files", fileRouter);

module.exports = router;
