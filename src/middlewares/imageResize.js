const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const resizeImage = async (req, res, next) => {
    try {
        const originalFilePath = req.files[0].path;
        const parsedPath = path.parse(originalFilePath);

        if (parsedPath.ext !== ".jpg" && parsedPath.ext !== ".jpeg") {
            return next();
        }
        const outputFilePath = path.join(
            parsedPath.dir,
            `${parsedPath.name}-resized.${parsedPath.ext}`,
        );
        await sharp(originalFilePath)
            .resize({
                width: 1500,
            })
            .jpeg({
                quality: 100,
                mozjpeg: true,
                chromaSubsampling: "4:4:4",
                trellisQuantisation: true,
                compressionLevel: 1,
                overshootDeringing: true,
                optimiseScans: true,
                progressive: true,
            })
            .toFile(outputFilePath);
        req.files[0].path = outputFilePath;
        req.originalFilePath = originalFilePath;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error_resize: error.message });
    }
};

module.exports = resizeImage;
