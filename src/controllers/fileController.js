const fileUpload = async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({ message: "No file in request" });
        }

        if (Array.isArray(req.files) && req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        const file = req.files[0];

        const result = await cloudinaryUpload(file);
        ///logic to set the url into the database
        console.log("result", result);

        res.status(200).json({ result, message: "Uploaded successfully" });
    } catch (error) {
        res.status(500).json({ error_controller: error.message });
    }
};

module.exports = {
    fileUpload,
};
