import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Trouble } from "./Trouble";
import { Support } from "./Support";

export class Service extends Model {
    declare id: BigInteger;
    declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Service.init(
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
        sequelize: sequelize,
        modelName: 'Service',
        tableName: 'services'
    }
);

Service.belongsToMany(Trouble, {
    through: Support,
    foreignKey: 'serviceId'
});