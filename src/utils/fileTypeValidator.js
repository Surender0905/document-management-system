const fileTypeValidator = (file) => {
    const allowedTypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
    ];
    return allowedTypes.includes(file.mimetype);
};

const fileTypeValidator2 = (file) => {
    const fileTypes = /jpeg|jpg|png|gif|webp/;
    const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
        return true;
    } else {
        return false;
    }
};

const fileSizeValidator = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    return file.size <= maxSize;
};

module.exports = { fileTypeValidator, fileTypeValidator2, fileSizeValidator };
