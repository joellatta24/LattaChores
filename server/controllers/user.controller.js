const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

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
    res.json(e);
  }
};

const login = async (req, res) => {
  const userDoc = await User.findOne({ email: req.body.email });
  if (!userDoc) {
    res.status(400).json({ message: "Invalid Login" });
  } else {
    try {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        userDoc.password
      );
      if (!isPasswordValid) {
        res.status(400).json({ message: "Invalid Login" });
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

module.exports = {
  register,
  login,
  logout,
  getLoggedInUser,
};
