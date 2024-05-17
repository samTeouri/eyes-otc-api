"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _OSMRoutingService_osrmEngine;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OSMRoutingService = void 0;
const osrm_rest_client_1 = require("osrm-rest-client");
class OSMRoutingService {
    constructor() {
        _OSMRoutingService_osrmEngine.set(this, void 0);
        this.getDistance = (startCoords, destCoords) => {
            return new Promise((resolve, reject) => {
                __classPrivateFieldGet(this, _OSMRoutingService_osrmEngine, "f").route({
                    coordinates: [startCoords, destCoords],
                }, (error, results) => {
                    if (error) {
                        reject(`Error while getting distance: ${error}`);
                        return;
                    }
                    if (results && results.routes.length > 0 && results.routes[0].distance !== undefined) {
                        resolve(results.routes[0].distance);
                    }
                    else {
                        reject('No route results found or distance is undefined');
                    }
                });
            });
        };
        __classPrivateFieldSet(this, _OSMRoutingService_osrmEngine, (0, osrm_rest_client_1.OSRM)(), "f");
    }
}
exports.OSMRoutingService = OSMRoutingService;
_OSMRoutingService_osrmEngine = new WeakMap();
