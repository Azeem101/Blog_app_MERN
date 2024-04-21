const express = require('express');
const { getAllUser, register, login } = require('../controller/userController');

const router = express.Router();

// GET ALL USER "GET"
router.get('/alluser', getAllUser)

// REGISTER USER "POST"
router.post('/registeruser', register);

// LOGIN "POST"
router.post('/loginuser', login)

module.exports = router