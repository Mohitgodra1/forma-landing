/**
 * ============================================================
 *  SITE CONTENT
 * ============================================================
 *  Every piece of editable text, and a few key settings, lives
 *  in this one file. Change what you see below and the site
 *  updates everywhere it's used — no need to touch App.tsx.
 * ============================================================
 */

// The API address of your backend server (see /backend).
// In development this is http://localhost:4000.
// When you deploy the backend somewhere else, set VITE_API_URL
// in frontend/.env to that address instead.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// Background video (full-bleed, autoplay, muted, looping)
export const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260602_150901_c45b90ec-18d7-42ff-90e2-b95d7109e330.mp4";

// ---- Navbar ----
export const NAV_LINKS = ["Our story", "Expertise", "Our work", "Journal"];
export const NAV_CTA_LABEL = "Start a project";

// ---- Headline (bottom-left, over the video) ----
export const HEADLINE_LINE_1 = "We craft bold ideas";
export const HEADLINE_LINE_2_PREFIX = "and ship them as ";
export const HEADLINE_ACCENT_WORD = "products";

// ---- Contact card ----
export const FORM_HEADING = "Say hello! 👋";
export const CONTACT_EMAIL = "mayankkk35@gmail.com";

// Label shown above the contact email / social icons row.
export const CONTACT_BAR_LABEL = "Tell me your vision";

// Social links — point these at your real profiles.
export const SOCIAL_LINKS = {
  twitter: "https://twitter.com",
  circle: "https://example.com",
  instagram: "https://instagram.com",
  linkedin: "https://linkedin.com",
};

export const OR_DIVIDER_LABEL = "OR";

// ---- Form ----
export const FORM_LABEL = "Tell us about your vision";
export const NAME_PLACEHOLDER = "Full name";
export const EMAIL_PLACEHOLDER = "Email";
export const MESSAGE_PLACEHOLDER = "What are you looking to build or improve...";
export const SERVICES_LABEL = "I need help with...";

// The list of selectable service tags, in display order.
export const SERVICES = [
  "Website",
  "Mobile App",
  "Web App",
  "E-Commerce",
  "Visual Identity",
  "3D & Motion",
  "Digital Marketing",
  "Growth & Consulting",
  "Other",
];

export const SUBMIT_LABEL = "Send my message";
export const SUBMIT_SENDING_LABEL = "Sending...";
export const SUBMIT_ERROR_MESSAGE =
  "Something went wrong sending your message. Please try again or email us directly.";

// ---- Success state (shown after a successful submit) ----
export const SUCCESS_HEADING = "You're all set!";
export const SUCCESS_SUBTEXT = "Expect a reply within 24 hours.";
