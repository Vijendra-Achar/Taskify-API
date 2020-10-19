// Imports
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const taskRouter = require('./routes/taskRoutes');
const taskNotesRouter = require('./routes/taskNotesRoutes');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// Main App
const app = express();

// Body-Parser
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.DATABASE_CONNECTION_STRING, {
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

// Task Notes Router
app.use('/api/v1/taskNotes', taskNotesRouter);

// Main Server
const server = app.listen(portNumber, () => {
  console.log(`The Taskify server is running on http://localhost:${portNumber}🚀`);
});
