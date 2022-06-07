const mongoose = require("mongoose");

const ChoreSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A title for your chore is required!"],
      minlength: [3, "Chore title must be at least 3 characters!"],
    },
    description: {
      type: String,
      required: [true, "A description is required!"],
      minlength: [10, "The description must be at least 10 characters!"],
    },
    location: {
      type: String,
      required: [true, "A location is required!"],
      minlength: [1, "The location cannot be blank!"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
    }
  },
  {
    timestamps: true,
  }
);

const Chore = mongoose.model("Chore", ChoreSchema);
module.exports = Chore;
