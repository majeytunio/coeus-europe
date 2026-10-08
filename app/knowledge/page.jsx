"use client";
import { useState, useEffect, useRef } from "react";

const INITIAL_QUESTIONS = [
  {
    id: "q1",
    text: `An incident report states: "Human error — worker forgot to lock out." Describe how you would verify whether this conclusion is valid and what deeper causes you would investigate`,
    options: [
      "I'd verify if procedures, supervision, and conditions made lockout possible, and investigate why the system allowed the lapse—not just the worker",
      "I would organize a refresher training for all workers on lockout/tagout",
      "I would ask the worker why he forgot and remind him to follow procedures next time",
      "I would confirm with the supervisor that the worker indeed forgot to lock out and close the case as human error",
    ],
  },
  {
    id: "q2",
    text: "A subcontractor brings a new machine to site with a CE mark. Explain what safety checks you, as the HSE Manager, must still perform before allowing it to be used",
    options: [
      "Since the machine has a CE mark, no further checks are necessary.",
      "Just make sure the operator has the CE certificate and a copy of the declaration of conformity on site",
      "you still need to verify the machine and make a risk analysis",
      "ask for the invoice, CE certificate, copy of declaration of conformity and the notified body certificate",
    ],
  },
  {
    id: "q3",
    text: `A worker says he "doesn't smell any gas, so it's safe." Explain, how you would handle this situation as HSE responsible`,
    options: [
      "If no one reports smelling gas after ventilation, allow work to resume and note it in the shift log",
      "Do a quick visual scan for obvious leaks or damaged piping.",
      "always measure gases when you are informed there are dangerous gases present",
      "do a lakmus test to find dangerous gases",
    ],
  },
  {
    id: "q4",
    text: "You are reviewing a hot work permit in a chemical plant. How do you evaluate if the gas concentration is within a safe range",
    options: [
      "Ask the operator if the area smells normal and if there were any alarms recently",
      "verify the MAC value and measure",
      "Check that the ventilation system is running properly and assume this means gas concentration will be below the lower explosive limit (LEL)",
      "If the previous shift signed off that gas levels were safe, you can rely on their measurement and approve the hot work permit.",
    ],
  },
  {
    id: "q5",
    text: `You find gas cylinders stored close to an excavation because "there was no other place." Describe how you address this situation on site and what corrective and preventive actions you initiate`,
    options: [
      "I would ask the workers to move the gas cylinders a few meters away from the excavation and make sure they're standing upright and chained",
      "I would place warning tape around the cylinders, inform the site supervisor, and note it in the inspection report for later action",
      "I would stop the work and have the gas cylinders moved immediately to a designated, ventilated, and secured storage area away from the excavation, then brief the team to prevent recurrence.",
      "I would tell the team to finish today's work since it's almost done, and relocate the cylinders to the proper area after the shift to avoid disrupting the schedule",
    ],
  },
  {
    id: "q6",
    text: "A residual current device (RCD) keeps tripping on a temporary electrical installation. Explain your diagnostic approach and the key points you would check before authorising continued use",
    options: [
      "stop using the installation, isolate, check for damages, inspect, reconnect devices one by one, RCD test and all of this by a BA5 electrician",
      "Reset the RCD a few times to see if it trips again; if it stays on after two or three attempts, the fault was probably temporary, and work can continue",
      "Since it's a temporary installation, minor tripping is normal due to fluctuating loads. Monitor it for a while, and if production isn't affected, continue using it",
      "Bypass the RCD temporarily to confirm whether the problem comes from the device or the circuit, then reconnect it once work is finished.",
    ],
  },
  {
    id: "q7",
    text: "A subcontractor tells you they have a frequency rate of 90. How do you evaluate this and explain how you come to conclusions",
    options: [
      "I accept that 90 is a good score because higher numbers usually mean better safety performance.",
      "I compare their rate of 90 with last year's company rate to see if they've improved",
      "I ask how the rate was calculated and compare it to industry norms, explaining that a high value means poor performance",
      "I note the figure in my report and move on since it shows they're tracking safety statistics.",
    ],
  },
  {
    id: "q8",
    text: "During an inspection, you notice a chain of multiple extension leads powering hand tools. Rather than quoting a rule, describe how you explain to the crew why this is unsafe and how you convince them to change it.",
    options: [
      "I tell the crew that as long as the total power doesn't exceed the rating of the first extension lead, it's fine to continue using them for today but they should get a longer cable next time.",
      "I warn them to fully uncoil all the extension leads so they don't overheat, but allow them to keep working because uncoiling reduces the risk",
      "I explain that chaining leads causes overheating and shock risk, then help them use one proper cable or closer power source instead.",
      "I explain that it's fine if the connections are dry and off the ground, and ask them to wrap the joints in tape for extra protection",
    ],
  },
  {
    id: "q9",
    text: "You are preparing a risk analysis for maintenance works on a temporary construction site. Explain how you determine which legal framework applies",
    options: [
      "I identify the type of work and site, then apply the national regulations for temporary or mobile construction sites in addition to general safety law",
      "I check what the client applies on their projects and follow the same framework for consistency",
      "I use the general occupational health and safety legislation because it always applies to maintenance work.",
      "I apply the company's internal safety procedures since they cover all legal requirements",
    ],
  },
];

