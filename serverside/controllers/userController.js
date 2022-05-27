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

const findUser = (req, res, next) => {
    let userId = req.body.userId
    User.findById(userId)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

const addUser = (req, res, next) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    
    user.save()
    .then(response => {
        res.json({
            message: 'An error Occured!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

const updateUserDetails = (req, res, next) => {
    
}