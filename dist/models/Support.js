"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Support = void 0;
const mongoose_1 = require("mongoose");
// Schéma du support
const supportSchema = new mongoose_1.Schema({
    isHandled: { type: Boolean, default: false },
    service: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Service' },
    trouble: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Trouble' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
// Création du modèle Support à partir du schéma
exports.Support = (0, mongoose_1.model)('Support', supportSchema);
