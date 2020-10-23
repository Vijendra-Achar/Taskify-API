// Imports
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const taskRouter = require('./routes/taskRoutes');
const taskNotesRouter = require('./routes/taskNotesRoutes');
const dotenv = require('dotenv');
const cors = require('cors');

cookieParser = require('cookie-parser');

// dotenv.config({ path: './config.env' });

// Main App
const app = express();

// Body-Parser
app.use(express.json());

// CORS Middleware
app.use(cors());

// Cookie Middleware
app.use(cookieParser());

// MongoDB Connection
mongoose
  .connect(`mongodb+srv://Vijendra:0yw8KvFerFuqtnB7@cluster0.s4zcs.mongodb.net/taskify?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB was successfully Connected!📚🚀'))
  .catch((err) => {
    console.log('Mongo DB Connection Failed 💥', err);
  });

// User Router
app.use('/api/v1/user', userRouter);

// Task Router
app.use('/api/v1/task', taskRouter);

// Task Notes Router
app.use('/api/v1/taskNotes', taskNotesRouter);

const portNumber = process.env.PORT || 5000;

// Main Server
const server = app.listen(portNumber, () => {
  console.log(`The Taskify server is running on http://localhost:${portNumber}🚀`);
});
