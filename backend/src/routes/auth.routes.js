const express = require('express');
const authController = require('../controller/auth.controller');
const authMiddleware = require('../middlewares/auth.middeware');

const authRouter = express.Router();


authRouter.post('/register', authController.registerUser);

authRouter.post('/login', authController.loginUser);

authRouter.get('/logout', authController.logoutUser);

authRouter.get('/getDetails',authMiddleware.verifyUser, authController.getDetails);

authRouter.post('/verify-otp', authController.verifyOTP);

authRouter.post('/refresh-token', authController.refreshToken);



module.exports = authRouter;