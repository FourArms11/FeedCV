const mongoose = require("mongoose");

const tokenBlacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required to blacklist."],
    },
  },
  {
    timestamps: true,
  },
);

const blackListTokenModel = mongoose.model("TokenBlacklist", tokenBlacklistSchema);

module.exports = blackListTokenModel
