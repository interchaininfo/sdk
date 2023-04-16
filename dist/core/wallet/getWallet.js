var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default function getWallet(chainId, walletType) {
    return __awaiter(this, void 0, void 0, function* () {
        window.wallet = null;
        switch (walletType) {
            case 'keplr':
                if ('keplr' in window)
                    window.wallet = window.keplr;
                break;
            case 'leap':
                if ('leap' in window)
                    window.wallet = window.leap;
                break;
        }
        const wallet = window.wallet;
        if (!wallet) {
            return null;
        }
        // @ts-ignore
        if (window.wallet) {
            // @ts-ignore
            window.wallet.defaultOptions = {
                sign: {
                    preferNoSetFee: true,
                },
            };
        }
        const walletInfo = yield wallet.getKey(chainId);
        return {
            address: walletInfo.bech32Address,
            name: walletInfo.name,
        };
    });
}
//# sourceMappingURL=getWallet.js.map