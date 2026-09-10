// // // // Deploy path in your Vercel/Next.js project: app/knowledge-test/page.jsx
// // // //
// // // // PHASE 1 ONLY: this replicates the existing Google Form exactly — same
// // // // questions, same order, same wording. It does NOT yet include the timer,
// // // // navigation lock, copy/paste block, or the GDPR/consent step — those are
// // // // Phase 2 and Phase 3, added on top of this once this page is confirmed working.

// // // "use client";
// // // import { useState } from "react";

// // // // Each question's `id` is used as the column key sent to the API — keep
// // // // these stable once you're live, since they map to fixed sheet columns.
// // // const QUESTIONS = [
// // //   {
// // //     id: "q1",
// // //     text: `An incident report states: "Human error — worker forgot to lock out." Describe how you would verify whether this conclusion is valid and what deeper causes you would investigate`,
// // //     options: [
// // //       "I'd verify if procedures, supervision, and conditions made lockout possible, and investigate why the system allowed the lapse—not just the worker",
// // //       "I would organize a refresher training for all workers on lockout/tagout",
// // //       "I would ask the worker why he forgot and remind him to follow procedures next time",
// // //       "I would confirm with the supervisor that the worker indeed forgot to lock out and close the case as human error",
// // //     ],
// // //   },
// // //   {
// // //     id: "q2",
// // //     text: "A subcontractor brings a new machine to site with a CE mark. Explain what safety checks you, as the HSE Manager, must still perform before allowing it to be used",
// // //     options: [
// // //       "Since the machine has a CE mark, no further checks are necessary.",
// // //       "Just make sure the operator has the CE certificate and a copy of the declaration of conformity on sit",
// // //       "you still need to verify the machine and make a risk analysis",
// // //       "ask for the invoice, CE certificate, copy of declaration of conformity and the notified body certificate",
// // //     ],
// // //   },
// // //   {
// // //     id: "q3",
// // //     text: `A worker says he "doesn't smell any gas, so it's safe." Explain, how you would handle this situation as HSE responsible`,
// // //     options: [
// // //       "If no one reports smelling gas after ventilation, allow work to resume and note it in the shift log",
// // //       "Do a quick visual scan for obvious leaks or damaged piping.",
// // //       "always measure gases when you are informed there are dangerous gases present",
// // //       "do a lakmus test to find dangerous gases",
// // //     ],
// // //   },
// // //   {
// // //     id: "q4",
// // //     text: "You are reviewing a hot work permit in a chemical plant. How do you evaluate if the gas concentration is within a safe range",
// // //     options: [
// // //       "Ask the operator if the area smells normal and if there were any alarms recently",
// // //       "verify the MAC value and measure",
// // //       "Check that the ventilation system is running properly and assume this means gas concentration will be below the lower explosive limit (LEL)",
// // //       "If the previous shift signed off that gas levels were safe, you can rely on their measurement and approve the hot work permit.",
// // //     ],
// // //   },
// // //   {
// // //     id: "q5",
// // //     text: `You find gas cylinders stored close to an excavation because "there was no other place." Describe how you address this situation on site and what corrective and preventive actions you initiate`,
// // //     options: [
// // //       "I would ask the workers to move the gas cylinders a few meters away from the excavation and make sure they're standing upright and chained",
// // //       "I would place warning tape around the cylinders, inform the site supervisor, and note it in the inspection report for later action",
// // //       "I would stop the work and have the gas cylinders moved immediately to a designated, ventilated, and secured storage area away from the excavation, then brief the team to prevent recurrence.",
// // //       "I would tell the team to finish today's work since it's almost done, and relocate the cylinders to the proper area after the shift to avoid disrupting the schedule",
// // //     ],
// // //   },
// // //   {
// // //     id: "q6",
// // //     text: "A residual current device (RCD) keeps tripping on a temporary electrical installation. Explain your diagnostic approach and the key points you would check before authorising continued use",
// // //     options: [
// // //       "stop using the installation, isolate, check for damages, inspect, reconnect devices one by one, RCD test and all of this by a BA5 electrician",
// // //       "Reset the RCD a few times to see if it trips again; if it stays on after two or three attempts, the fault was probably temporary, and work can continue",
// // //       "Since it's a temporary installation, minor tripping is normal due to fluctuating loads. Monitor it for a while, and if production isn't affected, continue using it",
// // //       "Bypass the RCD temporarily to confirm whether the problem comes from the device or the circuit, then reconnect it once work is finished.",
// // //     ],
// // //   },
// // //   {
// // //     id: "q7",
// // //     text: "A subcontractor tells you they have a frequency rate of 90. How do you evaluate this and explain how you come to conclusions",
// // //     options: [
// // //       "I accept that 90 is a good score because higher numbers usually mean better safety performance.",
// // //       "I compare their rate of 90 with last year's company rate to see if they've improved",
// // //       "I ask how the rate was calculated and compare it to industry norms, explaining that a high value means poor performance",
// // //       "I note the figure in my report and move on since it shows they're tracking safety statistics.",
// // //     ],
// // //   },
// // //   {
// // //     id: "q8",
// // //     text: "During an inspection, you notice a chain of multiple extension leads powering hand tools. Rather than quoting a rule, describe how you explain to the crew why this is unsafe and how you convince them to change it.",
// // //     options: [
// // //       "I tell the crew that as long as the total power doesn't exceed the rating of the first extension lead, it's fine to continue using them for today but they should get a longer cable next time.",
// // //       "I warn them to fully uncoil all the extension leads so they don't overheat, but allow them to keep working because uncoiling reduces the risk",
// // //       "I explain that chaining leads causes overheating and shock risk, then help them use one proper cable or closer power source instead.",
// // //       "I explain that it's fine if the connections are dry and off the ground, and ask them to wrap the joints in tape for extra protection",
// // //     ],
// // //   },
// // //   {
// // //     id: "q9",
// // //     text: "You are preparing a risk analysis for maintenance works on a temporary construction site. Explain how you determine which legal framework applies",
// // //     options: [
// // //       "I identify the type of work and site, then apply the national regulations for temporary or mobile construction sites in addition to general safety law",
// // //       "I check what the client applies on their projects and follow the same framework for consistency",
// // //       "I use the general occupational health and safety legislation because it always applies to maintenance work.",
// // //       "I apply the company's internal safety procedures since they cover all legal requirements",
// // //     ],
// // //   },
// // // ];

