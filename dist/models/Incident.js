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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Incident = void 0;
const mongoose_1 = require("mongoose");
const OSMRoutingService_1 = require("../services/OSMRoutingService");
const Location_1 = require("./Location");
const Trouble_1 = require("./Trouble");
const Service_1 = require("./Service");
const Tools_1 = require("../utils/Tools");
// Schéma de l'incident
const incidentSchema = new mongoose_1.Schema({
    description: { type: String },
    picture: { type: String },
    video: { type: String },
    audio: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    location: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Location' },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    troubles: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Trouble' }],
    supportCenters: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'SupportCenter' }],
});
// Méthodes du schéma Incident
incidentSchema.methods.getDistanceToSupportCenter = function (supportCenter) {
    return __awaiter(this, void 0, void 0, function* () {
        const osrm = new OSMRoutingService_1.OSMRoutingService();
        if (!supportCenter)
            throw new Error('Support Center not found');
        try {
            const incidentLocation = yield Location_1.Location.findById(this.location);
            const supportCenterLocation = yield Location_1.Location.findById(supportCenter.location);
            if (supportCenterLocation && incidentLocation) {
                const distance = yield osrm.getDistance([incidentLocation.longitude, incidentLocation.latitude], [supportCenterLocation.longitude, supportCenterLocation.latitude]);
                return distance;
            }
        }
        catch (error) {
            console.error(`Error while getting distance to Support Center: ${error}`);
        }
    });
};
incidentSchema.methods.getNearestSupportCenter = function (supportCenters) {
    return __awaiter(this, void 0, void 0, function* () {
        let distance = Number.MAX_VALUE;
        let nearestSupportCenter = null;
        for (let supportCenter of supportCenters) {
            const distanceToSupportCenter = yield this.getDistanceToSupportCenter(yield supportCenter.populate('location'));
            yield (0, Tools_1.delay)(1000);
            if (distanceToSupportCenter < distance) {
                distance = distanceToSupportCenter;
                nearestSupportCenter = supportCenter;
            }
        }
        return nearestSupportCenter;
    });
};
incidentSchema.methods.getNextNearestSupportCenter = function (supportCenter) {
    return __awaiter(this, void 0, void 0, function* () {
        let distance = Number.MAX_VALUE;
        let nearestSupportCenter = null;
        const service = yield Service_1.Service.findOne({ _id: supportCenter.service }).populate('supportCenters');
        if (service) {
            for (let _supportCenter of service.supportCenters) {
                const distanceToSupportCenter = yield this.getDistanceToSupportCenter(yield _supportCenter.populate('location'));
                yield (0, Tools_1.delay)(1000);
                if (distanceToSupportCenter < distance && !this.supportCenters.includes(_supportCenter)) {
                    distance = distanceToSupportCenter;
                    nearestSupportCenter = supportCenter;
                }
            }
        }
        return nearestSupportCenter;
    });
};
incidentSchema.methods.getConcernedSupportCenters = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const supportCenters = [];
        for (const troubleId of this.troubles) {
            const trouble = yield Trouble_1.Trouble.findById(troubleId).populate({ path: 'services', model: Service_1.Service });
            if (!trouble)
                continue;
            for (const service of trouble.services) {
                yield service.populate('supportCenters');
                const nearestSupportCenter = yield this.getNearestSupportCenter(service.supportCenters);
                if (nearestSupportCenter)
                    supportCenters.push(nearestSupportCenter);
            }
        }
        // Remove duplicates using Set
        const uniqueSupportCenters = Array.from(new Set(supportCenters.map(center => center.id)));
        return uniqueSupportCenters;
    });
};
// Création du modèle Incident à partir du schéma
exports.Incident = (0, mongoose_1.model)('Incident', incidentSchema);
