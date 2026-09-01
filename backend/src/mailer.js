/**
 * ============================================================
 *  EMAIL NOTIFICATIONS
 * ============================================================
 *  Sends you an email every time someone submits the contact
 *  form. Configure this by copying backend/.env.example to
 *  backend/.env and filling in your SMTP details — see that
 *  file for step-by-step instructions.
 *
 *  If SMTP isn't configured yet, this quietly skips sending
 *  and just logs a note — the message is still safely saved
 *  in the database either way.
 * ============================================================
 */

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

function buildTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendNotificationEmail({ name, email, message, services }) {
  const transporter = buildTransporter();
  const ownerEmail = process.env.OWNER_EMAIL;

  if (!transporter || !ownerEmail) {
    console.log(
      "[mailer] SMTP is not configured yet — skipping email send. " +
        "The message was still saved to the database. " +
        "See backend/.env.example to turn on email notifications."
    );
    return;
  }

  await transporter.sendMail({
    from: process.env.FROM_EMAIL || process.env.SMTP_USER,
    to: ownerEmail,
    replyTo: email,
    subject: `New message from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Services: ${(services || []).join(", ") || "(none selected)"}`,
      "",
      "Message:",
      message,
    ].join("\n"),
  });
}
