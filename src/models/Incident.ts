import { Schema, model, Document, Types } from 'mongoose';
import { ISupportCenter, SupportCenter } from './SupportCenter';
import { OSMRoutingService } from '../services/OSMRoutingService';
import { ILocation, Location } from './Location';
import { IUser } from './User';
import { ITrouble, Trouble } from './Trouble';
import { Service } from './Service';
import { delay } from '../utils/Tools';
import { Support } from './Support';

// Interface pour représenter les données d'un incident
export interface IIncident extends Document {
    description?: string;
    picture?: string;
    video?: string;
    audio?: string;
    createdAt: Date;
    updatedAt: Date;
    location: ILocation;
    user: IUser;
    troubles: ITrouble[];
    supportCenters: ISupportCenter[];

    getDistanceToSupportCenter(supportCenter: ISupportCenter): Promise<number>;
    getNearestSupportCenter(supportCenters: ISupportCenter[]): Promise<ISupportCenter | null>;
    getNextNearestSupportCenter(supportCenter: ISupportCenter): Promise<ISupportCenter | null>;
    getConcernedSupportCenters(): Promise<ISupportCenter[]>;
}

// Schéma de l'incident
const incidentSchema: Schema<IIncident> = new Schema({
    description: { type: String },
    picture: { type: String },
    video: { type: String },
    audio: { type: String },
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

    try {
        const incidentLocation = await Location.findById(this.location);
        const supportCenterLocation = await Location.findById(supportCenter.location);
        if (supportCenterLocation && incidentLocation) {
            const distance = await osrm.getDistance(
                [incidentLocation.longitude, incidentLocation.latitude],
                [supportCenterLocation.longitude, supportCenterLocation.latitude]
            );
            return distance;
        }
    } catch (error) {
        console.error(`Error while getting distance to Support Center: ${error}`);
    }
};

incidentSchema.methods.getNearestSupportCenter = async function (this: IIncident, supportCenters: ISupportCenter[]): Promise<ISupportCenter | null> {
    let distance = Number.MAX_VALUE;
    
    let nearestSupportCenter: ISupportCenter | null = null;

    for (let supportCenter of supportCenters) {
        const distanceToSupportCenter = await this.getDistanceToSupportCenter(await supportCenter.populate('location'));
        await delay(1000);
        if (distanceToSupportCenter < distance) {
            distance = distanceToSupportCenter;
            nearestSupportCenter = supportCenter;
        }
    }

    return nearestSupportCenter;
};

incidentSchema.methods.getNextNearestSupportCenter = async function (this: IIncident, supportCenter: ISupportCenter): Promise<ISupportCenter | null> {
    let distance = Number.MAX_VALUE;
    let nearestSupportCenter: ISupportCenter | null = null;    
    const service = await Service.findOne({ _id: supportCenter.service }).populate('supportCenters');

    if (service) {
        for (let _supportCenter of service.supportCenters) {
            const distanceToSupportCenter = await this.getDistanceToSupportCenter(await _supportCenter.populate('location'));
            await delay(1000);
            if (distanceToSupportCenter < distance && !this.supportCenters.includes(_supportCenter)) {
                distance = distanceToSupportCenter;
                nearestSupportCenter = supportCenter;
            }
        }
    }

    return nearestSupportCenter;
};

incidentSchema.methods.getConcernedSupportCenters = async function (this: IIncident): Promise<ISupportCenter[]> {
    const supportCenters: ISupportCenter[] = [];

    for (const troubleId of this.troubles) {
        const trouble = await Trouble.findById(troubleId).populate({ path: 'services', model: Service });
        if (!trouble) continue;
        for (const service of trouble.services) {
            await service.populate('supportCenters');
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
