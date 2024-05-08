import { Schema, model, Document, Types } from 'mongoose';
import { ISupportCenter } from './SupportCenter';
import { OSMRoutingService } from '../services/OSMRoutingService';
import { ILocation } from './Location';
import { IUser } from './User';
import { ITrouble, Trouble } from './Trouble';

// Interface pour représenter les données d'un incident
export interface IIncident extends Document {
    state: 'traitement en cours' | 'en attente de traitement' | 'résolu';
    description: string;
    picture?: string;
    video?: string;
    createdAt: Date;
    updatedAt: Date;
    location: ILocation;
    user: IUser;
    troubles: ITrouble[];
    supportCenters: ISupportCenter[];

    getDistanceToSupportCenter(supportCenter: ISupportCenter): Promise<number>;
    getNearestSupportCenter(supportCenters: ISupportCenter[]): Promise<ISupportCenter | null>;
    getConcernedSupportCenters(): Promise<ISupportCenter[]>;
}

// Schéma de l'incident
const incidentSchema: Schema<IIncident> = new Schema({
    state: { type: String, enum: ['traitement en cours', 'en attente de traitement', 'résolu'], default: 'en attente de traitement' },
    description: { type: String, required: true },
    picture: { type: String },
    video: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    location: { type: Schema.Types.ObjectId, ref: 'Location' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    troubles: [{ type: Schema.Types.ObjectId, ref: 'Trouble' }],
    supportCenters: [{ type: Schema.Types.ObjectId, ref: 'SupportCenter' }],
});

// Méthodes du schéma Incident
incidentSchema.methods.getDistanceToSupportCenter = async function (this: IIncident, supportCenter: ISupportCenter): Promise<number | void> {
    const osrm = new OSMRoutingService();
    if (!supportCenter) throw new Error('Support Center not found');
    return await osrm.getDistance([this.location.longitude, this.location.latitude], [supportCenter.location.longitude, supportCenter.location.latitude]);
};

incidentSchema.methods.getNearestSupportCenter = async function (this: IIncident, supportCenters: ISupportCenter[]): Promise<ISupportCenter | null> {
    let distance = Number.MAX_VALUE;
    let nearestSupportCenter: ISupportCenter | null = null;

    for (const supportCenter of supportCenters) {
        const distanceToSupportCenter = await this.getDistanceToSupportCenter(supportCenter.id);
        if (distanceToSupportCenter < distance) {
            distance = distanceToSupportCenter;
            nearestSupportCenter = supportCenter;
        }
    }

    return nearestSupportCenter;
};

incidentSchema.methods.getConcernedSupportCenters = async function (this: IIncident): Promise<ISupportCenter[]> {
    const supportCenters: ISupportCenter[] = [];

    for (const troubleId of this.troubles) {
        const trouble = await Trouble.findById(troubleId).populate('services');
        if (!trouble) continue;
        
        for (const service of trouble.services) {
            const nearestSupportCenter = await this.getNearestSupportCenter(service.supportCenters);
            if (nearestSupportCenter) supportCenters.push(nearestSupportCenter);
        }
    }

    // Remove duplicates using Set
    const uniqueSupportCenters = Array.from(new Set(supportCenters.map(center => center.id)));

    return uniqueSupportCenters;
};

// Création du modèle Incident à partir du schéma
export const Incident = model<IIncident>('Incident', incidentSchema);
