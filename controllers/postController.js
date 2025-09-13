// Post model ko import kar rahe hai
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const Like = require("../models/likeModel");


// -------------------- CREATE POST --------------------
exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({
        success: false,
        error: "Title and body are required",
      });
    }

    const post = new Post({ title, body });
    const savedPost = await post.save();

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: savedPost,
    });
  } catch (err) {
    console.error("❌ Error in createPost:", err.message);
    return res.status(500).json({
      success: false,
      error: "Error while creating post",
    });
  }
};


// -------------------- GET ALL POSTS --------------------
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("likes")
      .populate("comments")
      .sort({ createdAt: -1 })
      .exec();

    return res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (err) {
    console.error("❌ Error in getAllPosts:", err.message);
    return res.status(500).json({
      success: false,
      error: "Error while fetching posts",
    });
  }
};


// -------------------- GET SINGLE POST BY ID --------------------
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id)
      .populate("likes")
      .populate("comments")
      .exec();

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      post,
    });
  } catch (err) {
    console.error("❌ Error in getPostById:", err.message);
    return res.status(500).json({
      success: false,
      error: "Error while fetching post",
    });
  }
};


// -------------------- DELETE POST --------------------
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    // sirf Post delete karna hai, kyunki comments aur likes ab embedded arrays me hain
    await Post.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (err) {
    console.error("❌ Error in deletePost:", err.message);
    return res.status(500).json({
      success: false,
      error: "Error while deleting post",
      details: err.message,
    });
  }
};


// -------------------- UPDATE POST --------------------
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    const post = await Post.findByIdAndUpdate(
      id,
      { title, body },
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post,
    });
  } catch (err) {
    console.error("❌ Error in updatePost:", err.message);
    return res.status(500).json({
      success: false,
      error: "Error while updating post",
    });
  }
};
