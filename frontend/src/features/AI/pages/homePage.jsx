import { useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth.jsx";
import { generateReport } from "../services/ai.api.jsx";
import "./homePage.scss";

const HomePage = () => {
  const { user, handleLogout } = useAuth();
  const [resumeFile, setResumeFile] = useState(null);
  const [formData, setFormData] = useState({ selfDescription: "", jobDescription: "" });
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setReport(null);

    if (!resumeFile) {
      setError("Please upload your resume PDF before submitting.");
      return;
    }

    setLoading(true);
    try {
      const data = await generateReport({
        resume: resumeFile,
        selfDescription: formData.selfDescription,
        jobDescription: formData.jobDescription,
      });
      setReport(data.interviewReport || data);
    } catch (err) {
      setError("Unable to generate report right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <header className="home-page__header">
        <div className="home-page__logo">FeedCV</div>
        <nav className="home-page__nav">
          <button className="button button--ghost" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      <section className="home-page__hero">
        <div className="home-page__hero-copy">
          <span className="home-page__eyebrow">AI Resume Assistant</span>
          <h1>Turn your resume into an interview-ready strategy.</h1>
          <p>
            Upload your resume, describe your target role, and get an AI-powered
            report that highlights strengths, gaps, and practice interview
            questions.
          </p>
          <div className="home-page__hero-actions">
            <button className="button button--primary" onClick={() => document.getElementById("generate-form")?.scrollIntoView({ behavior: "smooth" })}>
              Generate report
            </button>
          </div>
        </div>

        <div className="home-page__hero-card">
          <p className="home-page__welcome">
            Welcome back {user?.username ? user.username : "candidate"}.
          </p>
          <h2>Ready to level up your CV?</h2>
          <ul className="home-page__highlights">
            <li>Resume analysis tailored to your target job</li>
            <li>Interview questions based on your experience</li>
            <li>Actionable improvement suggestions</li>
          </ul>
        </div>
      </section>

      <section className="home-page__features">
        <article>
          <h3>Fast AI feedback</h3>
          <p>Get meaningful resume and interview guidance in seconds.</p>
        </article>
        <article>
          <h3>One place for everything</h3>
          <p>Upload your resume, add context, and review your AI report in one flow.</p>
        </article>
        <article>
          <h3>Designed for job seekers</h3>
          <p>Built to help candidates present strengths clearly and confidently.</p>
        </article>
      </section>

      <section className="home-page__report" id="generate-form">
        <div className="home-page__report-card card">
          <div className="home-page__report-top">
            <h2>Generate interview report</h2>
            <p>Upload your resume PDF and add the job context to start.</p>
          </div>

          <form className="home-page__form" onSubmit={handleSubmit}>
            <label className="home-page__field">
              <span>Resume PDF</span>
              <input type="file" accept="application/pdf" onChange={handleFileChange} />
            </label>

            <label className="home-page__field">
              <span>Job description</span>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                placeholder="Paste the job description or hiring manager notes"
                onChange={handleChange}
              />
            </label>

            <label className="home-page__field">
              <span>Your summary</span>
              <textarea
                name="selfDescription"
                value={formData.selfDescription}
                placeholder="Describe your current role, career goals, or target company"
                onChange={handleChange}
              />
            </label>

            {error && <p className="home-page__error">{error}</p>}

            <button type="submit" className="button button--primary" disabled={loading}>
              {loading ? "Generating report..." : "Create report"}
            </button>
          </form>
        </div>

        {report && (
          <div className="home-page__report-preview card">
            <h3>Interview Report</h3>
            <pre>{JSON.stringify(report, null, 2)}</pre>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
