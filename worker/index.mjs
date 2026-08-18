const encoder = new TextEncoder();
const rateKeys = new Set([
  "honda-civic-rs", "toyota-corolla-altis-x", "toyota-yaris-corolla-gli", "jaecoo-j5-2026",
  "honda-br-v", "toyota-fortuner-prado", "grand-cabin", "land-cruiser-v8", "lahore-to-islamabad",
]);

async function secureEqual(left, right) {
  const [leftHash, rightHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(left)),
    crypto.subtle.digest("SHA-256", encoder.encode(right)),
  ]);
  const leftBytes = new Uint8Array(leftHash);
  const rightBytes = new Uint8Array(rightHash);
  let difference = 0;

  for (let index = 0; index < leftBytes.length; index += 1) {
    difference |= leftBytes[index] ^ rightBytes[index];
  }

  return difference === 0;
}

function unauthorized() {
  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "Cache-Control": "private, no-store",
      "Content-Type": "text/plain; charset=utf-8",
      "WWW-Authenticate": 'Basic realm="Rajana Business Tools", charset="UTF-8"',
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}

function privateResponse(response) {
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "private, no-store");
  headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers },
  });
}

function validRates(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const entries = Object.entries(value);
  if (entries.length < 1 || entries.length > 20) return null;

  const cleaned = {};
  for (const [key, amount] of entries) {
    if (!rateKeys.has(key) || typeof amount !== "number" || !Number.isFinite(amount) || amount < 1000 || amount > 500000) return null;
    cleaned[key] = Math.round(amount);
  }
  return cleaned;
}

async function readRates(env) {
  if (!env.RATES_KV) return { rates: {}, updatedAt: null };
  const saved = await env.RATES_KV.get("vehicle-rates", "json");
  if (!saved || typeof saved !== "object") return { rates: {}, updatedAt: null };
  const rates = validRates(saved.rates) || {};
  return { rates, updatedAt: typeof saved.updatedAt === "string" ? saved.updatedAt : null };
}

async function fetchAsset(request, env, pathname) {
  const response = await env.ASSETS.fetch(request);
  const headers = new Headers(response.headers);

  if (pathname.startsWith("/_next/static/")) {
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
  } else if (pathname.startsWith("/images/")) {
    headers.set("Cache-Control", "public, max-age=604800, stale-while-revalidate=86400");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function hasValidCredentials(request, env) {
  const authorization = request.headers.get("Authorization");

  if (!authorization?.startsWith("Basic ")) {
    return false;
  }

  try {
    const decoded = atob(authorization.slice(6));
    const separator = decoded.indexOf(":");

    if (separator < 1) {
      return false;
    }

    const username = decoded.slice(0, separator);
    const password = decoded.slice(separator + 1);
    const [usernameMatches, passwordMatches] = await Promise.all([
      secureEqual(username, env.INVOICE_USERNAME),
      secureEqual(password, env.INVOICE_PASSWORD),
    ]);

    return usernameMatches && passwordMatches;
  } catch {
    return false;
  }
}

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "www.rajanacarrental.com") {
      url.protocol = "https:";
      url.hostname = "rajanacarrental.com";
      url.port = "";
      return Response.redirect(url.toString(), 301);
    }

    const { pathname } = url;

    if (pathname === "/contact-us" || pathname === "/contact-us/") {
      url.protocol = "https:";
      url.pathname = "/";
      url.port = "";
      return Response.redirect(url.toString(), 301);
    }

    const isInvoicePath = pathname === "/invoice" || pathname.startsWith("/invoice/");
    const isAdminPath = pathname === "/admin" || pathname.startsWith("/admin/");
    const isRatesApi = pathname === "/api/rates";

    if (isRatesApi) {
      if (request.method !== "GET") return new Response("Method not allowed.", { status: 405, headers: { Allow: "GET" } });
      return json(await readRates(env));
    }

    if (!isInvoicePath && !isAdminPath) {
      return fetchAsset(request, env, pathname);
    }

    if (!env.INVOICE_USERNAME || !env.INVOICE_PASSWORD) {
      return new Response("Invoice access is not configured.", {
        status: 503,
        headers: {
          "Cache-Control": "private, no-store",
          "Content-Type": "text/plain; charset=utf-8",
          "X-Robots-Tag": "noindex, nofollow, noarchive",
        },
      });
    }

    if (!(await hasValidCredentials(request, env))) {
      return unauthorized();
    }

    if (pathname === "/admin/api/rates") {
      if (request.method === "GET") return privateResponse(json(await readRates(env)));
      if (request.method !== "PUT") return privateResponse(new Response("Method not allowed.", { status: 405, headers: { Allow: "GET, PUT" } }));
      if (!env.RATES_KV) return privateResponse(json({ error: "Rate storage is not configured yet." }, 503));

      try {
        const body = await request.json();
        const rates = validRates(body?.rates);
        if (!rates) return privateResponse(json({ error: "Enter valid starting rates between Rs 1,000 and Rs 500,000." }, 400));
        const updatedAt = new Date().toISOString();
        await env.RATES_KV.put("vehicle-rates", JSON.stringify({ rates, updatedAt }));
        return privateResponse(json({ rates, updatedAt }));
      } catch {
        return privateResponse(json({ error: "Could not read the rate update." }, 400));
      }
    }

    return privateResponse(await fetchAsset(request, env, pathname));
  },
};

export default worker;
