const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");

//@desc Get all posts
//@route Get /api/posts
//@access private
const getPosts = asyncHandler(async(req, res) => {
    // get all posts
    res.status(200).json({message: `Get all posts`});
})

//@desc Create a new post
//@route POST /api/post/create
//@access private
const createPost = asyncHandler(async(req,res)=>{
    console.log("Trying to create a post ... ");
    const {title, body, likes} = req.body;
    if (!title || !body) {
        res.status(400);
        throw new Error("A post must have a title, body and a user");
    }

    const post = await Post.create({
        title,
        body,
        user: req.user.id,
        likes,
    });
    res.status(201).json(post);
});

//@desc Get a post
//@route GET /api/post/:id
//@access private
const getPost = asyncHandler(async(req, res)=> {
    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    res.status(200).json(post);
});

//@desc delete a post
//@route DELETE /api/post/:id
//@access private
const deletePost = asyncHandler(async(req,res)=>{
    const post = await Post.findById(req.params.id);
    if(!post){
        res.status(404);
        throw new Error("Post not found");
    }

    if (post.user.toString() !== req.user.id){
        res.status(403);
        throw new Error("User doesn't have permission to delete other's post");
    }

    await Post.deleteOne({id:req.params.id}); 
    res.status(200).json({message: "Post deleted Successfully"});
});

//@desc Update Contact
//@route PUT /api/post/:id
//@access private
const updatePost = asyncHandler(async(req, res)=> {
    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    if (post.user.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to delete other's posts");
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.status(201).json(updatedPost);
})


module.exports = {getPost, getPosts, createPost, deletePost, updatePost};