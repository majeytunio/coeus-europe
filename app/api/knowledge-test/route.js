import { google } from "googleapis";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // --- 1️⃣ Authenticate with Google ---
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // --- 2️⃣ Fetch rows from Google Sheet ---
    const spreadsheetId = process.env.KNOWLEDGE_TEST_GOOGLE_SHEET_ID; // the sheet connected to your form
    const range = "Form Responses 1!A:Z"; // default Google Form sheet name

    const sheetRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range
    });

    const rows = sheetRes.data.values;
    if (!rows || rows.length < 2) {
      return Response.json({ exists: false, entry: null });
    }

    // --- 3️⃣ Find the email column index ---
    const header = rows[0];
    const emailIndex = header.indexOf("Email address");
    // const emailIndex = header.indexOf("Please provide your email here");

    if (emailIndex === -1) {
      return Response.json(
        { error: "No Email Address column found in sheet" },
        { status: 500 }
      );
    }

    // --- 4️⃣ Search for this email ---
    const match = rows.find((row, i) => i !== 0 && row[emailIndex] === email);

    if (!match) {
      return Response.json({ exists: false, entry: null });
    }

    // --- 5️⃣ Convert row → JSON object ---
    const entryObject = {};
    header.forEach((key, i) => {
      entryObject[key] = match[i] || "";
    });

    return Response.json({
      exists: true,
      entry: entryObject
    });

  } catch (err) {
    console.error("Google Sheets check error:", err);
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
