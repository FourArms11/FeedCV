const sampleJobDescription = `
Position: Senior Full-Stack Engineer (AI Integrations)
Company: CloudScale Innovations
Location: Remote (US/Canada)

About the Role:
We are looking for a Senior Full-Stack Engineer to lead the development of our next-generation data analytics platform. You will be responsible for building robust backend microservices, highly responsive frontend dashboards, and integrating LLMs/AI features into our application workflows.

Minimum Requirements:
- 5+ years of professional software engineering experience.
- Production experience with Node.js, TypeScript, and Python.
- Advanced frontend development using Next.js (App Router, Server Components, SSR).
- Strong database design skills using PostgreSQL and Redis (caching).
- Hands-on experience with AWS cloud infrastructure (VPC, ECS, Lambda) provisioned via Terraform.
- Proven experience implementing and optimizing AI vector databases (e.g., Pinecone, pgvector) and orchestrating LLM workflows using LangChain.

Nice to Have:
- Contributions to open-source developer tooling.
- Experience managing production environments handling high-throughput web traffic.
`;

const sampleResume = `
ALEX RIVERA
Senior Frontend Engineer | alex.rivera@email.dev | github.com/alexr-dev

SUMMARY:
Highly skilled Frontend Engineer with 6 years of experience specializing in building responsive, accessible, and high-performance user interfaces using React and modern ecosystem tools. Passionate about component libraries, state management optimization, and UI performance engineering.

TECHNICAL SKILLS:
- Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3/Sass.
- Frameworks & Libraries: React, Redux Toolkit, TailwindCSS, Material UI, Vue.js, Jest, React Testing Library.
- Tools & Build Systems: Webpack, Vite, Git, Docker (Basic usage), npm/pnpm.

PROFESSIONAL EXPERIENCE:
TechFront Solutions — Senior Frontend Engineer (March 2023 - Present)
- Architected and rebuilt the core enterprise dashboard using React and TailwindCSS, resulting in a 35% improvement in initial page load time.
- Established a unified company-wide design system and UI component library, reducing feature development time for 4 cross-functional product teams.
- Mentored 3 junior developers and introduced automated testing via Jest, boosting code coverage from 40% to 85%.

WebStream Corp — Frontend Developer (July 2020 - March 2023)
- Developed complex data visualization components using D3.js and React, enabling B2B clients to smoothly track real-time analytics.
- Managed global application state using Redux, minimizing unnecessary re-renders across data-heavy interfaces.
- Collaborated closely with UI/UX designers to implement pixel-perfect, accessible (WCAG AA compliant) user flows.

EDUCATION:
B.S. in Computer Science — State University (Graduated 2020)
`;

const sampleSelfDescription = `
I have spent the last several years mastering frontend development, particularly within the React ecosystem. While I excel at building complex interfaces and engineering client-side performance, I am actively seeking to transition into full-stack engineering. 

Lately, I've been taking online courses on backend architecture, building basic Node.js APIs on weekends, and reading up on LangChain for AI pipelines. I don't have production history deploying to AWS using infrastructure-as-code (Terraform) yet, but I pick up new technical stacks very quickly and want a role where I can close that cloud gap fast.
`;

module.exports = { sampleJobDescription, sampleResume, sampleSelfDescription };





