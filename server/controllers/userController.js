const User = require("../models/userModel").User;
const Password = require("../models/userModel").Password;
const TempPassword = require("../models/userModel").TempPassword;
const nodemailer = require("nodemailer");
const randomToken = require("random-token");
const hostAddress = "http://localhost:5000";

// abnnrzypwzqulhuj

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

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "journalprojectjs@gmail.com",
        pass: "abnnrzypwzqulhuj"
    }
});

const mailOptions = (message) => {
    return {
        from: "journalprojectjs@gmail.com",
        to: "molunorichie@gmail.com",
        subject: "Password Reset",
        text: message
    };
};

// Checks if email exists in DB
// Sends unique pasword-reset link to user's email address
const resetPassword = (req, res, next) => {
    console.log(req.body);
    let userEmail = req.body.email;
    User.findOne({ user_type: "regular", email: userEmail }) // Find user with email
        .lean()
        .then((response) => {
            console.log(response);
            if (response != null) {
                // If user is found in User collection
                let userId = response._id;
                let token = randomToken(16);
                TempPassword.findOne({ _id: userId }) // Find user with userId in TempPassword collection
                    .lean()
                    .then((response) => {
                        if (response == null) {
                            // User has not been assigned a temporary reset password
                            console.log("No temporary token for this User");
                            let tempPassword = new TempPassword({
                                // Create new temporary password
                                _id: userId,
                                token: token
                            });
                            tempPassword.save().catch((error) => {
                                console.log(error);
                            });
                        } else {
                            // User has been assigned a temporary reset password
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                let message =
                    "You have requested a password reset.\n\n" +
                    `
                You requested a password reset for your JounalX account\
                You have been assigned a temporary password 
                Use this temporary token together with your email address to 
                reset your login details
                
                Please click on the link below to continue
                ${hostAddress}/reset-password`;
                transporter.sendMail(mailOptions(message), (error, info) => {
                    // Send token and resetLink to user's Email address
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Email sent: " + info.response);
                    }
                });
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
