const validationResult = require('express-validator').validationResult;
const Post = require('../../models/post-model');
const Category = require('../../models/category-model');

const addPost = async (req, res) => {
  try {
      const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            success: false,
            msg: "Validation errors",
            errors: errors.array() ,
          });
        }

    const { title,description } = req.body;

    const obj = {
      title,
      description,
      userId: req.user._id,
    };
        if (req.body.categories) {
          obj.categories = req.body.categories
         
      }
    const post = new Post(obj);

      const postData = await post.save();

    const detailedPostData=  await Post.findOne({ _id: postData._id }).populate('categories');
      return res.status(201).json({
        success: true,
        message: "Post added successfully",
        data: detailedPostData,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user._id });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
} 

const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const updatePost = async (req, res) => {
    try {
        const post = await Post.findOneAndUpdate(
          { _id: req.params.id, userId: req.user._id },
          req.body
        );
        if (!post) {
          return res.status(404).json({ success: false, message: "Post not found" });
        }
      
        res.status(200).json({ success: true, message: "Post updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addPost,
    getPosts,
    deletePost,
    updatePost

}