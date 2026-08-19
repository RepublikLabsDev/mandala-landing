import { useEffect, useRef, useState } from 'react';
import { Header as EditableHeader } from './components/Header';
import { RouterSection as EditableRouterSection } from './components/RouterSection';
import { LendSection } from './components/LendSection';
import { LaunchSection } from './components/LaunchSection';
import { EarnSection } from './components/EarnSection';
import { ClosingSection } from './components/ClosingSection';

const appUrl = 'https://mandala-finance-swap.up.railway.app/swap';
const Mark = ({ className = '' }) => <img className={`mark ${className}`} src="/assets/mandala-icon.png" alt="" />;
const Arrow = () => <span aria-hidden="true">→</span>;


const frac = x => x - Math.floor(x);

// Each orbit is an axis-aligned ellipse drawn inside a rotated group, so one path
// definition serves both the visible ring and the travelling sphere's motion path.
// Path starts at the left vertex and sweeps through the TOP half first: motion
// progress 0 -> .5 is behind the disc, .5 -> 1 is in front of it.
const ORBITS = [
  { rx: 418, ry: 138, tilt: -16, dur: 26, stroke: '#2e6df0', width: 2.5, opacity: .5, dash: null, size: 19, delay: 0, park: .62 },
  { rx: 440, ry: 118, tilt: 12, dur: 34, stroke: '#5b95f5', width: 2.4, opacity: .55, dash: '2 11', size: 14, delay: -12, park: .88 },
  { rx: 366, ry: 165, tilt: 55, dur: 44, stroke: '#2e6df0', width: 2, opacity: .32, dash: null, size: 11, delay: -30, park: .74 },
];
const orbitPath = ({ rx, ry }) => `M${500 - rx},500 a${rx},${ry} 0 1,1 ${rx * 2},0 a${rx},${ry} 0 1,1 ${-rx * 2},0`;
const frontArc = ({ rx, ry }) => `M${500 - rx},500 a${rx},${ry} 0 0,0 ${rx * 2},0`;

