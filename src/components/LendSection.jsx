import { borrowRows } from '../content';
import { AppLink, Arrow } from './Primitives';

/**
 * Lend and borrow.
 *
 * A BAND section, deliberately. The page alternates light and tinted bands —
 * router light, this tinted, tokenize light, staking tinted — and a previous
 * revision made this one light, which put three light sections in a row and
 * flattened the whole page.
 *
 * It also uses the workspace panel layout rather than the three-card flow the
 * tokenize section uses. Sharing that flow made the two sections read as the
 * same content twice.
 *
 * Figures are illustrative, in the same register as the swap quote and route
 * split elsewhere on the page. The live rates are in the app.
 */
export function LendSection() {
  return <section className="band lend-band" id="lend"><div className="band-inner">
    <div className="band-title"><span>LEND + BORROW</span><h2>Put your assets<br /><em>to work twice.</em></h2></div>
    <div className="workspace">

      <div className="swap-panel"><small>Supply</small>
        <label>Asset <b>USDC</b><strong>5,000</strong></label>
        <label>Earning <b>Supply APY</b><strong>4.10%</strong></label>
        <div className="micro"><span>Withdraw</span><b>Any time</b></div>
        <AppLink className="button compact" path="/lend">Supply <Arrow /></AppLink>
      </div>

      <div className="route-panel"><small>Borrowing power</small>
        <h3>3,750 USDC <Arrow /> available to borrow</h3>
        {borrowRows.map(([name, value]) => <div className="route-row" key={name}><span>{name}</span><i style={{ '--width': value }} /><b>{value}</b></div>)}
        <AppLink path="/lend">Open lend / borrow <Arrow /></AppLink>
      </div>

      <div className="portfolio-panel"><small>Position health</small>
        <h3>2.48</h3><b className="positive">Healthy</b>
        <div className="sparkline" />
        <div className="holdings">
          <span>Collateral <b>$5,000</b></span>
          <span>Borrowed <b>$1,250</b></span>
          <span>Liquidation at <b>1.00</b></span>
          <span>Borrow APY <b>2.90%</b></span>
        </div>
      </div>

    </div>
  </div></section>;
}
