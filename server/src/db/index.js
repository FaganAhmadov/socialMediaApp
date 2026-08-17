const mongoose = require("mongoose");
const config = require("../config");

const url = config.mongoUrl.replace(
    "<db_password>",
    config.mongoDbPass
);

const mongoDbConnection = async () => {
    try {
        await mongoose.connect(url);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
    }   
};

module.exports = {
    mongoDbConnection,
};  

