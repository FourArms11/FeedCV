# FeedCV

FeedCV is an AI-powered interview preparation backend that analyzes a candidate's resume, self-description, and target job description to generate a structured interview readiness report.

The app supports email OTP verification, secure login with access and refresh tokens, PDF resume parsing, Gemini-powered report generation, and MongoDB persistence for generated reports.

## Features

- User registration with email OTP verification
- Password hashing with `bcryptjs`
- JWT access and refresh token authentication
- Redis-backed OTP and session storage
- Resume PDF upload using `multer`
- Resume text extraction with `pdf-parse`
- AI interview report generation with Google Gemini
- Structured report storage in MongoDB
- Gmail OAuth2 email delivery for OTPs
- Basic frontend source folder for future React pages

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- Redis with ioredis
- JSON Web Token
- bcryptjs
- multer
- pdf-parse
- Google GenAI SDK
- Nodemailer
- dotenv

## Project Structure

```text
.
|-- backend
|   |-- server.js
|   |-- package.json
|   |-- src
|   |   |-- app.js
|   |   |-- config
|   |   |   |-- config.js
|   |   |   |-- db.js
|   |   |   `-- redis.client.js
|   |   |-- controller
|   |   |   |-- ai.controller.js
|   |   |   `-- auth.controller.js
|   |   |-- middlewares
|   |   |   |-- auth.middeware.js
|   |   |   `-- file.middleware.js
|   |   |-- models
|   |   |   |-- report.model.js
|   |   |   |-- session.model.js
|   |   |   `-- user.model.js
|   |   |-- routes
|   |   |   |-- ai.routes.js
|   |   |   `-- auth.routes.js
|   |   |-- services
|   |   |   |-- email.service.js
|   |   |   |-- gemini.service.js
|   |   |   `-- pdfGenerator.js
|   |   `-- utils
|   |       `-- otp.utils.js
|   `-- .env
|-- notes.txt
|-- sample.js
`-- README.md
```

## Prerequisites

Make sure you have these installed and running:

- Node.js
- MongoDB
- Redis
- A Google Gemini API key
- Gmail OAuth2 credentials for sending OTP emails

Redis is currently configured with the default `new Redis()` setup, so it expects Redis to be available at the default local connection unless you update `backend/src/config/redis.client.js`.

## Getting Started

### 1. Install backend dependencies

```bash
cd backend
npm install
```

### 2. Configure environment variables

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
GEMINI_API_KEY=your_gemini_api_key
CLIENT_ID=your_gmail_oauth_client_id
CLIENT_SECRET=your_gmail_oauth_client_secret
REFRESH_TOKEN=your_gmail_oauth_refresh_token
EMAIL_USER=your_email_address
EMAIL_DISPLAY_NAME=FeedCV
```

### 3. Start the backend

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

The server runs on:

```text
http://localhost:3000
```

## API Endpoints

### Auth Routes

Base path:

```text
/api/auth
```

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/register` | Start registration and send OTP |
| POST | `/verify-otp` | Verify OTP and create the user |
| POST | `/login` | Login and set auth cookies |
| GET | `/logout` | Clear auth cookies |
| GET | `/getDetails` | Get logged-in user details |
| POST | `/refresh-token` | Rotate refresh token and issue a new access token |

#### Register

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "username": "ishaan",
  "email": "ishaan@example.com",
  "password": "password123"
}
```

The backend stores the pending user and OTP in Redis, then sends the OTP to the user's email.

#### Verify OTP

```http
POST /api/auth/verify-otp
Content-Type: application/json
```

```json
{
  "email": "ishaan@example.com",
  "otp": "123456"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "ishaan@example.com",
  "password": "password123"
}
```

You can also login with `username` instead of `email`.

Successful login sets two HTTP-only cookies:

- `token`: access token, valid for 15 minutes
- `refreshToken`: refresh token, valid for 30 days

#### Refresh Token

```http
POST /api/auth/refresh-token
```

Uses the `refreshToken` cookie to issue a new access token and rotate the refresh token.

### AI Routes

Base path:

```text
/api/ai
```

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/generate-report` | Upload a resume PDF and generate an interview report |

#### Generate Interview Report

Requires an authenticated user.

```http
POST /api/ai/generate-report
Content-Type: multipart/form-data
```

Form fields:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `resume` | file | Yes | Resume PDF, max 10 MB |
| `jobDescription` | text | Yes | Target role or job description |
| `selfDescription` | text | No | Candidate background, goals, or extra context |

The generated report includes:

- Overall readiness score
- Report title
- Technical interview questions
- Behavioral interview questions
- Skill gaps with importance levels
- Preparation plan
- Feedback
- Suggestions

## Data Models

### User

Stores account details such as username, email, hashed password, verification status, role, and timestamps.

### Report

Stores the uploaded resume text, job description, self-description, AI-generated questions, skill gaps, preparation plan, feedback, suggestions, score, and owner user ID.

## Current Implementation Notes

- The backend is the runnable part of the project. The separate frontend folder currently contains empty React source files and does not include a package setup yet.
- `backend/src/middlewares/auth.middeware.js` currently references `blacklistTokenModel` without importing or defining it.
- The login flow signs tokens with `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET`, while the auth middleware currently verifies with `process.env.JWT_SECRET`. Align these before relying on protected routes.
- `logoutUser` references `user` and `sessionID` variables that are not defined in that function. It may need decoding from the token/session before deleting Redis session keys.

## Available Scripts

Run these commands inside the `backend` folder:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the backend with nodemon |
| `npm start` | Start the backend with Node |

## License

This project is licensed under the ISC license.
