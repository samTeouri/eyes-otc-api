import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Incident } from './Incident';
import { SupportCenter } from './SupportCenter';

export const Notification = sequelize.define('Notification',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        isReaded: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
        modelName: 'Notification',
        tableName: 'notifications'
    }
);