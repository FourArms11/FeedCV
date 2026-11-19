import { useEffect, useRef, useState } from "react";
const API_BASE = window.FEEDCV_API_URL || "/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(data.message || "Something went wrong. Please try again.");
  return data;
}

function AuthView({ onAuthenticated }) {
  const [tab, setTab] = useState("login");
  const [otpEmail, setOtpEmail] = useState("");
  const [message, setMessage] = useState("");

  async function login(event) {
    event.preventDefault();
    setMessage("Signing you in...");
    const form = new FormData(event.currentTarget);
    const identity = form.get("identity");
    try {
      const data = await request("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: identity,
          username: identity,
          password: form.get("password"),
        }),
      });
      onAuthenticated(data.user);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function register(event) {
    event.preventDefault();
    setMessage("Sending your verification code...");
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    try {
      await request("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setOtpEmail(payload.email);
      setTab("otp");
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function verifyOtp(event) {
    event.preventDefault();
    setMessage("Verifying your email...");
    const otp = new FormData(event.currentTarget).get("otp");
    try {
      await request("/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpEmail, otp }),
      });
      setTab("login");
      setMessage("Email verified. Sign in to continue.");
    } catch (error) {
      setMessage(error.message);
    }
  }

  function changeTab(nextTab) {
    setTab(nextTab);
    setMessage("");
  }

  return (
    <section className="auth-layout">
      <div className="hero-copy">
        <p className="eyebrow">YOUR NEXT INTERVIEW, BETTER PREPARED</p>
        <h1>
          Turn your resume into a <span>clearer path</span> to the offer.
        </h1>
        <p className="hero-text">
          FeedCV compares your experience to the role you want, then builds an
          honest interview plan around the gaps that matter most.
        </p>
        <div className="hero-points">
          <span>
            <b>01</b> Resume-aware questions
          </span>
          <span>
            <b>02</b> Practical skill-gap analysis
          </span>
          <span>
            <b>03</b> A focused preparation plan
          </span>
        </div>
      </div>

      <div className="auth-card">
        {tab !== "otp" && (
          <div className="auth-tabs" role="tablist">
            <button
              className={`auth-tab ${tab === "login" ? "active" : ""}`}
              onClick={() => changeTab("login")}
              type="button"
            >
              Sign in
            </button>
            <button
              className={`auth-tab ${tab === "register" ? "active" : ""}`}
              onClick={() => changeTab("register")}
              type="button"
            >
              Create account
            </button>
          </div>
        )}

        {tab === "login" && (
          <form className="auth-form" onSubmit={login}>
            <div className="form-heading">
              <h2>Welcome back</h2>
              <p>Pick up your preparation where you left off.</p>
            </div>
            <label>
              Email or username
              <input
                name="identity"
                required
                autoComplete="username"
                placeholder="you@example.com"
              />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Your password"
              />
            </label>
            <button className="button button-primary button-wide" type="submit">
              Continue <span>→</span>
            </button>
          </form>
        )}

        {tab === "register" && (
          <form className="auth-form" onSubmit={register}>
            <div className="form-heading">
              <h2>Build your edge</h2>
              <p>Create an account and get your first readiness report.</p>
            </div>
            <label>
              Username
              <input
                name="username"
                required
                autoComplete="username"
                placeholder="alex.dev"
              />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                minLength="6"
                required
                autoComplete="new-password"
                placeholder="At least 6 characters"
              />
            </label>
            <button className="button button-primary button-wide" type="submit">
              Send verification code <span>→</span>
            </button>
          </form>
        )}

        {tab === "otp" && (
          <form className="auth-form" onSubmit={verifyOtp}>
            <div className="form-heading">
              <h2>Check your inbox</h2>
              <p>
                Enter the 6-digit code sent to <strong>{otpEmail}</strong>.
              </p>
            </div>
            <label>
              Verification code
              <input
                name="otp"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength="6"
                required
                placeholder="000000"
              />
            </label>
            <button className="button button-primary button-wide" type="submit">
              Verify email <span>→</span>
            </button>
            <button
              className="text-button"
              type="button"
              onClick={() => changeTab("register")}
            >
              Use a different email
            </button>
          </form>
        )}
        <p className="status-message" role="status">
          {message}
        </p>
      </div>
    </section>
  );
}

function QuestionList({ title, questions = [] }) {
  return (
    <div>
      <h4>{title}</h4>
      {questions.length ? (
        questions.map((item, index) => (
          <details className="question-card" key={`${title}-${index}`}>
            <summary>{item.question}</summary>
            <p>
              <b>What they are testing:</b> {item.intention}
            </p>
            <p>
              <b>Answer direction:</b> {item.answer}
            </p>
          </details>
        ))
      ) : (
        <p>No questions returned.</p>
      )}
    </div>
  );
}

function Dashboard({ user, onLogout }) {
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");
  const [generating, setGenerating] = useState(false);
  const [report, setReport] = useState(null);
  const reportRef = useRef(null);

  async function generate(event) {
    event.preventDefault();
    if (!resume) {
      setMessage("Please choose a PDF resume.");
      return;
    }
    setGenerating(true);
    setMessage(
      "Reading your resume and generating your report. This can take a minute...",
    );
    try {
      const data = await request("/ai/generate-report", {
        method: "POST",
        body: new FormData(event.currentTarget),
      });
      setReport(data);
      setMessage("");
      setTimeout(
        () =>
          reportRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        50,
      );
    } catch (error) {
      setMessage(error.message);
    } finally {
      setGenerating(false);
    }
  }

  async function logout() {
    try {
      await request("/auth/logout");
    } catch {
      /* Clear the local view even if the session already expired. */
    }
    onLogout();
  }

  return (
    <section className="dashboard">
      <header className="topbar">
        <a className="brand" href="#" aria-label="FeedCV home">
          <span className="brand-mark">F</span>
          <span>
            Feed<span>CV</span>
          </span>
        </a>
        <div className="topbar-actions">
          {user?.username && (
            <span className="user-greeting">Hi, {user.username}</span>
          )}
          <button
            className="button button-ghost"
            onClick={logout}
            type="button"
          >
            Log out
          </button>
        </div>
      </header>

      <main>
        <div className="dashboard-intro">
          <div>
            <p className="eyebrow">INTERVIEW READINESS STUDIO</p>
            <h1>
              Make your preparation <span>intentional.</span>
            </h1>
            <p>
              Upload your latest resume, tell us where you are headed, and get a
              preparation plan built around you.
            </p>
          </div>
          <div className="status-chip">
            <span className="pulse"></span> AI coach ready
          </div>
        </div>

        <div className="workspace-grid">
          <form className="panel report-form" onSubmit={generate}>
            <div className="panel-title">
              <span className="step-number">01</span>
              <div>
                <h2>Set your target</h2>
                <p>Give the coach enough context to be specific.</p>
              </div>
            </div>
            <label>
              Target job description <span className="required">Required</span>
              <textarea
                name="jobDescription"
                required
                rows="8"
                placeholder="Paste the role, responsibilities, and requirements here..."
              />
            </label>
            <label>
              Your context <span className="optional">Optional</span>
              <textarea
                name="selfDescription"
                rows="5"
                placeholder="What are you proud of? What feels challenging? Add context the resume cannot show."
              />
            </label>
            <label className="file-drop">
              <input
                name="resume"
                type="file"
                accept="application/pdf,.pdf"
                required
                onChange={(event) => setResume(event.target.files[0] || null)}
              />
              <span className="upload-icon">↑</span>
              <strong>{resume?.name || "Drop your resume here"}</strong>
              <small>PDF only · up to 10 MB</small>
            </label>
            <button
              className="button button-primary button-wide"
              type="submit"
              disabled={generating}
            >
              {generating
                ? "Generating report..."
                : "Generate my readiness report"}{" "}
              <span>↗</span>
            </button>
            <p className="status-message" role="status">
              {message}
            </p>
          </form>

          <aside className="panel side-panel">
            <div className="panel-title">
              <span className="step-number muted">02</span>
              <div>
                <h2>What you will get</h2>
                <p>A practical brief, not generic advice.</p>
              </div>
            </div>
            <ul className="benefit-list">
              <li>
                <span>✦</span>
                <div>
                  <strong>Readiness score</strong>
                  <small>
                    See how closely your experience maps to the role.
                  </small>
                </div>
              </li>
              <li>
                <span>?</span>
                <div>
                  <strong>Tailored questions</strong>
                  <small>
                    Practice technical and behavioral questions with answer
                    guidance.
                  </small>
                </div>
              </li>
              <li>
                <span>↗</span>
                <div>
                  <strong>Skill-gap priorities</strong>
                  <small>Know what to learn first and why it matters.</small>
                </div>
              </li>
              <li>
                <span>☷</span>
                <div>
                  <strong>Day-by-day plan</strong>
                  <small>
                    Turn insight into a manageable preparation routine.
                  </small>
                </div>
              </li>
            </ul>
            <div className="quote-card">
              “Preparation is not about knowing everything. It is about knowing
              what matters next.”
            </div>
          </aside>
        </div>

        {report && (
          <section className="report-section" ref={reportRef}>
            <div className="report-header">
              <div>
                <p className="eyebrow">YOUR PERSONALIZED BRIEF</p>
                <h2>{report.title || "Interview readiness report"}</h2>
              </div>
              <div className="score-ring">
                <strong>{Math.round(report.score ?? 0)}</strong>
                <span>/ 100</span>
              </div>
            </div>
            <div className="report-grid">
              <div className="report-column">
                <article className="report-card">
                  <h3>Coach's feedback</h3>
                  <p>{report.feedback || "No feedback was returned."}</p>
                </article>
                <article className="report-card">
                  <h3>Suggestions</h3>
                  <p>{report.suggestions || "No suggestions were returned."}</p>
                </article>
              </div>
              <div className="report-column">
                <article className="report-card">
                  <h3>Priority skill gaps</h3>
                  <div className="tag-list">
                    {(report.skillsGaps || []).length ? (
                      report.skillsGaps.map((gap, index) => (
                        <span className={`tag ${gap.importance}`} key={index}>
                          {gap.skill} · {gap.importance}
                        </span>
                      ))
                    ) : (
                      <span className="tag">No critical gaps found</span>
                    )}
                  </div>
                </article>
                <article className="report-card">
                  <h3>Preparation plan</h3>
                  {(report.preparationPlan || []).map((day, index) => (
                    <div className="plan-item" key={index}>
                      <strong>DAY {day.day}</strong>
                      <b>{day.focus}</b>
                      <ul>
                        {(day.tasks || []).map((task, taskIndex) => (
                          <li key={taskIndex}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </article>
              </div>
            </div>
            <div className="question-section">
              <h3>Practice questions</h3>
              <div className="question-grid">
                <QuestionList
                  title="Technical"
                  questions={report.technicalQuestions}
                />
                <QuestionList
                  title="Behavioral"
                  questions={report.behavioralQuestions}
                />
              </div>
            </div>
          </section>
        )}
      </main>
      <footer>
        <span>FeedCV</span> · Prepare with clarity.
      </footer>
    </section>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    request("/auth/getDetails")
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setCheckingSession(false));
  }, []);

  if (checkingSession) {
    return (
      <div className="app-shell">
        <div className="session-loading">Loading FeedCV...</div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      {user ? (
        <Dashboard user={user} onLogout={() => setUser(null)} />
      ) : (
        <>
          <header className="topbar">
            <a className="brand" href="#" aria-label="FeedCV home">
              <span className="brand-mark">F</span>
              <span>
                Feed<span>CV</span>
              </span>
            </a>
          </header>
          <AuthView onAuthenticated={setUser} />
        </>
      )}
    </div>
  );
}
