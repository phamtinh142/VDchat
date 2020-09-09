const express = require('express');

const router = express.Router();
const userController = require('../../controllers/frontend/user.controller');
const { authorize, USER } = require('../../config/passport');

router.post('/profile', authorize(USER), userController.profile);

module.exports = router;