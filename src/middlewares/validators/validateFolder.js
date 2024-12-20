const validateFolder = (name, type, maxFileLimit) => {
    const types = ["csv", "img", "pdf", "ppt"];

    if (!name || typeof name !== "string" || name.trim().length === 0) {
        return "Folder name is required and must be a non-empty string.";
    }

    if (types.indexOf(type) === -1) {
        return "Invalid folder type. Must be one of: csv, img, pdf, ppt.";
    }

    if (!Number.isInteger(maxFileLimit) || maxFileLimit <= 0) {
        return "maxFileLimit must be a positive integer.";
    }

    return null;
};

module.exports = validateFolder;
