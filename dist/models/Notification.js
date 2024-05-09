"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const mongoose_1 = require("mongoose");
// Schéma de la notification
const notificationSchema = new mongoose_1.Schema({
    isHandled: { type: Boolean, default: false },
    state: { type: String, enum: ['prise en charge en cours', 'en attente de prise en charge', 'résolu'], default: 'en attente de prise en charge' },
    supportCenter: { type: mongoose_1.Schema.Types.ObjectId, ref: 'SupportCenter' },
    incident: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Incident' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
// Création du modèle Notification à partir du schéma
exports.Notification = (0, mongoose_1.model)('Notification', notificationSchema);
