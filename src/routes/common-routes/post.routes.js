const express = require("express");
const postController = require("../../controllers/common/post.controller");
const {
  postAddValidator,
  postDeleteValidator,
  postUpdateValidator,
} = require("../../utils/validators/post-validator");
const { verifyToken } = require("../../middlewares/auth.middleware");

const router = express.Router();

// Add Post Route
router.post(
  "/add-post",
  verifyToken,
  postAddValidator,
  postController.addPost
);
router.get("/get-posts", verifyToken, postController.getPosts);
router.delete(
  "/delete-post",
  verifyToken,
  postDeleteValidator,
  postController.deletePost
);
router.put(
  "/update-post",
  verifyToken,
  postUpdateValidator,
  postController.updatePost
);



module.exports = router;


