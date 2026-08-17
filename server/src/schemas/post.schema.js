const { default: mongoose } = require('mongoose')

const postSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    postImage: {
        type: String,
        require: true
    },
    description: {
        type: String,
        default: null
    },
    likes: {
        type: Number,
        default: 0
    },

    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    },

},
    {
        timestamps: true
    }
)

module.exports = postSchema