import { BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, BelongsToManyCreateAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyHasAssociationMixin, BelongsToManyHasAssociationsMixin, BelongsToManyRemoveAssociationMixin, BelongsToManyRemoveAssociationsMixin, BelongsToManySetAssociationsMixin, DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './User';
import { UserRole } from './UserRole';
import { Permission } from './Permission';
import { RolePermission } from './RolePermission';

export class Role extends Model {
    declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;

    declare getUsers: BelongsToManyGetAssociationsMixin<User>;
    declare setUsers: BelongsToManySetAssociationsMixin<User, number>;
    declare hasUser: BelongsToManyHasAssociationMixin<User, number>;
    declare hasUsers: BelongsToManyHasAssociationsMixin<User, number>;
    declare addUser: BelongsToManyAddAssociationMixin<User, number>;
    declare addUsers: BelongsToManyAddAssociationsMixin<User, number>;
    declare removeUser: BelongsToManyRemoveAssociationMixin<User, number>;
    declare removeUsers: BelongsToManyRemoveAssociationsMixin<User, number>;
    declare createUser: BelongsToManyCreateAssociationMixin<User>;

    declare getPermissions: BelongsToManyGetAssociationsMixin<Permission>;
    declare setPermissions: BelongsToManySetAssociationsMixin<Permission, number>;
    declare hasPermission: BelongsToManyHasAssociationMixin<Permission, number>;
    declare hasPermissions: BelongsToManyHasAssociationsMixin<Permission, number>;
    declare addPermission: BelongsToManyAddAssociationMixin<Permission, number>;
    declare addPermissions: BelongsToManyAddAssociationsMixin<Permission, number>;
    declare removePermission: BelongsToManyRemoveAssociationMixin<Permission, number>;
    declare removePermissions: BelongsToManyRemoveAssociationsMixin<Permission, number>;
    declare createPermission: BelongsToManyCreateAssociationMixin<Permission>;
}

Role.init(
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
    }
    ,{
        sequelize: sequelize,
        modelName: 'Role',
        tableName: 'roles',
    }
);

User.belongsToMany(Role, {
        through: UserRole,
        foreignKey: 'user_id',
    }
);
Role.belongsToMany(User, {
        through: UserRole,
        foreignKey: 'role_id'
    }
);

Role.belongsToMany(Permission, {
        through: RolePermission,
        foreignKey: 'role_id'
    }
);

Permission.belongsToMany(Role, {
        through: RolePermission,
        foreignKey: 'permission_id'
    }
);
