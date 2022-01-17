const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, resetPassword } = require('../controller/auth');

// registration.
router.post('/register', register);
// login.
router.post('/login', login);
// generate token and send to mail.
router.post('/forgotpassword', forgotPassword);
// token verified and new password saved.
router.post('/resetpassword', resetPassword);

module.exports = router;