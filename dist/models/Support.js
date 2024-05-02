"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Support = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Support extends sequelize_1.Model {
}
exports.Support = Support;
Support.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
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
    modelName: 'Support',
    tableName: 'supports',
});
