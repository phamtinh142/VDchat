const lodash = require('lodash');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const storageAvatar = require('../../utils/storageAvatar');
const User = require('../../models/user.model');
const PendingFriends = require('../../models/pendingFriends.model');
const Friends = require('../../models/friends.model');

exports.getProfile = async (req, res, next) => {
  try {
    const infoUser = await User.findOne({ _id: req.user._id })
      .select({
        password: 0, tokens: 0, role: 0, pendingFriends: 0, 
      });

    let requestFriends = [];
    const requestFriendsResult = await PendingFriends
      .find({
        recipient: req.user._id,
      })
      .select({ recipient: 0, status: 0 })
      .populate({
        path: 'requester', 
        model: 'User',
        select: {
          _id: 1,
          userName: 1,
          avatar: 1,
        },
      });

    if (requestFriendsResult) {
      requestFriends = requestFriendsResult.map((element) => {
        return element.requester;
      });
    }

    if (!infoUser) {
      const error = new Error();
      error.status = 404;
      error.message = 'User not found!';
      throw error;
    }
    
    return res.status(201).json({ user: infoUser, requestFriends });
  } catch (error) {
    console.log('---------- error ---------- getProfile');
    console.log(error);
    console.log('---------- error ---------- getProfile');
    return next(error);
  }
};

exports.putUpdateUsername = async (req, res, next) => {
  try {
    if (!req.body.userName || lodash.isEmpty(req.body.userName)) {
      const error = new Error();
      error.status = 400;
      error.message = 'Vui lòng nhập tên!';
      throw error;
    }

    const queryData = { _id: req.user._id };
    const updateData = { $set: { userName: req.body.userName } };

    const updateUser = await User.updateOne(queryData, updateData);

    if (updateUser.nModified !== 1) {
      const error = new Error();
      error.status = 400;
      error.message = 'Vui lòng thử lại!';
      throw error;
    }
    return res.status(200).json({ message: 'Cập nhật thành công!' });
  } catch (error) {
    console.log('------- error ------- editUserNameController');
    console.log(error);
    console.log('------- error ------- editUserNameController');
    return next(error);
  }
};

exports.putUpdateSex = async (req, res, next) => {
  try {
    if (!req.body.sex) {
      const error = new Error();
      error.status = 400;
      error.message = 'Vui lòng chọn giới tính!';
      throw error;
    }

    const queryData = { _id: req.user._id };
    const updateData = { $set: { sex: req.body.sex } };

    const updateUser = await User.updateOne(queryData, updateData);

    if (updateUser.nModified !== 1) {
      const error = new Error();
      error.status = 400;
      error.message = 'Vui lòng thử lại!';
      throw error;
    }
    return res.status(200).json({ message: 'Cập nhật thành công!' });
  } catch (error) {
    console.log('------- error ------- editUserNameController');
    console.log(error);
    console.log('------- error ------- editUserNameController');
    return next(error);
  }
};

exports.putUpdateBirthday = async (req, res, next) => {
  try {
    if (!req.body.birthday) {
      const error = new Error();
      error.status = 400;
      error.message = 'Vui nhập ngày sinh!';
      throw error;
    }

    const queryData = { _id: req.user._id };
    const updateData = { $set: { birthday: req.body.birthday } };

    const updateUser = await User.updateOne(queryData, updateData);

    if (updateUser.nModified !== 1) {
      const error = new Error();
      error.status = 400;
      error.message = 'Vui lòng thử lại!';
      throw error;
    }
    return res.status(200).json({ message: 'Cập nhật thành công!' });
  } catch (error) {
    console.log('------- error ------- editUserNameController');
    console.log(error);
    console.log('------- error ------- editUserNameController');
    return next(error);
  }
};

exports.putUpdateStatus = async (req, res, next) => {
  try {
    if (!req.body.status) {
      const error = new Error();
      error.status = 400;
      error.message = 'Vui lòng chọn trạng thái bản thân!';
      throw error;
    }

    const queryData = { _id: req.user._id };
    const updateData = { $set: { status: req.body.status } };

    const updateUser = await User.updateOne(queryData, updateData);

    if (updateUser.nModified !== 1) {
      const error = new Error();
      error.status = 400;
      error.message = 'Vui lòng thử lại!';
      throw error;
    }
    return res.status(200).json({ message: 'Cập nhật thành công!' });
  } catch (error) {
    console.log('------- error ------- editUserNameController');
    console.log(error);
    console.log('------- error ------- editUserNameController');
    return next(error);
  }
};

exports.putUpdateUrlUser = async (req, res, next) => {
  try {
    if (!req.body.urlUser || lodash.isEmpty(req.body.urlUser)) {
      const error = new Error();
      error.status = 400;
      error.message = 'Vui lòng nhập URL!';
      throw error;
    }

    const user = await User.findOne({ urlUser: req.body.urlUser });

    if (user) {
      const error = new Error();
      error.status = 400;
      error.message = 'URL đã được sử dụng, vui lòng nhập URl khác!';
      throw error;
    }

    const queryData = { _id: req.user._id };
    const updateData = { $set: { urlUser: req.body.urlUser } };

    const updateUser = await User.updateOne(queryData, updateData);

    if (updateUser.nModified !== 1) {
      const error = new Error();
      error.status = 400;
      error.message = 'Vui lòng thử lại!';
      throw error;
    }
    return res.status(200).json({ message: 'Cập nhật thành công!' });
  } catch (error) {
    console.log('------- error ------- editUserNameController');
    console.log(error);
    console.log('------- error ------- editUserNameController');
    return next(error);
  }
};

exports.putUpdateAvatar = (req, res, next) => storageAvatar(req, res, async (err) => {
  try {
    if (err || !req.file) {
      const error = new Error();
      error.status = 400;
      error.message = 'Vui lòng chọn ảnh!';
      throw error;
    }

    const pathImage = `/public/upload/avatars/${req.file.filename}`;
    const queryData = { _id: req.user._id };
    const updateData = { $set: { avatar: pathImage } };

    // Remove image old
    const user = await User.findOne(queryData);

    if (user.avatar && !lodash.isEmpty(user.avatar)) {
      const pathFile = path.resolve(__dirname, '../../../') + user.avatar.trim();
      const checkPathExistsSync = await fs.existsSync(pathFile);
      if (checkPathExistsSync) {
        await fs.unlinkSync(pathFile);
      }
    }

    // Update avatar
    const updateUser = await User.updateOne(queryData, updateData);

    if (updateUser.nModified !== 1) {
      const error = new Error();
      error.status = 400;
      error.message = 'Có lỗi khi tải ảnh lên!';
      throw error;
    }
    return res.status(200).json({
      message: 'Cập nhật ảnh đại diện thành công!',
      data: pathImage,
    });
  } catch (error) {
    console.log('------- error ------- putUpdateAvatar');
    console.log(error);
    console.log('------- error ------- putUpdateAvatar');
    return next();
  }
});

exports.getContact = async (req, res, next) => {
  try {
    // const contact = await Contact.findOne({ id: req.user._id });

    // if (!contact) {
    //   return res.status(200).json({ data: [] });
    // }

    // return res.status(200).json({ data: contact });
  } catch (error) {
    console.log('------- error ------- getContact');
    console.log(error);
    console.log('------- error ------- getContact');
    return next();
  }
};