const { uploadToCloudinary } = require("../config/cloudinary");
const fs = require("fs");

const cloudinaryUpload = async (file) => {
    try {
        const result = await uploadToCloudinary(file.path);
        fs.unlinkSync(file.path, (err) => {
            if (err) {
                console.log(err);
            }
        });
        return result;
    } catch (error) {
        console.log("error uploading file-service ", error);
        throw error;
    }
};

module.exports = { cloudinaryUpload };
