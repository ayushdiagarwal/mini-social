const mongoose = require("mongoose");

// each post is associated with a user
const postSchema = mongoose.Schema({
    title: {
        type:String,
        required: [true, "Please add the post title"],
    },
    body: {
        type: String,
        required: [true, "Please add the post body"],
    },
    // change this to required later
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    // right now, I'm only keeping like of the count of likes
    // I can add functionality for keeping the list of people who liked the post later
    likes: {
        type: Number, 
        default: 0,
    }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Post", postSchema);