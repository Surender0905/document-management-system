const multer = require("multer");
const { fileTypeValidator } = require("../utils/fileTypeValidator");
const { UNEXPECTED_FILE_TYPE } = require("../constants/file");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const isValid = fileTypeValidator(file);
        if (isValid) {
            cb(null, true); // Proceed if file is valid
        } else {
            cb(
                new multer.MulterError(
                    UNEXPECTED_FILE_TYPE.code, // Error code
                    UNEXPECTED_FILE_TYPE.message, // Error message
                ),
            );
        }
    },
}).array("file", 1);

module.exports = {
    upload,
};
