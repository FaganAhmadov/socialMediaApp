const dotenv = require('dotenv')
const express = require("express");
const router = require("./src/routers");
const { mongoDbConnection } = require("./src/db");
const config = require("./src/config");
const cookieParser = require('cookie-parser');
const sendMail = require('./src/utils/sendMail');
const corsMiddleware = require('./src/middleware/corsMiddleware');
const app = express();
const path = require('path');


app.use(corsMiddleware);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// file reqden almaq ucun
app.use("/api/v1", router)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
mongoDbConnection()



app.listen(config.port, () => {
    console.log("Backend server is running!");
});
