const express = require("express");
const { getPost, getPosts, createPost, updatePost, deletePost } = require("../controllers/postController");
const router = express.Router();

// There is an issue with validation token

// after the user has signed in, they are assigned a jwt which is their validation token and will be used for guture operations
const validateToken = require("../middleware/validateTokenHandler");
console.log(validateToken);

// Public routes (GET requests)
router.route("/:id").get(getPost);
router.route("/").get(getPosts);

// Private routes (POST, PUT, DELETE requests)
router.post("/", validateToken, createPost);
router.put("/:id", validateToken, updatePost);
router.delete("/:id", validateToken, deletePost);

module.exports = router;