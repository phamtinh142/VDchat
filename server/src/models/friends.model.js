const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
  userID: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    unique: true,
  },
  friends: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  }],
}, { timestamps: true });

const Friends = mongoose.model('Friends', friendsSchema);

module.exports = Friends;