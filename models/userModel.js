const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Name is reqired'],
  },
  email: {
    type: String,
    required: [true, 'Please enter a valid email ID'],
    unique: [true, 'The Email Id chonsen already exists, Please Choose a new one'],
  },
  role: {
    type: String,
    enum: ['manager', 'employee'],
    default: 'employee',
  },
  password: {
    type: String,
    select: false,
  },
});

// Checks if the password entered by the user matches the existing password in the database / BCRYPT
userSchema.methods.checkCorrectPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Encrypt password
userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
