const mongoose = require('mongoose');

const pendingFriendsSchema = new mongoose.Schema({
  requester: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
  recipient: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
  status: {
    type: Number,
    enum: [
      0, // Requested
      1, // Accepted
      2, // Declined
      3, // Bloqued
    ],
  },
}, { timestamps: true });

const PendingFriends = mongoose.model('PendingFriends', pendingFriendsSchema);

module.exports = PendingFriends;