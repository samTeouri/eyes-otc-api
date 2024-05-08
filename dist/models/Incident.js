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
const Trouble_1 = require("./Trouble");
// Schéma de l'incident
const incidentSchema = new mongoose_1.Schema({
    state: { type: String, enum: ['traitement en cours', 'en attente de traitement', 'résolu'], default: 'en attente de traitement' },
    description: { type: String, required: true },
    picture: { type: String },
    video: { type: String },
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
        return yield osrm.getDistance([this.location.longitude, this.location.latitude], [supportCenter.location.longitude, supportCenter.location.latitude]);
    });
};
incidentSchema.methods.getNearestSupportCenter = function (supportCenters) {
    return __awaiter(this, void 0, void 0, function* () {
        let distance = Number.MAX_VALUE;
        let nearestSupportCenter = null;
        for (const supportCenter of supportCenters) {
            const distanceToSupportCenter = yield this.getDistanceToSupportCenter(supportCenter.id);
            if (distanceToSupportCenter < distance) {
                distance = distanceToSupportCenter;
                nearestSupportCenter = supportCenter;
            }
        }
        return nearestSupportCenter;
    });
};
incidentSchema.methods.getConcernedSupportCenters = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const supportCenters = [];
        for (const troubleId of this.troubles) {
            const trouble = yield Trouble_1.Trouble.findById(troubleId).populate('services');
            if (!trouble)
                continue;
            for (const service of trouble.services) {
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
