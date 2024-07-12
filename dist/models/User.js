"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
// Schéma de l'utilisateur
const userSchema = new mongoose_1.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    phone: { type: Number, unique: true },
    email: { type: String, unique: true },
    address: { type: String },
    password: { type: String, required: true },
    fcmToken: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    roles: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Role' }],
    incidents: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Incident' }]
});
// Création du modèle User à partir du schéma
exports.User = (0, mongoose_1.model)('User', userSchema);
