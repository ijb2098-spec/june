# june

Simple Deno + React Valentine app that exports an edge-style `server` handler
and hydrates a small React UI in the browser.

Files
- `index.ts`: main module (exports `server` for edge runtimes and runs client in browser).
- `server_local.ts`: small local wrapper to run the exported handler with Deno's std/http.

Run locally (requires Deno)

1. Install Deno: https://deno.land/

2. Start the local server:

```bash
deno run -A --unstable server_local.ts
```

3. Open http://localhost:8000/june-invite in your browser.

Notes
- The client imports React from `https://esm.sh` and the app fetches remote images.
- For production/deploy, you can use Deno Deploy or any edge platform that accepts
	an exported `default` function taking a `Request` and returning a `Response`.