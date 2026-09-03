// The public app, live at app.mandala.finance since 3 Sep 2026.
//
// Base only, no path: AppLink appends /swap, /lend and /stake.
//
// It must NEVER point at mandala-internal-testing.up.railway.app (previously
// mandala-finance-swap.up.railway.app). That is the INTERNAL build: Sepolia is
// selectable on it and the launchpad is open. This page is public at
// mandala.finance, so linking there would put the testnet build and a live
// token launcher in front of the world. The public build parks Lend and
// Tokenize behind placeholders and offers Ethereum only, which is why it is
// the only host this may name.
export const appUrl = 'https://app.mandala.finance';

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
