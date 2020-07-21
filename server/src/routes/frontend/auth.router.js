const express = require('express');
const router = express.Router();

const authController = require('../../controllers/frontend/auth.controller');
const validator = require('../../config/validation');

router.post('/signup', validator.validationSignup, authController.signup);
router.post('/login', validator.validationLogin, authController.login);

module.exports = router;