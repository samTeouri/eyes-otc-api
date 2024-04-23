import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const IncidentTrouble = sequelize.define('IncidentTrouble',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    },
    {
        modelName: 'IncidentTrouble',
        tableName: 'incident_troubles'
    }
)