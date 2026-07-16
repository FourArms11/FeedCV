const express = require('express');
const authMiddleware = require('../middlewares/auth.middeware');
const aiController = require('../controller/ai.controller');
const upload = require('../middlewares/file.middleware');

const aiRouter = express.Router();


aiRouter.post('/generate-report', authMiddleware.verifyUser, upload.single('resume'), aiController.generateInterviewReport);



module.exports = aiRouter;
