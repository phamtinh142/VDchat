const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');

const User = require('../../models/user.model');
const { jwtSecret, jwtExpirationMinutes } = require('../../config/vars');

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed!');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const user = await User.findOne({ email: req.body.email, password: req.body.password }).lean();
    console.log(`------- user ------- login`);
    console.log(user);
    console.log(`------- user ------- login`);
    if (!user) {
      const error = new Error('Email or password is incorrect!');
      error.statusCode = 404;
      throw error;
    }

    return res.status(400).json({ login: 'login success' });

  } catch (error) {
    console.log(`------- error ------- login`);
    console.log(error);
    console.log(`------- error ------- login`);
    res.json({ status: false, error });
  }
}

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed!');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    // save user
    const user = new User(req.body);
    const saveUser = await user.save();
    console.log(`------- saveUser ------- signup`);
    console.log(saveUser);
    console.log(`------- saveUser ------- signup`);

    const token = jwt.sign({ user: req.body }, jwtSecret, { expiresIn: jwtExpirationMinutes });

    const updateUser = await User.updateOne(
      { _id: user._id },
      { $push: { tokens: token } }
    );
    console.log(`------- updateUser ------- signup`);
    console.log(updateUser);
    console.log(`------- updateUser ------- signup`);

    return res.status(200).json({ token });

  } catch (error) {
    console.log(`------- error ------- signup`);
    console.log(error);
    console.log(`------- error ------- signup`);
    res.json({ status: false, error });
  }
}