// // // export default function KnowledgeTestPage() {
// // //   const [email, setEmail] = useState("");
// // //   const [name, setName] = useState("");
// // //   const [answers, setAnswers] = useState({});
// // //   const [submitting, setSubmitting] = useState(false);
// // //   const [submitted, setSubmitted] = useState(false);
// // //   const [error, setError] = useState("");

// // //   function setAnswer(qId, value) {
// // //     setAnswers((prev) => ({ ...prev, [qId]: value }));
// // //   }

// // //   async function handleSubmit(e) {
// // //     e.preventDefault();
// // //     setError("");

// // //     // Same "required" behaviour as the original Google Form: every field is mandatory.
// // //     if (!email || !name || QUESTIONS.some((q) => !answers[q.id])) {
// // //       setError("Please answer every question before submitting.");
// // //       return;
// // //     }

// // //     setSubmitting(true);
// // //     try {
// // //       const res = await fetch("/api/submit-knowledge-test", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ email, name, answers }),
// // //       });
// // //       if (!res.ok) throw new Error("Submission failed");
// // //       setSubmitted(true);
// // //     } catch (err) {
// // //       setError("Something went wrong submitting your answers. Please try again.");
// // //     } finally {
// // //       setSubmitting(false);
// // //     }
// // //   }

// // //   if (submitted) {
// // //     return (
// // //       <div style={{ maxWidth: 700, margin: "60px auto", padding: "0 20px", fontFamily: "sans-serif" }}>
// // //         <h2>Thank you!</h2>
// // //         <p>Your answers have been submitted.</p>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div style={{ maxWidth: 700, margin: "60px auto", padding: "0 20px", fontFamily: "sans-serif" }}>
// // //       <h1>HSE knowledge test (multiple choice)</h1>
// // //       <p>
// // //         The aim of this test is to see which knowledge you have on common HSE matters.
// // //         When done please hit the &quot;submit&quot; button at the end. Thank you for responding.
// // //       </p>

// // //       <form onSubmit={handleSubmit}>
// // //         <div style={{ marginBottom: 24 }}>
// // //           <label style={{ fontWeight: "bold" }}>Email *</label><br />
// // //           <input
// // //             type="email"
// // //             value={email}
// // //             onChange={(e) => setEmail(e.target.value)}
// // //             required
// // //             style={{ width: "100%", padding: 8, marginTop: 6 }}
// // //           />
// // //         </div>

// // //         {/* Q1–Q3 */}
// // //         {QUESTIONS.slice(0, 3).map((q) => (
// // //           <QuestionBlock key={q.id} q={q} value={answers[q.id]} onChange={setAnswer} />
// // //         ))}

// // //         {/* Name field sits here in the original form, between Q3 and Q4 — kept intentionally */}
// // //         <div style={{ marginBottom: 24 }}>
// // //           <label style={{ fontWeight: "bold" }}>What is your name and surname *</label><br />
// // //           <input
// // //             type="text"
// // //             value={name}
// // //             onChange={(e) => setName(e.target.value)}
// // //             required
// // //             style={{ width: "100%", padding: 8, marginTop: 6 }}
// // //           />
// // //         </div>

// // //         {/* Q4–Q9 */}
// // //         {QUESTIONS.slice(3).map((q) => (
// // //           <QuestionBlock key={q.id} q={q} value={answers[q.id]} onChange={setAnswer} />
// // //         ))}

// // //         {error && <p style={{ color: "#b00020" }}>{error}</p>}

// // //         <button type="submit" disabled={submitting} style={{ padding: "10px 24px", fontSize: 16 }}>
// // //           {submitting ? "Submitting..." : "Submit"}
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // }

// // // function QuestionBlock({ q, value, onChange }) {
// // //   return (
// // //     <div style={{ marginBottom: 24 }}>
// // //       <p style={{ fontWeight: "bold", whiteSpace: "pre-wrap" }}>{q.text} *</p>
// // //       {q.options.map((opt, i) => (
// // //         <label key={i} style={{ display: "block", marginBottom: 6, fontWeight: "normal" }}>
// // //           <input
// // //             type="radio"
// // //             name={q.id}
// // //             value={opt}
// // //             checked={value === opt}
// // //             onChange={() => onChange(q.id, opt)}
// // //             required
// // //           />{" "}
// // //           {opt}
// // //         </label>
// // //       ))}
// // //     </div>
// // //   );
// // // }















// // // Deploy path in your Vercel/Next.js project: app/knowledge-test/page.jsx
// // //
// // // PHASE 1 ONLY: replicates the existing Google Form's content exactly — same
// // // questions, same order, same wording. No timer, navigation lock, or consent
// // // step yet — those are Phase 2 and Phase 3, layered on once this is confirmed
// // // working end-to-end.

// // "use client";
// // import { useState } from "react";

