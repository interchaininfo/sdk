import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import type { ChainInfo } from '@keplr-wallet/types';
export default function getSigningCosmWasmClient(chainInfo: ChainInfo, walletType: 'keplr' | 'leap'): Promise<SigningCosmWasmClient | null>;
