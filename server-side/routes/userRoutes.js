const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.usersIndex);
router.get("/finduser", userController.findUser);
router.post("/adduser", userController.addUser);
router.post("/update", userController.updateUserDetails);
router.post("/delete", userController.deleteUser);

module.exports = router;
