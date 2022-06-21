// const {MongoClient} = require('mongodb')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        user_type: {
            type: String
        }
    },
    { timestamps: true }
);

const passwordSchema = new Schema({
    _id: {
        type: String
    },
    password: {
        type: String
    }
});

const User = mongoose.model("User", userSchema);
const Password = mongoose.model("Password", passwordSchema);

module.exports = { User, Password };
