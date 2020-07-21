const express = require('express');
const router = express.Router();

const frontendAuth = require('../routes/frontend/auth.router');

router.use('/auth', frontendAuth);

module.exports = router;