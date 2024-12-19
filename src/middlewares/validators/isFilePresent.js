const isFilePresent = (req, res, next) => {
    if (!req.files) {
        return res.status(400).json({ message: "No file in request" });
    }

    if (Array.isArray(req.files) && req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
    }
    next();
};

module.exports = isFilePresent;
