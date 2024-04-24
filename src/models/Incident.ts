import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { SupportCenter } from './SupportCenter';
import { Notification } from './Notification';
import { Trouble } from './Trouble';
import { IncidentTrouble } from './IncidentTrouble';
import { User } from './User';

export class Incident extends Model {
    declare id: BigInteger;
    declare state: string;
    declare description: string;
    declare picture: string;
    declare video: string;
    declare createdAt: Date;
    declare updateAt: Date;
}

Incident.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        state: {
            type: DataTypes.ENUM('traitement en cours', 'en attente de traitement', 'résolu'),
            allowNull: false,
            defaultValue: 'en attente de traitement',
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        video: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize: sequelize,
        modelName: 'Incident',
        tableName: 'incidents'
    }
);

Incident.belongsToMany(SupportCenter, {
    through: Notification,
    foreignKey: 'incidentId'
});

Incident.belongsToMany(Trouble, {
    through: IncidentTrouble,
    foreignKey: 'incidentId'
});

Incident.belongsTo(User, {
    foreignKey: 'userId'
});

SupportCenter.belongsToMany(Incident, {
    through: Notification,
    foreignKey: 'supportCenterId'
});

Trouble.belongsToMany(Incident, {
    through: IncidentTrouble,
    foreignKey: 'troubleId'
});