const dotenv = require("dotenv");
dotenv.config();

const config = {
    mongoUrl: process.env.MONGO_URL,
    mongoDbName: process.env.MONGO_DB_NAME,
    mongoDbPass: process.env.MONGO_DB_PASSWORD,
    port: process.env.PORT,
    JwtAccessKey: process.env.JWT_ACCESS_KEY,
    JwtResetKey: process.env.JWT_RESET_KEY,
    nodeEnv: process.env.NODE_ENV,
    email: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASSWORD,
    corsOrigin1: process.env.CORS_ORIGIN_1
}

module.exports = config;



