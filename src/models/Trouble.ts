import { Schema, model, Document, Types } from 'mongoose';
import { IService } from './Service';

// Interface pour représenter les données d'un problème
export interface ITrouble extends Document {
    name: string;
    createdAt: Date;
    updatedAt: Date;
    services: IService[];
}

// Schéma du problème
const troubleSchema: Schema<ITrouble> = new Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    services: [{ type: Schema.Types.ObjectId, ref: 'Service' }]
});

// Création du modèle Trouble à partir du schéma
export const Trouble = model<ITrouble>('Trouble', troubleSchema);
