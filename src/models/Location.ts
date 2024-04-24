import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Incident } from "./Incident";
import { SupportCenter } from "./SupportCenter";

export class Location extends Model {
    declare id: BigInteger;
    declare latitude: Float32Array;
    declare longitude: Float32Array;
    declare type: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Location.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.FLOAT,
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
        sequelize: sequelize,
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