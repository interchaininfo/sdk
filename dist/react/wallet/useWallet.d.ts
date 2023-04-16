import './storageFix.js';
export default function useWallet(): {
    wallet?: import("../../core/wallet/types.js").WalletInfo;
    login: (walletType: "keplr" | "leap", denom: string) => Promise<void | import("../../core/wallet/types.js").WalletInfo>;
    logout: () => void;
    refreshBalance: () => void;
};
