# Protecting the Rajana invoice maker without Zero Trust billing

The invoice tool is a static browser application. Its access control is
enforced in the Worker before Cloudflare serves the page.

## Cloudflare setup

1. Open **Workers & Pages → rajana-car-rental → Settings**.
2. Under **Variables and Secrets**, select **Add**.
3. Add `INVOICE_USERNAME` with type **Secret** and a private username.
4. Add `INVOICE_PASSWORD` with type **Secret** and a unique password of at
   least 16 characters.
5. Select **Deploy**.

Do not send the password in chat, add it to `wrangler.jsonc`, or commit it to
GitHub. Cloudflare stores secret values encrypted and does not display them
again.

The Worker runs before `/invoice` and `/invoice/*`, verifies HTTP Basic
credentials, and only then fetches the invoice asset. Direct production and
preview `workers.dev` URLs are disabled.

## Required verification

Before launch, test in a private browser window:

- Missing or incorrect credentials receive `401 Unauthorized`.
- The chosen username and password open the invoice maker.
- Direct production and preview `workers.dev` URLs are disabled.
- The public website contains no invoice-maker link.

The Worker authentication check is the security boundary. The generated PDF
still runs in the authenticated user's browser and is not a cryptographically
signed accounting record.
