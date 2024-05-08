import { Schema, model, Document } from 'mongoose';

// Interface pour représenter les données d'un emplacement
export interface ILocation extends Document {
    latitude: number;
    longitude: number;
    createdAt: Date;
    updatedAt: Date;
}

// Schéma de l'emplacement
const locationSchema: Schema<ILocation> = new Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Création du modèle Location à partir du schéma
export const Location = model<ILocation>('Location', locationSchema);
