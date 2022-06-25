const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
const Chore = require("../models/chore.model");

const register = async (req, res) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save();
    console.log("NEW USER", newUser);
    const userToken = jwt.sign(
      {
        _id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
      SECRET
    );
    console.log("Testing here!");
    res
      .status(201)
      .cookie("userToken", userToken, {
        expires: new Date(Date.now() + 259200000),
      })
      .json({
        successMessage: "user created",
        user: {
          _id: newUser._id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
        },
      });
  } catch (e) {
    console.log("Error Creating User", e);
    res.status(400).json(e);
  }
};

const login = async (req, res) => {
  const userDoc = await User.findOne({ email: req.body.email });
  if (!userDoc) {
    res.status(400).json({ message: "Invalid Login!" });
  } else {
    try {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        userDoc.password
      );
      if (!isPasswordValid) {
        res.status(400).json({ message: "Invalid Login!" });
      } else {
        const userToken = jwt.sign(
          {
            _id: userDoc._id,
            email: userDoc.email,
            firstName: userDoc.firstName,
            lastName: userDoc.lastName,
          },
          SECRET
        );
        res
          .status(201)
          .cookie("userToken", userToken, {
            expires: new Date(Date.now() + 259200000),
          })
          .json({
            successMessage: "user created",
            user: {
              _id: userDoc._id,
              email: userDoc.email,
              firstName: userDoc.firstName,
              lastName: userDoc.lastName,
            },
          });
      }
    } catch (e) {
      console.log("Login Error", e);
      res.status(400).json({ message: "Invalid Login" });
    }
  }
};

const logout = (req, res) => {
  res.clearCookie("userToken");
  res.json({ message: "You are logged out!" });
};

const getLoggedInUser = async (req, res) => {
  try {
    const userPayload = await jwt.verify(req.cookies.userToken, SECRET);
    console.log("USER", userPayload);
    const user = await User.findOne({ _id: userPayload._id });
    res.json(user);
  } catch (e) {
    console.log("Error Finding user!", e);
    res.status(400).json({ e });
  }
};

const updateUsersWithChores = (req, res) => {
  const user = jwt.verify(req.cookies.userToken, SECRET);
  console.log("This is the console log!", user);
  User.findByIdAndUpdate(
    { _id: user._id },
    { $push: { claimedChores: [req.body.choreId] } },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("claimedChores", "_id title description location")
    .then((user) => {
      // console.log( user);
      Chore.findByIdAndUpdate(
        { _id: req.body.choreId },
        { claimed: true }
      ).then((user) => {
        // console.log(user);
        res.json(user);
      });
    })
    .catch((err) => {
      console.log("error message", err);
      res.status(400).json({
        message: "Something went wrong claiming a chore.",
        error: err,
      });
    });
};

const getUserClaimedChores = (req, res) => {
  const user = jwt.verify(req.cookies.userToken, SECRET);
  User.findById(user._id)
    .populate("claimedChores", "_id title description location")
    .then((user) => {
      console.log("Success!");
      res.json(user);
    })
    .catch((err) => {
      console.log("error message", err);
      res.status(400).json({
        message: "Something went wrong claiming a chore.",
        error: err,
      });
    });
};

module.exports = {
  register,
  login,
  logout,
  getLoggedInUser,
  updateUsersWithChores,
  getUserClaimedChores,
};
