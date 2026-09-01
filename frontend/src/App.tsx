import { useState } from "react";
import { Twitter, Circle, Instagram, Linkedin } from "lucide-react";
import {
  API_URL,
  VIDEO_URL,
  NAV_LINKS,
  NAV_CTA_LABEL,
  HEADLINE_LINE_1,
  HEADLINE_LINE_2_PREFIX,
  HEADLINE_ACCENT_WORD,
  FORM_HEADING,
  CONTACT_EMAIL,
  CONTACT_BAR_LABEL,
  SOCIAL_LINKS,
  OR_DIVIDER_LABEL,
  FORM_LABEL,
  NAME_PLACEHOLDER,
  EMAIL_PLACEHOLDER,
  MESSAGE_PLACEHOLDER,
  SERVICES_LABEL,
  SERVICES,
  SUBMIT_LABEL,
  SUBMIT_SENDING_LABEL,
  SUBMIT_ERROR_MESSAGE,
  SUCCESS_HEADING,
  SUCCESS_SUBTEXT,
} from "./content";

// ---- Small helper component for the four social icon buttons ----
function SocialBtn({
  href,
  bg,
  text,
  children,
}: {
  href: string;
  bg: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`w-8 h-8 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity ${bg} ${text}`}
    >
      {children}
    </a>
  );
}

export default function App() {
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function toggleService(service: string) {
    setSelected((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, services: selected }),
      });
      if (!res.ok) {
        throw new Error("Request failed");
      }
      setSent(true);
    } catch {
      setError(SUBMIT_ERROR_MESSAGE);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-white p-3 sm:p-4 md:p-6">
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)] lg:h-[calc(100vh-48px)]">
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Content layer */}
        <div className="relative z-10 flex flex-col min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)] lg:h-full p-4 sm:p-6 md:p-8 gap-6">
          {/* Navbar */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-sm pl-3 sm:pl-4 pr-2 py-2 w-full sm:w-auto flex items-center gap-3 sm:gap-6">
            <svg width="32" height="32" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
              <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z" fill="black" />
              <path d="M 256 128 L 128 128 L 0 0 L 128 0 Z" fill="black" />
            </svg>

            <div className="hidden sm:flex items-center gap-3 sm:gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-gray-800 text-sm font-medium hover:opacity-60 transition-opacity whitespace-nowrap"
                >
                  {link}
                </a>
              ))}
            </div>

            <button className="ml-auto bg-black text-white text-sm font-medium px-4 sm:px-5 py-2 rounded-xl hover:bg-gray-800 transition-colors">
              {NAV_CTA_LABEL}
            </button>
          </div>

          {/* Spacer */}
          <div className="flex-1 min-h-[2rem]" />

          {/* Bottom row: headline + form */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            {/* Headline */}
            <p className="text-white text-3xl sm:text-4xl xl:text-5xl font-medium leading-tight drop-shadow-lg lg:max-w-lg xl:max-w-2xl shrink-0">
              {HEADLINE_LINE_1}
              <br />
              {HEADLINE_LINE_2_PREFIX}
              <span
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                {HEADLINE_ACCENT_WORD}
              </span>
            </p>

            {/* Contact form card */}
            <div className="w-full lg:w-[min(480px,45%)] shrink-0">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden p-4 sm:p-6 flex flex-col gap-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-black tracking-tight">
                  {FORM_HEADING}
                </h2>

                {/* Email + socials row */}
                <div className="flex flex-row items-center justify-between gap-3 bg-gray-50 rounded-2xl px-4 py-2.5">
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">{CONTACT_BAR_LABEL}</p>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-blue-600 font-semibold hover:underline truncate block"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <SocialBtn href={SOCIAL_LINKS.twitter} bg="bg-gray-100" text="text-gray-800">
                      <Twitter size={13} />
                    </SocialBtn>
                    <SocialBtn href={SOCIAL_LINKS.circle} bg="bg-pink-100" text="text-pink-500">
                      <Circle size={13} />
                    </SocialBtn>
                    <SocialBtn href={SOCIAL_LINKS.instagram} bg="bg-orange-100" text="text-orange-400">
                      <Instagram size={13} />
                    </SocialBtn>
                    <SocialBtn href={SOCIAL_LINKS.linkedin} bg="bg-blue-100" text="text-blue-600">
                      <Linkedin size={13} />
                    </SocialBtn>
                  </div>
                </div>

                {sent ? (
                  <div className="flex flex-col items-center text-center py-6 gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-xl">
                      ✓
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">{SUCCESS_HEADING}</h3>
                    <p className="text-sm text-gray-500">{SUCCESS_SUBTEXT}</p>
                  </div>
                ) : (
                  <>
                    {/* OR divider */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-gray-200" />
                      <span className="text-gray-400 font-medium text-sm">{OR_DIVIDER_LABEL}</span>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    {/* Form */}
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                      <label className="text-sm font-medium text-black">{FORM_LABEL}</label>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={NAME_PLACEHOLDER}
                          className="flex-1 min-w-0 text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                        />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={EMAIL_PLACEHOLDER}
                          className="flex-1 min-w-0 text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                        />
                      </div>

                      <textarea
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={MESSAGE_PLACEHOLDER}
                        className="text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition resize-none"
                      />

                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-black">{SERVICES_LABEL}</label>
                        <div className="flex flex-wrap gap-1.5">
                          {SERVICES.map((service) => {
                            const active = selected.includes(service);
                            return (
                              <button
                                type="button"
                                key={service}
                                onClick={() => toggleService(service)}
                                className={`text-xs font-medium px-3 py-2 rounded-lg border transition-all ${
                                  active
                                    ? "bg-gray-100 text-black border-black"
                                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                                }`}
                              >
                                {service}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {error && <p className="text-sm text-red-600">{error}</p>}

                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full bg-black text-white text-sm font-semibold py-3 rounded-2xl hover:bg-gray-800 transition-colors disabled:opacity-60"
                      >
                        {sending ? SUBMIT_SENDING_LABEL : SUBMIT_LABEL}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
