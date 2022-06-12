const User = require("../models/userModel");

// Show list of users
const usersIndex = (req, res, next) => {
    User.find()
        .then((response) => {
            res.json(response);
        })
        .catch((error) => {
            res.json({
                message: "An error occured!"
            });
        });
};

// Find user with user data
const findUserMatch = (req, res, next) => {
    console.log(req.body);
    User.findOne({
        name: req.body.name,
        email: req.body.email,
        user_type: req.body.user_type
    })
        .then((response) => {
            res.json(response);
        })
        .catch((error) => {
            res.json({
                message: "An error occured!"
            });
        });
};

// Find user with ID
const findUser = (req, res, next) => {
    let userID = req.body.userId;
    User.findById(userID)
        .then((response) => {
            res.json(response);
        })
        .catch((error) => {
            res.json({
                message: "An error occured!"
            });
        });
};

// Add new user
const addUser = (req, res, next) => {
    let user;

    if (req.body.user_type == "google") {
        user = new User({
            name: req.body.name,
            email: req.body.email,
            user_type: req.body.user_type
        });
    } else {
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
    }

    user.save()
        .then((response) => {
            res.json({
                message: "Successfully added user details to database"
            });
        })
        .catch((error) => {
            res.json({
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
            res.json({
                message: `User details successfully updated`
            });
        })
        .catch((error) => {
            res.json({
                message: "An error Occured!"
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
    findUser,
    findUserMatch,
    updateUserDetails,
    deleteUser,
    addUser
};
