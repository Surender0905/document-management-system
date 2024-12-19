const { v2: cloudinary } = require("cloudinary");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filepath) => {
    try {
        const result = await cloudinary.uploader.upload(filepath, {
            resource_type: "auto",
        });

        return result;
    } catch (error) {
        console.log("Error uploading to cloudinary- config ", error);
        throw error;
    }
};

const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.log("Error deleting from cloudinary- config ", error);
        throw error;
    }
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };
