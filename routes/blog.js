const express = require('express');
const router = express.Router();

// Import Controller 
const {createComment} = require("../controllers/commentController");
const {createPost,getAllPosts} = require("../controllers/postController");
const {likePost,unlikePost} = require("../controllers/likeController");

// Mapping Create
router.post("/comments/create",createComment)
router.post("/posts/create",createPost)
router.get("/posts",getAllPosts)
router.post("/likes/like",likePost)
router.post("/likes/unlike",unlikePost)
router.get("/posts/test", (req, res) => {
    res.json({ message: "Test route is working!" });
});

// Export Controller
module.exports = router;