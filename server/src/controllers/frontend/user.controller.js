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
    const infoUser = await User.findOne({ _id: req.query.userID })
      .select({
        password: 0, tokens: 0, role: 0, pendingFriends: 0, 
      });

    if (!infoUser) {
      const error = new Error();
      error.status = 404;
      error.message = 'User not found!';
      throw error;
    }
    
    return res.status(201).json({ infoUser });
  } catch (error) {
    console.log('---------- error ---------- getProfile');
    console.log(error);
    console.log('---------- error ---------- getProfile');
    return next(error);
  }
};

exports.putUpdateProfile = async (req, res, next) => storageAvatar(req, res, async (err) => {
  try {
    if (err) {
      const error = new Error();
      error.status = 400;
      error.message = 'Vui lòng chọn ảnh!';
      throw error;
    }

    const objUpdate = {};
    if (req.file) {
      const pathImage = `/public/upload/avatars/${req.file.filename}`;
      objUpdate.avatar = pathImage;
    }

    if (req.body.description) {
      objUpdate.description = req.body.description;
    }

    if (req.body.userName) {
      objUpdate.userName = req.body.userName;
    }

    if (req.body.sex) {
      objUpdate.sex = {
        value: req.body.sex.value,
        status: req.body.sex.status,
      };
    }

    if (req.body.birthDay) {
      objUpdate.birthDay = {
        value: req.body.birthDay.value,
        status: req.body.birthDay.status,
      };
    }

    if (req.body.maritalStatus) {
      objUpdate.maritalStatus = {
        value: req.body.maritalStatus.value,
        status: req.body.maritalStatus.status,
      };
    }

    if (Object.keys(objUpdate).length === 0 && objUpdate.constructor === Object) {
      const error = new Error();
      error.message = 'Vui lòng nhập đúng!';
      error.status = 422;
      throw error;
    }

    const updateUser = await User.updateOne(
      { _id: req.user._id }, 
      { $set: objUpdate },
    );

    if (updateUser.nModified) {
      return res.status(200).json({ message: 'Update success', dataUpdate: objUpdate });
    }

    // Remove image old
    // const user = await User.findOne({ _id: req.user._id });

    // if (user.avatar && !lodash.isEmpty(user.avatar)) {
    //   const pathFile = path.resolve(__dirname, '../../../') + user.avatar.trim();
    //   const checkPathExistsSync = await fs.existsSync(pathFile);
    //   if (checkPathExistsSync) {
    //     await fs.unlinkSync(pathFile);
    //   }
    // }

    const error = new Error();
    error.message = 'Vui lòng tải lại trang và thử lại!';
    error.status = 422;
    throw error;
  } catch (error) {
    console.log('------- error ------- getContact');
    console.log(error);
    console.log('------- error ------- getContact');
    return next(error);
  }
});