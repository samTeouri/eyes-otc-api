import { BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, BelongsToManyCreateAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyHasAssociationMixin, BelongsToManyHasAssociationsMixin, BelongsToManyRemoveAssociationMixin, BelongsToManyRemoveAssociationsMixin, BelongsToManySetAssociationsMixin, DataTypes, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, HasOneSetAssociationMixin, Model } from 'sequelize';
import { sequelize } from "../config/database";
import { Trouble } from "./Trouble";
import { Support } from "./Support";
import { SupportCenter } from './SupportCenter';

export class Service extends Model {
    declare id: BigInteger;
    declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;

    declare getTroubles: BelongsToManyGetAssociationsMixin<Trouble>;
    declare setTroubles: BelongsToManySetAssociationsMixin<Trouble, number>;
    declare hasTrouble: BelongsToManyHasAssociationMixin<Trouble, number>;
    declare hasTroubles: BelongsToManyHasAssociationsMixin<Trouble, number>;
    declare addTrouble: BelongsToManyAddAssociationMixin<Trouble, number>;
    declare addTroubles: BelongsToManyAddAssociationsMixin<Trouble, number>;
    declare removeTrouble: BelongsToManyRemoveAssociationMixin<Trouble, number>;
    declare removeTroubles: BelongsToManyRemoveAssociationsMixin<Trouble, number>;
    declare createTrouble: BelongsToManyCreateAssociationMixin<Trouble>;

    declare getSupportCenters: BelongsToManyGetAssociationsMixin<SupportCenter>;
    declare setSupportCenters: BelongsToManySetAssociationsMixin<SupportCenter, number>;
    declare hasSupportCenter: BelongsToManyHasAssociationMixin<SupportCenter, number>;
    declare hasSupportCenters: BelongsToManyHasAssociationsMixin<SupportCenter, number>;
    declare addSupportCenter: BelongsToManyAddAssociationMixin<SupportCenter, number>;
    declare addSupportCenters: BelongsToManyAddAssociationsMixin<SupportCenter, number>;
    declare removeSupportCenter: BelongsToManyRemoveAssociationMixin<SupportCenter, number>;
    declare removeSupportCenters: BelongsToManyRemoveAssociationsMixin<SupportCenter, number>;
    declare createSupportCenter: BelongsToManyCreateAssociationMixin<SupportCenter>;
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
    foreignKey: 'service_id'
});

Trouble.belongsToMany(Service, {
    through: Support,
    foreignKey: 'trouble_id'
});