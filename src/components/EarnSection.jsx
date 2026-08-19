import { appUrl } from '../content';
import { Arrow, Mark } from './Primitives';

/**
 * Staking and rewards.
 *
 * This section used to carry the lending numbers — supply APY, borrow APY, a
 * health factor — which belonged to a different feature and to a chain the app
 * is not on. It is staking now, which is live on Ethereum.
 *
 * The panel states how staking behaves rather than what it pays. Emission
 * rates change per pool and per period; a fixed percentage printed on a
 * landing page is out of date the moment a pool is funded.
 */
export function EarnSection() {
  return <section className="band earn-band" id="earn"><div className="band-inner earn-inner">
    <div className="band-title"><h2>Put capital<br />to work.</h2></div>
    <div className="capital-orbit"><Mark />
      <div className="capital-ring ring-one"><span>Stake<br /><b>Tokens</b></span></div>
      <div className="capital-ring ring-two"><span>Or stake<br /><b>LP tokens</b></span></div>
      <div className="capital-ring ring-three"><span>Earn<br /><b>Rewards</b></span></div>
    </div>
    <div className="position-panel"><small>How staking works</small>
      <div><span>Rewards accrue</span><b>Every second</b></div>
      <div><span>Claim</span><b>Any time</b></div>
      <div><span>Unstake</span><b>Never locked</b></div>
      <div><span>What you stake</span><b>A token or an LP position</b></div>
      <a href={appUrl.replace('/swap', '/stake')}>Open staking <Arrow /></a>
    </div>
  </div></section>;
}
