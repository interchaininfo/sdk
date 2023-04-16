import type { Coin } from '@cosmjs/amino';
export interface WalletInfo {
    address: string;
    name?: string;
    balance?: Coin;
}
