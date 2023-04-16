/// <reference types="react" />
import toast, { ToastOptions } from 'react-hot-toast';
export declare const ToasterContainer: import("react").FC<import("react-hot-toast").ToasterProps>;
export declare enum ToastTypes {
    Success = "success",
    Error = "error",
    Pending = "pending",
    Warning = "warning"
}
export interface ToastPayload {
    actions?: JSX.Element;
    message?: string | JSX.Element;
    title: string;
    type: ToastTypes;
    dismissable?: boolean;
}
declare function customToast({ actions, title, type, message, dismissable }: ToastPayload, options?: ToastOptions): any;
interface CustomToast {
    dismiss: typeof toast.dismiss;
    toast: typeof customToast;
    error: (msg: string) => void;
}
export default function useToaster(): CustomToast;
export {};
