# Spill The Tea ☕

Your group chat's smartest unemployed friend.

`Spill The Tea` is a playful little web app that reads chat text or screenshots and gives you a structured tea report:

- `Tea Strength`
- `Flirting Score`
- `Ghosting Risk`
- `Delulu Level`
- `Red Flags`
- `Green Flags`
- `Vibe Summary`
- `Best Reply`
- `Final Verdict`

Built to feel like overanalyzing texts with your friends in a cute matcha cafe, not like using a corporate SaaS dashboard.

## What It Does

- Paste chat text into a textarea
- Upload a chat screenshot
- Send the input to Gemini for analysis
- Get a fun structured report back
- Download the final report as an image

## Why It Exists

Because every friend group eventually says:

> "send me the screenshot"

And sometimes the chat needs a second opinion, a third opinion, and one mildly unemployed AI opinion.

## Tech Stack

- `Next.js 15`
- `TypeScript`
- `Tailwind CSS`
- `App Router`
- `Framer Motion`
- `Gemini API`

## Project Rules

- No login
- No signup
- No database
- No saved chats
- One-page app only
- Mobile responsive
- Beginner-friendly code structure

## Local Setup

```bash
npm install
npm run dev
```

Open:

```bash
http://localhost:3000
```

If `3000` is already occupied in your environment, Next may move to another port like `3001` or `3002`.

## Environment Variables

Create a `.env.local` file:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

You can also use:

```bash
GOOGLE_API_KEY=your_gemini_api_key_here
```

## API

Route:

```bash
app/api/analyze/route.ts
```

The API:

- accepts chat text
- accepts screenshot image uploads
- supports Gemini text + image input
- returns JSON only
- does not store user input

## Folder Vibe

```bash
app/
components/home/
```

Small, clean, readable, and not trying to act smarter than it needs to.

## Current Features

- Matcha cafe landing page
- Text input + image upload flow
- Screenshot preview
- Result cards with playful labels
- Friendly loading states
- Downloadable report image
- Privacy-first messaging

## Privacy

This app is intentionally simple:

- no accounts
- no stored chats
- no receipts

Just vibes.

## Screenshot Energy

The product vibe is:

- Pinterest x Matcha Cafe x internet side project
- soft, warm, playful
- Gen-Z but still clean
- cute, not childish

## Deploy Notes

This is a standard Next.js app, so you can deploy it anywhere that supports Next.js:

- Vercel
- Netlify
- Railway
- Render

Just remember to add your Gemini API key in the deployment environment variables.

## Final Note

This app is not here to fix your love life.

It is here to look at a suspicious chat, raise an eyebrow, and say:

> "hmm. interesting."
