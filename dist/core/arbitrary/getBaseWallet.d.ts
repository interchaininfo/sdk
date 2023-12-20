import type { Keplr } from '@keplr-wallet/types';
export default function getBaseWallet(walletType: 'keplr' | 'leap' | 'cosmostation'): Promise<Keplr | null>;
