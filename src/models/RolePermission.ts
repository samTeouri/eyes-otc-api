import { Schema, model, Document, Types } from 'mongoose';
import { IRole } from './Role';
import { IPermission } from './Permission';

// Interface pour représenter les données d'une association entre un rôle et une permission
export interface IRolePermission extends Document {
    role: IRole;
    permission: IPermission;
}

// Schéma de l'association entre un rôle et une permission
const rolePermissionSchema: Schema<IRolePermission> = new Schema({
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    permission: { type: Schema.Types.ObjectId, ref: 'Permission' },
});

// Création du modèle RolePermission à partir du schéma
export const RolePermission = model<IRolePermission>('RolePermission', rolePermissionSchema);