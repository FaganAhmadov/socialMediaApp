const postModel = require("../models/post.model")
const uploadToCloudinary = require("../utils/uploadToCloudnary")

const createPost = async (req, res) => {
    try {
        const { description } = req.body
        const file = req.file
        let imgUrl = null
        if (file) {
            const uploaded = await uploadToCloudinary(
                file.buffer
            );
            imgUrl = uploaded.secure_url
        }

        await postModel.create({
            description,
            postImage: imgUrl,
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
        })
            .populate('userID', 'username')
            .sort({ createdAt: -1 });

        res.status(200).json({
            ok: true,
            message: 'Active posts fetched successfully',
            data: posts
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error fetching active posts',
            error: error.message
        });
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
