const express = require('express');
const router = express.Router();
const userController = require('../../Controlers/employeeController/users.controller');

// Routes for user authentication
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
