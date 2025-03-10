const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
profileRouter.post("/profile/forgot-password", async (req, res) => {
  try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(404).json({ message: "User not found" });
      
      const resetLink = `${process.env.CLIENT_URL}/reset-password/${generateToken(user._id)}`;
      await sendEmail(user.email, "Password Reset Request", `Click the link to reset your password: ${resetLink}`);
      
      res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
      res.status(500).json({ message: "Server error" });
  }
});

module.exports = profileRouter;
