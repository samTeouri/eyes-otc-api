"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trouble = void 0;
const mongoose_1 = require("mongoose");
// Schéma du problème
const troubleSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    services: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Service' }]
});
// Création du modèle Trouble à partir du schéma
exports.Trouble = (0, mongoose_1.model)('Trouble', troubleSchema);
