import { Schema, model, Document } from 'mongoose';
import { IRole } from './Role';
import { IIncident } from './Incident';

// Définition de l'interface pour représenter les données d'un utilisateur
export interface IUser extends Document {
    lastName: string;
    firstName: string;
    phone?: number;
    email?: string;
    address?: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    roles: IRole[];
    incidents: IIncident[];
}

// Schéma de l'utilisateur
const userSchema: Schema<IUser> = new Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    phone: { type: Number, unique: true },
    email: { type: String, unique: true },
    address: { type: String },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
    incidents: [{ type: Schema.Types.ObjectId, ref: 'Incident' }]
});

// Création du modèle User à partir du schéma
export const User = model<IUser>('User', userSchema);
