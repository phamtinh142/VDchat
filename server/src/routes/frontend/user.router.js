const express = require('express');

const router = express.Router();
const userController = require('../../controllers/frontend/user.controller');
const { authorize, USER } = require('../../config/passport');

router.get('/profile', authorize(USER), userController.getProfile);
router.put('/update-username', authorize(USER), userController.putUpdateUsername);
router.put('/update-sex', authorize(USER), userController.putUpdateSex);
router.put('/update-birthday', authorize(USER), userController.putUpdateBirthday);
router.put('/update-status', authorize(USER), userController.putUpdateStatus);
router.put('/update-url-user', authorize(USER), userController.putUpdateUrlUser);
router.put('/update-avatar', authorize(USER), userController.putUpdateAvatar);

router.get('/contact', authorize(USER), userController.getContact);

module.exports = router;
