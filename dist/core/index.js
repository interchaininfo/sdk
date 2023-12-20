var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import getCosmWasmClient from './cosmwasm/getCosmWasmClient.js';
import getSigningCosmWasmClient from './cosmwasm/getSigningCosmWasmClient.js';
import Wallet from './wallet/index.js';
import { juno, osmosis } from 'juno-network';
import getBaseWallet from './arbitrary/getBaseWallet.js';
export class ChainClient {
    constructor({ chainInfo }) {
        this._cosmWasmClient = null;
        this.signingCosmWasmClient = null;
        this.baseWallet = null;
        this.api = null;
        this.osmosisClient = null;
        this.junoClient = null;
        this._wallet = null;
        this.chainInfo = chainInfo;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._cosmWasmClient) {
                return;
            }
            this._cosmWasmClient = yield getCosmWasmClient(this.chainInfo.rpc);
            this.api = yield juno.ClientFactory.createLCDClient({
                restEndpoint: this.chainInfo.rest,
            });
            this.osmosisClient = yield osmosis.ClientFactory.createRPCQueryClient({
                rpcEndpoint: this.chainInfo.rpc,
            });
            this.junoClient = yield juno.ClientFactory.createRPCQueryClient({
                rpcEndpoint: this.chainInfo.rpc,
            });
        });
    }
    connectSigning(walletType, denom) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connectSigningClient(walletType);
                if (!this.cosmWasmClient)
                    throw new Error('Could not load CosmWasmClient');
                if (!this.signingCosmWasmClient)
                    throw new Error('Could not load SigningCosmWasmClient');
                const wallet = yield this.wallet.getWallet(walletType, denom);
                this.baseWallet = yield getBaseWallet(walletType);
                return wallet;
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    disconnectSigning() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = this.signingCosmWasmClient) === null || _a === void 0 ? void 0 : _a.disconnect();
            this._wallet = null;
            window.wallet = null;
        });
    }
    connectSigningClient(walletType) {
        return __awaiter(this, void 0, void 0, function* () {
            this.signingCosmWasmClient = yield getSigningCosmWasmClient(this.chainInfo, walletType);
            return this.signingCosmWasmClient;
        });
    }
    get cosmWasmClient() {
        return this._cosmWasmClient;
    }
    get wallet() {
        if (!this.cosmWasmClient)
            throw new Error('Could not find CosmWasmClient');
        if (this._wallet) {
            return this._wallet;
        }
        // Create wallet
        this._wallet = new Wallet({
            cosmWasmClient: this.cosmWasmClient,
            chainId: this.chainInfo.chainId,
        });
        return this._wallet;
    }
}
//# sourceMappingURL=index.js.map