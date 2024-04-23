import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const Trouble = sequelize.define('Trouble',
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
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
        },
    },
    {
        modelName: 'Trouble',
        tableName: 'troubles'
    }
);