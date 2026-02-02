const NO_PHRASES = [
  "No 💔",
  "Pretty please? 🥺",
  "But we'd be so cute together! 💕",
  "One more chance, pookie?",
  "Don't break my heart :(",
  "What about a maybe?",
  "Please don't do this to me, I'm fragile",
];

export const CLIENT_JS = `import React from "https://esm.sh/react@18.2.0";
import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";
const { useState, useRef, useEffect, createElement, Fragment } = React;
const NO_PHRASES = ${JSON.stringify(NO_PHRASES)};

function App() {
  const [noClicks, setNoClicks] = useState(0);
  const [isValentine, setIsValentine] = useState(false);
  const yesButtonSize = (noClicks * 20) + 16;

  const firstImg = "https://media.tenor.com/VIChDQ6ejRQAAAAj/jumping-bear-hearts-no-png.gif";
  const secondImg = "https://media.tenor.com/f1xnRxTRxLAAAAAj/bears-with-kisses-bg.gif";

  const noRef = useRef(null);

  useEffect(() => {
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

  const divStyle = { position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Arial, sans-serif', textAlign: 'center' };
  const buttonContainerStyle = { position: 'relative', width: '100%', height: '140px' };
  const yesButtonStyle = { fontSize: yesButtonSize + 'px', margin: '10px', padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', position: 'relative' };
  const noButtonStyle = { fontSize: '16px', margin: '10px', padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
  const yayStyle = { fontSize: '48px', color: 'pink', fontWeight: 'bold' };

  return createElement(
    'div',
    { style: divStyle },
    !isValentine
      ? createElement( Fragment, null,
          createElement('img', { src: firstImg }),
          createElement('h1', null, "Will you be my Valentine? 💘"),
          createElement('div', { style: buttonContainerStyle },
            createElement('button', { onClick: handleYes, style: yesButtonStyle }, 'Yes'),
            createElement('button', { ref: noRef, onClick: handleNo, style: noButtonStyle }, noClicks === 0 ? 'No' : NO_PHRASES[Math.min(noClicks - 1, NO_PHRASES.length - 1)])
          )
        )
      : createElement( Fragment, null,
          createElement('img', { src: secondImg }),
          createElement('div', { style: yayStyle }, 'Yay!!! 💖🎉 PHEW!!! you said YES!.... love you JB')
        )
  );
}

createRoot(document.getElementById('root')).render(createElement(App));
`;
