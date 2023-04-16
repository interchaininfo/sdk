import React from 'react';
import { WalletInfo } from '../../core/wallet/types.js';
declare type WalletContextValue = {
    wallet?: WalletInfo;
    login: (walletType: 'keplr' | 'leap', denom: string) => Promise<WalletInfo | void>;
    logout: () => void;
    refreshBalance: () => void;
};
declare const WalletContext: React.Context<WalletContextValue>;
export default WalletContext;
