// Post model ko import kar rahe hai (Post schema jisme title, body, likes aur comments ka data hota hai)
const Post = require("../models/postModel")


// -------------------- CREATE POST --------------------

exports.createPost = async (req, res) => {
    try {
        // request body se title aur body nikal rahe hai
        const { title, body } = req.body;

        // naya Post object bana rahe hai title aur body ke sath
        const post = new Post({ title, body });

        // Post ko database me save kar rahe hai
        const savedPost = await post.save();

        // response me saved post return kar rahe hai
        res.json({
            post: savedPost
        })
    }
    catch (err) {
        // agar error aata hai to 400 status ke sath error message bhej rahe hai
        return res.status(400).json({
            error: "Error While Creating Post"
        })
    }
}


// -------------------- GET ALL POSTS --------------------

exports.getAllPosts = async (req, res) => {
    try {
        // saare posts fetch kar rahe hai Post collection se
        // const posts = await Post.find();  // ye simple query hoti jo sirf post deta

        // yaha likes aur comments ko bhi populate kar rahe hai 
        // (iska matlab: sirf IDs ke jagah actual Like aur Comment documents aayenge)
        const posts = await Post.find()
            .populate("likes")    // likes array ke andar Like documents laa raha hai
            .populate("comments") // comments array ke andar Comment documents laa raha hai
            .exec();              // query execute kar di

        // response me posts data bhej rahe hai
        res.json({
            data: posts,
        })
    }
    catch (err) {
        // agar error aata hai to 400 status ke sath error message bhejna
        return res.status(400).json({
            error: "Error while Fetching Post "
        })
    }
}
