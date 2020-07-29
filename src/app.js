const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const morgan =  require('morgan');

const { AUTH_API_PATH, USER_API_PATH, DOWNLOAD_PATH } = require('./constants');
const connectDB = require('./db');

//app
const auth = require('./app/routes/auth');
const download = require('./app/routes/download');
const user = require('./app/routes/user');
const errorHandler = require('./app/middleware/errorHandler');

//connect DB
connectDB();

//Create Express App
const app = express();

//body parser
app.use(express.json());

//cookie parser
app.use(cookieParser());

//Default content to check app working
app.get('/', (req, res) => {
    res.send("Welcome to the App...!");
});

app.use( AUTH_API_PATH , auth);
app.use( DOWNLOAD_PATH , download);
app.use( USER_API_PATH , user);

app.use(errorHandler);

module.exports = app;