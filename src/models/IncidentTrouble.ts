import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class IncidentTrouble extends Model {
    declare id: BigInteger;
    declare createdAt: Date;
    declare updatedAt: Date;
}

IncidentTrouble.init(
    {
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
        modelName: 'IncidentTrouble',
        tableName: 'incident_troubles'
    }
)