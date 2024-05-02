"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trouble = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Trouble extends sequelize_1.Model {
}
exports.Trouble = Trouble;
Trouble.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'Service',
    tableName: 'troubles'
});
