// const {MongoClient} = require('mongodb')

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoute = require("./routes/userRoutes");

// Initialize database
const uri = "mongodb://localhost:27017/journalX";
mongoose.connect(uri);
const db = mongoose.connection;

db.on("error", (err) => {
    console.log(err);
});

db.once("open", () => {
    console.log(`Successfully connected to ${db.name} database....`);
});

// Express
const app = express();
const jsonParser = express.json();
const PORT = process.env.PORT || 5000;

app.use(jsonParser);
app.use(morgan("dev"));

// Set access control allow origin
app.use(
    cors({
        origin: ["http://localhost:8080", "https://realrichi3.github.io"]
    })
);

app.use((req, res, next) => {
    const origin = req.header("Origin");
    console.log(origin);
    next();
});

app.use("/user", userRoute);

app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}....`);
});
