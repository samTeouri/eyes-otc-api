import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Incident } from "./Incident";
import { SupportCenter } from "./SupportCenter";

export const Location = sequelize.define('Location',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('incident', 'supportCenter'),
            allowNull: false,
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
        modelName: 'Location',
        tableName: 'locations'
    }
);

Location.hasOne(Incident, {
    foreignKey: 'locationId'
});

Location.hasOne(SupportCenter, {
    foreignKey: 'locationId'
});