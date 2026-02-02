/** @jsxImportSource https://esm.sh/react@18.2.0 */
import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";
import React, { useState } from "https://esm.sh/react@18.2.0";

const NO_PHRASES = [
  "No 💔",
  "Pretty please? 🥺",
  "But we'd be so cute together! 💕",
  "One more chance, pookie?",
  "Don't break my heart :(",
  "What about a maybe?",
  "Please don't do this to me, I'm fragile",
];

function App() {
  const [noClicks, setNoClicks] = useState(0);
  const [isValentine, setIsValentine] = useState(false);
  const yesButtonSize = (noClicks * 20) + 16;

  const firstImg = "https://media.tenor.com/VIChDQ6ejRQAAAAj/jumping-bear-hearts-no-png.gif";
  const secondImg = "https://media.tenor.com/f1xnRxTRxLAAAAAj/bears-with-kisses-bg.gif";

  const handleNo = () => {
    setNoClicks(prev => prev + 1);
  };

  const handleYes = () => {
    setIsValentine(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      {!isValentine
        ? (
          <>
            <img src={firstImg} />
            <h1>Will you be my Valentine? 💘</h1>
            <div>
              <button
                onClick={handleYes}
                style={{
                  fontSize: `${yesButtonSize}px`,
                  margin: "10px",
                  padding: "10px 20px",
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Yes
              </button>
              <button
                onClick={handleNo}
                style={{
                  fontSize: "16px",
                  margin: "10px",
                  padding: "10px 20px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {noClicks === 0 ? "No" : NO_PHRASES[Math.min(noClicks - 1, NO_PHRASES.length - 1)]}
              </button>
            </div>
          </>
        )
        : (
          <>
            <img src={secondImg} />
            <div
              style={{
                fontSize: "48px",
                color: "pink",
                fontWeight: "bold",
              }}
            >
              Yay!!! 💖🎉
            </div>
          </>
        )}
    </div>
  );
}

function client() {
  createRoot(document.getElementById("root")).render(<App />);
}
if (typeof document !== "undefined") { client(); }

export default async function server(request: Request): Promise<Response> {
  const url = new URL(request.url);
  // Serve a browser-friendly ESM client bundle at /client.js
  if (url.pathname === "/client.js") {
    const js = `import React from "https://esm.sh/react@18.2.0";
import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";
const { useState, useRef, useEffect, createElement, Fragment } = React;
const NO_PHRASES = [
  "No 💔",
  "Pretty please? 🥺",
  "But we'd be so cute together! 💕",
  "One more chance, pookie?",
  "Don't break my heart :(",
  "What about a maybe?",
  "Please don't do this to me, I'm fragile",
];

function App() {
  const [noClicks, setNoClicks] = useState(0);
  const [isValentine, setIsValentine] = useState(false);
  const yesButtonSize = (noClicks * 20) + 16;

  const firstImg = "https://media.tenor.com/VIChDQ6ejRQAAAAj/jumping-bear-hearts-no-png.gif";
  const secondImg = "https://media.tenor.com/f1xnRxTRxLAAAAAj/bears-with-kisses-bg.gif";

  const noRef = useRef(null);

  useEffect(() => {
    // initial placement
    moveNo();
    window.addEventListener('resize', moveNo);
    return () => window.removeEventListener('resize', moveNo);
  }, []);

  function randomPosForViewport(buttonRect) {
    const pad = 16;
    const maxX = Math.max(0, window.innerWidth - buttonRect.width - pad);
    const maxY = Math.max(0, window.innerHeight - buttonRect.height - pad);
    const left = Math.floor(Math.random() * (maxX + 1)) + pad/2;
    const top = Math.floor(Math.random() * (maxY + 1)) + pad/2;
    return { left, top };
  }

  function moveNo() {
    const btn = noRef.current;
    if (!btn) return;
    setTimeout(() => {
      const b = btn.getBoundingClientRect();
      const pos = randomPosForViewport(b);
      btn.style.position = 'fixed';
      btn.style.left = pos.left + 'px';
      btn.style.top = pos.top + 'px';
      btn.style.zIndex = '9999';
    }, 0);
  }

  const handleNo = () => {
    setNoClicks(p => p + 1);
    moveNo();
  };
  const handleYes = () => setIsValentine(true);

  return createElement(
    'div',
    { style: { position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Arial, sans-serif', textAlign: 'center' } },
    !isValentine
      ? createElement( Fragment, null,
          createElement('img', { src: firstImg }),
          createElement('h1', null, "Will you be my Valentine? 💘"),
          createElement('div', { style: { position: 'relative', width: '100%', height: '140px' } },
            createElement('button', { onClick: handleYes, style: { fontSize: yesButtonSize + 'px', margin: '10px', padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', position: 'relative' } }, 'Yes'),
            createElement('button', { ref: noRef, onClick: handleNo, style: { fontSize: '16px', margin: '10px', padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' } }, noClicks === 0 ? 'No' : NO_PHRASES[Math.min(noClicks - 1, NO_PHRASES.length - 1)])
          )
        )
      : createElement( Fragment, null,
          createElement('img', { src: secondImg }),
          createElement('div', { style: { fontSize: '48px', color: 'pink', fontWeight: 'bold' } }, 'Yay!!! 💖🎉')
        )
  );
}

createRoot(document.getElementById('root')).render(createElement(App));
`;

    return new Response(js, { headers: { 'content-type': 'application/javascript; charset=utf-8' } });
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
