const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { env } = require('../config/vars');

const userSchema = new mongoose.Schema({
  userName: String,
  email: { 
    type: String, 
    unique: true, 
  },
  password: String,
  tokens: Array,
  avatar: {
    type: String,
    default: '/public/upload/avatars/avatar-default.jpg',
  },
  description: {
    type: String,
    default: 'Mô tả ngắn về bản thân bạn.',
  },
  sex: {
    value: {
      type: Number,
      enum: [
        0, // None
        1, // Male 
        2, // Female 
        3, // LGBT
      ],
      default: 0,
    },
    status: {
      type: Number,
      enum: [
        0, // Public
        1, // Friend
        2, // Private
      ],
      default: 0,
    },
  },
  birthDay: {
    status: {
      type: Number,
      enum: [
        0, // Public
        1, // Friend
        2, // Private
      ],
      default: 0,
    },
    value: {
      type: Date,
      default: Date.now,
    },
  },
  maritalStatus: {
    status: {
      type: Number,
      enum: [
        0, // Public
        1, // Friend
        2, // Private
      ],
      default: 0,
    },
    value: {
      type: Number,
      enum: [
        0, // Alone 
        1, // Dating
        2, // Married
      ],
      default: 0,
    },
  },
  urlUser: {
    type: String,
    default: '',
  },
  role: { 
    type: String, 
    enum: [
      'user',
      'admin',
    ], 
    default: 'user',
  },
  pendingFriends: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'PendingFriends',
  }],
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
