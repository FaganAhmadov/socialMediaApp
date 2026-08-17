const { default: mongoose } = require("mongoose");
const tokenSchema = require("../schemas/token.schema");

const tokenModel = mongoose.model('Token', tokenSchema)
module.exports = tokenModel