export interface ETHEREUM_CHAIN {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

export type DCAPosition = {
  positionId: string
  tokenIn: Token
  tokenOut: Token
  balanceIn: string
  balanceOut: string
  amountDCA: string
  intervalDCA: string
  lastDCA: string
  maxSlippage: string
}

export type Token = {
  name: string
  ticker: string
  address: string
  imageUri: string
}

export type PositionTx = {
  action: string
  timestamp: string
  txHash: string
}