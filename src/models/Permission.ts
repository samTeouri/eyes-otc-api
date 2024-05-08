import { Schema, model, Document, Types } from 'mongoose';
import { IRole } from './Role';

// Interface pour représenter les données d'une permission
export interface IPermission extends Document {
    _id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    roles: IRole[];
}

// Schéma de la permission
const permissionSchema: Schema<IPermission> = new Schema({
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
});

// Création du modèle Permission à partir du schéma
export const Permission = model<IPermission>('Permission', permissionSchema);

