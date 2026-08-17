const express = require("express");
const { createPost, getAllActivePosts, editPost, getSinglePost, changeStatusPost, deletePost } = require("../controller/post.controller");
const authenticate = require("../middleware/authenticate");
const upload = require("../middleware/upload");
const postRouter = express.Router();

postRouter.get('/', authenticate, getAllActivePosts)
postRouter.post('/', authenticate, upload.single("file"), createPost)
postRouter.put('/:id', authenticate, editPost)
postRouter.get('/:id', authenticate, getSinglePost)
postRouter.patch('/:id', authenticate, changeStatusPost)
postRouter.delete('/:id', authenticate, deletePost)

module.exports = postRouter