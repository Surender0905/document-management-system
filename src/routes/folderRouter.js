const express = require("express");
const router = express.Router();
const fileRouter = require("./fileRouter");
const {
    createFolder,
    updateFolder,
    deleteFolder,
    getFolder,
    getAllFolders,
} = require("../controllers/folderController");

//http://localhost:3000/folder/create
router.post("/create", createFolder);

//http://localhost:3000/folders/:folderId -update
router.put("/:folderId", updateFolder);

//http://localhost:3000/folders/:folderId -delete

router.delete("/:folderId", deleteFolder);

//http://localhost:3000/folders/:folderId -get
router.get("/:folderId", getFolder);

//http://localhost:3000/folders -get all
router.get("/", getAllFolders);

//connect to fileRouter
router.use("/:folderId/files", fileRouter);

module.exports = router;