function OrbArt({ still }) {
  const dots = [];
  for (let i = 0; i < 92; i++) { const a = (95 + 170 * (i / 92)) * Math.PI / 180, r = 330 + 100 * frac(i * .618); dots.push({ x: 500 + Math.cos(a) * r, y: 500 + Math.sin(a) * r * .92, s: 1.6 + 3.2 * frac(i * .377), o: .18 + .5 * frac(i * .71) }); }
  for (let i = 0; i < 72; i++) { const a = (-58 + 130 * (i / 72)) * Math.PI / 180, r = 345 + 100 * frac(i * .618); dots.push({ x: 500 + Math.cos(a) * r, y: 500 + Math.sin(a) * r * .92, s: 1.4 + 3 * frac(i * .43), o: .16 + .45 * frac(i * .67) }); }

  // `half` picks which side of the orbit this copy is visible on, so the sphere
  // reads as passing behind the disc and back out in front of it.
  const traveller = (o, i, half) => {
    const r = half === 'back' ? o.size * .74 : o.size;
    const vis = half === 'back' ? '1;1;0;0;1' : '0;0;1;1;0';
    return <g key={`${i}${half}`} transform={`rotate(${o.tilt} 500 500)`}>
      <g opacity={still ? (half === 'back' ? 0 : 1) : undefined}>
        <circle cx="0" cy="0" r={r} fill="url(#orbSphere)"/>
        <circle cx={-r * .3} cy={-r * .35} r={r * .22} fill="#fff" opacity=".9"/>
        {!still && <>
          <animateMotion dur={`${o.dur}s`} begin={`${o.delay}s`} repeatCount="indefinite" path={orbitPath(o)}/>
          <animate attributeName="opacity" values={vis} keyTimes="0;0.499;0.5;0.999;1" dur={`${o.dur}s`} begin={`${o.delay}s`} repeatCount="indefinite" calcMode="discrete"/>
        </>}
        {still && half === 'front' && <animateMotion dur="1s" begin="0s" fill="freeze" repeatCount="1" keyPoints={`${o.park};${o.park}`} keyTimes="0;1" calcMode="linear" path={orbitPath(o)}/>}
      </g>
    </g>;
  };

  return <svg className={`hero-orb-art${still ? '' : ' is-live'}`} viewBox="0 0 1000 1000" role="img" aria-hidden="true">
    <defs>
      <linearGradient id="orbDisc" x1="12%" y1="86%" x2="92%" y2="16%"><stop offset="0%" stopColor="#1633c9"/><stop offset="34%" stopColor="#1c5cf0"/><stop offset="66%" stopColor="#2b8cff"/><stop offset="100%" stopColor="#43c6ff"/></linearGradient>
      <linearGradient id="orbRim" x1="0%" y1="0%" x2="80%" y2="100%"><stop offset="0%" stopColor="#ffffff"/><stop offset="45%" stopColor="#dbe9ff"/><stop offset="100%" stopColor="#9fc0f5"/></linearGradient>
      <linearGradient id="orbGlass" x1="10%" y1="0%" x2="90%" y2="100%"><stop offset="0%" stopColor="rgba(255,255,255,.95)"/><stop offset="45%" stopColor="rgba(190,215,255,.35)"/><stop offset="100%" stopColor="rgba(140,180,255,.6)"/></linearGradient>
      <linearGradient id="orbGloss" x1="0%" y1="0%" x2="25%" y2="100%"><stop offset="0%" stopColor="rgba(255,255,255,.75)"/><stop offset="100%" stopColor="rgba(255,255,255,0)"/></linearGradient>
      <clipPath id="orbDiscClip"><circle cx="500" cy="500" r="217"/></clipPath>
      {/* front-passing rings stop at the orb's edge instead of drawing a line across its face */}
      <mask id="orbFaceMask"><rect width="1000" height="1000" fill="#fff"/><circle cx="500" cy="500" r="258" fill="#000"/></mask>
      {/* orbits and dust dissolve into haze near the frame instead of being clipped by it */}
      <radialGradient id="orbFadeGrad" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#fff"/><stop offset="72%" stopColor="#fff"/><stop offset="100%" stopColor="#000"/></radialGradient>
      <mask id="orbEdgeFade"><rect width="1000" height="1000" fill="url(#orbFadeGrad)"/></mask>
      <radialGradient id="orbSphere" cx="32%" cy="28%" r="80%"><stop offset="0%" stopColor="#ffffff"/><stop offset="35%" stopColor="#7fd0ff"/><stop offset="70%" stopColor="#2a7bff"/><stop offset="100%" stopColor="#1334bd"/></radialGradient>
      <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(80,150,255,.22)"/><stop offset="70%" stopColor="rgba(80,150,255,.07)"/><stop offset="100%" stopColor="rgba(80,150,255,0)"/></radialGradient>
      <filter id="orbBlur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="9"/></filter>
      <radialGradient id="orbSpec" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(255,255,255,.95)"/><stop offset="55%" stopColor="rgba(255,255,255,.45)"/><stop offset="100%" stopColor="rgba(255,255,255,0)"/></radialGradient>
      <linearGradient id="orbSheen" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="rgba(255,255,255,0)"/><stop offset="50%" stopColor="rgba(255,255,255,.30)"/><stop offset="100%" stopColor="rgba(255,255,255,0)"/></linearGradient>
      <filter id="orbMarkShadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#082a8f" floodOpacity=".38"/></filter>
    </defs>
    <circle className="orb-aura" cx="500" cy="500" r="470" fill="url(#orbGlow)"/>

    {/* far layer — orbit rings and the halves of each sphere that pass behind the disc */}
    <g className="orb-layer orb-layer-far" mask="url(#orbEdgeFade)">
      <g fill="none">
        {ORBITS.map((o, i) => <ellipse key={i} className={`orb-ring orb-ring-${i}`} cx="500" cy="500" rx={o.rx} ry={o.ry}
          stroke={o.stroke} strokeWidth={o.width} opacity={o.opacity} strokeDasharray={o.dash || undefined}
          strokeLinecap={o.dash ? 'round' : undefined} transform={`rotate(${o.tilt} 500 500)`}/>)}
      </g>
      <g className="orb-dust">{dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={d.s} fill={i % 3 ? '#2e6df0' : '#7fb0ff'} opacity={d.o}/>)}</g>
      {ORBITS.map((o, i) => traveller(o, i, 'back'))}
    </g>

    <g className="orb-shadow">
      <ellipse cx="505" cy="848" rx="255" ry="38" fill="#2453d8" opacity=".15" filter="url(#orbBlur)"/>
      <ellipse cx="505" cy="848" rx="140" ry="20" fill="#1d4fd8" opacity=".14" filter="url(#orbBlur)"/>
    </g>

    {/* the orb itself */}
    <g className="orb-layer orb-layer-core">
      <g fill="none">
        <circle cx="500" cy="500" r="266" stroke="url(#orbGlass)" strokeWidth="34" opacity=".8"/>
        <circle cx="500" cy="500" r="249" stroke="#ffffff" strokeWidth="2.5" opacity=".95"/>
        <circle cx="500" cy="500" r="284" stroke="#cfe0ff" strokeWidth="2.5" opacity=".75"/>
        <circle className="orb-glint orb-glint-a" cx="500" cy="500" r="266" stroke="#ffffff" strokeWidth="13" strokeLinecap="round" strokeDasharray="135 1536" opacity=".95"/>
        <circle className="orb-glint orb-glint-b" cx="500" cy="500" r="266" stroke="#ffffff" strokeWidth="9" strokeLinecap="round" strokeDasharray="64 1607" opacity=".75"/>
      </g>
      <circle cx="500" cy="500" r="243" fill="url(#orbRim)"/>
      <circle cx="500" cy="500" r="217" fill="url(#orbDisc)"/>
      <circle cx="500" cy="500" r="216" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="3"/>
      <g clipPath="url(#orbDiscClip)">
        <ellipse cx="470" cy="322" rx="205" ry="96" fill="url(#orbGloss)" opacity=".38" filter="url(#orbBlur)" transform="rotate(-14 470 322)"/>
        <rect className="orb-sheen" x="-260" y="240" width="180" height="520" fill="url(#orbSheen)" transform="rotate(18 500 500)"/>
      </g>
      <circle className="orb-spec" cx="380" cy="352" r="26" fill="url(#orbSpec)"/>
      <g className="orb-mark" filter="url(#orbMarkShadow)"><image href="/assets/mandala-solid-white-mark.png" x="328" y="328" width="344" height="344"/></g>
    </g>

    {/* near layer — the front halves of the orbits wrap around the disc */}
    <g className="orb-layer orb-layer-near" mask="url(#orbEdgeFade)">
      <g fill="none" mask="url(#orbFaceMask)">
        {ORBITS.map((o, i) => <path key={i} className={`orb-ring orb-ring-${i}`} d={frontArc(o)} stroke={o.stroke} strokeWidth={o.width}
          opacity={o.opacity} strokeDasharray={o.dash || undefined} strokeLinecap={o.dash ? 'round' : undefined}
          transform={`rotate(${o.tilt} 500 500)`}/>)}
      </g>
      {ORBITS.map((o, i) => traveller(o, i, 'front'))}
    </g>
  </svg>;
}

