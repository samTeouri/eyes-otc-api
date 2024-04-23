import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const Incident = sequelize.define('Incident',
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
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
        tableName: 'incidents'
    }
);

