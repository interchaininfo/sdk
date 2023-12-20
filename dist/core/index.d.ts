import type { ChainInfo, Keplr } from '@keplr-wallet/types';
import type { CosmWasmClient, SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import Wallet from './wallet/index.js';
import { juno, osmosis } from 'juno-network';
declare global {
    interface Window {
        wallet: Keplr;
        keplr: Keplr;
        leap: Keplr;
        cosmostation: {
            providers: {
                keplr: Keplr;
            };
        };
    }
}
export interface ChainClientConstructor {
    chainInfo: ChainInfo;
}
export declare class ChainClient {
    private _cosmWasmClient;
    signingCosmWasmClient: SigningCosmWasmClient | null;
    baseWallet: Keplr | null;
    api: Awaited<ReturnType<typeof juno.ClientFactory.createLCDClient>> | null;
    osmosisClient: Awaited<ReturnType<typeof osmosis.ClientFactory.createRPCQueryClient>> | null;
    junoClient: Awaited<ReturnType<typeof juno.ClientFactory.createRPCQueryClient>> | null;
    chainInfo: ChainInfo;
    private _wallet;
    constructor({ chainInfo }: ChainClientConstructor);
    connect(): Promise<void>;
    connectSigning(walletType: 'keplr' | 'leap' | 'cosmostation', denom: string): Promise<import("./wallet/types.js").WalletInfo>;
    disconnectSigning(): Promise<void>;
    connectSigningClient(walletType: 'keplr' | 'leap' | 'cosmostation'): Promise<SigningCosmWasmClient>;
    get cosmWasmClient(): CosmWasmClient;
    get wallet(): Wallet;
}
