"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const User_1 = require("./User");
const UserRole_1 = require("./UserRole");
const Permission_1 = require("./Permission");
const RolePermission_1 = require("./RolePermission");
class Role extends sequelize_1.Model {
}
exports.Role = Role;
Role.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'Role',
    tableName: 'roles',
});
User_1.User.belongsToMany(Role, {
    through: UserRole_1.UserRole,
    foreignKey: 'user_id',
});
Role.belongsToMany(User_1.User, {
    through: UserRole_1.UserRole,
    foreignKey: 'role_id'
});
Role.belongsToMany(Permission_1.Permission, {
    through: RolePermission_1.RolePermission,
    foreignKey: 'role_id'
});
Permission_1.Permission.belongsToMany(Role, {
    through: RolePermission_1.RolePermission,
    foreignKey: 'permission_id'
});
