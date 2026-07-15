const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blackListToken = require('../models/blacklist.model');

async function registerUser(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide username, email and password ",
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

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered Successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
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

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged In successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function logoutUser(req,res){
    const token = req.cookies.token;

    if(token){
        await blackListToken.create({
            token
        })
        res.clearCookie('token')

        res.status(200).json({
            message: "User logged out successfully"
        })
    }
}

async function getDetails(req,res){

  const user = await userModel.findById(req.user.id);
  
  res.status(200).json({
    message: "user details found and fetched successfully",
    user:{
      id: user._id,
      username: user.username,
      email: user.email
    }
  })
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getDetails
};


