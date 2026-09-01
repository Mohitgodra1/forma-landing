/**
 * ============================================================
 *  DATABASE
 * ============================================================
 *  Every message submitted through the contact form is saved
 *  here, in a plain JSON file (backend/data/messages.json) —
 *  even if the notification email fails to send, nothing is
 *  lost.
 *
 *  This is deliberately dependency-free (no native modules to
 *  compile), so `npm install` always just works, on every OS.
 *  For a contact form's volume of traffic this is plenty; if
 *  you ever outgrow it, swap this file for a real database
 *  without touching anything else.
 * ============================================================
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "..", "data");
const dataPath = path.join(dataDir, "messages.json");

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, "[]", "utf8");
  }
}

function readAll() {
  ensureDataFile();
  const raw = fs.readFileSync(dataPath, "utf8");
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeAll(messages) {
  fs.writeFileSync(dataPath, JSON.stringify(messages, null, 2), "utf8");
}

export function saveMessage({ name, email, message, services }) {
  const messages = readAll();
  const nextId = messages.length > 0 ? messages[messages.length - 1].id + 1 : 1;
  const entry = {
    id: nextId,
    name,
    email,
    message,
    services: services || [],
    created_at: new Date().toISOString(),
  };
  messages.push(entry);
  writeAll(messages);
  return { id: nextId };
}

export function getAllMessages() {
  return readAll().slice().reverse(); // newest first
}
