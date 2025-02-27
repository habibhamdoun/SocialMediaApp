import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  addFriend,
  deleteFriend,
  getFriends,
  getUserData,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/data", userAuth, getUserData);
userRouter.post("/add-friend", userAuth, addFriend);
userRouter.post("/delete-friend", userAuth, deleteFriend);
userRouter.post("/get-friends", userAuth, getFriends);

export default userRouter;
