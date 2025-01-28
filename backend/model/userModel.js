const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    profileImage: String
    //confirmPassword: {type: String, required: true}
  },
  {
    timestamps: true //createdAt and updatedAt
  }
);

exports.User = mongoose.model("User", userSchema);
