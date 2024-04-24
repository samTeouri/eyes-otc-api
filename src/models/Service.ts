import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Trouble } from "./Trouble";
import { Support } from "./Support";

export const Service = sequelize.define('Service',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
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
        modelName: 'Service',
        tableName: 'services'
    }
);

Service.belongsToMany(Trouble, {
    through: Support,
    foreignKey: 'serviceId'
});