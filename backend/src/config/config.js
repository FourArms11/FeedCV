const dotenv = require('dotenv');
dotenv.config();

if(!process.env.MONGO_URI) {
  throw new Error('MONGO_URI environment variable not set');
}
if(!process.env.JWT_ACCESS_SECRET) {
  throw new Error('JWT_ACCESS_SECRET environment variable not set');
}
if(!process.env.JWT_REFRESH_SECRET) {
  throw new Error('JWT_REFRESH_SECRET environment variable not set');
}
if(!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable not set');
}
if(!process.env.CLIENT_ID) {
  throw new Error('CLIENT_ID environment variable not set');
}
if(!process.env.CLIENT_SECRET) {
  throw new Error('CLIENT_SECRET environment variable not set');
}
if(!process.env.REFRESH_TOKEN) {
  throw new Error('REFRESH_TOKEN environment variable not set');
}
if(!process.env.EMAIL_USER) {
  throw new Error('EMAIL_USER environment variable not set');
}


const config = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  EMAIL_USER: process.env.EMAIL_USER,
};

module.exports = config;