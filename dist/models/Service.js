"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const mongoose_1 = require("mongoose");
// Schéma du service
const serviceSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    troubles: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Trouble' }],
    supportCenters: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'SupportCenter' }],
});
// Création du modèle Service à partir du schéma
exports.Service = (0, mongoose_1.model)('Service', serviceSchema);
