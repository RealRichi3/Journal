const User = require("../models/userModel").User;
const Password = require("../models/userModel").Password;

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
                status: res.statusCode
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

const confirmLogin = (req, res, next) => {
    console.log(req.body);
    Password.findOne({
        email: req.body.email,
        password: req.body.password,
        user_type: "regular"
    })
        .lean() // To get the data in the form of a plain object
        .then((response) => {
            // If user is not found
            if (response == null) {
                res.status(401).send({
                    message: "Invalid credentials",
                    status: 401
                });
            } else {
                // If user is found
                res.status(200).send({
                    message: "Login successful",
                    status: res.statusCode
                });
            }
        })
        .catch((error) => {
            // If error occured
            console.log(error);
            res.status(400).send({
                message: "Ann error occured!",
                status: res.statusCode
            });
        });
};

// // Find user with ID
// const findUser = (req, res, next) => {
//     let userID = req.body.userId;
//     User.findById(userID)
//         .then((response) => {
//             res.json(response);
//         })
//         .catch((error) => {
//             res.json({
//                 message: "An error occured!"
//             });
//         });
// };

// Add password to password collection
const updatePassword = (userId, userPassword) => {
    Password.findById(userId.toString()).then((response) => {
        if (response == null) {
            console.log(
                "Adding userId and userPassword to Password collection"
            );
            let password = new Password({
                _id: userId,
                password: userPassword
            });
            password.save().then((response) => {
                console.log(response);
            });
        } else {
            console.log(
                "Password and Id already exists in Password collection"
            );
        }
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
            res.json({
                message: "Successfully added user details to database"
            });
        })
        .catch((error) => {
            console.log(error);
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

// Checks if email exists in DB
// Sends unique pasword-reset link to user's email address
const resetPassword = (req, res, next) => {
    let userEmail = req.body.email;
    User.findOnde({ user_type: "regular", email: userEmail })
        .lean()
        .then((response) => {
            if (response != null) {
                // Generate unique link
                // Send link to useremail address
            }
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
    confirmLogin,
    resetPassword
};
