import { useState } from 'react';
import { liquiditySources, routerOutputs } from '../content';
import { Arrow, Mark } from './Primitives';

function RouterDiagram() {
  const [active, setActive] = useState('DEXs');
  return <div className="router-diagram" aria-label="Mandala Smart Router liquidity flow">
    <div className="source-stack">{liquiditySources.map((label, index) => <button key={label} className={active === label ? 'active' : ''} onMouseEnter={() => setActive(label)} onFocus={() => setActive(label)}><span>{String(index + 1).padStart(2, '0')}</span>{label}</button>)}</div>
    <div className="flow flow-in">{[1, 2, 3, 4, 5].map(value => <span key={value} />)}</div>
    <div className="router-core"><div className="swarm swarm-left" /><Mark /><strong>MANDALA</strong><small>SMART ROUTER</small><div className="swarm swarm-right" /></div>
    <div className="flow flow-out">{[1, 2, 3, 4].map(value => <span key={value} />)}</div>
    <div className="output-stack">{routerOutputs.map((label, index) => <div key={label}><span>{String.fromCharCode(65 + index)}</span>{label}</div>)}</div>
  </div>;
}

export function RouterSection() {
  return <section className="router section" id="swap">
    <div className="section-intro"><h2>Liquidity from<br />everywhere.</h2><p>Every swap is quoted across native and external liquidity, and routed down the best path found.</p><div className="quote"><small>Transparent route</small><b>1,000 USDC</b><Arrow /><b>1,004.27 USDT</b></div></div>
    <RouterDiagram />
  </section>;
}
