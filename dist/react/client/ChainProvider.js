var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { TxProvider } from '../hooks/tx.js';
import WalletProvider from '../wallet/WalletProvider.js';
import ChainContext from './ChainContext.js';
export default function ChainProvider({ client, children, }) {
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const connectSigning = useCallback((walletType, denom) => __awaiter(this, void 0, void 0, function* () {
        if (!client)
            return;
        yield (client === null || client === void 0 ? void 0 : client.connectSigning(walletType, denom));
        forceUpdate();
    }), [client, forceUpdate]);
    // Connect client
    useEffect(() => {
        // Unsigned Client
        function connectClient() {
            return __awaiter(this, void 0, void 0, function* () {
                yield (client === null || client === void 0 ? void 0 : client.connect());
                forceUpdate();
            });
        }
        connectClient();
    }, [client, forceUpdate]);
    return (_jsxs(ChainContext.Provider, Object.assign({ value: {
            client,
            connectSigning,
        } }, { children: [_jsx(Toaster, { position: "top-right" }), _jsx(WalletProvider, { children: _jsx(TxProvider, { children: children }) })] })));
}
//# sourceMappingURL=ChainProvider.js.map