// // const QUESTIONS = [
// //   {
// //     id: "q1",
// //     text: `An incident report states: "Human error — worker forgot to lock out." Describe how you would verify whether this conclusion is valid and what deeper causes you would investigate`,
// //     options: [
// //       "I'd verify if procedures, supervision, and conditions made lockout possible, and investigate why the system allowed the lapse—not just the worker",
// //       "I would organize a refresher training for all workers on lockout/tagout",
// //       "I would ask the worker why he forgot and remind him to follow procedures next time",
// //       "I would confirm with the supervisor that the worker indeed forgot to lock out and close the case as human error",
// //     ],
// //   },
// //   {
// //     id: "q2",
// //     text: "A subcontractor brings a new machine to site with a CE mark. Explain what safety checks you, as the HSE Manager, must still perform before allowing it to be used",
// //     options: [
// //       "Since the machine has a CE mark, no further checks are necessary.",
// //       "Just make sure the operator has the CE certificate and a copy of the declaration of conformity on sit",
// //       "you still need to verify the machine and make a risk analysis",
// //       "ask for the invoice, CE certificate, copy of declaration of conformity and the notified body certificate",
// //     ],
// //   },
// //   {
// //     id: "q3",
// //     text: `A worker says he "doesn't smell any gas, so it's safe." Explain, how you would handle this situation as HSE responsible`,
// //     options: [
// //       "If no one reports smelling gas after ventilation, allow work to resume and note it in the shift log",
// //       "Do a quick visual scan for obvious leaks or damaged piping.",
// //       "always measure gases when you are informed there are dangerous gases present",
// //       "do a lakmus test to find dangerous gases",
// //     ],
// //   },
// //   {
// //     id: "q4",
// //     text: "You are reviewing a hot work permit in a chemical plant. How do you evaluate if the gas concentration is within a safe range",
// //     options: [
// //       "Ask the operator if the area smells normal and if there were any alarms recently",
// //       "verify the MAC value and measure",
// //       "Check that the ventilation system is running properly and assume this means gas concentration will be below the lower explosive limit (LEL)",
// //       "If the previous shift signed off that gas levels were safe, you can rely on their measurement and approve the hot work permit.",
// //     ],
// //   },
// //   {
// //     id: "q5",
// //     text: `You find gas cylinders stored close to an excavation because "there was no other place." Describe how you address this situation on site and what corrective and preventive actions you initiate`,
// //     options: [
// //       "I would ask the workers to move the gas cylinders a few meters away from the excavation and make sure they're standing upright and chained",
// //       "I would place warning tape around the cylinders, inform the site supervisor, and note it in the inspection report for later action",
// //       "I would stop the work and have the gas cylinders moved immediately to a designated, ventilated, and secured storage area away from the excavation, then brief the team to prevent recurrence.",
// //       "I would tell the team to finish today's work since it's almost done, and relocate the cylinders to the proper area after the shift to avoid disrupting the schedule",
// //     ],
// //   },
// //   {
// //     id: "q6",
// //     text: "A residual current device (RCD) keeps tripping on a temporary electrical installation. Explain your diagnostic approach and the key points you would check before authorising continued use",
// //     options: [
// //       "stop using the installation, isolate, check for damages, inspect, reconnect devices one by one, RCD test and all of this by a BA5 electrician",
// //       "Reset the RCD a few times to see if it trips again; if it stays on after two or three attempts, the fault was probably temporary, and work can continue",
// //       "Since it's a temporary installation, minor tripping is normal due to fluctuating loads. Monitor it for a while, and if production isn't affected, continue using it",
// //       "Bypass the RCD temporarily to confirm whether the problem comes from the device or the circuit, then reconnect it once work is finished.",
// //     ],
// //   },
// //   {
// //     id: "q7",
// //     text: "A subcontractor tells you they have a frequency rate of 90. How do you evaluate this and explain how you come to conclusions",
// //     options: [
// //       "I accept that 90 is a good score because higher numbers usually mean better safety performance.",
// //       "I compare their rate of 90 with last year's company rate to see if they've improved",
// //       "I ask how the rate was calculated and compare it to industry norms, explaining that a high value means poor performance",
// //       "I note the figure in my report and move on since it shows they're tracking safety statistics.",
// //     ],
// //   },
// //   {
// //     id: "q8",
// //     text: "During an inspection, you notice a chain of multiple extension leads powering hand tools. Rather than quoting a rule, describe how you explain to the crew why this is unsafe and how you convince them to change it.",
// //     options: [
// //       "I tell the crew that as long as the total power doesn't exceed the rating of the first extension lead, it's fine to continue using them for today but they should get a longer cable next time.",
// //       "I warn them to fully uncoil all the extension leads so they don't overheat, but allow them to keep working because uncoiling reduces the risk",
// //       "I explain that chaining leads causes overheating and shock risk, then help them use one proper cable or closer power source instead.",
// //       "I explain that it's fine if the connections are dry and off the ground, and ask them to wrap the joints in tape for extra protection",
// //     ],
// //   },
// //   {
// //     id: "q9",
// //     text: "You are preparing a risk analysis for maintenance works on a temporary construction site. Explain how you determine which legal framework applies",
// //     options: [
// //       "I identify the type of work and site, then apply the national regulations for temporary or mobile construction sites in addition to general safety law",
// //       "I check what the client applies on their projects and follow the same framework for consistency",
// //       "I use the general occupational health and safety legislation because it always applies to maintenance work.",
// //       "I apply the company's internal safety procedures since they cover all legal requirements",
// //     ],
// //   },
// // ];

// // const TOTAL_FIELDS = QUESTIONS.length + 2; // + email + name

// // export default function KnowledgeTestPage() {
// //   const [email, setEmail] = useState("");
// //   const [name, setName] = useState("");
// //   const [answers, setAnswers] = useState({});
// //   const [submitting, setSubmitting] = useState(false);
// //   const [submitted, setSubmitted] = useState(false);
// //   const [error, setError] = useState("");

// //   const answeredCount =
// //     (email ? 1 : 0) + (name ? 1 : 0) + Object.keys(answers).length;

// //   function setAnswer(qId, value) {
// //     setAnswers((prev) => ({ ...prev, [qId]: value }));
// //   }

