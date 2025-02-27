import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId).populate("friends").exec();

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const addFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    if (userId === friendId) {
      return res.json({
        success: false,
        message: "You cannot add yourself as a friend",
      });
    }

    const user = await userModel.findById(userId);
    const friend = await userModel.findById(friendId);

    if (!user || !friend) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.friends.includes(friendId)) {
      return res.json({ success: false, message: "Already friends" });
    }

    user.friends.push(friendId);
    friend.friends.push(userId);

    await user.save();
    await friend.save();

    return res.json({ success: true, message: "Friend added successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const deleteFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    if (userId === friendId) {
      return res.json({
        success: false,
        message: "You cannot unfriend yourself",
      });
    }

    const user = await userModel.findById(userId);
    const friend = await userModel.findById(friendId);

    if (!user || !friend) {
      return res.json({ success: false, message: "User not found" });
    }

    if (!user.friends.includes(friendId)) {
      return res.json({ success: false, message: "They are not friends" });
    }

    user.friends = user.friends.filter((id) => id.toString() !== friendId);
    friend.friends = friend.friends.filter((id) => id.toString() !== userId);

    await user.save();
    await friend.save();

    return res.json({ success: true, message: "Friend removed successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getFriends = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId).populate("friends").exec();

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, friends: user.friends });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
