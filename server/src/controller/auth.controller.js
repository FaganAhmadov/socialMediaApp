const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const config = require("../config");
const sendMail = require("../utils/sendMail");
const tokenModel = require("../models/token.model");

const login = async (req, res) => {
    try {
        const { emailorusername, password, } = req.body;
        const user = await userModel.findOne({
            $or: [
                { email: emailorusername },
                { username: emailorusername }
            ]
        }).select('+password')

        if (!user) {
            return res.status(404).json({
                ok: false,
                message: 'invalid email or password'
            })
        }
        const confirmPassword = await bcrypt.compare(password, user.password)
        if (!confirmPassword) {
            return res.status(401).json({
                ok: false,
                message: 'invalid email or password'
            })
        }
        // token create
        const accessToken = jwt.sign(
            { id: user._id },
            config.JwtAccessKey,
            { expiresIn: '1h' }
        );

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 60 * 60 * 1000, // 1 hour
        })

        res.status(200).json({
            ok: true,
            message: 'login successfully'
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}


const logout = async (req, res) => {
    try {
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        })

        return res.status(200).json({
            ok: true,
            message: 'Logout Successfully'
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Internal server error',
            error: error.message
        })
    }
}

const register = async (req, res) => {
    try {
        const { email, password, confirmPassword, username } = req.body;
        const userNameExist = await userModel.findOne({ username })
        if (userNameExist) {
            return res.status(409).json({
                message: 'Username already exists'
            })
        }
        const userEmailExist = await userModel.findOne({ email })
        if (userEmailExist) {
            return res.status(409).json({
                message: 'Email already exists'
            })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'password and confirm password do not match'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            username,
            password: hashedPassword,
            email
        })
        const accessToken = jwt.sign(
            { id: newUser._id },
            config.JwtAccessKey,
            { expiresIn: '1h' }
        );

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 60 * 60 * 1000, // 1 hour
        })

        res.status(201).json({
            message: 'User created successfully',
            user: newUser
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { newpassword, confirmpassword } = req.body
        const { token } = req.query
        if (!token) {
            return res.status(400).json({
                ok: false,
                message: 'token required'
            })
        }
        const resetToken = await tokenModel.findOne({ token });
        if (!resetToken || !resetToken.isValid) {
            return res.status(400).json({
                ok: false,
                message: 'Token invalid'
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, config.JwtResetKey)
        } catch (error) {
            return res.status(401).json({
                ok: false,
                message: 'Token Invalid'
            })
        }

        if (newpassword !== confirmpassword) {
            return res.status(400).json({
                ok: false,
                message: 'newpassword and confirmpassword dont match'
            })
        }

        const user = await userModel.findOne({ email: decoded.email }).select("+password")

        if (!user) {
            return res.status(404).json({
                message: 'userNotFound'
            })
        }

        const isCompare = await bcrypt.compare(newpassword, user.password)

        if (isCompare) {
            return res.status(400).json({
                message: 'new password cannot be same as old password'
            })
        }
        const hashPass = await bcrypt.hash(newpassword, 12)
        user.password = hashPass
        resetToken.isValid = false
        await resetToken.save();
        await user.save();

        res.status(200).json({
            ok: true,
            message: 'Password reset successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }

}


const forgotPassword = async (req, res) => {
    try {

        const { email } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: 'userNotFound'
            })
        }

        const resetToken = jwt.sign(
            { email },  //payloadPayload → tokenin içində saxlanan məlumat
            config.JwtResetKey, //Secret → tokeni imzalamaq və sonra yoxlamaq üçün gizli açar
            { expiresIn: '15m' }//Options → token üçün əlavə ayarlar
        )
        await tokenModel.create({
            userId: user._id,
            token: resetToken,
            type: "reset"
        })
        const text = `
        Hi ${user.username || 'User'},\n\n 
        You have requested to reset your password. Please click the link below to reset your password:
        http://localhost:5173/reset-password?token=${resetToken}
        If you did not request this, please ignore this email.
        Thank you.
        `
        await sendMail(email, 'Reset Password', text)

        res.status(200).json({
            ok: true,
            message: 'Reset password email sent successfully'
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}

const currentUser = async (req, res) => {
    try {
        res.status(200).json({
            ok: true,
            user: req.user
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}


const checkToken = async (req, res) => {
    try {
        const { token } = req.query
        if (!token || token === 'undefined' || token === 'null') {
            return res.status(404).json({
                ok: false,
                message: 'token notFound'
            })
        }

        const checkToken = await tokenModel.findOne({ token });
        if (!checkToken || !checkToken.isValid) {
            return res.status(400).json({
                ok: false,
                message: 'Token invalid'
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, config.JwtResetKey)
        } catch (error) {
            return res.status(401).json({
                ok: false,
                message: 'Token Invalid'
            })
        }

        res.status(200).json({
            ok: true,
            message: 'Token is valid'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}

const adminLogin = async (req, res) => {
}

module.exports = {
    login,
    adminLogin,
    logout,
    register,
    resetPassword,
    forgotPassword,
    currentUser,
    checkToken
}