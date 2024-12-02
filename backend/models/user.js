const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userschema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    username: {
      type: String,
      unique: true,
      minlength: 4,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum password length
    },
    confirmPassword: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords don't match",
      },
    },
  },
  { timestamps: true }
);

const existedUser = await User.findOne({
  $or: [{ username }, { email }],
});
console.log(existedUser);
if (existedUser)
  throw new ApiError(409, "User with email or username already exists");

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  this.confirmPassword = undefined;
  next();
});

module.exports = mongoose.model("user", userschema);
