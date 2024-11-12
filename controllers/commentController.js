const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");

//@desc Get all comments
//@route Get /api/posts/:postId/comments
//@access public
const getComments = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    console.log(`postId: ${postId}`);
  
    try {
      const comments = await Comment.find({ postId: postId });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: "Server error while fetching the comments" });
    }
  });


//@desc Create a new comment
//@route POST /api/posts/:postId/comments
//@access private
const createComment = asyncHandler(async(req,res)=>{
    const {content, likes, postId} = req.body;
    if (!content || !postId) {
        res.status(400);
        throw new Error("A comment must have a title, body and a user");
    };

    const comment = await Comment.create({
        content,
        user: req.user.id,
        postId,
        likes,
    });
    res.status(201).json(comment);
});

//@desc Get a comment
//@route GET /api/posts/:postId/comments/:id
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
//@route DELETE /api/posts/:postId/comments/:id
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