# Forma Landing Page

A full-screen video landing page with a working contact form.

```
forma-landing/
├── frontend/    React + TypeScript + Vite + Tailwind site
└── backend/     Express server: saves messages + emails you
```

The frontend form posts to the backend, which saves every message to
a small database (`backend/data/messages.json`) and emails you a notification.
Even if email isn't set up yet, **nothing is ever lost** — messages
are always saved.

---

## 1. Run the backend

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and fill in your email details (see the comments inside —
Gmail with an "app password" is the easiest option, takes about 2
minutes to set up). You can skip this step for now and come back to
it later; the form will still work and save messages, it just won't
email you yet.

Then start it:

```bash
npm start
```

You should see `Backend running at http://localhost:4000`. Leave this
running.

## 2. Run the frontend

In a **new terminal window**:

```bash
cd frontend
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`). Fill out
the form and click "Send my message" — you should see it appear in
your terminal running the backend, get saved to the database, and
(if you configured email) land in your inbox.

## 3. Checking messages

Every message is saved to `backend/data/messages.json` no matter what. Two
easy ways to look at them:

- **From the terminal:**
  ```bash
  cd backend
  npm run view-messages
  ```
- **From a browser / API tool:** `GET http://localhost:4000/api/messages`
  with a header `x-admin-key: <the ADMIN_KEY you set in backend/.env>`

---

## Editing text and content

Almost everything you'd want to change — headline, nav links, button
labels, the service tags, the contact email, social links — lives in
one file:

```
frontend/src/content.ts
```

Open it, change the text, save. You don't need to touch
`frontend/src/App.tsx` (the layout/structure) for normal content
changes.

To swap the background video, change `VIDEO_URL` in that same file.

## Deploying

- **Frontend:** `npm run build` inside `/frontend` produces a static
  `dist/` folder you can host anywhere (Vercel, Netlify, S3, etc).
  Before building for production, set `VITE_API_URL` in
  `frontend/.env` to wherever your backend is hosted.
- **Backend:** deploy the `/backend` folder to any Node host (Render,
  Railway, Fly.io, a VPS, etc). Set the same environment variables
  from `.env.example` in that host's dashboard/secrets manager instead
  of a local `.env` file.
