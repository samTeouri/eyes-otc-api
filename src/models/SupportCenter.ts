import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const SupportCenter = sequelize.define('SupportCenter',
    {
        id: {
            type: DataTypes.STRING,
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
        tableName: 'support_centers',
    }
);