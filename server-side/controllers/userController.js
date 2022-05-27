const User = require('../models/userModel')


// Show list of users
const usersIndex = (req, res, next) => {
    User.find()
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

// Find user with ID
const findUser = (req, res, next) => {
    let userID = req.body.userId
    User.findById(userID)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

// Add new user
const addUser = (req, res, next) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    
    user.save()
    .then(response => {
        res.json({
            message: 'Successfully added user details to database'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

// const updatePassword = (req, res, next) => {
//     let userID = req.body.userID
//     let newPassword = req.body.newPassword
//     let updatePassword = {
//         password: req.body.password
//     }
//     User.findByIdAndUpdate(userID, {$set: updatePassword})
//     .then(() => {
//         res.json({
//             message: `Password successfully updated for ${user}`
//         })
//     })
// }

// Update user details
const updateUserDetails = (req, res, next) => {
    let userID = req.body.userID
    // let changePass = req.body.changePass
    // let newPassword = req.body.newPassword
    let updatedData = {
        // name: req.body.name,
        email: req.body.email
    }
    // if (changePass == true){
    //     updatedData.password = newPassword
    // }
    User.findByIdAndUpdate(userID, {$set: updatedData})
    .then(() => {
        res.json({
            message: `User details successfully updated`,
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })  
}

// Delete user
const deleteUser = (req, res, next) => {
    let userID = req.body.userID
    User.findOneAndRemove(userID)
    .then(() => {
        res.json({
            message: 'User deleted successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!' 
        })
    })
}

module.exports = {
    usersIndex, findUser, updateUserDetails, deleteUser, addUser
}