export default function useChain(): {
    client: import("../../index.js").ChainClient;
    connectSigning: (walletType: "keplr" | "leap" | "cosmostation", denom: string) => Promise<void>;
};
