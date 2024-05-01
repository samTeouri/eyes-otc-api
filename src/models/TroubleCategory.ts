import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Trouble } from "./Trouble";

export class TroubleCategory extends Model {
    declare id: BigInteger;
    declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;
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