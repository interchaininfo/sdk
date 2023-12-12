var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx.js';
import { GasPrice, isDeliverTxSuccess, coins, } from '@cosmjs/stargate';
import useToaster, { ToastTypes } from './useToaster.js';
import useChain from '../client/useChain.js';
import useWallet from '../wallet/useWallet.js';
export const Tx = createContext({
    tx: () => new Promise(() => { }),
});
const calculateFee = (gas, gasDenom) => {
    const gasLimit = Math.round(gas * 1.5);
    const { denom, amount: gasPriceAmount } = GasPrice.fromString(`0.1${gasDenom}`);
    const amount = Math.ceil(gasPriceAmount.toFloatApproximation() * gasLimit).toString();
    return {
        amount: coins(amount, denom),
        gas: String(gasLimit),
    };
};
export function TxProvider({ children }) {
    const { client } = useChain();
    const { refreshBalance } = useWallet();
    const toaster = useToaster();
    // Method to sign & broadcast transaction
    const tx = (msgs, options, callback) => __awaiter(this, void 0, void 0, function* () {
        // Simulate transaction and calculate gas
        const gas = yield client.signingCosmWasmClient.simulate(client.wallet.wallet.address, msgs, '');
        const fee = calculateFee(gas, options.denom || 'ujuno');
        let signed;
        try {
            signed = yield client.signingCosmWasmClient.sign(client.wallet.wallet.address, msgs, fee, '');
        }
        catch (e) {
            console.log(e);
            return toaster.toast({
                title: 'Error',
                message: e.message,
                type: ToastTypes.Error,
            });
        }
        let broadcastToastId = '';
        broadcastToastId = toaster.toast({
            title: 'Broadcasting transaction...',
            type: ToastTypes.Pending,
        }, { duration: 999999 });
        if ((client === null || client === void 0 ? void 0 : client.signingCosmWasmClient) && signed) {
            yield (client === null || client === void 0 ? void 0 : client.signingCosmWasmClient.broadcastTx(Uint8Array.from(TxRaw.encode(signed).finish())).then((res) => {
                var _a, _b, _c, _d;
                toaster.dismiss(broadcastToastId);
                if (isDeliverTxSuccess(res)) {
                    // Run callback
                    if (callback)
                        callback();
                    // Refresh balance
                    refreshBalance();
                    toaster.toast({
                        title: ((_a = options.toast) === null || _a === void 0 ? void 0 : _a.title) || 'Transaction Successful',
                        type: ((_b = options.toast) === null || _b === void 0 ? void 0 : _b.type) || ToastTypes.Success,
                        dismissable: true,
                        actions: ((_c = options.toast) === null || _c === void 0 ? void 0 : _c.actions) || _jsx(_Fragment, {}),
                        message: ((_d = options.toast) === null || _d === void 0 ? void 0 : _d.message) || _jsx(_Fragment, {}),
                    });
                }
                else {
                    toaster.toast({
                        title: 'Error',
                        message: res.rawLog,
                        type: ToastTypes.Error,
                    });
                }
            }));
        }
        else {
            toaster.dismiss(broadcastToastId);
        }
    });
    return _jsx(Tx.Provider, Object.assign({ value: { tx } }, { children: children }));
}
export default () => useContext(Tx);
//# sourceMappingURL=tx.js.map