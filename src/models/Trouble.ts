import { BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, BelongsToManyCreateAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyHasAssociationMixin, BelongsToManyHasAssociationsMixin, BelongsToManyRemoveAssociationMixin, BelongsToManyRemoveAssociationsMixin, BelongsToManySetAssociationsMixin, DataTypes, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, HasOneSetAssociationMixin, Model } from 'sequelize';
import { sequelize } from "../config/database";
import { Service } from './Service';

export class Trouble extends Model {
    declare id: BigInteger;
    declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;

    declare getServices: BelongsToManyGetAssociationsMixin<Service>;
    declare setServices: BelongsToManySetAssociationsMixin<Service, number>;
    declare hasService: BelongsToManyHasAssociationMixin<Service, number>;
    declare hasServices: BelongsToManyHasAssociationsMixin<Service, number>;
    declare addService: BelongsToManyAddAssociationMixin<Service, number>;
    declare addServices: BelongsToManyAddAssociationsMixin<Service, number>;
    declare removeService: BelongsToManyRemoveAssociationMixin<Service, number>;
    declare removeServices: BelongsToManyRemoveAssociationsMixin<Service, number>;
    declare createService: BelongsToManyCreateAssociationMixin<Service>;
}

Trouble.init(
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
        },
    },
    {
        sequelize: sequelize,
        modelName: 'Service',
        tableName: 'troubles'
    }
);