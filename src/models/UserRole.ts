import { Schema, model, Document, Types } from 'mongoose';
import { IUser } from './User';
import { IRole } from './Role';

// Interface pour représenter les données d'une association entre un utilisateur et un rôle
export interface IUserRole extends Document {
    user: IUser;
    role: IRole;
}

// Schéma de l'association entre un utilisateur et un rôle
const userRoleSchema: Schema<IUserRole> = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    role: { type: Schema.Types.ObjectId, ref: 'Role' }
});

// Création du modèle UserRole à partir du schéma
export const UserRole = model<IUserRole>('UserRole', userRoleSchema);
