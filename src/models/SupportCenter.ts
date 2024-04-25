import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { Service } from './Service';

export class SupportCenter extends Model {
    declare id: BigInteger;
    declare type: string;
    declare name: string;
    declare telephone: BigInteger;
    declare createdAt: Date;
    declare updatedAt: Date;
}

SupportCenter.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
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
        sequelize: sequelize,
        modelName: 'SupportCenter',
        tableName: 'support_centers',
    }
);

SupportCenter.belongsTo(Service, {
    foreignKey: 'service_id'
});