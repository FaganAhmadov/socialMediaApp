const postModel = require("../models/post.model")

const createPost = async (req, res) => {
    try {
        const { description } = req.body
        const file = req.file


        await postModel.create({
            description,
            postImage: file.filename,
            userID: req.user._id
        })
        res.status(200).json({
            ok: true,
            message: 'post create successfullyy',
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Internal server error',
            error: error.message
        })
    }
}

const getAllActivePosts = async (req, res) => {
    try {
        const posts = await postModel.find({
            isActive: true,
            isDelete: false
        }).populate('userID', 'username')
        res.status(200).json({
            ok: true,
            message: 'Active posts fetched successfully',
            data: posts
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error fetching active posts',
            error: error.message
        })
    }
}

const editPost = async (req, res) => {

}
const getSinglePost = async (req, res) => {

}
const changeStatusPost = async (req, res) => {

}
const deletePost = async (req, res) => {

}


module.exports = {
    createPost,
    editPost,
    getSinglePost,
    changeStatusPost,
    deletePost,
    getAllActivePosts
}
