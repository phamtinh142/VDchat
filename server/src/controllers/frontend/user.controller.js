const User = require('../../models/user.model');

exports.profile = async (req, res, next) => {
  try {
    const infoUser = await User.findOne({ _id: req.user._id });
    if (!infoUser) {
      const error = new Error();
      error.status = 404;
      error.message = 'User not found!';
      throw error;
    }
    return res.status(201).json({ user: infoUser });
  } catch (error) {
    console.log('---------- error ---------- profileController');
    console.log(error);
    console.log('---------- error ---------- profileController');
    return next(error);
  }
};