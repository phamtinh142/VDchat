const mongoose = require('mongoose');

const User = require('../../models/user.model');
const PendingFriends = require('../../models/pendingFriends.model');
const Friends = require('../../models/friends.model');

exports.getSuggestFriends = async (req, res, next) => {
  try {
    const limitUser = 100;

    let ignoreUsers = [];

    // Ignore Friends
    const friendsResult = await Friends.findOne({ userID: req.user._id });
    if (friendsResult && friendsResult.friends) {
      ignoreUsers = [...friendsResult.friends];
    }

    // Ignore your account 
    ignoreUsers.push(req.user._id);

    const { pendingFriends } = await User.findOne({ _id: req.user._id });

    const aggregate = [
      {
        $match: {
          _id: { $nin: ignoreUsers },
          pendingFriends: {
            $not: {
              $elemMatch: { $in: pendingFriends },
            },
          },
        },
      },
      {
        $addFields: {
          statusFriend: 0,
        }, 
      },
      { 
        $project: { 
          _id: 1,
          userName: 1,
          avatar: 1,
          statusFriend: 1,
        }, 
      },
      {
        $limit: limitUser,
      },
    ];

    const userList = await User.aggregate(aggregate);

    return res.status(200).json({ data: userList });
  } catch (error) {
    console.log('------- error ------- getSuggestFriends');
    console.log(error);
    console.log('------- error ------- getSuggestFriends');
    return next();
  }
};

exports.searchUsers = async (req, res, next) => {
  try {
    const limitUser = 100;

    if (!req.query.searchText && req.query.searchText === '') {
      return res.status(200).json({ data: [] });
    }

    const textSearch = new RegExp(req.query.searchText, 'gi');

    // Ignore my friends
    let ignoreUsers = [];
    const friendsResult = await Friends.findOne({ userID: req.user._id });
    
    if (friendsResult && friendsResult.friends) {
      ignoreUsers = [...friendsResult.friends];
    }

    // Ignore your account
    ignoreUsers.push(req.user._id);

    const aggregate = [
      {
        $match: {
          userName: textSearch,
          _id: { $nin: ignoreUsers },
        },
      },
      {
        $lookup: {
          from: PendingFriends.collection.name,
          let: { pendingFriends: { $ifNull: ['$pendingFriends', []] } },
          pipeline: [
            {
              $match: {
                status: 0,
                $or: [
                  { recipient: req.user._id },
                  { requester: req.user._id },
                ],
                $expr: { $in: ['$_id', '$$pendingFriends'] },
              },
            },
            {
              $project: {
                _id: 0,
                requester: 1,
              },
            },
          ],
          as: 'pendingFriends',
        },
      },
      { 
        $project: { 
          _id: 1,
          userName: 1,
          avatar: 1,
          requester: { $arrayElemAt: ['$pendingFriends.requester', 0] },
        }, 
      },
      {
        $limit: limitUser,
      },
    ];

    const userList = await User.aggregate(aggregate);

    const handleUsers = userList.map((element) => {
      const user = element;

      // Add friend
      if (!user.requester) {
        user.statusFriend = 0;
        return user;
      } 
      
      // Requested
      if (user.requester.toString() === req.user._id.toString()) {
        user.statusFriend = 1;
        delete user.requester;
        return user;
      } 

      // Accepted
      user.statusFriend = 2;
      delete user.requester;
      return user;
    });

    return res.status(200).json({ data: handleUsers });
  } catch (error) {
    console.log('------- error ------- searchUsers');
    console.log(error);
    console.log('------- error ------- searchUsers');
    return next(error);
  }
};

