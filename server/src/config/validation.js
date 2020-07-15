const { check } = require('express-validator/check');

const User = require('../models/user.model');

exports.validationSignup = [
  check('userName').custom((value) => {
    if (value.search(/[\(\)\<\>\?\[\]\\]+/g) >= 0
      || value.length < 1
      || value.length > 32) {
      throw new Error('Nick name must have 1-32 characters and not include: ()[]<>\/?');
    } else {
      return value;
    }
  }),
  check('firstName').custom((value) => {
    if (value.length < 1) {
      throw new Error('First name not empty!');
    } else {
      return value;
    }
  }),
  check('lastName').custom((value) => {
    if (value.length < 1) {
      throw new Error('Last name not empty!');
    } else {
      return value;
    }
  }),
  check('password').custom((value) => {
    if (value.search(/\s\(\)\[\]\{\}\<\>\//g) >= 0
      || value.search(/[A-Z]+/g) < 0
      || value.search(/[0-9]+/g) < 0
      || value.search(/[!@#$%^&*?_]+/g) < 0
      || value.length < 7
      || value.length > 20) {
      throw new Error("Password must have 7-20 characters and contain both uppercase, number and special character(!@#$%^&*?_).");
    } else {
      return value;
    }
  }),
  check('confirmPassword').custom((value) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match!");
    } else {
      return value;
    }
  }),
  check('email')
    .isEmail()
    .withMessage('Email is invalid!')
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value })
          .select({ email: 1 })
          .lean();
        if (user) {
          throw new Error('Email exists already. Please pick a diffrent one!');
        }
      } catch (error) {
        console.log(`------- error ------- checkEmailExistsSignin`);
        console.log(error);
        console.log(`------- error ------- checkEmailExistsSignin`);
      }
    }),
]