const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blackListToken = require("../models/blacklist.model");
const { generateOTP, sendOTP } = require("../utils/otp.utils");
const client = require("../config/redis.client");

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide all the fields",
    });
  }

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    if (isUserAlreadyExist.username === username) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    if (isUserAlreadyExist.email === email) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
  }

  const existingOtp = await client.get(`otp:${email}`);
  if (existingOtp) {
    return res.status(429).json({
      message: "OTP already sent. Please wait before requesting another one.",
    });
  }

  const otp = generateOTP();

  const hash = await bcrypt.hash(password, 10);

  // Store the pending user registration in Redis for 2 days
  await client.set(
    `user:${email}`,
    JSON.stringify({ username, email, password: hash }),
    "EX",
    60 * 60 * 24 * 2,
  );

  await client.set(`otp:${email}`, otp, "EX", 300); // Set OTP in Redis with a 5-minute expiration
  await sendOTP(email, otp);

  return res.status(201).json({
    message: "please verify your email address with the OTP sent to your email",
    user: {
      username,
      email,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "email or password is incorrect",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Email or password is incorrect",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token, getTokenCookieOptions());

  res.status(200).json({
    message: "User logged In successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function logoutUser(req, res) {
  const token = req.cookies.token;

  if (token) {
    await blackListToken.create({
      token,
    });
    res.clearCookie("token", getClearTokenCookieOptions());

    return res.status(200).json({
      message: "User logged out successfully",
    });
  }

  res.clearCookie("token", getClearTokenCookieOptions());
  return res.status(200).json({
    message: "User logged out successfully",
  });
}

async function getDetails(req, res) {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "user details found and fetched successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function verifyOTP(req, res) {
  const { email, otp } = req.body;

  const storedOtp = await client.get(`otp:${email}`);

  if (!storedOtp) {
    return res.status(400).json({
      message: "OTP not found",
    });
  }

  if (storedOtp !== otp) {
    return res.status(400).json({
      message: "OTP is incorrect",
    });
  }

  const user = await client.get("user:" + email);

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const userDetails = JSON.parse(user);

  const newUser = await userModel.create({
    username: userDetails.username,
    email: userDetails.email,
    password: userDetails.password,
    isVerified: true,
  });

  await client.del(`otp:${email}`);
  await client.del(`user:${email}`);

  return res.status(200).json({
    message: "user registered successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getDetails,
  verifyOTP,
};
