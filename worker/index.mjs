const encoder = new TextEncoder();

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
      "WWW-Authenticate": 'Basic realm="Rajana Invoice Maker", charset="UTF-8"',
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
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
    const isInvoicePath = pathname === "/invoice" || pathname.startsWith("/invoice/");

    if (!isInvoicePath) {
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

    return fetchAsset(request, env, pathname);
  },
};

export default worker;
