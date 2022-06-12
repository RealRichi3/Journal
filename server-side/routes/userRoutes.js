const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/showall", userController.usersIndex);
router.post("/finduser", userController.findUser);
router.post("/matchuser", userController.findUserMatch);
router.post("/adduser", userController.addUser);
router.post("/update", userController.updateUserDetails);
router.post("/delete", userController.deleteUser);

module.exports = router;
