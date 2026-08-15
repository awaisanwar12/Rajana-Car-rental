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

const authorization = (username, password) =>
  `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;

test("denies invoice access when secrets are missing", async () => {
  const response = await worker.fetch(
    new Request("https://www.rajanacarrental.com/invoice/"),
    { ASSETS: assets },
  );

  assert.equal(response.status, 503);
});

test("challenges invoice requests without credentials", async () => {
  const response = await worker.fetch(
    new Request("https://www.rajanacarrental.com/invoice/"),
    configuredEnvironment,
  );

  assert.equal(response.status, 401);
  assert.match(response.headers.get("WWW-Authenticate"), /Basic/);
});

test("rejects incorrect credentials", async () => {
  const response = await worker.fetch(
    new Request("https://www.rajanacarrental.com/invoice/", {
      headers: { Authorization: authorization("waqas", "wrong") },
    }),
    configuredEnvironment,
  );

  assert.equal(response.status, 401);
});

test("serves the invoice after valid authentication", async () => {
  const response = await worker.fetch(
    new Request("https://www.rajanacarrental.com/invoice/", {
      headers: {
        Authorization: authorization("waqas", "correct horse battery staple"),
      },
    }),
    configuredEnvironment,
  );

  assert.equal(response.status, 200);
  assert.equal(await response.text(), "asset");
});

test("passes public pages through to static assets", async () => {
  const response = await worker.fetch(
    new Request("https://www.rajanacarrental.com/"),
    configuredEnvironment,
  );

  assert.equal(response.status, 200);
});

test("redirects the bare domain to the canonical www website", async () => {
  const response = await worker.fetch(
    new Request("http://rajanacarrental.com/fleet/?source=google"),
    configuredEnvironment,
  );

  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get("Location"),
    "https://www.rajanacarrental.com/fleet/?source=google",
  );
});
