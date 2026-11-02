# Ajay — Full-Stack & AI Solutions Developer

A responsive personal portfolio built with Next.js App Router, React, TypeScript and custom CSS.

## Run locally

Requirements: Node.js 20.9+ and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

Set these values in `.env.local` before publishing:

```env
NEXT_PUBLIC_CONTACT_EMAIL=you@example.com
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/your-profile/
NEXT_PUBLIC_GITHUB_URL=https://github.com/ajaybiswasdev
NEXT_PUBLIC_UPWORK_URL=https://www.upwork.com/
```

## Personalise before launch

- Confirm service descriptions and skills reflect work you can deliver.
- Review project descriptions and confirm you are permitted to share them publicly.
- Add approved project screenshots, your role and measurable outcomes.
- Replace placeholder contact and social links.

## Contact form

The current form uses a `mailto:` link. It opens the visitor's email client with the enquiry pre-filled; it does not send email in the background. For direct server-side submissions, integrate Formspree or an email provider through a server route. Keep private API keys server-side.

## Production build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Import this GitHub repository at https://vercel.com/new.
2. Vercel should detect Next.js automatically.
3. Add the environment variables under Project Settings → Environment Variables.
4. Deploy, then test the generated URL on desktop and mobile.
5. Add a custom domain under Project Settings → Domains and configure the DNS records Vercel provides.

This project intentionally uses CSS-built visual mockups rather than stock imagery.
