const express = require("express");
const { verifyToken } = require("../middleware/auth");
const {
  getUserPosts,
  likePost,
  getFeedPosts,
} = require("../controllers/posts");
const router = express.Router();

/* READ */
router.route("/").get(verifyToken, getFeedPosts);
router.route("/:userId/posts").get(verifyToken, getUserPosts);

/* UPDATE */
router.route("/:id/like").patch(verifyToken, likePost);

module.exports = router;
