// @ts-nocheck
// It appears that browser.storage.local (which is for extensions vs regular local storage)
// is no longer available in Safari 15,
// Which causes the Keplr extension to break and errors out the whole site.
// MDN docs for storage.local:
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/local
// Kepler accesses browser.storage.local here:
// https://github.com/chainapsis/keplr-wallet/blob/master/packages/common/src/kv-store/extension.ts
// This file no-ops the browser.storage.local functions if browser.storage is not available.
export function safariStorageFix() {
    if (typeof browser !== 'undefined') {
        if (!(browser === null || browser === void 0 ? void 0 : browser.storage)) {
            browser.storage = {
                local: {
                    get: () => { },
                    set: () => { },
                },
            };
        }
    }
}
safariStorageFix();
//# sourceMappingURL=storageFix.js.map