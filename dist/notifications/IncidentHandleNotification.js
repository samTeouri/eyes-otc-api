"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _IncidentHandleNotification_title, _IncidentHandleNotification_body;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentHandleNotification = void 0;
class IncidentHandleNotification {
    constructor(supportCenter) {
        _IncidentHandleNotification_title.set(this, void 0);
        _IncidentHandleNotification_body.set(this, void 0);
        __classPrivateFieldSet(this, _IncidentHandleNotification_title, "Votre incident a été prit en charge.", "f");
        __classPrivateFieldSet(this, _IncidentHandleNotification_body, `${supportCenter.name} sera sur les lieux dans quelques instants. Veuillez garder votre calme`, "f");
    }
}
exports.IncidentHandleNotification = IncidentHandleNotification;
_IncidentHandleNotification_title = new WeakMap(), _IncidentHandleNotification_body = new WeakMap();
