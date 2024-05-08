import { Schema, model, Document, Types } from 'mongoose';
import { IIncident } from './Incident';
import { ISupportCenter } from './SupportCenter';

// Interface pour représenter les données d'une notification
export interface INotification extends Document {
    isHandled: boolean;
    supportCenter: ISupportCenter;
    incident: IIncident;
    createdAt: Date;
    updatedAt: Date;
}

// Schéma de la notification
const notificationSchema: Schema<INotification> = new Schema({
    isHandled: { type: Boolean, default: false },
    supportCenter: { type: Schema.Types.ObjectId, ref: 'SupportCenter' },
    incident: { type: Schema.Types.ObjectId, ref: 'Incident' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Création du modèle Notification à partir du schéma
export const Notification = model<INotification>('Notification', notificationSchema);
