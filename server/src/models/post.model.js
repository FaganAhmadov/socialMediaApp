const { default: mongoose } = require("mongoose");
const postSchema = require("../schemas/post.schema");

const postModel = mongoose.model("Post", postSchema)
module.exports = postModel