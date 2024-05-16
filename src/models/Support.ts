import { Schema, model, Document, Types } from 'mongoose';
import { IService } from './Service';
import { ITrouble } from './Trouble';

// Interface pour représenter les données d'un support
export interface ISupport extends Document {
    service: IService;
    trouble: ITrouble;
    createdAt: Date;
    updatedAt: Date;
}

// Schéma du support
const supportSchema: Schema<ISupport> = new Schema({
    service: { type: Schema.Types.ObjectId, ref: 'Service' },
    trouble: { type: Schema.Types.ObjectId, ref: 'Trouble' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Création du modèle Support à partir du schéma
export const Support = model<ISupport>('Support', supportSchema);
