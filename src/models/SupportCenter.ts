import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Incident } from './Incident';
import { Notification } from './Notification';

export const SupportCenter = sequelize.define('SupportCenter',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: DataTypes.ENUM('hôpital', 'pompier', 'gendarmerie'),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telephone: {
            type: DataTypes.BIGINT,
            allowNull: false
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
        modelName: 'SupportCenter',
    }
);

SupportCenter.belongsToMany(Incident, { through: Notification });