// //   async function handleSubmit(e) {
// //     e.preventDefault();
// //     setError("");

// //     if (!email || !name || QUESTIONS.some((q) => !answers[q.id])) {
// //       setError("Please answer every question before submitting.");
// //       return;
// //     }

// //     setSubmitting(true);
// //     try {
// //       const res = await fetch("/api/submit-knowledge-test", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email, name, answers }),
// //       });
// //       if (!res.ok) throw new Error("Submission failed");
// //       setSubmitted(true);
// //     } catch (err) {
// //       setError("Something went wrong submitting your answers. Please try again.");
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   }

// //   if (submitted) {
// //     return (
// //       <main className="wrap">
// //         <div className="card done">
// //           <h1>Thank you</h1>
// //           <p>Your answers have been submitted and recorded.</p>
// //         </div>
// //         <Styles />
// //       </main>
// //     );
// //   }

// //   return (
// //     <main className="wrap">
// //       <div className="header">
// //         <p className="eyebrow">HSE Knowledge Test</p>
// //         <h1>Common HSE matters — multiple choice</h1>
// //         <p className="intro">
// //           This test checks your knowledge of common HSE (Health, Safety &amp;
// //           Environment) situations. Answer every question, then submit at the
// //           end.
// //         </p>
// //         <div className="progress-track">
// //           <div
// //             className="progress-fill"
// //             style={{ width: `${(answeredCount / TOTAL_FIELDS) * 100}%` }}
// //           />
// //         </div>
// //         <p className="progress-label">
// //           {answeredCount} of {TOTAL_FIELDS} fields answered
// //         </p>
// //       </div>

// //       <form onSubmit={handleSubmit} className="card">
// //         <Field label="Email" required>
// //           <input
// //             type="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //             placeholder="you@example.com"
// //           />
// //         </Field>

// //         {QUESTIONS.slice(0, 3).map((q, i) => (
// //           <QuestionBlock key={q.id} number={i + 1} q={q} value={answers[q.id]} onChange={setAnswer} />
// //         ))}

// //         <Field label="What is your name and surname" required>
// //           <input
// //             type="text"
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //             required
// //             placeholder="Full name"
// //           />
// //         </Field>

// //         {QUESTIONS.slice(3).map((q, i) => (
// //           <QuestionBlock key={q.id} number={i + 4} q={q} value={answers[q.id]} onChange={setAnswer} />
// //         ))}

// //         {error && <div className="error">{error}</div>}

// //         <button type="submit" disabled={submitting} className="submit">
// //           {submitting ? "Submitting…" : "Submit answers"}
// //         </button>
// //       </form>

// //       <Styles />
// //     </main>
// //   );
// // }

// // function Field({ label, required, children }) {
// //   return (
// //     <div className="field">
// //       <label>
// //         {label}
// //         {required && <span className="req"> *</span>}
// //       </label>
// //       {children}
// //     </div>
// //   );
// // }

// // function QuestionBlock({ number, q, value, onChange }) {
// //   return (
// //     <div className="field question">
// //       <div className="q-head">
// //         <span className="q-num">{number}</span>
// //         <p className="q-text">
// //           {q.text}
// //           <span className="req"> *</span>
// //         </p>
// //       </div>
// //       <div className="options">
// //         {q.options.map((opt, i) => {
// //           const checked = value === opt;
// //           return (
// //             <label key={i} className={`option${checked ? " checked" : ""}`}>
// //               <input
// //                 type="radio"
// //                 name={q.id}
// //                 value={opt}
// //                 checked={checked}
// //                 onChange={() => onChange(q.id, opt)}
// //                 required
// //               />
// //               <span className="dot" aria-hidden="true" />
// //               <span className="opt-text">{opt}</span>
// //             </label>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }

