const express = require('express');
const cors = require('cors');


// IMPORTING ROUTES
const userRoutes = require('./Routes/userRoute');



const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes)

module.exports = app;