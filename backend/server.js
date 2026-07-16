require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');
const dns = require('dns');
// const generateReport = require('./src/services/gemini.service');
// const {sampleResume,sampleSelfDescription,sampleJobDescription} = require("./src/services/sample");
dns.setServers(['8.8.8.8', '1.1.1.1']);

async function startServer() {
  try {
    await connectDB();
    // await generateReport({
    //   resume: sampleResume,
    //   selfDescription: sampleSelfDescription,
    //   jobDescription: sampleJobDescription,
    // });
  } catch (error) {
    console.error('Startup error:', error);
  }

  app.listen(3000, () => console.log('Server is running on port 3000'));
}

startServer();