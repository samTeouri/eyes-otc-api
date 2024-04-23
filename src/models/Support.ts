import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const Support = sequelize.define('Support', 
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
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
        modelName: 'Support',
        tableName: 'supports',
    }
)