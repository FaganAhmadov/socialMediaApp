const express = require("express");
const { editUser, changeStatusUserAccout, deleteUser } = require("../controller/user.controller");
const userRouter = express.Router();

userRouter.put('/',editUser)
userRouter.patch('/',changeStatusUserAccout)
userRouter.delete('/',deleteUser)


module.exports = userRouter