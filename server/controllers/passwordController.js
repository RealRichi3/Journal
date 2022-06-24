const { transporter, mailOptions } = require("../services/emailService.js");
const { User, Password, TempPassword } = require("../models/userModel");

const randomToken = require("random-token");

const hostAddress = "http://localhost:5000";

// abnnrzypwzqulhuj

// Checks if Password and UserEmail match in DB
const confirmLogin = (req, res, next) => {
    console.log(req.body);
    User.findOne({
        email: req.body.email,
        user_type: "regular"
    })
        .lean()
        .then((response) => {
            if (response !== null) {
                // userDetails has a match in  userCollection
                Password.findOne({
                    _id: response._id,
                    password: req.body.password
                }).then((response) => {
                    if (response !== null) {
                        // user Password has a match in passwordCollection
                        res.status(200).send({
                            message: "Login successful",
                            status: res.statusCode
                        });
                    } else {
                        // user Password has no match in passwordCollection
                        res.status(401).send();
                    }
                });
            } else {
                // userDetails has no match in userCollection
                res.status(401).send();
            }
        })
        .catch((error) => {
            res.status(403).send({
                message: "Ann error occured!",
                status: res.statusCode
            });
        });
};

// Adds password to password collection
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

// Updates or creates temporary password in TempPassword collection
const updateOrCreateTempPassword = (userId, token, update) => {
    if (update) {
        TempPassword.findByIdAndUpdate(userId.toString(), {
            token: token
        }).then((response) => {
            console.log(response);
        });
    } else {
        let tempPassword = new TempPassword({
            _id: userId,
            token: token
        });
        tempPassword.save().then((response) => {
            console.log(response);
        });
    }
};

// Sends email with temporary token and password-reset link to user's email address
const mailTemporaryDetails = (userEmail, token) => {
    let message =
        "You have requested a password reset.\n\n" +
        `
        You requested a password reset for your JounalX account\
        You have been assigned a temporary password 
        Use this temporary token together with your email address to 
        reset your login details

        Email: ${userEmail}
        Temporary token: ${token},

        Please click on the link below to continue
        ${hostAddress}/reset-password`;

    let userMailOption = mailOptions(
        userEmail,
        "JournalX Password Reset",
        message
    );

    // Send token and resetLink to user's Email address
    transporter.sendMail(userMailOption, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

// Checks if user exists in DB
// Creates temporary password and sends email with temporary token...
// ...and password-reset link to user's email address
const resetPassword = (req, res, next) => {
    console.log(req.body);
    let userEmail = req.body.email;

    User.findOne({ user_type: "regular", email: userEmail }) // Find user with email
        .lean()
        .then((response) => {
            console.log(response);
            // If user is found in User collection
            if (response != null) {
                let userId = response._id;
                let token = randomToken(16);
                TempPassword.findOne({ _id: userId }) // Find user with userId in TempPassword collection
                    .lean()
                    .then((response) => {
                        if (response == null) {
                            // User has to temporary password --> Add new userId and token to TempPassword collection
                            updateOrCreateTempPassword(userId, token, false);
                        } else {
                            // User has a temporary password --> Update user temporary token in TempPassword collection
                            updateOrCreateTempPassword(userId, token, true);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                mailTemporaryDetails(userEmail, token);
            } else {
                res.status(401).send();
            }
        });
};

module.exports = {
    confirmLogin,
    updatePassword,
    resetPassword
};
