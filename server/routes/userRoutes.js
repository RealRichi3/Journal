const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const confirmLogin = require("../controllers/passwordController").confirmLogin;

router.get("/showall", userController.usersIndex);
// router.post("/finduser", userController.findUser);
router.post("/matchuser", userController.findUserMatch);
router.post("/adduser", userController.addUser);
router.post("/login", confirmLogin);
router.post("/update", userController.updateUserDetails);
router.post("/reset-password", userController.resetUserPassword);
router.post("/delete", userController.deleteUser);

module.exports = router;
