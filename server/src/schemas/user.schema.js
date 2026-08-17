const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    email: {
        type: String,
        maxLength: 50,
        minLength: 5,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select:false
    },
    username: {
        type: String,
        maxLength: 50,
        minLength: 5,
        require: true,
        unique: true
    },
    avatar: {
        type: String,
        default: null
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
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

module.exports = userSchema
