export const appUrl = 'https://mandala-finance-swap.up.railway.app/swap';

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
