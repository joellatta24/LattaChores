const Chore = require("../models/chore.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.JWT_SECRET;

module.exports = {
  getChores: (req, res) => {
    Chore.find({ claimed: false })
      .populate("createdBy", "firstName lastName")
      .then((chores) => {
        res.json(chores);
      })
      .catch((err) => {
        res.status(400).json({
          message: "Something went wrong finding all chores.",
          error: err,
        });
      });
  },
  createChore: (req, res) => {
    const user = jwt.verify(req.cookies.userToken, SECRET);
    Chore.create({ ...req.body, createdBy: user._id })
      .then((newChore) => {
        res.status(201).json(newChore);
      })
      .catch((err) => {
        res.status(400).json({
          message: "Something went wrong creating a chore.",
          error: err,
        });
      });
  },
  getChoreById: (req, res) => {
    Chore.findOne({ _id: req.params.id })
      .populate("createdBy", "firstName lastName")
      .then((chore) => {
        res.json(chore);
      })
      .catch((err) => {
        res.status(400).json({
          message: "Something went wrong finding one chore.",
          error: err,
        });
      });
  },

  updateChore: (req, res) => {
    console.log("Logging the Params ID", req.params.id);
    Chore.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .then((chore) => {
        console.log("Chore Object", chore);
        res.json(chore);
      })
      .catch((err) => {
        res.status(400).json({
          message: "Something went wrong updating a chore.",
          error: err,
        });
      });
  },

  deleteChore: (req, res) => {
    Chore.deleteOne({ _id: req.params.id })
      .then((chore) => {
        res.json(chore);
      })
      .catch((err) => {
        res.status(400).json({
          message: "Something went wrong deleting a chore.",
          error: err,
        });
      });
  },
};
