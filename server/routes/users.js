const express = require("express");
const {
  getUser,
  getUserFriends,
  addRemoveFriend,
} = require("../controllers/users");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

/* READ */
router.route("/:id").get(verifyToken, getUser);
router.route("/:id/friends").get(verifyToken, getUserFriends);

/* UPDATE */
router.route("/:id/:friendId").patch(verifyToken, addRemoveFriend);

module.exports = router;
