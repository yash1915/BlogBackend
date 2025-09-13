const express = require("express");
const router = express.Router();

// -------------------- CONTROLLERS --------------------
const { 
  createPost, 
  getAllPosts, 
  getPostById, 
  deletePost,
  updatePost            // ✅ update bhi add kar diya
} = require("../controllers/postController");

const { 
  toggleLike            // ✅ ek hi like/unlike function
} = require("../controllers/likeController");

const { 
  createComment, 
  getCommentsByPost, 
  deleteComment
} = require("../controllers/commentController");

// -------------------- POST ROUTES --------------------
router.post("/posts/create", createPost);
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.put("/posts/:id", updatePost);       // ✅ update route
router.delete("/posts/:id", deletePost);

// -------------------- LIKE ROUTE (Toggle) --------------------
router.post("/likes/toggle", toggleLike);   // ✅ like/unlike same endpoint

// -------------------- COMMENT ROUTES --------------------
router.post("/comments/create", createComment);
router.get("/comments/:postId", getCommentsByPost);
router.delete("/comments/:id", deleteComment);

// -------------------- TEST ROUTE --------------------
router.get("/posts/test", (req, res) => {
  res.json({ message: "✅ Test route is working!" });
});

// -------------------- EXPORT --------------------
module.exports = router;