// {
//     "message": "report generated successfully",
//     "interviewReport": {
//         "jobDescription": "**Job Title:** Full-Stack Software Engineer Intern\n\nWe are looking for a motivated and enthusiastic Full-Stack Software Engineer Intern to join our engineering team. The ideal candidate should have a solid understanding of web development fundamentals, strong problem-solving skills, and a passion for building scalable applications.\n\n**Responsibilities:**\n\n* Develop and maintain web applications using React.js, Node.js, and Express.js.\n* Design and implement RESTful APIs and integrate them with frontend applications.\n* Work with MongoDB or SQL databases to store and manage application data.\n* Collaborate with cross-functional teams to design, develop, test, and deploy new features.\n* Debug, troubleshoot, and optimize existing applications for performance and scalability.\n* Write clean, maintainable, and well-documented code following industry best practices.\n* Participate in code reviews and contribute to technical discussions.\n\n**Required Qualifications:**\n\n* Pursuing a Bachelor's degree in Computer Science or a related field.\n* Strong knowledge of JavaScript, HTML, and CSS.\n* Experience with React.js, Node.js, and Express.js.\n* Familiarity with MongoDB or MySQL.\n* Understanding of REST APIs, Git, and version control workflows.\n* Good understanding of Data Structures and Algorithms.\n* Strong communication, analytical, and problem-solving skills.\n\n**Preferred Qualifications:**\n\n* Experience building full-stack projects using the MERN stack.\n* Familiarity with authentication using JWT or OAuth.\n* Exposure to cloud deployment platforms such as Vercel, Render, or AWS.\n* Experience integrating third-party APIs, including AI services.\n* Knowledge of Docker, CI/CD pipelines, or automated testing frameworks is a plus.\n\n**Nice to Have:**\n\n* Personal or open-source projects demonstrating full-stack development.\n* Participation in coding contests, hackathons, or technical communities.\n* A passion for continuous learning and staying up to date with modern web technologies.\n",
//         "resume": "John Doe\nEmail: john.doe@example.com | Phone: +1 555-123-4567 | LinkedIn: linkedin.com/in/johndoe\nProfessional Summary\nMotivated software developer with experience in full-stack web development, data structures, and\ncloud deployment. Passionate about building scalable applications and solving complex problems.\nEducation\nB.Tech in Computer Science, XYZ University (2022–2026)\nCGPA: 8.7/10\nTechnical Skills\nLanguages: C++, JavaScript, Python\nFrontend: React, HTML, CSS, Tailwind CSS\nBackend: Node.js, Express.js\nDatabase: MongoDB, MySQL\nTools: Git, GitHub, Docker, Postman\nProjects\nAI Resume Analyzer\nBuilt a MERN application that analyzes resumes, compares them against job descriptions, identifies\nskill gaps using Gemini API, and generates ATS-friendly resumes.\nExpense Tracker\nCreated a full-stack expense tracking application with JWT authentication and MongoDB.\nExperience\nSoftware Development Intern (May 2025 – Jul 2025)\nDeveloped REST APIs, improved database queries, and collaborated using Git.\nAchievements\n• Solved 500+ DSA problems.\n• Finalist in university hackathon.\nCertifications\n• Full-Stack Web Development\n• Data Structures & Algorithms\n\n-- 1 of 1 --\n\n",
//         "selfDescription": "I am a passionate and motivated Computer Science student with a strong interest in full-stack web development and software engineering. I enjoy building scalable web applications and solving challenging programming problems. Over the past few years, I have gained hands-on experience with the MERN stack, REST APIs, MongoDB, SQL databases, and modern frontend technologies like React.\n\nI have worked on projects such as an AI-powered Resume Analyzer that uses the Gemini API to analyze resumes, identify skill gaps, and generate ATS-friendly resumes, as well as a full-stack Expense Tracker with secure JWT-based authentication. These projects have strengthened my understanding of backend development, database design, and API integration.\n\nI am proficient in C++, JavaScript, and Python, and have solved over 500 data structures and algorithms problems, which has helped me develop strong problem-solving and analytical skills. I enjoy learning new technologies, collaborating with teams, and continuously improving my coding practices.\n\nI am seeking opportunities where I can contribute to meaningful software projects, learn from experienced engineers, and grow as a full-stack developer. I am a quick learner, adaptable, and committed to delivering high-quality, maintainable solutions.\n",
//         "Score": 0,
//         "technicalQuestions": [
//             {
//                 "question": "In your AI Resume Analyzer project, how did you handle the asynchronous nature of the Gemini API calls while maintaining a responsive UI?",
//                 "intention": "Assess understanding of Node.js event loop, Promises/Async-Await, and frontend state management during long-running requests.",
//                 "answer": "I used async/await in the Express backend to handle API calls, implemented loading states in React to provide user feedback, and utilized error handling to manage potential API timeouts or rate limits."
//             },
//             {
//                 "question": "Explain how you would optimize a MongoDB query for a collection that has grown to millions of documents.",
//                 "intention": "Evaluate database performance knowledge beyond basic CRUD operations.",
//                 "answer": "I would analyze the query execution plan using .explain(), ensure proper indexing on frequently queried fields, use projection to return only necessary fields, and consider aggregation pipeline optimization."
//             }
//         ],
//         "behavioralQuestions": [
//             {
//                 "question": "Tell me about a time you had to debug a complex issue in a team environment. How did you communicate your findings?",
//                 "intention": "Gauge collaboration skills and ability to articulate technical problems to cross-functional team members.",
//                 "answer": "I would describe a specific instance, focusing on the steps taken to isolate the bug, the tools used for debugging, and how I documented the fix in the team's shared repository or ticket system."
//             }
//         ],
//         "skillsGaps": [
//             {
//                 "skill": "CI/CD Pipelines",
//                 "importance": "medium"
//             },
//             {
//                 "skill": "Automated Testing (Jest/Cypress)",
//                 "importance": "high"
//             }
//         ],
//         "preparationPlan": [
//             {
//                 "day": 1,
//                 "focus": "Testing Frameworks",
//                 "task": [],
//                 "_id": "6a5a492d74338954f677f237"
//             },
//             {
//                 "day": 2,
//                 "focus": "CI/CD and Deployment",
//                 "task": [],
//                 "_id": "6a5a492d74338954f677f238"
//             },
//             {
//                 "day": 3,
//                 "focus": "System Design & Scalability",
//                 "task": [],
//                 "_id": "6a5a492d74338954f677f239"
//             }
//         ],
//         "feedback": "The candidate is a strong fit for the intern role. They have relevant project experience with the MERN stack and have demonstrated technical depth through their DSA problem-solving. The primary area for improvement is moving from 'building' to 'maintaining and testing' code, as they lack formal experience with automated testing frameworks.",
//         "suggestions": "Focus on articulating the 'why' behind your architectural choices in your projects. During the interview, emphasize your ability to write testable code and your familiarity with the full software development lifecycle, not just the coding phase.",
//         "_id": "6a5a492d74338954f677f236",
//         "createdAt": "2026-07-17T15:24:29.416Z",
//         "updatedAt": "2026-07-17T15:24:29.416Z",
//         "__v": 0
//     }
// }