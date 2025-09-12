// Mongoose ko import kar rahe hai (MongoDB ke sath interact karne ke liye use hota hai)
const mongoose = require('mongoose')


// -------------------- COMMENT SCHEMA BANANA --------------------

// ek naya schema define kar rahe hai jiska naam commentSchema hai
const commentSchema = new mongoose.Schema({

    // kis post pe comment kiya gaya hai uski reference id yaha store hogi
    post: {
        type: mongoose.Schema.Types.ObjectId, // Post ki ObjectId yaha store hogi
        ref : "Post"                          // ye batata hai ki ye id Post model ko refer karti hai
    },

    // kis user ne comment likha uska naam/id yaha string me store hoga
    user: {
        type: String,
        required: true,  // user ka naam mandatory hai
    },    

    // actual comment ka content (text body) yaha store hoga
    body: {
        type: String,
        required: true,  // comment ka content bhi mandatory hai
    }    
})


// -------------------- EXPORT MODEL --------------------

// is schema ko "Comment" naam ke model ke roop me export kar rahe hai
// taaki isse db ke andar 'comments' collection ban jaye aur hum isse CRUD operations kar sake
module.exports = mongoose.model("Comment", commentSchema)
