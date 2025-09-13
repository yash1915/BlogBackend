const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  likes: [
    {
      user: { type: String, required: true }  // sirf username save kar rahe
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
