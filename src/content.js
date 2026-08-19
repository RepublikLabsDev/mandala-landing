// The public app does not exist yet. Until it does this MUST stay null.
//
// It used to point at mandala-finance-swap.up.railway.app, which is the
// INTERNAL build: it has Sepolia enabled and is for the team only. This page is
// public at mandala.finance, so any link to that host puts the testnet build in
// front of the world.
//
// When app.mandala.finance is live, set this to 'https://app.mandala.finance'
// (base only, no path — AppLink appends /swap, /lend, /stake) and every call to
// action on the page comes back to life at once. Nothing else needs changing.
export const appUrl = null;

// The app's features, in the order the page presents them. No "Learn" tab:
// the FAQ is the bottom of the page, not a product.
export const navigation = [
  ['Swap', '#swap'],
  ['Lend / Borrow', '#lend'],
  ['Tokenize', '#launch'],
  ['Stake', '#earn'],
];

export const liquiditySources = ['DEXs', 'AMM Pools', 'Order Books', 'Lending Markets', 'Bridges', 'Staking Pools'];
export const routerOutputs = ['Swap', 'Lend / Borrow', 'Stake', 'Tokenize'];

// Illustrative, like the swap quote and route split. Widths drive the bars.
export const borrowRows = [
  ['USDC', '60%'],
  ['WETH', '80%'],
  ['DAI', '75%'],
  ['KPG', '50%'],
];

export const faqs = [
  ['What is Mandala Finance?', 'A connected DeFi interface for aggregated trading, lending, borrowing, staking, LP farming and onchain launches.'],
  ['How does routing work?', 'Mandala compares available native and external liquidity and shows the selected sources, fees and price impact before a trade.'],
  ['Is my capital at risk?', 'Yes. Smart-contract, market, liquidity and issuer risks can all result in loss, and onchain transactions cannot be reversed. Our contracts are verified onchain and independently reviewed, which reduces that risk without removing it.'],
  ['What chains are supported?', 'Ethereum mainnet.'],
];
