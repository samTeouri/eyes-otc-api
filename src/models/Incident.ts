import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { SupportCenter } from './SupportCenter';
import { Notification } from './Notification';

export const Incident = sequelize.define('Incident',
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
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
        modelName: 'Incident',
    }
);

Incident.belongsToMany(SupportCenter, { through: Notification });