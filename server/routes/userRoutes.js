const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const confirmLogin = require("../controllers/passwordController").confirmLogin;
const confirmResetToken =
    require("../controllers/passwordController").confirmResetToken;

router.get("/showall", userController.usersIndex);
router.post("/matchuser", userController.findUserMatch);
router.post("/adduser", userController.addUser);
router.post("/update", userController.updateUserDetails);
router.post("/reset-password", userController.resetUserPassword);
router.post("/update-password", userController.updateUserPassword);
router.post("/delete", userController.deleteUser);

router.post("/login", confirmLogin);
router.post("/reset-password/confirm-token", confirmResetToken);

module.exports = router;
