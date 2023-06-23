import React from 'react';
import { ChainClient } from '../../core/index.js';
declare const _default: React.Context<{
    client: ChainClient | null;
    connectSigning: (walletType: 'keplr' | 'leap' | 'cosmostation', denom: string) => Promise<void>;
}>;
export default _default;
