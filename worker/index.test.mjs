import assert from "node:assert/strict";
import test from "node:test";

import worker from "./index.mjs";

const assets = {
  fetch: async () => new Response("asset", { status: 200 }),
};

const configuredEnvironment = {
  ASSETS: assets,
  INVOICE_USERNAME: "waqas",
  INVOICE_PASSWORD: "correct horse battery staple",
};

function createRateStore() {
  const values = new Map();
  return {
    get: async (key, type) => {
      const value = values.get(key);
      return type === "json" && value ? JSON.parse(value) : value ?? null;
    },
    put: async (key, value) => values.set(key, value),
  };
}

const authorization = (username, password) =>
  `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;

test("denies invoice access when secrets are missing", async () => {
  const response = await worker.fetch(
    new Request("https://rajanacarrental.com/invoice/"),
    { ASSETS: assets },
  );

  assert.equal(response.status, 503);
});

test("challenges invoice requests without credentials", async () => {
  const response = await worker.fetch(
    new Request("https://rajanacarrental.com/invoice/"),
    configuredEnvironment,
  );

  assert.equal(response.status, 401);
  assert.match(response.headers.get("WWW-Authenticate"), /Basic/);
});

test("rejects incorrect credentials", async () => {
  const response = await worker.fetch(
    new Request("https://rajanacarrental.com/invoice/", {
      headers: { Authorization: authorization("waqas", "wrong") },
    }),
    configuredEnvironment,
  );

  assert.equal(response.status, 401);
});

test("serves the invoice after valid authentication", async () => {
  const response = await worker.fetch(
    new Request("https://rajanacarrental.com/invoice/", {
      headers: {
        Authorization: authorization("waqas", "correct horse battery staple"),
      },
    }),
    configuredEnvironment,
  );

  assert.equal(response.status, 200);
  assert.equal(await response.text(), "asset");
});

test("protects the admin dashboard with the same credentials as invoices", async () => {
  const denied = await worker.fetch(new Request("https://rajanacarrental.com/admin/"), configuredEnvironment);
  assert.equal(denied.status, 401);

  const allowed = await worker.fetch(new Request("https://rajanacarrental.com/admin/", {
    headers: { Authorization: authorization("waqas", "correct horse battery staple") },
  }), configuredEnvironment);
  assert.equal(allowed.status, 200);
  assert.equal(allowed.headers.get("X-Robots-Tag"), "noindex, nofollow, noarchive");
});

test("allows authenticated rate updates and returns them to the public fleet", async () => {
  const environment = { ...configuredEnvironment, RATES_KV: createRateStore() };
  const request = new Request("https://rajanacarrental.com/admin/api/rates", {
    method: "PUT",
    headers: { Authorization: authorization("waqas", "correct horse battery staple"), "Content-Type": "application/json" },
    body: JSON.stringify({ rates: { "toyota-corolla-altis-x": 8500, "honda-civic-rs": 11000, "lahore-to-islamabad": 28000 } }),
  });
  const saved = await worker.fetch(request, environment);
  assert.equal(saved.status, 200);
  assert.equal((await saved.json()).rates["toyota-corolla-altis-x"], 8500);

  const publicRates = await worker.fetch(new Request("https://rajanacarrental.com/api/rates"), environment);
  assert.equal(publicRates.status, 200);
  const publicRatePayload = await publicRates.json();
  assert.equal(publicRatePayload.rates["honda-civic-rs"], 11000);
  assert.equal(publicRatePayload.rates["lahore-to-islamabad"], 28000);
});

test("refuses unauthenticated or invalid rate updates", async () => {
  const environment = { ...configuredEnvironment, RATES_KV: createRateStore() };
  const denied = await worker.fetch(new Request("https://rajanacarrental.com/admin/api/rates", { method: "PUT", body: "{}" }), environment);
  assert.equal(denied.status, 401);

  const invalid = await worker.fetch(new Request("https://rajanacarrental.com/admin/api/rates", {
    method: "PUT",
    headers: { Authorization: authorization("waqas", "correct horse battery staple"), "Content-Type": "application/json" },
    body: JSON.stringify({ rates: { "toyota-corolla-altis-x": 1 } }),
  }), environment);
  assert.equal(invalid.status, 400);
});

test("passes public pages through to static assets", async () => {
  const response = await worker.fetch(
    new Request("https://rajanacarrental.com/"),
    configuredEnvironment,
  );

  assert.equal(response.status, 200);
});

test("adds long-lived browser caching to hashed Next.js assets", async () => {
  const response = await worker.fetch(
    new Request("https://rajanacarrental.com/_next/static/chunks/example.js"),
    configuredEnvironment,
  );

  assert.equal(response.status, 200);
  assert.equal(
    response.headers.get("Cache-Control"),
    "public, max-age=31536000, immutable",
  );
});

test("redirects www to the canonical bare domain", async () => {
  const response = await worker.fetch(
    new Request("http://www.rajanacarrental.com/fleet/?source=google"),
    configuredEnvironment,
  );

  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get("Location"),
    "https://rajanacarrental.com/fleet/?source=google",
  );
});

test("permanently redirects the legacy contact page to the homepage", async () => {
  const response = await worker.fetch(
    new Request("https://rajanacarrental.com/contact-us/?source=legacy"),
    configuredEnvironment,
  );

  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get("Location"),
    "https://rajanacarrental.com/?source=legacy",
  );
});
