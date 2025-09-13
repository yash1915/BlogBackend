// Post aur Comment models import
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");


// ==============================
// Create Comment
// ==============================
exports.createComment = async (req, res) => {
  try {
    const { post, user, body } = req.body;

    if (!post || !user || !body) {
      return res.status(400).json({
        success: false,
        error: "Post, user, and body are required",
      });
    }

    const comment = new Comment({ post, user, body });
    const savedComment = await comment.save();

    // Post ke comments array me add karo
    await Post.findByIdAndUpdate(post, {
      $push: { comments: savedComment._id },
    });

    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      comment: savedComment,
    });
  } catch (err) {
    console.error("❌ Error in createComment:", err.message);
    return res.status(500).json({
      success: false,
      error: "Error while creating comment",
    });
  }
};


// ==============================
// Get Comments for a Post
// ==============================
exports.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({
        success: false,
        error: "Post ID is required",
      });
    }

    const comments = await Comment.find({ post: postId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      postId,
      comments,
    });
  } catch (err) {
    console.error("❌ Error in getCommentsByPost:", err.message);
    return res.status(500).json({
      success: false,
      error: "Error while fetching comments",
    });
  }
};


// ==============================
// Delete Comment
// ==============================
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        error: "Comment not found",
      });
    }

    // Post se bhi comment id remove kar do
    await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: id },
    });

    await Comment.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (err) {
    console.error("❌ Error in deleteComment:", err.message);
    return res.status(500).json({
      success: false,
      error: "Error while deleting comment",
    });
  }
};


// ==============================
// Update Comment
// ==============================
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req.body;

    const comment = await Comment.findByIdAndUpdate(
      id,
      { body },
      { new: true, runValidators: true }
    );

    if (!comment) {
      return res.status(404).json({
        success: false,
        error: "Comment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment,
    });
  } catch (err) {
    console.error("❌ Error in updateComment:", err.message);
    return res.status(500).json({
      success: false,
      error: "Error while updating comment",
    });
  }
};
