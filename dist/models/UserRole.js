"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class UserRole extends sequelize_1.Model {
}
exports.UserRole = UserRole;
UserRole.init({}, {
    sequelize: database_1.sequelize,
    modelName: 'UserRole',
    tableName: 'user_roles'
});
