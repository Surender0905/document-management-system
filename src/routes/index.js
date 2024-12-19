const express = require("express");
const router = express.Router();

router.use("/folders", require("./folderRouter"));

module.exports = router;
