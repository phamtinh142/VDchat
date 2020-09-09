const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { env } = require('../config/vars');

const roles = ['user', 'admin'];

const userSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    default: '', 
  },
  lastName: { 
    type: String, 
    default: '', 
  },
  userName: String,
  email: { 
    type: String, 
    unique: true, 
  },
  password: String,
  sex: Number,
  birthDay: Date,
  tokens: Array,
  role: { 
    type: String, 
    enum: roles, 
    default: 'user',
  },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();

    const rounds = env === 'test' ? 1 : 10;

    const hash = await bcrypt.hash(this.password, rounds);
    this.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.pre('update', async function (next) {
  try {
    if (!this.isModified('password')) return next();

    const rounds = env === 'test' ? 1 : 10;

    const hash = await bcrypt.hash(this.password, rounds);
    this.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
    callback(error, isMatch);
  });
};

userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
