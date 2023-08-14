const User = require("../models/User");

/* READ */
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

/* UPDATE */

const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      await User.updateOne({ _id: user._id }, { $pull: { friends: friendId } });

      await User.updateOne(
        { _id: friend._id },
        { $pull: { friends: user._id } }
      );
    } else {
      await User.updateOne({ _id: user._id }, { $push: { friends: friendId } });

      await User.updateOne(
        { _id: friend._id },
        { $push: { friends: user._id } }
      );
    }

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

module.exports = { getUser, getUserFriends, addRemoveFriend };
