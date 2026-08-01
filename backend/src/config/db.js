const mongoose = require("mongoose");
const config = require("./config");

async function connectDB() {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Database connected");
  } catch (err) {
    console.log(err);
    console.log("Database connection failed");
  }
}

module.exports = connectDB;
