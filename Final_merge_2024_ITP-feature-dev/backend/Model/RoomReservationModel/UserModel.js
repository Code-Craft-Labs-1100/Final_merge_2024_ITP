const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const userroomSchema = new mongoose.Schema({
  guests: {
    adults: Number,
    children: Number
  },
  checkin: Date,
  checkout: Date,
  promocode: String,
  country: String,
  numberOfDays: String,
  roomType: String,
  roomPrice: String,
  totalPrice: String
});

module.exports = mongoose.model("Userroom", userroomSchema);
