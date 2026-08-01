const express = require('express');
const authRoutes = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const aiRoutes = require('./routes/ai.routes');

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',authRoutes);
app.use('/api/ai',aiRoutes);

module.exports = app; 