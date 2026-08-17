const express = require('express');

const {
  login,
  adminLogin,
  logout,
  register,
  resetPassword,
  forgotPassword,
  currentUser,
  checkToken,
} = require('../controller/auth.controller');
const authenticate = require('../middleware/authenticate');


const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/admin-login', adminLogin);
authRouter.post('/logout', logout);
authRouter.post('/register', register);
authRouter.post('/reset-password', resetPassword);
authRouter.post('/forgot-password', forgotPassword);
authRouter.get('/currentUser', authenticate, currentUser);
authRouter.get('/checkToken', checkToken);

module.exports = authRouter;


