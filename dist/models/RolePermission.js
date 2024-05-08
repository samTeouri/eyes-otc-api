"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermission = void 0;
const mongoose_1 = require("mongoose");
// Schéma de l'association entre un rôle et une permission
const rolePermissionSchema = new mongoose_1.Schema({
    role: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Role' },
    permission: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Permission' },
});
// Création du modèle RolePermission à partir du schéma
exports.RolePermission = (0, mongoose_1.model)('RolePermission', rolePermissionSchema);
