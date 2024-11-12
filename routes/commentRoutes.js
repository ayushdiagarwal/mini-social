const express = require("express");
const router = express.Router();
const { getComment, getComments, createComment, deleteComment } = require("../controllers/commentController");

// after the user has signed in, they are assigned a jwt which is their validation token and will be used for future operations
const validateToken = require("../middleware/validateTokenHandler");
console.log(validateToken);

// Public routes (GET requests)
// router.route("/:id").get(getComment);
router.route("/:postId").get(getComments);

// Private routes (POST, DELETE requests)
router.post("/", createComment);
router.delete("/:postId", validateToken, deleteComment);

module.exports = router;