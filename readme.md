# FeedCV 🚀
> AI-powered Resume Analyzer & Interview Preparation Platform

FeedCV helps job seekers optimize their resumes by analyzing them against job descriptions using AI. The platform identifies skill gaps, generates ATS-friendly suggestions, creates tailored interview questions, and allows users to manage their resumes securely.

---

## ✨ Features

### 🤖 AI Resume Analysis
- Upload resume (PDF)
- Analyze resume against any Job Description
- Detect missing skills
- Calculate resume-job match
- Generate personalized improvement suggestions

### 📄 Resume Parsing
- Extract candidate information
- Identify technical and soft skills
- Parse education and work experience
- Generate structured resume data

### 🎯 AI Interview Preparation
- Generate role-specific interview questions
- Technical questions
- Behavioral questions
- Difficulty-based question generation

### 🔐 Authentication & Security

- Secure JWT Authentication
- Access Token + Refresh Token
- Refresh Token Rotation
- HTTP Only Cookies
- Secure Cookie Configuration
- Logout from Current Device
- Logout from All Devices
- Session Management
- Token Blacklisting
- Protected Routes
- Password Hashing using bcrypt

### 👤 User Features

- User Registration
- Login
- Profile Management
- Resume Upload
- Resume History
- Saved Reports

---

## 🛠 Tech Stack

### Frontend
- React
- React Router
- SCSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Redis
- Multer

### AI
- Google Gemini API

### Other Tools
- Git
- GitHub
- Postman
- Puppeteer

---

## 🏗 Project Architecture

```
Client (React)
        │
        ▼
Express API Server
        │
 ┌──────┴─────────┐
 │                │
MongoDB        Redis
 │                │
User Data     Sessions
Resume Data   Token Blacklist
        │
        ▼
Gemini AI API
```

---

## Authentication Flow

1. User logs in.
2. Server verifies credentials.
3. Access Token is generated.
4. Refresh Token is stored securely.
5. Protected routes validate Access Token.
6. Expired Access Tokens are refreshed using Refresh Token.
7. Refresh Token Rotation issues a new Refresh Token.
8. Logout invalidates current session.
9. Logout All removes every active session.

---

## Folder Structure

```
FeedCV
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── config/
│   └── server.js
│
└── README.md
```

---

## API Features

### Authentication
- Register
- Login
- Refresh Token
- Logout
- Logout All Sessions

### Resume
- Upload Resume
- Analyze Resume
- Fetch Reports
- Delete Resume

### AI
- Resume Analysis
- Skill Gap Detection
- Interview Question Generation

---

## Security Features

- Password Hashing (bcrypt)
- JWT Authentication
- Refresh Token Rotation
- Secure HTTP-only Cookies
- Redis Session Storage
- Token Blacklisting
- Role-based Authorization
- Protected API Routes
- Environment Variables

---

## Future Improvements

- Resume Version Control
- Cover Letter Generator
- LinkedIn Profile Review
- AI Career Roadmap
- Company-specific Interview Preparation
- Resume Templates
- Email Notifications
- Dashboard Analytics
- Admin Panel

---

## Getting Started

### Clone Repository

```bash
git clone https://github.com/yourusername/feedcv.git
```

### Install Dependencies

Frontend

```bash
cd client
npm install
```

Backend

```bash
cd server
npm install
```

---

### Configure Environment Variables

Create a `.env` file inside the server directory.

Example:

```env
PORT=5000

MONGODB_URI=

ACCESS_TOKEN_SECRET=

REFRESH_TOKEN_SECRET=

GEMINI_API_KEY=

REDIS_URL=
```

---

### Start Backend

```bash
npm run dev
```

### Start Frontend

```bash
npm run dev
```

---

## Learning Outcomes

This project helped me gain practical experience with:

- Full Stack Development
- REST API Design
- Authentication & Authorization
- JWT Security Best Practices
- Refresh Token Rotation
- Redis Session Management
- AI Integration using Gemini
- Resume Parsing
- Backend Architecture
- Database Design
- Error Handling
- Secure Cookie Management

---

## Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit a pull request.

---


## Author

**Ishaan Kumar**

If you found this project useful, consider giving it a ⭐ on GitHub.
