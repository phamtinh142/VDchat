const express = require('express');

const router = express.Router();

const frontendAuth = require('./frontend/auth.router');
const frontendUser = require('./frontend/user.router');

router.use('/auth', frontendAuth);
router.use('/user', frontendUser);

module.exports = router;
