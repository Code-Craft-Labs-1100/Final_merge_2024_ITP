const mongoose = require("mongoose");

const userEmSchema = new mongoose.Schema({
  employee: {
    type: String,
    ref: "Employee",
    required: true
  },
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
  profileImageUrl: {
    type: String
  },
  userType: {
    type: String,
    enum: ["admin", "user"],
    required: true
  }
});

const UserEm = mongoose.model("UserEm", userEmSchema);

module.exports = UserEm;
