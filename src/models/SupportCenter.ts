import { DataTypes, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, HasOneSetAssociationMixin } from 'sequelize';
import { sequelize } from '../config/database';
import { Service } from './Service';
import { User } from './User';
import { Location } from './Location';

export class SupportCenter extends User {
    declare type: string;
    declare name: string;
    declare telephone: BigInteger;
    declare createdAt: Date;
    declare updatedAt: Date;

    declare getLocation: HasOneGetAssociationMixin<Location>;
    declare setLocation: HasOneSetAssociationMixin<Location, number>;
    declare createLocation: HasOneCreateAssociationMixin<Location>;
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