var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default function getBaseWallet(walletType) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (walletType) {
            case 'keplr':
                window.wallet = window.keplr;
                break;
            case 'leap':
                window.wallet = window.leap;
                break;
            case 'cosmostation':
                window.wallet = window.cosmostation.providers.keplr;
        }
        const wallet = window.wallet;
        if (!wallet) {
            throw new Error('Wallet not available.');
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
        return wallet;
    });
}
//# sourceMappingURL=getBaseWallet.js.map