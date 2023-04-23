import type { WalletInfo } from './types.js';
import type { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
export default class Wallet {
    cosmWasmClient: CosmWasmClient;
    chainId: string;
    denom: string;
    private _walletInfo;
    constructor({ cosmWasmClient, chainId, }: {
        cosmWasmClient: CosmWasmClient;
        chainId: string;
    });
    getBalance(): Promise<import("@cosmjs/amino").Coin>;
    getWallet(walletType: 'keplr' | 'leap', denom: string): Promise<WalletInfo>;
    get wallet(): WalletInfo | null;
    get address(): string;
    get name(): string;
    get balance(): import("@cosmjs/amino").Coin;
    get type(): "keplr" | "leap";
    set address(address: string);
}