exports.addNewFriend = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const error = new Error();
    error.status = 400;
    error.message = 'Vui lòng tải lại trang và thử  lại!';

    if (!req.body.userID) {
      throw error;
    }

    const requesterID = req.user._id;
    const recipientID = req.body.userID;

    const friendsResult = await Friends.findOne({ userID: requesterID });
    if (
      friendsResult 
      && friendsResult.friends 
      && friendsResult.friends.includes(req.body.userID)
    ) {
      const friendsError = new Error();
      error.status = 400;
      error.message = 'Các bạn đã trở thành bạn bè!';
      throw friendsError;
    }

    const pendingFriend = await PendingFriends.findOneAndUpdate(
      { requester: requesterID, recipient: recipientID },
      { $set: { status: 0 } },
      { upsert: true, new: true, session },
    );

    // Update requester
    await User.findOneAndUpdate(
      { _id: requesterID },
      { $push: { pendingFriends: pendingFriend._id } },
      { session },
    );

    // Update recipient
    await User.findOneAndUpdate(
      { _id: recipientID },
      { $push: { pendingFriends: pendingFriend._id } },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ 
      message: 'Đã thêm bạn thành công!', 
      requesterID,
      recipientID,
    });
  } catch (error) {
    console.log('------- error ------- addNewFriend');
    console.log(error);
    console.log('------- error ------- addNewFriend');

    await session.abortTransaction();
    session.endSession();

    return next(error);
  }
};

exports.postAcceptFriendRequest = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (!req.body.userID) {
      const error = new Error();
      error.status = 400;
      error.message = 'Vui lòng tải lại trang và thử  lại!';
      throw error;
    }

    // Remove request friend
    const requestFriend = await PendingFriends.findOneAndRemove({
      requester: req.body.userID,
      recipient: req.user._id,
    }, { session });

    // Update requester
    await User.findOneAndUpdate(
      { _id: req.body.userID },
      { $pull: { pendingFriends: requestFriend._id } },
      { session },
    );

    // Update recipient
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { pendingFriends: requestFriend._id } },
      { session },
    );

    // Update friend requester
    await Friends.findOneAndUpdate(
      { userID: req.body.userID },
      { $push: { friends: mongoose.Types.ObjectId(req.user._id) } },
      { new: true, upsert: true, session },
    );

    // Update friend recipient
    await Friends.findOneAndUpdate(
      { userID: req.user._id },
      { $push: { friends: mongoose.Types.ObjectId(req.body.userID) } },
      { new: true, upsert: true, session },
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      message: 'Đã thêm bạn bè!',
      requesterID: req.body.userID,
      recipientID: req.user._id,
    });
  } catch (error) {
    console.log('------- error ------- postAcceptFriendRequest');
    console.log(error);
    console.log('------- error ------- postAcceptFriendRequest');

    await session.abortTransaction();
    session.endSession();

    return next(error);
  }
};

exports.postDeclinedFriendRequest = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (!req.body.userID) {
      const error = new Error();
      error.status = 400;
      error.message = 'Vui lòng tải lại trang và thử  lại!';
      throw error;
    }

    // Remove request friend
    const requestFriend = await PendingFriends.findOneAndRemove({
      requester: req.body.userID,
      recipient: req.user._id,
    }, { session });

    // Update requester
    await User.findOneAndUpdate(
      { _id: req.body.userID },
      { $pull: { pendingFriends: requestFriend._id } },
      { session },
    );

    // Update recipient
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { pendingFriends: requestFriend._id } },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      message: 'Đã từ chối lời mời kết bạn!',
      requesterID: req.body.userID,
      recipientID: req.user._id,
    });
  } catch (error) {
    console.log('------- error ------- postDeleteFriendRequest');
    console.log(error);
    console.log('------- error ------- postDeleteFriendRequest');

    await session.abortTransaction();
    session.endSession();

    return next(error);
  }
};

exports.postCancelingFriendRequest = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (!req.body.userID) {
      const error = new Error();
      error.status = 400;
      error.message = 'Vui lòng tải lại trang và thử  lại!';
      throw error;
    }

    // Remove request friend
    const requestFriend = await PendingFriends.findOneAndRemove({
      requester: req.user._id,
      recipient: req.body.userID,
    }, { session });

    // Update requester
    await User.findOneAndUpdate(
      { _id: req.body.userID },
      { $pull: { pendingFriends: requestFriend._id } },
      { session },
    );

    // Update recipient
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { pendingFriends: requestFriend._id } },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      message: 'Đã hủy lời mời kết bạn!',
      recipientID: req.body.userID,
      requesterID: req.user._id,
    });
  } catch (error) {
    console.log('------- error ------- postDeleteFriendRequest');
    console.log(error);
    console.log('------- error ------- postDeleteFriendRequest');

    await session.abortTransaction();
    session.endSession();

    return next(error);
  }
};