// // function Styles() {
// //   return (
// //     <style jsx global>{`
// //       :root {
// //         --navy: #10324f;
// //         --navy-dark: #0b2338;
// //         --amber: #e2a400;
// //         --bg: #f6f6f3;
// //         --card: #ffffff;
// //         --ink: #1c2430;
// //         --ink-soft: #5b6472;
// //         --border: #dcdcd6;
// //       }
// //       * { box-sizing: border-box; }
// //       body { margin: 0; background: var(--bg); }
// //       .wrap {
// //         max-width: 680px;
// //         margin: 0 auto;
// //         padding: 48px 20px 96px;
// //         font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
// //         color: var(--ink);
// //       }
// //       .header { margin-bottom: 28px; }
// //       .eyebrow {
// //         color: var(--navy);
// //         font-weight: 600;
// //         font-size: 14px;
// //         margin: 0 0 8px;
// //         letter-spacing: 0.02em;
// //       }
// //       h1 {
// //         font-size: 26px;
// //         line-height: 1.3;
// //         margin: 0 0 12px;
// //         color: var(--ink);
// //       }
// //       .intro {
// //         color: var(--ink-soft);
// //         font-size: 15px;
// //         line-height: 1.6;
// //         margin: 0 0 20px;
// //         max-width: 60ch;
// //       }
// //       .progress-track {
// //         height: 6px;
// //         background: var(--border);
// //         border-radius: 999px;
// //         overflow: hidden;
// //       }
// //       .progress-fill {
// //         height: 100%;
// //         background: var(--amber);
// //         transition: width 0.2s ease;
// //       }
// //       .progress-label {
// //         font-size: 13px;
// //         color: var(--ink-soft);
// //         margin: 8px 0 0;
// //       }
// //       .card {
// //         background: var(--card);
// //         border: 1px solid var(--border);
// //         border-radius: 10px;
// //         padding: 32px;
// //       }
// //       .card.done {
// //         text-align: center;
// //         padding: 56px 32px;
// //       }
// //       .field { margin-bottom: 28px; }
// //       .field > label {
// //         display: block;
// //         font-weight: 600;
// //         font-size: 15px;
// //         margin-bottom: 8px;
// //         color: var(--ink);
// //       }
// //       .req { color: #b3261e; }
// //       .field input[type="email"],
// //       .field input[type="text"] {
// //         width: 100%;
// //         padding: 12px 14px;
// //         font-size: 15px;
// //         border: 1px solid var(--border);
// //         border-radius: 8px;
// //         background: #fff;
// //         color: var(--ink);
// //       }
// //       .field input:focus {
// //         outline: 2px solid var(--navy);
// //         outline-offset: 1px;
// //         border-color: var(--navy);
// //       }
// //       .question { border-top: 1px solid var(--border); padding-top: 24px; }
// //       .field:first-of-type.question { border-top: none; padding-top: 0; }
// //       .q-head {
// //         display: flex;
// //         gap: 12px;
// //         align-items: flex-start;
// //         margin-bottom: 14px;
// //       }
// //       .q-num {
// //         flex: none;
// //         width: 28px;
// //         height: 28px;
// //         border-radius: 50%;
// //         background: var(--navy);
// //         color: #fff;
// //         font-size: 13px;
// //         font-weight: 600;
// //         display: flex;
// //         align-items: center;
// //         justify-content: center;
// //       }
// //       .q-text {
// //         margin: 0;
// //         font-weight: 600;
// //         font-size: 15.5px;
// //         line-height: 1.5;
// //         white-space: pre-wrap;
// //       }
// //       .options {
// //         display: flex;
// //         flex-direction: column;
// //         gap: 8px;
// //         margin-left: 40px;
// //       }
// //       .option {
// //         display: flex;
// //         align-items: flex-start;
// //         gap: 10px;
// //         padding: 12px 14px;
// //         border: 1px solid var(--border);
// //         border-radius: 8px;
// //         cursor: pointer;
// //         font-size: 14.5px;
// //         line-height: 1.5;
// //         color: var(--ink);
// //       }
// //       .option:hover { border-color: var(--navy); }
// //       .option.checked {
// //         border-color: var(--navy);
// //         background: #eef4f8;
// //       }
// //       .option input[type="radio"] {
// //         position: absolute;
// //         opacity: 0;
// //         width: 0;
// //         height: 0;
// //       }
// //       .dot {
// //         flex: none;
// //         width: 18px;
// //         height: 18px;
// //         margin-top: 1px;
// //         border-radius: 50%;
// //         border: 2px solid var(--border);
// //         position: relative;
// //       }
// //       .option.checked .dot {
// //         border-color: var(--navy);
// //       }
// //       .option.checked .dot::after {
// //         content: "";
// //         position: absolute;
// //         inset: 3px;
// //         border-radius: 50%;
// //         background: var(--navy);
// //       }
// //       .option input:focus-visible ~ .dot {
// //         outline: 2px solid var(--navy);
// //         outline-offset: 2px;
// //       }
// //       .error {
// //         background: #fdecea;
// //         border: 1px solid #f2b8b5;
// //         color: #8c1d13;
// //         padding: 12px 14px;
// //         border-radius: 8px;
// //         font-size: 14px;
// //         margin-bottom: 20px;
// //       }
// //       .submit {
// //         width: 100%;
// //         padding: 14px 20px;
// //         font-size: 16px;
// //         font-weight: 600;
// //         color: #fff;
// //         background: var(--navy);
// //         border: none;
// //         border-radius: 8px;
// //         cursor: pointer;
// //       }
// //       .submit:hover:not(:disabled) { background: var(--navy-dark); }
// //       .submit:disabled { background: #9aa5b1; cursor: not-allowed; }
// //       .submit:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }

// //       @media (max-width: 480px) {
// //         .card { padding: 22px; }
// //         .options { margin-left: 0; }
// //         h1 { font-size: 22px; }
// //       }
// //     `}</style>
// //   );
// // }









































// "use client";
// import { useState, useEffect, useRef } from "react";

