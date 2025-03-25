import express from "express";
import {
  isAuthenticated,
  login,
  logout,
  register,
  resetPassword,
  sendResetOtp,
  verifyEmail,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profiles");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const authRouter = express.Router();

authRouter.post("/register", upload.single("profilePicture"), register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.post("/verify-account", userAuth, verifyEmail);
authRouter.post("/is-auth", userAuth, isAuthenticated);

authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post("/reset-password", resetPassword);

export default authRouter;
