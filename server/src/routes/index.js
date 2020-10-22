const express = require('express');

const router = express.Router();

const frontendAuth = require('./frontend/auth.router');
const frontendUser = require('./frontend/user.router');
const frontendFriend = require('./frontend/friend.router');

router.use('/auth', frontendAuth);
router.use('/user', frontendUser);
router.use('/friend', frontendFriend);

module.exports = router;
