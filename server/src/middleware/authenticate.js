const jwt = require('jsonwebtoken');
const config = require('../config');
const userModel = require('../models/user.model');
const authenticate = async (req, res, next) => {
    try {
        const { accessToken } = req.cookies;
        if (!accessToken) {
            return res.status(401).json({
                ok: false,
                message: 'Access token is required'
            })
        }

        // tokenin düzgün olub-olmadığını yoxlayırıq
        const payload = jwt.verify(accessToken, config.JwtAccessKey)
        // tokenin içindəki id ilə istifadəçini tapırıq
        const user = await userModel.findById(payload.id)
        // istifadəçi databasedə yoxdursa girişə icazə vermirik
        if (!user) {
            return res.status(401).json({
                ok: false,
                message: 'User not found'
            })
        }
        // istifadəçi məlumatını request-ə əlavə edirik
        req.user = user;
        // növbəti middleware və ya controller-ə keçirik
        next();

    } catch (error) {
        res.status(401).json({
            ok: false,
            message: 'Invalid access token'
        })
    }
}

module.exports = authenticate 