const mongoose = require("mongoose");

// each comment is associated with a user and a post
const commentSchema = mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    content: {
        type: String,
        required: [true, "A comment can't be empty"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    // only need to keep track of the count of likes not who liked the post
    likes: {
        type: Number, 
        default: 0,
    }
    },
        {
            timestamps: true,
        }
);

module.exports = mongoose.model("Comment", commentSchema);