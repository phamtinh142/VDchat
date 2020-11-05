const express = require('express');

const router = express.Router();
const friendController = require('../../controllers/frontend/friend.controller');
const { authorize, USER } = require('../../config/passport');

router.get('/suggest-friends', authorize(USER), friendController.getSuggestFriends);
router.get('/search-users', authorize(USER), friendController.searchUsers);
router.get('/all-friend', authorize(USER), friendController.getFriends);
router.get('/friend-invitation', authorize(USER), friendController.getFriendInvitation);
router.get('/friend-request', authorize(USER), friendController.getFriendRequest);
router.post('/add-new-friend', authorize(USER), friendController.addNewFriend);
router.post('/accept-friend-request', authorize(USER), friendController.postAcceptFriendRequest);
router.post('/declined-friend-request', authorize(USER), friendController.postDeclinedFriendRequest);
router.post('/cancel-friend-request', authorize(USER), friendController.postCancelingFriendRequest);
router.delete('/remove-friend', authorize(USER), friendController.removeFriend);

module.exports = router;
