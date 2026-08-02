const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "UserId is required"],
    },
    refreshToken: {
      type: String,
      required: [true, "Token is required"],
    },
    ipAddress: {
      type: String,
      required: [true, "IP Address is required"],
    },
    userAgent: {
      type: String,
      required: [true, "User Agent is required"],
    },
    revoked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const sessionModel = mongoose.model("sessions", sessionSchema);

module.exports = sessionModel;
