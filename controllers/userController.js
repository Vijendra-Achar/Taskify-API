const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Sign JWT Token
const signJWTToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Sign Up New User MANAGER Or Employee
exports.signUpNewUser = async (req, res) => {
  try {
    const newUser = await userModel.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });

    const myJWTtoken = signJWTToken(newUser._id);

    const cookieOptions = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Expires 30 days from the date of login
    };

    newUser.password = undefined;

    res.cookie('jwt-auth-token', myJWTtoken, cookieOptions);

    res.status(200).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      error: 'User Already Exists',
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        status: 'fail',
        message: 'Please Enter valid E-mail and Password',
      });
    }

    const user = await userModel.findOne({ email: email }).select('+password');

    if (!user || !(await user.checkCorrectPassword(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid E-mail address or Password',
      });
    }

    const myJWTtoken = signJWTToken(user._id);

    const cookieOptions = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Expires 30 days from the date of login
      httpOnly: true,
    };

    user.password = undefined;

    res.cookie('jwt-auth-token', myJWTtoken, cookieOptions);

    res.status(200).json({
      status: 'success',
      token: myJWTtoken,
      role: user.role,
      data: {
        user: user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      error: error,
    });
  }
};

// Get Curremtly logged-in User
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.params.uid });

    res.status(200).json({
      status: 'success',
      data: {
        user: user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      error: error,
    });
  }
};

// Get all users for the admin dashboard
exports.getAllUsers = async (req, res) => {
  try {
    const allEmps = await userModel.find({ role: 'employee' });

    res.status(200).json({
      status: 'success',
      data: {
        user: allEmps,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      error: error,
    });
  }
};