const TEST_DURATION_SECONDS = 4.5 * 60; // 4.5 Minutes (270 seconds)

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[i], arr[j]];
  }
  return arr;
}

export default function KnowledgeTestPage() {
  const [questions, setQuestions] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [showDirectivesModal, setShowDirectivesModal] = useState(false);

  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [timeLeft, setTimeLeft] = useState(TEST_DURATION_SECONDS);

  const tabSwitchCount = useRef(0);
  const focusLossCount = useRef(0);
  const fullscreenExitCount = useRef(0);
  const answerChangeCount = useRef(0);
  const startTime = useRef(null);

  useEffect(() => {
    const randomized = shuffleArray(INITIAL_QUESTIONS).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setQuestions(randomized);
  }, []);

  const handleStartTest = (e) => {
    e.preventDefault();
    if (!email || !name || !agreedTerms) {
      setError("Please fill out your details and accept the terms to proceed.");
      return;
    }
    setError("");

    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }

    startTime.current = Date.now();
    setTestStarted(true);
  };

  useEffect(() => {
    if (!testStarted || submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, submitted]);

  useEffect(() => {
    if (!testStarted || submitted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) tabSwitchCount.current += 1;
    };

    const handleBlur = () => {
      focusLossCount.current += 1;
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        fullscreenExitCount.current += 1;
      }
    };

    const preventCopyPaste = (e) => {
      e.preventDefault();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("copy", preventCopyPaste);
    document.addEventListener("paste", preventCopyPaste);
    document.addEventListener("contextmenu", preventCopyPaste);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("copy", preventCopyPaste);
      document.removeEventListener("paste", preventCopyPaste);
      document.removeEventListener("contextmenu", preventCopyPaste);
    };
  }, [testStarted, submitted]);

  const answeredCount = Object.keys(answers).length;

  function setAnswer(qId, value) {
    setAnswers((prev) => {
      if (prev[qId] && prev[qId] !== value) {
        answerChangeCount.current += 1;
      }
      return { ...prev, [qId]: value };
    });
  }

  async function handleAutoSubmit() {
    setError("Time expired! Automatically submitting your responses...");
    await executeSubmission();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (questions.some((q) => !answers[q.id])) {
      setError("Please answer every question before submitting.");
      return;
    }

    await executeSubmission();
  }

  async function executeSubmission() {
    setSubmitting(true);
    const durationSeconds = startTime.current
      ? Math.round((Date.now() - startTime.current) / 1000)
      : 0;

    const payload = {
      email,
      name,
      answers,
      metrics: {
        durationSeconds,
        tabSwitchCount: tabSwitchCount.current,
        focusLossCount: focusLossCount.current,
        fullscreenExitCount: fullscreenExitCount.current,
        answerChangeCount: answerChangeCount.current,
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
      },
    };

    try {
      const res = await fetch("/api/submit-knowledge-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong submitting your answers. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (submitted) {
    return (
      <main className="wrap">
        <div className="card done">
          <h1>Thank you</h1>
          <p>Your answers have been submitted and recorded.</p>
        </div>
        <Styles />
      </main>
    );
  }

  if (!testStarted) {
    return (
      <main className="wrap">
        <div className="header" style={{ marginTop: "40px" }}>
          <p className="eyebrow">HSE Knowledge Test</p>
          <h1>Candidate Verification & Terms</h1>
          <p className="intro">
            Please enter your credentials and accept the assessment policy to proceed.
          </p>
        </div>

        <form onSubmit={handleStartTest} className="card">
          <div className="field">
            <label>
              Email Address <span className="req">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          <div className="field">
            <label>
              Full Name <span className="req">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="First and Last Name"
            />
          </div>

          <div className="terms-box">
            <h3>Coeus Guarantee & Assessment Policy</h3>
            <ul>
              <li>
                <strong>Fair evaluation:</strong> All tests are reviewed consistently and objectively.
              </li>
              <li>
                <strong>Privacy first:</strong> Your data is handled securely and in compliance with GDPR.
              </li>
              <li>
                <strong>Session Telemetry:</strong> You have <strong>4.5 minutes</strong> to complete all 9 questions. Switching windows or tabs is recorded during the test session.
              </li>
            </ul>

            <div className="directives-actions">
              <button
                type="button"
                className="btn-directives"
                onClick={() => setShowDirectivesModal(true)}
              >
                👁️ View Coeus Europe Directives & Privacy Policy
              </button>
              
              <a 
                href="/docs/coeus-europe-directives.pdf" 
                download="Coeus_Europe_Directives_and_Privacy_Policy.pdf"
                className="btn-download-directives"
              >
                📥 Download Coeus Europe Directives (PDF)
              </a>
            </div>

            <label className="checkbox-label" style={{ marginTop: "16px" }}>
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                required
              />
              <span>
                I agree that my actions are logged, that cheating leads to exemption, and that by clicking I consent to the Coeus Europe directives and data processing policy.
              </span>
            </label>
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="submit">
            Start Test Now
          </button>
        </form>

        {showDirectivesModal && (
          <div className="modal-overlay" onClick={() => setShowDirectivesModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Coeus Europe Directives & Privacy Policy</h2>
              <div className="modal-body">
                <p><strong>Effective Date:</strong> October 2026</p>
                <p>
                  This policy governs the processing of candidate assessment data, contact details, and test metrics by <strong>Coeus Europe</strong> in accordance with GDPR requirements.
                </p>
                <h4>1. Evaluation & Integrity</h4>
                <p>
                  All responses are evaluated objectively using standardized scoring criteria. Screen switching, focus shifts, and tab changes during active tests are logged to prevent unauthorized assistance and maintain assessment integrity.
                </p>
                <h4>2. Data Processing & Retention</h4>
                <p>
                  By continuing, candidates acknowledge that test submissions, telemetry logs, and assessment metrics are recorded and retained by Coeus Europe for recruitment and verification purposes.
                </p>
              </div>
              <div className="modal-footer">
                <a 
                  href="/docs/coeus-europe-directives.pdf" 
                  download="Coeus_Europe_Directives_and_Privacy_Policy.pdf"
                  className="btn-download-modal"
                >
                  📥 Download PDF Copy
                </a>
                <button 
                  type="button" 
                  className="btn-close-modal" 
                  onClick={() => setShowDirectivesModal(false)}
                >
                  Close & Return
                </button>
              </div>
            </div>
          </div>
        )}

        <Styles />
      </main>
    );
  }

  return (
    <main className="wrap">
      <div className="sticky-header">
        <div className="timer-bar">
          <span>Time Remaining:</span>
          <span className={`timer-clock ${timeLeft < 60 ? "warning" : ""}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
        <div className="progress-container">
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${(answeredCount / questions.length) * 100}%` }}
            />
          </div>
          <p className="progress-label">
            {answeredCount} of {questions.length} questions answered
          </p>
        </div>
      </div>

      <div className="header">
        <p className="eyebrow">Candidate: {name}</p>
        <h1>Common HSE matters — multiple choice</h1>
        <p className="intro">
          Select the best response for each situation below and click submit before the timer expires.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card">
        {questions.map((q, i) => (
          <QuestionBlock key={q.id} number={i + 1} q={q} value={answers[q.id]} onChange={setAnswer} />
        ))}

        {error && <div className="error">{error}</div>}

        <button type="submit" disabled={submitting} className="submit">
          {submitting ? "Submitting…" : "Submit answers"}
        </button>
      </form>

      <Styles />
    </main>
  );
}

function QuestionBlock({ number, q, value, onChange }) {
  return (
    <div className="field question">
      <div className="q-head">
        <span className="q-num">{number}</span>
        <p className="q-text">
          {q.text}
          <span className="req"> *</span>
        </p>
      </div>
      <div className="options">
        {q.options.map((opt, i) => {
          const checked = value === opt;
          return (
            <label key={i} className={`option${checked ? " checked" : ""}`}>
              <input
                type="radio"
                name={q.id}
                value={opt}
                checked={checked}
                onChange={() => onChange(q.id, opt)}
                required
              />
              <span className="dot" aria-hidden="true" />
              <span className="opt-text">{opt}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function Styles() {
  return (
    <style jsx global>{`
      :root {
        --navy: #10324f;
        --navy-dark: #0b2338;
        --amber: #e2a400;
        --bg: #f6f6f3;
        --card: #ffffff;
        --ink: #1c2430;
        --ink-soft: #5b6472;
        --border: #dcdcd6;
        --danger: #b3261e;
      }
      * { box-sizing: border-box; user-select: none; }
      body { margin: 0; background: var(--bg); }
      .wrap {
        max-width: 680px;
        margin: 0 auto;
        padding: 0 20px 96px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
        color: var(--ink);
      }
      .sticky-header {
        position: sticky;
        top: 0;
        z-index: 100;
        background: var(--bg);
        padding-top: 16px;
        padding-bottom: 12px;
        margin-bottom: 24px;
        border-bottom: 1px solid var(--border);
      }
      .timer-bar {
        background: var(--navy);
        color: #fff;
        padding: 10px 18px;
        border-radius: 8px;
        display: flex;
        justify-space: space-between;
        align-items: center;
        font-weight: 600;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      }
      .timer-clock { font-size: 18px; font-variant-numeric: tabular-nums; }
      .timer-clock.warning { color: #ff6b6b; }
      .progress-container {
        margin-top: 10px;
        background: #fff;
        padding: 10px 14px;
        border-radius: 8px;
        border: 1px solid var(--border);
        box-shadow: 0 2px 6px rgba(0,0,0,0.04);
      }
      .progress-track { height: 6px; background: var(--border); border-radius: 999px; overflow: hidden; }
      .progress-fill { height: 100%; background: var(--amber); transition: width 0.2s ease; }
      .progress-label { font-size: 12.5px; color: var(--ink-soft); margin: 6px 0 0; font-weight: 500; }
      .header { margin-bottom: 28px; }
      .eyebrow { color: var(--navy); font-weight: 600; font-size: 14px; margin: 0 0 8px; }
      h1 { font-size: 26px; line-height: 1.3; margin: 0 0 12px; }
      .intro { color: var(--ink-soft); font-size: 15px; line-height: 1.6; margin: 0; }
      .card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 32px; }
      .card.done { text-align: center; padding: 56px 32px; margin-top: 32px; }
      .field { margin-bottom: 24px; }
      .field > label { display: block; font-weight: 600; font-size: 15px; margin-bottom: 8px; }
      .req { color: var(--danger); }
      .field input[type="email"], .field input[type="text"] {
        width: 100%; padding: 12px 14px; font-size: 15px; border: 1px solid var(--border); border-radius: 8px; user-select: text;
      }
      .terms-box {
        background: #f9f9f7;
        border: 1px solid var(--border);
        border-radius: 8px;
        padding: 18px;
        margin-bottom: 24px;
      }
      .terms-box h3 { margin: 0 0 10px; font-size: 15px; color: var(--navy); }
      .terms-box ul { margin: 0 0 16px; padding-left: 20px; font-size: 14px; color: var(--ink-soft); }
      .terms-box li { margin-bottom: 8px; line-height: 1.4; }
      .directives-actions {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 12px;
      }
      .btn-directives {
        background: #eef4f8;
        border: 1px solid var(--navy);
        color: var(--navy);
        padding: 10px 14px;
        border-radius: 6px;
        font-size: 13.5px;
        font-weight: 600;
        cursor: pointer;
        width: 100%;
        text-align: center;
      }
      .btn-directives:hover { background: #e2ecf3; }
      .btn-download-directives {
        background: #ffffff;
        border: 1px dashed var(--navy);
        color: var(--navy);
        padding: 10px 14px;
        border-radius: 6px;
        font-size: 13.5px;
        font-weight: 600;
        text-align: center;
        text-decoration: none;
        display: block;
      }
      .btn-download-directives:hover { background: #f0f4f8; }
      .checkbox-label { display: flex; gap: 10px; align-items: flex-start; font-size: 13.5px; color: var(--ink); cursor: pointer; }
      .checkbox-label input { margin-top: 3px; cursor: pointer; }
      .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
      }
      .modal-content {
        background: #fff;
        border-radius: 10px;
        padding: 24px;
        max-width: 560px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      }
      .modal-content h2 { margin-top: 0; font-size: 20px; color: var(--navy); }
      .modal-body { font-size: 14px; line-height: 1.6; color: var(--ink); margin-bottom: 20px; }
      .modal-footer { display: flex; gap: 10px; flex-wrap: wrap; }
      .btn-download-modal {
        flex: 1;
        background: #eef4f8;
        color: var(--navy);
        border: 1px solid var(--navy);
        padding: 10px;
        border-radius: 6px;
        text-align: center;
        text-decoration: none;
        font-weight: 600;
        font-size: 13.5px;
      }
      .btn-close-modal {
        flex: 1;
        background: var(--navy);
        color: #fff;
        border: none;
        padding: 10px;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        font-size: 13.5px;
      }
      .question { border-top: 1px solid var(--border); padding-top: 24px; }
      .q-head { display: flex; gap: 12px; margin-bottom: 14px; }
      .q-num { width: 28px; height: 28px; border-radius: 50%; background: var(--navy); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; flex: none; }
      .q-text { margin: 0; font-weight: 600; font-size: 15.5px; line-height: 1.5; }
      .options { display: flex; flex-direction: column; gap: 8px; margin-left: 40px; }
      .option { display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; border: 1px solid var(--border); border-radius: 8px; cursor: pointer; font-size: 14.5px; }
      .option.checked { border-color: var(--navy); background: #eef4f8; }
      .option input[type="radio"] { position: absolute; opacity: 0; }
      .dot { width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--border); position: relative; flex: none; margin-top: 1px; }
      .option.checked .dot { border-color: var(--navy); }
      .option.checked .dot::after { content: ""; position: absolute; inset: 3px; border-radius: 50%; background: var(--navy); }
      .error { background: #fdecea; border: 1px solid #f2b8b5; color: #8c1d13; padding: 12px 14px; border-radius: 8px; margin-bottom: 20px; }
      .submit { width: 100%; padding: 14px 20px; font-size: 16px; font-weight: 600; color: #fff; background: var(--navy); border: none; border-radius: 8px; cursor: pointer; }
      .submit:disabled { background: #9aa5b1; cursor: not-allowed; }
      @media (max-width: 480px) {
        .options { margin-left: 0; }
        .modal-footer { flex-direction: column; }
      }
    `}</style>
  );
}