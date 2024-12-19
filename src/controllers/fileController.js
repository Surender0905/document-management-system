const fileController = (req, res) => {
    res.status(200).json({ message: "File uploaded successfully" });
};

module.exports = {
    fileController,
};
