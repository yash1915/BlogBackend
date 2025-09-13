const Post = require("../models/postModel");

// -------------------- TOGGLE LIKE --------------------
exports.toggleLike = async (req, res) => {
  try {
    const { post, user } = req.body;

    const postDoc = await Post.findById(post);
    if (!postDoc) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }

    // check if user already liked
    const alreadyLiked = postDoc.likes.find(like => like.user === user);

    if (alreadyLiked) {
      // unlike: remove user from likes
      postDoc.likes = postDoc.likes.filter(like => like.user !== user);
    } else {
      // like: add new like
      postDoc.likes.push({ user });
    }

    await postDoc.save();

    return res.json({
      success: true,
      post: postDoc
    });
  } catch (err) {
    console.error("❌ Error in toggleLike:", err.message);
    return res.status(500).json({
      success: false,
      error: "Error while toggling like"
    });
  }
};

