import { CLIENT_JS } from "./client_bundle.ts";

    return new Response(CLIENT_JS, { headers: { 'content-type': 'application/javascript; charset=utf-8' } });
  }

  // Serve canonical page under /june-invite and redirect root there
  if (url.pathname === "/") {
    return new Response(null, { status: 307, headers: { Location: "/june-invite" } });
  }

  if (url.pathname === "/june-invite") {
    return new Response(
      `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>June Invite — Valentine's Day Invitation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>body { margin: 0; font-family: Arial, sans-serif; }</style>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/client.js"></script>
      </body>
    </html>`,
      { headers: { 'content-type': 'text/html; charset=utf-8' } },
    );
  }

  return new Response("Not found", { status: 404 });
}