// const QUESTIONS = [
//   {
//     id: "q1",
//     text: `An incident report states: "Human error — worker forgot to lock out." Describe how you would verify whether this conclusion is valid and what deeper causes you would investigate`,
//     options: [
//       "I'd verify if procedures, supervision, and conditions made lockout possible, and investigate why the system allowed the lapse—not just the worker",
//       "I would organize a refresher training for all workers on lockout/tagout",
//       "I would ask the worker why he forgot and remind him to follow procedures next time",
//       "I would confirm with the supervisor that the worker indeed forgot to lock out and close the case as human error",
//     ],
//   },
//   {
//     id: "q2",
//     text: "A subcontractor brings a new machine to site with a CE mark. Explain what safety checks you, as the HSE Manager, must still perform before allowing it to be used",
//     options: [
//       "Since the machine has a CE mark, no further checks are necessary.",
//       "Just make sure the operator has the CE certificate and a copy of the declaration of conformity on sit",
//       "you still need to verify the machine and make a risk analysis",
//       "ask for the invoice, CE certificate, copy of declaration of conformity and the notified body certificate",
//     ],
//   },
//   {
//     id: "q3",
//     text: `A worker says he "doesn't smell any gas, so it's safe." Explain, how you would handle this situation as HSE responsible`,
//     options: [
//       "If no one reports smelling gas after ventilation, allow work to resume and note it in the shift log",
//       "Do a quick visual scan for obvious leaks or damaged piping.",
//       "always measure gases when you are informed there are dangerous gases present",
//       "do a lakmus test to find dangerous gases",
//     ],
//   },
//   {
//     id: "q4",
//     text: "You are reviewing a hot work permit in a chemical plant. How do you evaluate if the gas concentration is within a safe range",
//     options: [
//       "Ask the operator if the area smells normal and if there were any alarms recently",
//       "verify the MAC value and measure",
//       "Check that the ventilation system is running properly and assume this means gas concentration will be below the lower explosive limit (LEL)",
//       "If the previous shift signed off that gas levels were safe, you can rely on their measurement and approve the hot work permit.",
//     ],
//   },
//   {
//     id: "q5",
//     text: `You find gas cylinders stored close to an excavation because "there was no other place." Describe how you address this situation on site and what corrective and preventive actions you initiate`,
//     options: [
//       "I would ask the workers to move the gas cylinders a few meters away from the excavation and make sure they're standing upright and chained",
//       "I would place warning tape around the cylinders, inform the site supervisor, and note it in the inspection report for later action",
//       "I would stop the work and have the gas cylinders moved immediately to a designated, ventilated, and secured storage area away from the excavation, then brief the team to prevent recurrence.",
//       "I would tell the team to finish today's work since it's almost done, and relocate the cylinders to the proper area after the shift to avoid disrupting the schedule",
//     ],
//   },
//   {
//     id: "q6",
//     text: "A residual current device (RCD) keeps tripping on a temporary electrical installation. Explain your diagnostic approach and the key points you would check before authorising continued use",
//     options: [
//       "stop using the installation, isolate, check for damages, inspect, reconnect devices one by one, RCD test and all of this by a BA5 electrician",
//       "Reset the RCD a few times to see if it trips again; if it stays on after two or three attempts, the fault was probably temporary, and work can continue",
//       "Since it's a temporary installation, minor tripping is normal due to fluctuating loads. Monitor it for a while, and if production isn't affected, continue using it",
//       "Bypass the RCD temporarily to confirm whether the problem comes from the device or the circuit, then reconnect it once work is finished.",
//     ],
//   },
//   {
//     id: "q7",
//     text: "A subcontractor tells you they have a frequency rate of 90. How do you evaluate this and explain how you come to conclusions",
//     options: [
//       "I accept that 90 is a good score because higher numbers usually mean better safety performance.",
//       "I compare their rate of 90 with last year's company rate to see if they've improved",
//       "I ask how the rate was calculated and compare it to industry norms, explaining that a high value means poor performance",
//       "I note the figure in my report and move on since it shows they're tracking safety statistics.",
//     ],
//   },
//   {
//     id: "q8",
//     text: "During an inspection, you notice a chain of multiple extension leads powering hand tools. Rather than quoting a rule, describe how you explain to the crew why this is unsafe and how you convince them to change it.",
//     options: [
//       "I tell the crew that as long as the total power doesn't exceed the rating of the first extension lead, it's fine to continue using them for today but they should get a longer cable next time.",
//       "I warn them to fully uncoil all the extension leads so they don't overheat, but allow them to keep working because uncoiling reduces the risk",
//       "I explain that chaining leads causes overheating and shock risk, then help them use one proper cable or closer power source instead.",
//       "I explain that it's fine if the connections are dry and off the ground, and ask them to wrap the joints in tape for extra protection",
//     ],
//   },
//   {
//     id: "q9",
//     text: "You are preparing a risk analysis for maintenance works on a temporary construction site. Explain how you determine which legal framework applies",
//     options: [
//       "I identify the type of work and site, then apply the national regulations for temporary or mobile construction sites in addition to general safety law",
//       "I check what the client applies on their projects and follow the same framework for consistency",
//       "I use the general occupational health and safety legislation because it always applies to maintenance work.",
//       "I apply the company's internal safety procedures since they cover all legal requirements",
//     ],
//   },
// ];

// const TOTAL_FIELDS = QUESTIONS.length + 2;
// const TEST_DURATION_SECONDS = 15 * 60; // 15 Minutes

// export default function KnowledgeTestPage() {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [answers, setAnswers] = useState({});
//   const [submitting, setSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState("");

//   const [timeLeft, setTimeLeft] = useState(TEST_DURATION_SECONDS);
//   const tabSwitchCount = useRef(0);
//   const focusLossCount = useRef(0);
//   const startTime = useRef(Date.now());

//   // Countdown timer effect
//   useEffect(() => {
//     if (submitted) return;

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleAutoSubmit();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [submitted]);

//   // Anti-cheat event listeners
//   useEffect(() => {
//     if (submitted) return;

//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         tabSwitchCount.current += 1;
//       }
//     };

//     const handleBlur = () => {
//       focusLossCount.current += 1;
//     };

//     const preventCopyPaste = (e) => {
//       e.preventDefault();
//     };

//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     window.addEventListener("blur", handleBlur);
//     document.addEventListener("copy", preventCopyPaste);
//     document.addEventListener("paste", preventCopyPaste);
//     document.addEventListener("contextmenu", preventCopyPaste);

//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//       window.removeEventListener("blur", handleBlur);
//       document.removeEventListener("copy", preventCopyPaste);
//       document.removeEventListener("paste", preventCopyPaste);
//       document.removeEventListener("contextmenu", preventCopyPaste);
//     };
//   }, [submitted]);

//   const answeredCount = (email ? 1 : 0) + (name ? 1 : 0) + Object.keys(answers).length;

//   function setAnswer(qId, value) {
//     setAnswers((prev) => ({ ...prev, [qId]: value }));
//   }

//   async function handleAutoSubmit() {
//     setError("Time expired! Automatically submitting your responses...");
//     await executeSubmission();
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");

//     if (!email || !name || QUESTIONS.some((q) => !answers[q.id])) {
//       setError("Please answer every question before submitting.");
//       return;
//     }

//     await executeSubmission();
//   }

//   async function executeSubmission() {
//     setSubmitting(true);
//     const durationSeconds = Math.round((Date.now() - startTime.current) / 1000);

//     const payload = {
//       email,
//       name,
//       answers,
//       metrics: {
//         durationSeconds,
//         tabSwitchCount: tabSwitchCount.current,
//         focusLossCount: focusLossCount.current,
//       },
//     };

