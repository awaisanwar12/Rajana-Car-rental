# Rajana Car Rental — Next.js website

A fast, static website for Rajana Car Rental Lahore. Bookings open directly in WhatsApp and authenticated invoice generation runs in the owner's browser.

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

The invoice maker is absent from public navigation, marked `noindex`, and
protected by the Worker before its static files are served. This avoids the
payment-method requirement shown by the optional Cloudflare Zero Trust product.

Create these encrypted Worker secrets under **Settings → Variables and Secrets**:

- `INVOICE_USERNAME`
- `INVOICE_PASSWORD`

Never commit their values to GitHub. If either secret is missing, the Worker
returns `503` and keeps the invoice maker closed. Invalid credentials receive
`401`; valid credentials receive the static invoice tool.

## Private business tools

`/admin/` is protected with the same login as `/invoice/` and provides links to
the invoice maker and vehicle-rate editor. The rate editor needs a Cloudflare
Workers KV namespace bound to the Worker as `RATES_KV`; without that binding it
can display current rates but cannot save updates. This keeps the public fleet
prices editable without giving the business owner GitHub or Cloudflare access.

## Production hosting — lowest-cost option

Use Cloudflare Workers with static assets and the existing domain. This project is a static export, so the normal hosting bill should be **Rs 0/month** at this traffic level. The only recurring cost should be the existing domain renewal.

Cloudflare Workers Builds settings:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Production branch: `master`
- Environment variable: `NEXT_PUBLIC_WHATSAPP_NUMBER=923036565672`

The `wrangler.jsonc` file publishes the generated `out` directory as static assets and disables direct `workers.dev` and preview URLs. Connect `www.rajanacarrental.com` as the custom domain and redirect the root domain to it.

## Checks

```bash
npm run typecheck
npm run lint
npm run test:worker
npm run build
```
