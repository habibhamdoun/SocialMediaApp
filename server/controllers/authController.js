import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

// 🛠 Helper to generate and send OTP
const sendOtpToUser = async (user, subject, messageText) => {
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  const expireAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  user.verifyOtp = otp;
  user.verifyOtpExpiredAt = expireAt;
  await user.save();

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: user.email,
    subject: subject,
    text: `${messageText} Your OTP is ${otp}.`,
  };

  await transporter.sendMail(mailOptions);
};

export const register = async (req, res) => {
  const { name, username, email, password } = req.body;
  const profilePicture = req.file ? req.file.path : "";

  if (!name || !username || !email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.json({
        success: false,
        message: "User with this email already exists. Please Login",
      });
    }

    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      return res.json({
        success: false,
        message: "Username is already taken. Please choose another one",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      username,
      email,
      password: hashPassword,
      profilePicture,
      isVerified: false,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    await sendOtpToUser(
      user,
      "Welcome to Yap - Verify Your Email",
      `Welcome ${name}!`
    );

    return res.json({
      success: true,
      message: "User created successfully. OTP sent to email.",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email/Username and Password are required",
    });
  }

  try {
    const user = await userModel.findOne({
      $or: [{ email: email }, { username: email }],
    });

    if (!user) {
      return res.json({ success: false, message: "Invalid email/username" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    if (!user.isVerified) {
      await sendOtpToUser(
        user,
        "Verify Your Email",
        "You attempted to login, but your email is not verified yet."
      );

      return res.json({
        success: false,
        message: "Email not verified. OTP has been sent to your email.",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "Login successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logged Out successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpiredAt < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }

    user.isVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpiredAt = 0;

    await user.save();

    res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const expireAt = Date.now() + 15 * 60 * 1000; // 15 minutes

    user.resetOtp = otp;
    user.resetOtpExpireAt = expireAt;

    // ✅ Also update verification OTP fields
    user.verifyOtp = otp;
    user.verifyOtpExpiredAt = expireAt;

    await user.save();

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP for resetting your password is ${otp}. Use this OTP to proceed with resetting your password.`,
    });

    res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.json({
      success: false,
      message: "Email, OTP, and new password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();

    res.json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
