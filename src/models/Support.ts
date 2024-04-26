import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Support extends Model {
    declare id: BigInteger;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Support.init( 
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
        sequelize: sequelize,
        modelName: 'Support',
        tableName: 'supports',
    }
)