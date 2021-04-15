const express = require('express');
const cors = require('cors');


// IMPORTING ROUTES
const userRoutes = require('./Routes/userRoute');
const taskRoutes = require('./Routes/taskRouter');
const projectRoutes = require('./Routes/projectRouter');
const sectionRoutes = require('./Routes/sectionRouter');
const subtaskRoutes = require('./Routes/subtaskRouter');
const labelRoutes = require('./Routes/labelRouter');
const commentRoutes = require('./Routes/commentRouter');



const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/projects', projectRoutes);
app.use('/sections', sectionRoutes);
app.use('/subtasks', subtaskRoutes);
app.use('/labels', labelRoutes);
app.use('/comments', commentRoutes);

module.exports = app;