const dotenv = require('dotenv')
const express = require("express");
const router = require("./routers");
const { mongoDbConnection } = require("./db");
const config = require("./config");
const cookieParser = require('cookie-parser');
const sendMail = require('./utils/sendMail');
const corsMiddleware = require('./middleware/corsMiddleware');
const app = express();
const path = require('path');


app.use(corsMiddleware);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(config.port, () => {
    console.log(`Server running on ${config.port}`);
});
// file reqden almaq ucun
app.use("/api/v1", router)
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
mongoDbConnection()



module.exports = app;