const validateFolder = require("../middlewares/validators/validateFolder");
const { sequelize, Folder, File } = require("../../models");

const createFolder = async (req, res) => {
    const { name, type, maxFileLimit } = req.body;

    // Validate input data
    const validationError = validateFolder(name, type, maxFileLimit);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }
    //create transaction when we get error we rollback

    // Create a new folder
    const transaction = await sequelize.transaction();

    try {
        // Check if the folder name already exists

        const existingFolder = await Folder.findOne(
            { where: { name } },
            { transaction },
        );

        if (existingFolder) {
            return res
                .status(400)
                .json({ error: "Folder name already exists." });
        }

        // Create a new folder
        const newFolder = await Folder.create(
            { name, type, maxFileLimit },
            { transaction },
        );

        // Commit the transaction
        await transaction.commit();

        return res.status(201).json({
            message: "Folder created successfully",
            newFolder,
        });
    } catch (error) {
        await transaction.rollback();
        console.error("Error creating folder-controller:", error);
        return res
            .status(500)
            .json({ error: "An error occurred while creating the folder." });
    }
};

//update folder

const updateFolder = async (req, res) => {
    const { folderId } = req.params;
    const { name, type, maxFileLimit } = req.body;

    // Validate input data
    const validationError = validateFolder(name, type, maxFileLimit);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    try {
        // Find the folder by ID
        const folder = await Folder.findByPk(folderId);

        if (!folder) {
            // If folder doesn't exist, return an error
            throw new Error("Invalid folderId.");
        }

        // Update the folder
        folder.name = name;
        folder.type = type;
        folder.maxFileLimit = maxFileLimit;

        await folder.save();

        return res
            .status(200)
            .json({ message: "Folder updated successfully", folder });
    } catch (error) {
        console.error("Error updating folder-controller:", error);
        return res
            .status(500)
            .json({ error: "An error occurred while updating the folder." });
    }
};

//delete folder
const deleteFolder = async (req, res) => {
    const { folderId } = req.params;
    try {
        const folder = await Folder.findByPk(folderId);
        if (!folder) {
            return res.status(404).json({ error: "Folder not found." });
        }
        await folder.destroy();
        return res.status(200).json({ message: "Folder deleted successfully" });
    } catch (error) {
        console.error("Error deleting folder-controller:", error);
        return res
            .status(500)
            .json({ error: "An error occurred while deleting the folder." });
    }
};

//get folder
const getFolder = async (req, res) => {
    const { folderId } = req.params;
    try {
        // Find the folder by ID with all files in it
        const folder = await Folder.findByPk(folderId, {
            include: File,
        });
        if (!folder) {
            return res.status(404).json({ error: "Folder not found." });
        }
        return res
            .status(200)
            .json({ folder, message: "Folder retrieved successfully" });
    } catch (error) {
        console.error("Error getting folder-controller:", error);
        return res
            .status(500)
            .json({ error: "An error occurred while getting the folder." });
    }
};

//get all folders
const getAllFolders = async (req, res) => {
    try {
        //get all folder with all files in it
        const folders = await Folder.findAll({
            include: File,
        });

        //validate if folders are empty
        if (folders.length === 0) {
            return res.status(404).json({ error: "No folders found." });
        }
        return res
            .status(200)
            .json({ folders, message: "Folders retrieved successfully" });
    } catch (error) {
        console.error("Error getting folders-controller:", error);
        return res
            .status(500)
            .json({ error: "An error occurred while getting the folders." });
    }
};

module.exports = {
    createFolder,
    updateFolder,
    deleteFolder,
    getFolder,
    getAllFolders,
};
