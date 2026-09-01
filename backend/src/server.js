/**
 * ============================================================
 *  SERVER
 * ============================================================
 *  This is the backend for the contact form. It:
 *   1. Accepts POST /api/contact from the frontend
 *   2. Saves the message to the SQLite database (db.js)
 *   3. Emails you a notification (mailer.js)
 *
 *  Run it with:  npm install   then   npm start
 *  (from inside the /backend folder)
 * ============================================================
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { saveMessage, getAllMessages } from "./db.js";
import { sendNotificationEmail } from "./mailer.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Submit the contact form
app.post("/api/contact", async (req, res) => {
  const { name, email, message, services } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  try {
    const saved = saveMessage({ name, email, message, services });

    // Don't make the visitor wait on the email provider — save first,
    // then fire the email off. If it fails, the message is still safe.
    sendNotificationEmail({ name, email, message, services }).catch((err) => {
      console.error("[server] Failed to send notification email:", err.message);
    });

    res.json({ success: true, id: saved.id });
  } catch (err) {
    console.error("[server] Failed to save message:", err);
    res.status(500).json({ error: "Something went wrong saving your message." });
  }
});

// View all saved messages (e.g. from a browser, curl, or Postman).
// Protected with a simple shared secret — set ADMIN_KEY in backend/.env,
// then pass it as an "x-admin-key" header when calling this endpoint.
app.get("/api/messages", (req, res) => {
  const key = req.headers["x-admin-key"];
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.json(getAllMessages());
});

// Simple health check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
