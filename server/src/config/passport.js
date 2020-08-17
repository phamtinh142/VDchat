const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/user.model');

passport.use('signup', new localStrategy({
  usernameField: 'email',
  passportField: 'passport'
}, async (email, passport, done) => {
  try {
    const user = await User.create({ email, passport });

    return done(null, user);
  } catch (error) {
    console.log(`------- error ------- signupLocal`);
    console.log(error);
    console.log(`------- error ------- signupLocal`);
    done(error);
  }
}));

passport.use('login', new localStrategy({
  usernameField: 'email',
  passportField: 'passport',
}, async (email, passport, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'User not found!' });
    }

    const validatePassword = await user.isValidPassword(passport);
    if (!validatePassword) {
      return done(null, false, { message: 'Wrong password!' });
    }
    return done(null, user, { message: 'Logger in successfully' });
  } catch (error) {
    console.log(`------- error ------- loginLocal`);
    console.log(error);
    console.log(`------- error ------- loginLocal`);
  }
}))