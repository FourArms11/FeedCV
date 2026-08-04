const userModel = require("../models/user.model");
const redis = require("../config/redis.client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { generateOTP, sendOTP } = require("../utils/otp.utils");
const client = require("../config/redis.client");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

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
    60 * 60 * 24 * 2, // 2 days
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
  const { email, username, password } = req.body;
  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  const sessionID = uuidv4();

  const RefreshToken = jwt.sign(
    { id: user._id, sessionID },
    config.JWT_REFRESH_SECRET,
    {
      expiresIn: "30d",
    },
  );

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(RefreshToken)
    .digest("hex");

  const AccessToken = jwt.sign(
    { id: user._id, sessionID },
    config.JWT_ACCESS_SECRET,
    {
      expiresIn: "15m",
    },
  );

  await redis.set(
    `session:${user._id}:${sessionID}`,
    JSON.stringify({
      session: sessionID,
      userId: user._id,
      refreshTokenHash: refreshTokenHash,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      lastUsedAt: new Date().toISOString(),
    }),
    "EX",
    60 * 60 * 24 * 30, // 30 days
  );

  res.cookie("token", AccessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 min, matches JWT exp
  });

  res.cookie("refreshToken", RefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days, matches JWT exp
  });

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
  const refreshToken = req.cookies.refreshToken;

  if(!refreshToken) {
    return res.status(400).json({
      message: "Refresh token not found",
    });
  }
  
  try {
    const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);
    const sessionID = decoded.sessionID;
    const userID = decoded.id;
    await client.del(`session:${userID}:${sessionID}`); 
  }
  catch(err){
    return res.status(400).json({
      message: "Invalid refresh token",
    });
  }  
    
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true, 
      sameSite: "strict",
    });

    res.clearCookie("token", {
      httpOnly: true,
      secure: true, 
      sameSite: "strict",
    });
  return res.status(200).json({
    message: "User logged out successfully",
  });
}

async function logoutAllSessions(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if(!refreshToken) {
    return res.status(400).json({
      message: "Refresh token not found",
    });
  }

  try{
    const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);
    const userID = decoded.id;
    const keys = await client.keys(`session:${userID}:*`);
    await client.del(keys);
  }catch(err){
    return res.status(400).json({
      message: "Invalid refresh token",
    });
  }


  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true, 
    sameSite: "strict",
  });
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, 
    sameSite: "strict",
  });



  return res.status(200).json({
    message: "All sessions logged out successfully",
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
      message: "Please register again",
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

async function refreshToken(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({
      message: "Refresh token not found",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET); //decoded will have id and sessionID
  } catch (error) {
    return res.status(401).json({
      message: "Invalid refresh token",
    });
  }
  if (!decoded || !decoded.id || !decoded.sessionID) {
    return res.status(401).json({
      message: "Invalid refresh token",
    });
  }

  const session = await redis.get(
    `session:${decoded.id}:${decoded.sessionID}`,
  );

  if (!session) {
    return res.status(401).json({
      message: "Session expired",
    });
  }
  const sessionData = JSON.parse(session);

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");


  if (sessionData.refreshTokenHash !== refreshTokenHash) {
    return res.status(401).json({
      message: "Invalid refresh token",
    });
  }

  const newRefreshToken = jwt.sign(
    { id: decoded.id, sessionID: decoded.sessionID },
    config.JWT_REFRESH_SECRET,
    {
      expiresIn: "30d",
    },
  );

  const newRefreshTokenHash = crypto
    .createHash("sha256")
    .update(newRefreshToken)    
    .digest("hex");

  const accessToken = jwt.sign(
    { id: decoded.id, sessionID: decoded.sessionID },
    config.JWT_ACCESS_SECRET,
    {
      expiresIn: "15m",
    },
  );

  await redis.set(
    `session:${decoded.id}:${decoded.sessionID}`,
    JSON.stringify({
      session: decoded.sessionID,
      userId: decoded.id,
      refreshTokenHash: newRefreshTokenHash,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      lastUsedAt: new Date().toISOString(),
    }),
    "EX",
    60 * 60 * 24 * 30, // 30 days
  );

  res.cookie("token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 min, matches JWT exp
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days, matches JWT exp
  });

  return res.status(200).json({
    message: "Refresh token refreshed successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getDetails,
  verifyOTP,
  refreshToken,
};
