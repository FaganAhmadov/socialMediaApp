const express = require("express");
const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const postRouter = require("./post.router");
const router = express.Router();

router.use("/auth", authRouter);
router.use("/post", postRouter);
router.use("/user", userRouter);

module.exports = router;
