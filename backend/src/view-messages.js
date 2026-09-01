/**
 * Quick way to check your messages from the terminal, no database
 * viewer needed. Run this from inside /backend:
 *
 *   npm run view-messages
 */
import { getAllMessages } from "./db.js";

const messages = getAllMessages();

if (messages.length === 0) {
  console.log("No messages yet.");
} else {
  for (const m of messages) {
    console.log("----------------------------------------");
    console.log(`#${m.id}  ${m.created_at}`);
    console.log(`Name:     ${m.name}`);
    console.log(`Email:    ${m.email}`);
    console.log(`Services: ${m.services.join(", ") || "(none)"}`);
    console.log(`Message:  ${m.message}`);
  }
  console.log("----------------------------------------");
  console.log(`Total: ${messages.length} message(s)`);
}
