import { Schema, model, Document } from 'mongoose';
import { ITrouble } from './Trouble';
import { ISupportCenter } from './SupportCenter';

// Interface pour représenter les données d'un service
export interface IService extends Document {
    name: string;
    createdAt: Date;
    updatedAt: Date;
    troubles: ITrouble[];
    supportCenters: ISupportCenter[];
}

// Schéma du service
const serviceSchema: Schema<IService> = new Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    troubles: [{ type: Schema.Types.ObjectId, ref: 'Trouble' }],
    supportCenters: [{ type: Schema.Types.ObjectId, ref: 'SupportCenter' }],
});

// Création du modèle Service à partir du schéma
export const Service = model<IService>('Service', serviceSchema);