//     try {
//       const res = await fetch("/api/submit-knowledge-test", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       if (!res.ok) throw new Error("Submission failed");
//       setSubmitted(true);
//     } catch (err) {
//       setError("Something went wrong submitting your answers. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   const formatTime = (secs) => {
//     const m = Math.floor(secs / 60);
//     const s = secs % 60;
//     return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
//   };

//   if (submitted) {
//     return (
//       <main className="wrap">
//         <div className="card done">
//           <h1>Thank you</h1>
//           <p>Your answers have been submitted and recorded.</p>
//         </div>
//         <Styles />
//       </main>
//     );
//   }

//   return (
//     <main className="wrap">
//       {/* Sticky Header holding both Timer and Progress Bar */}
//       <div className="sticky-header">
//         <div className="timer-bar">
//           <span>Time Remaining:</span>
//           <span className={`timer-clock ${timeLeft < 120 ? "warning" : ""}`}>
//             {formatTime(timeLeft)}
//           </span>
//         </div>
//         <div className="progress-container">
//           <div className="progress-track">
//             <div
//               className="progress-fill"
//               style={{ width: `${(answeredCount / TOTAL_FIELDS) * 100}%` }}
//             />
//           </div>
//           <p className="progress-label">
//             {answeredCount} of {TOTAL_FIELDS} fields answered
//           </p>
//         </div>
//       </div>

//       <div className="header">
//         <p className="eyebrow">HSE Knowledge Test</p>
//         <h1>Common HSE matters — multiple choice</h1>
//         <p className="intro">
//           This test checks your knowledge of common HSE situations. Answer every question within the time limit and submit at the end.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="card">
//         <Field label="Email" required>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             placeholder="you@example.com"
//           />
//         </Field>

//         {QUESTIONS.slice(0, 3).map((q, i) => (
//           <QuestionBlock key={q.id} number={i + 1} q={q} value={answers[q.id]} onChange={setAnswer} />
//         ))}

//         <Field label="What is your name and surname" required>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             placeholder="Full name"
//           />
//         </Field>

//         {QUESTIONS.slice(3).map((q, i) => (
//           <QuestionBlock key={q.id} number={i + 4} q={q} value={answers[q.id]} onChange={setAnswer} />
//         ))}

//         {error && <div className="error">{error}</div>}

//         <button type="submit" disabled={submitting} className="submit">
//           {submitting ? "Submitting…" : "Submit answers"}
//         </button>
//       </form>

//       <Styles />
//     </main>
//   );
// }

// function Field({ label, required, children }) {
//   return (
//     <div className="field">
//       <label>
//         {label}
//         {required && <span className="req"> *</span>}
//       </label>
//       {children}
//     </div>
//   );
// }

// function QuestionBlock({ number, q, value, onChange }) {
//   return (
//     <div className="field question">
//       <div className="q-head">
//         <span className="q-num">{number}</span>
//         <p className="q-text">
//           {q.text}
//           <span className="req"> *</span>
//         </p>
//       </div>
//       <div className="options">
//         {q.options.map((opt, i) => {
//           const checked = value === opt;
//           return (
//             <label key={i} className={`option${checked ? " checked" : ""}`}>
//               <input
//                 type="radio"
//                 name={q.id}
//                 value={opt}
//                 checked={checked}
//                 onChange={() => onChange(q.id, opt)}
//                 required
//               />
//               <span className="dot" aria-hidden="true" />
//               <span className="opt-text">{opt}</span>
//             </label>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// function Styles() {
//   return (
//     <style jsx global>{`
//       :root {
//         --navy: #10324f;
//         --navy-dark: #0b2338;
//         --amber: #e2a400;
//         --bg: #f6f6f3;
//         --card: #ffffff;
//         --ink: #1c2430;
//         --ink-soft: #5b6472;
//         --border: #dcdcd6;
//         --danger: #b3261e;
//       }
//       * { box-sizing: border-box; user-select: none; }
//       body { margin: 0; background: var(--bg); }
//       .wrap {
//         max-width: 680px;
//         margin: 0 auto;
//         padding: 0 20px 96px;
//         font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
//         color: var(--ink);
//       }
//       .sticky-header {
//         position: sticky;
//         top: 0;
//         z-index: 100;
//         background: var(--bg);
//         padding-top: 16px;
//         padding-bottom: 12px;
//         margin-bottom: 24px;
//         border-bottom: 1px solid var(--border);
//       }
//       .timer-bar {
//         background: var(--navy);
//         color: #fff;
//         padding: 10px 18px;
//         border-radius: 8px;
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         font-weight: 600;
//         box-shadow: 0 2px 8px rgba(0,0,0,0.08);
//       }
//       .timer-clock { font-size: 18px; font-variant-numeric: tabular-nums; }
//       .timer-clock.warning { color: #ff6b6b; }
//       .progress-container {
//         margin-top: 10px;
//         background: #fff;
//         padding: 10px 14px;
//         border-radius: 8px;
//         border: 1px solid var(--border);
//         box-shadow: 0 2px 6px rgba(0,0,0,0.04);
//       }
//       .progress-track { height: 6px; background: var(--border); border-radius: 999px; overflow: hidden; }
//       .progress-fill { height: 100%; background: var(--amber); transition: width 0.2s ease; }
//       .progress-label { font-size: 12.5px; color: var(--ink-soft); margin: 6px 0 0; font-weight: 500; }
//       .header { margin-bottom: 28px; }
//       .eyebrow { color: var(--navy); font-weight: 600; font-size: 14px; margin: 0 0 8px; }
//       h1 { font-size: 26px; line-height: 1.3; margin: 0 0 12px; }
//       .intro { color: var(--ink-soft); font-size: 15px; line-height: 1.6; margin: 0; }
//       .card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 32px; }
//       .card.done { text-align: center; padding: 56px 32px; margin-top: 32px; }
//       .field { margin-bottom: 28px; }
//       .field > label { display: block; font-weight: 600; font-size: 15px; margin-bottom: 8px; }
//       .req { color: var(--danger); }
//       .field input[type="email"], .field input[type="text"] {
//         width: 100%; padding: 12px 14px; font-size: 15px; border: 1px solid var(--border); border-radius: 8px; user-select: text;
//       }
//       .question { border-top: 1px solid var(--border); padding-top: 24px; }
//       .q-head { display: flex; gap: 12px; margin-bottom: 14px; }
//       .q-num { width: 28px; height: 28px; border-radius: 50%; background: var(--navy); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; flex: none; }
//       .q-text { margin: 0; font-weight: 600; font-size: 15.5px; line-height: 1.5; }
//       .options { display: flex; flex-direction: column; gap: 8px; margin-left: 40px; }
//       .option { display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; border: 1px solid var(--border); border-radius: 8px; cursor: pointer; font-size: 14.5px; }
//       .option.checked { border-color: var(--navy); background: #eef4f8; }
//       .option input[type="radio"] { position: absolute; opacity: 0; }
//       .dot { width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--border); position: relative; flex: none; margin-top: 1px; }
//       .option.checked .dot { border-color: var(--navy); }
//       .option.checked .dot::after { content: ""; position: absolute; inset: 3px; border-radius: 50%; background: var(--navy); }
//       .error { background: #fdecea; border: 1px solid #f2b8b5; color: #8c1d13; padding: 12px 14px; border-radius: 8px; margin-bottom: 20px; }
//       .submit { width: 100%; padding: 14px 20px; font-size: 16px; font-weight: 600; color: #fff; background: var(--navy); border: none; border-radius: 8px; cursor: pointer; }
//       .submit:disabled { background: #9aa5b1; cursor: not-allowed; }
//       @media (max-width: 480px) {
//         .options { margin-left: 0; }
//       }
//     `}</style>
//   );
// }








































