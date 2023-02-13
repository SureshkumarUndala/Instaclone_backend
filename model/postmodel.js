const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.ObjectId

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "No image available"
    },
    comments: [
        {
            commentText:String,
            commentBy:{type:ObjectId,  ref: "UserModel"}

        }
    ],
    author: {
        type: ObjectId,
        ref: "UserModel"
    }

})

const PostModel = mongoose.model('PostModel', PostSchema)
module.exports = PostModel