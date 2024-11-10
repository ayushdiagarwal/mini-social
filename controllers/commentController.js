const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");

//@desc Get all comments
//@route Get /api/comments
//@access private
const getComments = asyncHandler(async(req, res) => {
    // get all comments
    res.status(200).json({message: `Get all comments`});
})

//@desc Create a new comment
//@route comment /api/comment/create
//@access private
const createComment = asyncHandler(async(req,res)=>{
    const {title, body, likes} = req.body;
    if (!title || !body) {
        res.status(400);
        throw new Error("A comment must have a title, body and a user");
    }

    const comment = await Comment.create({
        title,
        body,
        user: req.user.id,
        likes,
    });
    res.status(201).json(comment);
});

//@desc Get a comment
//@route GET /api/comment/:id
//@access private
const getComment = asyncHandler(async(req, res)=> {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
        res.status(404);
        throw new Error("comment not found");
    }

    res.status(200).json(comment);
});

//@desc delete a comment
//@route DELETE /api/comment/:id
//@access private
const deleteComment = asyncHandler(async(req,res)=>{
    const comment = await Comment.findById(req.params.id);
    if(!comment){
        res.status(404);
        throw new Error("comment not found");
    }

    if (comment.user.toString() !== req.user.id){
        res.status(403);
        throw new Error("User doesn't have permission to delete other's comment");
    }

    await Comment.deleteOne({id:req.params.id}); 
    res.status(200).json({message: "comment deleted Successfully"});
});


module.exports = {getComment, getComments, createComment, deleteComment};