const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

//Insert Model
const User = require("../../Model/RoomReservationModel/UserModel");
//Insert user control
const UserController = require("../../Controlers/RoomReservationController/UserController");

router.get("/", UserController.getAllUsers);
router.post("/", UserController.addUsers);
router.get("/:id", UserController.getById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

//export
module.exports = router;
