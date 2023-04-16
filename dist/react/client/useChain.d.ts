export default function useChain(): {
    client: import("../../index.js").ChainClient;
    connectSigning: (walletType: "keplr" | "leap", denom: string) => Promise<void>;
};
