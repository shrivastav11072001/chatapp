const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const generateTokenAndSetCookie = require("../utils/generateToken.js");

exports.signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ username: username });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const profilePicUrl = `https://avatar.iran.liara.run/public/${
      req.body.gender === "male" ? "boy" : "girl"
    }?username=${req.body.username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: profilePicUrl,
    });

    if (newUser) {
      // generateTokenAndSetCookie()
      await newUser.save();
      const token = jwt.sign({ username, password }, process.env.SECRET, {
        expiresIn: "15d",
      });

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
        token: token,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error is in singup controller", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      res.status(400).send({ error: "Invalid username or password" });
    }

    // generateTokenAndSetCookie(user._id,res)
    const token = jwt.sign({ username, password }, process.env.SECRET, {
      expiresIn: "15d",
    });
    res.status(200).send({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
      token: token,
    });
  } catch (error) {
    console.log("Error is in login controller", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
exports.logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).send({ message: "Logout Succesfully" });
  } catch (error) {
    console.log("Error is in logout controller", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
