import { ReactNode } from 'react';
import { ToastPayload, ToastTypes } from './useToaster.js';
export interface Msg {
    typeUrl: string;
    value: any;
}
export interface TxOptions {
    gas?: number;
    denom?: string;
    toast?: {
        title?: ToastPayload['title'];
        message?: ToastPayload['message'];
        type?: ToastTypes;
        actions?: JSX.Element;
    };
}
export interface TxContext {
    tx: (msgs: Msg[], options: TxOptions, callback?: () => void) => Promise<void>;
}
export declare const Tx: import("react").Context<TxContext>;
export declare function TxProvider({ children }: {
    children: ReactNode;
}): JSX.Element;
declare const _default: () => TxContext;
export default _default;
