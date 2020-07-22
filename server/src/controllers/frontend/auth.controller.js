const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');

const User = require('../../models/user.model');
const { jwtSecret, jwtExpirationMinutes } = require('../../config/vars');

exports.login = async (req, res) => {
  try {
    // Check validate email and password
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error();
      error.message = 'Validation failed!'
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    // Find user
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const error = new Error();
      error.message = 'User not found!';
      error.statusCode = 404;
      throw error;
    }
    // Check password
    const validate = await user.isValidPassword(req.body.password);
    if (!validate) {
      const error = new Error();
      error.message = 'Wrong password!';
      error.statusCode = 404;
      throw error;
    }
    const body = {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
    }
    const token = jwt.sign({ user: body }, jwtSecret, { expiresIn: jwtExpirationMinutes });
    return res.status(200).json({ token });
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

    // Save user
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