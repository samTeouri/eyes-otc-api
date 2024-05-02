"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        this.getDistance = (startCoords, destCoords) => __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _OSMRoutingService_osrmEngine, "f").route({
                coordinates: [startCoords, destCoords],
            }, (error, results) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    throw error;
                }
                if (results) {
                    return results.routes[0].distance;
                }
            }));
        });
        const _osrmEngine = (0, osrm_rest_client_1.OSRM)();
        __classPrivateFieldSet(this, _OSMRoutingService_osrmEngine, _osrmEngine, "f");
    }
}
exports.OSMRoutingService = OSMRoutingService;
_OSMRoutingService_osrmEngine = new WeakMap();
