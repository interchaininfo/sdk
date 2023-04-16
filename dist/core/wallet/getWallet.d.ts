import { WalletInfo } from './types.js';
export default function getWallet(chainId: string, walletType: 'keplr' | 'leap'): Promise<WalletInfo | null>;
