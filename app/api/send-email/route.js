import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    // 1. Setup Transporter with your custom domain SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // e.g., smtp.office365.com or mail.coeus-europe.com
      port: process.env.SMTP_PORT,                   // Usually 587 for TLS
      secure: true,               // true for 465, false for other ports
      auth: {
        user: "jan.dejonghe@coeus-europe.com",
        pass: process.env.SMTP_PASSWORD, 
      },
    });

    // 2. Configure the notification
    const mailOptions = {
      from: `"Coeus Europe" <jan.dejonghe@coeus-europe.com>`,
      to: "jan.dejonghe@coeus-europe.com", // Sending to yourself
      // to: "jan.dejonghe@coeus-europe.com", // Sending to yourself
      subject: "New Brochure Access",
      text: `User ${email} has been given the brochure.`,
      html: `<p>A user with the email <strong>${email}</strong> has just been given the brochure.</p>`,
    };

    // 3. Send
    await transporter.sendMail(mailOptions);

    return Response.json({ message: "Notification sent successfully" });

  } catch (err) {
    console.error("SMTP Error:", err);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}