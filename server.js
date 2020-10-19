// Imports
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const taskRouter = require('./routes/taskRoutes');
// Main App
const app = express();

// Body-Parser
app.use(express.json());

// MongoDB Connection
mongoose
  .connect('mongodb://localhost/taskify', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB was successfully Connected!📚🚀'))
  .catch((err) => {
    console.log('Mongo DB Connection Failed 💥', err);
  });

const portNumber = process.env.PORT || 5000;

// User Router
app.use('/api/v1/user', userRouter);

// Task Router
app.use('/api/v1/task', taskRouter);

// Main Server
const server = app.listen(portNumber, () => {
  console.log(`The Taskify server is running on http://localhost:${portNumber}🚀`);
});
