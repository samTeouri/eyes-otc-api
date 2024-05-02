"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermission = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class RolePermission extends sequelize_1.Model {
}
exports.RolePermission = RolePermission;
RolePermission.init({}, {
    sequelize: database_1.sequelize,
    modelName: 'RolePermission',
    tableName: 'role_permissions'
});
