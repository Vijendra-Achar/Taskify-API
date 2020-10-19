const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

userSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, 'The Email Id chonsen already exists, Please Choose a new one'],
  },
  role: {
    type: String,
    enum: ['manager', 'employee'],
    default: 'employee',
  },
  password: {
    type: String,
  },
});

// Encrypt password
userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
