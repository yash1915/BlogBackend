// postModel ko import kar rahe hai jisme Post ka schema/model bana hai
const Post = require("../models/postModel");

// commentModel ko import kar rahe hai jisme Comment ka schema/model bana hai
const Comment = require("../models/commentModel");

// express se response object import kar rahe hai (yaha use nahi ho raha hai but import kiya gaya hai)
const { response } = require("express");

// async kyun use karte hai? 
// -> kyunki db interaction ek tarah ka network call hota hai jo time le sakta hai. 
// Hum nahi chahte ki hamara main thread block ho jaye, 
// isliye async/await use karke usko asynchronously (alag se) execute karte hai.

// Business Logic likhi ja rahi hai - createComment function ke liye
exports.createComment = async (req, res) => {
    try {
        // request body se data nikal rahe hai (post id, user id aur comment ka body)
        const { post, user, body } = req.body;

        // naya comment object bana rahe hai Comment model ka use karke
        const comment = new Comment({
            post, user, body
        })

        // naye comment object ko database me save kar rahe hai
        const savedComment = await comment.save();

        // ab Post ko uske id ke through dhund rahe hai aur 
        // us Post ke comments array me naya comment (id) push kar rahe hai
        const updatedPost = await Post.findByIdAndUpdate(
            post,                              // jis post pe comment karna hai uski id
            { $push: { comments: savedComment._id } }, // post ke comments array me comment ki id dal do
            { new: true }                      // updated document return karega (old nahi)
        )
        .populate("comments") // comments array ko actual comment documents se populate kar rahe hai
        .exec();              // query ko execute kar rahe hai

        // response bhej rahe hai updated post ke sath (jisme naya comment add ho chuka hai)
        res.json({
            post: updatedPost,
        })
    }
    catch (err) {
        // agar koi error aata hai to status 500 ke sath error message bhej rahe hai
        return res.status(500).json({
            error : "Error while creating comment",            
        })
    }
}
