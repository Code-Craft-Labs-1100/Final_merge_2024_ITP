const express = require("express");
const { google, signin, signup } = require("../../Controlers/Inventary/auth.controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);

module.exports = router;
