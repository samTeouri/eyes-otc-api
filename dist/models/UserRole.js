"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
const mongoose_1 = require("mongoose");
// Schéma de l'association entre un utilisateur et un rôle
const userRoleSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    role: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Role' }
});
// Création du modèle UserRole à partir du schéma
exports.UserRole = (0, mongoose_1.model)('UserRole', userRoleSchema);
