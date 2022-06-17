const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required!"],
      minlength: [2, "First Name must be at least two characters!"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required!"],
      minlength: [2, "Last Name must be at least two characters!"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email Address is required!"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: [8, "Password must be at least 8 characters!"],
    },
    claimedChores: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chore" }],
  },
  {
    timestamps: true,
  }
);

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Passwords must match!");
  }
  next();
});
UserSchema.pre("save", async function (next) {
  try {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (e) {
    console.log("Error in Hashing", e);
    next(e.message);
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
