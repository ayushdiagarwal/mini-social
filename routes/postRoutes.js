const express = require("express");
const { getPost, getPosts, createPost, updatePost, deletePost } = require("../controllers/postController");
const router = express.Router();

// There is an issue with validation token

// after the user has signed in, they are assigned a jwt which is their validation token and will be used for guture operations
// const validateToken = require("../middleware/validateTokenHandler");
// router.use(validateToken);

router.route("/:id").get(getPost);

router.route("/").get(getPosts);
router.route("/").post(createPost);
router.route("/:id").put(updatePost);
router.route("/:id").delete(deletePost);

module.exports = router;