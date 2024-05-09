"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportCenter = void 0;
const mongoose_1 = require("mongoose");
// Schéma du centre de support
const supportCenterSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    telephone: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    location: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Location' },
    service: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Service' },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    incidents: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Incident' }]
});
// Création du modèle SupportCenter à partir du schéma
exports.SupportCenter = (0, mongoose_1.model)('SupportCenter', supportCenterSchema);
