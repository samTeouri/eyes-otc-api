import mongoose, { Schema, Document, Types } from 'mongoose';
import { ITrouble } from './Trouble';
import { IIncident } from './Incident';

// Interface pour représenter les données d'une association entre Incident et Trouble
export interface IIncidentTrouble extends Document {
    createdAt: Date;
    updatedAt: Date;
    incident: IIncident;
    trouble: ITrouble;
}

// Schéma de l'association entre Incident et Trouble
const incidentTroubleSchema: Schema<IIncidentTrouble> = new Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    incident: { type: Schema.Types.ObjectId, ref: 'Incident', required: true },
    trouble: { type: Schema.Types.ObjectId, ref: 'Trouble', required: true },
});

// Création du modèle IncidentTrouble à partir du schéma
export const IncidentTrouble = mongoose.model<IIncidentTrouble>('IncidentTrouble', incidentTroubleSchema);
