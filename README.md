# Rajana Car Rental — Next.js website

A fast, static website for Rajana Car Rental Lahore. Bookings open directly in WhatsApp and invoices are generated in the visitor's browser, so no database or paid server is required.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Business settings

- Contact details and fleet data: `src/lib/site.ts`
- WhatsApp number: copy `.env.example` to `.env.local` and change `NEXT_PUBLIC_WHATSAPP_NUMBER`
- Vehicle images: `public/images`
- Domain and SEO defaults: `src/app/layout.tsx`

## Private invoice access

The invoice maker is intentionally absent from the public navigation and marked
`noindex`. Its production URL must be protected by Cloudflare Access before the
site is considered ready to launch.

Create a **Self-hosted** Cloudflare Access application for every hostname that
can serve the invoice path:

- `www.rajanacarrental.com/invoice/*`
- `rajanacarrental.com/invoice/*`
- The production `*.workers.dev/invoice/*` hostname

Create one `Allow` policy:

- Selector: `Emails`
- Value: `Booknow@rajanacarrental.com`
- Authentication method: `One-time PIN`

Do not add an `Everyone`, `Emails ending in`, or unrestricted `One-time PIN`
rule. Test the deployed page in a private browser window using another email;
Cloudflare must deny it before launch.

## Production hosting — lowest-cost option

Use Cloudflare Workers with static assets and the existing domain. This project is a static export, so the normal hosting bill should be **Rs 0/month** at this traffic level. The only recurring cost should be the existing domain renewal.

Cloudflare Workers Builds settings:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Production branch: `master`
- Environment variable: `NEXT_PUBLIC_WHATSAPP_NUMBER=923036565672`

The `wrangler.jsonc` file publishes the generated `out` directory as static assets. After deployment, add both `rajanacarrental.com` and `www.rajanacarrental.com` as custom domains, choose one as canonical, and redirect the other to it.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```
