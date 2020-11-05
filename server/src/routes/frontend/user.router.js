const express = require('express');

const router = express.Router();
const userController = require('../../controllers/frontend/user.controller');
const { authorize, USER } = require('../../config/passport');

router.get('/profile', authorize(USER), userController.getProfile);
router.put('/update-profile', authorize(USER), userController.putUpdateProfile);

module.exports = router;
