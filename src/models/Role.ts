import { Schema, model, Types } from 'mongoose';
import { IUser } from './User';
import { IPermission } from './Permission';

// Interface pour représenter les données d'un rôle
export interface IRole {
    name: string;
    createdAt: Date;
    updatedAt: Date;
    users: IUser[];
    permissions: IPermission[];
}

// Schéma du rôle
const roleSchema = new Schema<IRole>({
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
});

// Création du modèle Role à partir du schéma
export const Role = model<IRole>('Role', roleSchema);
