const express = require('express');

const frontendAuth = require('../routes/frontend/auth.router');

const router = express.Router();

router.use('/auth', frontendAuth);

module.exports = router;