const userModel = require('../models/userModel');

// Sign Up New User MANAGER Or Employee
exports.signUpNewUser = async (req, res) => {
  try {
    const newUser = await userModel.create({
      name: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });

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
      error: error,
    });
  }
};

// Get Curremtly logged-in User
exports.getCurrentUser = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: {
        user: req.params.uid,
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
exports.getAllUsers = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: {
        user: 'All Users Data',
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
