// // // Deploy path in your Vercel/Next.js project: app/api/submit-knowledge-test/route.js
// // //
// // // This writes new submissions into the SAME Google Sheet the Google Form has
// // // always used, in the SAME column order, so nothing downstream breaks —
// // // not the existing duplicate-check API, not any manual review of the sheet.
// // //
// // // IMPORTANT — before deploying:
// // // 1. This needs WRITE access, unlike the existing check-knowledge-test route
// // //    which is read-only. Share the Google Sheet with your service account
// // //    email as EDITOR (not just Viewer) — check this in the Sheet's Share
// // //    settings, since the original setup only ever needed read access.
// // // 2. Open the actual "HSE knowledge test (multiple choice) (Responses)"
// // //    sheet and confirm the column order really is:
// // //    Timestamp, Email address, Q1, Q2, Q3, Name, Q4, Q5, Q6, Q7, Q8, Q9
// // //    Google Forms lays columns out in question order, so this should match,
// // //    but a 10-second check here avoids answers silently landing in the
// // //    wrong columns.

// // import { google } from "googleapis";

// // export async function POST(req) {
// //   try {
// //     const { email, name, answers } = await req.json();

// //     if (!email || !name || !answers) {
// //       return Response.json({ error: "Missing required fields" }, { status: 400 });
// //     }

// //     const requiredQuestions = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9"];
// //     for (const qId of requiredQuestions) {
// //       if (!answers[qId]) {
// //         return Response.json({ error: `Missing answer for ${qId}` }, { status: 400 });
// //       }
// //     }

// //     const auth = new google.auth.GoogleAuth({
// //       credentials: {
// //         client_email: process.env.GOOGLE_SERVICE_EMAIL,
// //         private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
// //       },
// //       // Needs write access now, unlike the existing readonly check route.
// //       scopes: ["https://www.googleapis.com/auth/spreadsheets"],
// //     });
// //     const sheets = google.sheets({ version: "v4", auth });

// //     const spreadsheetId = process.env.KNOWLEDGE_TEST_GOOGLE_SHEET_ID;

// //     // Column order matches the live form exactly (see note above).
// //     const row = [
// //       new Date().toISOString(),
// //       email,
// //       answers.q1,
// //       answers.q2,
// //       answers.q3,
// //       name,
// //       answers.q4,
// //       answers.q5,
// //       answers.q6,
// //       answers.q7,
// //       answers.q8,
// //       answers.q9,
// //     ];

// //     await sheets.spreadsheets.values.append({
// //       spreadsheetId,
// //       range: "Form Responses 1!A:L",
// //       valueInputOption: "USER_ENTERED",
// //       insertDataOption: "INSERT_ROWS",
// //       requestBody: { values: [row] },
// //     });

// //     return Response.json({ success: true });
// //   } catch (err) {
// //     console.error("Knowledge test submission error:", err);
// //     return Response.json({ error: err.message }, { status: 500 });
// //   }
// // }






















// // Deploy path in your Vercel/Next.js project: app/api/submit-knowledge-test/route.js
// //
// // This writes new submissions into the SAME Google Sheet the Google Form has
// // always used, in the SAME column order, so nothing downstream breaks —
// // not the existing duplicate-check API, not any manual review of the sheet.
// //
// // IMPORTANT — before deploying:
// // 1. This needs WRITE access, unlike the existing check-knowledge-test route
// //    which is read-only. Share the Google Sheet with your service account
// //    email as EDITOR (not just Viewer) — check this in the Sheet's Share
// //    settings, since the original setup only ever needed read access.
// // 2. Open the actual "HSE knowledge test (multiple choice) (Responses)"
// //    sheet and confirm the column order really is:
// //    Timestamp, Email address, Q1, Q2, Q3, Name, Q4, Q5, Q6, Q7, Q8, Q9
// //    Google Forms lays columns out in question order, so this should match,
// //    but a 10-second check here avoids answers silently landing in the
// //    wrong columns.

// import { google } from "googleapis";

// export async function POST(req) {
//   try {
//     const { email, name, answers } = await req.json();

//     if (!email || !name || !answers) {
//       return Response.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     const requiredQuestions = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9"];
//     for (const qId of requiredQuestions) {
//       if (!answers[qId]) {
//         return Response.json({ error: `Missing answer for ${qId}` }, { status: 400 });
//       }
//     }

//     const auth = new google.auth.GoogleAuth({
//       credentials: {
//         client_email: process.env.GOOGLE_SERVICE_EMAIL,
//         private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
//       },
//       // Needs write access now, unlike the existing readonly check route.
//       scopes: ["https://www.googleapis.com/auth/spreadsheets"],
//     });
//     const sheets = google.sheets({ version: "v4", auth });

//     const spreadsheetId = process.env.KNOWLEDGE_TEST_GOOGLE_SHEET_ID;

//     // Column order matches the LIVE SHEET exactly (verified directly against
//     // real submitted rows) — NOT the order questions currently display on
//     // the form. Google Forms keeps sheet columns in the order questions were
//     // originally created, so Q1, Q7, and Q8 land out of sequence here because
//     // they were evidently added/reordered after the rest of the form.
//     const row = [
//       new Date().toISOString(),
//       email,
//       name,
//       answers.q2,
//       answers.q3,
//       answers.q4,
//       answers.q5,
//       answers.q6,
//       answers.q8,
//       answers.q1,
//       answers.q7,
//       answers.q9,
//     ];

//     await sheets.spreadsheets.values.append({
//       spreadsheetId,
//       range: "Form Responses 1!A:L",
//       valueInputOption: "USER_ENTERED",
//       insertDataOption: "INSERT_ROWS",
//       requestBody: { values: [row] },
//     });

//     return Response.json({ success: true });
//   } catch (err) {
//     console.error("Knowledge test submission error:", err);
//     return Response.json({ error: err.message }, { status: 500 });
//   }
// }



















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

    // Matches column layout in Google Sheet + extra metrics columns (M: Duration, N: Tab Switches, O: Focus Loss)
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
      metrics?.durationSeconds ?? 0,
      metrics?.tabSwitchCount ?? 0,
      metrics?.focusLossCount ?? 0,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Form Responses 1!A:O",
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