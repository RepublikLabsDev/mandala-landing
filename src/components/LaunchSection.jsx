import { Arrow, Mark } from './Primitives';

export function LaunchSection() {
  return <section className="tokenize section" id="launch">
    <div className="section-intro"><h2>Launch with a<br />market attached.</h2><p>Tokenize real-world assets or DAO projects and go live with deep liquidity.</p></div>
    <div className="launch-flow">
      <article><div className="asset-building"><Mark /></div><b><span>1</span>RWA / DAO asset</b><small>Verify & prepare</small></article><Arrow />
      <article><div className="raise-visual"><i /><Mark /><i /></div><b><span>2</span>Onchain raise</b><small>Compliant token offering</small></article><Arrow />
      <article><div className="market-visual"><span>YOUR TOKEN / USDC</span><div /></div><b><span>3</span>Locked liquidity</b><small>Live market</small></article>
    </div>
  </section>;
}
