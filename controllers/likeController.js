const Post = require("../models/postModel");

// -------------------- TOGGLE LIKE --------------------
exports.toggleLike = async (req, res) => {
  try {
    const { post, user } = req.body;

    if (!post || !user) {
      return res.status(400).json({
        success: false,
        error: "Post ID and user are required",
      });
    }

    // post find karo
    const postDoc = await Post.findById(post);
    if (!postDoc) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }

    // check if user already liked
    const alreadyLiked = postDoc.likes.some(like => like.user === user);

    if (alreadyLiked) {
      // unlike: remove user from likes
      postDoc.likes = postDoc.likes.filter(like => like.user !== user);
    } else {
      // like: add new like
      postDoc.likes.push({ user });
    }

    // save post with updated likes
    await postDoc.save();

    return res.status(200).json({
      success: true,
      message: alreadyLiked ? "Post unliked successfully" : "Post liked successfully",
      likesCount: postDoc.likes.length,
      post: postDoc,
    });

  } catch (err) {
    console.error("❌ Error in toggleLike:", err.message);
    return res.status(500).json({
      success: false,
      error: "Error while toggling like",
      details: err.message,
    });
  }
};
