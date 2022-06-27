const {
    confirmLogin,
    updatePassword,
    resetPassword
} = require("../controllers/passwordController");

const User = require("../models/userModel").User;
const hostAddress = "http://localhost:5000";

// Show list of users
const usersIndex = (req, res, next) => {
    User.find()
        .lean() // To get the data in the form of a plain object
        .then((response) => {
            console.log(response);
            res.status(200).send({
                ...response,
                status: res.statusCode
            });
        })
        .catch((error) => {
            res.status(400).send({
                message: "An error occured",
                status: res.statusCodes
            });
        });
};

// Find user with user datagit
const findUserMatch = (req, res, next) => {
    console.log(req.body);
    User.findOne({
        name: req.body.name,
        email: req.body.email,
        user_type: req.body.user_type
    })
        .lean() // To get the data in the form of a plain object
        .then((response) => {
            // If user match is found
            console.log(response);
            res.status(200).send({
                ...response,
                status: res.statusCode
            });
        })
        .catch((error) => {
            // If error occured
            console.log(error);
            res.status(404).send({
                message: "An error Occured!",
                status: res.statusCode
            });
        });
};

// Add new user
const addUser = (req, res, next) => {
    let user;

    user = new User({
        name: req.body.name,
        email: req.body.email,
        user_type: req.body.user_type || "regular"
    });

    user.save()
        .then((response) => {
            updatePassword(user._id, req.body.password);
            res.status(200).send({
                message: "Successfully added user details to database",
                status: res.statusCode
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send({
                message: "An error occured!"
            });
        });
};

const resetUserPassword = (req, res, next) => {
    resetPassword(req, res, next);
};

// Update user password
const updateUserPassword = (req, res, next) => {
    console.log("Updating user password");
    console.log(req.body);
    User.findOne({ email: req.body.email }).lean()
        .lean() // To get the data in the form of a plain object
        .then((response) => {
            console.log("found response");
            console.log(response);
            if (response != null) {
                updatePassword(response._id, req.body.password);
                res.status(200).send({
                    message: "Successfully updated user password",
                    status: res.statusCode
                });
            } else {
                res.status(404).send({
                    message: "User not found",
                    status: res.statusCode
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send({
                message: "An error occured!"
            });
        });
};

// Update user details
const updateUserDetails = (req, res, next) => {
    let userID = req.body.userID;
    let updatedData = {
        name: req.body.name,
        email: req.body.email
    };

    User.findByIdAndUpdate(userID, { $set: updatedData })
        .then(() => {
            res.status(200).send({
                message: `User details successfully updated`,
                status: res.statusCode
            });
        })
        .catch((error) => {
            res.status(401).send({
                message: "An error Occured!",
                status: res.statusCode
            });
        });
};

// Delete user
const deleteUser = (req, res, next) => {
    let userID = req.body.userID;
    User.findOneAndRemove(userID)
        .then(() => {
            res.json({
                message: "User deleted successfully"
            });
        })
        .catch((error) => {
            res.json({
                message: "An error occured!"
            });
        });
};

module.exports = {
    usersIndex,
    // findUser,
    findUserMatch,
    updateUserDetails,
    deleteUser,
    addUser,
    resetUserPassword,
    updateUserPassword
};
