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
//   "title": "Interview Report: Alex Rivera for Senior Full-Stack Engineer (AI Integrations)",
//   "score": 48,
//   "technicalQuestions": [
//     {
//       "question": "Given your deep React background, how does Next.js App Router change the way we think about state management and data fetching compared to a traditional client-side React SPA using Redux?",
//       "intention": "To evaluate the candidate's transition from client-side React to modern Next.js server-side paradigms (SSR, Server Components) and see if they understand when to use client vs. server state.",
//       "answer": "The candidate should explain that in Next.js App Router, data fetching is ideally done on the server using Server Components, reducing the need for global client-side state managers like Redux for fetched data. They should discuss how Server Components fetch data directly from databases or APIs, and how client-side state (like Redux or React Context) should be reserved for interactive UI state. They should also mention the benefits of reduced bundle sizes and improved initial page loads."
//     },
//     {
//       "question": "Can you walk me through how you would design a Node.js microservice that queries a PostgreSQL database, uses Redis for caching, and handles high-throughput read requests?",
//       "intention": "To test the candidate's theoretical backend and database design capabilities, specifically addressing their lack of production backend experience.",
//       "answer": "The candidate should describe setting up an Express or Fastify server in Node.js. For database access, they should mention using an ORM or query builder (like Prisma or Knex) to query PostgreSQL. For caching, they should explain the Cache-Aside pattern: checking Redis first for the key, returning it if found (cache hit), otherwise querying PostgreSQL, saving the result to Redis with a Time-To-Live (TTL), and returning it (cache miss). They should also touch on handling connection pooling for PostgreSQL."
//     },
//     {
//       "question": "Explain the architecture of a Retrieval-Augmented Generation (RAG) pipeline. How do LangChain, an LLM, and a Vector Database like Pinecone or pgvector work together to answer user queries?",
//       "intention": "To assess the candidate's understanding of AI integration concepts, LangChain, and vector databases, which are core requirements for this role.",
//       "answer": "The candidate should explain that a RAG pipeline enhances LLM prompts with external data. First, documents are chunked and converted into vector embeddings using an embedding model. These embeddings are stored in a Vector Database (like Pinecone or pgvector). When a user asks a question, the question is also embedded, and a similarity search is run against the vector database to retrieve the most relevant document chunks. LangChain is used to orchestrate this workflow: it takes the user query, retrieves the context, formats a prompt template containing both context and query, and sends it to the LLM to generate a grounded response."
//     }
//   ],
//   "behavioralQuestions": [
//     {
//       "question": "You are applying for a Senior Full-Stack role, but your production experience is heavily frontend-focused. How do you plan to establish technical authority and lead backend or infrastructure decisions with senior backend engineers on the team?",
//       "intention": "To assess the candidate's self-awareness, leadership maturity, and strategy for overcoming their experience gap in a senior-level role.",
//       "answer": "The candidate should demonstrate humility combined with proactive leadership. They should explain that they leverage their strong frontend architectural skills (system design, modularity, performance) and apply those principles to backend systems. They should emphasize collaborative decision-making, asking deep questions, relying on the team's domain experts while rapidly upskilling, and taking ownership of end-to-end feature delivery to build trust."
//     },
//     {
//       "question": "Describe a time when you had to deliver a feature using a technology stack you had absolutely no prior experience with. How did you manage your time, and what was the outcome?",
//       "intention": "To evaluate the candidate's ability to learn rapidly under pressure and deliver production-grade code in unfamiliar domains.",
//       "answer": "The candidate should share a specific story (ideally from TechFront or WebStream) where they had to adopt a new tool or framework quickly. They should detail their learning methodology (e.g., building proof-of-concepts, reading documentation, seeking mentorship) and how they managed their delivery timeline without compromising code quality or testing standards."
//     }
//   ],
//   "skillGaps": [
//     {
//       "skill": "Production Node.js & Python Backend Development",
//       "severity": "high"
//     },
//     {
//       "skill": "AWS Cloud Infrastructure (VPC, ECS, Lambda)",
//       "severity": "high"
//     },
//     {
//       "skill": "Infrastructure as Code (Terraform)",
//       "severity": "high"
//     },
//     {
//       "skill": "AI Integrations (LangChain, Vector Databases like Pinecone/pgvector)",
//       "severity": "high"
//     },
//     {
//       "skill": "Relational Databases & Caching (PostgreSQL, Redis)",
//       "severity": "medium"
//     },
//     {
//       "skill": "Next.js (App Router, Server Components, SSR)",
//       "severity": "medium"
//     }
//   ],
//   "preparationPlan": [
//     {
//       "day": 1,
//       "focus": "Next.js App Router & SSR Transition",
//       "tasks": [
//         "Study Next.js official documentation focusing on App Router, Server Components vs. Client Components, and Server Actions.",
//         "Migrate a basic React SPA component to a Next.js page utilizing Server-Side Rendering (SSR) and dynamic routing.",
//         "Practice explaining the difference between hydration in React and server-side rendering in Next.js."
//       ]
//     },
//     {
//       "day": 2,
//       "focus": "Backend Foundations (Node.js, Express, PostgreSQL)",
//       "tasks": [
//         "Build a robust REST API using Node.js, Express, and TypeScript.",
//         "Set up a local PostgreSQL database using Docker.",
//         "Write raw SQL queries and use an ORM (like Prisma) to perform CRUD operations, focusing on database indexing and schema design."
//       ]
//     },
//     {
//       "day": 3,
//       "focus": "Caching & Performance (Redis)",
//       "tasks": [
//         "Integrate Redis into the Node.js/PostgreSQL API built on Day 2.",
//         "Implement the Cache-Aside pattern for high-frequency read endpoints.",
//         "Learn about Redis data types, key expiration (TTL) strategies, and cache invalidation techniques."
//       ]
//     },
//     {
//       "day": 4,
//       "focus": "AI Engineering (LangChain & Vector Databases)",
//       "tasks": [
//         "Study the core concepts of Vector Embeddings and similarity search.",
//         "Set up a free Pinecone vector database instance or run pgvector locally in Docker.",
//         "Build a simple Python or Node.js script using LangChain to chunk a text document, generate embeddings, store them in the vector DB, and query them."
//       ]
//     },
//     {
//       "day": 5,
//       "focus": "Cloud Infrastructure & IaC (AWS & Terraform)",
//       "tasks": [
//         "Learn the fundamentals of AWS VPC, ECS (Fargate), and AWS Lambda.",
//         "Write a basic Terraform configuration file to provision an S3 bucket or a simple Lambda function.",
//         "Understand the Terraform state file lifecycle, commands (init, plan, apply, destroy), and variables."
//       ]
//     },
//     {
//       "day": 6,
//       "focus": "Full-Stack Integration Project",
//       "tasks": [
//         "Combine the Next.js frontend, Node.js/PostgreSQL backend, and LangChain pipeline into a single cohesive repository.",
//         "Simulate a production deployment flow locally using Docker Compose to orchestrate all services (Frontend, Backend, Postgres, Redis)."
//       ]
//     },
//     {
//       "day": 7,
//       "focus": "System Design & Mock Interviews",
//       "tasks": [
//         "Practice system design questions focusing on scaling full-stack applications and AI pipelines.",
//         "Conduct a mock interview focusing on explaining frontend-to-backend architectural decisions and how to mitigate lack of production cloud experience with rapid learning frameworks."
//       ]
//     }
//   ]
// }
