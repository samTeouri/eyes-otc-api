"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _IncidentResolvedNotification_title, _IncidentResolvedNotification_body;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentResolvedNotification = void 0;
class IncidentResolvedNotification {
    constructor() {
        _IncidentResolvedNotification_title.set(this, void 0);
        _IncidentResolvedNotification_body.set(this, void 0);
        __classPrivateFieldSet(this, _IncidentResolvedNotification_title, "Votre incident a été résolu.", "f");
        __classPrivateFieldSet(this, _IncidentResolvedNotification_body, `L'incident que vous avez signalé à été résolu. Nous vous remercions pour votre coopération.`, "f");
    }
}
exports.IncidentResolvedNotification = IncidentResolvedNotification;
_IncidentResolvedNotification_title = new WeakMap(), _IncidentResolvedNotification_body = new WeakMap();
