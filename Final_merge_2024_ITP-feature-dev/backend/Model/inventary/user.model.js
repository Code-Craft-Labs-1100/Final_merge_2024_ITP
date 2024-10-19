const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  adress: {
    type: String
  },
  mobile: {
    type: String,
    unique: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isOwner: {
    type: Boolean,
    default: false
  },
  verifytoken: {
    type: String
  },
  profilePicture: {
    type: String,
    default: "data:image/png;base64,...", // Add a default image string
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
