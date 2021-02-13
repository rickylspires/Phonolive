const express = require('express');
const router = express.Router();

const { 
    registerUser
} = require('../controllers/authController');

//Public
router.route('/register').post(registerUser);

module.exports = router;