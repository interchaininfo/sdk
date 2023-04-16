import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon as XIcon, ExclamationCircleIcon, ExclamationTriangleIcon, } from '@heroicons/react/24/solid';
import toast, { Toaster } from 'react-hot-toast';
import { classNames } from '../util/css.js';
function Spinner({ className }) {
    return (_jsxs("svg", Object.assign({ className: `animate-spin ml-2 mr-3 h-5 w-5 ${className}`, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" }, { children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] })));
}
export const ToasterContainer = Toaster;
export var ToastTypes;
(function (ToastTypes) {
    ToastTypes["Success"] = "success";
    ToastTypes["Error"] = "error";
    ToastTypes["Pending"] = "pending";
    ToastTypes["Warning"] = "warning";
})(ToastTypes || (ToastTypes = {}));
function customToast({ actions, title, type, message, dismissable }, options) {
    let Icon;
    switch (type) {
        case ToastTypes.Success: {
            Icon = CheckCircleIcon;
            break;
        }
        case ToastTypes.Error: {
            Icon = ExclamationCircleIcon;
            break;
        }
        case ToastTypes.Pending: {
            Icon = Spinner;
            break;
        }
        case ToastTypes.Warning: {
            Icon = ExclamationTriangleIcon;
            break;
        }
    }
    return toast.custom((t) => (_jsx("div", Object.assign({ onLoad: () => {
            setTimeout(() => toast.dismiss(t.id), 3000);
        }, onClick: dismissable ? () => toast.dismiss(t.id) : () => { }, className: classNames(t.visible ? 'animate-enter' : 'animate-leave', dismissable ? 'cursor-pointer' : '', 'group w-full max-w-sm bg-white border border-white/10 shadow-lg rounded-lg pointer-events-auto p-4') }, { children: _jsxs("div", Object.assign({ className: "flex items-start" }, { children: [_jsx("div", Object.assign({ className: "flex-shrink-0" }, { children: _jsx(Icon, { className: "w-4 h-4 mt-1 text-black", "aria-hidden": "true" }) })), _jsxs("div", Object.assign({ className: "ml-3 w-0 flex-1 pt-0.5" }, { children: [_jsx("p", Object.assign({ className: "text-sm font-medium text-black" }, { children: title })), message && _jsx("p", Object.assign({ className: "mt-1 text-sm text-gray-700" }, { children: message })), actions] })), dismissable && (_jsx("div", Object.assign({ className: "justify-center flex-shrink-0 hidden h-full ml-4 group-hover:flex" }, { children: _jsxs("button", Object.assign({ className: "inline-flex text-white" }, { children: [_jsx("span", Object.assign({ className: "sr-only" }, { children: "Close" })), _jsx(XIcon, { className: "w-4 h-4", "aria-hidden": "true" })] })) })))] })) }))), options);
}
export default function useToaster() {
    function error(msg) {
        customToast({
            type: ToastTypes.Error,
            title: 'Error',
            message: msg,
        });
    }
    return {
        dismiss: toast.dismiss,
        toast: customToast,
        error,
    };
}
//# sourceMappingURL=useToaster.js.map