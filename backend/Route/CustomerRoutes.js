const express = require("express");
const router = express.Router();
const User = require("../Model/CustomerModel");
const UserController = require("../Controlers/CustomerControllers");
const {
    addUsers,
    loginUser,
    logout,
    getUser,
    loginStatus,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword,
    protect,  // Make sure this is imported correctly
  } = require("../Controlers/CustomerControllers"); // Correct import path





router.post("/register", UserController.addUsers);
router.post("/login", UserController.loginUser);
router.get("/logout", UserController.logout);
router.get("/getuser", protect,UserController.getUser);
router.get("/loggedin",UserController.loginStatus);
router.patch("/updateuser",protect,UserController.updateUser);
router.patch("/changepassword",protect,UserController.changePassword);
router.post("/forgotpassword",UserController.forgotPassword);
router.put("/resetpassword/:resetToken",UserController.resetPassword);



module.exports = router; 