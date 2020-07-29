const mongoose = require('mongoose');

var userInfo = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  }
}, { _id: false });

var UploadSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  infoList : [userInfo]
});

module.exports = mongoose.model('UploadSchema', UploadSchema);
