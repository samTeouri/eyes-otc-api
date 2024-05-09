import { Schema, model, Document, Types } from 'mongoose';
import { ILocation } from './Location';
import { IService } from './Service';
import { IUser } from './User';
import { IIncident } from './Incident';

// Interface pour représenter les données d'un centre de support
export interface ISupportCenter extends Document {
    name: string;
    telephone: number;
    createdAt: Date;
    updatedAt: Date;
    location: ILocation;
    service: IService;
    user: IUser;
    incidents: IIncident[];
}

// Schéma du centre de support
const supportCenterSchema: Schema<ISupportCenter> = new Schema({
    name: { type: String, required: true },
    telephone: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    location: { type: Schema.Types.ObjectId, ref: 'Location' },
    service: { type: Schema.Types.ObjectId, ref: 'Service' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    incidents: [{ type: Schema.Types.ObjectId, ref: 'Incident' }]
});

// Création du modèle SupportCenter à partir du schéma
export const SupportCenter = model<ISupportCenter>('SupportCenter', supportCenterSchema);
