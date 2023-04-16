import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
export default function getCosmWasmClient(rpc: string): Promise<CosmWasmClient>;
