const mongoose = require("mongoose");

// each comment is associated with a user and a post
// should not be able to make a comment if there is no user/post
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
    // change this to required later
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