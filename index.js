const express = require("express");
const cors = require("cors");

// const { fileURLToPath } = require("url");
const path = require("path");
const fs = require("fs");
const router = require("./src/routes");
const { sequelize, Sequelize } = require("./models");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const filename = fileURLToPath(import.meta.url); for es6

// const dirname = path.dirname(__filename);

// console.log(__dirname, "\n", __filename);

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.use(express.static(uploadDir));

app.get("/", (req, res) => {
    res.send("Welcome to File/image upload");
});

///routes -------------------------------
app.use("/", router);

///connect to database with sequelize

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
        sequelize.sync({ force: false }).then(() => {
            console.log("Database Synced");
        });
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
