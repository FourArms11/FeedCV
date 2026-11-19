const express = require('express');
const authRoutes = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const aiRoutes = require('./routes/ai.routes');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin(origin, callback) {
    const allowed = ['http://localhost:3000', 'http://localhost:5173', process.env.CLIENT_URL];
    callback(null, !origin || allowed.includes(origin));
  },
  credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

app.use(express.static(path.resolve(__dirname, '../../frontend/dist')));
app.use(express.static(path.resolve(__dirname, '../../frontend')));

module.exports = app; 