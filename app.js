const express = require('express');
const cors = require('cors');


// IMPORTING ROUTES
const userRoutes = require('./Routes/userRoute');
const taskRoutes = require('./Routes/taskRouter');
const projectRoutes = require('./Routes/projectRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)
app.use('/projects', projectRoutes)

module.exports = app;