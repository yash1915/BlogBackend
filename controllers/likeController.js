// Post ka model import kar rahe hai (Post schema jisme comments/likes ka array hoga)
const Post = require("../models/postModel");

// Like ka model import kar rahe hai (Like schema jisme post aur user ki info store hoti hai)
const Like = require("../models/likeModel");

// express se response object import kar rahe hai (yaha use nahi ho raha hai)
const { response } = require("express");


// -------------------- LIKE POST --------------------

// LikePost function export kar rahe hai jo async hai (kyunki db operations involved hai)
exports.likePost = async (req, res) => {
  try {
    // request body se post id aur user id nikal rahe hai
    const { post, user } = req.body;

    // naya like object bana rahe hai Like model ka use karke
    const like = new Like({
      post,
      user,
    });

    // is naye like ko database me save kar rahe hai
    const savedLike = await like.save();

    // Post ko update kar rahe hai (us post ke likes array me savedLike ki id push kar rahe hai)
    const updatedPost = await Post.findByIdAndUpdate(
      post,                                 // jis post ko like karna hai uski id
      { $push: { likes: savedLike._id } },  // likes array me like ki id add karo
      { new: true }                         // updated post return kare
    )
      .populate("likes") // likes array ko actual Like documents ke sath populate kar rahe hai
      .exec();           // query ko execute kar diya

    // response bhej rahe hai updatedPost ke sath
    res.json({
      post: updatedPost,
    });
  } catch (err) {
    // agar error aaya to 500 status ke sath error message bhejna
    return res.status(500).json({
      error: "Error While Like Post",
    });
  }
};


// -------------------- UNLIKE POST --------------------

// unlikePost function export kar rahe hai
exports.unlikePost = async (req, res) => {
  try {
    // request body se post id aur like id nikal rahe hai
    const { post, like } = req.body;

    // Like collection se wo like dhundh ke delete kar rahe hai 
    // (jo specific post aur like id match karta hai)
    const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });

    // Post collection ko update kar rahe hai
    // us post ke likes array me se deletedLike ki id ko remove (pull) kar rahe hai
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: deletedLike._id } }, // likes array se id hata do
      { new: true }                          // updated post return kare
    );

    // response bhej rahe hai updatedPost ke sath
    res.json({
      post: updatedPost,
    });
  } catch (err) {
    // agar error aata hai to 500 ke sath error message bhej rahe hai
    return res.status(500).json({
      error: "Error While unLike Post",
    });
  }
};
