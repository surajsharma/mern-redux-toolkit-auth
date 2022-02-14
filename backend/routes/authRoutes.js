const express = require("express");
const router = express.Router();

const {googleLogin} = require("../controller/authController");
const {loginUser} = require("../controller/userController")


router.post("/google-login", googleLogin);
router.post("/login", loginUser);

module.exports = router;
