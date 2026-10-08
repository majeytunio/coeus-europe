import { google } from "googleapis";

export async function POST(req) {
  try {
    const { email, name, answers, metrics } = await req.json();

    if (!email || !name || !answers) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const requiredQuestions = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9"];
    for (const qId of requiredQuestions) {
      if (!answers[qId]) {
        return Response.json({ error: `Missing answer for ${qId}` }, { status: 400 });
      }
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.KNOWLEDGE_TEST_GOOGLE_SHEET_ID;

    const durationSeconds = metrics?.durationSeconds ?? 0;
    const speedFlag = durationSeconds < 180 ? "FLAGGED (< 3 mins)" : "NORMAL";

    // Row layout for Google Sheet appending:
    // A: Timestamp
    // B: Email
    // C: Name
    // D-L: Answers (q2, q3, q4, q5, q6, q8, q1, q7, q9)
    // M: Duration
    // N: Tab Switches
    // O: Focus Loss
    // P: Fullscreen Exits
    // Q: Answer Changes
    // R: Speed Flag
    // S: Device Info
    const row = [
      new Date().toISOString(),
      email,
      name,
      answers.q2,
      answers.q3,
      answers.q4,
      answers.q5,
      answers.q6,
      answers.q8,
      answers.q1,
      answers.q7,
      answers.q9,
      durationSeconds,
      metrics?.tabSwitchCount ?? 0,
      metrics?.focusLossCount ?? 0,
      metrics?.fullscreenExitCount ?? 0,
      metrics?.answerChangeCount ?? 0,
      speedFlag,
      `${metrics?.screenResolution ?? "N/A"} | ${metrics?.userAgent ?? "N/A"}`,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Form Responses 1!A:S",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [row] },
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Knowledge test submission error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}