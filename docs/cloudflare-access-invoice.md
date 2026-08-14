# Protecting the Rajana invoice maker

The invoice tool is a static browser application. Its access control must be
enforced at Cloudflare's edge so unauthorized visitors cannot download the page
or its JavaScript.

## Allowed user

`Booknow@rajanacarrental.com`

## Cloudflare setup

1. Open **Cloudflare Dashboard → Zero Trust → Access controls → Applications**.
2. Choose **Add an application → Self-hosted**.
3. Name it `Rajana Invoice Maker`.
4. Add the production invoice path:
   `www.rajanacarrental.com/invoice/*`.
5. Redirect `rajanacarrental.com` to `www.rajanacarrental.com`, and disable
   direct production and preview `workers.dev` URLs so they cannot bypass Access.
6. Create an **Allow** policy named `Waqas only`.
7. Under **Include**, choose **Emails** and enter exactly
   `Booknow@rajanacarrental.com`.
8. Enable **One-time PIN** as the login method.
9. Choose a short session duration such as 8 or 12 hours.
10. Save the application.

## Required verification

Before launch, test all three hostnames in a private browser window:

- The allowed email receives a code and can open the invoice maker.
- A different email is denied.
- Direct production and preview `workers.dev` URLs are disabled.
- The public website contains no invoice-maker link.

Hiding the navigation link is only a usability change. Cloudflare Access is the
security boundary.
