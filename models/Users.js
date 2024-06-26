const mongoose = require("mongoose");

const { Schema } = mongoose;
const validator = require("validator");

const UsersSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
      validate: [
        {
          validator: (value) => validator.isEmail(value),
          msg: "Invalid email",
        },
      ],
    },
    password: {
      type: String,
      trim: true,
      required: true,
      validate: [
        {
          validator: function (value) {
            return value.length >= 6;
          },
          msg: "Password length must be at least 6 characters",
        },
      ],
    },

    refreshToken: String,
    role: {
      type: String,
      enum: ["admin", "teacher"],
      required: true,
    },
  },
  { timestamps: true, get: (time) => time.toDateString() }
);

UsersSchema.methods.isValidRefreshToken = function (providedRefreshToken) {
  return this.refreshToken === providedRefreshToken;
};

module.exports = mongoose.model("Users", UsersSchema);