function HeroOrb() {
  const orb = useRef(null);
  const [still, setStill] = useState(false);
  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  const set = (x, y) => { const s = orb.current?.style; if (!s) return; s.setProperty('--rx', `${-y * 11}deg`); s.setProperty('--ry', `${x * 13}deg`); s.setProperty('--px', `${x * 16}px`); s.setProperty('--py', `${y * 16}px`); };
  const reset = () => set(0, 0);
  const move = e => { if (!orb.current || still) return; const r = orb.current.getBoundingClientRect(); set(((e.clientX - r.left) / r.width) - .5, ((e.clientY - r.top) / r.height) - .5); };
  return <div className="hero-orb" ref={orb} onPointerMove={move} onPointerLeave={reset} aria-label="Liquidity converging on the Mandala core"><div className="exact-hero-layers"><img className="exact-hero-shadow" src="/assets/hero-orb-shadow-exact.png" alt=""/><img className="exact-hero-network" src="/assets/hero-orbit-network-exact.png" alt=""/><img className="exact-hero-core" src="/assets/hero-orb-core-exact.png" alt=""/></div></div>;
}

export function HeroSection() {
  return <section className="hero" id="top"><div className="hero-copy"><h1>Powering the <span className="mixed"><b>full lifecycle</b> of</span><span>onchain capital.</span></h1><p>Trade, allocate and grow from one connected DeFi platform.</p><div className="actions"><a className="button" href={appUrl} target="_blank" rel="noreferrer">Launch App <Arrow /></a></div></div><HeroOrb /></section>;
}

export function App(){useEffect(()=>{const handler=e=>{const a=e.target.closest?.('a[href^="#"]');if(a){const target=document.querySelector(a.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'})}}};document.addEventListener('click',handler);return()=>document.removeEventListener('click',handler)},[]);return <><EditableHeader/><main><HeroSection/><EditableRouterSection/><LendSection/><LaunchSection/><EarnSection/><ClosingSection/></main></>}
