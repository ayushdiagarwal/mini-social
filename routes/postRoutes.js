const express = require("express");
const { getPost, getPosts, createPost, updatePost, deletePost, updateLikes } = require("../controllers/postController");
const router = express.Router();

// after the user has signed in, they are assigned a jwt which is their validation token and will be used for future operations
const validateToken = require("../middleware/validateTokenHandler");
console.log(validateToken);

// Public routes (GET requests)
router.route("/:id").get(getPost);
router.route("/").get(getPosts);

// Private routes (POST, PUT, DELETE, PATCH requests)
router.post("/", validateToken, createPost);
router.put("/:id", validateToken, updatePost);
router.delete("/:id", validateToken, deletePost);

// This is the reason why the like button won't be working until you make the authentication in the frontend
router.patch("/:id/", validateToken, updateLikes);

module.exports = router;