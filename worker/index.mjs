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
    const { pathname } = new URL(request.url);
    const isInvoicePath = pathname === "/invoice" || pathname.startsWith("/invoice/");

    if (!isInvoicePath) {
      return env.ASSETS.fetch(request);
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

    return env.ASSETS.fetch(request);
  },
};

export default worker;
