import { BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, BelongsToManyCreateAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyHasAssociationMixin, BelongsToManyHasAssociationsMixin, BelongsToManyRemoveAssociationMixin, BelongsToManyRemoveAssociationsMixin, BelongsToManySetAssociationsMixin, DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Role } from "./Role";

export class Permission extends Model {
    declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;

    declare getRoles: BelongsToManyGetAssociationsMixin<Role>;
    declare setRoles: BelongsToManySetAssociationsMixin<Role, number>;
    declare hasRole: BelongsToManyHasAssociationMixin<Role, number>;
    declare hasRoles: BelongsToManyHasAssociationsMixin<Role, number>;
    declare addRole: BelongsToManyAddAssociationMixin<Role, number>;
    declare addRoles: BelongsToManyAddAssociationsMixin<Role, number>;
    declare removeRole: BelongsToManyRemoveAssociationMixin<Role, number>;
    declare removeRoles: BelongsToManyRemoveAssociationsMixin<Role, number>;
    declare createRole: BelongsToManyCreateAssociationMixin<Role>;
}

Permission.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },{
        sequelize: sequelize,
        modelName: 'Permission',
        tableName: 'permissions',
    }
);