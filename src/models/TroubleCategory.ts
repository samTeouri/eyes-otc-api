import { BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, BelongsToManyCreateAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyHasAssociationMixin, BelongsToManyHasAssociationsMixin, BelongsToManyRemoveAssociationMixin, BelongsToManyRemoveAssociationsMixin, BelongsToManySetAssociationsMixin, DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Trouble } from "./Trouble";

export class TroubleCategory extends Model {
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
}

TroubleCategory.init(
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
        modelName: 'TroubleCategory',
        tableName: 'trouble_categories'
    }
);

TroubleCategory.hasMany(Trouble, {
    foreignKey: 'trouble_categorie_id'
});