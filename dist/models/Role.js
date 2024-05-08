"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = require("mongoose");
// Schéma du rôle
const roleSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    users: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    permissions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Permission' }],
});
// Création du modèle Role à partir du schéma
exports.Role = (0, mongoose_1.model)('Role', roleSchema);
