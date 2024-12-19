const { v2: cloudinary } = require("cloudinary");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const generateSignature = (paramsToSign) => {
    console.log(paramsToSign, "paramsToSign");
    const { api_secret } = cloudinary.config();
    const sortedParams = Object.keys(paramsToSign).sort();
    console.log(sortedParams, "sortedParams");
    const paramsString = sortedParams
        .map((key) => `${key}=${paramsToSign[key]}`)
        .join("&");

    console.log(paramsString, "paramsString");

    const signature = crypto
        .createHash("sha1")
        .update(paramsString + api_secret)
        .digest("hex");

    return signature;
};

const uploadToCloudinary = async (filepath) => {
    try {
        //explaination of the timestamp with example- 1631530000
        const timeStamp = Math.round(new Date().getTime() / 1000);

        // Parameters to sign include the timestamp
        const paramsToSign = {
            timestamp: timeStamp, // Include timestamp here
        };

        const signature = generateSignature(paramsToSign);

        console.log(signature, "signature");

        // Upload the file to cloudinary
        const result = await cloudinary.uploader.upload(filepath, {
            ...paramsToSign, // Include timestamp in the upload request
            signature, // Include the signature generated above
            api_key:
                process.env.CLOUDINARY_API_KEY || cloudinary.config().api_key,
        });

        console.log(result, "upload result");

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
