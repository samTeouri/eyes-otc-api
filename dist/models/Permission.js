"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
const mongoose_1 = require("mongoose");
// Schéma de la permission
const permissionSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    roles: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Role' }],
});
// Création du modèle Permission à partir du schéma
exports.Permission = (0, mongoose_1.model)('Permission', permissionSchema);