"use client";
import { useState, useEffect, useRef } from "react";

const QUESTIONS = [
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
      "Just make sure the operator has the CE certificate and a copy of the declaration of conformity on sit",
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

const TOTAL_FIELDS = QUESTIONS.length;
const TEST_DURATION_SECONDS = 15 * 60; // 15 Minutes

export default function KnowledgeTestPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [timeLeft, setTimeLeft] = useState(TEST_DURATION_SECONDS);
  const tabSwitchCount = useRef(0);
  const focusLossCount = useRef(0);
  const startTime = useRef(null);

  // Handle Gatekeeper screen start
  const handleStartTest = (e) => {
    e.preventDefault();
    if (!email || !name || !agreedTerms) {
      setError("Please fill out your details and accept the terms to proceed.");
      return;
    }
    setError("");
    startTime.current = Date.now();
    setTestStarted(true);
  };

  // Countdown timer effect - Only active once test starts
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

  // Anti-cheat event listeners - Only active once test starts
  useEffect(() => {
    if (!testStarted || submitted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        tabSwitchCount.current += 1;
      }
    };

    const handleBlur = () => {
      focusLossCount.current += 1;
    };

    const preventCopyPaste = (e) => {
      e.preventDefault();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("copy", preventCopyPaste);
    document.addEventListener("paste", preventCopyPaste);
    document.addEventListener("contextmenu", preventCopyPaste);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("copy", preventCopyPaste);
      document.removeEventListener("paste", preventCopyPaste);
      document.removeEventListener("contextmenu", preventCopyPaste);
    };
  }, [testStarted, submitted]);

  const answeredCount = Object.keys(answers).length;

  function setAnswer(qId, value) {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  }

  async function handleAutoSubmit() {
    setError("Time expired! Automatically submitting your responses...");
    await executeSubmission();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (QUESTIONS.some((q) => !answers[q.id])) {
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

  // Phase 3: Gatekeeper Screen
  if (!testStarted) {
    return (
      <main className="wrap">
        <div className="header" style={{ marginTop: "40px" }}>
          <p className="eyebrow">HSE Knowledge Test</p>
          <h1>Candidate Verification & Terms</h1>
          <p className="intro">
            Please enter your credentials and accept the test conditions. Timer starts as soon as you proceed.
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
            <h3>Test Instructions & Rules</h3>
            <ul>
              <li>You have <strong>15 minutes</strong> to complete all 9 multiple choice questions.</li>
              <li>This test must be taken independently without external assistance.</li>
              <li>Navigating away from this tab or window switching will be flagged.</li>
              <li>Copy, paste, and right-click functionalities are disabled during the test.</li>
            </ul>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                required
              />
              <span>I agree to the test rules and certify that I will complete this assessment unassisted.</span>
            </label>
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="submit">
            Start Test Now
          </button>
        </form>

        <Styles />
      </main>
    );
  }

  // Active Assessment Form
  return (
    <main className="wrap">
      <div className="sticky-header">
        <div className="timer-bar">
          <span>Time Remaining:</span>
          <span className={`timer-clock ${timeLeft < 120 ? "warning" : ""}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
        <div className="progress-container">
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${(answeredCount / TOTAL_FIELDS) * 100}%` }}
            />
          </div>
          <p className="progress-label">
            {answeredCount} of {TOTAL_FIELDS} questions answered
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
        {QUESTIONS.map((q, i) => (
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
        justify-content: space-between;
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
      .terms-box li { margin-bottom: 6px; }
      .checkbox-label { display: flex; gap: 10px; align-items: flex-start; font-size: 13.5px; color: var(--ink); cursor: pointer; }
      .checkbox-label input { margin-top: 3px; cursor: pointer; }
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
      }
    `}</style>
  );
}