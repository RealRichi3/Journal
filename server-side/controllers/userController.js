const User = require("../models/userModel").User;
const Password = require("../models/userModel").Password;

// Show list of users
const usersIndex = (req, res, next) => {
    User.find()
        .then((response) => {
            console.log(response);
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

const confirmLogin = (req, res, next) => {
    console.log(req.body);
    Password.findOne({
        email: req.body.email,
        password: req.body.password,
        user_type: "regular"
    })
        .then((response) => {
            // If user is not found
            if (response == null) {
                res.json({
                    message: "Invalid credentials"
                });
                res.status(401);
            } else {
                // If user is found
                // res.json({
                //     message: "Login successful"
                // });
                res.status(200).json({
                    message: "Login successful",
                    status: res.status
                });
            }
        })
        .catch((error) => {
            // If error occured
            res.json({
                message: "An error occured!"
            });
            res.status(401);
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
        console.log(response);
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
    // findUser,
    findUserMatch,
    updateUserDetails,
    deleteUser,
    addUser,
    confirmLogin
};
